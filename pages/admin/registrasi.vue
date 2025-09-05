<template>
  <MainLayout role="admin">
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-6">Approval Registrasi User</h1>
      <div v-if="loading" class="text-center py-8">Loading...</div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-xl shadow-lg border border-blue-200">
          <thead>
            <tr class="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white">
              <th class="py-4 px-6 text-left font-semibold">Nama</th>
              <th class="py-4 px-6 text-left font-semibold">Email</th>
              <th class="py-4 px-6 text-left font-semibold">Role</th>
              <th class="py-4 px-6 text-left font-semibold">Status</th>
              <th class="py-4 px-6 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b hover:bg-blue-50 transition">
              <td class="py-3 px-6 flex items-center gap-3">
                <img :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`" class="w-8 h-8 rounded-full shadow" />
                <span class="font-medium">{{ user.name }}</span>
              </td>
              <td class="py-3 px-6 text-blue-700">{{ user.email }}</td>
              <td class="py-3 px-6">
                <span :class="user.role === 'Instruktur' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'" class="px-3 py-1 rounded-full text-xs font-semibold">
                  {{ user.role }}
                </span>
              </td>
              <td class="py-3 px-6">
                <span v-if="user.approved" class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Disetujui</span>
                <span v-else class="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold">Menunggu</span>
              </td>
              <td class="py-3 px-6">
                <button v-if="!user.approved" @click="approveUser(user.id)" class="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-lg shadow font-semibold transition">Approve</button>
                <button v-else disabled class="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg shadow font-semibold cursor-not-allowed">Approved</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/main.vue'
import { ref, onMounted } from 'vue'
// Ganti dengan API fetch sesuai backend Anda
const users = ref<Array<{ id: number, name: string, email: string, role: string, approved: boolean }>>([])
const loading = ref(true)

async function fetchUsers() {
  loading.value = true
  // Dummy data, ganti dengan fetch API
  users.value = [
    { id: 1, name: 'Budi', email: 'budi@email.com', role: 'Siswa', approved: false },
    { id: 2, name: 'Siti', email: 'siti@email.com', role: 'Instruktur', approved: true },
    { id: 3, name: 'Joko', email: 'joko@email.com', role: 'Siswa', approved: false }
  ]
  loading.value = false
}

async function approveUser(id: number) {
  // Implementasi API approve user
  const user = users.value.find(u => u.id === id)
  if (user) user.approved = true
  // TODO: Kirim request ke backend untuk update status
}

onMounted(fetchUsers)
</script>

<style scoped>
/* Tambahkan style tambahan jika diperlukan */
</style>
