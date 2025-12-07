/**
 * ================================================
 * SCRIPT AR - WebAR Pengenalan Profesi
 * Menggunakan MindAR.js (markerless) dan Three.js
 * ================================================
 */

// ============================================
// 1. KONFIGURASI DAN DATA PROFESI
// ============================================

/**
 * Data mapping profesi dengan informasi lengkap
 * Key: parameter URL (police, doctor, firefighter, teacher)
 * Value: objek berisi nama, deskripsi, dan path model 3D
 */
const jobData = {
    police: {
        title: "Polisi",
        description: "Polisi adalah penegak hukum yang bertugas menjaga keamanan dan ketertiban masyarakat. Mereka melindungi warga negara, mencegah kejahatan, dan membantu dalam situasi darurat.",
        modelPath: "Asset/polisi.glb"
    },
    doctor: {
        title: "Dokter",
        description: "Dokter adalah tenaga medis profesional yang mendiagnosis dan mengobati penyakit. Mereka merawat pasien, memberikan pengobatan, dan membantu masyarakat hidup lebih sehat.",
        modelPath: "Asset/dokter.glb"
    },
    firefighter: {
        title: "Pemadam Kebakaran",
        description: "Pemadam kebakaran adalah pahlawan yang memadamkan api dan menyelamatkan nyawa. Mereka bekerja dalam kondisi berbahaya untuk melindungi properti dan keselamatan masyarakat.",
        modelPath: "Asset/pemadam.glb"
    },
    teacher: {
        title: "Guru",
        description: "Guru adalah pendidik yang mengajarkan ilmu pengetahuan dan membentuk karakter generasi muda. Mereka adalah fondasi pendidikan dan masa depan bangsa.",
        modelPath: "Asset/guru.glb"
    }
};

// ============================================
// 2. UTILITY FUNCTIONS
// ============================================

/**
 * Mengambil parameter dari URL
 * Contoh: ar.html?job=police akan return { job: 'police' }
 */
function getURLParameters() {
    const params = new URLSearchParams(window.location.search);
    return {
        job: params.get('job') || 'police' // default ke police jika tidak ada
    };
}

/**
 * Fungsi untuk kembali ke halaman utama
 */
function goBack() {
    window.location.href = 'index.html';
}

/**
 * Update UI dengan informasi profesi
 */
function updateJobInfo(jobKey) {
    const job = jobData[jobKey];
    
    if (job) {
        document.getElementById('job-title').textContent = job.title;
        document.getElementById('job-description').textContent = job.description;
    } else {
        // Jika profesi tidak ditemukan, redirect ke home
        console.error('Profesi tidak ditemukan:', jobKey);
        setTimeout(() => goBack(), 2000);
    }
}

/**
 * Sembunyikan loading screen
 */
function hideLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}

/**
 * Tampilkan status AR
 */
function showARStatus() {
    const arStatus = document.getElementById('ar-status');
    if (arStatus) {
        arStatus.classList.remove('hidden');
        // Auto hide setelah 5 detik
        setTimeout(() => {
            arStatus.classList.add('hidden');
        }, 5000);
    }
}

// ============================================
// 3. INISIALISASI AR
// ============================================

/**
 * Check apakah browser support WebAR
 */
function checkBrowserSupport() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Browser Anda tidak mendukung akses kamera. Gunakan browser modern seperti Chrome atau Safari.');
        return false;
    }
    return true;
}

/**
 * Tampilkan error ke user
 */
function showError(title, message) {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.innerHTML = `
            <div class="spinner" style="border-top-color: #ff4444;"></div>
            <p style="color: #ff4444; font-weight: bold;">❌ ${title}</p>
            <p style="padding: 0 30px;">${message}</p>
            <button onclick="location.reload()" style="
                margin-top: 20px;
                padding: 12px 30px;
                background: white;
                color: #2196F3;
                border: none;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
            ">Coba Lagi</button>
            <button onclick="goBack()" style="
                margin-top: 10px;
                padding: 12px 30px;
                background: transparent;
                color: white;
                border: 2px solid white;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
            ">Kembali</button>
        `;
    }
}

/**
 * Fungsi utama untuk menginisialisasi AR experience
 */
