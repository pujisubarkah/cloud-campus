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
              Silakan menunggu verifikasi dari admin sebelum dapat login dan mendaftar materi pembelajaran.
            </p>
            <button @click="goToLogin" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
              Lanjut ke Login
            </button>
          </div>
          <form v-else class="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-blue-100 p-6 sm:p-8 lg:p-10 space-y-8 animate-in" @submit.prevent="openConfirmModal">
      <!-- Modal Konfirmasi -->
      <div v-if="showConfirmModal" class="fixed inset-0 z-[999999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto flex flex-col items-center">
          <h3 class="text-xl font-bold text-blue-700 mb-4 text-center">Konfirmasi Data</h3>
          <p class="text-gray-700 mb-4 text-center">Apakah Anda yakin data yang terinput sudah benar?</p>
          <div class="mb-4 text-sm text-blue-700 bg-blue-50 rounded-lg border border-blue-200 p-4 w-full">
            <div><span class="font-semibold">Email Anda:</span> {{ email }}</div>
          </div>
          <div class="flex gap-4 mt-2">
            <button type="button" @click="showConfirmModal = false" class="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Batal</button>
            <button type="button" @click="handleConfirmSubmit" class="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">Ya, kirim</button>
          </div>
        </div>
      </div>
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
            <!--
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
            -->
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
                <progress class="progress w-full h-3" 
                  :class="passwordStrength >= 100 ? 'progress-success' : passwordStrength >= 60 ? 'progress-warning' : 'progress-error'" 
                  :value="passwordStrength" max="100"></progress>
                <div class="text-xs text-center mt-1">
                  <span :class="passwordStrength >= 100 ? 'text-green-600 font-semibold' : passwordStrength >= 60 ? 'text-yellow-600' : 'text-red-600'">
                    {{ passwordStrength >= 100 ? 'Kuat' : passwordStrength >= 60 ? 'Sedang' : 'Lemah' }}
                  </span>
                </div>
                <div class="text-xs text-blue-700 space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p class="font-medium mb-2">Password harus memiliki:</p>
                  <ul class="list-disc list-inside space-y-1">
                    <li :class="passwordChecks.kapital ? 'text-green-600 font-semibold' : ''">Minimal 1 huruf kapital</li>
                    <li :class="passwordChecks.kecil ? 'text-green-600 font-semibold' : ''">Minimal 1 huruf kecil</li>
                    <li :class="passwordChecks.angka ? 'text-green-600 font-semibold' : ''">Minimal 1 angka</li>
                    <li :class="passwordChecks.spesial ? 'text-green-600 font-semibold' : ''">Minimal 1 karakter spesial</li>
                    <li :class="passwordChecks.panjang ? 'text-green-600 font-semibold' : ''">Minimal 8 karakter</li>
                  </ul>
                </div>
              </div>
              <div class="space-y-4">
                <div class="relative group">
                  <input type="password" name="password2" placeholder="Ulangi Kata Sandi" 
                    class="input input-bordered w-full pl-12 pr-4 py-4 bg-white/50 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 shadow-sm" 
                    v-model="password2" />
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-hover:text-blue-600 transition-colors duration-300">
                    <Lock :size="20" />
                  </span>
                </div>
                <!-- Indikator kecocokan password -->
                <div v-if="password2" class="text-xs p-3 rounded-lg border">
                  <div v-if="password === password2" class="text-green-600 bg-green-50 border-green-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Password cocok
                  </div>
                  <div v-else class="text-red-600 bg-red-50 border-red-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    Password tidak cocok
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Button -->
          <button id="submitdata" type="submit" 
            :disabled="!isFormValid || isLoading"
            :class="[
              'w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 mt-8',
              isFormValid && !isLoading 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]">
            <span v-if="isLoading">Mendaftar...</span>
            <span v-else>{{ isFormValid ? 'Daftar' : 'Lengkapi Form' }}</span>
          </button>
          <!-- Link login -->
        <div class="text-center mt-8 pt-6">
          <p class="text-blue-700 text-lg">
            Sudah punya akun? 
            <a href="/login" class="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-300 ml-2">Masuk di sini</a>
          </p>
        </div>
        </form>
        </transition>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { User, IdCard, Mail, Lock } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useAuthStore } from '~/stores/auth'
import { useFetch } from '#app'

const router = useRouter()
const recaptcha = useReCaptcha()
const auth = useAuthStore()

// Form data
const name = ref('')
const email = ref('')
const nip = ref('')
const password = ref('')
const password2 = ref('')
const passwordStrength = ref(0)
const passwordChecks = ref({
  kapital: false,
  kecil: false,
  angka: false,
  spesial: false,
  panjang: false
})

