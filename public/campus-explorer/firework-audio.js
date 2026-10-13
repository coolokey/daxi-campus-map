/* Real recorded samples only. Reverb impulse is procedural; firework sounds are not. */
(() => {
  function create(context, output, options={}) {
    const fetcher=options.fetch||fetch,random=options.random||Math.random;
    const manifestURL=options.manifestURL||new URL('assets/sounds/manifest.json',document.baseURI).href;
    const buffers=new Map(),lastSample=new Map(),active=new Map(),played=[],failed=[];
    const abort=new AbortController();let pending=null,disposed=false,volume=1;
    const mix=context.createGain(),compressor=context.createDynamicsCompressor(),limiter=context.createWaveShaper(),master=context.createGain();
    compressor.threshold.value=-20;compressor.knee.value=10;compressor.ratio.value=12;compressor.attack.value=.002;compressor.release.value=.2;
    const curve=new Float32Array(4096);for(let i=0;i<curve.length;i++)curve[i]=.88*Math.tanh((i/(curve.length-1)*2-1)*1.45);
    limiter.curve=curve;limiter.oversample='4x';master.gain.value=volume;
    mix.connect(compressor);compressor.connect(limiter);limiter.connect(master);master.connect(output);
    const convolver=context.createConvolver(),wet=context.createGain();wet.gain.value=.14;
    const impulse=context.createBuffer(2,Math.floor(context.sampleRate*1.5),context.sampleRate);
    for(let c=0;c<2;c++){const data=impulse.getChannelData(c);for(let i=0;i<data.length;i++)data[i]=(random()*2-1)*Math.exp(-i/context.sampleRate*5)*.35;}
    convolver.buffer=impulse;convolver.connect(wet);wet.connect(mix);
    async function load(){
      if(pending)return pending;
      pending=(async()=>{
        try{
          const response=await fetcher(manifestURL,{signal:abort.signal,cache:'no-cache'});if(!response.ok)throw new Error('Manifest HTTP '+response.status);
          const manifest=await response.json();
          await Promise.all(Object.entries(manifest.layers).flatMap(([kind,entries])=>entries.map(async entry=>{
            try{
              const url=new URL(entry.file,manifestURL).href;
              const versioned=new URL(url);if(entry.sha256)versioned.searchParams.set('v',entry.sha256.slice(0,16));
              const response=await fetcher(versioned.href,{signal:abort.signal});if(!response.ok)throw new Error('HTTP '+response.status);
              const buffer=await context.decodeAudioData(await response.arrayBuffer());
              if(disposed)return;
              if(!buffers.has(kind))buffers.set(kind,[]);buffers.get(kind).push({buffer,file:entry.file});
            }catch(error){if(!disposed)failed.push(entry.file+': '+error.message);}
          })));
        }catch(error){if(!disposed)failed.push('manifest: '+error.message);}
        return {loaded:[...buffers.values()].reduce((n,list)=>n+list.length,0),failed:[...failed],layers:Object.fromEntries([...buffers].map(([kind,list])=>[kind,list.length]))};
      })();return pending;
    }
    function spatial(position,camera){return window.CampusAnniversary.spatialAudio(position||{x:0,y:0,z:0},camera||{x:0,y:0,z:0});}
    function updateSource(handle,position,camera){
      const entry=active.get(handle);if(!entry)return;
      const state=spatial(position,camera),time=context.currentTime;
      entry.pan.pan.setTargetAtTime(state.pan,time,.08);entry.gain.gain.setTargetAtTime(entry.baseGain*state.gain,time,.08);
    }
    function play(kind,settings={}){
      const choices=buffers.get(kind);if(disposed||!choices?.length||active.size>=18)return null;
      let index=Math.floor(random()*choices.length);if(choices.length>1&&index===lastSample.get(kind))index=(index+1)%choices.length;lastSample.set(kind,index);
      const selected=choices[index],source=context.createBufferSource(),gain=context.createGain(),pan=context.createStereoPanner(),filter=context.createBiquadFilter(),send=context.createGain();
      const state=spatial(settings.position,settings.camera);
      const size=Math.max(.3,Math.min(1,settings.size||1)),small=kind==='near'&&size<.7;
      const baseGain=({launch:.5,near:.82,far:.75,crackle:.22,tail:.18,crowd:.12}[kind]||.2)*size;
      source.buffer=selected.buffer;source.playbackRate.value=kind==='crowd'?1:.96+random()*.08;
      if(small)source.playbackRate.value*=1.3;
      const duration=small?Math.min(.85,selected.buffer.duration):selected.buffer.duration;
      source.loop=!!settings.loop;
      filter.type='lowpass';filter.frequency.value=kind==='far'?700:kind==='crowd'?5000:Math.max(1800,12000-state.distance*18);
      gain.gain.value=baseGain*(kind==='crowd'?1:state.gain);pan.pan.value=kind==='crowd'?0:state.pan;send.gain.value=kind==='launch'?.06:.22;
      source.connect(filter);filter.connect(gain);gain.connect(pan);pan.connect(mix);pan.connect(send);send.connect(convolver);
      const cleanup=()=>{if(!active.has(source))return;active.delete(source);for(const node of [source,gain,pan,filter,send])node.disconnect();};
      active.set(source,{gain,pan,baseGain,cleanup});source.onended=cleanup;
      // Match each visual event; distance only changes loudness, filtering and pan.
      const acousticDelay=0;
      const at=context.currentTime+acousticDelay+(settings.delay||0);
      if(small){const end=at+duration/source.playbackRate.value;gain.gain.setValueAtTime(gain.gain.value,end-.045);gain.gain.linearRampToValueAtTime(0,end);}
      try{if(small)source.start(at,0,duration);else source.start(at);}catch(error){cleanup();return null;}
      played.push({kind,size,rate:source.playbackRate.value,duration,file:selected.file,visualTime:context.currentTime,scheduledAt:at,delay:acousticDelay,pan:pan.pan.value,gain:gain.gain.value});
      if(played.length>400)played.shift();return source;
    }
    function stop(){for(const [source,entry] of [...active]){try{source.stop();}catch{}entry.cleanup();}convolver.buffer=null;convolver.buffer=impulse;}
    function setVolume(value){volume=Math.min(1,Math.max(0,Number(value)||0));master.gain.setTargetAtTime(volume,context.currentTime,.04);}
    function stats(){return {active:active.size,loaded:[...buffers.values()].reduce((n,list)=>n+list.length,0),failed:[...failed],played:[...played],volume};}
    function dispose(){disposed=true;abort.abort();stop();buffers.clear();for(const node of [mix,compressor,limiter,master,wet,convolver])node.disconnect();}
    return {load,play,updateSource,stop,setVolume,stats,dispose};
  }
  window.CampusFireworkAudio=Object.freeze({create});
})();
