// Web Audio API Sound Synthesizer Utility for SM Flasher Portal

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

/**
 * Chat Message Notification Sound (Melodic Pop Tone)
 */
export const playChatNotificationSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Tone 1
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5

    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.25);

    // Tone 2 (Higher ping)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1174.66, now + 0.08); // D6

    gain2.gain.setValueAtTime(0.3, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now + 0.08);
    osc2.stop(now + 0.35);
  } catch (e) {
    console.warn('Audio play error:', e);
  }
};

/**
 * Incoming/Outgoing Call Ringtone Sound (Dual Pulse Ring Tone)
 */
export const playCallRingtoneSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Dual Tone Ring (440Hz + 480Hz - standard ringtone frequencies)
    const oscA = ctx.createOscillator();
    const oscB = ctx.createOscillator();
    const gain = ctx.createGain();

    oscA.type = 'sine';
    oscB.type = 'sine';

    oscA.frequency.setValueAtTime(440, now);
    oscB.frequency.setValueAtTime(480, now);

    // Pulse envelope (Ring... Ring...)
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain.gain.setValueAtTime(0.2, now + 0.6);
    gain.gain.linearRampToValueAtTime(0, now + 0.7);

    gain.gain.setValueAtTime(0, now + 0.9);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.95);
    gain.gain.setValueAtTime(0.2, now + 1.5);
    gain.gain.linearRampToValueAtTime(0, now + 1.6);

    oscA.connect(gain);
    oscB.connect(gain);
    gain.connect(ctx.destination);

    oscA.start(now);
    oscB.start(now);
    oscA.stop(now + 1.7);
    oscB.stop(now + 1.7);
  } catch (e) {
    console.warn('Audio play error:', e);
  }
};

/**
 * AI Damage Analysis Success Chime (Tech Diagnostic Arpeggio)
 */
export const playAiDiagnosticSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch (e) {
    console.warn('Audio play error:', e);
  }
};

/**
 * Indonesian Female Voice Text-to-Speech (TTS) Engine
 */
export const speakIndonesian = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    // Clean text punctuation for smooth speech synthesis
    const cleanText = text.replace(/,+/g, ',').replace(/!+/g, '!').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.pitch = 1.35; // Suara wanita muda remaja
    utterance.rate = 0.96; // Kecepatan ucapan alami Bahasa Indonesia

    const setVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      // Prioritize Indonesian female voice
      const idVoice =
        voices.find(
          (v) =>
            (v.lang.includes('id') || v.lang.includes('ID')) &&
            (v.name.toLowerCase().includes('female') ||
              v.name.toLowerCase().includes('gadis') ||
              v.name.toLowerCase().includes('google') ||
              v.name.toLowerCase().includes('indonesia'))
        ) || voices.find((v) => v.lang.includes('id') || v.lang.includes('ID'));

      if (idVoice) {
        utterance.voice = idVoice;
      }
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      setVoiceAndSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        setVoiceAndSpeak();
        window.speechSynthesis.onvoiceschanged = null;
      };
      setTimeout(setVoiceAndSpeak, 100);
    }
  } catch (err) {
    console.warn('TTS Speech error:', err);
  }
};

/**
 * Audio Notification: AI Analysis Complete
 */
export const speakAiAnalysisResult = () => {
  speakIndonesian(
    'Analisa dari Asisten Bang Zuki Sudah siap silahkan ikuti arahan yang telah dihasilkan'
  );
};

/**
 * Audio Notification: Login Success
 */
export const speakLoginSuccess = () => {
  speakIndonesian(
    'Selamat datang di SM Flasher, Selamat Bergabung'
  );
};

/**
 * Audio Notification: Login Failed
 */
export const speakLoginFailed = () => {
  speakIndonesian(
    'Maaf,,!! Anda Belum Terdaftar Sebagai Peserta Kursus, Silahkan Hubungi Admin atau Klik Tombol Daftar Peserta Baru Sekarang, Selamat Bergabung'
  );
};

