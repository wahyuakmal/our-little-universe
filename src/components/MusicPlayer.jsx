import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Upload, Settings2, X, Check, FileAudio, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { uploadImageFile } from '../utils/imageUpload';

export const MusicPlayer = ({ isPlaying, onTogglePlay }) => {
  const { data, coupleConfig } = useLanguage();
  const [isMuted, setIsMuted] = useState(false);
  const [customAudioSrc, setCustomAudioSrc] = useState(null);
  const [currentSongTitle, setCurrentSongTitle] = useState(coupleConfig.music.title);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [copiedPath, setCopiedPath] = useState(false);

  const audioRef = useRef(null);
  const synthRef = useRef(null);
  const fileInputRef = useRef(null);

  // Web Audio API ambient chord fallback synthesizer for 100% reliability
  const startSynthesizerFallback = () => {
    try {
      if (synthRef.current) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const chords = [
        [293.66, 369.99, 440.00, 554.37], // Dmaj7
        [246.94, 293.66, 369.99, 440.00], // Bm7
        [196.00, 246.94, 293.66, 369.99], // Gmaj7
        [220.00, 277.18, 329.63, 440.00], // A
      ];

      let chordIndex = 0;
      let isRunning = true;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const playChord = () => {
        if (!isRunning) return;
        const currentNotes = chords[chordIndex];
        chordIndex = (chordIndex + 1) % chords.length;

        currentNotes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const now = ctx.currentTime;
          noteGain.gain.setValueAtTime(0.0001, now);
          noteGain.gain.exponentialRampToValueAtTime(0.02, now + 1.2);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

          osc.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start(now);
          osc.stop(now + 5.0);
        });
      };

      playChord();
      const interval = setInterval(playChord, 5200);

      synthRef.current = {
        ctx,
        masterGain,
        stop: () => {
          isRunning = false;
          clearInterval(interval);
          try {
            masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
            setTimeout(() => ctx.close(), 600);
          } catch {}
          synthRef.current = null;
        },
        setMute: (mute) => {
          masterGain.gain.setValueAtTime(mute ? 0 : 0.08, ctx.currentTime);
        }
      };
    } catch (e) {
      console.warn("Audio synthesis unavailable", e);
    }
  };

  const stopSynthesizerFallback = () => {
    if (synthRef.current) {
      synthRef.current.stop();
      synthRef.current = null;
    }
  };

  // Playback effect
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      if (audio) {
        audio.volume = isMuted ? 0 : 0.4;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            startSynthesizerFallback();
          });
        }
      } else {
        startSynthesizerFallback();
      }
    } else {
      if (audio) {
        audio.pause();
      }
      stopSynthesizerFallback();
    }
  }, [isPlaying, customAudioSrc]);

  // Mute effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
    if (synthRef.current) {
      synthRef.current.setMute(isMuted);
    }
  }, [isMuted]);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // Handle local file selection from computer/phone
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setCustomAudioSrc(blobUrl);
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      setCurrentSongTitle(cleanName);
      
      // Auto play when new file chosen
      if (!isPlaying) {
        onTogglePlay();
      } else {
        // Trigger audio element reload
        if (audioRef.current) {
          audioRef.current.src = blobUrl;
          audioRef.current.play().catch(() => {});
        }
      }

      // If local dev server is active, also upload to public/audio/
      try {
        const uploadResult = await uploadImageFile(file);
        if (uploadResult && uploadResult.isLocalServer && uploadResult.url) {
          setCustomAudioSrc(uploadResult.url);
        }
      } catch {}
    }
  };

  // Handle URL change
  const handleApplyUrl = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setCustomAudioSrc(urlInput.trim());
      setCurrentSongTitle("Lagu Kustom");
      if (!isPlaying) onTogglePlay();
      setShowSettingsModal(false);
    }
  };

  const copyFolderGuide = () => {
    navigator.clipboard.writeText("public/audio/");
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={customAudioSrc || coupleConfig.music.audioSrc}
        loop
        preload="auto"
        onError={() => {
          if (isPlaying) startSynthesizerFallback();
        }}
      />

      {/* Hidden file input for uploading MP3 from computer */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/*,.mp3,.m4a,.wav,.ogg"
        className="hidden"
      />

      {/* Floating Bottom-Right Music Bar */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full glass-panel border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group hover:border-warm-200/40 transition-all duration-300"
        >
          {/* Main Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-2.5 text-left focus:outline-none"
            aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          >
            {/* Animated Soundwave bars */}
            <div className="flex items-center gap-[2px] h-3.5 w-3.5 justify-center">
              {isPlaying && !isMuted ? (
                <>
                  <span className="w-[2px] h-3 bg-champagne-300 rounded-full animate-pulse" />
                  <span className="w-[2px] h-2 bg-champagne-300/80 rounded-full animate-bounce delay-75" />
                  <span className="w-[2px] h-3.5 bg-champagne-300 rounded-full animate-pulse delay-150" />
                </>
              ) : (
                <Music className="w-3.5 h-3.5 text-warm-300/60" />
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] tracking-widest uppercase font-sans font-medium text-warm-100 flex items-center gap-1.5">
                <span>{data.musicPlayer?.label || "♫ LAGU KITA"}</span>
              </span>
              <span className="text-[9px] tracking-wide text-warm-400/60 max-w-[130px] truncate" title={currentSongTitle}>
                {isPlaying ? currentSongTitle : (data.musicPlayer?.paused || "Klik untuk memutar")}
              </span>
            </div>
          </button>

          {/* Quick Upload / Settings button */}
          <button
            onClick={() => setShowSettingsModal(true)}
            title="Ganti / Masukkan Lagu (.mp3)"
            className="p-1.5 ml-1 rounded-full text-warm-300/60 hover:text-champagne-300 hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Pengaturan Lagu"
          >
            <Settings2 className="w-3.5 h-3.5" />
          </button>

          {/* Mute button */}
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full text-warm-300/60 hover:text-warm-100 hover:bg-white/5 transition-colors focus:outline-none"
            aria-label={isMuted ? "Bunyikan" : "Bisukan"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-warm-400/50" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-warm-300" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Modal Petunjuk & Penggantian Lagu */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg glass-panel border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl text-warm-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-champagne-400/10 text-champagne-300">
                    <FileAudio className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-warm-50 font-normal">
                      Cara Memasukkan Lagu Kita
                    </h3>
                    <p className="text-[11px] font-sans text-warm-300/60 tracking-wider">
                      ♫ Musik Latar Romantis
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="p-1.5 text-warm-300/60 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pilihan 1: Pilih File Langsung dari Komputer/HP */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-champagne-400/[0.05] border border-champagne-400/20">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-medium text-champagne-200 uppercase tracking-wider font-sans">
                      Cara 1: Coba Langsung dari Komputer (Instan)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-champagne-400/20 text-champagne-300 font-mono">
                      Cepat
                    </span>
                  </div>
                  <p className="text-xs text-warm-300/80 mb-4 leading-relaxed font-light">
                    Pilih file lagu MP3 favorit Anda dari laptop atau HP, lagu akan langsung berputar saat ini juga di browser.
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-4 rounded-lg bg-champagne-300 hover:bg-champagne-200 text-[#080808] font-medium text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Pilih File Lagu (.mp3) dari Komputer</span>
                  </button>
                </div>

                {/* Pilihan 2: Simpan Permanen di Folder Proyek */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-medium text-warm-200 uppercase tracking-wider font-sans">
                      Cara 2: Simpan Permanen di Proyek (Rekomendasi)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-warm-300 font-mono">
                      Permanen
                    </span>
                  </div>
                  <ol className="text-xs text-warm-300/80 space-y-2 list-decimal pl-4 font-light leading-relaxed">
                    <li>
                      Copy file lagu MP3 Anda ke dalam folder:
                      <div className="mt-1 flex items-center gap-2">
                        <code className="px-2 py-1 rounded bg-black/50 text-champagne-300 font-mono text-[11px] border border-white/10">
                          public/audio/lagu-kita.mp3
                        </code>
                        <button
                          onClick={copyFolderGuide}
                          className="text-[10px] text-warm-400/60 hover:text-champagne-300 underline"
                        >
                          {copiedPath ? "Tersalin!" : "Salin path"}
                        </button>
                      </div>
                    </li>
                    <li>
                      Buka file <code className="text-champagne-300">src/data/coupleData.js</code>.
                    </li>
                    <li>
                      Ubah bagian <code className="text-champagne-300">coupleConfig.music</code> menjadi:
                      <pre className="mt-1 p-2 rounded bg-black/60 text-[10px] font-mono text-warm-200/90 overflow-x-auto border border-white/5">
{`music: {
  audioSrc: "/audio/lagu-kita.mp3",
  title: "Judul Lagu Pasangan",
  artist: "Nama Penyanyi"
}`}
                      </pre>
                    </li>
                  </ol>
                </div>

                {/* Pilihan 3: Input Link / URL MP3 Online */}
                <form onSubmit={handleApplyUrl} className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="block text-xs font-medium text-warm-200 uppercase tracking-wider font-sans mb-1.5">
                    Cara 3: Gunakan Link / URL MP3 Online
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://contoh.com/lagu-kita.mp3"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100 placeholder:text-warm-400/30 focus:outline-none focus:border-champagne-300"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-warm-100 transition-colors"
                    >
                      Terapkan
                    </button>
                  </div>
                </form>
              </div>

              {/* Status Lagu Saat Ini */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-warm-400/60 font-sans">
                <span>Lagu aktif: <strong className="text-champagne-300 font-medium">{currentSongTitle}</strong></span>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="text-xs text-warm-300 hover:text-white underline"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
