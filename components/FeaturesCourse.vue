<template>
  <section class="features-course py-16 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
    <div class="container mx-auto px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Akademi <span class="text-blue-600">Pengentasan Kemiskinan</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Temukan beragam pembelajaran pengentasan kemiskinan yang dirancang khusus untuk meningkatkan kapasitas dan keterampilan Anda
        </p>
      </div>

      <!-- Search Section -->
      <div class="flex justify-center mb-12">
        <div class="max-w-2xl w-full">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari kursus yang Anda inginkan..."
              class="w-full py-5 pl-14 pr-6 text-lg bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
              v-model="search"
            />
            <div v-if="search" class="absolute inset-y-0 right-0 pr-4 flex items-center">
              <button
                class="bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-full p-2 transition-all duration-200"
                @click="search = ''"
                title="Hapus pencarian"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-16">
        <div class="flex flex-col items-center space-y-4">
          <div class="relative">
            <div class="animate-spin w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div class="w-6 h-6 bg-blue-500 rounded-full opacity-75 animate-ping"></div>
            </div>
          </div>
          <p class="text-gray-600 font-medium">Memuat kursus terbaik untuk Anda...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
          <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-semibold text-red-800 mb-2">Oops! Terjadi Kesalahan</h3>
          <p class="text-red-600">{{ error }}</p>
        </div>
      </div>

      <!-- Courses Grid -->
      <div v-else class="mt-8">
        <!-- Grid Container with equal height cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div 
            v-for="course in filteredCourses" 
            :key="course.id" 
            class="course-card group cursor-pointer"
            @click="goToCourse(course)"
          >
            <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 h-full flex flex-col border border-white/50">
              <!-- Thumbnail Section - Fixed Height -->
              <div class="relative h-52 overflow-hidden">
                <img
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  :src="course.thumbnail_url || 'https://placehold.co/400x250/3B82F6/FFFFFF?text=Thumbnail'"
                  :alt="course.title"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-blue-900/50 to-transparent">
                  <div class="bg-white/95 backdrop-blur-sm text-blue-600 px-8 py-4 rounded-2xl font-bold shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 border border-blue-100">
                    <div class="flex items-center space-x-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Mulai Belajar</span>
                    </div>
                  </div>
                </div>
                <!-- Course Badge -->
                <div class="absolute top-4 left-4">
                  <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Kursus Premium
                  </span>
                </div>
              </div>

              <!-- Content Section - Flexible Height -->
              <div class="p-6 flex-1 flex flex-col space-y-4">
                <!-- Title - Fixed max lines -->
                <h5 class="font-bold text-xl text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors duration-300">
                  {{ course.title }}
                </h5>
                
                <!-- Description - Fixed max lines -->
                <p class="text-gray-600 mb-4 line-clamp-3 flex-1 leading-relaxed">
                  {{ course.description }}
                </p>
                
                <!-- Footer Info - Fixed at bottom -->
                <div class="mt-auto space-y-3 pt-4 border-t border-gray-100">
                  <div class="flex items-center space-x-3 text-sm text-gray-500">
                    <div class="flex items-center space-x-2">
                      <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <span class="font-medium text-gray-700">{{ course.instructor_name }}</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between text-xs text-gray-500">
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ new Date(course.created_at).toLocaleDateString('id-ID') }}</span>
                    </div>
                    <div class="flex items-center space-x-1 text-blue-600">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="font-medium">Populer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCourses.length === 0" class="text-center text-gray-500 py-20">
          <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-12 mx-auto max-w-lg border border-white/50 shadow-xl">
            <div class="relative mb-8">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center">
                <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Belum Ada Kursus</h3>
            <p class="text-gray-600 leading-relaxed mb-6">
              Maaf, tidak ada kursus yang sesuai dengan pencarian Anda. 
              <br>Coba kata kunci yang berbeda atau hapus filter pencarian.
            </p>
            <button 
              @click="search = ''"
              class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Lihat Semua Kursus
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Course {
  id: string
  title: string
  slug: string
  description: string
  thumbnail_url?: string
  instructor_name: string
  created_at: string
  is_published: boolean
}

const router = useRouter()
const courses = ref<Course[]>([])
const search = ref('')
const isLoading = ref(true)
const error = ref('')

const fetchCourses = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const res = await fetch('/api/course')
    if (!res.ok) throw new Error('Gagal memuat data kursus')
    const data = await res.json()
    // Filter hanya kursus yang published
    courses.value = data.filter((c: Course) => c.is_published)
  } catch (e: any) {
    error.value = e.message || 'Gagal memuat data kursus'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchCourses)

const filteredCourses = computed(() =>
  courses.value.filter(course =>
    course.title.toLowerCase().includes(search.value.toLowerCase())
  )
)

const goToCourse = (course: Course) => {
  // Pakai id atau slug sesuai routing kamu
  router.push(`/course/${course.id}`)
}
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced animations and transitions */
.course-card {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.course-card:nth-child(1) { animation-delay: 0.1s; }
.course-card:nth-child(2) { animation-delay: 0.2s; }
.course-card:nth-child(3) { animation-delay: 0.3s; }
.course-card:nth-child(4) { animation-delay: 0.4s; }
.course-card:nth-child(5) { animation-delay: 0.5s; }
.course-card:nth-child(6) { animation-delay: 0.6s; }
.course-card:nth-child(7) { animation-delay: 0.7s; }
.course-card:nth-child(8) { animation-delay: 0.8s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gradient backgrounds */
.features-course {
  background: linear-gradient(135deg, 
    rgba(248, 250, 252, 0.8) 0%, 
    rgba(239, 246, 255, 0.9) 25%, 
    rgba(219, 234, 254, 0.8) 50%, 
    rgba(239, 246, 255, 0.9) 75%, 
    rgba(248, 250, 252, 0.8) 100%);
  position: relative;
}

.features-course::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  pointer-events: none;
}

/* Enhanced hover effects */
.course-card .bg-white\/80 {
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.course-card:hover .bg-white\/80 {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Search input enhancements */
input[type="text"] {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(59, 130, 246, 0.1);
}

input[type="text"]:focus {
  background: rgba(255, 255, 255, 1);
  box-shadow: 
    0 0 0 4px rgba(59, 130, 246, 0.1),
    0 10px 25px -5px rgba(59, 130, 246, 0.1),
    0 8px 10px -6px rgba(59, 130, 246, 0.1);
}

/* Loading animation enhancements */
@keyframes pulse-ring {
  0% {
    transform: scale(0.33);
    opacity: 1;
  }
  80%, 100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.animate-ping {
  animation: pulse-ring 1.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2563EB, #7C3AED);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .course-card {
    animation-delay: 0s !important;
  }
  
  .features-course {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}

/* Enhanced gradient overlays */
.bg-gradient-to-t {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 25%,
    rgba(0, 0, 0, 0.1) 50%,
    transparent 100%
  );
}

/* Smooth focus transitions */
*:focus {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Button hover effects */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>
