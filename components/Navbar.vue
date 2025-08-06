<template>
  <nav class="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-4 sm:px-10 py-3 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg backdrop-blur-md font-poppins z-[9999999] border-b-4 border-yellow-400">
    <!-- Logo & Brand -->
    <div class="flex items-center gap-4">
      <a href="/">
        <img src="/lanri_.png" alt="Logo Lanri" class="h-12 w-auto bg-white p-1 rounded-lg shadow-lg" />
      </a>
     
      <div class="hidden md:block">
        <h1 class="text-white font-bold text-xl md:text-2xl tracking-wide drop-shadow-lg" style="text-shadow:0 0 8px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3);">
          Akademi Pengentasan Kemiskinan
        </h1>
        <p class="text-yellow-200 text-sm font-medium opacity-90">Learning Management System</p>
      </div>
    </div>

    <!-- Hamburger Menu Button (Mobile) -->
    <button 
      @click="isMenuOpen = !isMenuOpen"
      class="lg:hidden text-white p-2 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300/50"
    >
      <svg 
        class="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          v-if="!isMenuOpen"
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M4 6h16M4 12h16M4 18h16"
        />
        <path 
          v-else
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen" 
      class="lg:hidden fixed inset-0 top-[73px] bg-gradient-to-b from-blue-900/95 to-blue-800/95 backdrop-blur-sm z-50"
    >
      <div class="p-4 space-y-4">
        <ul class="space-y-3">
          <li>
            <a 
              href="/" 
              class="block px-4 py-3 rounded-xl font-medium text-base text-blue-50 hover:bg-blue-700/50 hover:text-yellow-300 transition-all duration-300"
              @click="isMenuOpen = false"
            >
              Beranda
            </a>
          </li>
          <li>
            <a 
              href="/course/" 
              class="block px-4 py-3 rounded-xl font-medium text-base text-blue-50 hover:bg-blue-700/50 hover:text-yellow-300 transition-all duration-300"
              @click="isMenuOpen = false"
            >
              Materi
            </a>
          </li>
          <li>
            <a 
              href="/my/" 
              class="block px-4 py-3 rounded-xl font-medium text-base text-blue-50 hover:bg-blue-700/50 hover:text-yellow-300 transition-all duration-300"
              @click="isMenuOpen = false"
            >
              Kursus Saya
            </a>
          </li>
        </ul>

        <!-- Mobile Login/User Button -->
        <div class="pt-4 border-t border-blue-700/50">
          <template v-if="auth.isLoggedIn">
            <div class="space-y-4">
              <span class="block text-blue-50 font-medium px-4">
                <i class="fas fa-user-circle mr-2 text-yellow-300"></i>
                {{ auth.user?.name }}
              </span>
              <button 
                @click="auth.logout(); $router.push('/'); isMenuOpen = false" 
                class="w-full bg-blue-700/50 text-yellow-300 border border-yellow-300/20 py-3 px-4 rounded-xl font-medium hover:bg-blue-600/50 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </template>
          <template v-else>
            <a 
              href="/login" 
              class="block text-center bg-blue-700/50 text-yellow-300 border border-yellow-300/20 py-3 px-4 rounded-xl font-medium hover:bg-blue-600/50 transition-all duration-300"
              @click="isMenuOpen = false"
            >
              Masuk
            </a>
          </template>
        </div>
      </div>
    </div>

    <!-- Desktop Menu -->
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

    <!-- Desktop Login/User Button -->
    <div class="hidden lg:flex items-center gap-2 sm:gap-4">
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
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const $router = useRouter()
const isMenuOpen = ref(false)

// Optional: Close menu when route changes
watch(() => $router.currentRoute.value, () => {
  isMenuOpen.value = false
})

// Optional: Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('nav')) {
      isMenuOpen.value = false
    }
  })
})
</script>

<style scoped>
/* Optional: Add transition for menu */
.fixed {
  transition: all 0.3s ease-in-out;
}

/* Add backdrop filter for better readability */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
