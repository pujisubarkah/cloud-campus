<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-300 font-poppins pt-20 pb-8">
    <!-- Ilustrasi Signup -->
    <div class="hidden md:flex md:w-1/2 items-center justify-center relative p-8 lg:p-12">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-blue-300/20 to-blue-700/20 backdrop-blur-md rounded-3xl m-6 lg:m-8 shadow-2xl"></div>
      <img src="/LAN_9802.JPG" alt="signup" class="max-w-[80%] lg:max-w-[85%] rounded-2xl shadow-2xl border-4 border-blue-400 relative z-10" />
    </div>

    <!-- Form Signup -->
    <div class="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
      <div class="w-full max-w-lg mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl lg:text-4xl font-bold text-blue-800 mb-3 drop-shadow">Mulai Belajar</h1>
          <p class="text-blue-600 text-lg leading-relaxed px-4 sm:px-0">Masuki pembelajaran pengentasan kemiskinan bersama kami</p>
        </div>
        <!-- Success Message & Form (adjacent v-if/v-else) -->
        <transition name="fade">
          <div v-if="registrationSuccess" class="bg-white/90 rounded-3xl shadow-2xl border-2 border-blue-200 p-8 lg:p-10 flex flex-col items-center justify-center animate-in">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-blue-500 mb-6" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 00-1.414-1.414L9 11.586 7.707 10.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <h2 class="text-2xl lg:text-3xl font-bold text-blue-700 mb-4 text-center">Registrasi Berhasil!</h2>
            <p class="text-gray-700 text-center mb-8 leading-relaxed px-4">
              Registrasi anda telah berhasil.<br>
              Silakan lanjutkan dengan login untuk mendaftar materi pembelajaran.
            </p>
            <button @click="goToLogin" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
              Lanjut ke Login
            </button>
          </div>
          <form v-else class="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-blue-100 p-6 sm:p-8 lg:p-10 space-y-8 animate-in" @submit.prevent="submitSignup">
          <!-- Error Message -->
          <transition name="fade">
            <div v-if="error" class="mb-6 px-5 py-4 rounded-xl bg-red-100 text-red-700 border border-red-300 text-sm font-medium flex items-center gap-3 animate-in">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8 4a1 1 0 100-2 1 1 0 000 2zm-.75-7a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0V7z" clip-rule="evenodd" />
              </svg>
              <span>{{ error }}</span>
            </div>
          </transition>
          <!-- Avatar Selection -->
          <div class="mb-8 flex flex-col items-center">
            <div class="relative mb-4">
              <img 
                :src="avatarUrl" 
                alt="Avatar Preview" 
                class="w-32 h-32 rounded-full shadow-lg border-4 border-blue-500 object-cover ring-4 ring-blue-200 animate-in"
              />
              <button 
                type="button"
                @click="randomizeAvatar"
                class="absolute bottom-0 right-0 bg-white p-3 rounded-full shadow-md border hover:bg-blue-100 transform hover:scale-110 transition-all duration-200"
                aria-label="Randomize Avatar"
              >
                🎲
              </button>
            </div>
            <p class="text-sm text-blue-600 text-center px-4">Pilih avatarmu — bisa dikustom atau acak</p>
          </div>
          <!-- Input fields -->
          <div class="space-y-6">
            <!-- Nama Lengkap -->
            <div class="relative group">
              <input type="text" name="name" placeholder="Nama Lengkap" 
                class="input input-bordered w-full pl-12 pr-4 py-4 bg-white/50 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 shadow-sm" 
                v-model="name" />
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-hover:text-blue-600 transition-colors duration-300">
                <User :size="20" />
              </span>
            </div>
            <!-- Email -->
            <div class="relative group">
              <input type="email" name="email" placeholder="Email" 
                class="input input-bordered w-full pl-12 pr-4 py-4 bg-white/50 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 shadow-sm" 
                v-model="email" />
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-hover:text-blue-600 transition-colors duration-300">
                <Mail :size="20" />
              </span>
            </div>
            <!-- NIP -->
            <div class="relative group">
              <input type="text" name="nip" placeholder="NIP (Khusus ASN)" 
                class="input input-bordered w-full pl-12 pr-4 py-4 bg-white/50 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 shadow-sm" 
                v-model="nip" />
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-hover:text-blue-600 transition-colors duration-300">
                <IdCard :size="20" />
              </span>
            </div>
            <!-- Password fields -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="relative group">
                  <input type="password" name="password" placeholder="Kata Sandi" 
                    class="input input-bordered w-full pl-12 pr-4 py-4 bg-white/50 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 shadow-sm" 
                    v-model="password" />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-hover:text-blue-600 transition-colors duration-300">
                    <Lock :size="20" />
                  </span>
                </div>
                <progress class="progress progress-info w-full h-2" :value="passwordStrength" max="100"></progress>
                <div class="text-xs text-blue-700 space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p class="font-medium mb-2">Password harus memiliki:</p>
                  <ul class="list-disc list-inside space-y-1">
                    <li>Minimal 1 huruf kapital</li>
                    <li>Minimal 1 huruf kecil</li>
                    <li>Minimal 1 angka</li>
                    <li>Minimal 1 karakter spesial</li>
                    <li>Minimal 8 karakter</li>
                  </ul>
                </div>
              </div>
              <div class="relative group">
                <input type="password" name="password2" placeholder="Ulangi Kata Sandi" 
                  class="input input-bordered w-full pl-12 pr-4 py-4 bg-white/50 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 shadow-sm" 
                  v-model="password2" />
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-hover:text-blue-600 transition-colors duration-300">
                  <Lock :size="20" />
                </span>
              </div>
            </div>
          </div>
          <!-- Button -->
          <button id="submitdata" type="submit" 
            class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 mt-8">
            Daftar
          </button>
          <!-- Tambahkan info badge reCAPTCHA di bawah tombol submit -->
          <div class="flex items-center justify-center mt-2 text-xs text-gray-400">
            <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#4285F4" stroke-width="2"/><path d="M8 12l2 2 4-4" stroke="#34A853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Halaman ini dilindungi oleh Google reCAPTCHA
          </div>
        </form>
        </transition>
        <!-- Link login -->
        <div class="text-center mt-8 pt-6">
          <p class="text-blue-700 text-lg">
            Sudah punya akun? 
            <a href="/login" class="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-300 ml-2">Masuk di sini</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, IdCard, Mail, Lock } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useReCaptcha } from 'vue-recaptcha-v3'

