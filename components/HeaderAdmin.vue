<template>
  <header class="navbar bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-md px-6 z-10 text-white">
    <div class="flex-1 flex items-center gap-3">
      <Icon name="heroicons-outline:cog" class="w-8 h-8 text-yellow-300" />
      <h1 class="text-xl font-bold tracking-wide">Admin Dashboard</h1>
    </div>
    <div class="flex-none gap-4 flex items-center">
      <!-- Notification Bell (Lucide) -->
      <button class="relative btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <!-- Mail (Lucide) -->
      <button class="relative btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="3 7 12 13 21 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="absolute top-1 right-1 inline-block w-2 h-2 bg-green-500 rounded-full"></span>
      </button>
      <!-- Search -->
      <div class="form-control">
        <input type="text" placeholder="Search..." class="input input-bordered w-32 md:w-48 bg-white text-gray-700" />
      </div>
      <!-- Avatar Dropdown -->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full ring ring-yellow-300 ring-offset-base-100 ring-offset-2">
            <img src="https://i.pravatar.cc/100" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-gray-700">
          <li><a><Icon name="heroicons-outline:user" class="w-5 h-5 mr-2" /> Profile</a></li>
          <li><a><Icon name="heroicons-outline:cog" class="w-5 h-5 mr-2" /> Settings</a></li>
          <li><a><Icon name="heroicons-outline:logout" class="w-5 h-5 mr-2 text-red-400" /> Logout</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})
</script>
