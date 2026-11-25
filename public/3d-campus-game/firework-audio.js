/* Real recorded samples only. Reverb impulse is procedural; firework sounds are not. */
(() => {
  function create(context, output, options={}) {
    const fetcher=options.fetch||fetch,random=options.random||Math.random;
    const manifestURL=options.manifestURL||new URL('assets/sounds/manifest.json',document.baseURI).href;
    const buffers=new Map(),loadedKeys=new Set(),lastSample=new Map(),active=new Map(),retiring=new Map(),played=[],failed=[];
    const priorities={near:6,far:5,launch:4,crowd:3,crackle:2,tail:1};let preempted=0,dropped=0;
    const abort=new AbortController();let pending=null,disposed=false,volume=1;
    const mix=context.createGain(),compressor=context.createDynamicsCompressor(),limiter=context.createWaveShaper(),master=context.createGain();
    // Keep the transient punch; a soft ceiling protects headroom during dense volleys.
    compressor.threshold.value=-12;compressor.knee.value=8;compressor.ratio.value=3.5;compressor.attack.value=.012;compressor.release.value=.24;
    const curve=new Float32Array(4096);for(let i=0;i<curve.length;i++)curve[i]=.96*Math.tanh((i/(curve.length-1)*2-1)*1.1)/Math.tanh(1.1);
    limiter.curve=curve;limiter.oversample='4x';master.gain.value=volume;
    mix.connect(compressor);compressor.connect(limiter);limiter.connect(master);master.connect(output);
    const convolver=context.createConvolver(),wet=context.createGain();wet.gain.value=.14;
    const impulse=context.createBuffer(2,Math.floor(context.sampleRate*1.5),context.sampleRate);
    for(let c=0;c<2;c++){const data=impulse.getChannelData(c);for(let i=0;i<data.length;i++)data[i]=(random()*2-1)*Math.exp(-i/context.sampleRate*5)*.35;}
    convolver.buffer=impulse;convolver.connect(wet);wet.connect(mix);
    async function load(){
      if(pending)return pending;
      failed.length=0;
      pending=(async()=>{
        try{
          const response=await fetcher(manifestURL,{signal:abort.signal,cache:'no-cache'});if(!response.ok)throw new Error('Manifest HTTP '+response.status);
          const manifest=await response.json();
          await Promise.all(Object.entries(manifest.layers).flatMap(([kind,entries])=>entries.map(async entry=>{
            const key=kind+'|'+entry.file+'|'+(entry.sha256||'');if(loadedKeys.has(key))return;
            try{
              const url=new URL(entry.file,manifestURL).href;
              const versioned=new URL(url);if(entry.sha256)versioned.searchParams.set('v',entry.sha256.slice(0,16));
              const response=await fetcher(versioned.href,{signal:abort.signal});if(!response.ok)throw new Error('HTTP '+response.status);
              const buffer=await context.decodeAudioData(await response.arrayBuffer());
              if(disposed)return;
              if(!buffers.has(kind))buffers.set(kind,[]);buffers.get(kind).push({buffer,file:entry.file});loadedKeys.add(key);
            }catch(error){if(!disposed)failed.push(entry.file+': '+error.message);}
          })));
        }catch(error){if(!disposed)failed.push('manifest: '+error.message);}
        return {loaded:[...buffers.values()].reduce((n,list)=>n+list.length,0),failed:[...failed],layers:Object.fromEntries([...buffers].map(([kind,list])=>[kind,list.length]))};
      })();
      const result=await pending;if(result.failed.length)pending=null;return result;
    }
    function spatial(position,camera){return window.CampusAnniversary.spatialAudio(position||{x:0,y:0,z:0},camera||{x:0,y:0,z:0});}
    // Cinematic zoom is a framing decision, not a request to turn the sound down.
    const presentationGain=distance=>.45+.55/(1+(distance/700)**2);
    function updateSource(handle,position,camera){
      const entry=active.get(handle);if(!entry)return;
      const state=spatial(position,camera),time=context.currentTime;
      entry.pan.pan.setTargetAtTime(state.pan,time,.08);entry.gain.gain.setTargetAtTime(entry.baseGain*presentationGain(state.distance),time,.08);
    }
    function play(kind,settings={}){
      const choices=buffers.get(kind);if(disposed||!choices?.length)return null;
      const priority=priorities[kind]||1;
      if(active.size>=18){
        const victim=[...active].filter(([,entry])=>entry.priority<priority||(kind==='near'&&entry.kind==='near')).sort((a,b)=>a[1].priority-b[1].priority||a[1].started-b[1].started)[0];
        if(!victim){dropped++;return null;}
        const [source,entry]=victim;active.delete(source);retiring.set(source,entry);preempted++;
        entry.gain.gain.cancelScheduledValues?.(context.currentTime);entry.gain.gain.setTargetAtTime(0,context.currentTime,.008);
        try{source.stop(context.currentTime+.025)}catch{entry.cleanup()}
        if(retiring.size>4){const [old,record]=retiring.entries().next().value;try{old.stop()}catch{}record.cleanup()}
      }
      let index=Math.floor(random()*choices.length);if(choices.length>1&&index===lastSample.get(kind))index=(index+1)%choices.length;lastSample.set(kind,index);
      const selected=choices[index],source=context.createBufferSource(),gain=context.createGain(),pan=context.createStereoPanner(),filter=context.createBiquadFilter(),send=context.createGain();
      const state=spatial(settings.position,settings.camera);
      const size=Math.max(.3,Math.min(1,settings.size||1)),small=kind==='near'&&size<.7;
      const baseGain=({launch:.4,near:.82,far:.75,crackle:.27,tail:.2,crowd:.035}[kind]||.2)*size*Math.max(0,Math.min(1,settings.gain??1));
      source.buffer=selected.buffer;source.playbackRate.value=kind==='crowd'?1:.96+random()*.08;
      if(small)source.playbackRate.value*=1.3;
      const duration=small?Math.min(.85,selected.buffer.duration):selected.buffer.duration;
      source.loop=!!settings.loop;
      filter.type='lowpass';filter.frequency.value=kind==='far'?1100:kind==='crowd'?5000:Math.max(5000,12000-state.distance*3);
      gain.gain.value=baseGain*(kind==='crowd'?1:presentationGain(state.distance));pan.pan.value=kind==='crowd'?0:state.pan;send.gain.value=kind==='launch'?.06:.18;
      source.connect(filter);filter.connect(gain);gain.connect(pan);pan.connect(mix);pan.connect(send);send.connect(convolver);
      const cleanup=()=>{if(!active.has(source)&&!retiring.has(source))return;active.delete(source);retiring.delete(source);for(const node of [source,gain,pan,filter,send])node.disconnect();};
      active.set(source,{gain,pan,baseGain,cleanup,priority,kind,started:context.currentTime});source.onended=cleanup;
      // Match each visual event; distance only changes loudness, filtering and pan.
      const acousticDelay=0;
      const at=context.currentTime+acousticDelay+(settings.delay||0);
      if(small){const end=at+duration/source.playbackRate.value;gain.gain.setValueAtTime(gain.gain.value,end-.045);gain.gain.linearRampToValueAtTime(0,end);}
      try{if(small)source.start(at,0,duration);else source.start(at);}catch(error){cleanup();return null;}
      played.push({kind,size,rate:source.playbackRate.value,duration,file:selected.file,visualTime:context.currentTime,scheduledAt:at,delay:acousticDelay,pan:pan.pan.value,gain:gain.gain.value});
      if(played.length>400)played.shift();return source;
    }
    function stop(){for(const [source,entry] of [...active,...retiring]){try{source.stop();}catch{}entry.cleanup();}convolver.buffer=null;convolver.buffer=impulse;}
    function setVolume(value){volume=Math.min(1,Math.max(0,Number(value)||0));master.gain.setTargetAtTime(volume,context.currentTime,.04);}
    function stats(){return {active:active.size,retiring:retiring.size,preempted,dropped,loaded:[...buffers.values()].reduce((n,list)=>n+list.length,0),failed:[...failed],played:[...played],volume};}
    function dispose(){disposed=true;abort.abort();stop();buffers.clear();for(const node of [mix,compressor,limiter,master,wet,convolver])node.disconnect();}
    return {load,play,updateSource,stop,setVolume,stats,dispose};
  }
  window.CampusFireworkAudio=Object.freeze({create});
})();
