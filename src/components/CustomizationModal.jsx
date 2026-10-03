import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, X, Copy, Check, Info, FileCode } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CustomizationModal = () => {
  const { data, coupleConfig } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const cData = data.customization;

  const handleCopy = () => {
    const exportedConfig = {
      ...coupleConfig,
      content: data
    };
    navigator.clipboard.writeText(JSON.stringify(exportedConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating button at bottom-left */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          title="Panduan Kustomisasi"
          className="p-2.5 rounded-full glass-panel border border-white/10 text-warm-300/50 hover:text-warm-100 hover:border-warm-200/40 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center gap-2 group"
          aria-label="Kustomisasi"
        >
          <Sliders className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
          <span className="hidden sm:inline text-[9px] tracking-mega-wide uppercase text-warm-300/60 font-sans">
            {cData.button}
          </span>
        </button>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl text-warm-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-champagne-400/10 text-champagne-300">
                    <FileCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-warm-50 font-normal">
                      {cData.title}
                    </h3>
                    <p className="text-[11px] font-sans text-warm-300/60 tracking-wider">
                      {cData.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-warm-300/60 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instructions */}
              <div className="space-y-4 text-xs md:text-sm text-warm-200/80 font-light leading-relaxed mb-6">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <Info className="w-4 h-4 text-champagne-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-medium text-warm-100">{cData.swapTitle}</strong>
                    <p className="mt-1 text-warm-300/70">
                      {cData.swapDesc} <code className="px-1.5 py-0.5 rounded bg-white/10 text-champagne-300 font-mono text-xs">src/data/coupleData.js</code>.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-base text-warm-100">{cData.keyTitle}</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-warm-300/70 text-xs">
                    <li><strong className="text-warm-200">Nama Pasangan:</strong> {cData.namesDesc}</li>
                    <li><strong className="text-warm-200">Tanggal Jadian:</strong> {cData.dateDesc}</li>
                    <li><strong className="text-warm-200">Foto & Kenangan:</strong> {cData.photosDesc}</li>
                    <li><strong className="text-warm-200">Lagu Latar:</strong> {cData.musicDesc}</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs tracking-wider text-warm-200 flex items-center gap-2 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? cData.copiedBtn : cData.copyBtn}</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-full bg-champagne-400/20 hover:bg-champagne-400/30 text-champagne-200 text-xs tracking-wider font-medium transition-colors"
                >
                  {cData.closeBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomizationModal;
