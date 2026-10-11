import React, { createContext, useContext, useState, useEffect } from 'react';
import { coupleDataByLang, coupleConfig as rawCoupleConfig } from '../data/coupleData';
import { getCoupleSettings } from '../services/supabaseService';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');

  // Ambil data lokal secara utuh dengan deep-merge untuk nav & hero
  const getBaseData = (lang) => {
    const defaultData = coupleDataByLang?.id || {};
    const selectedData = coupleDataByLang?.[lang] || defaultData;

    return {
      ...defaultData,
      ...selectedData,
      nav: {
        ...(defaultData.nav || {}),
        ...(selectedData.nav || {})
      },
      hero: {
        ...(defaultData.hero || {}),
        ...(selectedData.hero || {})
      }
    };
  };

  const [data, setData] = useState(() => getBaseData('id'));
  const [coupleConfig, setCoupleConfig] = useState(() => rawCoupleConfig || {});

  useEffect(() => {
    const baseData = getBaseData(language);

    const loadSupabaseData = async () => {
      try {
        const settings = await getCoupleSettings();
        if (settings && Object.keys(settings).length > 0) {
          setCoupleConfig((prev) => ({ ...(prev || {}), ...settings }));

          setData({
            ...baseData,
            hero: {
              ...(baseData.hero || {}),
              person1: settings.person1_name || baseData.hero?.person1 || rawCoupleConfig?.partner1 || '',
              person2: settings.person2_name || baseData.hero?.person2 || rawCoupleConfig?.partner2 || '',
              title: settings.hero_title || baseData.hero?.title || '',
              subtitle: settings.hero_subtitle || baseData.hero?.subtitle || '',
              mainImage: settings.hero_image_url || baseData.hero?.mainImage || baseData.hero?.image || '',
              image: settings.hero_image_url || baseData.hero?.image || baseData.hero?.mainImage || '',
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

  const activeData = data && Object.keys(data).length > 0 ? data : getBaseData(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data: activeData, coupleConfig }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);