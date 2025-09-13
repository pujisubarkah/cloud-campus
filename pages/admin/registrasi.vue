<template>

    <div class="p-8 mt-20">
      <h1 class="text-2xl font-bold mb-6">Approval Registrasi User</h1>
      <div v-if="loading" class="text-center py-8">Loading...</div>
      <div v-else class="overflow-x-auto">
        
        <!-- Search Bar -->
        <div class="mb-4 flex justify-end">
          <input
            v-model="search"
            placeholder="Cari nama/email..."
            class="p-2 border rounded w-64"
          />
        </div>
        
        <table class="min-w-full bg-white rounded-xl shadow-lg border border-blue-200">
          <thead>
            <tr class="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white">
              <th class="py-4 px-6 text-left font-semibold">Nama</th>
              <th class="py-4 px-6 text-left font-semibold">Email</th>
              <th class="py-4 px-6 text-left font-semibold">NIP</th>
              <th class="py-4 px-6 text-left font-semibold">Role</th>
              <th class="py-4 px-6 text-left font-semibold">Status</th>
              <th class="py-4 px-6 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="border-b hover:bg-blue-50 transition">
              <td class="py-3 px-6 flex items-center gap-3">
                <img :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=random&seed=${user.avatar_seed}`" class="w-8 h-8 rounded-full shadow" />
                <span class="font-medium">{{ user.full_name }}</span>
              </td>
              <td class="py-3 px-6 text-blue-700">{{ user.email }}</td>
              <td class="py-3 px-6 text-gray-600">{{ user.nip || '-' }}</td>
              <td class="py-3 px-6">
                <select
                  v-model="user.role_id"
                  @change="updateRole(user.id, Number(user.role_id))"
                  class="px-3 py-1 rounded-full text-xs font-semibold border border-gray-300 bg-white focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.nama }}
                  </option>
                </select>
              </td>
              <td class="py-3 px-6">
                <span v-if="user.is_verified" class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Disetujui</span>
                <span v-else class="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold">Menunggu</span>
              </td>
              <td class="py-3 px-6">
                <div class="flex gap-2">
                  <button v-if="!user.is_verified" @click="approveUser(user.id)" class="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-3 py-2 rounded-lg shadow font-semibold transition flex items-center gap-2">
                    <CheckIcon class="w-4 h-4" />
                    Approve
                  </button>
                  <button v-else disabled class="bg-gray-200 text-gray-500 px-3 py-2 rounded-lg shadow font-semibold cursor-not-allowed flex items-center gap-2">
                    <CheckIcon class="w-4 h-4" />
                    Approved
                  </button>
                  <button @click="deleteUser(user.id)" class="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white px-3 py-2 rounded-lg shadow font-semibold transition flex items-center gap-2">
                    <Trash2Icon class="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Pagination -->
        <div class="flex items-center justify-between mt-6">
          <div class="text-sm text-gray-600">
            Menampilkan {{ ((currentPage - 1) * itemsPerPage) + 1 }} - {{ Math.min(currentPage * itemsPerPage, totalUsers) }} dari {{ totalUsers }} user
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click="goToPage(currentPage - 1)" 
              :disabled="currentPage === 1"
              class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              <ChevronLeftIcon class="w-4 h-4" />
              Previous
            </button>
            
            <div class="flex gap-1">
              <template v-for="(page, pageIdx) in visiblePages" :key="`page-${pageIdx}`">
                <button 
                  v-if="typeof page === 'number'"
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-2 rounded-lg transition',
                    page === currentPage 
                      ? 'bg-blue-600 text-white' 
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
                <span
                  v-else
                  class="px-3 py-2 rounded-lg text-gray-400 select-none"
                >
                  {{ page }}
                </span>
              </template>
            </div>
            
            <button 
              @click="goToPage(currentPage + 1)" 
              :disabled="currentPage === totalPages"
              class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              Next
              <ChevronRightIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/main.vue'
import { ref, onMounted, computed } from 'vue'
import { CheckIcon, Trash2Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import { definePageMeta } from '#imports' // Pastikan ini sesuai dengan framework Anda (Nuxt 3?)

definePageMeta({ layout: 'admin' })

// State
const allUsers = ref<Array<{ id: string, full_name: string, email: string, role: string, role_id: number, is_verified: boolean, nip: string | null, avatar_seed: string | null }>>([])
const loading = ref(true)
const roles = ref<Array<{ id: number, nama: string }>>([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const search = ref('')

// Computed
const totalUsers = computed(() => allUsers.value.length)
const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage.value))

const users = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return allUsers.value.slice(start, end)
})

const visiblePages = computed<(number | string)[]>(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

const filteredUsers = computed(() =>
  allUsers.value.filter(u =>
    u.full_name.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
  )
)

// Methods
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

async function fetchUsers() {
  loading.value = true
  try {
    const response = await $fetch('/api/users')
    if ('users' in response && Array.isArray(response.users)) {
      allUsers.value = response.users
    } else if ('user' in response && response.user) {
      allUsers.value = [response.user]
    } else {
      allUsers.value = []
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  }
  loading.value = false
}

async function fetchRoles() {
  try {
    const response = await $fetch('/api/role')
    if ('roles' in response && Array.isArray(response.roles)) {
      roles.value = response.roles
    } else {
      roles.value = []
    }
  } catch (error) {
    console.error('Error fetching roles:', error)
  }
}

async function approveUser(id: string) {
  try {
    await $fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: { is_verified: true }
    })
    const user = allUsers.value.find(u => u.id === id)
    if (user) user.is_verified = true
    
    try {
      await $fetch('/api/admin/send-verification-email', {
        method: 'POST',
        body: { userId: id }
      })
      alert('User berhasil di-approve dan email verifikasi telah dikirim!')
    } catch (emailError) {
      console.error('Error sending verification email:', emailError)
      alert('User berhasil di-approve, tapi gagal mengirim email verifikasi!')
    }
  } catch (error) {
    console.error('Error approving user:', error)
    alert('Gagal approve user!')
  }
}

async function deleteUser(id: string) {
  if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
    try {
      await $fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      allUsers.value = allUsers.value.filter(u => u.id !== id)
      alert('User berhasil dihapus!')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Gagal menghapus user!')
    }
  }
}

async function updateRole(id: string, newRoleId: number) {
  try {
    await $fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: { role_id: newRoleId }
    })
    const user = allUsers.value.find(u => u.id === id)
    if (user) user.role_id = newRoleId
  } catch (error) {
    console.error('Error updating role:', error)
  }
}

// Lifecycle
onMounted(() => {
  fetchUsers()
  fetchRoles()
})
</script>

<style scoped>
/* Tambahkan style tambahan jika diperlukan */
</style>