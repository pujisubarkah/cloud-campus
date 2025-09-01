<!-- filepath: c:\Users\user\Documents\cloud-campus\layouts\admin.vue -->
<template>
  <div class="flex min-h-screen bg-base-100 flex-col font-poppins">
    <HeaderAdmin />
    <div class="flex flex-1  border-t-4 border-yellow-400">
      <SidebarAdmin />
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import HeaderAdmin from '@/components/HeaderAdmin.vue'
import SidebarAdmin from '@/components/SidebarAdmin.vue'

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

<style>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>