import React, { createContext, useContext, useState, useEffect } from 'react';
import { coupleData } from '../data/coupleData';
import { getCoupleSettings } from '../services/supabaseService';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');

  // Ambil data lokal berdasarkan bahasa atau struktur objek
  const getBaseData = (lang) => {
    if (!coupleData) return {};
    if (coupleData[lang]) return coupleData[lang];
    if (coupleData['id']) return coupleData['id'];
    if (coupleData['en']) return coupleData['en'];
    return coupleData;
  };

  const [data, setData] = useState(() => getBaseData('id'));
  const [coupleConfig, setCoupleConfig] = useState(null);

  useEffect(() => {
    const loadSupabaseData = async () => {
      const baseData = getBaseData(language);

      try {
        const settings = await getCoupleSettings();
        if (settings) {
          setCoupleConfig(settings);

          // Gabungkan data Supabase HANYA untuk bagian hero,
          // pertahankan seluruh data lokal lainnya (story, timeline, opening, dll)
          setData({
            ...baseData,
            hero: {
              ...(baseData?.hero || {}),
              person1: settings.person1_name || baseData?.hero?.person1 || '',
              person2: settings.person2_name || baseData?.hero?.person2 || '',
              title: settings.hero_title || baseData?.hero?.title || '',
              subtitle: settings.hero_subtitle || baseData?.hero?.subtitle || '',
              image: settings.hero_image_url || baseData?.hero?.image || '',
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

  // Jaminan agar 'data' tidak pernah undefined
  const currentData = data && Object.keys(data).length > 0 ? data : getBaseData(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data: currentData, coupleConfig }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);