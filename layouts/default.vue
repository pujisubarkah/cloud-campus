<template>
  <div>
    <div class="flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-1">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

import { useHead } from '#imports'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

const auth = useAuthStore()
onMounted(() => {
  auth.loadFromStorage()
})

useHead({
  title: 'Akademi Pengentasan Kemiskinan | LANRI',
  meta: [
    {
      name: 'description',
      content: 'Platform pembelajaran digital yang dirancang khusus untuk mendukung pengembangan kapasitas di bidang pengentasan kemiskinan. Menawarkan pengalaman belajar interaktif dengan materi berkualitas tinggi dan komunitas pembelajar yang aktif.'
    },
    {
      property: 'og:title',
      content: 'Akademi Pengentasan Kemiskinan | LANRI'
    },
    {
      property: 'og:description',
      content: 'Platform pembelajaran digital yang dirancang khusus untuk mendukung pengembangan kapasitas di bidang pengentasan kemiskinan. Menawarkan pengalaman belajar interaktif dengan materi berkualitas tinggi dan komunitas pembelajar yang aktif.'
    },
    {
      name: 'twitter:title',
      content: 'Akademi Pengentasan Kemiskinan | LANRI'
    },
    {
      name: 'twitter:description',
      content: 'Platform pembelajaran digital yang dirancang khusus untuk mendukung pengembangan kapasitas di bidang pengentasan kemiskinan. Menawarkan pengalaman belajar interaktif dengan materi berkualitas tinggi dan komunitas pembelajar yang aktif.'
    }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
    }
  ]
})
</script>
