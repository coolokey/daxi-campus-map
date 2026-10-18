// 桃園市立大溪國中 真實版 RPG - Web Audio 8-bit 音效合成器
// 完全免外部音訊檔案，無載入延遲，即時高品質合成

class RpgAudioManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.lastFootstep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playFootstep() {
    if (this.muted) return;
    const now = performance.now();
    if (now - this.lastFootstep < 280) return;
    this.lastFootstep = now;

    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.06);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    } catch (e) {}
  }

  playSelect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch (e) {}
  }

  playDialogueBlip() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520 + (Math.random() * 80 - 40), t);

      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {}
  }

  playQuestFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const baseT = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = baseT + idx * 0.11;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + (idx === notes.length - 1 ? 0.45 : 0.12));

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + (idx === notes.length - 1 ? 0.45 : 0.12));
      });
    } catch (e) {}
  }

  playFireworkBurst() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      
      // Noise burst for firework pop
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.frequency.exponentialRampToValueAtTime(200, t + 0.25);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
      noise.stop(t + 0.25);
    } catch (e) {}
  }
}

window.rpgAudio = new RpgAudioManager();
