import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';

export const Lightbox = ({ 
  isOpen, 
  activeIndex, 
  items, 
  memoryLabel = "Momen",
  ofLabel = "dari",
  onClose, 
  onPrev, 
  onNext 
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || activeIndex === null || !items[activeIndex]) return null;

  const current = items[activeIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/5 border border-white/10 text-warm-200/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/5 border border-white/10 text-warm-200/70 hover:text-white hover:bg-white/10 transition-colors group"
          aria-label="Foto Sebelumnya"
        >
          <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/5 border border-white/10 text-warm-200/70 hover:text-white hover:bg-white/10 transition-colors group"
          aria-label="Foto Selanjutnya"
        >
          <ChevronRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Center Modal Container */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
        >
          {/* Main Large Image */}
          <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
            <img
              src={current.image}
              alt={current.caption}
              className="max-h-[70vh] md:max-h-[75vh] w-auto max-w-full object-contain filter contrast-[1.03]"
            />
          </div>

          {/* Details below image */}
          <div className="mt-5 text-center max-w-2xl px-4">
            <div className="flex items-center justify-center gap-3 text-champagne-300/80 text-[11px] font-mono tracking-widest mb-1.5">
              <Calendar className="w-3 h-3 text-champagne-400" />
              <span>{current.date}</span>
              {current.location && (
                <>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1 font-sans text-warm-400/60 uppercase text-[10px]">
                    <MapPin className="w-2.5 h-2.5" />
                    {current.location}
                  </span>
                </>
              )}
            </div>

            <p className="font-serif italic text-base md:text-xl text-warm-100 font-light">
              {current.caption}
            </p>

            <span className="inline-block mt-2 text-[10px] tracking-mega-wide uppercase text-warm-400/40">
              {memoryLabel} {activeIndex + 1} {ofLabel} {items.length}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
