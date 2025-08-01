<template>
  <div class="flex flex-col md:flex-row min-h-screen items-center justify-center bg-base-100">
    <!-- Ilustrasi Login -->
    <div class="hidden md:flex md:w-2/3 items-center justify-center">
      <img src="/LAN_9736.JPG" alt="login" class="max-w-[80%]" />
    </div>
    <!-- Form Login -->
    <div class="w-full md:w-1/3 flex flex-col items-center justify-center">
      <div v-if="!showOtherForm" class="bg-base-200 rounded-xl shadow-lg border border-base-300 p-10 w-full max-w-md mb-6">
        <div class="mb-8 text-primary">
          <p class="text-2xl font-bold text-center font-nunito">Selamat Datang di Cloud Campus!</p>
          <p class="text-base text-center font-nunito font-light">Masuk untuk mengeksplorasi galaksi pengetahuan!</p>
        </div>
        <div class="mb-8 mt-6 text-primary">
          <p class="text-base text-center font-nunito font-bold">Dari mana Anda berasal?</p>
        </div>
        <div class="mb-4">
          <a id="signinlan-btn" class="btn btn-primary w-full font-nunito font-bold text-base">Lembaga Administrasi Negara</a>
        </div>
        <div class="mb-4">
          <button class="btn btn-outline btn-primary w-full font-nunito font-bold text-base" @click="showOtherForm = true">Selain Lembaga Administrasi Negara</button>
        </div>
        <p class="text-xs text-center font-nunito text-gray-500 mt-6">Gunakan akun Anda secara bijak <br>dan <strong>JANGAN</strong> bagi pakai akun Anda kepada orang lain.</p>
      </div>
      <!-- Form Selain LAN -->
      <div v-else class="bg-base-200 rounded-xl shadow-lg border border-base-300 p-8 w-full max-w-md mb-6 animate__animated animate__fadeIn">
        <div class="mb-4 flex items-center cursor-pointer" @click="showOtherForm = false">
          <span class="text-primary"><i class="fa fa-arrow-left"></i></span>
          <span class="ml-2 text-primary font-medium">Kembali</span>
        </div>
        <div class="border-b border-base-300 my-3"></div>
        <div class="mb-6 text-center">
          <a id="signingoogle-btn" class="btn w-[85%] text-white font-medium text-sm" style="background-color:#db4437; border-color:#cb2e1a" @click.prevent="signInWithGoogle">
            <i class="fab fa-google-plus-g mr-2"></i> Masuk dengan Google
          </a>
        </div>
        <div class="border-b border-base-300 my-6 text-center relative">
          <span class="absolute left-1/2 -translate-x-1/2 -top-3 bg-base-200 px-2 text-xs text-gray-400">atau</span>
        </div>
        <div class="mb-4 text-primary">
          <p class="text-base text-center font-nunito font-bold">Akun KLC</p>
          <p class="text-base text-center font-nunito">Untuk selain pengguna Google</p>
        </div>
        <form @submit.prevent="submitForm">
          <div class="mb-4 relative">
            <input type="text" name="email" placeholder="Email" class="input input-bordered w-full pl-10 py-2" v-model="email" />
            <span class="absolute left-3 top-2 text-primary"><i class="fas fa-envelope"></i></span>
          </div>
          <div class="mb-2 relative">
            <input type="password" name="password" placeholder="Kata Sandi" class="input input-bordered w-full pl-10 py-2" v-model="password" />
            <span class="absolute left-3 top-2 text-primary"><i class="fas fa-lock"></i></span>
          </div>
          <!-- reCAPTCHA placeholder -->
          <div class="my-6 flex justify-center">
            <div class="bg-gray-200 rounded w-[304px] h-[78px] flex items-center justify-center text-gray-500 text-xs">[reCAPTCHA]</div>
          </div>
          <div class="flex justify-center mt-6">
            <button id="submitdata" type="submit" class="btn btn-primary w-[60%]">Masuk</button>
          </div>
          <div class="mt-4 text-right">
            <a href="/send-email" class="text-green-600 text-sm">Lupa kata sandi?</a>
          </div>
        </form>
        <div class="bg-base-100 rounded-xl shadow p-4 mt-6">
          <p class="text-center text-base font-medium">Belum punya Akun KLC?</p>
          <div class="flex justify-center mt-2 pb-4">
            <a href="/signup" class="btn btn-primary w-[80%] text-sm font-medium">Daftar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showOtherForm = ref(false)
const email = ref('')
const password = ref('')

// Ganti dengan client_id Google OAuth kamu
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'
const REDIRECT_URI = 'https://your-domain.com/auth/callback' // ganti dengan URL callback kamu

function signInWithGoogle() {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'token',
    scope: 'openid email profile',
    include_granted_scopes: 'true',
    state: 'login'
  })
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

const submitForm = () => {
  // TODO: handle login manual
}
</script>

<style scoped>
.font-nunito {
  font-family: 'Nunito', 'Poppins', 'sans-serif';
}
</style>
