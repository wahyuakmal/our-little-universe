import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCoupleSettings, saveCoupleSettings } from '../services/supabaseService';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSettings = async () => {
    setLoading(true);
    try {
      // Ambil respon secara utuh tanpa langsung mengabaikan kemungkinan null
      const response = await getCoupleSettings();
      
      if (response) {
        // Jika response berupa objek data Supabase
        const settingsData = response.data || response;
        setSettings(settingsData);
      }
    } catch (err) {
      console.error('Gagal memuat data dari Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSaveSettings = async (newSettings) => {
    setLoading(true);
    try {
      const result = await saveCoupleSettings(newSettings);
      if (result) {
        await loadSettings(); // Muat ulang data setelah berhasil disimpan
        return { success: true };
      }
      return { success: false, error: 'Gagal menyimpan ke Supabase' };
    } catch (err) {
      console.error('Eror saat menyimpan settings:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        settings,
        setSettings,
        loading,
        loadSettings,
        saveSettings: handleSaveSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);