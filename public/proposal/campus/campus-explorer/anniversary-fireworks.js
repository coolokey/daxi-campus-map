/* Non-modal anniversary controller. Campus input and rendering remain in explorer.js. */
(() => {
  const api=window.campusExplorer,model=window.CampusAnniversary;
  if(!api||!window.CampusFireworkScene)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const launcher=document.createElement('button');launcher.id='anniversary-launch';launcher.type='button';launcher.innerHTML='<span aria-hidden="true">80</span><b>週年煙火秀</b>';launcher.setAttribute('aria-label','開始大溪國中 80 週年煙火秀');
  const panel=document.createElement('section');panel.id='anniversary-dialog';panel.hidden=true;panel.setAttribute('aria-label','八十週年煙火秀控制');
  panel.innerHTML=`<div class="anniversary-heading"><span>大溪國中 <b>80</b> 週年</span><button id="anniversary-close" type="button">停止表演 ×</button></div>
    <p id="anniversary-status" role="status" aria-live="polite"></p>
    <div class="anniversary-track" aria-hidden="true"><i></i></div>
    <div class="anniversary-controls"><button id="anniversary-replay" type="button">再次觀看</button><button id="anniversary-sound" type="button" aria-pressed="false">開啟音效</button><button id="anniversary-quality" type="button" aria-pressed="false">降低動畫</button><button id="anniversary-view" type="button">觀賞視角</button></div>
    <label class="anniversary-preset" for="anniversary-preset">畫質<select id="anniversary-preset"><option value="auto">自動</option><option value="high">高畫質</option><option value="standard">標準</option><option value="battery">省電</option></select></label>
    <label class="anniversary-volume" for="anniversary-volume">音量<input id="anniversary-volume" type="range" min="0" max="100" value="55"><output id="anniversary-volume-value">55%</output></label>
    <p id="anniversary-audio-status">音效尚未開啟；開啟後播放真實錄音。</p><p class="anniversary-help">可繼續走動、轉頭與操作校園；Esc 停止。</p>`;
  const banner=document.createElement('div');banner.id='anniversary-banner';banner.setAttribute('aria-live','polite');banner.hidden=true;
  const cover=document.getElementById('guide-landing'),coverEntry=document.createElement('button');coverEntry.type='button';coverEntry.className='anniversary-cover-entry';coverEntry.textContent='80 週年煙火秀 ↗';
  cover?.querySelector('footer')?.append(coverEntry);document.body.append(launcher,panel,banner);
  const $=id=>panel.querySelector('#anniversary-'+id);
  let running=false,fx=null,saved=null,elapsed=0,last=0,cueIndex=0,cues=[],phase='',cameraSaved=null,interacted=false,previousFocus=null;
  let audio=null,audioEngine=null,soundWanted=false,soundEnabled=false,soundGeneration=0,low=false,quality=null,slowSum=0,slowFrames=0,lastDowngrade=0;
  const listeners=[];function listen(target,type,handler){if(!target?.addEventListener)return;target.addEventListener(type,handler);listeners.push(()=>target.removeEventListener?.(type,handler));}
  const isReduced=()=>reduced.matches||low;
  let disposed=false;
  let config={requireQuest:false,questId:'energy-core'},unlocked=false,crowdStarted=false;
  const environment={width:innerWidth,cores:navigator.hardwareConcurrency||4,memory:navigator.deviceMemory||4};
  function qualityValue(){return model.qualityFor({...environment,width:innerWidth,reduced:isReduced(),preset:$('preset').value});}
  function soundUI(){ $('sound').textContent=soundWanted?'靜音':'開啟音效';$('sound').setAttribute('aria-pressed',String(soundWanted)); }
  function quiet(){soundGeneration++;soundEnabled=false;audioEngine?.stop();audio?.suspend().catch(()=>{});crowdStarted=false;}
  async function resumeSound(){
    const generation=++soundGeneration;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('瀏覽器不支援 Web Audio');
      if(!audio){audio=new Audio();audioEngine=window.CampusFireworkAudio.create(audio,audio.destination,{manifestURL:new URL('assets/sounds/manifest.json',document.baseURI).href});}
      // resume is called before awaiting a fetch, while the user activation is alive (iOS).
      const resume=audio.resume().then(()=>{if(generation!==soundGeneration&&(!soundWanted||!running||document.hidden||window.proposalHidden))return audio.suspend();});$('audio-status').textContent='正在載入真實錄音……';
      const [result]=await Promise.all([audioEngine.load(),resume]);
      if(generation!==soundGeneration){if(!soundWanted||!running||document.hidden||window.proposalHidden)audio.suspend().catch(()=>{});return;}
      soundEnabled=soundWanted&&running&&!document.hidden&&!window.proposalHidden;
      audioEngine.setVolume(Number($('volume').value)/100);
      $('audio-status').textContent=result.failed.length?`已載入 ${result.loaded}/18；缺少 ${result.failed.length} 個資源，未載入部分保持無聲。`:`已載入 ${result.loaded}/18 個真實錄音樣本。`;
      if(!soundEnabled)quiet();
    }catch(error){if(generation!==soundGeneration)return;soundWanted=false;quiet();soundUI();$('audio-status').textContent='音效無法啟用：'+error.message+'。仍可欣賞煙火。';}
  }
  function play(kind,position,extra={}){if(!soundEnabled)return null;return audioEngine?.play(kind,{position,camera:api.camera,...extra});}
  function night(amount){
    if(!saved)return;
    api.scene.background.copy(saved.background).lerp(new THREE.Color(0x040a1b),amount);
    if(api.scene.fog&&saved.fog)api.scene.fog.color.copy(saved.fog).lerp(new THREE.Color(0x08142b),amount);
    for(const [light,intensity] of saved.lights)light.intensity=intensity*(1-.83*amount);
    if(api.renderer)api.renderer.toneMappingExposure=saved.exposure*(1-.35*amount);
  }
  function cinematicView(){
    if(!running)return;
    if(!cameraSaved)cameraSaved={mode:currentMode,position:api.camera.position.clone(),target:api.controls.target.clone()};
    api.setControlMode('bird');cancelCameraTween();
    const damping=api.controls.enableDamping;api.controls.enableDamping=false;api.controls.update();api.controls.enableDamping=damping;
    const mobile=innerWidth<600;
    api.camera.position.set(mobile?-25:-125,mobile?49:59,mobile?355:245);api.controls.target.set(0,mobile?78:69,-35);api.camera.lookAt(api.controls.target);interacted=false;
    fx?.alignText?.();
  }
  function start(){
    if(disposed)return false;
    if(config.requireQuest&&!unlocked){panel.hidden=false;$('status').textContent='完成能源核心修復任務後，即可解鎖煙火秀。';return false;}
    if(running){const wanted=soundWanted;stop(false);soundWanted=wanted;}
    previousFocus=document.activeElement;const fromCover=!!cover?.open;if(fromCover)cover.close();
    saved={background:api.scene.background.clone(),fog:api.scene.fog?.color.clone(),lights:[],exposure:api.renderer?.toneMappingExposure};api.scene.traverse(o=>{if(o.isLight)saved.lights.push([o,o.intensity]);});
    running=true;elapsed=0;last=0;cueIndex=0;cues=model.createCues();phase='';slowSum=0;slowFrames=0;lastDowngrade=0;cameraSaved=null;interacted=false;crowdStarted=false;
    quality=qualityValue();
    fx=window.CampusFireworkScene.create(api,quality,{
      textPanel:()=>panel.getBoundingClientRect(),
      launch:position=>play('launch',position),
      move:(handle,position)=>{if(soundEnabled)audioEngine?.updateSource(handle,position,api.camera);},
      burst:(position,kind,size=1)=>{
        const distance=positionDistance(position);play(distance>300?'far':'near',position,{size});play('crackle',position,{delay:.08});play('tail',position,{delay:.18});
      }
    });
    panel.hidden=false;panel.classList.remove('is-finished');banner.hidden=false;document.body.classList.add('anniversary-playing');
    if(fromCover){cinematicView();if(!document.body.classList.contains('guide-collapsed'))document.getElementById('guide-toggle')?.click();}
    quiet();if(soundWanted)void resumeSound();soundUI();updatePhase('countdown');return true;
  }
  function positionDistance(position){return Math.hypot(position.x-api.camera.position.x,position.y-api.camera.position.y,position.z-api.camera.position.z);}
  function stop(finished=false){
    running=false;quiet();fx?.dispose();fx=null;night(0);saved=null;last=0;
    if(!finished)soundWanted=false;soundUI();
    document.body.classList.remove('anniversary-playing','anniversary-lettering');banner.hidden=true;
    if(cameraSaved&&!interacted&&currentMode==='bird'){
      api.setControlMode(cameraSaved.mode);cancelCameraTween();api.camera.position.copy(cameraSaved.position);api.controls.target.copy(cameraSaved.target);api.camera.lookAt(cameraSaved.target);
    }
    cameraSaved=null;
    panel.hidden=!finished;panel.classList.toggle('is-finished',finished);panel.dataset.phase=finished?'finished':'stopped';
    if(finished){$('status').textContent='煙火秀已結束，謝謝你一起點亮大溪的八十週年。';$('replay').textContent='再次觀看';}
    else if(panel.contains(document.activeElement))launcher.focus({preventScroll:true});
    return true;
  }
  function updatePhase(value){
    if(phase===value)return;phase=value;panel.dataset.phase=value;
    const copy={countdown:'準備好了嗎？生日煙火即將開始。',sparse:'序曲・第一道祝福升空',dense:'盛放・金色菊花、彩球、垂柳、環狀與扇形連發',formation:'金色光點匯聚，寫下大溪的生日祝福。',blessing:'大溪國中 80 週年校慶快樂！',fade:'將這一夜的光，留在每位大溪人的心裡。'};
    $('status').textContent=copy[value]||'';
    document.body.classList.toggle('anniversary-lettering',['formation','blessing','fade'].includes(value));
    banner.hidden=value!=='countdown';if(value!=='countdown')banner.textContent='';
  }
  function update(now){
    if(!running)return;
    if(document.hidden||window.proposalHidden){last=0;return;}
    const step=model.frameStep(now,last);last=now;elapsed+=step.elapsedMs;
    const next=model.phaseAt(elapsed);if(next==='finished'){stop(true);return;}updatePhase(next);
    if(next==='countdown')banner.textContent=String(Math.max(1,3-Math.floor(elapsed/1000)));
    const darkness=elapsed<3000?elapsed/3000:elapsed<27000?1:(30000-elapsed)/3000;night(darkness);
    while(cueIndex<cues.length&&cues[cueIndex].at<=elapsed){const cue=cues[cueIndex++];if(!isReduced()&&elapsed-cue.at<900&&elapsed<27000)fx.launch(cue);}
    if(soundEnabled&&!crowdStarted&&elapsed>=3000&&elapsed<27000){play('crowd',api.camera.position,{loop:true});crowdStarted=true;}
    if(soundEnabled&&next==='fade')audioEngine.setVolume(Number($('volume').value)/100*Math.max(0,(30000-elapsed)/3000));
    fx.update(step.elapsedMs/1000,isReduced()&&elapsed>=3000?Math.max(23500,elapsed):elapsed,isReduced()&&elapsed>=3000);
    panel.querySelector('.anniversary-track i').style.width=Math.min(100,elapsed/300)+'%';
    if(step.elapsedMs>0){slowSum+=step.elapsedMs;slowFrames++;}
    if(slowFrames>=40&&elapsed-lastDowngrade>3500){
      if(slowSum/slowFrames>42&&quality.tier!=='low'){
        const tier=quality.tier==='high'?'medium':quality.tier==='medium'?'mobile':'low';
        quality=model.qualityFor({width:tier==='mobile'?390:900,cores:8,memory:4,low:tier==='low'});fx.setQuality(quality);$('preset').dataset.adapted=tier;
      }
      slowSum=0;slowFrames=0;lastDowngrade=elapsed;
    }
  }
  $('replay').onclick=start;$('close').onclick=()=>stop();launcher.onclick=start;coverEntry.onclick=start;
  $('sound').onclick=()=>{soundWanted=!soundWanted;soundUI();if(soundWanted&&running)void resumeSound();else quiet();};
  $('volume').oninput=()=>{$('volume-value').textContent=$('volume').value+'%';audioEngine?.setVolume(Number($('volume').value)/100);};
  $('quality').onclick=()=>{low=!low;$('quality').setAttribute('aria-pressed',String(low));$('quality').textContent=low?'恢復動畫':'降低動畫';quality=qualityValue();fx?.setQuality(quality);};
  $('preset').onchange=()=>{quality=qualityValue();fx?.setQuality(quality);};
  $('view').onclick=cinematicView;
  listen(window,'keydown',event=>{if(event.key==='Escape'&&running)stop();else if(running&&!panel.contains(event.target)&&['w','a','s','d','ArrowLeft','ArrowUp','ArrowDown','ArrowRight'].includes(event.key))interacted=true;});
  listen(document.getElementById('webgl-canvas'),'pointerdown',()=>{if(running)interacted=true;});
  function visibility(){if(!running)return;last=0;if(document.hidden||window.proposalHidden)quiet();else if(soundWanted)void resumeSound();}
  listen(document,'visibilitychange',visibility);
  listen(window,'message',event=>{if(event.source===window.parent&&event.origin===location.origin&&event.data?.type==='proposal:visibility'){window.proposalHidden=!event.data.visible;visibility();}});
  listen(reduced,'change',()=>{quality=qualityValue();fx?.setQuality(quality);});
  function unlock(questId){if(questId!==config.questId)return false;unlocked=true;launcher.dataset.unlocked='true';launcher.title='任務完成，已解鎖校慶煙火獎勵';return true;}
  listen(window,'campus:quest-complete',event=>unlock(event.detail?.questId));
  window.campusAnniversary={start,stop,update,unlock,configure:options=>{config={...config,...options};},stats:()=>({running,elapsed,phase,quality:quality?.tier,reduced:isReduced(),unlocked,visual:fx?.stats()||null,audio:audioEngine?.stats()||null,soundWanted,soundEnabled}),dispose:()=>{disposed=true;stop();audioEngine?.dispose();audio?.close?.();listeners.splice(0).forEach(remove=>remove());launcher.remove();panel.remove();banner.remove();coverEntry.remove();}};
})();
