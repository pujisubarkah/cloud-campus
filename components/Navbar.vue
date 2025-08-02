<template>
  <nav class="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-4 sm:px-10 py-3 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg backdrop-blur-md font-poppins z-[9999999] border-b-4 border-yellow-400">
    <!-- Logo & Brand -->
    <div class="flex items-center gap-4">
      <a href="/">
        <img src="/lanri_.png" alt="Logo Lanri" class="h-12 w-auto bg-white p-1 rounded-lg shadow-lg" />
      </a>
     
      <span class="text-white font-bold text-xl md:text-2xl tracking-wide drop-shadow-lg" style="text-shadow:0 0 8px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3);">Akademi Pengentasan Kemiskinan</span>
    </div>

    <!-- Main Menu -->
    <div class="hidden lg:flex items-center gap-2 xl:gap-6">
      <ul class="flex gap-2 xl:gap-6 list-none font-poppins text-white">
        <li>
          <a href="/" class="px-4 py-2 rounded-lg font-semibold text-base transition-all duration-200 text-blue-50 hover:bg-yellow-400 hover:text-blue-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300/50">Beranda</a>
        </li>
        <li>
          <a href="/course/" class="px-4 py-2 rounded-lg font-semibold text-base transition-all duration-200 text-blue-50 hover:bg-yellow-400 hover:text-blue-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300/50">Materi</a>
        </li>
        <li>
          <a href="/my/" class="px-4 py-2 rounded-lg font-semibold text-base transition-all duration-200 text-blue-50 hover:bg-yellow-400 hover:text-blue-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300/50">Kursus Saya</a>
        </li>
      </ul>
    </div>

    <!-- Login/User Button -->
    <div class="flex items-center gap-2 sm:gap-4">
      <template v-if="auth.isLoggedIn">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-2 text-yellow-300 font-semibold text-base">
            <i class="fas fa-user-circle text-2xl"></i>
            {{ auth.user?.name }}
          </span>
          <button @click="auth.logout(); $router.push('/')" class="border border-yellow-400 bg-yellow-400 text-blue-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-300 hover:border-yellow-300 transition-all duration-200 whitespace-nowrap flex items-center gap-2 shadow">
            Logout
          </button>
        </div>
      </template>
      <template v-else>
        <a href="/login" class="border border-yellow-400 bg-yellow-400 text-blue-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-300 hover:border-yellow-300 transition-all duration-200 flex items-center gap-2 shadow">
          <span class="flaticon-user"></span>
          <span class="hidden md:inline">Masuk</span>
        </a>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const $router = useRouter()
</script>
