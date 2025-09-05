<template>
  <div class="flex min-h-screen bg-base-100 flex-col font-poppins">
    <Header
      :title="headerTitle"
      :subtitle="headerSubtitle"
      :logoIcon="headerLogoIcon"
      :logoImg="headerLogoImg"
      :showNotifBell="showNotifBell"
      :showMail="showMail"
      :showSearch="showSearch"
      :showSettings="showSettings"
    />
    <div class="flex flex-1 border-t-4 border-yellow-400">
      <Sidebar
        :title="sidebarTitle"
        :subtitle="sidebarSubtitle"
        :logoIcon="sidebarLogo"
        :menu="sidebarMenu"
      />
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { computed } from 'vue'

const props = defineProps<{ role: 'admin' | 'instructor' }>()

const headerTitle = computed(() =>
  props.role === 'admin' ? 'Admin Dashboard' : 'Akademi Pengentasan Kemiskinan'
)
const headerSubtitle = computed(() =>
  props.role === 'admin' ? undefined : undefined
)
const headerLogoIcon = computed(() =>
  props.role === 'admin' ? 'Settings' : undefined
)
const headerLogoImg = computed(() =>
  props.role === 'instructor' ? '/lanri_.png' : undefined
)
const showNotifBell = computed(() => true)
const showMail = computed(() => true)
const showSearch = computed(() => props.role === 'admin')
const showSettings = computed(() => true)

const sidebarTitle = computed(() =>
  props.role === 'admin' ? 'Admin Panel' : 'Instruktur'
)
const sidebarSubtitle = computed(() =>
  props.role === 'admin' ? 'Control Center' : 'Panel Kendali'
)
const sidebarLogo = computed(() =>
  props.role === 'admin' ? 'Settings' : 'GraduationCap'
)
const sidebarMenu = computed(() => {
  if (props.role === 'admin') {
    return [
      { path: '/admin', label: 'Dashboard', icon: 'Home' },
      { path: '/admin/courses', label: 'Courses', icon: 'BookOpen' },
      { path: '/admin/instructor', label: 'Instructors', icon: 'GraduationCap' },
      { path: '/admin/students', label: 'Students', icon: 'Users' },
  { path: '/admin/registrasi', label: 'Registrasi', icon: 'Settings' }
    ]
  } else {
    return [
      { path: '/instructor', label: 'Dashboard', icon: 'Home' },
      { path: '/instructor/courses', label: 'Kursus Saya', icon: 'BookOpen' },
      { path: '/instructor/progress', label: 'Progress Siswa', icon: 'BarChart2' }
    ]
  }
})
</script>

<style>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
