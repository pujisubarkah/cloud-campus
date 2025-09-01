<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)]">
        
        <!-- Left Side - Illustration & Branding -->
        <div class="flex flex-col items-center justify-center text-center lg:text-left space-y-8 py-8 lg:py-12">
          <!-- Hero Image -->
          <div class="relative group mb-4">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <img 
              src="/LAN_9736.JPG" 
              alt="Learning Platform" 
              class="relative w-full max-w-lg rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500" 
            />
          </div>

          <!-- Branding Text -->
          <div class="space-y-6 px-4 lg:px-0">
            <div class="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg flex-shrink-0">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                </svg>
              </div>
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Akademi Pengentasan Kemiskinan
              </h1>
            </div>
            
            <p class="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 px-2 lg:px-0">
              Platform pembelajaran untuk membangun kapasitas, memperkuat ekonomi, dan mengentaskan kemiskinan
            </p>

            <!-- Features -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-lg mx-auto lg:mx-0 px-2 lg:px-0">
              <div class="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-blue-100 shadow-sm">
                <div class="bg-green-100 p-3 rounded-lg flex-shrink-0">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">Pembelajaran Terakreditasi</span>
              </div>
              
              <div class="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-blue-100 shadow-sm">
                <div class="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">Akses 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Login Form -->
        <div class="flex flex-col items-center justify-center py-8 lg:py-12">
          
          <!-- Login Form -->
          <div class="w-full max-w-md mx-auto px-4 sm:px-0">
            <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10 space-y-8">
              <!-- Header -->
              <div class="text-center space-y-4">
                <div class="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">Masuk ke Akun</h2>
                <p class="text-gray-600 px-2">Masuk dengan email dan kata sandi CloudCampus Anda</p>
              </div>

              <!-- Login Form -->
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Email Input -->
                <div class="space-y-3">
                  <label class="text-sm font-medium text-gray-700 block">Email</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                      </svg>
                    </div>
                    <input
                      type="email"
                      v-model="email"
                      placeholder="nama@email.com"
                      class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 bg-white/50 text-gray-800"
                      required
                    />
                  </div>
                </div>

                <!-- Password Input -->
                <div class="space-y-3">
                  <label class="text-sm font-medium text-gray-700 block">Kata Sandi</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <input
                      type="password"
                      v-model="password"
                      placeholder="Masukkan kata sandi"
                      class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 bg-white/50 text-gray-800"
                      required
                    />
                  </div>
                </div>

                <!-- Error Message -->
                <div v-if="errorMsg" class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <p class="text-red-600 text-sm font-medium">{{ errorMsg }}</p>
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  :disabled="loading"
                  class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mt-8"
                >
                  <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ loading ? 'Memproses...' : 'Masuk' }}</span>
                </button>

                <!-- Forgot Password -->
                <div class="text-center pt-4">
                  <NuxtLink to="/send-email" class="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors duration-200">
                    Lupa kata sandi?
                  </NuxtLink>
                </div>
              </form>

              <!-- Register Section -->
              <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 text-center border border-gray-200 mt-8">
                <p class="text-gray-700 font-medium mb-4">Belum punya akun CloudCampus?</p>
                <NuxtLink to="/signup" class="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  </svg>
                  Daftar Sekarang
                </NuxtLink>
              </div>

              <!-- Security Notice -->
              <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center mt-6">
                <div class="flex items-center justify-center gap-2 mb-3">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                  <span class="font-semibold text-yellow-800">Penting!</span>
                </div>
                <p class="text-sm text-yellow-700 leading-relaxed">
                  Gunakan akun Anda secara bijak dan <strong>JANGAN</strong> bagi pakai kepada orang lain.
                </p>
              </div>
            </div>
          </div>

          <!-- User Info (After Login) -->
          <div v-if="auth.user" class="mt-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-4">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                  {{ auth.user?.full_name?.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="font-semibold text-gray-800">{{ auth.user?.full_name }}</p>
                  <p class="text-sm text-gray-600">Berhasil masuk</p>
                </div>
              </div>
              <button 
                @click="auth.logout(); router.push('/')" 
                class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

// Prevent access if already logged in
const auth = useAuthStore()
const router = useRouter()

if (auth.isLoggedIn) {
  router.push('/my')
}

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

// Di halaman login, pastikan token disimpan ke store
const handleLogin = async () => {
  try {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    if (response.success && response.user) {
      // Simpan user dengan token ke store
      auth.login({
        id: String(response.user.id),
        email: response.user.email ?? '',
        full_name: response.user.full_name ?? '',
        role_id: response.user.role_id,
        token: response.user.token  // 👈 Token disimpan
      })

      // Redirect setelah login
      const redirect = localStorage.getItem('redirectAfterSignup')
      if (redirect) {
        localStorage.removeItem('redirectAfterSignup')
        router.push(redirect)
      } else {
        router.push('/my')
      }
    }
  } catch (error) {
    console.error('Login failed:', error)
    errorMsg.value = (typeof error === 'object' && error !== null && 'data' in error && typeof (error as any).data?.message === 'string')
      ? (error as any).data.message
      : 'Login gagal'
  }
}

async function handleSubmit() {
  loading.value = true
  errorMsg.value = ''
  try {
    type LoginResponse =
      | { success: boolean; user: { id: string; email: string; full_name: string; role_id: number; token: string }; error?: undefined }
      | { error: string; success?: undefined; user?: undefined };

    const res: LoginResponse = await ($fetch as any)('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    if ('success' in res && res.success && res.user) {
      auth.login({ 
        id: String(res.user.id), 
        full_name: res.user.full_name, 
        email: res.user.email,
        role_id: Number(res.user.role_id),
        token: res.user.token
      })
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

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

/* Custom backdrop blur */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

/* Smooth gradient animations */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: gradient-shift 4s ease infinite;
}
</style>