/* Locally synthesized stereo fireworks. Buffers are created only after opt-in. */
(() => {
  function synthesize(kind, sampleRate, random = Math.random) {
    const duration = kind === 'launch' ? .86 : 3.25;
    const channels = [new Float32Array(Math.ceil(duration * sampleRate)), new Float32Array(Math.ceil(duration * sampleRate))];
    const pops = kind === 'launch' ? [] : Array.from({length: 44}, () => ({
      time: .18 + random() ** .65 * 1.85, strength: .08 + random() * .20,
      decay: .007 + random() * .025, pan: random() * 1.6 - .8
    }));
    let bass = 0, phase = 0;
    for (let i = 0; i < channels[0].length; i++) {
      const t = i / sampleRate, noise = random() * 2 - 1;
      bass += (noise - bass) * (1 - Math.exp(-2 * Math.PI * 170 / sampleRate));
      phase += 2 * Math.PI * (42 + 51 * Math.exp(-t * 15)) / sampleRate;
      for (let c = 0; c < 2; c++) {
        const side = random() * 2 - 1;
        let value;
        if (kind === 'launch') {
          const envelope = Math.min(1, t / .045) * Math.pow(Math.max(0, 1 - t / duration), .65);
          value = (noise * .22 + side * .11 + Math.sin(2 * Math.PI * (520 * t + 750 * t * t)) * .065) * envelope;
        } else {
          const attack = Math.min(1, t / .0015);
          const impact = (noise * .53 + side * .17) * Math.exp(-t * 34);
          const boom = (Math.sin(phase) * .42 + bass * 1.15) * Math.exp(-t * 3.5);
          const tail = side * .14 * Math.exp(-t * 1.65) * (1 - Math.exp(-t * 30));
          value = (impact + boom + tail) * attack;

        }
        channels[c][i] = value;
      }
    }
    for (const pop of pops) for (let c=0;c<2;c++) {
      const start=Math.max(0,Math.ceil((pop.time+(c?pop.pan*.001:0))*sampleRate));
      const count=Math.ceil(pop.decay*7*sampleRate);
      for(let j=0;j<count&&start+j<channels[c].length;j++)
        channels[c][start+j]+=(random()*2-1)*pop.strength*Math.exp(-j/sampleRate/pop.decay)*(1+(c?pop.pan:-pop.pan))*.5;
    }
    for(const channel of channels)for(let i=0;i<channel.length;i++)
      channel[i]=Math.tanh(channel[i]*1.5)*.85*Math.min(1,(duration-i/sampleRate)/.04);
    return channels;
  }
  function create(context, output) {
    const cache = new Map(), active = new Set();
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -14; compressor.knee.value = 12;
    compressor.ratio.value = 7; compressor.attack.value = .003; compressor.release.value = .22;
    compressor.connect(output);
    function buffer(kind, variant) {
      const key = `${kind}-${variant}`;
      if (!cache.has(key)) {
        const data = synthesize(kind, context.sampleRate), b = context.createBuffer(2, data[0].length, context.sampleRate);
        data.forEach((samples, index) => b.copyToChannel(samples, index)); cache.set(key, b);
      }
      return cache.get(key);
    }
    function play(kind, horizontal = .5) {
      if (active.size >= 16) return;
      const source = context.createBufferSource(), gain = context.createGain(), pan = context.createStereoPanner();
      source.buffer = buffer(kind, Math.floor(Math.random() * 3));
      source.playbackRate.value = .92 + Math.random() * .16;
      gain.gain.value = kind === 'launch' ? .30 : .92;
      pan.pan.value = Math.max(-.75, Math.min(.75, (horizontal - .5) * 1.5));
      source.connect(gain); gain.connect(pan); pan.connect(compressor); active.add(source);
      source.onended = () => {active.delete(source);source.disconnect();gain.disconnect();pan.disconnect();};
      source.start();
    }
    function stop() {for (const source of active) {try {source.stop();} catch { /* Already ended. */ }} }
    return {play, stop};
  }
  window.CampusFireworkAudio = Object.freeze({synthesize, create});
})();
