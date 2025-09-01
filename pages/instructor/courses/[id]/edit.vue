<template>
  <div class="max-w-2xl mx-auto py-10 mt-20">
    <!-- Tombol Kembali -->
    <button type="button" class="btn btn-outline mb-6" @click="goBack">
      ← Kembali
    </button>

    <h1 class="text-3xl font-bold mb-6">Edit Kursus</h1>
    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white rounded-xl shadow-lg p-8 border">
      <div>
        <label class="block font-medium mb-1" for="title">Judul Kursus</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          class="input input-bordered w-full"
          required
        />
      </div>
      <div>
        <label class="block font-medium mb-1" for="description">Deskripsi Kursus</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          class="input input-bordered w-full"
          required
        ></textarea>
      </div>
      <div>
        <label class="block font-medium mb-1" for="thumbnail">Thumbnail URL</label>
        <input
          id="thumbnail"
          v-model="form.thumbnail_url"
          type="url"
          class="input input-bordered w-full mb-2"
        />
        <div v-if="form.thumbnail_url" class="mt-2 flex flex-col items-start gap-2">
          <img :src="form.thumbnail_url" alt="Thumbnail Preview" class="h-32 rounded-lg border" />
          <input type="file" accept="image/*" @change="onImageChange" class="file-input file-input-bordered" />
          <button type="button" class="btn btn-sm btn-outline" @click="removeImage">Hapus Gambar</button>
        </div>
      </div>
      <div>
        <label class="block font-medium mb-1">Status</label>
        <select v-model="form.is_published" class="select select-bordered w-full">
          <option :value="true">Published</option>
          <option :value="false">Draft</option>
        </select>
      </div>
      <div class="flex justify-end gap-2">
        <NuxtLink :to="`/instructor/courses/${courseId}`" class="btn btn-secondary">Batal</NuxtLink>
        <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
      </div>
    </form>
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
    <div v-if="success" class="mt-4 text-green-600">Perubahan berhasil disimpan!</div>
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
      router.push(`/instructor/courses/${courseId}`)
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