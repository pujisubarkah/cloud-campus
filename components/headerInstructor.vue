<!-- filepath: c:\Users\user\Documents\cloud-campus\components\headerInstructor.vue -->
<template>
  <header class="navbar bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-md px-8 py-3 fixed top-0 left-0 w-full z-50 border-b-4 border-yellow-400 flex items-center justify-between">
    <!-- Logo & Sidebar Toggle -->
    <div class="flex items-center gap-4">
      <button class="btn btn-sm btn-ghost md:hidden">
        <span class="sr-only">Side panel</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="https://cloudcampus.hbmsu.ac.ae/pluginfile.php/1/core_admin/logocompact/300x300/1750320906/cloud-campus-logo-white3affadb508be04d6e8ec1b7d4aa3052c6e6881bf62c6d68a8e0c9575eb5bd78a%202.png" alt="Cloud Campus" class="h-8 w-auto rounded-lg shadow" />
        <span class="text-lg font-bold tracking-wide text-white hidden md:inline-block">Panel Instruktur</span>
      </NuxtLink>
    </div>

    <!-- Right Area: Notification, Mail, User -->
    <div class="flex items-center gap-4">
      <!-- Notification Bell (Lucide) -->
      <button class="relative btn btn-sm btn-ghost text-white hover:bg-blue-800">
        <Bell class="w-6 h-6" />
        <span class="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <!-- Mail Notification (Lucide) -->
      <button class="relative btn btn-sm btn-ghost text-white hover:bg-blue-800">
        <Mail class="w-6 h-6" />
        <span class="absolute top-1 right-1 inline-block w-2 h-2 bg-green-500 rounded-full"></span>
      </button>

      <!-- User Menu: Avatar + Dropdown (Lucide) -->
      <div class="relative" @mouseenter="open = true" @mouseleave="open = false">
        <button class="flex items-center gap-2 btn btn-sm btn-ghost text-white">
          <img :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user?.name || '')}&background=random`" alt="User" class="w-10 rounded-full" />
          <span class="hidden md:inline-block">{{ auth.user?.name }}</span>
          <ChevronDown class="w-5 h-5" />
        </button>

        <!-- Dropdown Menu -->
        <div v-if="open" class="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg z-50">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Profile</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Settings</a>
          <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Bell, Mail, ChevronDown } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const open = ref(false)
const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>