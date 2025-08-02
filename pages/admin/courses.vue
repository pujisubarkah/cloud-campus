<!-- pages/admin/courses.vue -->
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Kelola Kursus</h1>

    <!-- Search & Add Button -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
      <input
        v-model="search"
        type="text"
        placeholder="Cari kursus..."
        class="input input-bordered w-full md:max-w-xs"
      />
      <button class="btn btn-primary flex items-center gap-2" @click="openAddModal">
        <span class="text-lg">+</span> <span>Tambah Kursus</span>
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-xl shadow-lg bg-base-100">
      <table class="table w-full">
        <thead class="bg-blue-900 text-white">
          <tr>
            <th class="py-3">Judul</th>
            <th>Instruktur</th>
            <th>Status</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in filteredCourses" :key="course.id" class="hover:bg-blue-50 transition">
            <td class="font-semibold text-blue-900">{{ course.title }}</td>
            <td>{{ course.instructor }}</td>
            <td>
              <span
                :class="[
                  'badge px-3 py-2 text-xs font-semibold',
                  course.status === 'published'
                    ? 'badge-success bg-green-100 text-green-700'
                    : 'badge-warning bg-yellow-100 text-yellow-700'
                ]"
              >
                {{ course.status === 'published' ? 'Published' : 'Draft' }}
              </span>
            </td>
            <td class="text-center space-x-2">
              <button
                class="inline-flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition p-2"
                title="Edit Kursus"
                @click="editCourse(course)"
              >
                <Edit class="w-5 h-5" />
              </button>
              <button
                class="inline-flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-700 transition p-2"
                title="Hapus Kursus"
                @click="deleteCourse(course.id)"
              >
                <Trash2 class="w-5 h-5" />
              </button>
            </td>
          </tr>
          <tr v-if="filteredCourses.length === 0">
            <td colspan="4" class="text-center py-6 text-gray-400">Tidak ada kursus ditemukan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal tambah/ubah kursus -->
    <dialog ref="modal" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg mb-4">{{ isEditing ? 'Edit' : 'Tambah' }} Kursus</h3>
        <div class="form-control mb-3">
          <label class="label font-semibold">Judul Kursus</label>
          <input v-model="form.title" type="text" class="input input-bordered" />
        </div>
        <div class="form-control mb-3">
          <label class="label font-semibold">Instruktur</label>
          <input v-model="form.instructor" type="text" class="input input-bordered" />
        </div>
        <div class="form-control mb-3">
          <label class="label font-semibold">Status</label>
          <select v-model="form.status" class="select select-bordered">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div class="modal-action flex gap-2 justify-end mt-4">
          <button class="btn btn-primary" @click="saveCourse">Simpan</button>
          <button class="btn btn-outline" @click="closeModal">Batal</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

import { ref, computed } from 'vue'
import { Edit, Trash2 } from 'lucide-vue-next'

const search = ref('')
const modal = ref(null)
const isEditing = ref(false)
const editingId = ref(null)

const form = ref({
  title: '',
  instructor: '',
  status: 'draft'
})

const courses = ref([
  { id: 1, title: 'Belajar Nuxt 3', instructor: 'Kak Puji', status: 'published' },
  { id: 2, title: 'TailwindCSS Dasar', instructor: 'Budi Santoso', status: 'draft' }
])

const filteredCourses = computed(() =>
  courses.value.filter(c => c.title.toLowerCase().includes(search.value.toLowerCase()))
)

function openAddModal() {
  isEditing.value = false
  form.value = { title: '', instructor: '', status: 'draft' }
  modal.value.showModal()
}

function editCourse(course) {
  isEditing.value = true
  editingId.value = course.id
  form.value = { ...course }
  modal.value.showModal()
}

function saveCourse() {
  if (isEditing.value) {
    const index = courses.value.findIndex(c => c.id === editingId.value)
    if (index !== -1) {
      courses.value[index] = { ...form.value, id: editingId.value }
    }
  } else {
    const newId = Math.max(...courses.value.map(c => c.id)) + 1
    courses.value.push({ ...form.value, id: newId })
  }
  modal.value.close()
}

function deleteCourse(id) {
  courses.value = courses.value.filter(c => c.id !== id)
}

function closeModal() {
  modal.value.close()
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
