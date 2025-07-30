
<template>
  <header class="bg-[#3399FF] shadow font-poppins">
    <nav class="w-full px-4 py-4 flex items-center justify-between font-poppins">
      <!-- Logo & Brand -->
      <div class="flex items-center gap-4">
        <a href="https://cloudcampus.hbmsu.ac.ae" class="hidden sm:block">
          <img src="https://cloudcampus.hbmsu.ac.ae/pluginfile.php/1/theme_edumy/headerlogo2/1750320906/cloud-campus-logo8b2175eea0a7e16e61c8b901d8d0467fab3679ee00d033a932b1cc0aae28d680%202.png" alt="Cloud Campus" class="h-12 w-auto" />
        </a>
        <span class="text-xl font-bold" style="color: #FFB400;">CloudCampus</span>
      </div>

      <!-- Search -->
      <form action="https://cloudcampus.hbmsu.ac.ae/search/index.php" class="hidden md:flex items-center gap-2">
        <input name="q" class="form-input border rounded px-2 py-1" placeholder="What would you like to learn today?" type="text" size="15" />
        <input type="hidden" name="context" value="2" />
        <button type="submit" class="btn px-3 py-1 bg-[#FFB400] text-[#3399FF] font-bold rounded"><span class="flaticon-magnifying-glass"></span> Cari</button>
      </form>

      <!-- Menu & Login -->
      <div class="flex items-center gap-6">
        <ul class="flex gap-4">
          <li><a href="https://cloudcampus.hbmsu.ac.ae/course/" class="hover:text-[#FFB400] text-white">ALL COURSES</a></li>
          <li><a href="https://cloudcampus.hbmsu.ac.ae/my/" class="hover:text-[#FFB400] text-white">MY COURSES</a></li>
          <li><a href="https://cloudcampus.hbmsu.ac.ae/mod/page/view.php?id=11421" class="hover:text-[#FFB400] text-white">Discounted Best Sellers</a></li>
        </ul>
        <a href="#" class="btn flex items-center gap-2 bg-[#FFB400] text-[#3399FF] px-4 py-2 rounded font-bold"><span class="flaticon-user"></span> <span class="hidden md:inline">Log in</span></a>
      </div>
    </nav>
  </header>
</template>

<script setup>
// Navbar CloudCampus modern
</script>
