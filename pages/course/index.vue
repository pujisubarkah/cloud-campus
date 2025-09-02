<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
      <div class="absolute top-3/4 left-3/4 w-52 h-52 bg-green-300 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 pt-32 pb-20">
      <div class="container mx-auto px-6 lg:px-8">
        
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
            <span>Katalog Kursus</span>
          </div>
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            Jelajahi <span class="text-blue-600">Kursus Terbaik</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan berbagai kursus berkualitas untuk meningkatkan kemampuan dalam program pengentasan kemiskinan
          </p>
        </div>

        <!-- Search Section -->
        <div class="max-w-4xl mx-auto mb-16">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
            <div class="flex flex-col md:flex-row gap-6 items-center">
              <!-- Search Form -->
              <div class="w-full">
                <div class="flex gap-4">
                  <div class="flex-1 relative">
                    <input 
                      type="text" 
                      v-model="searchQuery"
                      @input="handleSearch"
                      placeholder="Cari kursus berdasarkan nama, kategori, atau topik..." 
                      class="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-lg"
                    />
                    <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                    </div>
                  </div>
                  <button 
                    @click="clearSearch"
                    v-if="searchQuery"
                    class="bg-gray-500 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span>Bersihkan</span>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Search Results Info -->
            <div v-if="searchQuery" class="mt-4 text-sm text-gray-600">
              Menampilkan {{ filteredCourses.length }} dari {{ courses.length }} kursus untuk pencarian "<strong>{{ searchQuery }}</strong>"
            </div>
            
            <!-- Quick Filter Tags -->
            <div class="mt-6 flex flex-wrap gap-3">
              <span class="text-sm text-gray-600 font-medium">Filter populer:</span>
              <button 
                v-for="tag in popularTags" 
                :key="tag"
                @click="setSearchTag(tag)"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                  searchQuery === tag 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                ]"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>

        <!-- Courses Section -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold text-gray-800">Semua Kursus</h2>
            <div class="flex items-center space-x-4">
              <!-- Sort Dropdown -->
              <select 
                v-model="sortBy"
                class="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Terbaru</option>
                <option value="popular">Terpopuler</option>
                <option value="name">Nama A-Z</option>
              </select>
              <!-- View Toggle -->
              <div class="flex bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button 
                  @click="viewMode = 'grid'"
                  :class="[
                    'px-4 py-2 transition-colors duration-300',
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                  ]"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                </button>
                <button 
                  @click="viewMode = 'list'"
                  :class="[
                    'px-4 py-2 transition-colors duration-300',
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                  ]"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Courses Grid/List -->
          <div 
            :class="[
              'transition-all duration-300',
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
                : 'space-y-6'
            ]"
          >
            <CourseCard
              v-for="course in sortedCourses"
              :key="course.id"
              :course="course"
              :view-mode="viewMode"
              class="course-card"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="courses.length === 0 && !isLoading" class="text-center py-20">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 border border-white/50 max-w-md mx-auto">
            <div class="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Belum Ada Kursus</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Saat ini belum ada kursus yang tersedia. Silakan cek kembali nanti atau hubungi admin untuk informasi lebih lanjut.
            </p>
            <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
              Hubungi Admin
            </button>
          </div>
        </div>

        <!-- No Search Results -->
        <div v-else-if="courses.length > 0 && sortedCourses.length === 0" class="text-center py-20">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 border border-white/50 max-w-md mx-auto">
            <div class="bg-gradient-to-br from-yellow-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Tidak Ada Hasil</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Tidak ditemukan kursus untuk pencarian "<strong>{{ searchQuery }}</strong>". Coba gunakan kata kunci yang berbeda.
            </p>
            <div class="space-y-3">
              <button 
                @click="clearSearch"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                Tampilkan Semua Kursus
              </button>
              <div class="text-sm text-gray-500">atau coba kata kunci populer:</div>
              <div class="flex flex-wrap gap-2 justify-center">
                <button 
                  v-for="tag in popularTags.slice(0, 3)" 
                  :key="tag"
                  @click="setSearchTag(tag)"
                  class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-300"
                >
                  {{ tag }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else-if="isLoading" class="text-center py-20">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 border border-white/50 max-w-md mx-auto">
            <div class="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Memuat Kursus...</h3>
            <p class="text-gray-600 leading-relaxed">
              Sedang mengambil data kursus terbaru untuk Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CourseCard from '~/components/CourseCard.vue'

// Set page title
useHead({
  title: 'Kursus - Akademi Pengentasan Kemiskinan',
  meta: [
    { name: 'description', content: 'Jelajahi berbagai kursus berkualitas untuk meningkatkan kemampuan dalam program pengentasan kemiskinan' }
  ]
})

// State
const courses = ref([])
const searchQuery = ref('')
const sortBy = ref('newest')
const viewMode = ref('grid')
const isLoading = ref(true)

// Popular search tags
const popularTags = ref([
  'Kewirausahaan',
  'Pemberdayaan Masyarakat',
  'Ekonomi Kreatif',
  'UMKM',
  'Teknologi Digital'
])

// Computed properties
const filteredCourses = computed(() => {
  let filtered = [...courses.value]
  
  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(course => {
      return (
        course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query) ||
        course.category?.toLowerCase().includes(query) ||
        course.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        course.instructor_name?.toLowerCase().includes(query)
      )
    })
  }
  
  return filtered
})

const sortedCourses = computed(() => {
  let filtered = [...filteredCourses.value]
  
  // Apply sorting
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      break
    case 'popular':
      filtered.sort((a, b) => (b.enrollments || 0) - (a.enrollments || 0))
      break
    case 'name':
      filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
      break
  }
  
  return filtered
})

// Methods
const handleSearch = () => {
  // Real-time search - no need for additional logic as computed property handles it
}

const clearSearch = () => {
  searchQuery.value = ''
}

const setSearchTag = (tag) => {
  searchQuery.value = searchQuery.value === tag ? '' : tag
}

// Methods
const fetchCourses = async () => {
  try {
    isLoading.value = true
    const res = await $fetch('/api/course/published')
    courses.value = Array.isArray(res) ? res : []
  } catch (err) {
    courses.value = []
    console.error('Gagal mengambil data kursus:', err)
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchCourses()
})
</script>

<style scoped>
/* Glass morphism effects */
.bg-white\/80 {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.8);
}

/* Course card animations */
.course-card {
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

/* Smooth transitions */
* {
  transition-property: transform, opacity, background-color, border-color, box-shadow, color;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced hover effects */
.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Button hover effects */
button:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Focus styles for accessibility */
input:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Responsive optimizations */
@media (max-width: 768px) {
  .course-card {
    animation-delay: 0s !important;
  }
  
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* View mode transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

<style scoped>
.top_courses .thumb {
  position: relative;
}
.overlay {
  transition: background 0.2s;
}
.top_courses:hover .overlay {
  background: rgba(0,0,0,0.25);
}
</style>
