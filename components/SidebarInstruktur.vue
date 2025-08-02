<template>
  <aside class="w-64 min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white shadow-xl flex flex-col py-8 px-6">
    <div class="flex items-center gap-3 mb-8">
      <div class="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
        <i class="fas fa-chalkboard-teacher text-2xl"></i>
      </div>
      <div>
        <h2 class="text-xl font-bold">Instruktur</h2>
        <p class="text-sm text-blue-200">Panel Kendali</p>
      </div>
    </div>
    <nav class="flex-1">
      <ul class="space-y-2 font-medium">
        <li>
          <NuxtLink to="/instructor" class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-800 transition">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/instructor/courses" class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-800 transition">
            <i class="fas fa-book"></i>
            <span>Kursus Saya</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/instructor/progress" class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-800 transition">
            <i class="fas fa-chart-line"></i>
            <span>Progress Siswa</span>
          </NuxtLink>
        </li>
        <li class="mt-8">
          <button class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-800 transition w-full text-left">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
definePageMeta({
  layout: 'instructor'
})
</script>
