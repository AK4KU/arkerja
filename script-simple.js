/**
 * ================================================
 * SCRIPT AR SIMPLE - WebAR Pengenalan Profesi
 * Menggunakan Model Viewer (Google)
 * ================================================
 */

// Data profesi
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

// Fungsi kembali
function goBack() {
    window.location.href = 'index.html';
}

// Ambil parameter URL
function getURLParameters() {
    const params = new URLSearchParams(window.location.search);
    return {
        job: params.get('job') || 'police'
    };
}

// Hide loading
function hideLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}

// Show status
function showStatus() {
    const arStatus = document.getElementById('ar-status');
    if (arStatus) {
        arStatus.classList.remove('hidden');
        setTimeout(() => {
            arStatus.classList.add('hidden');
        }, 5000);
    }
}

// Initialize AR
window.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing AR...');
    
    // Get parameters
    const params = getURLParameters();
    const job = jobData[params.job];
    
    if (!job) {
        alert('Profesi tidak ditemukan!');
        goBack();
        return;
    }
    
    // Update UI
    document.getElementById('job-title').textContent = job.title;
    document.getElementById('job-description').textContent = job.description;
    
    // Get model viewer
    const modelViewer = document.getElementById('model-viewer');
    const arButton = document.getElementById('ar-button-slot');
    
    // Set model source
    console.log('Loading model:', job.modelPath);
    modelViewer.src = job.modelPath;
    
    // Force AR button to always show
    modelViewer.setAttribute('ar', '');
    modelViewer.setAttribute('ar-modes', 'scene-viewer webxr quick-look');
    
    // Event: Model loaded
    modelViewer.addEventListener('load', () => {
        console.log('✅ Model loaded successfully');
        
        // Auto-frame model untuk memastikan semua bagian terlihat
        modelViewer.resetTurntableRotation();
        modelViewer.jumpCameraToGoal();
        
        // Atur bounds model agar tidak terpotong
        const center = modelViewer.getCameraTarget();
        console.log('Model center:', center);
        
        // Frame model dengan baik
        setTimeout(() => {
            modelViewer.resetTurntableRotation();
            modelViewer.fieldOfView = '45deg';
        }, 100);
        
        hideLoading();
        showStatus();
        
        // Check AR support after model loads
        setTimeout(() => {
            const canAR = modelViewer.canActivateAR;
            console.log('AR Support:', canAR);
            console.log('AR Modes:', modelViewer.arModes);
            console.log('User Agent:', navigator.userAgent);
            
            if (arButton) {
                arButton.style.display = 'block';
                
                // Force show button even if canActivateAR is false initially
                // Chrome Android with ARCore will handle it
                arButton.textContent = '📱 Lihat dalam AR';
                arButton.disabled = false;
            }
        }, 500);
    });
    
    // Event: Model error
    modelViewer.addEventListener('error', (e) => {
        console.error('❌ Error loading model:', e);
        alert('Gagal memuat model 3D. Pastikan file ' + job.modelPath + ' tersedia dan format .glb valid.');
        hideLoading();
    });
    
    // Event: Progress loading
    modelViewer.addEventListener('progress', (e) => {
        const percent = (e.detail.totalProgress * 100).toFixed(0);
        console.log(`Loading: ${percent}%`);
    });
    
    // Event: AR Status
    modelViewer.addEventListener('ar-status', (e) => {
        console.log('AR Status:', e.detail.status);
    });
    
    // Manual check for AR support
    console.log('Checking AR capabilities...');
    console.log('Has WebXR:', 'xr' in navigator);
    console.log('Has getUserMedia:', !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
    console.log('Platform:', navigator.platform);
    console.log('Is Mobile:', /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
});
