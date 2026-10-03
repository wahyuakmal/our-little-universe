/**
 * Utility to process and upload media (images & audio) to the local server (/api/upload)
 * or fallback to compressed Data URL in browser storage.
 */

export const compressImage = (file, maxWidth = 1920, maxHeight = 1920, quality = 0.88) => {
  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (!file.type.startsWith('image/')) {
      return reject(new Error('File yang dipilih bukan gambar valid.'));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            maxHeight = height;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to webp if supported, or jpeg
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
      img.src = event.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const uploadImageFile = async (file) => {
  try {
    let dataUrl;
    if (file.type.startsWith('image/')) {
      // 1. Compress image client-side for speed and memory efficiency
      dataUrl = await compressImage(file);
    } else {
      dataUrl = await readFileAsDataURL(file);
    }

    // 2. Try uploading to local server if Vite dev server is running
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          data: dataUrl,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (result.success && result.url) {
          return {
            success: true,
            url: result.url,
            isLocalServer: true,
          };
        }
      }
    } catch {
      // Production or static host: silently fall through to client storage fallback
    }

    // 3. Fallback: Return the compressed Data URL for direct in-memory / storage persistence
    return {
      success: true,
      url: dataUrl,
      isLocalServer: false,
    };
  } catch (error) {
    console.error('Error processing media upload:', error);
    throw error;
  }
};
