import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const OpeningCinematic = ({ onEnter, onStartAudio }) => {
  const { data } = useLanguage();
  const [scene, setScene] = useState(1);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);

  useEffect(() => {
    // Scene 1: Initial darkness + point of light expands
    const t1 = setTimeout(() => {
      setScene(2); // Two strangers / Dua orang asing
    }, 2800);

    // Scene 2 -> Scene 3: Two strangers fades out, then One unexpected story appears
    const t2 = setTimeout(() => {
      setScene(3); // One unexpected story / Satu cerita tak terduga
    }, 6500);

    // Scene 3 -> Scene 4: And somehow... / Dan entah bagaimana...
    const t3 = setTimeout(() => {
      setScene(4); // And somehow...
    }, 10500);

    // Scene 4 -> Scene 5: We became us / Kita menjadi kita
    const t4 = setTimeout(() => {
      setScene(5); // We became us
    }, 13800);

    // Scene 5 -> Scene 6: Show ENTER button
    const t5 = setTimeout(() => {
      setScene(6); // Enter button appears
    }, 16800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleEnterClick = () => {
    setIsTransitioningOut(true);
    if (onStartAudio) {
      onStartAudio();
    }
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  const handleSkip = () => {
    handleEnterClick();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isTransitioningOut ? 0 : 1,
        scale: isTransitioningOut ? 1.08 : 1,
        filter: isTransitioningOut ? 'brightness(1.5) blur(10px)' : 'brightness(1) blur(0px)'
      }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060608] text-[#ede8df] select-none overflow-hidden"
    >
      {/* Film grain layer within opening */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Tiny glowing stardust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-warm-200/40 rounded-full animate-ping duration-1000" />
        <div className="absolute top-3/4 left-4/5 w-1 h-1 bg-warm-200/30 rounded-full animate-pulse duration-700" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-champagne-300/40 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-mutedrose-300/40 rounded-full" />
      </div>

      {/* Skip button in top right corner */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        whileHover={{ opacity: 0.9 }}
        onClick={handleSkip}
        className="absolute top-6 right-8 text-[11px] tracking-ultra-wide font-sans text-warm-300/60 uppercase transition-opacity"
      >
        {data.opening.skipText}
      </motion.button>

      {/* Scene 1: Growing point of light / soft glowing singularity */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: scene >= 1 ? [0, 1, 1.4] : 0,
          opacity: scene === 1 ? [0, 0.9, 0.4] : scene >= 2 ? 0.25 : 0
        }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
        className="absolute pointer-events-none"
      >
        <div className="w-4 h-4 rounded-full bg-warm-100 blur-[2px]" />
        <div className="absolute -inset-16 rounded-full bg-radial from-warm-200/25 via-warm-400/10 to-transparent blur-xl" />
        <div className="absolute -inset-32 rounded-full bg-radial from-mutedrose-400/15 via-transparent to-transparent blur-3xl" />
      </motion.div>

      {/* Animated Text Content Container */}
      <div className="relative z-10 max-w-2xl px-6 text-center flex flex-col items-center justify-center min-h-[220px]">
        <AnimatePresence mode="wait">
          {/* Scene 2: "Dua orang asing." */}
          {scene === 2 && (
            <motion.p
              key="strangers"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-warm-200 tracking-wide font-light"
            >
              “{data.opening.strangersText}”
            </motion.p>
          )}

          {/* Scene 3: "Satu cerita tak terduga." */}
          {scene === 3 && (
            <motion.p
              key="story"
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-warm-100 tracking-wide font-light"
            >
              “{data.opening.storyText}”
            </motion.p>
          )}

          {/* Scene 4: "Dan entah bagaimana…" */}
          {scene === 4 && (
            <motion.div
              key="pause"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="font-sans text-xs md:text-sm tracking-mega-wide uppercase text-warm-300/70"
            >
              {data.opening.pauseText}
            </motion.div>
          )}

          {/* Scene 5 & 6: "Kita menjadi kita." and ENTER button */}
          {(scene === 5 || scene === 6) && (
            <motion.div
              key="we-became-us"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-warm-50 font-normal text-glow-subtle mb-4">
                {data.opening.culminationText}
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.6, duration: 1.5 }}
                className="font-sans text-[11px] md:text-xs tracking-mega-wide uppercase text-warm-300/60 mb-10"
              >
                {data.title}
              </motion.p>

              {/* Scene 6 Button: ENTER OUR UNIVERSE → */}
              {scene === 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <button
                    onClick={handleEnterClick}
                    className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-xs tracking-ultra-wide uppercase font-sans text-warm-100 border border-warm-200/25 rounded-full overflow-hidden transition-all duration-500 hover:border-warm-200/70 hover:shadow-[0_0_30px_rgba(222,212,195,0.22)] active:scale-95"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-warm-200/5 via-warm-100/10 to-warm-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <span className="relative font-medium tracking-[0.25em]">
                      {data.opening.buttonText}
                    </span>
                    <ArrowRight className="relative w-3.5 h-3.5 text-warm-200/80 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom indication */}
      <div className="absolute bottom-8 text-[10px] tracking-mega-wide uppercase text-warm-300/30">
        {data.opening.chapterText}
      </div>
    </motion.div>
  );
};

export default OpeningCinematic;
