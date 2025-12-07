# 📱 AR Inline - Panduan Penggunaan

## ✨ Fitur Baru: AR Langsung di Browser!

Sekarang aplikasi menggunakan **AR.js + A-Frame** yang berjalan **langsung di browser** tanpa perlu keluar ke aplikasi lain.

---

## 🎯 Cara Menggunakan

### 1. **Download Hiro Marker**
AR memerlukan marker (gambar khusus) untuk mendeteksi posisi model 3D.

**Download marker di sini:**
- Link: [https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png](https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png)
- Atau buka folder `marker/` di project ini

**Cara pakai marker:**
1. **Print** gambar marker di kertas (ukuran minimal 10x10 cm)
2. Atau **tampilkan di layar** komputer/tablet lain
3. Pastikan marker **tidak terlipat** atau rusak

### 2. **Jalankan Aplikasi**
1. Buka aplikasi di browser HP (Chrome/Safari)
2. Pilih profesi yang ingin dilihat
3. **Izinkan akses kamera** saat diminta
4. Arahkan kamera ke **Hiro Marker**

### 3. **Lihat Model 3D di AR**
- Saat marker terdeteksi, status akan berubah jadi **"✅ Marker terdeteksi!"**
- Model 3D profesi akan **muncul di atas marker**
- Model akan **berputar otomatis**
- Gerakkan HP untuk melihat dari berbagai sudut
- **Tidak perlu keluar browser!** Semua berjalan di dalam web

---

## 🖼️ Tentang Hiro Marker

Hiro Marker adalah pola khusus yang terlihat seperti ini:

```
┌─────────────────┐
│ ████████████    │
│ █          █    │
│ █  ██████  █    │
│ █  █    █  █    │
│ █  █    █  █    │
│ █  ██████  █    │
│ █          █    │
│ ████████████    │
└─────────────────┘
```

**Tips untuk marker:**
- Print dengan **kontras tinggi** (hitam putih jelas)
- Ukuran minimal **8x8 cm** untuk deteksi optimal
- Jangan ada bayangan atau pantulan cahaya di marker
- Marker harus **rata** (tidak bengkok)

---

## 🔄 Perbedaan dengan Versi Sebelumnya

### **AR.js (Inline) - BARU ✨**
- ✅ **AR langsung di browser** (tidak keluar app)
- ✅ **Stabil** di semua Android & iOS
- ✅ **Tracking smooth** dengan marker
- ⚠️ **Perlu marker** (harus print/tampilkan Hiro Marker)
- ⚠️ **Tidak markerless** (harus ada marker fisik)

### **Model Viewer (Scene Viewer)**
- ✅ **Markerless** (tidak perlu marker)
- ✅ **AR realistis** dengan Google ARCore
- ⚠️ **Keluar browser** ke Scene Viewer/Quick Look
- ⚠️ **Harus HTTPS** dan device support ARCore

---

## 🎮 Cara Kerja

1. **Kamera mendeteksi** pola Hiro Marker
2. **AR.js menghitung** posisi dan rotasi marker di 3D space
3. **Model 3D ditampilkan** di atas marker
4. **Tracking terus berjalan** selama marker terlihat kamera
5. Jika marker hilang, model **hilang sementara** sampai marker terdeteksi lagi

---

## ⚙️ Troubleshooting

### Model tidak muncul
- ✅ Pastikan marker **Hiro** (bukan marker lain)
- ✅ Marker harus **jelas** dan **tidak blur**
- ✅ Cukup **cahaya** di ruangan
- ✅ Jarak kamera ke marker **30-100 cm**
- ✅ File `.glb` sudah ada dan valid

### Tracking tidak stabil
- ✅ Pastikan marker **tidak bergerak**
- ✅ Hindari marker di permukaan **mengkilap**
- ✅ Cahaya harus **merata** (tidak terlalu gelap/terang)
- ✅ Ukuran marker minimal **10x10 cm**

### Kamera tidak muncul
- ✅ Izinkan akses kamera di browser
- ✅ Gunakan **HTTPS** atau **localhost**
- ✅ Restart browser dan coba lagi

---

## 📂 File Structure

```
ARPekerjaan/
├── index.html              # Halaman utama
├── ar-inline.html          # AR inline dengan marker (BARU)
├── ar.html                 # AR dengan Model Viewer (keluar browser)
├── marker/
│   └── hiro.png            # Hiro Marker untuk print
└── Asset/
    ├── polisi.glb
    ├── dokter.glb
    ├── pemadam.glb
    └── guru.glb
```

---

## 🔄 Switch antara Mode AR

Jika ingin kembali ke **Model Viewer** (markerless, keluar browser):

Edit `index.html` baris ini:
```javascript
// Untuk AR Inline (di browser, perlu marker)
window.location.href = `ar-inline.html?job=${jobName}`;

// Untuk Model Viewer (keluar browser, markerless)
// window.location.href = `ar.html?job=${jobName}`;
```

---

## 🎯 Rekomendasi

**Gunakan AR Inline (ar-inline.html) jika:**
- ✅ Ingin AR **langsung di browser**
- ✅ Tidak masalah **print/tampilkan marker**
- ✅ Prioritas **stabilitas** dan **kompatibilitas**

**Gunakan Model Viewer (ar.html) jika:**
- ✅ Ingin **markerless AR** (tanpa marker)
- ✅ Tidak masalah **keluar ke Scene Viewer**
- ✅ Device support **ARCore/ARKit**

---

## 📱 Browser Support

| Browser | AR Inline | Model Viewer |
|---------|-----------|--------------|
| Chrome Android | ✅ Yes | ✅ Yes (keluar) |
| Safari iOS | ✅ Yes | ✅ Yes (Quick Look) |
| Firefox Mobile | ✅ Yes | ⚠️ Limited |
| Edge Mobile | ✅ Yes | ✅ Yes |

---

**Selamat mencoba! 🚀**

Jika ada masalah, buka Console Browser (F12) untuk lihat error log.
