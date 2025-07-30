
<script setup>
import { Instagram, Youtube, Linkedin } from 'lucide-vue-next';
</script>

<template>
  <footer class="bg-[#3399FF] text-white mt-12 w-full font-poppins">
    <div class="w-full px-4 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 font-poppins">
      <!-- Logo & Brand -->
      <div class="flex flex-col items-center md:items-start gap-2">
        <a href="https://cloudcampus.hbmsu.ac.ae">
          <img src="https://cloudcampus.hbmsu.ac.ae/pluginfile.php/1/theme_edumy/headerlogo2/1750320906/cloud-campus-logo8b2175eea0a7e16e61c8b901d8d0467fab3679ee00d033a932b1cc0aae28d680%202.png" alt="Cloud Campus" class="h-12 w-auto mb-2" />
        </a>
        <span class="text-2xl font-extrabold tracking-wide" style="color: #FFB400;">CloudCampus</span>
        <p class="mt-2 text-base text-center md:text-left text-white/80 max-w-xs md:max-w-sm leading-relaxed rounded-lg bg-[#FFB400]/10 px-4 py-2 shadow-sm">
          Platform pembelajaran online <span class="font-semibold text-[#FFB400]">modern</span> yang <span class="font-semibold text-[#FFB400]">fleksibel</span> dan <span class="font-semibold text-[#FFB400]">inovatif</span>.<br>
          <span class="italic text-xs text-white/60">Belajar kapan saja, di mana saja, untuk masa depan yang lebih cerah.</span>
        </p>
      </div>

      <!-- Navigasi -->
      <div>
        <h2 class="text-lg font-semibold mb-2" style="color: #FFB400;">Navigasi</h2>
        <ul class="space-y-1 text-sm">
          <li><NuxtLink to="/" class="hover:text-[#FFB400]">Beranda</NuxtLink></li>
          <li><NuxtLink to="/kursus" class="hover:text-[#FFB400]">Kursus</NuxtLink></li>
          <li><NuxtLink to="/tentang" class="hover:text-[#FFB400]">Tentang</NuxtLink></li>
          <li><NuxtLink to="/kontak" class="hover:text-[#FFB400]">Kontak</NuxtLink></li>
        </ul>
      </div>

      <!-- Ikuti Kami / Sosial -->
      <div>
        <h2 class="text-lg font-semibold mb-2" style="color: #FFB400;">Ikuti Kami</h2>
        <ul class="space-y-1 text-sm">
          <li>
            <a href="#" class="flex items-center gap-2 hover:text-[#FFB400]">
              <Instagram :size="20" /> Instagram
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center gap-2 hover:text-[#FFB400]">
              <Youtube :size="20" /> YouTube
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center gap-2 hover:text-[#FFB400]">
              <Linkedin :size="20" /> LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-[#FFB400] text-[#3399FF] text-center text-xs py-4 w-full font-bold">
      © {{ new Date().getFullYear() }} CloudCampus. All rights reserved.
    </div>
  </footer>
</template>
