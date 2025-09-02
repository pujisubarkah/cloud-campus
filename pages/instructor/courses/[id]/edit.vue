<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
    <div class="max-w-4xl mx-auto px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-8 mb-8">
        <div class="flex items-center gap-4 mb-6">
          <button 
            type="button" 
            class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-gray-50 text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg transition-all duration-300" 
            @click="goBack"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Kembali
          </button>
        </div>
        
        <div>
          <h1 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            ✏️ Edit Kursus
          </h1>
          <p class="text-gray-600 text-lg">Perbarui informasi kursus Anda</p>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Judul Kursus -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3" for="title">
              📚 Judul Kursus
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              placeholder="Masukkan judul kursus yang menarik..."
              required
            />
          </div>

          <!-- Deskripsi -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3" for="description">
              📝 Deskripsi Kursus
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="6"
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
              placeholder="Jelaskan tentang kursus Anda..."
              required
            ></textarea>
          </div>

          <!-- Thumbnail -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3" for="thumbnail">
              🖼️ Cover Kursus
            </label>
            <input
              id="thumbnail"
              v-model="form.thumbnail_url"
              type="url"
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 mb-4"
              placeholder="https://example.com/image.jpg"
            />
            
            <div v-if="form.thumbnail_url" class="space-y-4">
              <div class="relative">
                <img 
                  :src="form.thumbnail_url" 
                  alt="Preview Cover" 
                  class="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <div class="absolute top-4 right-4">
                  <button 
                    type="button" 
                    class="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-300" 
                    @click="removeImage"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  @change="onImageChange" 
                  class="flex-1 px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
            
            <div v-else class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <div class="space-y-4">
                <div class="text-4xl">🖼️</div>
                <div>
                  <p class="text-gray-600 mb-4">Belum ada cover kursus</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    @change="onImageChange" 
                    class="px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">
              📊 Status Publikasi
            </label>
            <select 
              v-model="form.is_published" 
              class="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            >
              <option :value="true">✅ Published - Kursus dapat dilihat oleh siswa</option>
              <option :value="false">📝 Draft - Kursus masih dalam tahap pengembangan</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-8">
            <NuxtLink 
              :to="`/instructor/courses`" 
              class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Batal
            </NuxtLink>
            <button 
              type="submit" 
              class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Simpan Perubahan
            </button>
          </div>
        </form>

        <!-- Status Messages -->
        <div v-if="error" class="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-xl">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-red-700 font-medium">{{ error }}</p>
          </div>
        </div>
        
        <div v-if="success" class="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-xl">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-green-700 font-medium">Perubahan berhasil disimpan! Mengalihkan...</p>
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

const form = ref({
  title: '',
  description: '',
  thumbnail_url: '',
  is_published: true
})

const error = ref('')
const success = ref(false)

interface CourseResponse {
  course?: {
    id: string
    title: string
    slug: string
    description: string | null
    thumbnail_url: string | null
    instructor_id: string
    created_at: Date | null
    is_published: boolean
    instructor_name: string | null
  }
  success?: boolean
}

const fetchCourse = async () => {
  try {
    const res = await $fetch<CourseResponse>(`/api/course/${courseId}`)
    if (res && res.course) {
      form.value = {
        title: res.course.title || '',
        description: res.course.description || '',
        thumbnail_url: res.course.thumbnail_url || '',
        is_published: !!res.course.is_published
      }
    } else {
      error.value = 'Data kursus tidak ditemukan'
    }
  } catch (e: any) {
    error.value = 'Gagal memuat data kursus'
  }
}

const handleSubmit = async () => {
  error.value = ''
  success.value = false
  try {
    await $fetch(`/api/course/${courseId}`, {
      method: 'PUT',
      body: form.value
    })
    success.value = true
    setTimeout(() => {
      router.push(`/instructor/courses`)
    }, 1200)
  } catch (e: any) {
    error.value = 'Gagal menyimpan perubahan'
  }
}

// Fungsi upload gambar
const onImageChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const formData = new FormData()
  formData.append('image', file)
  try {
    // Ganti endpoint sesuai backend upload gambar Anda
    const res = await $fetch<any>('/api/upload/image', {
      method: 'POST',
      body: formData
    })
    // Asumsikan response { url: 'https://...' }
    if (res.url) {
      form.value.thumbnail_url = res.url
    }
  } catch (e: any) {
    error.value = 'Gagal upload gambar'
  }
}

// Fungsi hapus gambar
const removeImage = () => {
  form.value.thumbnail_url = ''
}

const goBack = () => {
  router.back()
}

onMounted(fetchCourse)
</script>