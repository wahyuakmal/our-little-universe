import React, { createContext, useContext, useState, useEffect } from 'react';
import coupleDataRaw from '../data/coupleData';
import { getCoupleSettings } from '../services/supabaseService';

// Menangani ekspor coupleData baik berupa default export maupun named export
const coupleData = coupleDataRaw?.coupleData || coupleDataRaw || {};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');

  // Fungsi pembantu untuk memastikan data lokal selalu siap (tidak pernah undefined)
  const getFallbackData = (lang) => {
    return coupleData[lang] || coupleData['id'] || coupleData['en'] || coupleData || {};
  };

  const [data, setData] = useState(() => getFallbackData('id'));
  const [coupleConfig, setCoupleConfig] = useState(null);

  useEffect(() => {
    // 1. Ambil data lokal dasar sesuai bahasa
    const baseData = getFallbackData(language);

    const loadSupabaseData = async () => {
      try {
        const settings = await getCoupleSettings();
        if (settings) {
          setCoupleConfig(settings);

          // 2. Gabungkan data hero Supabase ke dalam data lokal tanpa menghapus section lain
          setData({
            ...baseData,
            hero: {
              ...(baseData.hero || {}),
              person1: settings.person1_name || baseData.hero?.person1,
              person2: settings.person2_name || baseData.hero?.person2,
              title: settings.hero_title || baseData.hero?.title,
              subtitle: settings.hero_subtitle || baseData.hero?.subtitle,
              image: settings.hero_image_url || baseData.hero?.image,
            },
          });
        } else {
          setData(baseData);
        }
      } catch (err) {
        console.error('Gagal memuat data Supabase:', err);
        setData(baseData);
      }
    };

    loadSupabaseData();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data: data || getFallbackData(language), coupleConfig }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);