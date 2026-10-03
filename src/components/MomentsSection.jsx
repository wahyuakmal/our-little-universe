import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Calendar, Plus, Edit3, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { Lightbox } from './Lightbox';

export const MomentsSection = () => {
  const { data } = useLanguage();
  const { isAdmin, openDashboardModal, deleteMomentPhoto } = useAdmin();
  const { moments } = data;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : moments.gallery.length - 1));
    }
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev < moments.gallery.length - 1 ? prev + 1 : 0));
    }
  };

  const handleDeleteDirect = (e, item) => {
    e.stopPropagation();
    if (window.confirm(`Hapus foto momen (${item.date}) ini dari website?`)) {
      deleteMomentPhoto(item.id);
    }
  };

  const handleEditDirect = (e) => {
    e.stopPropagation();
    openDashboardModal('moments');
  };

  return (
    <section id="moments" className="relative py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.05]">
      {/* Section Header */}
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-3 mb-4 justify-center"
        >
          <div className="h-[1px] w-8 bg-champagne-400/30" />
          <span className="text-xs md:text-sm font-sans tracking-mega-wide uppercase text-champagne-400">
            {moments.sectionNumber} — {moments.sectionTitle}
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
          {moments.subheading}
        </motion.h2>

        {/* Admin Quick Add Action in Section Header */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex justify-center"
          >
            <button
              onClick={() => openDashboardModal('moments')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-champagne-300 hover:bg-champagne-200 text-[#080808] font-medium text-xs tracking-wider uppercase shadow-lg transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Foto Momen Baru</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Editorial Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[240px] md:auto-rows-[280px]">
        {/* Admin Add Card (First slot if admin) */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => openDashboardModal('moments')}
            className="rounded-xl border-2 border-dashed border-champagne-400/40 hover:border-champagne-400 bg-champagne-400/[0.03] hover:bg-champagne-400/[0.08] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 group shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-champagne-400/20 text-champagne-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-serif text-base text-warm-100 font-medium">
              Tambah Foto Momen
            </span>
            <span className="text-[10px] text-warm-400/60 font-sans tracking-wider uppercase mt-1">
              Mode Admin Aktif
            </span>
          </motion.div>
        )}

        {moments.gallery.map((item, index) => {
          const isLandscape = item.aspect === 'landscape';
          const isPortrait = item.aspect === 'portrait';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, delay: (index % 4) * 0.12 }}
              onClick={() => openLightbox(index)}
              className={`group relative rounded-xl overflow-hidden cursor-pointer bg-[#121212] border border-white/[0.08] shadow-lg transition-all duration-700 hover:border-warm-200/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)] ${
                isLandscape ? 'sm:col-span-2' : ''
              } ${isPortrait ? 'sm:row-span-2' : ''}`}
            >
              {/* Photo */}
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.03] transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Admin Floating Quick Controls on the card */}
              {isAdmin && (
                <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={handleEditDirect}
                    title="Edit foto / caption"
                    className="p-1.5 rounded-full bg-black/75 hover:bg-champagne-400 text-champagne-300 hover:text-black border border-white/10 transition-all shadow-md"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteDirect(e, item)}
                    title="Hapus foto ini"
                    className="p-1.5 rounded-full bg-black/75 hover:bg-rose-500 text-rose-400 hover:text-white border border-white/10 transition-all shadow-md"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Dark Transparent Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6 pointer-events-none">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-white/10 backdrop-blur-md text-warm-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-champagne-300/90 text-[11px] font-mono tracking-widest mb-1.5">
                    <Calendar className="w-3 h-3 text-champagne-400" />
                    <span>{item.date}</span>
                  </div>
                  <p className="font-serif italic text-sm md:text-base text-warm-100 font-light leading-snug line-clamp-3">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Static subtle date watermark for unhovered state */}
              <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-warm-300/40 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                {item.date}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxIndex !== null}
        activeIndex={lightboxIndex}
        items={moments.gallery}
        memoryLabel={moments.memoryLabel || "Momen"}
        ofLabel={moments.ofLabel || "dari"}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </section>
  );
};

export default MomentsSection;
