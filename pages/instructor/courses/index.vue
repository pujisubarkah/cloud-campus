<!-- filepath: c:\Users\user\Documents\cloud-campus\pages\instructor\courses\index.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'instructor'
})

const auth = useAuthStore()
const courses = ref([])
const showModal = ref(false)
const selectedCourse = ref({})
const showAddModal = ref(false)
const showDeleteModal = ref(false)
const courseToDelete = ref({})
const isDeleting = ref(false)
const thumbnailError = ref('')

// Form state
const form = ref({
  title: '',
  slug: '',
  description: '',
  thumbnail_url: '',
})

function openModal(course) {
  selectedCourse.value = course
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function openAddModal() {
  showAddModal.value = true
}

function closeAddModal() {
  showAddModal.value = false
  form.value = {
    title: '',
    slug: '',
    description: '',
    thumbnail_url: '',
  }
  thumbnailError.value = ''
}

function openDeleteModal(course) {
  courseToDelete.value = course
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  courseToDelete.value = {}
  isDeleting.value = false
}

async function handleDeleteCourse() {
  if (!courseToDelete.value.id || isDeleting.value) return
  
  isDeleting.value = true
  try {
    await $fetch(`/api/course/${courseToDelete.value.id}`, {
      method: 'DELETE'
    })
    
    // Remove course from local list
    courses.value = courses.value.filter(course => course.id !== courseToDelete.value.id)
    
    closeDeleteModal()
    
    // Show success notification (you can implement a toast notification system)
    alert('Kursus berhasil dihapus!')
  } catch (error) {
    console.error('Error deleting course:', error)
    alert('Gagal menghapus kursus. Silakan coba lagi.')
  } finally {
    isDeleting.value = false
  }
}

// Handle image upload for thumbnail
async function onThumbnailChange(e) {
  const file = e.target.files[0]
  thumbnailError.value = ''
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    thumbnailError.value = 'Ukuran gambar maksimal 2 MB.'
    return
  }
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'Makarti_corpu')
  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dqlfyyigk/image/upload', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    console.log('Cloudinary upload response:', data)
    if (data.secure_url) {
      form.value.thumbnail_url = data.secure_url
    } else {
      thumbnailError.value = data.error?.message || 'Gagal upload gambar ke Cloudinary.'
      console.error('Cloudinary error:', data)
    }
  } catch (err) {
    thumbnailError.value = 'Gagal upload gambar ke Cloudinary.'
    console.error('Cloudinary upload exception:', err)
    console.log('Cloudinary upload error detail:', err)
  }
}

async function handleAddCourse() {
  if (!auth.user?.id) return
  const slug = form.value.title.trim().toLowerCase().replace(/\s+/g, '-')
  const newCourse = {
    title: form.value.title,
    slug,
    description: form.value.description,
    thumbnail_url: form.value.thumbnail_url,
    instructor_id: auth.user.id,
    is_published: false,
  }
  await $fetch('/api/instructor/' + auth.user.id + '/course', {
    method: 'POST',
    body: newCourse,
  })

  // Kirim notifikasi ke admin setelah instructor submit draft kursus
  await $fetch('/api/notifikasi', {
    method: 'POST',
    body: {
      user_id: '550e8400-e29b-41d4-a716-446655440000', // id admin
      pesan: `Instructor ${auth.user.full_name} telah mengirimkan draft kursusnya, mohon direview`,
      dibaca: false,
      created_by: auth.user.id // id instructor
    }
  })

  closeAddModal()
  const res = await $fetch(`/api/instructor/${auth.user.id}/course`)
  courses.value = Array.isArray(res) ? res : []
}

onMounted(async () => {
  if (auth.user?.id) {
    const res = await $fetch(`/api/instructor/${auth.user.id}/course`)
    courses.value = Array.isArray(res) ? res : []
  }
})

