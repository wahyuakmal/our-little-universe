import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TimelineSection = () => {
  const { data } = useLanguage();
  const { timeline } = data;

  return (
    <section id="timeline" className="relative py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.05]">
      {/* Section Header */}
      <div className="mb-24 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-3 mb-4 justify-center"
        >
          <div className="h-[1px] w-8 bg-champagne-400/30" />
          <span className="text-xs md:text-sm font-sans tracking-mega-wide uppercase text-champagne-400">
            {timeline.sectionNumber} — {timeline.sectionTitle}
          </span>
          <div className="h-[1px] w-8 bg-champagne-400/30" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-warm-50 font-normal leading-snug whitespace-pre-line"
        >
          {timeline.subheading}
        </motion.h2>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central Vertical Thin Hairline */}
        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent" />

        <div className="space-y-16 md:space-y-28">
          {timeline.milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 md:gap-16`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#080808] border border-champagne-400/80 flex items-center justify-center z-10 shadow-[0_0_12px_rgba(216,197,150,0.3)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-champagne-300" />
                </div>

                {/* Content Side */}
                <div className={`pl-14 md:pl-0 w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  {/* Date badge */}
                  <div className={`flex items-center gap-2 mb-2 text-champagne-300/80 text-[11px] font-mono tracking-widest ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}>
                    <Calendar className="w-3 h-3 text-champagne-400/70" />
                    <span>{item.date}</span>
                    <span className="text-white/20">•</span>
                    <span className="uppercase text-[10px] tracking-wider text-warm-400/50">{item.tag}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-warm-50 font-normal mb-1.5">
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  {item.subtitle && (
                    <p className="font-serif italic text-xs sm:text-sm text-warm-300/60 mb-3">
                      {item.subtitle}
                    </p>
                  )}

                  {/* Story Description */}
                  <p className="font-sans text-xs sm:text-sm text-warm-300/80 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Photo Side */}
                <div className="pl-14 md:pl-0 w-full md:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-xl overflow-hidden bg-[#141414] border border-white/[0.08] shadow-xl aspect-[16/10] group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-sans text-warm-200/60">
                      <span>{item.tag}</span>
                      <span className="font-mono">{item.date}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
