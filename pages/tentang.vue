<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 pt-32 pb-20">
      <div class="container mx-auto px-6 lg:px-8">
        
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tentang Kami</span>
          </div>
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            Akademi <span class="text-blue-600">Pengentasan Kemiskinan</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-4xl mx-auto">
            Platform pembelajaran digital untuk pengembangan kapasitas SDM dalam upaya mengentaskan kemiskinan di Indonesia
          </p>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto space-y-16">
          
          <!-- About Section -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-12 border border-white/50">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                  Program Kolaboratif <span class="text-blue-600">Pemerintah & Swasta</span>
                </h2>
                <p class="text-lg text-gray-700 leading-relaxed mb-8">
                  <strong>Akademi Pengentasan Kemiskinan</strong> adalah program kolaboratif pemerintah dengan sektor swasta dalam pengentasan kemiskinan. Program ini bertujuan untuk mengaktifkan potensi ekonomi lokal, meningkatkan kapasitas masyarakat miskin, serta mendorong kolaborasi antara pemerintah daerah dan sektor swasta.
                </p>
                
                <!-- Key Features -->
                <div class="grid grid-cols-2 gap-6">
                  <div class="feature-item">
                    <div class="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                      </svg>
                    </div>
                    <h4 class="font-bold text-gray-800 mb-2">Platform Digital</h4>
                    <p class="text-gray-600 text-sm">Learning management system modern</p>
                  </div>
                  
                  <div class="feature-item">
                    <div class="bg-gradient-to-br from-green-500 to-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857"/>
                      </svg>
                    </div>
                    <h4 class="font-bold text-gray-800 mb-2">Kolaborasi</h4>
                    <p class="text-gray-600 text-sm">Lintas sektor dan institusi</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 border border-blue-200">
                <div class="text-center">
                  <div class="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-800 mb-4">Misi Kami</h3>
                  <p class="text-gray-700 leading-relaxed">
                    Menciptakan model inovatif pengentasan kemiskinan berbasis akademi dengan fokus pada hasil nyata dan berkelanjutan
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Poverty Statistics Section -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-12 border border-white/50">
            <div class="text-center mb-12">
              <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Kondisi <span class="text-red-600">Kemiskinan</span> di Indonesia
              </h2>
              <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                Memahami kondisi terkini kemiskinan di Indonesia untuk merancang strategi pengentasan yang efektif dan berkelanjutan
              </p>
            </div>

            <!-- Key Statistics -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div class="stat-card bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div class="text-3xl lg:text-4xl font-bold mb-2">24,06</div>
                <div class="text-lg font-medium mb-1">Juta</div>
                <div class="text-sm opacity-90">Penduduk Miskin</div>
              </div>
              
              <div class="stat-card bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div class="text-3xl lg:text-4xl font-bold mb-2">8,57%</div>
                <div class="text-lg font-medium mb-1">Nasional</div>
                <div class="text-sm opacity-90">Tingkat Kemiskinan</div>
              </div>
              
              <div class="stat-card bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div class="text-3xl lg:text-4xl font-bold mb-2">11,34%</div>
                <div class="text-lg font-medium mb-1">Desa</div>
                <div class="text-sm opacity-90">Kemiskinan Desa</div>
              </div>
              
              <div class="stat-card bg-gradient-to-br from-green-500 to-yellow-500 text-white rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div class="text-3xl lg:text-4xl font-bold mb-2">6,66%</div>
                <div class="text-lg font-medium mb-1">Kota</div>
                <div class="text-sm opacity-90">Kemiskinan Kota</div>
              </div>
            </div>

            <!-- Facts Section -->
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                Fakta Kunci Kemiskinan Indonesia
              </h3>
              <div class="space-y-6">
                <div class="bg-white/60 rounded-xl p-6 border border-white/50">
                  <h4 class="font-bold text-gray-800 mb-3">Data Terbaru (BPS September 2024)</h4>
                  <p class="text-gray-700 leading-relaxed">
                    Jumlah penduduk miskin mencapai <strong>24,06 juta orang</strong> atau <strong>8,57%</strong> dari total populasi. Garis kemiskinan nasional adalah <strong>Rp 595.242/kapita/bulan</strong>, dengan rata-rata rumah tangga miskin memiliki <strong>4,71 anggota</strong>.
                  </p>
                </div>
                
                <div class="bg-white/60 rounded-xl p-6 border border-white/50">
                  <h4 class="font-bold text-gray-800 mb-3">Profil Penduduk Miskin</h4>
                  <p class="text-gray-700 leading-relaxed">
                    Mayoritas rumah tangga miskin bekerja di <strong>sektor pertanian informal</strong> dan memiliki pendidikan rendah (<strong>64,15%</strong> hanya tamat SD atau tidak tamat SD).
                  </p>
                </div>
                
                <div class="bg-white/60 rounded-xl p-6 border border-white/50">
                  <h4 class="font-bold text-gray-800 mb-3">Tantangan Struktural</h4>
                  <p class="text-gray-700 leading-relaxed">
                    Meskipun angka ini merupakan yang <strong>terendah sejak 1960</strong>, tantangan struktural seperti ketimpangan wilayah, akses pendidikan, dan minimnya keterlibatan sektor swasta masih menghambat percepatan pengentasan kemiskinan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Latest Update Section -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-12 border border-white/50">
            <div class="text-center mb-12">
              <div class="inline-flex items-center space-x-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Update Terbaru</span>
              </div>
              <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Data Kemiskinan <span class="text-green-600">Maret 2025</span>
              </h2>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div class="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-8 border border-green-200 mb-8">
                  <div class="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div class="text-3xl font-bold text-green-600 mb-2">8,47%</div>
                      <div class="text-gray-700 font-medium">Tingkat Kemiskinan</div>
                      <div class="text-sm text-gray-600">Maret 2025</div>
                    </div>
                    <div>
                      <div class="text-3xl font-bold text-green-600 mb-2">23,85</div>
                      <div class="text-gray-700 font-medium">Juta Penduduk</div>
                      <div class="text-sm text-gray-600">Miskin</div>
                    </div>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div class="flex items-start space-x-3">
                    <div class="bg-blue-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <p class="text-gray-700">
                      <strong>Target Ambisius:</strong> Pemerintah menargetkan tingkat kemiskinan ekstrem mencapai <strong>nol persen</strong> di tahun 2028
                    </p>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="bg-purple-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <p class="text-gray-700">
                      <strong>Program Sekolah Rakyat:</strong> Pendidikan berasrama gratis untuk memutus rantai kemiskinan antar generasi
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="space-y-6">
                <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                  <h4 class="font-bold text-gray-800 mb-3 flex items-center">
                    <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Peran SDM Berkualitas
                  </h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    "Keberhasilan implementasi Program Prioritas Sekolah Rakyat ditentukan oleh kesiapan SDM pengelola yang adaptif, kreatif, inovatif serta memiliki jiwa melayani."
                  </p>
                  <div class="text-xs text-blue-600 mt-2 font-medium">- Muhammad Taufiq, Kepala LAN</div>
                </div>
                
                <div class="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                  <h4 class="font-bold text-gray-800 mb-3 flex items-center">
                    <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Pendekatan Berbasis Data
                  </h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    "SDM yang terlibat harus mampu beradaptasi dengan dinamika lapangan dan bekerja berdasarkan data aktual agar upaya pengentasan kemiskinan tepat sasaran."
                  </p>
                  <div class="text-xs text-green-600 mt-2 font-medium">- Saifullah Yusuf, Menteri Sosial</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Goals and Indicators -->
          <div class="grid lg:grid-cols-2 gap-8">
            <!-- Tujuan Program -->
            <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
              <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Tujuan Program
              </h2>
              <div class="space-y-4">
                <div class="goal-item flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors duration-300">
                  <div class="bg-blue-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Mengaktifkan potensi ekonomi lokal (misalnya BUMDes dan unit usaha masyarakat)</p>
                </div>
                <div class="goal-item flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors duration-300">
                  <div class="bg-green-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Meningkatkan kapasitas masyarakat miskin melalui pelatihan dan pendampingan</p>
                </div>
                <div class="goal-item flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors duration-300">
                  <div class="bg-purple-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Mendorong kolaborasi antara pemerintah daerah dan sektor swasta</p>
                </div>
                <div class="goal-item flex items-start space-x-4 p-4 bg-orange-50 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors duration-300">
                  <div class="bg-orange-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Menciptakan model inovatif pengentasan kemiskinan berbasis akademi</p>
                </div>
              </div>
            </div>

            <!-- Indikator Keberhasilan -->
            <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
              <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg class="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                Indikator Keberhasilan
              </h2>
              <div class="space-y-4">
                <div class="indicator-item flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors duration-300">
                  <div class="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</div>
                  <p class="text-gray-700">Jumlah peserta pelatihan yang berhasil memulai usaha</p>
                </div>
                <div class="indicator-item flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors duration-300">
                  <div class="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</div>
                  <p class="text-gray-700">Jumlah BUMDes aktif dan produktif</p>
                </div>
                <div class="indicator-item flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors duration-300">
                  <div class="bg-purple-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</div>
                  <p class="text-gray-700">Peningkatan pendapatan rumah tangga miskin</p>
                </div>
                <div class="indicator-item flex items-start space-x-4 p-4 bg-orange-50 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors duration-300">
                  <div class="bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</div>
                  <p class="text-gray-700">Jumlah kolaborasi aktif antara masyarakat dan sektor swasta</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Collaboration Section -->
          <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl shadow-xl p-8 lg:p-12 text-white">
            <div class="text-center">
              <h2 class="text-3xl lg:text-4xl font-bold mb-6">
                Kolaborasi Strategis untuk Masa Depan
              </h2>
              <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                LAN menekankan pentingnya berkolaborasi antar instansi dengan melibatkan korporasi agar pengentasan kemiskinan tidak lagi dilakukan secara sektoral
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div class="text-center">
                  <div class="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m-2 0h2m0 0h4"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold mb-2">Pemerintah</h3>
                  <p class="text-blue-100">Kebijakan dan regulasi</p>
                </div>
                
                <div class="text-center">
                  <div class="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold mb-2">Sektor Swasta</h3>
                  <p class="text-blue-100">Inovasi dan investasi</p>
                </div>
                
                <div class="text-center">
                  <div class="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold mb-2">Masyarakat</h3>
                  <p class="text-blue-100">Partisipasi aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Set page title
useHead({
  title: 'Tentang Kami - Akademi Pengentasan Kemiskinan',
  meta: [
    { name: 'description', content: 'Platform pembelajaran digital untuk pengembangan kapasitas SDM dalam upaya mengentaskan kemiskinan di Indonesia' }
  ]
})

// Animation on scroll (optional)
const isVisible = ref(false)

onMounted(() => {
  // Add scroll animations or other mount logic here
  isVisible.value = true
})
</script>

<style scoped>
/* Enhanced animations */
.feature-item {
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

.goal-item {
  animation: slideInLeft 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

.indicator-item {
  animation: slideInRight 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

.stat-card {
  animation: scaleIn 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Glass morphism effects */
.bg-white\/80 {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.8);
}

/* Smooth transitions */
* {
  transition-property: transform, opacity, background-color, border-color, box-shadow;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

/* Responsive optimizations */
@media (max-width: 768px) {
  .feature-item,
  .goal-item,
  .indicator-item,
  .stat-card {
    animation-delay: 0s !important;
  }
}
</style>