import { supabase } from '../lib/supabase';

// 1. Ambil data couple_settings dari database Supabase
export async function getCoupleSettings() {
  try {
    const { data, error } = await supabase
      .from('couple_settings')
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Error fetching couple settings:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Unexpected error fetching settings:', err);
    return null;
  }
}

// 2. Update/Upsert data couple_settings (Memastikan selalu menargetkan ID 1)
export async function updateCoupleSettings(settings) {
  try {
    const { data, error } = await supabase
      .from('couple_settings')
      .upsert({ id: 1, ...settings }) // Memaksa penggunaan ID 1
      .select();

    if (error) {
      console.error('Error updating couple settings:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Unexpected error updating settings:', err);
    return null;
  }
}

// 3. Upload foto hero ke Storage Bucket 'universe-assets'
export async function uploadHeroImage(file) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `hero-${Date.now()}.${fileExt}`;
    const filePath = `hero/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('universe-assets')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError.message);
      return null;
    }

    const { data } = supabase.storage
      .from('universe-assets')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error('Unexpected error during image upload:', err);
    return null;
  }
}