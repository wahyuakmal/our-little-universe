import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Image, Plus, Trash2, Edit3, Upload, Check, AlertCircle, 
  RotateCcw, Sparkles, Calendar, MapPin, KeyRound, ShieldAlert,
  Layers, Bookmark, FileText, ArrowRight
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useLanguage } from '../../context/LanguageContext';
import { uploadImageFile } from '../../utils/imageUpload';

export const AdminDashboardModal = () => {
  const { 
    isDashboardModalOpen, 
    closeDashboardModal, 
    activeDashboardTab, 
    setActiveDashboardTab,
    addMomentPhoto,
    updateMomentPhoto,
    deleteMomentPhoto,
    updateHero,
    updateStory,
    updateMilestone,
    addMilestone,
    deleteMilestone,
    changePassword,
    resetToDefault
  } = useAdmin();

  const { data } = useLanguage();

  // Tab 1 (Moments) Form state
  const [isAddingMoment, setIsAddingMoment] = useState(false);
  const [editingMomentId, setEditingMomentId] = useState(null);
  const [momentImagePreview, setMomentImagePreview] = useState('');
  const [momentDate, setMomentDate] = useState('');
  const [momentCaption, setMomentCaption] = useState('');
  const [momentLocation, setMomentLocation] = useState('');
  const [momentAspect, setMomentAspect] = useState('portrait');
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Password change state
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdFeedback, setPwdFeedback] = useState({ type: '', text: '' });

  // Confirmation delete dialog state
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState(null); // { type: 'moment' | 'milestone', id: string, title: string }

  const fileInputRef = useRef(null);
  const heroFileInputRef = useRef(null);
  const story1FileInputRef = useRef(null);
  const story2FileInputRef = useRef(null);
  const milestoneFileInputRef = useRef(null);
  const [activeMilestoneForUpload, setActiveMilestoneForUpload] = useState(null);

  if (!isDashboardModalOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Handle uploading image for Moment
  const handleMomentFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const result = await uploadImageFile(file);
      setMomentImagePreview(result.url);
      showToast('Foto berhasil dimuat!');
    } catch (err) {
      alert('Gagal memproses gambar: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Submit Add or Edit Moment
  const handleSaveMoment = (e) => {
    e.preventDefault();
    if (!momentImagePreview) {
      alert('Silakan pilih atau masukkan URL foto terlebih dahulu.');
      return;
    }

    if (editingMomentId) {
      updateMomentPhoto(editingMomentId, {
        image: momentImagePreview,
        date: momentDate || '12.08.2024',
        caption: momentCaption || '',
        location: momentLocation || '',
        aspect: momentAspect,
      });
      showToast('Foto momen berhasil diperbarui!');
    } else {
      addMomentPhoto({
        image: momentImagePreview,
        date: momentDate || new Date().toLocaleDateString('id-ID'),
        caption: momentCaption || 'Momen indah bersama.',
        location: momentLocation || '',
        aspect: momentAspect,
      });
      showToast('Foto baru berhasil ditambahkan ke galeri!');
    }

    // Reset form
    setIsAddingMoment(false);
    setEditingMomentId(null);
    setMomentImagePreview('');
    setMomentDate('');
    setMomentCaption('');
    setMomentLocation('');
    setMomentAspect('portrait');
  };

  // Start editing existing moment
  const startEditMoment = (item) => {
    setEditingMomentId(item.id);
    setMomentImagePreview(item.image);
    setMomentDate(item.date);
    setMomentCaption(item.caption);
    setMomentLocation(item.location || '');
    setMomentAspect(item.aspect || 'portrait');
    setIsAddingMoment(true);
  };

  // Handle Hero Image Upload
  const handleHeroFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const result = await uploadImageFile(file);
      updateHero({ mainImage: result.url });
      showToast('Foto Hero berhasil diganti!');
    } catch (err) {
      alert('Gagal memproses gambar: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Story Image 1 Upload
  const handleStory1FileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const result = await uploadImageFile(file);
      updateStory({ image1: result.url });
      showToast('Foto Kisah Utama berhasil diganti!');
    } catch (err) {
      alert('Gagal memproses gambar: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Story Image 2 Upload
  const handleStory2FileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const result = await uploadImageFile(file);
      updateStory({ image2: result.url });
      showToast('Foto Detail Kisah berhasil diganti!');
    } catch (err) {
      alert('Gagal memproses gambar: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Milestone Image Upload
  const handleMilestoneFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !activeMilestoneForUpload) return;
    setIsUploading(true);
    try {
      const result = await uploadImageFile(file);
      updateMilestone(activeMilestoneForUpload, { image: result.url });
      showToast('Foto babak linimasa berhasil diganti!');
    } catch (err) {
      alert('Gagal memproses gambar: ' + err.message);
    } finally {
      setIsUploading(false);
      setActiveMilestoneForUpload(null);
    }
  };

  // Confirm delete handler
  const executeDelete = () => {
    if (!deleteConfirmTarget) return;
    if (deleteConfirmTarget.type === 'moment') {
      deleteMomentPhoto(deleteConfirmTarget.id);
      showToast('Foto momen berhasil dihapus.');
    } else if (deleteConfirmTarget.type === 'milestone') {
      deleteMilestone(deleteConfirmTarget.id);
      showToast('Babak linimasa berhasil dihapus.');
    }
    setDeleteConfirmTarget(null);
  };

  // Handle password change
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPwd !== confirmPwd) {
      setPwdFeedback({ type: 'error', text: 'Konfirmasi kata sandi tidak cocok.' });
      return;
    }
    const res = changePassword(newPwd);
    if (res.success) {
      setPwdFeedback({ type: 'success', text: 'Kata sandi admin berhasil diperbarui!' });
      setNewPwd('');
      setConfirmPwd('');
    } else {
      setPwdFeedback({ type: 'error', text: res.error });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={closeDashboardModal}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] glass-panel border border-white/15 rounded-2xl shadow-2xl text-warm-100 flex flex-col overflow-hidden"
      >
        {/* Hidden File Inputs */}
        <input type="file" ref={fileInputRef} onChange={handleMomentFileSelect} accept="image/*" className="hidden" />
        <input type="file" ref={heroFileInputRef} onChange={handleHeroFileSelect} accept="image/*" className="hidden" />
        <input type="file" ref={story1FileInputRef} onChange={handleStory1FileSelect} accept="image/*" className="hidden" />
        <input type="file" ref={story2FileInputRef} onChange={handleStory2FileSelect} accept="image/*" className="hidden" />
        <input type="file" ref={milestoneFileInputRef} onChange={handleMilestoneFileSelect} accept="image/*" className="hidden" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d0d0d]/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-champagne-400/10 text-champagne-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl text-warm-50 font-normal">
                Panel Admin — Kelola Foto Website
              </h2>
              <p className="text-[11px] text-warm-400/60 font-sans">
                Tambah, ganti, dan hapus foto secara instan tanpa perlu coding
              </p>
            </div>
          </div>
          <button
            onClick={closeDashboardModal}
            className="p-2 text-warm-300/60 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2 text-xs text-emerald-300 flex items-center gap-2"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-white/10 overflow-x-auto gap-2 bg-black/40">
          <button
            onClick={() => setActiveDashboardTab('moments')}
            className={`py-3 px-4 text-xs font-sans tracking-wider uppercase border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeDashboardTab === 'moments'
                ? 'border-champagne-400 text-champagne-300 font-medium'
                : 'border-transparent text-warm-400/60 hover:text-warm-200'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>03. Galeri Momen ({data.moments.gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveDashboardTab('hero-story')}
            className={`py-3 px-4 text-xs font-sans tracking-wider uppercase border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeDashboardTab === 'hero-story'
                ? 'border-champagne-400 text-champagne-300 font-medium'
                : 'border-transparent text-warm-400/60 hover:text-warm-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Hero & Kisah Awal</span>
          </button>

          <button
            onClick={() => setActiveDashboardTab('timeline')}
            className={`py-3 px-4 text-xs font-sans tracking-wider uppercase border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeDashboardTab === 'timeline'
                ? 'border-champagne-400 text-champagne-300 font-medium'
                : 'border-transparent text-warm-400/60 hover:text-warm-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>02. Linimasa ({data.timeline.milestones.length})</span>
          </button>

          <button
            onClick={() => setActiveDashboardTab('settings')}
            className={`py-3 px-4 text-xs font-sans tracking-wider uppercase border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeDashboardTab === 'settings'
                ? 'border-champagne-400 text-champagne-300 font-medium'
                : 'border-transparent text-warm-400/60 hover:text-warm-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Pengaturan</span>
          </button>
        </div>

        {/* Tab Contents (Scrollable body) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ============================================================== */}
          {/* TAB 1: GALERI MOMEN (SECTION 03) */}
          {/* ============================================================== */}
          {activeDashboardTab === 'moments' && (
            <div className="space-y-6">
              {/* Header Action: Tambah Foto */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div>
                  <h3 className="font-serif text-lg text-warm-50 font-normal">
                    Kelola Foto Momen Kecil
                  </h3>
                  <p className="text-xs text-warm-400/70 font-light">
                    Foto-foto ini tampil di Section 03 (Galeri Masonry) dan dapat dibuka di Lightbox.
                  </p>
                </div>
                {!isAddingMoment && (
                  <button
                    onClick={() => {
                      setIsAddingMoment(true);
                      setEditingMomentId(null);
                      setMomentImagePreview('');
                      setMomentCaption('');
                      setMomentDate(new Date().toLocaleDateString('id-ID'));
                      setMomentLocation('');
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-champagne-300 hover:bg-champagne-200 text-[#080808] font-medium text-xs tracking-wider uppercase transition-all shadow-md active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Foto Baru</span>
                  </button>
                )}
              </div>

              {/* Form Tambah / Edit Moment */}
              <AnimatePresence>
                {isAddingMoment && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSaveMoment}
                    className="p-5 rounded-xl border border-champagne-400/30 bg-champagne-400/[0.03] space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <h4 className="font-serif text-base text-champagne-300 font-medium">
                        {editingMomentId ? 'Edit Foto Momen' : 'Tambah Foto Momen Baru'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingMoment(false);
                          setEditingMomentId(null);
                        }}
                        className="text-xs text-warm-400 hover:text-white"
                      >
                        Batal
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Image Preview & Upload Input */}
                      <div className="md:col-span-5 flex flex-col items-center">
                        <div className="w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/15 bg-black/60 relative group flex items-center justify-center">
                          {momentImagePreview ? (
                            <img
                              src={momentImagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center p-4 text-warm-400/40">
                              <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <span className="text-xs">Belum ada foto dipilih</span>
                            </div>
                          )}
                        </div>

                        <div className="w-full mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-warm-100 flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Upload className="w-3.5 h-3.5 text-champagne-300" />
                            <span>{isUploading ? 'Memproses...' : 'Upload dari File'}</span>
                          </button>
                        </div>

                        <div className="w-full mt-2">
                          <input
                            type="text"
                            placeholder="Atau tempel URL gambar..."
                            value={momentImagePreview}
                            onChange={(e) => setMomentImagePreview(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-200 placeholder:text-warm-400/30 focus:outline-none focus:border-champagne-400"
                          />
                        </div>
                      </div>

                      {/* Detail Fields */}
                      <div className="md:col-span-7 space-y-3.5">
                        <div>
                          <label className="block text-[11px] font-sans tracking-wider uppercase text-warm-300/70 mb-1">
                            Tanggal Kenangan
                          </label>
                          <input
                            type="text"
                            placeholder="contoh: 12.08.2024 atau 14 Februari 2025"
                            value={momentDate}
                            onChange={(e) => setMomentDate(e.target.value)}
                            required
                            className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-sans tracking-wider uppercase text-warm-300/70 mb-1">
                            Caption / Kutipan Romantis
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Tuliskan cerita singkat atau kutipan manis..."
                            value={momentCaption}
                            onChange={(e) => setMomentCaption(e.target.value)}
                            required
                            className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400 resize-none leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-sans tracking-wider uppercase text-warm-300/70 mb-1">
                            Lokasi (Opsional)
                          </label>
                          <input
                            type="text"
                            placeholder="contoh: Kedai Kopi Sudut Jalan / Pantai Kuta"
                            value={momentLocation}
                            onChange={(e) => setMomentLocation(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-sans tracking-wider uppercase text-warm-300/70 mb-1">
                            Format Tampilan (Rasio)
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'portrait', label: 'Tegak (Portrait)' },
                              { id: 'landscape', label: 'Lebar (Landscape)' },
                              { id: 'square', label: 'Persegi (Square)' },
                            ].map((asp) => (
                              <button
                                key={asp.id}
                                type="button"
                                onClick={() => setMomentAspect(asp.id)}
                                className={`py-2 px-2 rounded-lg text-xs border text-center transition-all ${
                                  momentAspect === asp.id
                                    ? 'bg-champagne-400/20 border-champagne-400 text-champagne-200 font-medium'
                                    : 'bg-black/30 border-white/10 text-warm-400 hover:text-warm-200'
                                }`}
                              >
                                {asp.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingMoment(false);
                              setEditingMomentId(null);
                            }}
                            className="px-4 py-2 rounded-lg text-xs text-warm-400 hover:text-white"
                          >
                            Batal
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-champagne-300 hover:bg-champagne-200 text-[#080808] font-medium text-xs tracking-wider uppercase shadow-md transition-colors"
                          >
                            {editingMomentId ? 'Simpan Perubahan' : 'Simpan Foto'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Grid Daftar Foto Momen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.moments.gallery.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-2.5 bg-black/60">
                        <img
                          src={item.image}
                          alt={item.caption}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/75 text-warm-200">
                          #{idx + 1} • {item.aspect || 'portrait'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-champagne-300/80 mb-1">
                        <Calendar className="w-3 h-3 text-champagne-400" />
                        <span>{item.date}</span>
                        {item.location && (
                          <>
                            <span className="text-white/20">•</span>
                            <span className="truncate max-w-[120px]">{item.location}</span>
                          </>
                        )}
                      </div>

                      <p className="font-serif italic text-xs text-warm-100 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => startEditMoment(item)}
                        className="text-[11px] text-warm-300/80 hover:text-champagne-300 flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmTarget({ type: 'moment', id: item.id, title: `Foto tanggal ${item.date}` })}
                        className="text-[11px] text-rose-400/70 hover:text-rose-400 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: HERO & KISAH AWAL */}
          {/* ============================================================== */}
          {activeDashboardTab === 'hero-story' && (
            <div className="space-y-8">
              {/* Foto Utama (Hero) */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h3 className="font-serif text-lg text-warm-50 font-normal">
                      Foto Utama Pasangan (Hero Section)
                    </h3>
                    <p className="text-xs text-warm-400/70">
                      Foto besar sinematik di bagian paling atas beranda.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => heroFileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-champagne-300 hover:bg-champagne-200 text-[#080808] font-medium text-xs tracking-wider uppercase transition-all shadow-md active:scale-95"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Ganti Foto Hero</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 rounded-xl overflow-hidden aspect-[16/10] border border-white/10 relative">
                    <img
                      src={data.hero.mainImage}
                      alt="Hero couple"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded bg-black/75 text-warm-200 font-mono">
                      Foto saat ini
                    </div>
                  </div>

                  <div className="md:col-span-6 space-y-3">
                    <div>
                      <label className="block text-[11px] font-sans tracking-wider uppercase text-warm-300/70 mb-1">
                        URL Gambar Foto Hero
                      </label>
                      <input
                        type="text"
                        value={data.hero.mainImage}
                        onChange={(e) => updateHero({ mainImage: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans tracking-wider uppercase text-warm-300/70 mb-1">
                        Kutipan di Atas Foto
                      </label>
                      <input
                        type="text"
                        value={data.hero.quoteOverlay}
                        onChange={(e) => updateHero({ quoteOverlay: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans tracking-wider uppercase text-warm-300/70 mb-1">
                        Keterangan Foto (Caption)
                      </label>
                      <input
                        type="text"
                        value={data.hero.imageCaption}
                        onChange={(e) => updateHero({ imageCaption: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Foto Section 01: Kisah Awal */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="pb-3 border-b border-white/10">
                  <h3 className="font-serif text-lg text-warm-50 font-normal">
                    Foto Section 01 — Awal Kisah (How It Started)
                  </h3>
                  <p className="text-xs text-warm-400/70">
                    Dua foto bergaya majalah editorial pada babak awal pertemuan.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Foto 1: Tempat Pertemuan */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                    <span className="block text-xs font-medium text-champagne-300 font-sans tracking-wider uppercase">
                      Foto 1 (Foto Besar Tempat Pertama Bertemu)
                    </span>
                    <div className="aspect-[4/5] rounded-lg overflow-hidden border border-white/10">
                      <img src={data.story.image1} alt="Kisah 1" className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => story1FileInputRef.current?.click()}
                      className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-warm-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-champagne-300" />
                      <span>Ganti Foto Ini</span>
                    </button>
                    <input
                      type="text"
                      value={data.story.image1Caption}
                      onChange={(e) => updateStory({ image1Caption: e.target.value })}
                      placeholder="Caption foto..."
                      className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100"
                    />
                  </div>

                  {/* Foto 2: Detail Tatap Mata */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                    <span className="block text-xs font-medium text-champagne-300 font-sans tracking-wider uppercase">
                      Foto 2 (Foto Detail / Koordinat)
                    </span>
                    <div className="aspect-[4/5] rounded-lg overflow-hidden border border-white/10">
                      <img src={data.story.image2} alt="Kisah 2" className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => story2FileInputRef.current?.click()}
                      className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-warm-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-champagne-300" />
                      <span>Ganti Foto Ini</span>
                    </button>
                    <input
                      type="text"
                      value={data.story.image2Caption}
                      onChange={(e) => updateStory({ image2Caption: e.target.value })}
                      placeholder="Caption foto..."
                      className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: LINIMASA (SECTION 02) */}
          {/* ============================================================== */}
          {activeDashboardTab === 'timeline' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-warm-50 font-normal">
                    Kelola Linimasa Perjalanan Hubungan
                  </h3>
                  <p className="text-xs text-warm-400/70">
                    Setiap babak memiliki foto kenangan dan cerita perjalanan hubungan.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {data.timeline.milestones.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-16 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative group">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-champagne-300/80 mb-0.5">
                          <span>{item.date}</span>
                          <span className="text-white/20">•</span>
                          <span>{item.tag}</span>
                        </div>
                        <h4 className="font-serif text-base text-warm-50">{item.title}</h4>
                        <p className="text-xs text-warm-400/70 line-clamp-1 max-w-md">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                      <button
                        onClick={() => {
                          setActiveMilestoneForUpload(item.id);
                          milestoneFileInputRef.current?.click();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-warm-200 flex items-center gap-1.5 transition-colors"
                      >
                        <Upload className="w-3 h-3 text-champagne-300" />
                        <span>Ganti Foto</span>
                      </button>

                      {data.timeline.milestones.length > 1 && (
                        <button
                          onClick={() => setDeleteConfirmTarget({ type: 'milestone', id: item.id, title: item.title })}
                          className="p-1.5 rounded-lg text-rose-400/60 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Hapus babak ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: PENGATURAN & KEAMANAN */}
          {/* ============================================================== */}
          {activeDashboardTab === 'settings' && (
            <div className="space-y-6 max-w-xl mx-auto">
              {/* Ganti Kata Sandi */}
              <form onSubmit={handleChangePassword} className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                  <KeyRound className="w-4 h-4 text-champagne-400" />
                  <h3 className="font-serif text-base text-warm-50 font-normal">
                    Ganti Kata Sandi Admin
                  </h3>
                </div>

                {pwdFeedback.text && (
                  <div className={`p-3 rounded-lg text-xs ${
                    pwdFeedback.type === 'success' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                  }`}>
                    {pwdFeedback.text}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-sans tracking-wider uppercase text-warm-300/70 mb-1">
                    Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    required
                    placeholder="Minimal 4 karakter..."
                    className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans tracking-wider uppercase text-warm-300/70 mb-1">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    required
                    placeholder="Ulangi kata sandi..."
                    className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-warm-100 focus:outline-none focus:border-champagne-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-champagne-300 hover:bg-champagne-200 text-[#080808] font-medium text-xs tracking-wider uppercase shadow-md transition-colors"
                >
                  Perbarui Kata Sandi
                </button>
              </form>

              {/* Reset ke Bawaan */}
              <div className="p-5 rounded-xl bg-rose-500/[0.04] border border-rose-500/20 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-medium text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Zona Reset</span>
                </div>
                <p className="text-xs text-warm-300/70 leading-relaxed font-light">
                  Kembalikan semua foto, caption, dan data ke versi bawaan awal jika ingin memulai dari nol.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Yakin ingin mereset semua foto dan perubahan ke versi bawaan awal?')) {
                      resetToDefault();
                      showToast('Semua foto berhasil dikembalikan ke bawaan awal.');
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs tracking-wider transition-colors border border-rose-500/30"
                >
                  Reset Semua Foto ke Default
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#0d0d0d]/80 flex items-center justify-between text-xs text-warm-400/60">
          <span>Perubahan foto otomatis tersimpan dan aktif di website.</span>
          <button
            onClick={closeDashboardModal}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-warm-200 transition-colors"
          >
            Selesai & Tutup
          </button>
        </div>
      </motion.div>

      {/* Confirmation Delete Dialog */}
      <AnimatePresence>
        {deleteConfirmTarget && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setDeleteConfirmTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel border border-rose-500/30 rounded-2xl p-6 max-w-sm w-full text-warm-100 shadow-2xl space-y-4"
            >
              <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="font-serif text-lg text-warm-50 font-normal">Hapus Foto Ini?</h4>
                <p className="text-xs text-warm-300/70 mt-1 font-light">
                  Anda akan menghapus <strong className="text-warm-100">{deleteConfirmTarget.title}</strong> dari website.
                </p>
              </div>
              <div className="flex gap-2 justify-center pt-2">
                <button
                  onClick={() => setDeleteConfirmTarget(null)}
                  className="px-4 py-2 rounded-xl text-xs text-warm-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  onClick={executeDelete}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium transition-colors"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardModal;
