<template>
  <div class="bg-base-100 pt-20 pb-16 min-h-screen">
    <div class="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
      <!-- Main Content -->
      <div class="w-full lg:w-2/3 xl:w-3/4">
        <div v-if="course" class="bg-white rounded-xl shadow-lg p-8 mb-8">
          <img
            v-if="course.thumbnail_url"
            :src="course.thumbnail_url"
            :alt="course.title"
            class="w-full h-64 object-cover rounded mb-6"
          />
          <h1 class="text-3xl font-bold mb-4 text-primary">{{ course.title }}</h1>
          <p class="text-gray-700 mb-4">{{ course.description }}</p>
          <div class="text-sm text-gray-500 mb-2">ID: {{ course.id }}</div>
        </div>
        <div v-else class="text-center py-24 text-gray-400">Loading...</div>

        <!-- Materi Pengentasan Kemiskinan -->
        <section class="bg-base-200 rounded-xl p-6 shadow mb-8">
          <h2 class="text-xl font-bold mb-4 text-primary">Materi Pengentasan Kemiskinan</h2>
          <ul class="list-disc pl-5 space-y-2 text-gray-700">
            <li>Strategi berbasis data dan studi kasus nyata dari berbagai daerah.</li>
            <li>Kolaborasi lintas sektor: pemerintah, swasta, dan komunitas.</li>
            <li>Solusi berkelanjutan, inovasi, dan pemberdayaan ekonomi.</li>
            <li>Workshop, simulasi, dan mentoring praktis.</li>
            <li>Terbuka untuk siapa saja yang ingin berkontribusi dalam pengentasan kemiskinan.</li>
          </ul>
        </section>
      </div>

      <!-- Sidebar -->
      <aside class="w-full lg:w-1/3 xl:w-1/4">
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div class="text-2xl font-bold text-primary mb-2">Info Kursus</div>
          <ul class="space-y-2 text-gray-700 text-sm">
            <li><span class="font-semibold">Level:</span> Beginner</li>
            <li><span class="font-semibold">Durasi:</span> 2 Jam</li>
            <li><span class="font-semibold">Bahasa:</span> Indonesia</li>
            <li><span class="font-semibold">Mode:</span> Asynchronous (Self-Paced)</li>
            <li><span class="font-semibold">Sertifikat:</span> Ya, setelah selesai</li>
            <li><span class="font-semibold">Mobile Friendly:</span> Ya</li>
          </ul>
          <button class="mt-6 w-full btn btn-primary font-bold" @click="handleJoin">Join</button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

interface Course {
  id: number
  title: string
  description: string
  thumbnail_url?: string
  // add other properties as needed
}

const course = ref<Course | null>(null)

const handleJoin = () => {
  const slug = route.params.slug
  if (auth.isLoggedIn) {
    router.push(`/course/${slug}/materi`)
  } else {
    localStorage.setItem('redirectAfterSignup', `/course/${slug}/materi`)
    router.push('/signup')
  }
}

onMounted(async () => {
  const res = await fetch(`/api/course?slug=${route.params.slug}`)
  const data = await res.json()
  course.value = Array.isArray(data) ? data[0] : data
})
</script>