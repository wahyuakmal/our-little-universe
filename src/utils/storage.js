/**
 * Lightweight native IndexedDB & LocalStorage hybrid storage helper.
 * Solves localStorage 5MB quota limitations so uploaded photos in static
 * deployments (Vercel, GitHub Pages) never crash or get lost.
 */

const DB_NAME = 'OurLittleUniverseDB';
const DB_VERSION = 1;
const STORE_NAME = 'appData';

function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function setStoredItem(key, value) {
  // 1. Try saving to localStorage (quick synchronous access)
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (localStorageErr) {
    // Quota exceeded or private browsing limitation - ignore, IndexedDB will handle it
    console.warn('LocalStorage save failed, relying on IndexedDB:', localStorageErr);
  }

  // 2. Persist to IndexedDB (handles large images & MBs of data)
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (idbErr) {
    console.warn('IndexedDB write error:', idbErr);
    return false;
  }
}

export async function getStoredItem(key, defaultValue = null) {
  // 1. Try reading from IndexedDB first
  try {
    const db = await openDB();
    const idbValue = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    if (idbValue !== undefined && idbValue !== null) {
      return idbValue;
    }
  } catch (idbErr) {
    // IndexedDB failed or unavailable, fallback to localStorage
  }

  // 2. Fallback to localStorage
  try {
    const localVal = localStorage.getItem(key);
    if (localVal) {
      return JSON.parse(localVal);
    }
  } catch (e) {}

  return defaultValue;
}

export async function removeStoredItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {}

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(key);
  } catch (e) {}
}
