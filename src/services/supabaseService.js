import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 1. Mengambil data dari Supabase
export const getCoupleSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('couple_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (error) {
      console.error('Gagal mengambil data dari Supabase:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Catch error getCoupleSettings:', err);
    return null;
  }
};

// 2. Menyimpan data ke Supabase
export const saveCoupleSettings = async (newData) => {
  try {
    const { data, error } = await supabase
      .from('couple_settings')
      .upsert({ id: 1, ...newData });

    if (error) {
      console.error('Gagal menyimpan data ke Supabase:', error);
      return null;
    }

    return data || true;
  } catch (err) {
    console.error('Catch error saveCoupleSettings:', err);
    return null;
  }
};

// 3. Upload Foto Hero ke Supabase Storage Bucket ('universe-assets')
export const uploadHeroImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `hero_${Date.now()}.${fileExt}`;
    const filePath = `hero/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('universe-assets')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Gagal mengunggah foto:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('universe-assets')
      .getPublicUrl(filePath);

    return data?.publicUrl || null;
  } catch (err) {
    console.error('Catch error uploadHeroImage:', err);
    return null;
  }
};

// Alias ekspor agar kompatibel dengan pemanggilan lama
export const updateCoupleSettings = saveCoupleSettings;