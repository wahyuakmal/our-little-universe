import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AdminProvider } from './context/AdminContext';
import { LanguageProvider } from './context/LanguageContext';
import CinematicGrain from './components/CinematicGrain';
import ParticleCanvas from './components/ParticleCanvas';
import CustomCursor from './components/CustomCursor';
import OpeningCinematic from './components/OpeningCinematic';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import TimelineSection from './components/TimelineSection';
import MomentsSection from './components/MomentsSection';
import LoveLetterSection from './components/LoveLetterSection';
import FinalSection from './components/FinalSection';
import MusicPlayer from './components/MusicPlayer';
import CustomizationModal from './components/CustomizationModal';
import AdminBar from './components/admin/AdminBar';
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminDashboardModal from './components/admin/AdminDashboardModal';

function MainUniverse() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleEnterUniverse = () => {
    setShowIntro(false);
  };

  const handleStartAudio = () => {
    setIsAudioPlaying(true);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#ede8df] font-sans selection:bg-[#ded4c3] selection:text-[#080808]">
      {/* 35mm Film Grain Overlay across viewport */}
      <CinematicGrain />

      {/* Floating Stardust Particles */}
      <ParticleCanvas particleCount={40} speed={0.2} opacity={0.5} />

      {/* Luxury Minimalist Desktop Cursor */}
      <CustomCursor />

      {/* Opening Cinematic Experience (Full Screen Preloader & Intro) */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <OpeningCinematic
            key="cinematic-opening"
            onEnter={handleEnterUniverse}
            onStartAudio={handleStartAudio}
          />
        )}
      </AnimatePresence>

      {/* Main Website (Revealed smoothly) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col min-h-screen"
      >
        {/* Admin Bar (Visible when logged in as admin) */}
        <AdminBar />

        {/* Navigation Bar */}
        <Navbar
          onReplayIntro={handleReplayIntro}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={toggleAudio}
        />

        {/* Hero Section */}
        <main className="flex-grow">
          <HeroSection />

          {/* Section 01: HOW IT STARTED */}
          <StorySection />

          {/* Section 02: OUR TIMELINE */}
          <TimelineSection />

          {/* Section 03: LITTLE MOMENTS */}
          <MomentsSection />

          {/* Emotional Bridge: Secarik Catatan di Bawah Bintang */}
          <LoveLetterSection />

          {/* Section 07: FINAL SECTION */}
          <FinalSection />
        </main>

        {/* Floating Audio Controller */}
        <MusicPlayer
          isPlaying={isAudioPlaying}
          onTogglePlay={toggleAudio}
        />

        {/* Quick Customization Helper */}
        <CustomizationModal />

        {/* Admin Modals */}
        <AdminLoginModal />
        <AdminDashboardModal />
      </motion.div>
    </div>
  );
}

export function App() {
  return (
    <AdminProvider>
      <LanguageProvider>
        <MainUniverse />
      </LanguageProvider>
    </AdminProvider>
  );
}

export default App;
