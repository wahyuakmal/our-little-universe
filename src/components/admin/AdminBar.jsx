import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Plus, Image, LogOut, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminBar = () => {
  const { isAdmin, logout, openDashboardModal } = useAdmin();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isAdmin) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel border border-champagne-400/30 rounded-full px-4 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between gap-3 text-xs text-warm-100"
      >
        {/* Status Badge */}
        <div className="flex items-center gap-2 pr-3 border-r border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne-400"></span>
          </span>
          <span className="font-sans text-[10px] tracking-widest uppercase font-semibold text-champagne-300 whitespace-nowrap">
            Mode Admin
          </span>
        </div>

        {/* Action Buttons */}
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openDashboardModal('moments')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-champagne-300 hover:bg-champagne-200 text-[#080808] font-medium text-[11px] tracking-wide transition-all active:scale-95 shadow-sm whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Foto</span>
            </button>

            <button
              onClick={() => openDashboardModal('hero-story')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-warm-200 hover:text-white text-[11px] tracking-wide transition-all whitespace-nowrap"
            >
              <Image className="w-3.5 h-3.5 text-champagne-300/80" />
              <span>Kelola Foto</span>
            </button>

            <button
              onClick={logout}
              title="Keluar dari Mode Admin"
              className="p-1.5 rounded-full text-warm-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 text-warm-400 hover:text-warm-200 rounded-full"
          title={isCollapsed ? "Buka Menu Admin" : "Perkecil Bar"}
        >
          {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </motion.div>
    </div>
  );
};

export default AdminBar;
