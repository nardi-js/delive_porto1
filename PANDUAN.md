# 📖 Panduan Penggunaan Website Portfolio Minimalis

Website portfolio yang sepenuhnya dinamis dengan desain minimalis hitam-putih. Semua konten dapat dikelola melalui Admin Page tanpa perlu edit kode.

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka browser di http://localhost:5174
```

## 📄 Halaman yang Tersedia

### Halaman Publik
1. **Home** (`/`) - Halaman utama dengan hero section
2. **About** (`/about`) - Halaman tentang diri
3. **Portfolio** (`/portfolio`) - Showcase projek dengan filter kategori
4. **Contact** (`/contact`) - Form kontak dan informasi kontak

### Halaman Admin
5. **Admin** (`/admin`) - Panel admin untuk kelola semua konten

## 🛠 Cara Menggunakan Admin Page

### 1️⃣ Akses Admin Panel
- Buka browser dan navigasi ke `/admin`
- Anda akan melihat 7 tab: Home, About, Portfolio, Gallery, Contact, Messages, Settings

### 2️⃣ Edit Halaman Home
1. Klik tab **Home**
2. Edit:
   - **Title**: Judul utama
   - **Subtitle**: Sub judul
   - **Description**: Deskripsi
   - **Hero Image URL**: Link gambar hero
3. Klik **Save Changes**

### 3️⃣ Edit Halaman About
1. Klik tab **About**
2. Edit:
   - **Title**: Judul halaman
   - **Description**: Deskripsi singkat
   - **Bio**: Biografi lengkap
   - **Profile Image URL**: Link foto profil
3. Klik **Save Changes**

### 4️⃣ Kelola Portfolio
1. Klik tab **Portfolio**
2. **Tambah Item Baru**:
   - Klik tombol **Add New Item**
   - Isi form:
     - Title (wajib)
     - Description
     - Category (untuk filter)
     - Image URL
     - Order (urutan tampil)
   - Klik **Add**

3. **Edit Item**:
   - Klik tombol **Edit** pada item yang ingin diubah
   - Ubah data yang diperlukan
   - Klik **Update**

4. **Hapus Item**:
   - Klik tombol **Delete** pada item
   - Konfirmasi penghapusan

### 5️⃣ Kelola Gallery
1. Klik tab **Gallery**
2. Cara penggunaan sama seperti Portfolio
3. Setiap item gallery membutuhkan:
   - Title (wajib)
   - Image URL (wajib)
   - Category (opsional)
   - Order (opsional)

### 6️⃣ Edit Informasi Kontak
1. Klik tab **Contact**
2. Edit:
   - **Email**: Alamat email
   - **Phone**: Nomor telepon
   - **Location**: Lokasi/alamat
   - **Social Media Links**:
     - Twitter
     - LinkedIn
     - GitHub
3. Klik **Save Changes**

### 7️⃣ Lihat Pesan Kontak
1. Klik tab **Messages**
2. Lihat semua pesan yang masuk dari form kontak
3. Hapus pesan dengan klik tombol **Delete**

### 8️⃣ Pengaturan Website
1. Klik tab **Settings**
2. Atur:
   - **Theme**: Light/Dark (untuk pengembangan masa depan)
   - **Primary Color**: Warna utama
   - **Typography**: Sans/Serif/Mono
3. Klik **Save Settings**

## 🔄 Fitur Real-time Update

Semua perubahan yang dilakukan di Admin Page akan **langsung terlihat** di halaman publik tanpa perlu refresh manual!

## 💾 Penyimpanan Data

- Semua data disimpan di **localStorage** browser
- Data tetap ada meskipun browser ditutup
- Tidak perlu database atau backend
- Data bersifat lokal per browser

## 🔄 Reset Data

Jika ingin mengembalikan ke data default:
1. Buka Admin Page
2. Klik tombol **Reset to Default** di pojok kanan atas
3. Konfirmasi reset
4. Semua data akan kembali ke kondisi awal

## 📝 Tips Penggunaan

### Untuk Gambar
- Gunakan URL gambar dari:
  - Unsplash: `https://images.unsplash.com/...`
  - Imgur: `https://i.imgur.com/...`
  - Google Drive (public link)
  - Hosting gambar lainnya

### Untuk Portfolio
- Gunakan **Category** untuk mengelompokkan projek
- Atur **Order** untuk mengontrol urutan tampil
- Deskripsi yang jelas membantu pengunjung memahami projek

### Untuk Contact Form
- Pesan yang masuk akan tersimpan di tab **Messages**
- Cek secara berkala dan hapus pesan yang sudah dibaca

## 🎨 Desain Minimalis

Website ini menggunakan prinsip desain minimalis:
- ✅ Dominasi warna hitam & putih
- ✅ Fokus pada tipografi
- ✅ Whitespace yang generous
- ✅ Tanpa elemen visual berlebihan
- ✅ Clean & readable

## 📱 Responsive Design

Website otomatis menyesuaikan dengan ukuran layar:
- 📱 Mobile (smartphone)
- 📱 Tablet
- 💻 Desktop
- 🖥 Large screen

## ⚠️ Catatan Penting

1. **Data bersifat lokal**: Data tersimpan di browser Anda. Jika clear cache/cookies, data akan hilang.
2. **Backup data**: Untuk backup, bisa export localStorage via browser DevTools.
3. **Image URL**: Pastikan URL gambar valid dan accessible.
4. **Browser compatibility**: Gunakan browser modern (Chrome, Firefox, Safari, Edge).

## 🆘 Troubleshooting

### Data tidak muncul?
- Cek localStorage di browser DevTools
- Coba reset data di Admin Page
- Refresh halaman

### Gambar tidak muncul?
- Pastikan URL gambar benar
- Cek apakah URL bisa diakses
- Gunakan HTTPS URL

### Perubahan tidak tersimpan?
- Pastikan klik tombol Save/Add/Update
- Cek console browser untuk error
- Coba refresh halaman

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Struktur File

```
delive_porto1/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Navigasi
│   │   └── Footer.jsx       # Footer
│   ├── pages/
│   │   ├── Home.jsx         # Halaman Home
│   │   ├── About.jsx        # Halaman About
│   │   ├── Portfolio.jsx    # Halaman Portfolio
│   │   ├── Contact.jsx      # Halaman Contact
│   │   └── Admin.jsx        # Admin Panel
│   ├── services/
│   │   └── dataService.js   # Kelola localStorage
│   ├── App.jsx              # Main app dengan routing
│   └── main.jsx             # Entry point
├── index.html               # HTML template
└── package.json             # Dependencies
```

## 🎯 Fitur Lengkap

✅ Multi-page dengan routing
✅ Fully dynamic content
✅ CRUD operations lengkap
✅ Real-time updates
✅ Responsive design
✅ Contact form dengan storage
✅ Category filtering
✅ Image support via URL
✅ Admin panel komprehensif
✅ Data persistence
✅ Reset to default
✅ Minimalist design

---

Selamat menggunakan! 🎉

Jika ada pertanyaan atau butuh bantuan, silakan hubungi developer.
