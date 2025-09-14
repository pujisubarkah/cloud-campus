<template>
  <div class="max-w-md mx-auto mt-24 p-8 bg-white rounded-xl shadow-lg outline outline-2 outline-blue-900">
    <h2 class="text-2xl font-bold mb-6 text-blue-900">Ganti Password</h2>
    <form @submit.prevent="handleChangePassword">
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Password Lama</label>
        <input v-model="oldPassword" type="password" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Password Baru</label>
        <input v-model="newPassword" type="password" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-medium mb-2">Konfirmasi Password Baru</label>
        <input v-model="confirmPassword" type="password" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
      </div>
      <button type="submit" class="bg-blue-900 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition w-full flex items-center justify-center gap-2" :disabled="loading">
        <span v-if="loading">Menyimpan...</span>
        <span v-else>
          <i class="fas fa-key"></i>
          Ganti Password
        </span>
      </button>
      <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
      <p v-if="success" class="mt-4 text-green-600">{{ success }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')
const auth = useAuthStore()

async function handleChangePassword() {
  error.value = ''
  success.value = ''
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Konfirmasi password baru tidak cocok.'
    return
  }
  loading.value = true
  try {
    await $fetch('/api/users/change-password', {
      method: 'POST',
      body: {
        old_password: oldPassword.value,
        new_password: newPassword.value
      },
      headers: {
        Authorization: `Bearer ${auth.user?.token}`
      }
    })
    success.value = 'Password berhasil diganti.'
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (e: any) {
    error.value = e?.data?.message || 'Gagal mengganti password.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Remove custom .input and .btn-primary classes since Tailwind classes are used directly in the template */
</style>
