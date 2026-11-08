// Web Audio API synthesized sound effects for the Shatterable Prize Reveal
// Completely self-contained, zero external assets, browser-compatible

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy initialized on first user interaction to comply with browser audio policies
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // 1. Crisp Glass Crack / Tap Sound
  public playCrack(intensity: number = 1) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // High frequency noise burst filtered for crisp glass snap
    const bufferSize = Math.floor(ctx.sampleRate * 0.08);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(4500 + intensity * 1500, now);
    bandpass.Q.setValueAtTime(6, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3 * intensity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    whiteNoise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start(now);

    // Resonant ping
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(2800 + intensity * 600, now);
    oscGain.gain.setValueAtTime(0.18 * intensity, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // 2. Full Glass Shatter & Blast Explosion
  public playShatter() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // A. Sub-bass impact thud
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.35);
    subGain.gain.setValueAtTime(0.6, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.35);

    // B. Complex multi-layered shattering noise buffer
    const dur = 0.55;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.setValueAtTime(3000, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(highpass);
    highpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // C. Shimmering high-pitched resonant glass pings (scintillation)
    const freqs = [3200, 4400, 5600, 6800, 8200];
    freqs.forEach((freq, idx) => {
      const ping = ctx.createOscillator();
      const pingGain = ctx.createGain();
      ping.type = "sine";
      const startTime = now + idx * 0.03 + Math.random() * 0.04;
      ping.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 400, startTime);

      pingGain.gain.setValueAtTime(0.12, startTime);
      pingGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.25);

      ping.connect(pingGain);
      pingGain.connect(ctx.destination);

      ping.start(startTime);
      ping.stop(startTime + 0.25);
    });
  }

  // 3. Victory Fanfare / Grand Reveal Chime
  public playVictoryChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Ascending Cyber Gold arpeggio: C5, E5, G5, B5, C6
    const chord = [523.25, 659.25, 783.99, 987.77, 1046.5];

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      const start = now + 0.15 + i * 0.08;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.2, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.9);
    });
  }
}

export const soundEffects = new SoundEffectsManager();

