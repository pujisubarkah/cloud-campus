<template>
  <header class="bg-[#4FC3F7] shadow font-poppins">
    <nav class="w-full px-4 py-4 flex items-center justify-between font-poppins">
      <!-- Logo & Brand -->
      <div class="flex items-center gap-4">
        <div class="hidden sm:flex items-center gap-2">
          <a href="/">
            <img src="/lanri_.png" alt="Logo Lanri" class="h-12 w-auto bg-white p-1 rounded-lg shadow" />
          </a>
          <a href="/">
            <img src="/oip.png" alt="Logo OIP" class="h-12 w-auto bg-white p-1 rounded-lg shadow" />
          </a>
        </div>
        <span class="text-xl font-bold" style="color: #FFD966;">CloudCampus</span>
      </div>

      <!-- Search -->
      <form action="https://cloudcampus.hbmsu.ac.ae/search/index.php" class="hidden md:flex items-center gap-2">
        <input name="q" class="form-input border rounded px-2 py-1" placeholder="What would you like to learn today?" type="text" size="15" />
        <input type="hidden" name="context" value="2" />
        <button type="submit" class="btn px-3 py-1 bg-[#FFD966] text-[#3399FF] font-bold rounded"><span class="flaticon-magnifying-glass"></span> Cari</button>
      </form>

      <!-- Menu & Login -->
      <div class="flex items-center gap-6">
        <ul class="flex gap-4">
          <li>
            <a href="/course/" class="text-white px-3 py-1 rounded transition duration-200 hover:bg-[#FFD966] hover:text-[#3399FF]">ALL COURSES</a>
          </li>
          <li>
            <a href="/my/" class="text-white px-3 py-1 rounded transition duration-200 hover:bg-[#FFD966] hover:text-[#3399FF]">MY COURSES</a>
          </li>
        </ul>
        <a href="/login" class="btn flex items-center gap-2 bg-[#FFD966] text-[#3399FF] px-4 py-2 rounded font-bold"><span class="flaticon-user"></span> <span class="hidden md:inline">Log in</span></a>
      </div>
    </nav>
  </header>
</template>

<script setup>
// Navbar CloudCampus modern
</script>
