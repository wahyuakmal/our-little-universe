# OUR LITTLE UNIVERSE (SEMESTA KECIL KITA) 🌌
*Ruang Digital Puitis & Jurnal Dokumentasi Cinta Pasangan*

Website dokumentasi hubungan eksklusif dengan estetika **Dark Cinematic Romance**: romantis, intim, sinematik, elegan, emosional, minimalis, dan sangat estetik.

Website ini dibuat dengan **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, dan **Lucide Icons**. Dilengkapi dengan **Panel Admin Interaktif**, sehingga Anda bisa **menambah, mengganti, dan menghapus foto langsung dari browser** tanpa perlu membuka VS Code atau mengubah kode program secara manual!

---

## ✨ Fitur Unggulan

1. **Pre-loading / Opening Sinematik Layar Penuh**:
   - Scene 1: Titik cahaya tunggal yang membesar lembut (*soft glow*).
   - Scene 2: *“Dua orang asing.”* (fade-in & blur).
   - Scene 3: *“Satu cerita tak terduga.”*
   - Scene 4: *“Dan entah bagaimana…”* (cinematic pause).
   - Scene 5: *“Kita menjadi kita.”* (tipografi serif anggun & bercahaya).
   - Scene 6: Tombol minimalis **`MASUKI SEMESTA KITA →`** dengan transisi zoom sinematik.

2. **Hero Section**:
   - Headline: *“Di antara dua orang asing, kita menjadi kita.”*
   - Foto editorial utama pasangan dengan rasio sinematik, film grain 35mm, soft shadow, dan hover interaktif.
   - Penghitung hari otomatis: *“Hari ke-XXX di semesta kita”* (terhitung otomatis dari tanggal jadian).
   - Indikator gulir mengambang lembut: **`GULIR UNTUK MENJELAJAHI ↓`**.

3. **Bilah Navigasi Minimalis (Sticky Glassmorphism)**:
   - Logo puitis dan menu: `01 CERITA`, `02 LINIMASA`, `03 MOMEN`.
   - **Pengalih Bahasa Instan**: Tombol `ID | EN` di navbar.
   - Tombol **`Prolog`** untuk memutar ulang animasi pembuka kapan saja.
   - Menu mobile layar penuh bergaya majalah editorial mewah.

4. **Section 01 — AWAL KISAH KITA**:
   - Layout majalah/film journal editorial.
   - Narasi mendalam, tanggal, koordinat tempat pertama bertemu, dan kutipan puitis.

5. **Section 02 — LINIMASA KITA**:
   - Linimasa vertikal elegan dengan garis tipis di tengah dan node bercahaya.
   - Babak perjalanan: *Sapaan Pertama*, *Kencan Pertama*, *Kita Menjadi Kita*, *Perjalanan Tengah Malam*, *Babak Baru*.

6. **Section 03 — MOMEN KECIL (Galeri Masonry & Lightbox)**:
   - Galeri foto editorial dinamis (*portrait*, *landscape*, *square*).
   - Efek hover: zoom halus, overlay transparan gelap, tanggal, dan caption romantis.
   - Fullscreen Lightbox interaktif dengan tombol navigasi Prev/Next, tombol close, dan dukungan keyboard (`Esc`, panah kiri/kanan).

7. **Secarik Catatan di Bawah Bintang**:
   - Surat cinta intim bergaya perkamen digital dengan tanda tangan kedua pasangan.

8. **Bagian Akhir (Final Emotional Section)**:
   - Latar hitam pekat (`#050505`).
   - Pesan penutup: *“Dan ini hanyalah sebuah permulaan. Masih ada begitu banyak detik, tawa, dan cerita yang belum kita jalani bersama.”*
   - Tombol: **`KISAH KITA BERLANJUT →`**.

9. **Pemutar Musik (♫ LAGU KITA)**:
   - Kontrol melayang di pojok kanan bawah dengan visualizer gelombang suara.
   - Fitur Putar, Jeda, Bisukan, dan Penggantian Lagu Langsung dari File Laptop/HP.
   - Dilengkapi synthesizer piano ambient otomatis agar musik selalu terdengar merdu tanpa resiko error.

