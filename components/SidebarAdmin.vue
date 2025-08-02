<template>
  <aside class="w-64 h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white shadow-xl flex flex-col py-8 px-6">
    <!-- Logo & Title -->
    <div class="flex items-center gap-3 mb-8">
      <div class="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
        <Icon name="heroicons-outline:cog" class="w-7 h-7" />
      </div>
      <div>
        <h2 class="text-xl font-bold tracking-wide">Admin Panel</h2>
        <p class="text-sm text-blue-200">Control Center</p>
      </div>
    </div>
    <!-- Menu -->
    <nav class="flex-1">
      <ul class="space-y-1 font-medium">
        <li :class="isActive('/admin')">
          <NuxtLink to="/admin" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition group">
            <Icon name="heroicons-outline:home" class="w-6 h-6 group-hover:text-yellow-300" />
            <span>Dashboard</span>
          </NuxtLink>
        </li>
        <li :class="isActive('/admin/courses')">
          <NuxtLink to="/admin/courses" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition group">
            <Icon name="heroicons-outline:book-open" class="w-6 h-6 group-hover:text-yellow-300" />
            <span>Courses</span>
          </NuxtLink>
        </li>
        <li :class="isActive('/admin/instructor')">
          <NuxtLink to="/admin/instructor" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition group">
            <Icon name="heroicons-outline:academic-cap" class="w-6 h-6 group-hover:text-yellow-300" />
            <span>Instructors</span>
          </NuxtLink>
        </li>
        <li :class="isActive('/admin/students')">
          <NuxtLink to="/admin/students" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition group">
            <Icon name="heroicons-outline:user-group" class="w-6 h-6 group-hover:text-yellow-300" />
            <span>Students</span>
          </NuxtLink>
        </li>
        <li :class="isActive('/admin/settings')">
          <NuxtLink to="/admin/settings" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition group">
            <Icon name="heroicons-outline:cog" class="w-6 h-6 group-hover:text-yellow-300" />
            <span>Settings</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <!-- Logout Button -->
    <div class="mt-10">
      <button class="flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-blue-800 transition text-left">
        <Icon name="heroicons-outline:logout" class="w-6 h-6 text-red-400" />
        <span class="font-semibold">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
definePageMeta({
  layout: 'admin'
})

const route = useRoute()

const isActive = (path) => {
  return route.path === path ? 'bg-blue-800 text-yellow-300 rounded-lg font-semibold' : ''
}
</script>
