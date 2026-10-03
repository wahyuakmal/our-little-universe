import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const FinalSection = () => {
  const { data, coupleConfig } = useLanguage();
  const { isAdmin, openDashboardModal, openLoginModal } = useAdmin();
  const { final } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-[#ede8df] py-32 md:py-48 px-6 md:px-12 border-t border-white/[0.06] overflow-hidden">
      {/* Subtle glowing center aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne-300/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Infinity / Star Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-2xl text-champagne-300/60 mb-6 font-serif select-none"
        >
          {final.infinitySymbol}
        </motion.div>

        {/* Main Quote: “Dan ini hanyalah sebuah permulaan.” */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-warm-50 tracking-tight text-glow-subtle mb-6 max-w-3xl"
        >
          {final.quote}
        </motion.h2>

        {/* Subtext: Masih ada begitu banyak detik dan cerita yang belum kita jalani bersama. */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm md:text-base text-warm-300/70 font-light tracking-wide leading-relaxed max-w-xl whitespace-pre-line mb-12"
        >
          {final.subtext}
        </motion.p>

        {/* Button: KISAH KITA BERLANJUT → */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.35 }}
        >
          <button
            onClick={scrollToTop}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-xs tracking-ultra-wide uppercase font-sans text-warm-100 border border-warm-200/25 rounded-full overflow-hidden transition-all duration-500 hover:border-warm-200/70 hover:shadow-[0_0_30px_rgba(222,212,195,0.18)] active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-warm-200/5 via-warm-100/10 to-warm-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <span className="relative font-medium tracking-[0.25em]">
              {final.buttonText}
            </span>
            <ArrowUp className="relative w-3.5 h-3.5 text-warm-200/80 transform group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Divider hairline */}
        <div className="w-24 h-[1px] bg-white/10 my-16" />

        {/* Bottom Credits & Made with love */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <p className="text-xs tracking-widest uppercase font-sans text-warm-300/60 flex items-center gap-2">
            <span>{final.footerText}</span>
            <span className="w-1 h-1 rounded-full bg-mutedrose-400" />
            <span>{coupleConfig.partner1} & {coupleConfig.partner2}</span>
          </p>
          <p className="text-[10px] tracking-mega-wide uppercase font-sans text-warm-400/30">
            {final.copyright}
          </p>
          <button
            onClick={isAdmin ? () => openDashboardModal('moments') : openLoginModal}
            className="text-[10px] text-warm-400/30 hover:text-champagne-300/80 transition-colors pt-1 tracking-wider"
          >
            🔒 {isAdmin ? 'Panel Admin Foto' : 'Login Admin'}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FinalSection;
