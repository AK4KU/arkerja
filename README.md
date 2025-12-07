# 📱 WebAR Pengenalan Profesi

Aplikasi WebAR interaktif untuk mengenalkan berbagai profesi menggunakan teknologi Augmented Reality.

## 🎯 Fitur

- **4 Profesi**: Polisi, Dokter, Pemadam Kebakaran, Guru
- **WebAR Markerless**: Deteksi permukaan otomatis tanpa marker
- **Model 3D Interaktif**: Visualisasi 3D setiap profesi
- **Responsive UI**: Tampilan optimal di semua perangkat mobile

## 📋 Persiapan

### 1. Konversi Model 3D

File model saat ini dalam format `.blend`. Anda perlu mengonversi ke format `.glb`:

**Menggunakan Blender:**
1. Buka file `.blend` di Blender
2. File → Export → glTF 2.0 (.glb/.gltf)
3. Pilih format `.glb`
4. Simpan dengan nama yang sesuai:
   - `polisi.blend` → `polisi.glb`
   - `dokter.blend` → `dokter.glb`
   - `pemadam.blend` → `pemadam.glb`
   - `guru.blend` → `guru.glb`

**Atau gunakan converter online:**
- https://anyconv.com/blend-to-glb-converter/
- https://products.aspose.app/3d/conversion/blend-to-glb

### 2. Struktur Folder

Pastikan struktur folder seperti ini:
```
ARPekerjaan/
├── index.html
├── ar.html
├── style.css
├── script.js
├── README.md
└── Asset/
    ├── polisi.glb
    ├── dokter.glb
    ├── pemadam.glb
    └── guru.glb
```

## 🚀 Cara Menjalankan di HP

### Opsi 1: Menggunakan VS Code Live Server (RECOMMENDED)

1. **Install Live Server Extension di VS Code**
   - Buka Extensions (Ctrl+Shift+X)
   - Cari "Live Server"
   - Install extension dari Ritwick Dey

2. **Jalankan Server**
   - Klik kanan pada `index.html`
   - Pilih "Open with Live Server"
   - Server akan berjalan di `http://localhost:5500`

3. **Akses dari HP**
   - Pastikan HP dan PC terhubung ke WiFi yang sama
   - Cari IP address PC Anda:
     ```
     Windows: ipconfig (cari IPv4 Address)
     Contoh: 192.168.1.100
     ```
   - Di browser HP, buka: `http://192.168.1.100:5500`

### Opsi 2: Menggunakan Python HTTP Server

1. **Buka Terminal di folder project**

2. **Jalankan server:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Atau jika Python 2
   python -m SimpleHTTPServer 8000
   ```

3. **Akses dari HP:**
   - Cari IP PC: `ipconfig`
   - Buka di HP: `http://192.168.1.100:8000`

### Opsi 3: Menggunakan Node.js http-server

1. **Install http-server (sekali saja):**
   ```bash
   npm install -g http-server
   ```

2. **Jalankan server:**
   ```bash
   http-server -p 8080
   ```

3. **Akses dari HP:**
   - Buka: `http://[IP-PC-Anda]:8080`

### Opsi 4: Deploy Online (Gratis)

**Menggunakan GitHub Pages:**
1. Upload project ke GitHub repository
2. Settings → Pages → Source: main branch
3. Akses via: `https://username.github.io/repo-name`

**Menggunakan Vercel/Netlify:**
1. Daftar gratis di https://vercel.com atau https://netlify.com
2. Import project dari GitHub atau upload langsung
3. Deploy dan dapatkan URL publik

## ⚠️ Catatan Penting

### HTTPS Required!
- WebAR memerlukan **HTTPS** atau **localhost** untuk akses kamera
- Live Server otomatis support localhost
- Untuk akses dari HP, gunakan Live Server atau deploy online
- Jika menggunakan IP local (http://192.168.x.x), beberapa browser mungkin block kamera

### Izin Kamera
- Saat pertama kali dibuka, browser akan meminta izin akses kamera
- Pastikan **Allow/Izinkan** akses kamera
- Jika ditolak, refresh halaman dan izinkan kembali

### Browser Support
- ✅ Chrome/Edge (Android & Desktop)
- ✅ Safari (iOS 11+)
- ⚠️ Firefox (terbatas)
- ❌ Browser bawaan lama (update browser)

## 🎮 Cara Menggunakan

1. **Buka aplikasi** di browser HP
2. **Pilih profesi** dari halaman utama
3. **Izinkan akses kamera** saat diminta
4. **Arahkan kamera** ke permukaan datar (meja, lantai, dinding)
5. **Model 3D akan muncul** di layar AR
6. **Baca informasi** profesi di bagian bawah layar
7. **Klik "Kembali"** untuk memilih profesi lain

## 🔧 Troubleshooting

### Model tidak muncul
- Pastikan file `.glb` sudah tersedia di folder `Asset/`
- Cek Console browser (F12) untuk error
- Pastikan koneksi internet stabil (untuk load library)

### Kamera tidak berfungsi
- Pastikan menggunakan HTTPS atau localhost
- Izinkan akses kamera di browser settings
- Restart browser dan coba lagi

### Loading lama
- Periksa ukuran file model (idealnya < 5MB per model)
- Optimasi model 3D jika terlalu besar
- Gunakan koneksi internet yang stabil

## 📝 Kustomisasi

### Mengubah Warna UI
Edit variabel di `style.css`:
```css
:root {
    --primary-color: #2196F3;  /* Warna utama */
    --primary-dark: #1976D2;   /* Warna gelap */
}
```

### Menambah Profesi Baru
1. Tambah card di `index.html`
2. Tambah data di `script.js` (object `jobData`)
3. Siapkan file model `.glb`

### Mengatur Ukuran Model
Edit di `script.js` bagian konfigurasi model:
```javascript
model.scale.set(1, 1, 1); // Ubah angka untuk resize
```

## 📚 Teknologi yang Digunakan

- **MindAR.js**: Library WebAR markerless
- **Three.js**: Rendering 3D graphics
- **Vanilla JavaScript**: Logika aplikasi
- **CSS3**: Styling modern dan responsive

## 📄 License

Free to use for educational purposes.

## 👨‍💻 Dibuat untuk Pembelajaran

Aplikasi ini dibuat dengan komentar lengkap untuk membantu pemula memahami:
- Cara kerja WebAR
- Integrasi MindAR dan Three.js
- Struktur project WebAR yang proper
- Best practices web development

---

**Selamat mencoba! 🚀**

Jika ada pertanyaan atau masalah, jangan ragu untuk bertanya.
