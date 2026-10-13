"use client";

import { Howl } from "howler";

// Synthetic Sound Effects via Web Audio API (Tanpa perlu file eksternal)
export function playChimeSound() {
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (chord manis)
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);

      gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.6);
    });
  } catch (e) {
    console.warn("AudioContext chime not supported", e);
  }
}

export function playPopSound(level: number = 1) {
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const baseFreq = 300 + level * 120;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.warn("AudioContext pop not supported", e);
  }
}

// Background Music Player via Howler
class BGMManager {
  private howl: Howl | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private hasInteracted: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();

  init(src: string = "/audio/music.mp3") {
    if (typeof window === "undefined" || this.howl) return;

    this.howl = new Howl({
      src: [src],
      html5: true,
      loop: true,
      volume: 0.5,
      onloaderror: () => {
        console.log("[BGM] File musik di /audio/music.mp3 belum tersedia.");
      },
      onplay: () => {
        this.isPlaying = true;
        this.notify();
      },
      onpause: () => {
        this.isPlaying = false;
        this.notify();
      },
      onstop: () => {
        this.isPlaying = false;
        this.notify();
      },
    });

    // Dengarkan interaksi pertama untuk memulai musik
    const startOnInteraction = () => {
      if (!this.hasInteracted) {
        this.hasInteracted = true;
        if (!this.isMuted) {
          this.play();
        }
      }
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
    };

    window.addEventListener("click", startOnInteraction, { once: true });
    window.addEventListener("touchstart", startOnInteraction, { once: true });
  }

  play() {
    if (!this.howl) this.init();
    if (this.howl && !this.isPlaying) {
      this.howl.play();
      this.isMuted = false;
    }
  }

  pause() {
    if (this.howl && this.isPlaying) {
      this.howl.pause();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      this.isMuted = true;
    } else {
      this.play();
      this.isMuted = false;
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }
}

export const bgmManager = new BGMManager();

