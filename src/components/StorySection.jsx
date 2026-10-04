import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const StorySection = () => {
  const { data } = useLanguage();
  const { isAdmin, openDashboardModal } = useAdmin();
  const { story } = data;

  return (
    <section id="story" className="relative py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.05]">
      {/* Section Header */}
      <div className="mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-justify md:text-sm font-sans tracking-mega-wide uppercase text-champagne-400">
            {story.sectionNumber} — {story.sectionTitle}
          </span>
          <div className="h-[1px] w-12 bg-champagne-400/30" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl text-warm-50 font-normal leading-snug max-w-3xl whitespace-pre-line"
        >
          {story.subheading}
        </motion.h2>
      </div>

      {/* Editorial Magazine / Journal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Visual Journal Photos */}
        <div className="lg:col-span-6 space-y-8">
          {/* Main Visual */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative group rounded-xl md:rounded-2xl overflow-hidden bg-[#121212] border border-white/[0.08] shadow-2xl aspect-[4/5]"
          >
            <img
              src={story.image1}
              alt="Where our story started"
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            {/* Admin Quick Edit Button */}
            {isAdmin && (
              <button
                onClick={() => openDashboardModal('hero-story')}
                className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full glass-panel border border-champagne-400/50 text-champagne-300 text-xs font-medium tracking-wide flex items-center gap-1.5 shadow-lg hover:bg-champagne-400/20 transition-all opacity-80 hover:opacity-100"
                title="Ganti Foto Kisah"
              >
                <span>✏️ Ganti Foto</span>
              </button>
            )}

            {/* Subtle Gradient & Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-sans text-warm-200/80">
              <span className="tracking-widest uppercase">{story.image1Caption}</span>
              <span className="font-mono text-warm-400/50">{story.date}</span>
            </div>
          </motion.div>

          {/* Secondary Journal Detail Snippet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center gap-6 p-6 rounded-xl glass-panel border border-white/[0.06]"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
              <img 
                src={story.image2} 
                alt="Memory snippet" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-champagne-300/80 mb-1">
                <Compass className="w-3 h-3" />
                <span>Koordinat Pertemuan</span>
              </div>
              <p className="font-mono text-xs text-warm-300/80 mb-1">{story.coordinates}</p>
              <p className="text-[11px] text-warm-400/60 font-sans italic">{story.location}</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Editorial Prose & Typography */}
        <div className="lg:col-span-6 flex flex-col justify-between pt-2">
          <div>
            {/* Staggered Date Tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 mb-6 text-warm-300/70"
            >
              <Calendar className="w-3.5 h-3.5 text-champagne-400" />
              <span className="font-mono text-xs tracking-widest">{story.date}</span>
              <span className="text-white/20">•</span>
              <span className="text-[11px] tracking-widest uppercase font-sans text-warm-400/60">{story.chapterTag}</span>
            </motion.div>

            {/* Chapter Headline */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.3 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-warm-100 font-normal mb-8 leading-tight tracking-tight"
            >
              {story.title}
            </motion.h3>

            {/* Thin Decorative Hairline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.4 }}
              className="h-[1px] bg-gradient-to-r from-warm-300/30 via-warm-300/10 to-transparent mb-8"
            />

            {/* Story Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.45 }}
              className="space-y-6 text-warm-200/80 font-sans text-sm md:text-base leading-relaxed font-light whitespace-pre-line text-justify"
            >
              {story.description}
            </motion.div>
          </div>

          {/* Editorial Callout Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/[0.08]"
          >
            <blockquote className="font-serif italic text-lg sm:text-xl text-warm-100/90 leading-snug">
              {story.quote}
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-6 h-[1px] bg-warm-300/40" />
              <span className="text-[10px] tracking-widest uppercase font-sans text-warm-400/50">
                {story.archiveText}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
