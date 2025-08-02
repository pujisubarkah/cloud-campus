<template>
  <div class="flex min-h-screen bg-base-100 pt-16">
    <!-- Main Content -->
    <section class="flex-1 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-semibold">📚 Daftar Kursus Anda</h2>
        <NuxtLink to="/instructor/add-course" class="btn btn-success">
          + Tambah Kursus
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="course in courses"
          :key="course.id"
          class="card bg-base-100 shadow-xl"
        >
          <figure><img :src="course.thumbnail" alt="course cover" /></figure>
          <div class="card-body">
            <h2 class="card-title">{{ course.title }}</h2>
            <p>{{ course.description }}</p>
            <div class="card-actions justify-end">
              <NuxtLink
                :to="`/instructor/courses/${course.id}/manage`"
                class="btn btn-sm btn-primary"
              >
                Kelola
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Kelola Kursus -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
        <button class="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost" @click="closeModal">
          <span aria-label="Close">&times;</span>
        </button>
        <h3 class="text-xl font-bold mb-4">Kelola Kursus</h3>
        <img :src="selectedCourse.thumbnail" alt="cover" class="w-full h-40 object-cover rounded mb-4" />
        <div class="mb-2">
          <strong>Judul:</strong> {{ selectedCourse.title }}
        </div>
        <div class="mb-2">
          <strong>Deskripsi:</strong> {{ selectedCourse.description }}
        </div>
        <div class="flex gap-3 mt-6">
          <NuxtLink :to="`/instructor/courses/${selectedCourse.id}/edit`" class="btn btn-outline btn-sm">Edit Kursus</NuxtLink>
          <NuxtLink :to="`/instructor/courses/${selectedCourse.id}/sections`" class="btn btn-outline btn-sm">Kelola Materi</NuxtLink>
          <NuxtLink :to="`/instructor/courses/${selectedCourse.id}/students`" class="btn btn-outline btn-sm">Lihat Peserta</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'instructor'
})

const courses = [
  {
    id: 1,
    title: 'Dasar-Dasar Statistik',
    description: 'Pelajari konsep dasar statistik dari nol!',
    thumbnail: 'https://placehold.co/600x400?text=Statistik',
  },
  {
    id: 2,
    title: 'Remote Sensing & GIS',
    description: 'Gabungkan data spasial untuk insight strategis.',
    thumbnail: 'https://placehold.co/600x400?text=GIS',
  },
]

const showModal = ref(false)
const selectedCourse = ref({})

function openModal(course) {
  selectedCourse.value = course
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
