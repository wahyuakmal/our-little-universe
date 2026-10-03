import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, RotateCcw, Globe, Lock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const Navbar = ({ onReplayIntro, isAudioPlaying, onToggleAudio }) => {
  const { lang, toggleLanguage, data, coupleConfig } = useLanguage();
  const { isAdmin, openLoginModal, openDashboardModal } = useAdmin();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: data.nav.story, target: 'story' },
    { label: data.nav.timeline, target: 'timeline' },
    { label: data.nav.moments, target: 'moments' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isScrolled
            ? 'bg-[#080808]/75 backdrop-blur-md py-4 border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group text-left"
          >
            <span className="block font-serif text-sm md:text-base tracking-[0.25em] text-warm-100 uppercase group-hover:text-warm-300 transition-colors">
              {data.title}
            </span>
            <span className="block text-[9px] tracking-mega-wide uppercase text-warm-300/40 group-hover:text-warm-300/70 transition-colors">
              {coupleConfig.partner1} & {coupleConfig.partner2}
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.target)}
                className="relative text-[11px] tracking-ultra-wide uppercase font-sans text-warm-200/70 hover:text-warm-50 transition-colors py-1 group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-warm-200/70 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}

            {/* Quick Actions in Navbar */}
            <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
              {/* Language Switcher Pill (ID | EN) */}
              <button
                onClick={toggleLanguage}
                title="Ganti Bahasa / Switch Language"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 hover:border-warm-200/40 bg-white/[0.02] text-[10px] tracking-widest font-mono text-warm-200/80 hover:text-warm-50 transition-all"
              >
                <Globe className="w-3 h-3 text-champagne-300/70" />
                <span className={lang === 'id' ? 'font-semibold text-champagne-300' : 'text-warm-400/50'}>ID</span>
                <span className="text-white/20">|</span>
                <span className={lang === 'en' ? 'font-semibold text-champagne-300' : 'text-warm-400/50'}>EN</span>
              </button>

              {/* Audio toggle button */}
              <button
                onClick={onToggleAudio}
                title={isAudioPlaying ? "Mute audio" : "Play audio"}
                className="p-1.5 text-warm-200/60 hover:text-warm-100 transition-colors rounded-full hover:bg-white/5"
              >
                {isAudioPlaying ? (
                  <Volume2 className="w-3.5 h-3.5 text-champagne-300 animate-pulse" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 opacity-50" />
                )}
              </button>

              {/* Replay intro */}
              <button
                onClick={onReplayIntro}
                title="Putar ulang prolog"
                className="text-[10px] tracking-widest uppercase text-warm-300/50 hover:text-warm-200 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden lg:inline text-[9px]">{data.nav.prologue}</span>
              </button>

              {/* Admin Button */}
              {isAdmin ? (
                <button
                  onClick={() => openDashboardModal('moments')}
                  title="Panel Admin Foto"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-champagne-400/15 border border-champagne-400/40 text-champagne-300 text-[10px] font-sans font-medium uppercase tracking-wider hover:bg-champagne-400/25 transition-all shadow-sm"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Admin</span>
                </button>
              ) : (
                <button
                  onClick={openLoginModal}
                  title="Login Admin (Kelola Foto)"
                  className="p-1.5 text-warm-400/40 hover:text-champagne-300 transition-colors rounded-full hover:bg-white/5"
                  aria-label="Login Admin"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 rounded-full border border-white/10 text-[10px] font-mono text-champagne-300"
            >
              {lang.toUpperCase()}
            </button>

            {/* Mobile Admin Button */}
            <button
              onClick={isAdmin ? () => openDashboardModal('moments') : openLoginModal}
              className={`p-1.5 rounded-full ${isAdmin ? 'text-champagne-300' : 'text-warm-300/50'}`}
              title="Admin"
            >
              {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
            </button>
            
            {/* Mobile Audio */}
            <button
              onClick={onToggleAudio}
              className="p-2 text-warm-200/70 hover:text-warm-100 transition-colors"
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-champagne-300" /> : <VolumeX className="w-4 h-4 opacity-50" />}
            </button>
            
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-warm-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-warm-200" /> : <Menu className="w-5 h-5 text-warm-200" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Editorial Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 bg-[#080808]/95 flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col space-y-8">
              <span className="text-[10px] tracking-mega-wide uppercase text-warm-400/50">
                Menu
              </span>
              <div className="flex flex-col space-y-6">
                {navLinks.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.4 }}
                    onClick={() => scrollToSection(item.target)}
                    className="text-left font-serif text-3xl text-warm-100 hover:text-warm-300 tracking-wider flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <span className="text-sm font-sans text-warm-400/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col space-y-4">
              {/* Admin Button in mobile menu */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isAdmin) {
                    openDashboardModal('moments');
                  } else {
                    openLoginModal();
                  }
                }}
                className="text-left text-xs tracking-ultra-wide uppercase text-champagne-300 hover:text-white flex items-center gap-2"
              >
                {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{isAdmin ? 'Buka Panel Admin Foto' : 'Login Mode Admin'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="text-left text-xs tracking-ultra-wide uppercase text-warm-300/70 hover:text-warm-100 flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{data.nav.replay}</span>
              </button>
              <div className="text-[10px] tracking-widest text-warm-400/40 uppercase">
                {coupleConfig.partner1} & {coupleConfig.partner2} • {data.title}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
