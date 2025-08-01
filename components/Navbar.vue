
gi<template>
  <nav class="fixed top-0 left-0 right-0 flex justify-between items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 shadow-md backdrop-blur-sm font-poppins z-[9999999]">
    <!-- Logo & Brand -->
    <div class="flex items-center flex-shrink-0 gap-2">
      <a href="/">
        <img src="/lanri.png" alt="Logo LANRI" class="h-8 mr-2 sm:h-10 sm:mr-3 drop-shadow-lg filter brightness-110 contrast-125" style="filter:drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 16px rgba(255,255,255,0.2));" />
      </a>
      <a href="/">
        <img src="/oip.png" alt="Logo OIP" class="h-6 mr-2 sm:h-8 sm:mr-3 drop-shadow-md opacity-90" />
      </a>
      <span class="text-white font-bold text-base sm:text-lg md:text-xl tracking-wide drop-shadow-lg" style="text-shadow:0 0 8px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3);">CloudCampus</span>
    </div>

    <!-- Menu -->
    <div class="hidden lg:flex items-center gap-3 xl:gap-4">
      <ul class="flex gap-3 xl:gap-4 list-none font-poppins text-white">
        <li>
          <a href="/" class="no-underline px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm xl:text-base whitespace-nowrap hover:bg-blue-500/30 hover:shadow-sm hover:backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300/50 bg-gradient-to-r from-blue-500/40 to-blue-400/30 text-blue-100 shadow-sm border border-blue-400/20 backdrop-blur-sm">Beranda</a>
        </li>
        <li>
          <a href="/course/" class="no-underline px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm xl:text-base whitespace-nowrap hover:bg-blue-500/30 hover:shadow-sm hover:backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300/50 text-blue-50">Materi</a>
        </li>
        <li>
          <a href="/my/" class="no-underline px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm xl:text-base whitespace-nowrap hover:bg-blue-500/30 hover:shadow-sm hover:backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300/50 text-blue-50">Kursus Saya</a>
        </li>
      </ul>
    </div>

    <!-- Login Button -->
    <div class="flex items-center gap-2 sm:gap-3">
      <a href="/login" class="border border-blue-400/30 bg-blue-500/30 backdrop-blur-sm text-blue-50 py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg cursor-pointer text-sm sm:text-base font-medium hover:bg-blue-400/40 hover:border-blue-300/40 transition-all duration-200 touch-manipulation whitespace-nowrap flex items-center gap-2">
        <span class="flaticon-user"></span>
        <span class="hidden md:inline">Masuk</span>
      </a>
    </div>
  </nav>
</template>


<script setup>
// Navbar CloudCampus modern dengan blue gradient dan responsive menu
</script>
