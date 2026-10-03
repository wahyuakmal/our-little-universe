import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { coupleConfig, coupleDataByLang } from '../data/coupleData';
import { useAdmin } from './AdminContext';

const LanguageContext = createContext();

export function mergeCoupleData(baseData, customData = {}) {
  if (!customData || Object.keys(customData).length === 0) return baseData;

  const deletedMomentIds = new Set(customData.deletedMomentIds || []);
  const deletedMilestoneIds = new Set(customData.deletedMilestoneIds || []);

  // Merge Moments Gallery
  let mergedGallery = [];
  const customGalleryMap = new Map((customData.momentsGallery || []).map(m => [m.id, m]));

  // Default gallery items not deleted
  (baseData.moments?.gallery || []).forEach(item => {
    if (!deletedMomentIds.has(item.id)) {
      if (customGalleryMap.has(item.id)) {
        mergedGallery.push({ ...item, ...customGalleryMap.get(item.id) });
        customGalleryMap.delete(item.id);
      } else {
        mergedGallery.push(item);
      }
    }
  });

  // Prepend newly added custom moments to the top
  customGalleryMap.forEach(item => {
    if (!deletedMomentIds.has(item.id)) {
      mergedGallery.unshift(item);
    }
  });

  // Merge Milestones
  let mergedMilestones = [];
  const customMilestonesMap = new Map((customData.milestones || []).map(m => [m.id, m]));

  (baseData.timeline?.milestones || []).forEach(item => {
    if (!deletedMilestoneIds.has(item.id)) {
      if (customMilestonesMap.has(item.id)) {
        mergedMilestones.push({ ...item, ...customMilestonesMap.get(item.id) });
        customMilestonesMap.delete(item.id);
      } else {
        mergedMilestones.push(item);
      }
    }
  });

  // Add any custom extra milestones
  customMilestonesMap.forEach(item => {
    if (!deletedMilestoneIds.has(item.id)) {
      mergedMilestones.push(item);
    }
  });

  return {
    ...baseData,
    hero: {
      ...baseData.hero,
      ...(customData.hero || {}),
    },
    story: {
      ...baseData.story,
      ...(customData.story || {}),
    },
    timeline: {
      ...baseData.timeline,
      milestones: mergedMilestones,
    },
    moments: {
      ...baseData.moments,
      gallery: mergedGallery,
    },
  };
}

export const LanguageProvider = ({ children }) => {
  const { customData } = useAdmin();

  // Default language is 'id' (Bahasa Indonesia)
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('olu_lang') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('olu_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const rawData = coupleDataByLang[lang] || coupleDataByLang.id;

  // Merge default text with any custom photos/content from Admin
  const data = useMemo(() => {
    return mergeCoupleData(rawData, customData);
  }, [rawData, customData]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, data, coupleConfig }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
