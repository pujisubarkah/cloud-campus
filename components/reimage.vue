<template>
  <div class="hero-section relative min-h-screen overflow-hidden">
    <!-- Dynamic Background Slideshow -->
    <div class="absolute inset-0 z-0">
      <div 
        v-for="(bg, index) in backgroundImages" 
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="currentBgIndex === index ? 'opacity-100' : 'opacity-0'"
      >
        <img 
          :src="bg.url" 
          :alt="bg.alt"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-purple-900/80"></div>
      </div>
    </div>

    <!-- Floating particles animation -->
    <div class="absolute inset-0 z-10">
      <div 
        v-for="n in 20" 
        :key="n"
        class="particle absolute w-2 h-2 bg-white/30 rounded-full"
        :style="getParticleStyle(n)"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-20 min-h-screen flex items-center">
      <div class="container mx-auto px-6 lg:px-8 py-20">
        
        <!-- Hero Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
            <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Platform Pembelajaran Digital Terdepan</span>
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span class="block">Akademi</span>
            <span class="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Pengentasan Kemiskinan
            </span>
          </h1>
          
          <p class="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            Membangun masa depan yang lebih baik melalui pendidikan berkualitas, 
            inovasi berkelanjutan, dan pemberdayaan masyarakat untuk mengentaskan kemiskinan
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <NuxtLink to="/login" class="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300">
              <span class="flex items-center space-x-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Mulai Belajar</span>
              </span>
            </NuxtLink>
            <NuxtLink to="/tentang" class="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
              <span class="flex items-center space-x-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Jelajahi Program</span>
              </span>
            </NuxtLink>
          </div>
        </div>

        <!-- Content Carousel -->
        <div class="max-w-6xl mx-auto">
          <div class="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            
            <!-- Carousel Container -->
            <div class="relative h-96 lg:h-[28rem]">
              
              <!-- Slide 1: Main Description -->
              <div 
                class="absolute inset-0 transition-all duration-700 ease-in-out"
                :class="currentSlide === 0 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
              >
                <div class="p-8 lg:p-12 h-full flex flex-col justify-center">
                  <div class="text-center">
                    <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-8 mx-auto shadow-xl">
                      <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                      </svg>
                    </div>
                    <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6">
                      Learning Management System Modern
                    </h3>
                    <p class="text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
                      Platform pembelajaran digital yang dirancang khusus untuk mendukung pengembangan kapasitas di bidang pengentasan kemiskinan. Menawarkan pengalaman belajar interaktif dengan materi berkualitas tinggi dan komunitas pembelajar yang aktif.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Slide 2: Features -->
              <div 
                class="absolute inset-0 transition-all duration-700 ease-in-out"
                :class="currentSlide === 1 ? 'translate-x-0 opacity-100' : currentSlide === 0 ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'"
              >
                <div class="p-8 lg:p-12 h-full">
                  <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-6 mx-auto shadow-xl">
                      <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-3xl lg:text-4xl font-bold text-white mb-8">Fitur Unggulan</h3>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="feature-card group">
                      <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
                        <div class="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                          </svg>
                        </div>
                        <h4 class="font-bold text-lg text-white mb-2">Katalog Kursus Digital</h4>
                        <p class="text-white/80 text-sm">Materi berbasis data dan studi kasus nyata</p>
                      </div>
                    </div>
                    
                    <div class="feature-card group">
                      <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
                        <div class="bg-gradient-to-br from-blue-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857"/>
                          </svg>
                        </div>
                        <h4 class="font-bold text-lg text-white mb-2">Kolaborasi Lintas Sektor</h4>
                        <p class="text-white/80 text-sm">Pemerintah, swasta, dan komunitas</p>
                      </div>
                    </div>
                    
                    <div class="feature-card group">
                      <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
                        <div class="bg-gradient-to-br from-green-400 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <h4 class="font-bold text-lg text-white mb-2">Sertifikat Digital</h4>
                        <p class="text-white/80 text-sm">Dashboard progres belajar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Slide 3: Approach -->
              <div 
                class="absolute inset-0 transition-all duration-700 ease-in-out"
                :class="currentSlide === 2 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'"
              >
                <div class="p-8 lg:p-12 h-full">
                  <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mb-6 mx-auto shadow-xl">
                      <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857"/>
                      </svg>
                    </div>
                    <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6">Pendekatan Praktis</h3>
                    <p class="text-lg lg:text-xl text-white/90 leading-relaxed mb-8">
                      Fokus pada solusi berkelanjutan dengan pendekatan yang praktis dan aplikatif
                    </p>
                  </div>
                  
                  <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                      <div class="bg-gradient-to-br from-yellow-400 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <strong class="text-white text-sm">Workshop Online</strong>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                      <div class="bg-gradient-to-br from-blue-400 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                      </div>
                      <strong class="text-white text-sm">Forum Diskusi</strong>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                      <div class="bg-gradient-to-br from-green-400 to-teal-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                      </div>
                      <strong class="text-white text-sm">Simulasi Praktis</strong>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                      <div class="bg-gradient-to-br from-red-400 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                      <strong class="text-white text-sm">Mentoring Ahli</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Dots -->
            <div class="flex justify-center gap-4 p-6 bg-white/5 backdrop-blur-sm">
              <button
                v-for="(slide, index) in slides"
                :key="index"
                @click="currentSlide = index"
                class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
                :class="currentSlide === index ? 'bg-white scale-125 shadow-lg' : 'bg-white/40 hover:bg-white/60'"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const currentBgIndex = ref(0)

// Background images terkait kemiskinan
const backgroundImages = ref([
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Pendidikan untuk semua'
  },
  {
    url: 'https://images.unsplash.com/photo-1594213804906-8e650c803db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    alt: 'Pemberdayaan masyarakat'
  },
  {
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
    alt: 'Bantuan sosial'
  },
  {
    url: 'https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Kerjasama komunitas'
  },
  {
    url: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    alt: 'Teknologi untuk kebaikan'
  }
])

const slides = ref([
  { title: 'Learning Management System' },
  { title: 'Fitur Unggulan' },
  { title: 'Pendekatan Praktis' }
])

let slideInterval = null
let backgroundInterval = null

// Particle animation
const getParticleStyle = (index) => {
  const top = Math.random() * 100
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const duration = 3 + Math.random() * 4
  
  return {
    top: `${top}%`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

// Auto slide functionality
const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }, 5000)
}

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

// Background slideshow functionality
const startBackgroundSlideshow = () => {
  backgroundInterval = setInterval(() => {
    currentBgIndex.value = (currentBgIndex.value + 1) % backgroundImages.value.length
  }, 5000) // Change background every 5 seconds
}

const stopBackgroundSlideshow = () => {
  if (backgroundInterval) {
    clearInterval(backgroundInterval)
    backgroundInterval = null
  }
}

// Start auto slide and background slideshow on mount
onMounted(() => {
  startAutoSlide()
  startBackgroundSlideshow()
})

// Stop intervals on unmount
onUnmounted(() => {
  stopAutoSlide()
  stopBackgroundSlideshow()
})
</script>

<style scoped>
/* Particle animation */
.particle {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

/* Enhanced animations */
.feature-card {
  animation: fadeInUp 0.6s ease-out forwards;
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

/* Glass morphism enhancements */
.hero-section {
  backdrop-filter: blur(10px);
}

/* Smooth transitions */
* {
  transition-property: transform, opacity, background-color, border-color, box-shadow;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.hover\:scale-125:hover {
  transform: scale(1.25);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .particle {
    display: none;
  }
}
</style>
