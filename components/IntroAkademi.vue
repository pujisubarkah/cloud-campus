<template>
  <div class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 md:p-12 text-white mb-8 font-poppins overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full -translate-x-16 -translate-y-16"></div>
      <div class="absolute top-20 right-0 w-24 h-24 bg-yellow-300 rounded-full translate-x-12 -translate-y-8"></div>
      <div class="absolute bottom-0 left-1/4 w-40 h-40 bg-yellow-500 rounded-full translate-y-20"></div>
      <div class="absolute bottom-10 right-10 w-16 h-16 bg-yellow-400 rounded-full"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="bg-yellow-400 p-3 rounded-full">
            <svg class="w-8 h-8 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 class="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Kondisi Kemiskinan di Indonesia
          </h2>
        </div>
        <p class="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Memahami kondisi terkini kemiskinan di Indonesia untuk merancang strategi pengentasan yang efektif dan berkelanjutan.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
          <div class="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">24,06 Juta</div>
          <div class="text-sm text-blue-100">Penduduk Miskin</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
          <div class="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">8,57%</div>
          <div class="text-sm text-blue-100">Tingkat Kemiskinan</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
          <div class="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">11,34%</div>
          <div class="text-sm text-blue-100">Kemiskinan Desa</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
          <div class="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">6,66%</div>
          <div class="text-sm text-blue-100">Kemiskinan Kota</div>
        </div>
      </div>

      <!-- Key Facts -->
      <div class="space-y-4">
        <h3 class="text-xl md:text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Fakta Kunci
        </h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="bg-white/5 rounded-xl p-4 border-l-4 border-yellow-400">
            <div class="flex items-start gap-3">
              <div class="bg-yellow-400 p-2 rounded-lg mt-1">
                <svg class="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-blue-100 text-sm leading-relaxed">
                  <span class="font-bold text-yellow-300">Berdasarkan data BPS September 2024:</span> Jumlah penduduk miskin mencapai <span class="font-bold text-white">24,06 juta orang</span> atau <span class="font-bold text-white">8,57%</span> dari total populasi.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white/5 rounded-xl p-4 border-l-4 border-yellow-400">
            <div class="flex items-start gap-3">
              <div class="bg-yellow-400 p-2 rounded-lg mt-1">
                <svg class="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p class="text-blue-100 text-sm leading-relaxed">
                  Garis kemiskinan nasional adalah <span class="font-bold text-white">Rp 595.242/kapita/bulan</span>, dengan rata-rata rumah tangga miskin memiliki <span class="font-bold text-white">4,71 anggota</span>.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white/5 rounded-xl p-4 border-l-4 border-yellow-400">
            <div class="flex items-start gap-3">
              <div class="bg-yellow-400 p-2 rounded-lg mt-1">
                <svg class="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                </svg>
              </div>
              <div>
                <p class="text-blue-100 text-sm leading-relaxed">
                  Mayoritas rumah tangga miskin bekerja di sektor <span class="font-bold text-white">pertanian informal</span> dan memiliki pendidikan rendah (<span class="font-bold text-white">64,15%</span> hanya tamat SD atau tidak tamat SD).
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white/5 rounded-xl p-4 border-l-4 border-yellow-400">
            <div class="flex items-start gap-3">
              <div class="bg-yellow-400 p-2 rounded-lg mt-1">
                <svg class="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p class="text-blue-100 text-sm leading-relaxed">
                  Meskipun angka ini merupakan yang <span class="font-bold text-white">terendah sejak 1960</span>, tantangan struktural seperti <span class="font-bold text-white">ketimpangan wilayah</span>, <span class="font-bold text-white">akses pendidikan</span>, dan <span class="font-bold text-white">minimnya keterlibatan sektor swasta</span> masih menghambat percepatan pengentasan kemiskinan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-8 pt-6 border-t border-white/20">
        <p class="text-blue-100 mb-4">Mari bergabung dalam upaya pengentasan kemiskinan melalui pendidikan dan pembelajaran yang berkualitas</p>
        <NuxtLink to="/login" class="inline-flex items-center gap-2 bg-yellow-400 text-blue-800 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Mulai Belajar Sekarang
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
