
<script setup>
import { Instagram, Youtube, Linkedin } from 'lucide-vue-next';
</script>


<template>
  <footer class="bg-[#4FC3F7] text-white mt-12 w-full font-poppins">
    <div class="container mx-auto px-4 py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Logo & Info -->
        <div>
          <div class="mb-6 flex flex-col items-start">
            <div class="flex items-center gap-2 mb-4">
              <img src="/lanri_.png" alt="Logo Lanri" class="h-12 w-auto bg-white p-1 rounded-lg shadow" />
              <img src="/oip.png" alt="Logo OIP" class="h-12 w-auto bg-white p-1 rounded-lg shadow" />
            </div>
            <p class="text-xs text-white/80">Hak Cipta Badan Pengentasan Kemiskinan</p>
            <p class="text-xs text-white/80">Lembaga Administrasi Negara Republik Indonesia</p>
            <p class="text-xs text-white/80">Manajemen Situs Badan Pengentasan Kemiskinan</p>
            <p class="text-xs text-white/80">Jl. Purnawarman No 99 Kebayoran Baru, Jakarta Selatan</p>
          </div>
        </div>
        <!-- Navigasi -->
        <div>
          <p class="text-lg font-bold mb-4">CloudCampus</p>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="hover:text-[#FFD966]">Beranda</NuxtLink></li>
            <li><NuxtLink to="/kursus" class="hover:text-[#FFD966]">Kursus</NuxtLink></li>
            <li><NuxtLink to="/tentang" class="hover:text-[#FFD966]">Tentang</NuxtLink></li>
            <li><NuxtLink to="/kontak" class="hover:text-[#FFD966]">Kontak</NuxtLink></li>
            <li><a href="#" class="hover:text-[#FFD966]">Sertifikasi</a></li>
            <li><a href="#" class="hover:text-[#FFD966]">CAT/Ujian Online</a></li>
            <li><a href="#" class="hover:text-[#FFD966]">KSPP</a></li>
            <li><a href="#" class="hover:text-[#FFD966]">SIPP</a></li>
            <li><a href="#" class="hover:text-[#FFD966]">Expert Locator</a></li>
            <li><a href="#" class="hover:text-[#FFD966]">Kebijakan Privasi</a></li>
          </ul>
        </div>
        <!-- Sosial Media -->
        <div>
          <p class="text-lg font-bold mb-4">Ikuti Kami</p>
          <div class="space-y-3">
            <a href="https://www.facebook.com/bppk.kemenkeu/" target="_blank" class="flex items-center gap-3 hover:text-[#FFD966]">
              <span class="icon"><Instagram :size="24" /></span> <span class="ml-2">LAN RI</span>
            </a>
            <a href="https://twitter.com/bppkkemenkeu" target="_blank" class="flex items-center gap-3 hover:text-[#FFD966]">
              <span class="icon"><Linkedin :size="24" /></span> <span class="ml-2">@LAN_RI</span>
            </a>
            <a href="https://www.youtube.com/channel/UCDBqV8WfMOK2pwHQZvONb7g" target="_blank" class="flex items-center gap-3 hover:text-[#FFD966]">
              <span class="icon"><Youtube :size="24" /></span> <span class="ml-2">Badan Pengentasan Kemiskinan</span>
            </a>
            <a href="https://www.instagram.com/bppkkemenkeu/" target="_blank" class="flex items-center gap-3 hover:text-[#FFD966]">
              <span class="icon"><Instagram :size="24" /></span> <span class="ml-2">LAN RI</span>
            </a>
          </div>
          <div class="mt-6">
            <p class="text-lg font-bold mb-2">Unduh Aplikasi KLC Mobile</p>
            <div class="flex gap-4">
              <a target="_blank" href="https://play.google.com/store/apps/details?id=id.go.kemenkeu.bppk.klcmobile">
                <img src="https://klc2.kemenkeu.go.id/shared/assets/images/googleplay.png" class="h-8" />
              </a>
              <a target="_blank" href="https://apps.apple.com/us/app/klc-mobile/id1543201006">
                <img src="https://klc2.kemenkeu.go.id/shared/assets/images/appstore.png" class="h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#FFD966] text-[#4FC3F7] text-center text-xs py-4 w-full font-bold">
      © {{ new Date().getFullYear() }} CloudCampus. All rights reserved.
    </div>
  </footer>
</template>
