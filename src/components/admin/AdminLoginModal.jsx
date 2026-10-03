import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, Eye, EyeOff, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminLoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAdmin();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(password);
      setIsLoading(false);
      if (!result.success) {
        setErrorMessage(result.error);
      } else {
        setPassword('');
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        onClick={closeLoginModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md glass-panel border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-warm-100"
        >
          {/* Close button */}
          <button
            onClick={closeLoginModal}
            className="absolute top-5 right-5 p-2 text-warm-300/50 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-champagne-400/10 border border-champagne-400/20 flex items-center justify-center text-champagne-300 mb-3 shadow-[0_0_20px_rgba(216,197,150,0.15)]">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-warm-50 font-normal">
              Masuk Mode Admin
            </h3>
            <p className="text-xs text-warm-300/60 font-light mt-1 max-w-xs">
              Kelola, tambah, ganti, dan hapus foto langsung tanpa membuka kode.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-sans tracking-wider uppercase text-warm-300/70 mb-1.5">
                Kata Sandi Admin
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  autoFocus
                  required
                  className="w-full px-4 py-2.5 pr-10 rounded-xl bg-black/50 border border-white/10 text-warm-100 placeholder:text-warm-400/30 text-sm focus:outline-none focus:border-champagne-400/80 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400/50 hover:text-warm-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-400/90 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg"
              >
                {errorMessage}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-champagne-300 hover:bg-champagne-200 text-[#080808] font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 disabled:opacity-50"
            >
              <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Halaman Admin'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Default password note */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] text-warm-400/50 font-light flex items-center justify-center gap-1.5">
              <KeyRound className="w-3 h-3 text-champagne-400/60" />
              <span>Password default: <strong className="text-champagne-300/80 font-mono">semesta123</strong></span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminLoginModal;
