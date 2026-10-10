import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 1. Fungsi Mengambil Data dari Supabase
export const getCoupleSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('couple_settings')
      .select('data')
      .eq('id', 1)
      .maybeSingle();

    if (error) {
      console.error('Gagal mengambil data dari Supabase:', error);
      return { data: null, error };
    }

    return { data: data?.data || {}, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

// 2. Fungsi Menyimpan Data ke Supabase
export const saveCoupleSettings = async (newData) => {
  try {
    const { data, error } = await supabase
      .from('couple_settings')
      .upsert({ id: 1, data: newData });

    if (error) {
      console.error('Gagal menyimpan data ke Supabase:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};