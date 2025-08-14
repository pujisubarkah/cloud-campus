<template>
  <section class="features-course pb-20">
    <div class="container mx-auto px-4">
      <!-- Search Section -->
      <div class="flex justify-center">
        <div class="max-w-xl w-full">
          <div class="main-title text-center mb-8">
            <div class="relative flex items-center">
              <input
                type="text"
                placeholder="Cari Kursus Pengentasan Kemiskinan..."
                class="input input-bordered w-full py-4 pl-5 pr-14 text-lg rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                v-model="search"
              />
              <button
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFD966] text-[#3399FF] rounded-full p-3 shadow-md hover:bg-[#FFD54F] transition"
                @click="search = ''"
                title="Reset Pencarian"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-500">Loading kursus...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12 text-red-600">{{ error }}</div>

      <!-- Courses Grid -->
      <div v-else class="mt-8">
        <!-- Grid Container with equal height cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="course in filteredCourses" 
            :key="course.id" 
            class="course-card cursor-pointer"
            @click="goToCourse(course)"
          >
            <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col">
              <!-- Thumbnail Section - Fixed Height -->
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  :src="course.thumbnail_url || 'https://placehold.co/400x200?text=No+Image'"
                  :alt="course.title"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/30">
                  <div class="bg-[#FFD966] text-[#3399FF] px-6 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-transform">
                    Lihat Materi
                  </div>
                </div>
              </div>

              <!-- Content Section - Flexible Height -->
              <div class="p-4 flex-1 flex flex-col">
                <!-- Title - Fixed max lines -->
                <h5 class="font-bold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {{ course.title }}
                </h5>
                
                <!-- Description - Fixed max lines -->
                <p class="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">
                  {{ course.description }}
                </p>
                
                <!-- Footer Info - Fixed at bottom -->
                <div class="mt-auto space-y-1">
                  <div class="text-xs text-gray-500 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    <span class="truncate">Instruktur: {{ course.instructor_name }}</span>
                  </div>
                  <div class="text-xs text-gray-500 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ new Date(course.created_at).toLocaleDateString('id-ID') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCourses.length === 0" class="text-center text-gray-500 py-12">
          <div class="bg-gray-50 rounded-xl p-8 mx-auto max-w-md">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak ada kursus ditemukan</h3>
            <p class="text-gray-500">Coba ubah kata kunci pencarian Anda</p>
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

/* Smooth transitions */
.course-card {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
