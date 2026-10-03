import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const LoveLetterSection = () => {
  const { data, coupleConfig } = useLanguage();
  const { loveLetter } = data;
  if (!loveLetter) return null;

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/[0.05]">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl md:rounded-3xl p-8 md:p-16 glass-panel border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-mutedrose-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-champagne-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-[10px] md:text-xs font-sans tracking-mega-wide uppercase text-champagne-400/80 mb-2">
            {loveLetter.heading}
          </span>
          <span className="text-[11px] font-mono tracking-widest text-warm-400/50">
            {loveLetter.date}
          </span>
          <div className="w-12 h-[1px] bg-warm-300/20 mt-4" />
        </div>

        {/* Letter Paragraphs */}
        <div className="space-y-6 max-w-3xl mx-auto font-serif text-base sm:text-lg md:text-xl text-warm-100/90 font-light leading-relaxed text-justify sm:text-left">
          {loveLetter.paragraphs.map((para, i) => (
            <p key={i} className="indent-6 sm:indent-8">
              {para}
            </p>
          ))}
        </div>

        {/* Signature */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <span className="font-serif italic text-lg sm:text-xl text-warm-200">
            {loveLetter.signature},
          </span>
          <span className="font-editorial text-2xl sm:text-3xl text-champagne-300 tracking-wider">
            {coupleConfig.partner1} & {coupleConfig.partner2}
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetterSection;
