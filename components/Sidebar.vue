<template>
  <aside
    :class="['relative min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white shadow-xl flex flex-col py-8 border-r-4 border-yellow-400 transition-all duration-300', isCollapsed ? 'w-20 px-2' : 'w-64 px-6']"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Logo & Title -->
    <div class="flex items-center gap-3 mb-8 justify-center">
      <div class="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
        <component :is="logoIcon" class="w-7 h-7" />
      </div>
      <div v-if="!isCollapsed">
        <h2 class="text-xl font-bold tracking-wide">{{ title }}</h2>
        <p class="text-sm text-blue-200">{{ subtitle }}</p>
      </div>
    </div>
    <!-- Menu -->
    <nav class="flex-1">
      <ul class="space-y-2 font-medium">
        <li v-for="item in menu" :key="item.path" :class="isActive(item.path)">
          <NuxtLink :to="item.path" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 hover:text-yellow-300 transition group">
            <component :is="item.icon" class="w-6 h-6 group-hover:text-yellow-300 transition" />
            <span v-if="!isCollapsed" class="font-semibold">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <!-- Logout Button -->
    <div class="mt-10">
      <button class="flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-blue-800 hover:text-yellow-300 transition text-left">
        <LogOut class="w-6 h-6 text-red-400 group-hover:text-yellow-300 transition" />
        <span v-if="!isCollapsed" class="font-semibold">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { LogOut } from 'lucide-vue-next'
import { useSidebarMenu } from '@/composables/useSidebarMenu'
const props = defineProps<{
  title: string
  subtitle: string
  logoIcon: any
  menu: Array<{ path: string, label: string, icon: any }>
}>()
const { isCollapsed, isActive, handleMouseEnter, handleMouseLeave } = useSidebarMenu()
</script>
