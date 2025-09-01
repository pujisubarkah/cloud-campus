<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ref, computed } from 'vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    quote: 'Keberhasilan dari implementasi Program Prioritas Sekolah Rakyat ini ditentukan oleh kesiapan sumber daya manusia (SDM) pengelola, mulai dari pimpinan instansi sampai kepada ASN yang menjalankan fungsi teknis di lapangan. Untuk itu dibutuhkan ASN yang adaptif, kreatif, inovatif serta memiliki jiwa melayani agar program prioritas presiden ini dapat berjalan secara optimal dan memberikan dampak bagi masyarakat.',
    sourceImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Dr_Muhammad_Taufiq_DEA.jpg/250px-Dr_Muhammad_Taufiq_DEA.jpg',
    source: 'Dr. Muhammad Taufiq, DEA',
    title: 'Kepala LANRI',
    rating: 5
  },
  {
    id: 2,
    quote: 'Sumber daya manusia (SDM) yang terlibat dalam pengentasan kemiskinan harus mampu beradaptasi dengan dinamika di lapangan dan bekerja berdasarkan data aktual sehingga upaya pemerintah untuk mengentaskan kemiskinan tepat sasaran. Intinya program ini akan berfokus pada pengembangan kapasitas dan kompetensi SDM terutama yang terlibat dalam program pengentasan kemiskinan dan sekolah rakyat.',
    sourceImg: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Wali_Kota_Pasuruan_Saifullah_Yusuf.png',
    source: 'Drs. H. Saifullah Yusuf',
    title: 'Menteri Sosial',
    rating: 5
  },
]

// Computed untuk menentukan apakah perlu slider
const needSlider = computed(() => testimonials.length > 4)
const gridCols = computed(() => {
  const count = Math.min(testimonials.length, 4)
  return `grid-cols-1 md:grid-cols-${count >= 2 ? '2' : '1'} lg:grid-cols-${count >= 3 ? '3' : count} xl:grid-cols-${count}`
})

// Swiper modules
const modules = [Navigation, Pagination, Autoplay]
</script>

