<!-- filepath: c:\Users\user\Documents\cloud-campus\layouts\instructor.vue -->
<template>
  <div class="flex min-h-screen bg-base-100 flex-col font-poppins">
    <headerInstructor />
    <div class="flex flex-1 pt-10"> <!-- Tambahkan pt-16 di sini -->
      <SidebarInstruktur />
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import headerInstructor from '@/components/headerInstructor.vue'
import SidebarInstruktur from '@/components/SidebarInstruktur.vue'
</script>

<style>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>