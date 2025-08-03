<template>
  <div class="flex min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-16">
    <!-- Sidebar Materi -->
    <transition name="slide">
      <aside v-if="showSidebar" class="w-80 bg-white/90 p-6 shadow-xl border-r border-base-300 flex flex-col min-h-[calc(100vh-64px)] relative rounded-r-3xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="font-bold text-2xl tracking-wide text-blue-700 flex items-center gap-2">
            <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20l9-5-9-5-9 5 9 5z" /></svg>
            Materi
          </h2>
          <button class="btn btn-sm btn-circle btn-ghost" @click="toggleSidebar" title="Tutup Sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <ul class="menu bg-white rounded-xl shadow-sm">
          <li v-for="section in sections" :key="section.id" class="mb-2">
            <a
              @click="selectSection(section)"
              :class="{
                'flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer': true,
                'bg-blue-100 text-blue-700 font-bold shadow': selectedSection?.id === section.id,
                'hover:bg-blue-50 text-gray-700': selectedSection?.id !== section.id
              }"
            >
              <span>{{ section.title }}</span>
              <span v-if="completedSections.includes(section.id)" class="ml-2 text-yellow-400 text-xl">⭐</span>
            </a>
          </li>
        </ul>
      </aside>
    </transition>

    <!-- Area Konten -->
    <main :class="showSidebar ? 'w-full md:w-[calc(100%-20rem)]' : 'w-full'" class="p-8 flex-1 transition-all duration-300">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-extrabold text-blue-900 tracking-tight flex items-center gap-2">
          <svg v-if="selectedSection" class="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20l9-5-9-5-9 5 9 5z" /></svg>
          {{ selectedSection?.title || 'Pilih materi di sidebar' }}
        </h1>
        <button v-if="!showSidebar" class="btn btn-sm btn-circle btn-ghost" @click="toggleSidebar" title="Buka Sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      <div class="rounded-3xl bg-white/90 shadow-xl p-8 border border-blue-100">
        <div v-if="selectedSection">
          <div class="mb-6 text-xl text-gray-700">{{ selectedSection.title }}</div>
          <button
            v-if="!completedSections.includes(selectedSection.id)"
            class="btn btn-success btn-lg px-8 py-3 text-xl font-bold shadow"
            @click="handleCompletion(selectedSection.id)"
          >
            Tandai Selesai
          </button>
          <div v-else class="text-yellow-500 font-bold flex items-center gap-2 text-xl">
            <span>Section selesai</span> <span>⭐</span>
          </div>
        </div>
        <div v-else class="text-center text-gray-400 py-12 text-xl">Silakan pilih materi di sidebar.</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const showSidebar = ref(true)
const sections = ref([])
const selectedSection = ref(null)
const completedSections = ref([])

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const selectSection = (section) => {
  selectedSection.value = section
}

const handleCompletion = async (sectionId) => {
  if (!completedSections.value.includes(sectionId)) {
    // Kirim progress ke backend
    await $fetch('/api/section_progress', {
      method: 'POST',
      body: {
        user_id: auth.user.id,
        section_id: sectionId,
        progress_percent: 100,
        is_completed: true
      }
    })
    completedSections.value.push(sectionId)
  }
}

// Ambil section dari API berdasarkan course_id (slug)
onMounted(async () => {
  const res = await $fetch('/api/course_section', { method: 'GET' })
  const courseId = route.params.slug
  const filtered = (res.sections || []).filter(s => s.course_id === courseId)
  sections.value = filtered
  selectedSection.value = sections.value[0] || null

  // Ambil progress dari API
  if (auth.user?.id) {
    const progressRes = await $fetch('/api/section_progress', { method: 'GET' })
    const userProgress = (progressRes.progress || []).filter(
      p => p.user_id === auth.user.id && p.is_completed
    )
    completedSections.value = userProgress.map(p => p.section_id)
  }
})
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
