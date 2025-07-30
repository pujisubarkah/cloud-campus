<template>
  <div class="flex flex-col md:flex-row min-h-screen items-center justify-center bg-base-100">
    <!-- Ilustrasi Signup -->
    <div class="hidden md:flex md:w-1/2 items-center justify-center">
      <img src="/LAN_9802.JPG" alt="signup" class="max-w-[85%]" />
    </div>
    <!-- Form Signup -->
    <div class="w-full md:w-1/2 flex flex-col items-center justify-center">
      <form class="bg-base-200 rounded-xl shadow-lg border border-base-300 p-10 w-full max-w-lg mb-6" @submit.prevent="submitSignup">
        <div class="mb-8 text-primary">
          <p class="text-lg text-center font-nunito font-medium pt-6 pb-6">Daftar untuk mendapatkan tiket wahana pengetahuanmu!</p>
        </div>
        <div class="mb-4">
          <div class="relative">
            <select v-model="country" class="select select-bordered w-full pl-10">
              <option value="">Pilih negara...</option>
              <option v-for="c in countries" :key="c.value" :value="c.value">{{ c.label }}</option>
            </select>
            <span class="absolute left-3 top-2 text-primary"><Globe :size="20" /></span>
          </div>
        </div>
        <div class="mb-4 relative">
          <input type="text" name="nik" placeholder="Nomor Induk Kependudukan (NIK)" class="input input-bordered w-full pl-10" v-model="nik" />
          <span class="absolute left-3 top-2 text-primary"><IdCard :size="20" /></span>
        </div>
        <div class="mb-4 relative">
          <input type="text" name="name" placeholder="Nama Lengkap" class="input input-bordered w-full pl-10" v-model="name" />
          <span class="absolute left-3 top-2 text-primary"><User :size="20" /></span>
        </div>
        <div class="mb-4 relative">
          <input type="text" name="username" placeholder="Username" class="input input-bordered w-full pl-10" v-model="username" />
          <span class="absolute left-3 top-2 text-primary"><User :size="20" /></span>
        </div>
        <div class="mb-4 relative">
          <input type="email" name="email" placeholder="Email" class="input input-bordered w-full pl-10" v-model="email" />
          <span class="absolute left-3 top-2 text-primary"><Mail :size="20" /></span>
        </div>
        <div class="mb-4 relative">
          <input type="text" name="nip" placeholder="NIP (Khusus ASN)" class="input input-bordered w-full pl-10" v-model="nip" />
          <span class="absolute left-3 top-2 text-primary"><IdCard :size="20" /></span>
        </div>
        <div class="mb-4 flex gap-2">
          <div class="relative w-1/2">
            <input type="password" name="password" placeholder="Kata Sandi" class="input input-bordered w-full pl-10 mb-2" v-model="password" />
            <span class="absolute left-3 top-2 text-primary"><Lock :size="20" /></span>
            <progress class="progress progress-info w-full h-2 mt-1" :value="passwordStrength" max="100"></progress>
            <div class="text-xs text-gray-500 mt-1">
              <span>Kata sandi kurang:</span><br>
              <span>minimal 1 huruf kapital</span><br>
              <span>minimal 1 huruf kecil</span><br>
              <span>minimal 1 huruf angka</span><br>
              <span>minimal 1 spesial karakter</span><br>
              <span>minimal 8 karakter</span>
            </div>
          </div>
          <div class="relative w-1/2">
            <input type="password" name="password2" placeholder="Ulangi kata sandi" class="input input-bordered w-full pl-10 mb-2" v-model="password2" />
            <span class="absolute left-3 top-2 text-primary"><Lock :size="20" /></span>
          </div>
        </div>
        <!-- reCAPTCHA placeholder -->
        <div class="my-6 flex justify-center">
          <div class="bg-gray-200 rounded w-[304px] h-[78px] flex items-center justify-center text-gray-500 text-xs">[reCAPTCHA]</div>
        </div>
        <div class="flex justify-center mt-6">
          <button id="submitdata" type="submit" class="btn btn-primary w-[90%] text-base font-semibold">Daftar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Globe, IdCard, Mail, Lock } from 'lucide-vue-next'
const country = ref('')
const nik = ref('')
const name = ref('')
const username = ref('')
const email = ref('')
const nip = ref('')
const password = ref('')
const password2 = ref('')
const countries = ref([
  { value: 'ID', label: 'Indonesia (ID)' },
  { value: 'MY', label: 'Malaysia (MY)' },
  { value: 'SG', label: 'Singapore (SG)' },
  { value: 'US', label: 'United States (US)' },
  // ...tambahkan negara lain sesuai kebutuhan
])
const passwordStrength = ref(0)
const submitSignup = () => {
  // TODO: handle signup
}
</script>

<style scoped>
.font-nunito {
  font-family: 'Nunito', 'Poppins', 'sans-serif';
}
</style>
