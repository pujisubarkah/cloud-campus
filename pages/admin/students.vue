<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Daftar Siswa</h1>

    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>NIP</th>
            <th>Kursus Diikuti</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="text-center">Loading...</td>
          </tr>
          <tr v-else-if="students.length === 0">
            <td colspan="6" class="text-center">Tidak ada data siswa</td>
          </tr>
          <tr v-else v-for="student in students" :key="student.id">
            <td>
              <div class="flex items-center gap-3">
                <img :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(student.full_name)}&background=random&seed=${student.avatar_seed}`" 
                     class="w-8 h-8 rounded-full" />
                <span>{{ student.full_name }}</span>
              </div>
            </td>
            <td>{{ student.email }}</td>
            <td>{{ student.nip || '-' }}</td>
            <td>{{ student.total_courses }} kursus</td>
            <td>
              <span :class="student.is_active ? 'badge badge-success' : 'badge badge-warning'">
                {{ student.is_active ? 'Aktif' : 'Tidak Aktif' }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-info mr-2">Detail</button>
              <button class="btn btn-sm btn-error">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

const students = ref([])
const loading = ref(true)

async function fetchStudents() {
  loading.value = true
  try {
    const response = await $fetch('/api/users/students')
    if ('users' in response && Array.isArray(response.users)) {
      students.value = response.users
    } else {
      students.value = []
    }
  } catch (error) {
    console.error('Error fetching students:', error)
    students.value = []
  }
  loading.value = false
}

onMounted(fetchStudents)
</script>
