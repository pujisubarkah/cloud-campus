<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-8 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="flex-1">
            <h1 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              👥 Daftar Peserta Kursus
            </h1>
            <p class="text-gray-600 text-lg">Kelola dan pantau peserta yang terdaftar dalam kursus Anda</p>
          </div>
          <div class="lg:text-right">
            <button 
              type="button" 
              class="inline-flex items-center gap-2 px-6 py-3 bg-white/80 hover:bg-gray-50 text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg transition-all duration-300" 
              @click="goBack"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali
            </button>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 overflow-hidden">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-20">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <svg class="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Memuat Data Peserta</h3>
          <p class="text-gray-500">Mohon tunggu sebentar...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-red-700 mb-2">Terjadi Kesalahan</h3>
          <p class="text-red-600 mb-6">{{ error }}</p>
          <button 
            class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300"
            @click="fetchStudents"
          >
            Coba Lagi
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="students.length === 0" class="text-center py-20">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">Belum Ada Peserta</h3>
          <p class="text-gray-500 mb-6">Kursus ini belum memiliki peserta yang terdaftar</p>
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto">
            <p class="text-blue-800 font-medium mb-2">💡 Tips untuk menarik peserta:</p>
            <ul class="text-blue-700 text-sm space-y-1 text-left">
              <li>• Pastikan kursus sudah dipublikasikan</li>
              <li>• Buat deskripsi yang menarik</li>
              <li>• Tambahkan materi pembelajaran yang berkualitas</li>
              <li>• Promosikan kursus Anda</li>
            </ul>
          </div>
        </div>

        <!-- Students List -->
        <div v-else>
          <!-- Stats Header -->
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="text-white">
                <h3 class="text-lg font-semibold mb-1">Total Peserta Terdaftar</h3>
                <p class="text-blue-100">{{ students.length }} orang bergabung dalam kursus ini</p>
              </div>
              <div class="flex gap-4 text-white">
                <div class="text-center">
                  <div class="text-2xl font-bold">{{ students.filter(s => s.is_active).length }}</div>
                  <div class="text-blue-100 text-sm">Aktif</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">{{ students.filter(s => !s.is_active).length }}</div>
                  <div class="text-blue-100 text-sm">Nonaktif</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Students Grid/List -->
          <div class="p-8">
            <!-- Desktop Table View -->
            <div class="hidden lg:block">
              <div class="overflow-hidden rounded-xl border border-gray-200">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Peserta</th>
                      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal Daftar</th>
                      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr 
                      v-for="(student, idx) in students" 
                      :key="student.id" 
                      class="hover:bg-blue-50 transition-all duration-200"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ idx + 1 }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center gap-4">
                          <img 
                            :src="student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.full_name || student.name || 'User')}&background=3B82F6&color=fff&size=40`" 
                            class="w-10 h-10 rounded-full border-2 border-white shadow-md" 
                            alt="Avatar" 
                          />
                          <div>
                            <div class="text-sm font-semibold text-gray-900">
                              {{ student.full_name || student.name || 'User' }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {{ student.email }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {{ formatDate(student.enrolled_at) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span 
                          v-if="student.is_active" 
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                        >
                          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                          Aktif
                        </span>
                        <span 
                          v-else 
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
                        >
                          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                          </svg>
                          Nonaktif
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Mobile Card View -->
            <div class="lg:hidden space-y-4">
              <div 
                v-for="(student, idx) in students" 
                :key="student.id"
                class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div class="flex items-start gap-4">
                  <img 
                    :src="student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.full_name || student.name || 'User')}&background=3B82F6&color=fff&size=48`" 
                    class="w-12 h-12 rounded-full border-2 border-white shadow-md flex-shrink-0" 
                    alt="Avatar" 
                  />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-lg font-semibold text-gray-900 truncate">
                        {{ student.full_name || student.name || 'User' }}
                      </h3>
                      <span class="text-sm text-gray-500 ml-2">#{{ idx + 1 }}</span>
                    </div>
                    <p class="text-gray-600 mb-3 truncate">{{ student.email }}</p>
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-500">{{ formatDate(student.enrolled_at) }}</span>
                      <span 
                        v-if="student.is_active" 
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        ✅ Aktif
                      </span>
                      <span 
                        v-else 
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        ❌ Nonaktif
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const courseId = route.params.id as string

const students = ref<any[]>([])
const isLoading = ref(true)
const error = ref('')

type Student = {
  id: string
  full_name?: string
  name?: string
  email: string
  avatar?: string
  enrolled_at: string
  is_active: boolean
}

type CourseResponse = {
  course: {
    title: string
    id: string
    slug: string
    description: string | null
    thumbnail_url: string | null
    instructor_id: string
    created_at: string | null
    is_published: boolean
    instructor_name: string | null
    students: Student[]
  }
}

const fetchStudents = async () => {
  isLoading.value = true
  error.value = ''
  try {
    // Ganti endpoint sesuai API peserta kursus
    const res = await $fetch<CourseResponse>(`/api/course/${courseId}/students`)
    students.value = (res && res.course && Array.isArray(res.course.students)) ? res.course.students : []
  } catch (e: any) {
    error.value = 'Gagal memuat data peserta'
    students.value = []
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const goBack = () => {
  router.back()
}

onMounted(fetchStudents)
</script>