<template>
  <section aria-labelledby="testimonials-unit-title" class="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-300 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 lg:px-8 relative z-10">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>Testimoni</span>
        </div>
        <h2 id="testimonials-unit-title" class="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
          Apa Kata Mereka Tentang
          <br class="hidden md:block">
          <span class="text-blue-600">Akademi Pengentasan Kemiskinan</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Dengarkan pengalaman dan testimoni dari para pemimpin dan praktisi yang telah mengikuti program pengembangan kapasitas kami
        </p>
      </div>

      <!-- Testimonials Content -->
      <div class="max-w-7xl mx-auto">
        <!-- Grid Layout untuk ≤4 testimoni -->
        <div v-if="!needSlider" :class="['grid gap-8', gridCols]">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="testimonial.id"
            class="testimonial-card group"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 h-full flex flex-col relative overflow-hidden border border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
              <!-- Quote Icon -->
              <div class="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                <svg class="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6v-1c0-1.1.9-2 2-2h2V8h-0z M22 8c-3.3 0-6 2.7-6 6v10h10V14h-8v-1c0-1.1.9-2 2-2h2V8h-0z"/>
                </svg>
              </div>

              <!-- Content -->
              <div class="flex-1 mb-6">
                <p class="text-gray-700 leading-relaxed text-lg font-medium line-clamp-6">
                  "{{ testimonial.quote }}"
                </p>
              </div>

              <!-- Rating -->
              <div class="flex items-center space-x-1 mb-6">
                <span 
                  v-for="star in 5" 
                  :key="star"
                  class="text-yellow-400 transition-transform duration-200 hover:scale-110"
                  :class="star <= testimonial.rating ? 'opacity-100' : 'opacity-30'"
                >
                  ★
                </span>
              </div>

              <!-- Author Info -->
              <div class="flex items-center space-x-4 pt-6 border-t border-gray-100">
                <div class="relative profile-image-container">
                  <img 
                    :src="testimonial.sourceImg" 
                    :alt="testimonial.source"
                    class="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300 profile-image"
                  />
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 text-lg">{{ testimonial.source }}</h4>
                  <p class="text-blue-600 font-medium">{{ testimonial.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slider Layout untuk >4 testimoni -->
        <div v-else class="relative">
          <Swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="32"
            :pagination="{ clickable: true, dynamicBullets: true }"
            :navigation="true"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :breakpoints="{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
              1280: { slidesPerView: 4, spaceBetween: 32 }
            }"
            class="testimonials-swiper pb-16"
          >
            <SwiperSlide v-for="testimonial in testimonials" :key="testimonial.id">
              <div class="testimonial-card">
                <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 h-full flex flex-col relative overflow-hidden border border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                  <!-- Quote Icon -->
                  <div class="absolute top-6 right-6 opacity-20">
                    <svg class="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6v-1c0-1.1.9-2 2-2h2V8h-0z M22 8c-3.3 0-6 2.7-6 6v10h10V14h-8v-1c0-1.1.9-2 2-2h2V8h-0z"/>
                    </svg>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 mb-6">
                    <p class="text-gray-700 leading-relaxed font-medium line-clamp-4">
                      "{{ testimonial.quote }}"
                    </p>
                  </div>

                  <!-- Rating -->
                  <div class="flex items-center space-x-1 mb-6">
                    <span 
                      v-for="star in 5" 
                      :key="star"
                      class="text-yellow-400 text-lg"
                      :class="star <= testimonial.rating ? 'opacity-100' : 'opacity-30'"
                    >
                      ★
                    </span>
                  </div>

                  <!-- Author Info -->
                  <div class="flex items-center space-x-3 pt-6 border-t border-gray-100">
                    <div class="relative profile-image-container">
                      <img 
                        :src="testimonial.sourceImg" 
                        :alt="testimonial.source"
                        class="w-14 h-14 rounded-full object-cover ring-3 ring-blue-100 profile-image"
                      />
                      <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-800">{{ testimonial.source }}</h4>
                      <p class="text-blue-600 text-sm font-medium">{{ testimonial.title }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Line clamp utility */
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Testimonial card animations */
.testimonial-card {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced hover effects */
.testimonial-card:hover .bg-white\/80 {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-8px);
}

/* Swiper customization */
.testimonials-swiper {
  padding-left: 4px;
  padding-right: 4px;
}

/* Swiper navigation buttons */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  top: 50%;
  margin-top: -24px;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 18px;
  font-weight: bold;
  color: #3B82F6;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(59, 130, 246, 0.1);
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(59, 130, 246, 0.2);
}

:deep(.swiper-button-next) {
  right: -24px;
}

:deep(.swiper-button-prev) {
  left: -24px;
}

/* Swiper pagination */
:deep(.swiper-pagination) {
  bottom: 0;
  position: relative;
  margin-top: 2rem;
}

:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: rgba(59, 130, 246, 0.3);
  opacity: 1;
  margin: 0 6px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #3B82F6;
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

:deep(.swiper-pagination-bullet:hover) {
  transform: scale(1.1);
  background: rgba(59, 130, 246, 0.6);
}

/* Dynamic bullets */
:deep(.swiper-pagination-bullet-active-main) {
  background: linear-gradient(45deg, #3B82F6, #8B5CF6);
}

/* Background pattern animation */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.absolute.top-1\/4 {
  animation: float 6s ease-in-out infinite;
}

.absolute.bottom-1\/4 {
  animation: float 8s ease-in-out infinite reverse;
}

/* Enhanced grid responsiveness */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }

@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1280px) {
  .xl\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

/* Glass morphism effects */
.bg-white\/80 {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.8);
}

.bg-white\/60 {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.6);
}

/* Star rating hover effects */
.text-yellow-400:hover {
  filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.8));
}

/* Profile image enhancements */
.ring-4 {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.ring-3 {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Profile image positioning for portrait photos */
img[class*="rounded-full"] {
  object-position: center top;
  object-fit: cover;
}

/* Specific adjustments for different profile image sizes */
.w-16.h-16.rounded-full {
  object-position: center 20%;
  transform: scale(1.02); /* Slight zoom to ensure face visibility */
}

.w-14.h-14.rounded-full {
  object-position: center 25%;
  transform: scale(1.02); /* Slight zoom to ensure face visibility */
}

/* Enhanced profile image container */
.profile-image-container {
  overflow: hidden;
  border-radius: 50%;
}

.profile-image-container:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Profile image specific styling */
.profile-image {
  object-position: center 20%;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transition: all 0.3s ease;
}

.profile-image:hover {
  transform: scale(1.1);
}

/* Ensure consistent profile image quality for all sizes */
.w-16.h-16.profile-image {
  object-position: center 15%;
}

.w-14.h-14.profile-image {
  object-position: center 20%;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: transform, box-shadow, background-color, border-color, opacity;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .testimonial-card {
    animation-delay: 0s !important;
  }
  
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }
  
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Focus states for accessibility */
button:focus,
.testimonial-card:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

/* Loading state animation */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
</style>
