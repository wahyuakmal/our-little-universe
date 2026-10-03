import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { setStoredItem, getStoredItem, removeStoredItem } from '../utils/storage';

const AdminContext = createContext();

const DEFAULT_ADMIN_PWD = 'semesta123';

export const AdminProvider = ({ children }) => {
  // Authentication state
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('olu_admin_logged_in') === 'true';
  });

  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('olu_admin_pwd') || DEFAULT_ADMIN_PWD;
  });

  // Modal display states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);
  const [activeDashboardTab, setActiveDashboardTab] = useState('moments');
  const [editTargetData, setEditTargetData] = useState(null);

  // Custom data overrides (photos, captions, custom moments, etc.)
  const [customData, setCustomData] = useState(() => {
    try {
      const saved = localStorage.getItem('olu_custom_data');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // On mount, load from IndexedDB and check local dev server if available
  useEffect(() => {
    // 1. Load from IndexedDB (preserves large photos even if localStorage hit quota)
    getStoredItem('olu_custom_data', null).then((idbData) => {
      if (idbData && typeof idbData === 'object') {
        setCustomData((prev) => ({
          ...idbData,
          ...prev,
        }));
      }
    });

    // 2. Safely check local dev server /api/data without throwing syntax errors on static hosts
    fetch('/api/data')
      .then((res) => {
        if (!res.ok) return null;
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((serverData) => {
        if (serverData && serverData.exists !== false && typeof serverData === 'object') {
          setCustomData((prev) => ({
            ...serverData,
            ...prev,
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Save changes to IndexedDB, localStorage, and local server
  const persistCustomData = useCallback((newData) => {
    setCustomData(newData);
    
    // Save to hybrid storage (IndexedDB + localStorage)
    setStoredItem('olu_custom_data', newData);

    // If local dev server is running, also persist directly to public/coupleCustomData.json
    try {
      fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      }).catch(() => {});
    } catch {}
  }, []);

  // Login method
  const login = (inputPassword) => {
    if (inputPassword === adminPassword) {
      setIsAdmin(true);
      localStorage.setItem('olu_admin_logged_in', 'true');
      setIsLoginModalOpen(false);
      return { success: true };
    }
    return { success: false, error: 'Kata sandi salah. Silakan coba lagi.' };
  };

  // Logout method
  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('olu_admin_logged_in');
    setIsDashboardModalOpen(false);
  };

  // Change password method
  const changePassword = (newPassword) => {
    if (!newPassword || newPassword.length < 4) {
      return { success: false, error: 'Kata sandi minimal 4 karakter.' };
    }
    setAdminPassword(newPassword);
    localStorage.setItem('olu_admin_pwd', newPassword);
    return { success: true };
  };

  // Modal helpers
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openDashboardModal = (tab = 'moments', targetData = null) => {
    setActiveDashboardTab(tab);
    setEditTargetData(targetData);
    setIsDashboardModalOpen(true);
  };
  const closeDashboardModal = () => {
    setIsDashboardModalOpen(false);
    setEditTargetData(null);
  };

  // ==========================================
  // PHOTO CRUD ACTIONS
  // ==========================================

  // 1. Hero Photo & Quotes
  const updateHero = (heroFields) => {
    const updated = {
      ...customData,
      hero: {
        ...(customData.hero || {}),
        ...heroFields,
      },
    };
    persistCustomData(updated);
  };

  // 2. Story Photos & Captions
  const updateStory = (storyFields) => {
    const updated = {
      ...customData,
      story: {
        ...(customData.story || {}),
        ...storyFields,
      },
    };
    persistCustomData(updated);
  };

  // 3. Section 03 - Moments Gallery CRUD
  const addMomentPhoto = (moment) => {
    const newMoment = {
      id: `custom-m-${Date.now()}`,
      date: moment.date || new Date().toLocaleDateString('id-ID'),
      image: moment.image,
      caption: moment.caption || '',
      location: moment.location || '',
      aspect: moment.aspect || 'portrait',
    };

    const currentMoments = customData.momentsGallery || null;
    const updatedGallery = currentMoments ? [newMoment, ...currentMoments] : [newMoment];

    const updated = {
      ...customData,
      momentsGallery: updatedGallery,
    };
    persistCustomData(updated);
  };

  const updateMomentPhoto = (id, fields) => {
    const currentMoments = customData.momentsGallery || [];
    const index = currentMoments.findIndex(m => m.id === id);

    let updatedGallery;
    if (index !== -1) {
      updatedGallery = currentMoments.map(m => (m.id === id ? { ...m, ...fields } : m));
    } else {
      updatedGallery = [...currentMoments, { id, ...fields }];
    }

    const updated = {
      ...customData,
      momentsGallery: updatedGallery,
    };
    persistCustomData(updated);
  };

  const deleteMomentPhoto = (id) => {
    const currentMoments = customData.momentsGallery || [];
    const updatedGallery = currentMoments.filter(m => m.id !== id);
    const deletedIds = customData.deletedMomentIds || [];

    const updated = {
      ...customData,
      momentsGallery: updatedGallery,
      deletedMomentIds: [...deletedIds, id],
    };
    persistCustomData(updated);
  };

  // 4. Section 02 - Timeline Milestones CRUD
  const updateMilestone = (id, fields) => {
    const currentMilestones = customData.milestones || [];
    const index = currentMilestones.findIndex(m => m.id === id);

    let updatedMilestones;
    if (index !== -1) {
      updatedMilestones = currentMilestones.map(m => (m.id === id ? { ...m, ...fields } : m));
    } else {
      updatedMilestones = [...currentMilestones, { id, ...fields }];
    }

    const updated = {
      ...customData,
      milestones: updatedMilestones,
    };
    persistCustomData(updated);
  };

  const addMilestone = (milestone) => {
    const newMilestone = {
      id: `milestone-${Date.now()}`,
      date: milestone.date || '',
      title: milestone.title || 'Babak Baru',
      subtitle: milestone.subtitle || '',
      description: milestone.description || '',
      image: milestone.image || '',
      tag: milestone.tag || 'Babak Tambahan',
    };

    const currentMilestones = customData.milestones || [];
    const updated = {
      ...customData,
      milestones: [...currentMilestones, newMilestone],
    };
    persistCustomData(updated);
  };

  const deleteMilestone = (id) => {
    const currentMilestones = customData.milestones || [];
    const updatedMilestones = currentMilestones.filter(m => m.id !== id);
    const deletedIds = customData.deletedMilestoneIds || [];

    const updated = {
      ...customData,
      milestones: updatedMilestones,
      deletedMilestoneIds: [...deletedIds, id],
    };
    persistCustomData(updated);
  };

  // 5. Reset to original code defaults
  const resetToDefault = () => {
    removeStoredItem('olu_custom_data');
    setCustomData({});
    try {
      fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }).catch(() => {});
    } catch {}
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        adminPassword,
        login,
        logout,
        changePassword,
        customData,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isDashboardModalOpen,
        openDashboardModal,
        closeDashboardModal,
        activeDashboardTab,
        setActiveDashboardTab,
        editTargetData,
        updateHero,
        updateStory,
        addMomentPhoto,
        updateMomentPhoto,
        deleteMomentPhoto,
        updateMilestone,
        addMilestone,
        deleteMilestone,
        resetToDefault,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
