import React, { createContext, useContext, useState, useEffect } from 'react';
import { coupleData } from '../data/coupleData';
import { getCoupleSettings } from '../services/supabaseService';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');

  // Fungsi pembantu untuk memastikan fallback data selalu aman
  const getFallbackData = (lang) => {
    if (!coupleData) return {};
    return coupleData[lang] || coupleData['id'] || coupleData['en'] || {};
  };

  const [data, setData] = useState(() => getFallbackData('id'));
  const [coupleConfig, setCoupleConfig] = useState(null);

  useEffect(() => {
    const baseData = getFallbackData(language);

    const loadSupabaseData = async () => {
      try {
        const settings = await getCoupleSettings();
        if (settings) {
          setCoupleConfig(settings);

          // Timpa data hero dari Supabase tanpa merusak komponen/section lain
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

  const safeData = data || getFallbackData(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data: safeData, coupleConfig }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);