async function initAR() {
    // Check browser support
    if (!checkBrowserSupport()) {
        return;
    }

    // Ambil parameter URL
    const params = getURLParameters();
    const selectedJob = params.job;
    
    // Update UI dengan info profesi
    updateJobInfo(selectedJob);
    
    // Ambil data profesi
    const job = jobData[selectedJob];
    if (!job) {
        console.error('Data profesi tidak valid');
        showError('Data Tidak Valid', 'Profesi yang dipilih tidak ditemukan.');
        return;
    }

    console.log('Memulai AR untuk:', job.title);

    try {
        // ============================================
        // Setup MindAR dengan konfigurasi yang lebih baik
        // ============================================
        
        console.log('Inisialisasi MindAR...');
        
        /**
         * Buat instance MindARThree
         * PENTING: Kita tidak pakai imageTargetSrc untuk mode markerless
         */
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.querySelector("#ar-container"),
            uiScanning: "no",  // Matikan UI default MindAR
            uiLoading: "no",   // Matikan UI default MindAR
            filterMinCF: 0.0001,
            filterBeta: 0.001,
        });

        const { renderer, scene, camera } = mindarThree;

        // ============================================
        // Setup Lighting (Pencahayaan)
        // ============================================
        
        // Ambient light - cahaya lembut dari segala arah
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        // Directional light - cahaya terarah seperti matahari
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // ============================================
        // Load Model 3D
        // ============================================
        
        /**
         * GLTF Loader untuk memuat model .glb
         */
        const loader = new THREE.GLTFLoader();
        
        // Anchor - tempat untuk menempatkan objek 3D di AR
        const anchor = mindarThree.addAnchor(0);
        
        // Load model 3D berdasarkan profesi yang dipilih
        loader.load(
            job.modelPath,
            (gltf) => {
                console.log('Model berhasil dimuat:', job.modelPath);
                
                const model = gltf.scene;
                
                // ============================================
                // Konfigurasi Model
                // ============================================
                
                // Set ukuran model (sesuaikan jika terlalu besar/kecil)
                model.scale.set(1, 1, 1);
                
                // Posisi model (x, y, z)
                model.position.set(0, 0, 0);
                
                // Rotasi awal (dalam radian)
                model.rotation.set(0, 0, 0);
                
                // Tambahkan model ke anchor
                anchor.group.add(model);
                
                // ============================================
                // (Optional) Rotasi Otomatis
                // ============================================
                
                /**
                 * Animasi rotasi model secara otomatis
                 * Hapus komentar jika ingin model berputar
                 */
                // const clock = new THREE.Clock();
                // renderer.setAnimationLoop(() => {
                //     const delta = clock.getDelta();
                //     model.rotation.y += delta * 0.5; // Kecepatan rotasi
                // });

                console.log('Model siap ditampilkan');
            },
            // Progress callback
            (progress) => {
                const percent = (progress.loaded / progress.total * 100).toFixed(0);
                console.log(`Loading model: ${percent}%`);
            },
            // Error callback
            (error) => {
                console.error('Error loading model:', error);
                alert('Gagal memuat model 3D. Pastikan file ' + job.modelPath + ' tersedia.');
            }
        );

        // ============================================
        // Start AR
        // ============================================
        
        console.log('Starting MindAR...');
        await mindarThree.start();
        console.log('✅ AR berhasil dimulai');
        
        // Sembunyikan loading dan tampilkan instruksi
        hideLoading();
        showARStatus();

        // ============================================
        // Render Loop
        // ============================================
        
        /**
         * Loop render untuk update scene AR
         */
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });

        // ============================================
        // Event Listeners
        // ============================================
        
        /**
         * Cleanup saat user meninggalkan halaman
         */
        window.addEventListener('beforeunload', () => {
            mindarThree.stop();
            mindarThree.renderer.dispose();
        });

    } catch (error) {
        console.error('Error saat inisialisasi AR:', error);
        console.error('Error details:', error.message, error.stack);
        
        let errorMsg = 'Terjadi kesalahan saat memulai AR. ';
        
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            errorMsg = 'Akses kamera ditolak. Izinkan akses kamera di pengaturan browser Anda.';
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
            errorMsg = 'Kamera tidak ditemukan. Pastikan perangkat memiliki kamera.';
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
            errorMsg = 'Kamera sedang digunakan aplikasi lain. Tutup aplikasi lain yang menggunakan kamera.';
        } else if (error.message.includes('imageTargetSrc')) {
            errorMsg = 'Error konfigurasi AR. Mode markerless memerlukan target image.';
        }
        
        showError('Error AR', errorMsg);
    }
}

// ============================================
// 4. EVENT HANDLER GESTURE (OPTIONAL)
// ============================================

/**
 * Variabel untuk tracking gesture drag/swipe
 * Uncomment jika ingin implementasi rotasi manual
 */
/*
let startX = 0;
let currentRotation = 0;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (!window.currentModel) return;
    
    const deltaX = e.touches[0].clientX - startX;
    currentRotation += deltaX * 0.01;
    
    window.currentModel.rotation.y = currentRotation;
    startX = e.touches[0].clientX;
}, { passive: true });
*/

// ============================================
// 5. START APPLICATION
// ============================================

/**
 * Jalankan AR saat halaman selesai dimuat
 */
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, memulai inisialisasi AR...');
    initAR();
});