10. **Panel Admin & Manajemen Foto Terintegrasi**:
    - Login password admin (default: `semesta123`).
    - Tambah foto baru, edit foto, dan hapus foto langsung dari browser.
    - Dilengkapi penyimpanan ganda (IndexedDB + LocalStorage + Local Server Disk) agar foto tidak hilang saat refresh.

---

## 👑 Panduan Mode Admin

1. Buka website di browser dan masuk ke beranda.
2. Klik ikon gembok **🔒** di bilah navigasi kanan atas (atau klik tulisan **🔒 Login Admin** di footer paling bawah).
3. Masukkan kata sandi admin:
   - **Password Default:** `semesta123`
4. Bilah **👑 Mode Admin** akan muncul di atas layar:
   - **Tambah Foto Momen:** Klik `+ Tambah Foto` atau klik kartu `+ Tambah Foto Momen` di Section 03.
   - **Ganti Foto:** Arahkan kursor ke foto Hero, Kisah, atau Linimasa, lalu klik tombol `✏️ Ganti Foto`.
   - **Hapus Foto:** Klik ikon tempat sampah `🗑️ Hapus` pada kartu foto yang ingin dihapus.
   - **Ganti Password:** Buka panel admin ➔ tab **Pengaturan** ➔ masukkan password baru Anda.

---

## 🚀 Panduan Publikasi ke GitHub & Hosting Gratis

### Langkah 1: Buat Repository Baru di GitHub
1. Buka [GitHub](https://github.com/) dan login ke akun Anda.
2. Klik tombol **New** (Buat Repository Baru).
3. Beri nama repository, misalnya: `our-little-universe` atau `sameone`.
4. Pilih **Public** (atau Private).
5. Jangan centang "Add a README file" (karena file proyek sudah lengkap).
6. Klik **Create repository**.

---

### Langkah 2: Upload / Push Kode ke GitHub
Buka terminal (PowerShell atau Command Prompt) di folder proyek ini:

```bash
# 1. Inisialisasi Git
git init

# 2. Tambahkan semua file ke staging
git add .

# 3. Buat commit pertama
git commit -m "feat: initial commit Our Little Universe"

# 4. Ganti nama branch utama ke main
git branch -M main

# 5. Hubungkan ke repository GitHub Anda (ganti URL di bawah dengan URL repo Anda)
git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git

# 6. Push kode ke GitHub
git push -u origin main
```

---

### Langkah 3: Deploy Online Gratis (Pilihan Terbaik)

#### Pilihan A: Vercel (Paling Mudah & Cepat — 1 Menit)
1. Buka [Vercel](https://vercel.com/) dan login menggunakan akun GitHub Anda.
2. Klik **Add New...** ➔ **Project**.
3. Pilih repository `our-little-universe` yang baru saja Anda push.
4. Vercel akan otomatis mendeteksi framework **Vite**. Biarkan semua pengaturan default.
5. Klik **Deploy**.
6. Dalam hitungan detik, website Anda sudah aktif dengan domain gratis berkecepatan tinggi (contoh: `https://our-little-universe.vercel.app`)!

#### Pilihan B: Netlify
1. Buka [Netlify](https://www.netlify.com/) dan login dengan GitHub.
2. Klik **Add new site** ➔ **Import an existing project**.
3. Pilih repository GitHub Anda, klik **Deploy site**.

#### Pilihan C: GitHub Pages
1. Di repository GitHub Anda, buka menu **Settings** ➔ **Pages**.
2. Pada bagian **Build and deployment**, pilih Source: **GitHub Actions**.
3. Pilih template **Static HTML / Vite** atau buat workflow build Vite.

---

## 💻 Menjalankan di Komputer Lokal

```bash
# Install dependencies (jika baru pertama kali clone)
npm install

# Menjalankan server pengembangan lokal
npm run dev

# Membangun versi produksi (hasil di folder dist/)
npm run build

# Meninjau hasil build produksi
npm run preview
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
Dibuat dengan cinta untuk mengabadikan setiap detik cerita yang berharga. ∞
