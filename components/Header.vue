<template>
  <header class="navbar bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-md px-6 z-10 text-white flex items-center justify-between border-b-4 border-yellow-400">
    <div class="flex items-center gap-3">
      <component v-if="logoIcon" :is="logoIcon" class="w-8 h-8 text-yellow-300" />
      <img v-if="logoImg" :src="logoImg" alt="Logo" class="h-12 w-auto bg-white p-1 rounded-lg shadow-lg" />
      <h1 class="text-xl font-bold tracking-wide">{{ title }}</h1>
      <span v-if="subtitle" class="ml-2 text-sm text-blue-200">{{ subtitle }}</span>
    </div>
    <div class="flex items-center gap-4">
      <!-- Notification Bell -->
      <button v-if="showNotifBell" class="relative btn btn-ghost btn-circle" @click="handleBellClick">
        <Bell class="w-6 h-6" />
        <span v-if="unreadCount > 0" class="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">{{ unreadCount }}</span>
      </button>
      <!-- Mail -->
      <button v-if="showMail" class="relative btn btn-ghost btn-circle">
        <Mail class="w-6 h-6" />
        <span class="absolute top-1 right-1 inline-block w-2 h-2 bg-green-500 rounded-full"></span>
      </button>
      <!-- Search -->
      <div v-if="showSearch" class="form-control">
        <input type="text" placeholder="Search..." class="input input-bordered w-32 md:w-48 bg-white text-gray-700" />
      </div>
      <!-- Avatar Dropdown -->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full ring ring-yellow-300 ring-offset-base-100 ring-offset-2">
            <img :src="avatarUrl" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-gray-700">
          <li>
            <a>
              <UserIcon class="w-5 h-5 mr-2" />
              {{ userName }}
            </a>
          </li>
          <li v-if="showSettings">
            <a>
              <SettingsIcon class="w-5 h-5 mr-2" /> Settings
            </a>
          </li>
          <li>
            <button @click="handleLogout" class="w-full text-left flex items-center">
              <LogoutIcon class="w-5 h-5 mr-2 text-red-400" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <div v-if="showNotifDropdown" class="absolute right-0 mt-12 w-80 bg-white text-gray-800 rounded-lg shadow-lg z-50">
    <div class="p-4 font-bold border-b">Notifikasi</div>
    <ul>
      <li v-for="notif in notifications" :key="notif.id" class="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 transition" @click="deleteNotif(notif.id)">
        <div class="font-semibold">{{ notif.pesan }}</div>
        <div class="text-xs text-gray-500">Dari: {{ notif.sender_full_name }}</div>
        <div class="text-xs text-gray-400">Untuk: {{ notif.recipient_full_name }}</div>
      </li>
      <li v-if="notifications.length === 0" class="p-4 text-center text-gray-500">Tidak ada notifikasi</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Bell, Mail, User as UserIcon, Settings as SettingsIcon, LogOut as LogoutIcon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

interface HeaderProps {
  title: string
  subtitle?: string
  logoIcon?: any
  logoImg?: string
  showNotifBell?: boolean
  showMail?: boolean
  showSearch?: boolean
  showSettings?: boolean
}

const props = defineProps<HeaderProps>()

const auth = useAuthStore()
const router = useRouter()
const userName = ref(auth.user?.full_name || '')
const avatarUrl = ref(`https://ui-avatars.com/api/?name=${encodeURIComponent(userName.value)}&background=random`)
interface Notification {
  id: string
  pesan: string
  dibaca: boolean
  recipient_full_name: string
  sender_full_name: string
}
const notifications = ref<Notification[]>([])
const unreadCount = ref(0)
const showNotifDropdown = ref(false)

async function deleteNotif(id: string) {
  try {
    await $fetch(`/api/notifikasi/${id}`, { method: 'DELETE' })
    notifications.value = notifications.value.filter(n => n.id !== id)
    unreadCount.value = notifications.value.filter(n => !n.dibaca).length
  } catch (err) {
    console.error('Gagal hapus notifikasi:', err)
  }
}

onMounted(async () => {
  try {
    if (auth.user?.id) {
      const res = await $fetch(`/api/notifikasi/${auth.user.id}`)
      notifications.value = Array.isArray(res)
        ? res.map((n: any) => ({
            id: n.id,
            pesan: n.pesan,
            dibaca: n.dibaca,
            recipient_full_name: n.recipient_full_name ?? '',
            sender_full_name: n.sender_full_name ?? ''
          }))
        : []
      unreadCount.value = notifications.value.filter(n => !n.dibaca).length
    }
  } catch (err) {
    console.error('Gagal fetch notifikasi:', err)
  }
})

function handleLogout() {
  auth.logout()
  router.push('/login')
}
function handleBellClick() {
  showNotifDropdown.value = !showNotifDropdown.value
}
</script>
