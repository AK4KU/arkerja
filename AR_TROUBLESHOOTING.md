# 🔧 AR Troubleshooting Guide

## ✅ Cara Mengaktifkan AR di Chrome Android

### Persyaratan:
1. **Android 7.0+** (Nougat atau lebih baru)
2. **Chrome 79+** (update ke versi terbaru)
3. **Google Play Services for AR** (ARCore) terinstall
4. **Perangkat mendukung ARCore** - cek di: https://developers.google.com/ar/devices

### Langkah-langkah:

#### 1. Install ARCore (Google Play Services for AR)
```
- Buka Google Play Store
- Cari "Google Play Services for AR" atau "ARCore"
- Install/Update ke versi terbaru
```

#### 2. Aktifkan Chrome Flags (PENTING!)
```
1. Buka Chrome di HP
2. Ketik di address bar: chrome://flags
3. Cari dan aktifkan flag berikut:

   🔹 WebXR Incubations
      Status: Enabled
   
   🔹 WebXR AR Module  
      Status: Enabled
   
   🔹 WebXR Hit Test
      Status: Enabled

4. Klik "Relaunch" untuk restart Chrome
```

#### 3. Izinkan Permissions
```
- Settings → Apps → Chrome → Permissions
- Pastikan "Camera" dan "Location" diizinkan
```

#### 4. Gunakan HTTPS
```
- AR hanya bekerja di HTTPS atau localhost
- Jika pakai IP local (192.168.x.x), AR mungkin tidak jalan
- Solusi: Deploy ke hosting dengan HTTPS (Vercel, Netlify, GitHub Pages)
```

## 🧪 Testing AR Support

### Cek di Console Browser (F12):
Buka DevTools di Chrome Android dan lihat log:
```javascript
✅ AR Support: true
✅ AR Modes: scene-viewer, webxr
✅ Is Mobile: true
✅ Has WebXR: true
```

Jika semua `true`, AR seharusnya bekerja.

### Test dengan Model Viewer Demo:
Buka: https://modelviewer.dev/examples/augmentedreality.html
- Jika ini berfungsi, berarti perangkat Anda support AR
- Jika tidak, ada masalah di setup perangkat

## 🚨 Common Issues

### Issue 1: "AR tidak didukung di perangkat ini"
**Solusi:**
- Pastikan ARCore terinstall
- Update Chrome ke versi terbaru
- Aktifkan Chrome Flags (lihat di atas)
- Restart Chrome setelah enable flags

### Issue 2: Tombol AR tidak muncul
**Solusi:**
- Pastikan akses via HTTPS (bukan HTTP)
- Cek apakah file .glb valid dan ter-load
- Buka Console untuk lihat error

### Issue 3: AR terbuka tapi model tidak muncul
**Solusi:**
- File .glb mungkin corrupt atau terlalu besar
- Coba compress model (max 5-10MB)
- Pastikan model punya material/texture

### Issue 4: "Tidak bisa akses kamera"
**Solusi:**
- Beri izin kamera di Chrome settings
- Restart browser
- Cek apakah app lain menggunakan kamera

## 📱 Alternatif: AR via Scene Viewer (Android)

Jika WebXR tidak work, Chrome akan fallback ke Scene Viewer:
- Scene Viewer = aplikasi AR bawaan Android
- Otomatis dibuka saat klik tombol AR
- Lebih reliable daripada WebXR di beberapa device

## 🍎 iOS Support

### iOS 12+ dengan Safari:
- AR menggunakan AR Quick Look
- Tidak perlu setup khusus
- Auto-detect jika iOS support AR
- Model harus format .usdz atau .reality (tapi model-viewer auto convert dari .glb)

## 🔗 Resources

- ARCore Supported Devices: https://developers.google.com/ar/devices
- Model Viewer Docs: https://modelviewer.dev/
- WebXR Spec: https://immersiveweb.dev/

## 💡 Tips

1. **Deploy ke HTTPS** untuk hasil terbaik
2. **Kompres model .glb** agar loading cepat
3. **Test di beberapa device** untuk compatibility
4. **Gunakan lighting yang baik** saat AR untuk tracking optimal

---

**Masih bermasalah?** Buka Console Browser (chrome://inspect) dan screenshot error yang muncul.