const router = useRouter()
const recaptcha = useReCaptcha()

// Form data
const name = ref('')
const email = ref('')
const nip = ref('')
const password = ref('')
const password2 = ref('')
const passwordStrength = ref(0)
const isLoading = ref(false)
const error = ref('')
const registrationSuccess = ref(false)

// Avatar handling
const avatarUrl = ref('https://api.dicebear.com/7.x/avataaars/svg?seed=1')
const currentSeed = ref(1)

const randomizeAvatar = () => {
  currentSeed.value = Math.floor(Math.random() * 1000)
  avatarUrl.value = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentSeed.value}`
}

const validateForm = () => {
  if (!name.value || !email.value || !password.value || !password2.value) {
    error.value = 'Semua field harus diisi'
    return false
  }

  if (password.value !== password2.value) {
    error.value = 'Password tidak sama'
    return false
  }


  return true
}

const submitSignup = async () => {
  try {
    error.value = ''
    if (!validateForm()) return
    isLoading.value = true
    // Jalankan reCAPTCHA sebelum submit
    let recaptchaToken = ''
    if (recaptcha && recaptcha.executeRecaptcha) {
      try {
        recaptchaToken = await recaptcha.executeRecaptcha('signup')
      } catch (e) {
        error.value = 'Gagal validasi reCAPTCHA. Silakan coba lagi.'
        isLoading.value = false
        return
      }
    } else {
      error.value = 'reCAPTCHA tidak tersedia.'
      isLoading.value = false
      return
    }
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: name.value,
        email: email.value,
        password: password.value,
        nip: nip.value || undefined,
        avatar_seed: currentSeed.value.toString(),
        recaptcha_token: recaptchaToken // kirim token ke backend
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Gagal mendaftar')
    }

    // Registration successful
    registrationSuccess.value = true

  } catch (e) {
    error.value = (e instanceof Error ? e.message : 'Terjadi kesalahan saat mendaftar')
    console.error('Signup error:', e)
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push({
    path: '/login',
    query: { 
      message: 'Pendaftaran berhasil! Silakan login dengan akun Anda.' 
    }
  })
}

// Initialize with random avatar
randomizeAvatar()
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
}
.animate-in {
  animation: fadeInUp 0.7s cubic-bezier(.4,0,.2,1);
}
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