// Computed property untuk mengecek apakah password valid
const isPasswordValid = computed(() => {
  return passwordChecks.value.kapital && 
         passwordChecks.value.kecil && 
         passwordChecks.value.angka && 
         passwordChecks.value.spesial && 
         passwordChecks.value.panjang
})

// Computed property untuk mengecek apakah form siap disubmit
const isFormValid = computed(() => {
  return name.value && 
         email.value && 
         password.value && 
         password2.value && 
         isPasswordValid.value && 
         password.value === password2.value
})

const showConfirmModal = ref(false)

function openConfirmModal() {
  if (!isFormValid.value) {
    if (!validateForm()) return
  }
  showConfirmModal.value = true
}

async function handleConfirmSubmit() {
  showConfirmModal.value = false
  await submitSignup()
}

function checkPasswordStrength(pw: string) {
  passwordChecks.value.kapital = /[A-Z]/.test(pw)
  passwordChecks.value.kecil = /[a-z]/.test(pw)
  passwordChecks.value.angka = /[0-9]/.test(pw)
  passwordChecks.value.spesial = /[^A-Za-z0-9]/.test(pw)
  passwordChecks.value.panjang = pw.length >= 8
  let score = 0
  Object.values(passwordChecks.value).forEach((v: boolean) => { if (v) score += 20 })
  passwordStrength.value = score
}

watch(password, (val: string) => {
  checkPasswordStrength(val)
  // Clear error jika password valid
  if (val && passwordChecks.value.kapital && passwordChecks.value.kecil && 
      passwordChecks.value.angka && passwordChecks.value.spesial && passwordChecks.value.panjang) {
    if (error.value && error.value.includes('Password harus')) {
      error.value = ''
    }
  }
})

// Tambahkan watcher untuk password2 untuk validasi kecocokan
watch(password2, (val: string) => {
  if (val && password.value && val !== password.value) {
    // Tidak set error di sini untuk menghindari gangguan saat mengetik
  } else if (val && password.value && val === password.value) {
    if (error.value === 'Password tidak sama') {
      error.value = ''
    }
  }
})

const isLoading = ref(false)
const error = ref('')
const registrationSuccess = ref(false)

// Avatar handling
// const avatarUrl = ref('https://api.dicebear.com/7.x/avataaars/svg?seed=1')
// const currentSeed = ref(1)
// 
// const randomizeAvatar = () => {
//   currentSeed.value = Math.floor(Math.random() * 1000)
//   avatarUrl.value = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentSeed.value}`
// }

const validateForm = () => {
  if (!name.value || !email.value || !password.value || !password2.value) {
    error.value = 'Semua field harus diisi'
    return false
  }

  if (password.value !== password2.value) {
    error.value = 'Password tidak sama'
    return false
  }

  // Validasi aturan password
  if (!passwordChecks.value.kapital) {
    error.value = 'Password harus mengandung minimal 1 huruf kapital'
    return false
  }

  if (!passwordChecks.value.kecil) {
    error.value = 'Password harus mengandung minimal 1 huruf kecil'
    return false
  }

  if (!passwordChecks.value.angka) {
    error.value = 'Password harus mengandung minimal 1 angka'
    return false
  }

  if (!passwordChecks.value.spesial) {
    error.value = 'Password harus mengandung minimal 1 karakter spesial'
    return false
  }

  if (!passwordChecks.value.panjang) {
    error.value = 'Password harus minimal 8 karakter'
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
        // avatar_seed: currentSeed.value.toString(),
        recaptcha_token: recaptchaToken // kirim token ke backend
      })
    })

    const data = await response.json()

    if (!data.success) {
      error.value = data.message || 'Gagal mendaftar. Silakan coba lagi.'
      isLoading.value = false
      return
    }

    // Registration successful
    registrationSuccess.value = true

    // Send admin notification
    await sendAdminNotification(data.user)

  } catch (e) {
    error.value = (e instanceof Error ? e.message : 'Terjadi kesalahan saat mendaftar')
    console.error('Signup error:', e)
  } finally {
    isLoading.value = false
  }
}

async function sendAdminNotification(newUser: { id: string; token: string }) {
  const adminId = '550e8400-e29b-41d4-a716-446655440000';
  await $fetch('/api/notifikasi', {
    method: 'POST',
    body: {
      user_id: adminId,
      pesan: 'Ada pendaftar baru',
      dibaca: false,
      created_by: newUser.id
    },
    headers: {
      'Authorization': `Bearer ${newUser.token}`
    }
  })
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
// randomizeAvatar()
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
