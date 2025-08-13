<template>
  <div class="bg-gradient-to-r from-[#3399FF]/10 via-white to-[#FFD966]/10 rounded-2xl shadow-2xl p-10 md:p-16 relative overflow-hidden">
    <!-- Decorative shapes -->
    <div class="absolute top-0 left-0 w-32 h-32 bg-[#FFD966]/30 rounded-full blur-2xl z-0"></div>
    <div class="absolute bottom-0 right-0 w-40 h-40 bg-[#3399FF]/20 rounded-full blur-2xl z-0"></div>
    
    <!-- Text Section with Carousel -->
    <div class="flex flex-col gap-8 z-10 relative">
      <!-- Title with gradient text -->
      <div class="text-center">
        <h2 class="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#3399FF] to-[#FFD966] bg-clip-text text-transparent drop-shadow mb-4 tracking-tight">
          Akademi Pengentasan Kemiskinan
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Platform pembelajaran digital untuk pengembangan kapasitas pengentasan kemiskinan
        </p>
      </div>

      <!-- Carousel Container with blue outline -->
      <div class="relative h-80 md:h-96 overflow-hidden max-w-4xl mx-auto w-full border-4 border-[#3399FF] rounded-2xl shadow-lg">
        <!-- Slide 1: Main Description -->
        <div 
          class="absolute inset-0 transition-all duration-700 ease-in-out transform"
          :class="currentSlide === 0 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
        >
          <div class="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-[#FFD966]/30 h-full">
            <h3 class="text-3xl font-bold text-[#3399FF] mb-6 flex items-center justify-center gap-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
              </svg>
              Learning Management System Modern
            </h3>
            <p class="text-xl text-gray-800 leading-relaxed text-center">
              Platform pembelajaran digital yang dirancang khusus untuk mendukung pengembangan kapasitas di bidang pengentasan kemiskinan. Menawarkan pengalaman belajar interaktif dengan materi berkualitas tinggi dan komunitas pembelajar yang aktif.
            </p>
          </div>
        </div>

        <!-- Slide 2: Features -->
        <div 
          class="absolute inset-0 transition-all duration-700 ease-in-out transform"
          :class="currentSlide === 1 ? 'translate-x-0 opacity-100' : currentSlide === 0 ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'"
        >
          <div class="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-[#FFD966]/30 h-full">
            <h3 class="text-3xl font-bold text-[#3399FF] mb-6 flex items-center justify-center gap-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Fitur Unggulan
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center p-4 bg-[#3399FF]/10 rounded-xl">
                <div class="bg-[#FFD966] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-[#3399FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                  </svg>
                </div>
                <h4 class="font-bold text-lg mb-2">Katalog Kursus Digital</h4>
                <p class="text-gray-700">Materi berbasis data dan studi kasus nyata</p>
              </div>
              <div class="text-center p-4 bg-[#FFD966]/20 rounded-xl">
                <div class="bg-[#3399FF] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857"/>
                  </svg>
                </div>
                <h4 class="font-bold text-lg mb-2">Kolaborasi Lintas Sektor</h4>
                <p class="text-gray-700">Pemerintah, swasta, dan komunitas</p>
              </div>
              <div class="text-center p-4 bg-[#3399FF]/10 rounded-xl">
                <div class="bg-[#FFD966] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-[#3399FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 class="font-bold text-lg mb-2">Sertifikat Digital</h4>
                <p class="text-gray-700">Dashboard progres belajar</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 3: Approach -->
        <div 
          class="absolute inset-0 transition-all duration-700 ease-in-out transform"
          :class="currentSlide === 2 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'"
        >
          <div class="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-[#FFD966]/30 h-full">
            <h3 class="text-3xl font-bold text-[#3399FF] mb-6 flex items-center justify-center gap-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857"/>
              </svg>
              Pendekatan Praktis
            </h3>
            <p class="text-xl text-gray-800 leading-relaxed mb-8 text-center">
              Fokus pada solusi berkelanjutan dengan pendekatan yang praktis dan aplikatif
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-[#3399FF]/10 rounded-xl p-4 text-center">
                <div class="bg-[#FFD966] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-[#3399FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <strong class="text-sm">Workshop Online</strong>
              </div>
              <div class="bg-[#FFD966]/30 rounded-xl p-4 text-center">
                <div class="bg-[#3399FF] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <strong class="text-sm">Forum Diskusi</strong>
              </div>
              <div class="bg-[#3399FF]/10 rounded-xl p-4 text-center">
                <div class="bg-[#FFD966] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-[#3399FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <strong class="text-sm">Simulasi Praktis</strong>
              </div>
              <div class="bg-[#FFD966]/30 rounded-xl p-4 text-center">
                <div class="bg-[#3399FF] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <strong class="text-sm">Mentoring Ahli</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="flex justify-center gap-3 mt-6">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          @click="currentSlide = index"
          class="w-4 h-4 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'bg-[#3399FF] scale-110' : 'bg-gray-300 hover:bg-gray-400'"
        ></button>
      </div>

      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const slides = ref([
  { title: 'Learning Management System' },
  { title: 'Fitur Unggulan' },
  { title: 'Pendekatan Praktis' }
])

let slideInterval = null

// Auto slide functionality
const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }, 5000) // Change slide every 5 seconds
}

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

// Start auto slide on mount
onMounted(() => {
  startAutoSlide()
})

// Stop auto slide on unmount
onUnmounted(() => {
  stopAutoSlide()
})
</script>
