<template>
  <div class="max-w-4xl mx-auto py-10 mt-20">
    <h1 class="text-3xl font-bold mb-6">Daftar Peserta Kursus</h1>
    <div v-if="isLoading" class="text-center py-8">
      <div class="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-gray-500">Memuat data peserta...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-600 py-8">{{ error }}</div>
    <div v-else>
      <div v-if="students.length === 0" class="text-center py-8 text-gray-500">
        Belum ada peserta yang mendaftar kursus ini.
      </div>
      <table v-else class="table w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead class="bg-blue-50">
          <tr>
            <th class="py-3 px-4 text-left">#</th>
            <th class="py-3 px-4 text-left">Nama</th>
            <th class="py-3 px-4 text-left">Email</th>
            <th class="py-3 px-4 text-left">Tanggal Daftar</th>
            <th class="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, idx) in students" :key="student.id" class="hover:bg-blue-50">
            <td class="py-2 px-4">{{ idx + 1 }}</td>
            <td class="py-2 px-4 font-medium flex items-center gap-2">
              <img :src="student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.full_name || student.name || 'User')}&background=3B82F6&color=fff&size=32`" class="w-8 h-8 rounded-full border" alt="Avatar" />
              {{ student.full_name || student.name || 'User' }}
            </td>
            <td class="py-2 px-4">{{ student.email }}</td>
            <td class="py-2 px-4">{{ formatDate(student.enrolled_at) }}</td>
            <td class="py-2 px-4">
              <span v-if="student.is_active" class="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Aktif</span>
              <span v-else class="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">Nonaktif</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button type="button" class="btn btn-outline mt-8" @click="goBack">
      ← Kembali
    </button>
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