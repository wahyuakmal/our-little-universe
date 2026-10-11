import React, { createContext, useContext, useState, useEffect } from 'react';
import { coupleData } from '../data/coupleData';
import { getCoupleSettings } from '../services/supabaseService';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');
  const [data, setData] = useState(coupleData[language]);
  const [coupleConfig, setCoupleConfig] = useState({
    person1_name: coupleData[language]?.hero?.person1 || '',
    person2_name: coupleData[language]?.hero?.person2 || '',
    hero_image_url: coupleData[language]?.hero?.image || ''
  });

  // Ambil data terbaru dari Supabase saat web pertama kali dibuka
  useEffect(() => {
    const loadSupabaseData = async () => {
      const settings = await getCoupleSettings();
      if (settings) {
        // Timpa data hero dengan data & foto dari Supabase
        setData((prevData) => ({
          ...prevData,
          hero: {
            ...prevData.hero,
            person1: settings.person1_name || prevData.hero?.person1,
            person2: settings.person2_name || prevData.hero?.person2,
            title: settings.hero_title || prevData.hero?.title,
            subtitle: settings.hero_subtitle || prevData.hero?.subtitle,
            image: settings.hero_image_url || prevData.hero?.image
          }
        }));

        setCoupleConfig(settings);
      }
    };

    loadSupabaseData();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data, coupleConfig }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);