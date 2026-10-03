import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const HeroSection = () => {
  const { data, coupleConfig } = useLanguage();
  const { isAdmin, openDashboardModal } = useAdmin();

  // Calculate days together dynamically
  const daysTogether = useMemo(() => {
    try {
      const start = new Date(coupleConfig.anniversaryDate);
      const now = new Date();
      const diffTime = Math.abs(now - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return isNaN(diffDays) ? 680 : diffDays;
    } catch {
      return 680;
    }
  }, [coupleConfig.anniversaryDate]);

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) {
      const yOffset = -60;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Top Header & Headline */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-200/15 bg-white/[0.02] backdrop-blur-sm mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-champagne-300 animate-pulse" />
          <span className="text-[10px] md:text-[11px] tracking-mega-wide uppercase font-sans text-warm-300/80">
            {data.hero.badge}
          </span>
        </motion.div>

        {/* Large Cinematic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.18] tracking-tight text-warm-50 font-normal mb-6 whitespace-pre-line text-glow-subtle"
        >
          {data.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="font-sans text-xs sm:text-sm md:text-base text-warm-300/70 max-w-2xl font-light tracking-wide leading-relaxed"
        >
          {data.hero.subtitle}
        </motion.p>
      </div>

      {/* Main Couple Photo: Cinematic, rounded, subtle grain, soft shadow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-10 md:my-14 w-full max-w-5xl mx-auto group"
      >
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden cinematic-shadow bg-[#121212] border border-white/[0.08] aspect-[16/10] md:aspect-[21/10]">
          {/* Main Couple Image */}
          <motion.img
            src={data.hero.mainImage}
            alt={`${coupleConfig.partner1} & ${coupleConfig.partner2}`}
            className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-[1.025] filter contrast-[1.04] brightness-[0.92]"
            loading="eager"
          />

          {/* Cinematic Film Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent pointer-events-none" />

          {/* Film Grain Texture inside Image Frame */}
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Admin Quick Edit Button */}
          {isAdmin && (
            <button
              onClick={() => openDashboardModal('hero-story')}
              className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full glass-panel border border-champagne-400/50 text-champagne-300 text-xs font-medium tracking-wide flex items-center gap-1.5 shadow-lg hover:bg-champagne-400/20 transition-all opacity-80 hover:opacity-100"
              title="Ganti Foto Hero"
            >
              <span>✏️ Ganti Foto Hero</span>
            </button>
          )}

          {/* Overlay Details (Bottom Left & Bottom Right) */}
          <div className="absolute bottom-6 md:bottom-8 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pointer-events-none">
            <div>
              <p className="font-serif italic text-base md:text-xl text-warm-100/90 font-light max-w-lg mb-1 drop-shadow-md">
                {data.hero.quoteOverlay}
              </p>
              <p className="text-[10px] tracking-widest uppercase font-sans text-warm-300/50">
                {data.hero.imageCaption}
              </p>
            </div>

            {/* Days Together Pill */}
            <div className="glass-pill px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
              <span className="text-[10px] tracking-mega-wide uppercase text-warm-300/80 font-sans">
                {data.hero.daysPrefix} {daysTogether} {data.hero.daysSuffix}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="flex flex-col items-center justify-center pt-2"
      >
        <button
          onClick={scrollToStory}
          className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
        >
          <span className="text-[10px] tracking-mega-wide uppercase font-sans text-warm-300/50 group-hover:text-warm-200 transition-colors">
            {data.hero.scrollText}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-warm-300/60 group-hover:border-warm-200/50 group-hover:text-warm-100 transition-colors"
          >
            <ArrowDown className="w-3 h-3" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
