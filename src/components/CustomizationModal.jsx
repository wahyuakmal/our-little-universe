import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, X, Copy, Check, Info, Upload, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { saveCoupleSettings as updateCoupleSettings } from '../services/supabaseService';

export const CustomizationModal = () => {
  const { data, coupleConfig } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form state untuk Supabase
  const [formData, setFormData] = useState({
    person1_name: '',
    person2_name: '',
    start_date: '',
    hero_title: '',
    hero_subtitle: '',
    hero_image_url: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const cData = data.customization || {};

  // Ambil data terbaru dari Supabase saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      fetchSettings();
    }
  }, [isOpen]);

  const fetchSettings = async () => {
    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });
    const settings = await getCoupleSettings();
    
    if (settings) {
      setFormData({
        person1_name: settings.person1_name || '',
        person2_name: settings.person2_name || '',
        start_date: settings.start_date || '',
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        hero_image_url: settings.hero_image_url || ''
      });
      setPreviewUrl(settings.hero_image_url || '');
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage({ type: '', text: '' });

    try {
      let finalImageUrl = formData.hero_image_url;

      // 1. Upload gambar jika ada file baru yang dipilih
      if (selectedFile) {
        const uploadedUrl = await uploadHeroImage(selectedFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          throw new Error('Gagal mengunggah foto ke storage bucket.');
        }
      }

      // 2. Simpan/Update data ke database Supabase
      const payload = {
        id: 1, // Menyesuaikan ID baris data di couple_settings
        ...formData,
        hero_image_url: finalImageUrl,
        updated_at: new Date().toISOString()
      };

      const result = await updateCoupleSettings(payload);

      if (result) {
        setStatusMessage({ type: 'success', text: 'Data & foto berhasil diperbarui!' });
        setTimeout(() => {
          window.location.reload(); // Refresh untuk memperbarui seluruh tampilan
        }, 1200);
      } else {
        throw new Error('Gagal menyimpan data ke database.');
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Terjadi kesalahan saat menyimpan.' });
    } finally {
      setIsSaving(false);
    }
  };

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
      {/* Floating button di pojok kiri bawah */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          title="Pengaturan & Admin Panel"
          className="p-2.5 rounded-full glass-panel border border-white/10 text-warm-300/50 hover:text-warm-100 hover:border-warm-200/40 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center gap-2 group"
          aria-label="Kustomisasi"
        >
          <Sliders className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
          <span className="hidden sm:inline text-[9px] tracking-mega-wide uppercase text-warm-300/60 font-sans">
            {cData.button || 'Pengaturan Admin'}
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
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl text-warm-100 custom-scrollbar"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-champagne-400/10 text-champagne-300">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-warm-50 font-normal">
                      Kelola Data & Foto Web
                    </h3>
                    <p className="text-[11px] font-sans text-warm-300/60 tracking-wider">
                      Ubah data pasangan dan unggah foto baru langsung ke Supabase
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

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-warm-300/70 space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-champagne-300" />
                  <p className="text-xs">Memuat data dari Supabase...</p>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-5">
                  {/* Status Notification */}
                  {statusMessage.text && (
                    <div
                      className={`p-3 rounded-xl border text-xs leading-relaxed ${
                        statusMessage.type === 'success'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {statusMessage.text}
                    </div>
                  )}

                  {/* Field Nama Pasangan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warm-300/80 mb-1">
                        Nama Pasangan 1
                      </label>
                      <input
                        type="text"
                        name="person1_name"
                        value={formData.person1_name}
                        onChange={handleInputChange}
                        placeholder="Contoh: Alex"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warm-300/80 mb-1">
                        Nama Pasangan 2
                      </label>
                      <input
                        type="text"
                        name="person2_name"
                        value={formData.person2_name}
                        onChange={handleInputChange}
                        placeholder="Contoh: Sarah"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Field Tanggal Jadian & Judul Hero */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warm-300/80 mb-1">
                        Tanggal Jadian / Spesial
                      </label>
                      <input
                        type="text"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        placeholder="Contoh: 2023-02-14"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warm-300/80 mb-1">
                        Judul Hero Section
                      </label>
                      <input
                        type="text"
                        name="hero_title"
                        value={formData.hero_title}
                        onChange={handleInputChange}
                        placeholder="Contoh: Our Journey"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subtitle Hero */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warm-300/80 mb-1">
                      Pesan Subtitle Hero
                    </label>
                    <textarea
                      name="hero_subtitle"
                      rows={2}
                      value={formData.hero_subtitle}
                      onChange={handleInputChange}
                      placeholder="Tuliskan pesan romantis singkat..."
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Upload Foto Hero */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warm-300/80 mb-1">
                      Foto Hero utama
                    </label>
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Hero Preview"
                          className="w-16 h-16 object-cover rounded-lg border border-white/15"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-warm-300/40">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}

                      <div className="flex-1 space-y-1">
                        <input
                          type="file"
                          id="hero-image-upload"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="hero-image-upload"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-warm-200 cursor-pointer transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Pilih Foto Baru</span>
                        </label>
                        <p className="text-[10px] text-warm-300/50">
                          Gambar akan diunggah otomatis ke bucket <code className="text-champagne-300">universe-assets</code>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[11px] tracking-wider text-warm-200/80 flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Tercopy!' : 'Copy Config JSON'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-full text-warm-300/70 hover:text-white text-xs transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-5 py-2 rounded-full bg-champagne-400/20 hover:bg-champagne-400/30 border border-champagne-400/40 text-champagne-200 text-xs font-medium tracking-wider flex items-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-3.5 h-3.5" />
                            <span>Simpan Perubahan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomizationModal;