<template>
  <div class="flex flex-col md:flex-row min-h-screen items-center justify-center bg-base-100">
    <!-- Ilustrasi Login -->
    <div class="hidden md:flex md:w-2/3 items-center justify-center">
      <img src="/LAN_9736.JPG" alt="login" class="max-w-[80%]" />
    </div>

    <!-- Form Login -->
    <div class="w-full md:w-1/3 flex flex-col items-center justify-center">
      <!-- Form Utama: Pilih Institusi -->
      <div v-if="!showOtherForm" class="bg-base-200 rounded-xl shadow-lg border border-base-300 p-10 w-full max-w-md mb-6">
        <div class="mb-8 text-primary">
          <p class="text-2xl font-bold text-center font-nunito">Selamat Datang di Akademi Pengentasan Kemiskinan</p>
          <p class="text-base text-center font-nunito font-light">
            Platform pembelajaran untuk membangun kapasitas, memperkuat ekonomi, dan mengentaskan kemiskinan
          </p>
        </div>
        <div class="mb-8 mt-6 text-primary">
          <p class="text-base text-center font-nunito font-bold">Dari mana Anda berasal?</p>
        </div>
        <div class="mb-4">
          <a id="signinlan-btn" class="btn btn-primary w-full font-nunito font-bold text-base">
            Lembaga Administrasi Negara
          </a>
        </div>
        <div class="mb-4">
          <button class="btn btn-outline btn-primary w-full font-nunito font-bold text-base" @click="showOtherForm = true">
            Selain Lembaga Administrasi Negara
          </button>
        </div>
        <p class="text-xs text-center font-nunito text-gray-500 mt-6">
          Gunakan akun Anda secara bijak <br />dan <strong>JANGAN</strong> bagi pakai akun Anda kepada orang lain.
        </p>
      </div>

      <!-- Form Selain LAN (Login KLC) -->
      <div v-else class="bg-base-200 rounded-xl shadow-lg border border-base-300 p-8 w-full max-w-md mb-6 animate__animated animate__fadeIn">
        <!-- Tombol Kembali -->
        <div class="mb-4 flex items-center cursor-pointer" @click="showOtherForm = false">
          <span class="text-primary"><i class="fa fa-arrow-left"></i></span>
          <span class="ml-2 text-primary font-medium">Kembali</span>
        </div>
        <div class="border-b border-base-300 my-3"></div>

        <!-- Judul Form -->
        <div class="mb-4 text-primary text-center">
          <p class="text-base font-nunito font-bold">Akun CloudCampus</p>
          <p class="text-sm font-nunito text-gray-600">Masuk dengan email dan kata sandi</p>
        </div>

        <!-- Form Login -->
        <form @submit.prevent="handleSubmit">
          <div class="mb-4 relative">
            <input
              type="text"
              name="email"
              placeholder="Email"
              class="input input-bordered w-full pl-10 py-2"
              v-model="email"
              required
            />
            <span class="absolute left-3 top-2 text-primary"><i class="fas fa-envelope"></i></span>
          </div>

          <div class="mb-6 relative">
            <input
              type="password"
              name="password"
              placeholder="Kata Sandi"
              class="input input-bordered w-full pl-10 py-2"
              v-model="password"
              required
            />
            <span class="absolute left-3 top-2 text-primary"><i class="fas fa-lock"></i></span>
          </div>

          <div v-if="errorMsg" class="text-red-500 text-sm mb-2 text-center">{{ errorMsg }}</div>

          <!-- Tombol Masuk -->
          <div class="flex justify-center mb-4">
            <button id="submitdata" type="submit" class="btn btn-primary w-[60%]" :disabled="loading">
              <span v-if="loading">Memproses...</span>
              <span v-else>Masuk</span>
            </button>
          </div>

          <!-- Lupa Kata Sandi -->
          <div class="mt-2 text-right">
            <a href="/send-email" class="text-green-600 text-sm hover:underline">Lupa kata sandi?</a>
          </div>
        </form>

        <!-- Daftar -->
        <div class="bg-base-100 rounded-xl shadow p-4 mt-6">
          <p class="text-center text-base font-medium">Belum punya Akun CloudCampus?</p>
          <div class="flex justify-center mt-2 pb-4">
            <a href="/signup" class="btn btn-primary w-[80%] text-sm font-medium">Daftar</a>
          </div>
        </div>
      </div>

      <!-- User Info (Setelah Login) -->
      <div v-if="auth.user" class="flex items-center gap-2 mt-4">
        <span class="inline-flex items-center gap-1 text-blue-50 font-semibold text-sm sm:text-base">
          <i class="fas fa-user-circle text-lg"></i>
          {{ auth.user?.name }}
        </span>
        <button @click="auth.logout(); router.push('/')" class="border border-blue-400/30 bg-blue-500/30 backdrop-blur-sm text-blue-50 py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg cursor-pointer text-sm sm:text-base font-medium hover:bg-blue-400/40 hover:border-blue-300/40 transition-all duration-200 whitespace-nowrap flex items-center gap-2">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const showOtherForm = ref(false)
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const auth = useAuthStore()
const router = useRouter()

async function handleSubmit() {
  loading.value = true
  errorMsg.value = ''
  try {
    type LoginResponse =
      | { success: boolean; user: { id: string; email: string; full_name: string; role_id: number }; error?: undefined }
      | { error: string; success?: undefined; user?: undefined };

    const res = await $fetch<LoginResponse>('/api/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    if ('success' in res && res.success && res.user) {
      auth.login({ id: Number(res.user.id), name: res.user.full_name, role_id: Number(res.user.role_id) })
      // Redirect sesuai role_id
      if (res.user.role_id === 1) {
        router.push('/admin')
      } else if (res.user.role_id === 2) {
        router.push('/instructor')
      } else {
        router.push('/my')
      }
    } else {
      errorMsg.value = res.error || 'Login gagal. Silakan coba lagi.'
    }
  } catch (err) {
    errorMsg.value = 'Terjadi kesalahan. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>