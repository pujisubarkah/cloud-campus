<!-- filepath: c:\Users\user\Documents\cloud-campus\pages\instructor\courses\[id]\manage.vue -->
<template>
  <div class="flex min-h-screen bg-base-100">
    <SidebarInstruktur />
    <main class="flex-1 p-8">
      <h1 class="text-2xl font-bold mb-6">Kelola Kursus</h1>
      <!-- Info Kursus -->
      <div class="bg-white rounded-xl shadow p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Info Kursus</h2>
        <div v-if="course">
          <div class="mb-2"><strong>Judul:</strong> {{ course.title }}</div>
          <div class="mb-2"><strong>Deskripsi:</strong> {{ course.description }}</div>
          <div class="mb-2"><strong>Slug:</strong> {{ course.slug }}</div>
          <img v-if="course.thumbnail_url" :src="course.thumbnail_url" alt="Thumbnail" class="w-40 h-24 object-cover rounded mt-2" />
        </div>
        <div v-else>Memuat data kursus...</div>
      </div>

      <!-- Section List & Tambah Section -->
      <div class="bg-white rounded-xl shadow p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Daftar Section</h2>
        <ul class="mb-4">
          <li v-for="section in sections" :key="section.id" class="mb-2 flex items-center justify-between">
            <div>
              <span class="font-semibold">{{ section.title }}</span>
              <span class="ml-2 text-xs text-gray-400">Urutan: {{ section.order }}</span>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-xs btn-outline" @click="openContentModal(section)">Kelola Konten</button>
              <button class="btn btn-xs btn-outline" @click="openQuizModal(section)">Kelola Quiz</button>
            </div>
          </li>
        </ul>
        <!-- Form tambah section -->
        <form class="flex gap-2 items-center" @submit.prevent="addSection">
          <input v-model="newSectionTitle" type="text" class="input input-bordered" placeholder="Judul Section" required />
          <input v-model.number="newSectionOrder" type="number" class="input input-bordered w-24" placeholder="Urutan" min="1" required />
          <button type="submit" class="btn btn-primary">Tambah Section</button>
        </form>
        <div v-if="sectionError" class="text-red-500 mt-2">{{ sectionError }}</div>
      </div>

      <!-- Modal Kelola Konten Section -->
      <div v-if="showContentModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
          <button class="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost" @click="closeContentModal">
            <span aria-label="Close">&times;</span>
          </button>
          <h3 class="text-xl font-bold mb-4">Kelola Konten Section: {{ selectedSection?.title }}</h3>
          <ul class="mb-4">
            <li v-for="content in sectionContents" :key="content.id" class="mb-2">
              <span class="font-semibold">{{ content.type.toUpperCase() }}</span> - {{ content.title }}
            </li>
          </ul>
          <!-- Form tambah konten -->
          <form @submit.prevent="addContent">
            <select v-model="newContentType" class="input input-bordered mb-2 w-full" required>
              <option value="" disabled>Pilih Tipe Konten</option>
              <option value="youtube">YouTube</option>
              <option value="paparan">Paparan (PDF/Slide)</option>
            </select>
            <input v-model="newContentTitle" type="text" class="input input-bordered mb-2 w-full" placeholder="Judul Konten" required />
            <input v-model="newContentUrl" type="text" class="input input-bordered mb-2 w-full" placeholder="URL Konten" required />
            <button type="submit" class="btn btn-primary w-full">Tambah Konten</button>
          </form>
          <div v-if="contentError" class="text-red-500 mt-2">{{ contentError }}</div>
        </div>
      </div>

      <!-- Modal Kelola Quiz Section -->
      <div v-if="showQuizModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
          <button class="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost" @click="closeQuizModal">
            <span aria-label="Close">&times;</span>
          </button>
          <h3 class="text-xl font-bold mb-4">Kelola Quiz Section: {{ selectedSection?.title }}</h3>
          <ul class="mb-4">
            <li v-for="quiz in sectionQuizzes" :key="quiz.id" class="mb-2">
              <span class="font-semibold">Soal:</span> {{ quiz.question }}
            </li>
          </ul>
          <!-- Form tambah quiz -->
          <form @submit.prevent="addQuiz">
            <input v-model="newQuizQuestion" type="text" class="input input-bordered mb-2 w-full" placeholder="Pertanyaan Quiz" required />
            <input v-model="newQuizAnswer" type="text" class="input input-bordered mb-2 w-full" placeholder="Jawaban" required />
            <button type="submit" class="btn btn-primary w-full">Tambah Quiz</button>
          </form>
          <div v-if="quizError" class="text-red-500 mt-2">{{ quizError }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'instructor'
})

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const courseId = route.params.id

