<template>
  <div class="flex min-h-screen bg-base-100">
    <!-- Sidebar Materi dengan animasi dan tombol tutup -->
    <transition name="slide">
      <aside v-if="showSidebar" class="w-72 bg-base-200 p-6 shadow-lg border-r border-base-300 flex flex-col min-h-screen relative">
        <div class="flex justify-between items-center mb-6">
          <h2 class="font-bold text-xl tracking-wide text-primary">Materi</h2>
          <button class="btn btn-sm btn-circle btn-ghost" @click="toggleSidebar" title="Tutup Sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <ul class="menu bg-base-100 rounded-xl shadow-sm">
          <li v-for="section in sections" :key="section.id">
            <a @click="selectSection(section)" :class="selectedSection.id === section.id ? 'active font-semibold text-primary' : ''">
              <span class="badge badge-info mr-2 capitalize">{{ section.type }}</span>
              {{ section.title }}
            </a>
          </li>
        </ul>
      </aside>
    </transition>

    <!-- Area Konten -->
    <main :class="showSidebar ? 'w-full md:w-[calc(100%-18rem)]' : 'w-full'" class="p-8 flex-1 transition-all duration-300">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-base-content tracking-tight">{{ selectedSection.title }}</h1>
        <button v-if="!showSidebar" class="btn btn-sm btn-circle btn-ghost" @click="toggleSidebar" title="Buka Sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      <div class="rounded-xl bg-base-200 shadow p-6">
        <!-- Konten Dinamis -->
        <component
          :is="getComponent(selectedSection.type)"
          :section="selectedSection"
          @completed="handleCompletion"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 🔽 Import komponen dinamis
import IntroSection from '@/components/IntroSection.vue'
import VideoSection from '@/components/VideoSection.vue'
import QuizSection from '@/components/QuizSection.vue'
import FinalTestSection from '@/components/FinalTestSection.vue'

// 🔽 Simulasi Data Materi
const sections = ref([
  { id: 1, type: 'intro', title: 'Pengantar Kursus' },
  { id: 2, type: 'video', title: 'Video Pembelajaran: Bagian 1', url: 'https://www.youtube.com/embed/xyz123' },
  { id: 3, type: 'quiz', title: 'Kuis Awal' },
  { id: 4, type: 'final', title: 'Tes Akhir' }
])

const selectedSection = ref(sections.value[0])

const selectSection = (section) => {
  selectedSection.value = section
}

// 🔽 Tentukan komponen berdasarkan tipe section
const getComponent = (type) => {
  switch (type) {
    case 'intro':
      return IntroSection
    case 'video':
      return VideoSection
    case 'quiz':
      return QuizSection
    case 'final':
      return FinalTestSection
    default:
      return IntroSection
  }
}

// State untuk buka/tutup sidebar
const showSidebar = ref(true)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

// 🔽 Callback jika section selesai
const handleCompletion = () => {
  console.log('Section completed!')
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
