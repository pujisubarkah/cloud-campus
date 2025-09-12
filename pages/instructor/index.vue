<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
      <div class="absolute top-3/4 left-3/4 w-52 h-52 bg-green-300 rounded-full blur-3xl"></div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10 pt-32 pb-20">
      <div class="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
            <span>Dashboard Instruktur</span>
          </div>
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            Selamat Datang, <span class="text-blue-600">{{ displayName }}</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Ini adalah dashboard Anda untuk mengelola pembelajaran di Akademi Pengentasan Kemiskinan.<br>
            Silakan mengupload lebih banyak pembelajaran berkualitas.
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <!-- Total Kursus -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-300 group">
            <div class="flex items-center justify-between mb-6">
              <div class="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                </svg>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-gray-800 mb-2">{{ stats.totalCourses }}</div>
                <div class="text-sm text-gray-600">Total Kursus</div>
              </div>
            </div>
            <div class="bg-blue-50 rounded-xl p-4">
              <p class="text-blue-700 font-medium text-sm">Kursus aktif yang Anda kelola</p>
            </div>
          </div>

          <!-- Total Peserta -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-300 group">
            <div class="flex items-center justify-between mb-6">
              <div class="bg-gradient-to-br from-green-500 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-gray-800 mb-2">{{ stats.totalStudents }}</div>
                <div class="text-sm text-gray-600">Total Peserta</div>
              </div>
            </div>
            <div class="bg-green-50 rounded-xl p-4">
              <p class="text-green-700 font-medium text-sm">Peserta yang mengikuti kursus Anda</p>
            </div>
          </div>

          <!-- Materi Tersedia -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-300 group">
            <div class="flex items-center justify-between mb-6">
              <div class="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-gray-800 mb-2">{{ stats.totalContent }}</div>
                <div class="text-sm text-gray-600">Materi Tersedia</div>
              </div>
            </div>
            <div class="bg-orange-50 rounded-xl p-4">
              <p class="text-orange-700 font-medium text-sm">Konten pembelajaran yang telah dibuat</p>
            </div>
          </div>
        </div>

        <!-- Recent Activities Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-12 border border-white/50">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold text-gray-800 flex items-center">
              <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Aktivitas Terbaru
            </h2>
            <NuxtLink to="/instructor/courses" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-300 flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>Tambah Konten</span>
            </NuxtLink>
          </div>

          <div class="space-y-4">
            <div 
              v-for="activity in recentActivities" 
              :key="activity.id" 
              class="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
            >
              <div class="flex-shrink-0">
                <div class="w-4 h-4 bg-blue-500 rounded-full group-hover:bg-purple-500 transition-colors duration-300"></div>
              </div>
              <div class="flex-1">
                <p class="text-gray-800 font-medium leading-relaxed">{{ activity.description }}</p>
              </div>
              <div class="flex-shrink-0">
                <span class="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">{{ activity.time }}</span>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="recentActivities.length === 0" class="text-center py-16">
            <div class="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Belum Ada Aktivitas</h3>
            <p class="text-gray-600 mb-6">Mulai membuat konten pembelajaran untuk melihat aktivitas di sini</p>
            <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
              Buat Konten Pertama
            </button>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { ref, computed, onMounted } from 'vue'

const auth = useAuthStore()

// Computed untuk display name dengan fallback
const displayName = computed(() => {
  if (!auth.user) return 'Instruktur'
  
  // Coba beberapa kemungkinan field nama
  return auth.user.full_name || 
         auth.user.name || 
         auth.user.username || 
         auth.user.email?.split('@')[0] || 
         'Instruktur'
})

// Stats data
const stats = ref({
  totalCourses: 0,
  totalStudents: 0,
  totalContent: 0
})

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    description: 'Mengunggah video baru ke kursus "Dasar Statistik"',
    time: '2 jam lalu'
  },
  {
    id: 2,
    description: 'Menambahkan paparan PDF untuk "Materi Ekonomi"',
    time: '5 jam lalu'
  },
  {
    id: 3,
    description: 'Menjawab 3 pertanyaan dari peserta',
    time: '1 hari lalu'
  }
])

// Fetch dashboard stats
const fetchDashboardStats = async () => {
  try {
    const instructorId = auth.user?.id // pastikan ini adalah UUID instruktur yang login
    const response = await $fetch(`/api/instructor/dashboard/${instructorId}`, {
      headers: {
        'Authorization': `Bearer ${auth.user?.token}`
      }
    })
    if (response.success) {
      stats.value = response.stats
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    // Fallback ke data dummy
    stats.value = {
      totalCourses: 5,
      totalStudents: 120,
      totalContent: 42
    }
  }
}

onMounted(() => {
  console.log('=== DASHBOARD MOUNTED ===')
  console.log('Auth user:', auth.user)
  console.log('Display name:', displayName.value)
  
  // Load user from storage jika belum ada
  if (!auth.user) {
    auth.loadFromStorage?.()
  }
  
  // Fetch stats
  fetchDashboardStats()
})

definePageMeta({
  layout: 'instructor'
})
</script>