onMounted(async () => {
  if (auth.user?.id) {
    const res = await $fetch(`/api/instructor/${auth.user.id}/course`)
    courses.value = Array.isArray(res) ? res : []
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-8 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="flex-1">
            <h1 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              📚 Kelola Kursus Anda
            </h1>
            <p class="text-gray-600 text-lg">Buat, kelola, dan pantau progres kursus yang Anda ajarkan</p>
          </div>
          <div class="lg:text-right">
            <button
              class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              @click="openAddModal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Tambah Kursus Baru
            </button>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div v-if="courses.length === 0" class="text-center py-20">
        <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-12 max-w-md mx-auto">
          <div class="text-6xl mb-6">📚</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">Belum Ada Kursus</h3>
          <p class="text-gray-500 mb-6">Mulai buat kursus pertama Anda dan bagikan ilmu kepada dunia!</p>
          <button
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            @click="openAddModal"
          >
            Buat Kursus Sekarang
          </button>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div
          v-for="course in courses"
          :key="course.id"
          class="group bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <!-- Course Image -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="course.thumbnail_url" 
              :alt="course.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div class="absolute top-4 right-4">
              <span
                v-if="course.is_published"
                class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-green-500/90 backdrop-blur-sm rounded-full"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Published
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-800 bg-yellow-400/90 backdrop-blur-sm rounded-full"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                Draft
              </span>
            </div>
          </div>

          <!-- Course Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {{ course.title }}
            </h3>
            <p class="text-gray-600 mb-6 line-clamp-3">{{ course.description }}</p>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                :to="`/instructor/courses/${course.id}/manage`"
                class="flex-1 min-w-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Kelola
              </NuxtLink>
              
              <button 
                class="px-4 py-2.5 bg-white/80 hover:bg-gray-50 text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg transition-all duration-300" 
                @click="openModal(course)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
              
              <button 
                class="px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-xl border-2 border-red-200 hover:border-red-300 shadow-md hover:shadow-lg transition-all duration-300" 
                @click="openDeleteModal(course)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Kursus -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-2xl relative transform transition-all duration-300">
        <button class="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300" @click="closeAddModal">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="mb-8">
          <h3 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ✨ Tambah Kursus Baru
          </h3>
          <p class="text-gray-600">Buat kursus baru dan mulai berbagi pengetahuan Anda</p>
        </div>

        <form @submit.prevent="handleAddCourse" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Judul Kursus</label>
            <input 
              v-model="form.title" 
              type="text" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
              placeholder="Masukkan judul kursus yang menarik..."
              required 
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Deskripsi</label>
            <textarea 
              v-model="form.description" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 h-32 resize-none" 
              placeholder="Jelaskan tentang kursus Anda..."
              required
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Cover Kursus</label>
            <div class="relative">
              <input
                type="file"
                accept="image/*"
                class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                @change="onThumbnailChange"
                required
              />
            </div>
            <div v-if="thumbnailError" class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {{ thumbnailError }}
            </div>
            <div v-if="form.thumbnail_url" class="mt-4">
              <img :src="form.thumbnail_url" alt="Preview" class="w-full h-48 object-cover rounded-xl shadow-lg" />
            </div>
          </div>
          
          <div class="flex gap-4 pt-6">
            <button 
              type="button" 
              class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300" 
              @click="closeAddModal"
            >
              Batal
            </button>
            <button 
              type="submit" 
              class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Simpan Kursus
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Detail Kursus -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-2xl relative transform transition-all duration-300">
        <button class="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300" @click="closeModal">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="mb-6">
          <h3 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            📋 Detail Kursus
          </h3>
        </div>

        <div class="space-y-6">
          <img :src="selectedCourse.thumbnail_url" alt="cover" class="w-full h-64 object-cover rounded-2xl shadow-lg" />
          
          <div class="space-y-4">
            <div class="p-4 bg-blue-50/80 rounded-xl">
              <h4 class="font-semibold text-blue-900 mb-2">Judul Kursus</h4>
              <p class="text-blue-800">{{ selectedCourse.title }}</p>
            </div>
            
            <div class="p-4 bg-purple-50/80 rounded-xl">
              <h4 class="font-semibold text-purple-900 mb-2">Deskripsi</h4>
              <p class="text-purple-800">{{ selectedCourse.description }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <NuxtLink 
              :to="`/instructor/courses/${selectedCourse.id}/edit`" 
              class="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit
            </NuxtLink>
            
            <NuxtLink 
              :to="`/instructor/courses/${selectedCourse.id}/sections`" 
              class="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Materi
            </NuxtLink>
            
            <NuxtLink 
              :to="`/instructor/courses/${selectedCourse.id}/students`" 
              class="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              Peserta
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-md relative transform transition-all duration-300">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-gray-900 mb-3">Hapus Kursus?</h3>
          <p class="text-gray-600 mb-2">Anda yakin ingin menghapus kursus:</p>
          <p class="font-semibold text-gray-800 mb-6">"{{ courseToDelete.title }}"</p>
          <p class="text-sm text-red-600 mb-8">Tindakan ini tidak dapat dibatalkan!</p>
          
          <div class="flex gap-4">
            <button 
              class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300" 
              @click="closeDeleteModal"
              :disabled="isDeleting"
            >
              Batal
            </button>
            <button 
              class="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
              @click="handleDeleteCourse"
              :disabled="isDeleting"
            >
              <span v-if="isDeleting" class="inline-flex items-center gap-2">
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menghapus...
              </span>
              <span v-else>Hapus Kursus</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>