const course = ref(null)
const sections = ref([])
const sectionError = ref('')
const newSectionTitle = ref('')
const newSectionOrder = ref(1)

const showContentModal = ref(false)
const selectedSection = ref(null)
const sectionContents = ref([])
const newContentType = ref('')
const newContentTitle = ref('')
const newContentUrl = ref('')
const contentError = ref('')

const showQuizModal = ref(false)
const sectionQuizzes = ref([])
const newQuizQuestion = ref('')
const newQuizAnswer = ref('')
const quizError = ref('')

// Fetch course & section data
onMounted(async () => {
  // Fetch course info
  const courseRes = await $fetch(`/api/course/${courseId}`)
  course.value = courseRes.course

  // Fetch sections
  const sectionRes = await $fetch('/api/course_section', { method: 'GET' })
  sections.value = (sectionRes.sections || []).filter(s => s.course_id === courseId)
})

// Add Section
async function addSection() {
  sectionError.value = ''
  try {
    const res = await $fetch('/api/course_section', {
      method: 'POST',
      body: {
        course_id: courseId,
        title: newSectionTitle.value,
        order: newSectionOrder.value
      }
    })
    if (res.success) {
      sections.value.push(res.section)
      newSectionTitle.value = ''
      newSectionOrder.value = sections.value.length + 1
    } else {
      sectionError.value = res.error || 'Gagal menambah section.'
    }
  } catch (err) {
    sectionError.value = 'Terjadi kesalahan server.'
  }
}

// Kelola Konten Section
function openContentModal(section) {
  selectedSection.value = section
  showContentModal.value = true
  // Fetch konten section dari API (dummy di sini)
  sectionContents.value = [
    // { id: 1, type: 'youtube', title: 'Video Pengantar', url: '...' }
  ]
}
function closeContentModal() {
  showContentModal.value = false
  selectedSection.value = null
  sectionContents.value = []
}
async function addContent() {
  contentError.value = ''
  if (!newContentType.value || !newContentTitle.value || !newContentUrl.value) {
    contentError.value = 'Semua field wajib diisi.'
    return
  }
  // Simpan ke backend (dummy push di sini)
  sectionContents.value.push({
    id: Date.now(),
    type: newContentType.value,
    title: newContentTitle.value,
    url: newContentUrl.value
  })
  newContentType.value = ''
  newContentTitle.value = ''
  newContentUrl.value = ''
}

// Kelola Quiz Section
function openQuizModal(section) {
  selectedSection.value = section
  showQuizModal.value = true
  // Fetch quiz section dari API (dummy di sini)
  sectionQuizzes.value = [
    // { id: 1, question: 'Apa itu kemiskinan?', answer: '...' }
  ]
}
function closeQuizModal() {
  showQuizModal.value = false
  selectedSection.value = null
  sectionQuizzes.value = []
}
async function addQuiz() {
  quizError.value = ''
  if (!newQuizQuestion.value || !newQuizAnswer.value) {
    quizError.value = 'Semua field wajib diisi.'
    return
  }
  // Simpan ke backend (dummy push di sini)
  sectionQuizzes.value.push({
    id: Date.now(),
    question: newQuizQuestion.value,
    answer: newQuizAnswer.value
  })
  newQuizQuestion.value = ''
  newQuizAnswer.value = ''
}
</script>