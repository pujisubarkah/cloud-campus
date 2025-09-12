<!-- filepath: c:\Users\user\Documents\cloud-campus\pages\instructor\progress.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-8 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="flex-1">
            <h1 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              📊 Progress Pembelajaran Siswa
            </h1>
            <p class="text-gray-600 text-lg">Pantau kemajuan belajar siswa dalam setiap kursus dan section</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="bg-blue-100 border border-blue-200 rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">{{ progressData.length }}</div>
              <div class="text-blue-700 text-sm font-medium">Total Records</div>
            </div>
            <div class="bg-green-100 border border-green-200 rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-green-600">{{ completedCount }}</div>
              <div class="text-green-700 text-sm font-medium">Selesai</div>
            </div>
            <div class="bg-orange-100 border border-orange-200 rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-orange-600">{{ inProgressCount }}</div>
              <div class="text-orange-700 text-sm font-medium">Dalam Progress</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Content -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 overflow-hidden">
        <!-- Filter/Sort Section -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 class="text-xl font-semibold text-white">Detail Progress Siswa</h2>
            <div class="flex gap-3">
              <select class="px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all">
                <option value="">Semua Kursus</option>
                <option value="statistik">Dasar-Dasar Statistik</option>
                <option value="gis">Remote Sensing & GIS</option>
              </select>
              <select class="px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all">
                <option value="">Semua Status</option>
                <option value="completed">Selesai</option>
                <option value="progress">Dalam Progress</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden lg:block">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center gap-2">
                      👨‍🎓 Nama Siswa
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center gap-2">
                      📚 Kursus
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center gap-2">
                      📑 Section
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center gap-2">
                      📈 Progress
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center gap-2">
                      ✅ Status
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="item in progressData" 
                  :key="item.id" 
                  class="hover:bg-blue-50 transition-all duration-200"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {{ item.student.split(' ').map(n => n[0]).join('').toUpperCase() }}
                      </div>
                      <div>
                        <div class="text-sm font-semibold text-gray-900">{{ item.student }}</div>
                        <div class="text-xs text-gray-500">ID: #{{ item.id.toString().padStart(3, '0') }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.course }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-600">{{ item.section }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          class="h-full rounded-full transition-all duration-500 ease-out"
                          :class="getProgressColor(item.progress_percent)"
                          :style="{ width: item.progress_percent + '%' }"
                        ></div>
                      </div>
                      <span class="text-sm font-semibold text-gray-700 min-w-[3rem] text-right">
                        {{ item.progress_percent }}%
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      v-if="item.is_completed"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                    >
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      Selesai
                    </span>
                    <span 
                      v-else
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200"
                    >
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                      </svg>
                      Dalam Progress
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Mobile Card View -->
        <div class="lg:hidden p-6 space-y-4">
          <div 
            v-for="item in progressData" 
            :key="item.id"
            class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div class="flex items-start gap-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {{ item.student.split(' ').map(n => n[0]).join('').toUpperCase() }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ item.student }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ item.course }}</p>
                <p class="text-sm text-gray-500">Section: {{ item.section }}</p>
              </div>
              <span 
                v-if="item.is_completed"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                ✅ Selesai
              </span>
              <span 
                v-else
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
              >
                🔄 Progress
              </span>
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 font-medium">Progress Pembelajaran</span>
                <span class="font-semibold text-gray-700">{{ item.progress_percent }}%</span>
              </div>
              <div class="bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500 ease-out"
                  :class="getProgressColor(item.progress_percent)"
                  :style="{ width: item.progress_percent + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'instructor'
})

const progressData = [
  {
    id: 1,
    student: 'Budi Santoso',
    course: 'Dasar-Dasar Statistik',
    section: 'Pendahuluan',
    progress_percent: 100,
    is_completed: true,
  },
  {
    id: 2,
    student: 'Siti Aminah',
    course: 'Remote Sensing & GIS',
    section: 'Pengantar GIS',
    progress_percent: 75,
    is_completed: false,
  },
  {
    id: 3,
    student: 'Andi Wijaya',
    course: 'Dasar-Dasar Statistik',
    section: 'Analisis Data',
    progress_percent: 50,
    is_completed: false,
  },
  {
    id: 4,
    student: 'Dewi Lestari',
    course: 'Remote Sensing & GIS',
    section: 'Aplikasi GIS',
    progress_percent: 90,
    is_completed: false,
  },
  {
    id: 5,
    student: 'Ahmad Rahman',
    course: 'Dasar-Dasar Statistik',
    section: 'Statistik Deskriptif',
    progress_percent: 100,
    is_completed: true,
  },
]

// Computed properties for statistics
const completedCount = computed(() => {
  return progressData.filter(item => item.is_completed).length
})

const inProgressCount = computed(() => {
  return progressData.filter(item => !item.is_completed).length
})

// Function to get progress bar color based on percentage
function getProgressColor(percentage) {
  if (percentage >= 90) {
    return 'bg-gradient-to-r from-green-500 to-emerald-500'
  } else if (percentage >= 70) {
    return 'bg-gradient-to-r from-blue-500 to-cyan-500'
  } else if (percentage >= 50) {
    return 'bg-gradient-to-r from-yellow-500 to-orange-500'
  } else {
    return 'bg-gradient-to-r from-orange-500 to-red-500'
  }
}
</script>