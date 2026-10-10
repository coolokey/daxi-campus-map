/* Anniversary experience: local Canvas fireworks and opt-in synthesized audio. */
(() => {
  const api = window.campusExplorer, model = window.CampusAnniversary;
  if (!api || !model) return;
  const cake = '<svg viewBox="0 0 40 44" fill="none" aria-hidden="true"><path d="M8 23h24v16H8z" fill="#e8c587"/><path d="M5 22q4-8 8 0 4-8 8 0 4-8 8 0 4-8 6 0v5H5z" fill="#fff6df" stroke="#956c36"/><path d="M20 11v9M12 14v6M28 14v6" stroke="#956c36" stroke-width="2"/><path d="M20 3q-7 8 0 8 7 0 0-8M12 7q-5 6 0 6 5 0 0-6M28 7q-5 6 0 6 5 0 0-6" fill="#c28b33"/><path d="M5 40h30" stroke="#956c36" stroke-width="2"/></svg>';
  const launcher = document.createElement('button');
  launcher.id = 'anniversary-launch'; launcher.type = 'button'; launcher.title = '校園裡藏著一份生日禮物';
  launcher.setAttribute('aria-label', '開啟大溪八十週年生日煙火'); launcher.innerHTML = cake + '<span>生日驚喜</span>';
  const dialog = document.createElement('dialog'); dialog.id = 'anniversary-dialog'; dialog.setAttribute('aria-labelledby', 'anniversary-title');
  dialog.innerHTML = `<canvas aria-hidden="true"></canvas>
    <header class="anniversary-top"><div class="anniversary-edition">DAXI · A NIGHT TO REMEMBER<strong><span>八十載光陰，</span><span>今夜一起點亮</span></strong></div><div class="anniversary-actions"><button id="anniversary-sound" type="button" aria-pressed="false">開啟音效</button><button id="anniversary-close" type="button">返回校園 ×</button></div></header>
    <section class="anniversary-message"><p class="anniversary-kicker">獻給每一位大溪人</p><div class="anniversary-number" aria-hidden="true">80</div><div class="anniversary-blessing"><h1 id="anniversary-title">大溪國中八十週年生日快樂</h1><p>下一段故事，由你續寫。</p></div></section>
    <footer class="anniversary-bottom"><p id="anniversary-status" role="status" aria-live="polite"></p><div class="anniversary-track" aria-hidden="true"><i></i></div><nav aria-label="煙火操作"><button id="anniversary-fire" type="button" hidden>送上一朵祝福煙火</button><button id="anniversary-replay" type="button">重新欣賞</button></nav><p class="anniversary-hint">音效預設關閉 · 按 Esc 返回校園</p></footer>`;
  document.body.append(launcher, dialog);
  const cover = document.getElementById('guide-landing');
  const coverEntry = document.createElement('button'); coverEntry.type='button'; coverEntry.className='anniversary-cover-entry'; coverEntry.textContent='找到了嗎？校園裡的生日驚喜 ↗';
  cover?.querySelector('footer')?.append(coverEntry);
  const $ = id => dialog.querySelector('#anniversary-' + id);
  const cvs = dialog.querySelector('canvas'), ctx = cvs.getContext('2d');
  if (!ctx) {launcher.remove();coverEntry.remove();dialog.remove();return;}
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const colors = ['#f6d58a','#86d6f2','#edb2bd','#d0e9ba'];
  let width=0,height=0,raf=0,last=0,elapsed=0,nextLaunch=1800,phase='',rockets=[],particles=[],digitPoints=[],staticBlessings=[],saved=null,previousFocus=null,coverWasOpen=false,lastUserLaunch=-Infinity;
  let audio=null,master=null,fireworkAudio=null,soundEnabled=false,soundWanted=false,soundGeneration=0,voices=0,finalePlayed=false;
  const nodes = new Set();
  function audioAvailable(){return soundEnabled && audio?.state==='running' && !document.hidden && dialog.open;}
  function sound(kind, horizontal=.5) {
    if (!audioAvailable()) return;
    if (kind !== 'chime') {fireworkAudio?.play(kind, horizontal);return;}
    if (voices>=8) return;
    const t=audio.currentTime; voices++;
    const gain=audio.createGain(); gain.connect(master);
    let source, filter;
    if(kind==='chime'){
      source=audio.createOscillator();source.type='sine';source.frequency.setValueAtTime(523.25,t);
      for(const frequency of [659.25,783.99]){
        const overtone=audio.createOscillator();overtone.type='sine';overtone.frequency.value=frequency;overtone.connect(gain);nodes.add(overtone);
        overtone.onended=()=>{nodes.delete(overtone);overtone.disconnect();};overtone.start(t);overtone.stop(t+1.55);
      }
      gain.gain.setValueAtTime(.001,t);gain.gain.linearRampToValueAtTime(.075,t+.03);gain.gain.exponentialRampToValueAtTime(.001,t+1.5);
    }
    if(kind==='chime')source.connect(gain);
    nodes.add(source);source.onended=()=>{voices=Math.max(0,voices-1);nodes.delete(source);source.disconnect();filter?.disconnect();gain.disconnect();};
    source.start(t);source.stop(t+(kind==='chime'?1.55:1));
  }
  function quiet(){soundGeneration++;soundEnabled=false;fireworkAudio?.stop();for(const node of nodes){try{node.stop();}catch{ /* Already ended. */ }}if(audio)audio.suspend().catch(()=>{});}
  function updateSound(){ $('sound').textContent=soundWanted?'關閉音效':'開啟音效';$('sound').setAttribute('aria-pressed',String(soundWanted)); }
  async function resumeSound(chime=false){
    const generation=++soundGeneration;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)throw new Error('Audio unavailable');
      if(!audio){audio=new Audio();master=audio.createGain();master.gain.value=.72;master.connect(audio.destination);fireworkAudio=window.CampusFireworkAudio.create(audio,master);}
      await audio.resume();
      if(generation!==soundGeneration){if(!soundWanted||!dialog.open||document.hidden)audio.suspend().catch(()=>{});return;}
      soundEnabled=soundWanted&&dialog.open&&!document.hidden;
      if(soundEnabled&&chime)sound('chime');else if(!soundEnabled)quiet();
    }catch{if(generation!==soundGeneration)return;soundWanted=false;quiet();updateSound();$('status').textContent='此瀏覽器暫時無法播放音效，仍可欣賞煙火。';}
  }
  $('sound').onclick=()=>{
    soundWanted=!soundWanted;updateSound();
    if(soundWanted)void resumeSound(true);else quiet();
  };
  function resize(){
    width=innerWidth;height=innerHeight;const ratio=Math.min(devicePixelRatio||1,1.5);
    cvs.width=Math.round(width*ratio);cvs.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
    const box=dialog.querySelector('.anniversary-number').getBoundingClientRect();
    const stencil=document.createElement('canvas');stencil.width=Math.ceil(box.width);stencil.height=Math.ceil(box.height);
    const pen=stencil.getContext('2d');if(!pen)return;
    const typography=getComputedStyle(dialog.querySelector('.anniversary-number'));
    pen.font=typography.font;pen.letterSpacing=typography.letterSpacing;pen.textAlign='center';pen.textBaseline='middle';pen.fillText('80',box.width/2,box.height*.48);
    const pixels=pen.getImageData(0,0,stencil.width,stencil.height).data;digitPoints=[];
    const step=width<600?5:6;
    for(let y=0;y<stencil.height;y+=step)for(let x=0;x<stencil.width;x+=step)if(pixels[(y*stencil.width+x)*4+3]>110)digitPoints.push({x:box.left+x,y:box.top+y});
  }
  function launch(x,y,shape='round',color=colors[Math.floor(Math.random()*colors.length)]){
    if(rockets.length>=7)return;
    rockets.push({x0:width*(.25+Math.random()*.5),x,y:Math.max(90,Math.min(height*.65,y)),age:0,color,shape});sound('launch',x/width);
  }
  function burst(r){
    sound('burst',r.x/width);
    const scale=Math.min(width,height)*(.12+Math.random()*.055);
    for(const p of model.shapePoints(r.shape,width<600?70:110)){
      if(particles.length>=1100)break;
      const speed=scale*(.8+Math.random()*.2);
      particles.push({x:r.x,y:r.y,vx:p.x*speed,vy:p.y*speed,age:0,life:1.7+Math.random()*.65,color:r.color,trail:[]});
    }
  }
  function setPhase(value){
    if(phase===value)return;phase=value;dialog.dataset.phase=value;
    $('status').textContent=value==='night'?'校園入夜，一份生日驚喜即將升空。':value==='show'?'讓每一道光，成為送給大溪的祝福。':value==='finale'?'大溪八十，生日快樂。':reduced.matches?'靜態紀念模式：送上一道祝福星光。':'點一下天空，親手送上一朵祝福煙火。';
    $('fire').hidden=value!=='free';
    if(value==='finale'&&!finalePlayed){sound('chime');finalePlayed=true;}
  }
  function night(amount){
    if(!saved)return;
    api.scene.background?.copy(saved.background).lerp(new THREE.Color(0x071329),amount);
    if(api.scene.fog&&saved.fog)api.scene.fog.color.copy(saved.fog).lerp(new THREE.Color(0x071329),amount);
    for(const [light,intensity] of saved.lights)light.intensity=intensity*(1-amount*.62);
  }
  function paint(dt){
    ctx.clearRect(0,0,width,height);ctx.globalCompositeOperation='lighter';
    for(let i=0;i<55;i++){const x=((i*173+47)%997)/997*width,y=((i*83+11)%389)/389*height*.65;ctx.globalAlpha=.18+Math.sin(elapsed/1800+i)*.1;ctx.fillStyle='#e6d7b9';ctx.fillRect(x,y,1.2,1.2);}
    ctx.globalAlpha=1;
    for(const r of rockets){r.age+=dt;const t=Math.min(1,r.age/.85),e=1-Math.pow(1-t,2);const x=r.x0+(r.x-r.x0)*e,y=height*.91+(r.y-height*.91)*e;
      ctx.strokeStyle=r.color;ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(x,y+Math.max(9,55*(1-t)));ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle='#fff6cf';ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fill();
      if(t===1)burst(r);
    }
    rockets=rockets.filter(r=>r.age<.85);
    for(const p of particles){p.age+=dt;p.trail.push({x:p.x,y:p.y});if(p.trail.length>4)p.trail.shift();p.vx*=Math.exp(-dt*.8);p.vy+=dt*24;p.x+=p.vx*dt;p.y+=p.vy*dt;
      ctx.globalAlpha=Math.max(0,1-p.age/p.life);ctx.strokeStyle=p.color;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(p.trail[0].x,p.trail[0].y);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,1.8,1.8);
    }
    particles=particles.filter(p=>p.age<p.life);
    if(phase==='finale'||phase==='free'){
      const opacity=reduced.matches?1:Math.min(1,(elapsed-14000)/1700);
      digitPoints.forEach((p,i)=>{ctx.globalAlpha=Math.max(0,opacity)*(.65+.35*Math.sin(i*1.7+elapsed/1200)**2);ctx.fillStyle=i%7?'#ffdda0':'#fff8dc';ctx.beginPath();ctx.arc(p.x,p.y,i%7?1.2:2,0,Math.PI*2);ctx.fill();});
    }
    ctx.globalAlpha=1;ctx.strokeStyle='#ffdda0';ctx.lineWidth=1.5;
    for(const p of staticBlessings){ctx.beginPath();ctx.moveTo(p.x-9,p.y);ctx.lineTo(p.x+9,p.y);ctx.moveTo(p.x,p.y-9);ctx.lineTo(p.x,p.y+9);ctx.stroke();}
    ctx.globalCompositeOperation='source-over';
  }
  function frame(now){
    if(!dialog.open||document.hidden)return;
    const step=model.frameStep(now,last),dt=step.simulationSeconds;last=now;
    elapsed+=step.elapsedMs;setPhase(reduced.matches?'free':model.phaseAt(elapsed));night(reduced.matches?1:Math.min(1,elapsed/1800));
    if(!reduced.matches&&phase!=='free'&&elapsed>=nextLaunch){
      const i=Math.round(nextLaunch/850);launch(width*(.16+Math.random()*.68),height*(.16+Math.random()*.28),['round','star','heart'][i%3]);nextLaunch=elapsed+(phase==='finale'?600:850);
    }
    dialog.querySelector('.anniversary-track i').style.width=Math.min(100,elapsed/200)+'%';
    paint(dt);if(!reduced.matches)raf=requestAnimationFrame(frame);
  }
  function replay(){cancelAnimationFrame(raf);rockets=[];particles=[];staticBlessings=[];elapsed=reduced.matches?20000:0;nextLaunch=1800;last=0;phase='';finalePlayed=false;quiet();if(soundWanted)void resumeSound();setPhase(reduced.matches?'free':'night');raf=requestAnimationFrame(frame);}
  function open(){
    if(dialog.open)return;
    previousFocus=document.activeElement;coverWasOpen=!!cover?.open;if(coverWasOpen)cover.close();
    api.manualTakeover();api.resetManualInput();document.exitPointerLock?.();
    saved={mode:currentMode,position:api.camera.position.clone(),target:api.controls.target.clone(),background:api.scene.background.clone(),fog:api.scene.fog?.color.clone(),lights:[],enabled:api.controls.enabled,damping:api.controls.enableDamping,autoRotate:api.controls.autoRotate};
    api.scene.traverse(object=>{if(object.isLight)saved.lights.push([object,object.intensity]);});
    api.setControlMode('bird');cancelCameraTween();api.controls.enabled=false;api.controls.autoRotate=false;
    // OrbitControls.update runs in the campus loop even when input is disabled.
    // Flush its residual deltas before setting the celebration camera.
    api.controls.enableDamping=false;api.controls.update();
    api.camera.position.set(-155,80,230);api.controls.target.set(-12,49,0);api.camera.lookAt(api.controls.target);
    document.body.classList.add('anniversary-open');dialog.showModal();soundWanted=false;updateSound();resize();replay();$('sound').focus();
  }
  function close(){dialog.close();}
  dialog.addEventListener('close',()=>{
    cancelAnimationFrame(raf);soundWanted=false;quiet();updateSound();rockets=[];particles=[];
    document.body.classList.remove('anniversary-open');
    if(saved){night(0);api.setControlMode(saved.mode);cancelCameraTween();api.camera.position.copy(saved.position);api.controls.target.copy(saved.target);api.camera.lookAt(saved.target);api.controls.enabled=saved.enabled;api.controls.enableDamping=saved.damping;api.controls.autoRotate=saved.autoRotate;saved=null;}
    if(coverWasOpen)cover.showModal();previousFocus?.focus();
  });
  function freeFire(event){
    if(phase!=='free'||performance.now()-lastUserLaunch<250)return;lastUserLaunch=performance.now();
    const x=event?.clientX??width*(.25+Math.random()*.5),y=event?.clientY??height*.3;
    if(reduced.matches){staticBlessings.push({x,y});if(staticBlessings.length>12)staticBlessings.shift();paint(0);$('status').textContent='收到你的祝福，大溪八十，生日快樂！';sound('chime');return;}
    launch(x,y,['round','heart','star'][Math.floor(Math.random()*3)]);
  }
  cvs.addEventListener('pointerdown',freeFire);$('fire').onclick=()=>freeFire();$('close').onclick=close;$('replay').onclick=replay;launcher.onclick=open;coverEntry.onclick=open;
  window.addEventListener('resize',()=>{if(dialog.open){resize();if(reduced.matches)paint(0);}});
  reduced.addEventListener('change',()=>{if(dialog.open)replay();});
  document.addEventListener('visibilitychange',()=>{
    if(!dialog.open)return;
    if(document.hidden){cancelAnimationFrame(raf);quiet();}else{last=0;if(soundWanted)void resumeSound();raf=requestAnimationFrame(frame);}
  });
})();
