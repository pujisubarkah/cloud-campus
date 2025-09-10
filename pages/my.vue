<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-poppins pt-16">
    <!-- Header dengan animasi -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div class="max-w-6xl mx-auto px-6">
        <nav class="breadcrumb mb-6" aria-label="breadcrumb">
          <ol class="flex space-x-2 text-sm opacity-90">
            <li><NuxtLink to="/" class="hover:underline">Beranda</NuxtLink></li>
            <li><span class="mx-2">/</span></li>
            <li class="font-semibold">Kursus Saya</li>
          </ol>
        </nav>
        <div class="flex items-center space-x-4">
          <div class="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div>
            <h1 class="text-4xl font-bold mb-2">Kursus yang Anda Ikuti</h1>
            <p class="text-xl opacity-90">Lihat progres dan lanjutkan materi yang sedang dipelajari.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-6 -mt-8 pb-12">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Konten Utama -->
        <div class="flex-1">
          <!-- Loading State -->
          <div v-if="isLoading" class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div class="text-center py-16">
              <div class="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p class="text-gray-500">Memuat data kursus...</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <div class="text-center py-16">
              <div class="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-red-800">Terjadi Kesalahan</h3>
              <p class="text-red-600 mb-8">{{ error }}</p>
              <button @click="fetchEnrollmentsAndProgress" class="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow hover:bg-red-700 transition">
                Coba Lagi
              </button>
            </div>
          </div>

          <!-- Main Content -->
          <div v-else>
            <!-- Kartu Statistik -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <!-- Total Kursus -->
              <div class="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                <div class="flex items-center">
                  <div class="bg-blue-100 p-3 rounded-xl">
                    <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4M4 7h16"/>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm text-gray-600">Total Kursus</p>
                    <p class="text-2xl font-bold text-gray-800">{{ enrollments.length }}</p>
                  </div>
                </div>
              </div>
              <!-- Selesai -->
              <div class="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                <div class="flex items-center">
                  <div class="bg-green-100 p-3 rounded-xl">
                    <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="white"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13l3 3 7-7"/>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm text-gray-600">Selesai</p>
                    <p class="text-2xl font-bold text-gray-800">{{ enrollments.filter(e => courseProgress[String(e.course_id)]?.overall_percent === 100).length }}</p>
                  </div>
                </div>
              </div>
              <!-- Sedang Berjalan -->
              <div class="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <div class="flex items-center">
                  <div class="bg-orange-100 p-3 rounded-xl">
                    <svg class="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="white"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm text-gray-600">Sedang Berjalan</p>
                    <p class="text-2xl font-bold text-gray-800">{{ enrollments.filter(e => {
                      const p = courseProgress[String(e.course_id)]?.overall_percent || 0;
                      return p > 0 && p < 100;
                    }).length }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Kartu Kursus -->
            <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <!-- Belum Login -->
              <div v-if="!auth.isLoggedIn" class="text-center py-16">
                <div class="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <h2 class="text-3xl font-bold mb-4 text-gray-800">Selamat Datang Kembali!</h2>
                <p class="text-gray-600 mb-8 text-lg">Silakan masuk untuk mengakses materi pembelajaran dan melanjutkan perjalanan Anda.</p>
                <NuxtLink to="/login" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                  </svg>
                  Masuk untuk Melanjutkan
                </NuxtLink>
              </div>

              <!-- Belum Ada Kursus -->
              <div v-else-if="enrollments.length === 0" class="text-center py-16">
                <div class="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold mb-4 text-gray-800">Belum Ada Kursus</h3>
                <p class="text-gray-600 mb-8">Ayo mulai langkah pertama Anda dengan bergabung di kursus pilihan!</p>
                <NuxtLink to="/course" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition">
                  Jelajahi Kursus
                </NuxtLink>
              </div>

              <!-- Daftar Kursus -->
              <div v-else>
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                  <div>
                    <h2 class="text-2xl font-bold text-gray-800">Kursus Anda</h2>
                    <div class="text-sm text-gray-600 mt-1">{{ enrollments.length }} kursus terdaftar</div>
                  </div>
                  <div class="flex flex-col md:flex-row gap-2 items-center">
                    <input v-model="searchQuery" type="text" placeholder="Cari kursus..." class="px-3 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" />
                    <select v-model="filterStatus" class="px-3 py-2 rounded-xl border border-gray-300 text-sm">
                      <option value="">Semua Status</option>
                      <option value="berjalan">Sedang Berjalan</option>
                      <option value="selesai">Selesai</option>
                      <option value="belum">Belum Dimulai</option>
                    </select>
                    <select v-model="sortBy" class="px-3 py-2 rounded-xl border border-gray-300 text-sm">
                      <option value="">Urutkan</option>
                      <option value="tanggal">Tanggal Pendaftaran</option>
                      <option value="kemajuan">Kemajuan</option>
                      <option value="abjad">Abjad</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div v-for="enroll in filteredSortedEnrollments" :key="enroll.id" 
                       class="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    
                    <!-- Gambar Kursus -->
                    <div class="relative overflow-hidden h-48">
                      <img :src="enroll.course_thumbnail" 
                           :alt="enroll.course_title"
                           class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div class="absolute top-4 right-4">
                        <span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Terdaftar
                        </span>
                      </div>
                    </div>

                    <!-- Konten Kursus -->
                    <div class="p-6">
                      <div class="mb-4">
                        <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{{ enroll.course_title }}</h3>
                        <p class="text-gray-600 text-sm line-clamp-3">{{ enroll.course_description }}</p>
                      </div>

                      <!-- Progress Bar -->
                      <div class="mb-4">
                        <div class="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Kemajuan</span>
                          <span>
                            {{ courseProgress[String(enroll.course_id)]?.overall_percent || 0 }}%
                            <span v-if="courseProgress[String(enroll.course_id)]?.completed_sections !== undefined && courseProgress[String(enroll.course_id)]?.total_sections !== undefined">
                              &nbsp;({{ courseProgress[String(enroll.course_id)]?.completed_sections }}/{{ courseProgress[String(enroll.course_id)]?.total_sections }} section selesai)
                            </span>
                          </span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2 cursor-pointer group" @click="showProgressModal(enroll)">
                          <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full group-hover:shadow-lg transition-all duration-300" 
                            :style="{ width: `${courseProgress[String(enroll.course_id)]?.overall_percent || 0}%` }"></div>
                        </div>
                      </div>
      <!-- Modal Progress Section List -->
      <div v-if="progressModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center relative">
          <button @click="progressModalOpen = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <h2 class="text-xl font-bold mb-4 text-blue-700">Progress Materi: {{ progressModalCourse?.course_title }}</h2>
          <div v-if="progressModalSections.length > 0" class="space-y-3 text-left">
            <div v-for="section in progressModalSections" :key="section.id" class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
              <span class="font-semibold text-gray-800">{{ section.title }}</span>
              <span v-if="section.completed" class="ml-auto px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="white"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13l3 3 7-7"/></svg>
                Selesai
              </span>
              <span v-else class="ml-auto px-2 py-1 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="white"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                Belum Selesai
              </span>
            </div>
          </div>
          <div v-else class="text-gray-500">Tidak ada data section untuk kursus ini.</div>
        </div>
      </div>

                      <!-- Tombol Aksi di Bawah Card -->
                    </div>
                    <div class="px-6 pb-6 flex flex-col gap-3">
                      <NuxtLink
                        v-if="enroll.course_id"
                        :to="`/course/${enroll.course_id}/materi`"
                        class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-lg">
                        <svg class="w-5 h-5 inline-block mr-2 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17l5-5m0 0l-5-5m5 5H6"/>
                        </svg>
                        Lanjutkan Belajar
                      </NuxtLink>
                      <button v-else disabled class="w-full bg-gray-200 text-gray-400 text-center py-3 rounded-xl font-bold shadow cursor-not-allowed text-lg">
                        <svg class="w-5 h-5 inline-block mr-2 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17l5-5m0 0l-5-5m5 5H6"/>
                        </svg>
                        Lanjutkan Belajar
                      </button>
                      <button
                        class="w-full px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition"
                        :aria-pressed="bookmarks[String(enroll.course_id)] ? 'true' : 'false'"
                        @click="toggleBookmark(enroll.course_id)"
                      >
                        <svg v-if="bookmarks[String(enroll.course_id)]" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar yang Ditingkatkan -->
        <div class="w-full lg:w-80 space-y-6">
          <!-- Widget Timeline -->
          <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div class="flex items-center mb-6">
              <div class="bg-blue-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 ml-3">Timeline</h3>
            </div>
            
            <div class="text-center py-8">
              <div class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p class="text-gray-500 text-sm">Tidak ada aktivitas yang memerlukan tindakan</p>
            </div>
          </div>

          <!-- Acara Mendatang -->
          <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div class="flex items-center mb-6">
              <div class="bg-purple-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 012 2z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 ml-3">Acara Mendatang</h3>
            </div>

            <div class="space-y-4">
              <!-- Kehadiran Event -->
              <div class="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div class="bg-blue-100 p-2 rounded-lg">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-800 text-sm">Kehadiran</h4>
                  <p class="text-xs text-gray-600">Senin, 4 Agustus, 10:00 - 13:00</p>
                  <button @click="downloadICS('Kehadiran', '2025-08-04T10:00:00', '2025-08-04T13:00:00', 'Kehadiran di webinar', 'Online')"
                    class="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded shadow hover:bg-blue-700 transition">
                    Tambahkan ke Kalender
                  </button>
                </div>
              </div>

              <!-- Batas Proyek Akhir Event -->
              <div class="flex items-start space-x-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                <div class="bg-yellow-100 p-2 rounded-lg">
                  <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-800 text-sm">Batas Proyek Akhir</h4>
                  <p class="text-xs text-gray-600">Jumat, 8 Agustus, 23:59</p>
                  <button @click="downloadICS('Batas Proyek Akhir', '2025-08-08T23:00:00', '2025-08-08T23:59:00', 'Deadline pengumpulan proyek akhir', 'Online')"
                    class="mt-2 px-3 py-1 bg-yellow-500 text-white text-xs rounded shadow hover:bg-yellow-600 transition">
                    Tambahkan ke Kalender
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100">
              <a href="#" class="text-blue-600 hover:text-blue-700 text-sm font-medium">Lihat semua acara →</a>
            </div>
          </div>

          <!-- Webinar Saya -->
          <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div class="flex items-center mb-6">
              <div class="bg-purple-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10V3m-6 7V3m-4 8h16M5 21h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 ml-3">Webinar Saya</h3>
            </div>

            <div v-if="isLoadingWebinar" class="text-center py-8">
              <div class="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p class="text-gray-500 text-sm">Memuat webinar...</p>
            </div>
            <div v-else-if="webinars.length === 0" class="text-center py-8">
              <div class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10V3m-6 7V3m-4 8h16M5 21h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
              <p class="text-gray-500 text-sm">Belum ada webinar yang Anda ikuti</p>
            </div>
            <div v-else class="space-y-4">
              <div v-for="webinar in webinars" :key="webinar.id" class="flex items-start space-x-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                <div class="bg-purple-100 p-2 rounded-lg">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10V3m-6 7V3m-4 8h16M5 21h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-800 text-sm">{{ webinar.title }}</h4>
                  <p class="text-xs text-gray-600">{{ webinar.date }} | {{ webinar.time }}</p>
                  <p class="text-xs text-gray-500">{{ webinar.description }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100">
              <a href="/webinar" class="text-purple-600 hover:text-purple-700 text-sm font-medium">Lihat semua webinar →</a>
            </div>
          </div>

          <!-- Tips Belajar -->
          <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-6 border border-green-100">
            <div class="flex items-center mb-4">
              <div class="bg-green-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 ml-3">Tips Belajar</h3>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">
              "Beristirahatlah secara teratur setiap 25 menit untuk meningkatkan fokus dan daya ingat. Otak Anda akan berterima kasih!"
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Modal state and logic for progress detail
const progressModalOpen = ref(false)
const progressModalCourse = ref<any>(null)
const progressModalSections = ref<any[]>([])

async function showProgressModal(enroll: any) {
  progressModalCourse.value = enroll
  progressModalSections.value = []
  progressModalOpen.value = true
  // Fetch sections for this course
  try {
    const res = await $fetch('/api/course_section', { params: { course_id: enroll.course_id } })
    let sections = Array.isArray(res) ? res : (res.sections || [])
    // Mark completed status
    const completedSectionIds: number[] = []
    if (courseProgress.value[String(enroll.course_id)]?.progress_rows) {
      completedSectionIds.push(...(courseProgress.value[String(enroll.course_id)]?.progress_rows?.filter((row: any) => (row.progress_percent ?? 0) >= 100).map((row: any) => row.section_id) ?? []))
    }
    progressModalSections.value = sections.map((s: any) => ({
      id: s.id,
      title: s.title,
      completed: completedSectionIds.includes(s.id)
    }))
  } catch (err) {
    progressModalSections.value = []
  }
}
// Function to generate and download .ics calendar file
function downloadICS(title: string, start: string, end: string, description: string, location: string) {
  const pad = (n: number) => n < 10 ? '0' + n : n
  function formatICSDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.getUTCFullYear().toString() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + '00Z'
  }
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${formatICSDate(start)}\nDTEND:${formatICSDate(end)}\nDESCRIPTION:${description}\nLOCATION:${location}\nEND:VEVENT\nEND:VCALENDAR`
  const blob = new Blob([ics.replace(/\n/g, '\r\n')], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title.replace(/\s+/g, '_')}.ics`
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}
// Filter, sorting, and search state
import { computed } from 'vue'
const searchQuery = ref('')
const filterStatus = ref('')
const sortBy = ref('')

const filteredSortedEnrollments = computed(() => {
  let result = enrollments.value.slice()
  // Search
  if (searchQuery.value) {
    result = result.filter(e => e.course_title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }
  // Filter
  if (filterStatus.value) {
    result = result.filter(e => {
      const progress = courseProgress.value[String(e.course_id)]?.overall_percent || 0
      if (filterStatus.value === 'berjalan') return progress > 0 && progress < 100
      if (filterStatus.value === 'selesai') return progress === 100
      if (filterStatus.value === 'belum') return progress === 0
      return true
    })
  }
  // Sort
  if (sortBy.value === 'tanggal') {
    result = result.sort((a, b) => (a.id > b.id ? 1 : -1))
  } else if (sortBy.value === 'kemajuan') {
    result = result.sort((a, b) => {
      const pa = courseProgress.value[String(a.course_id)]?.overall_percent || 0
      const pb = courseProgress.value[String(b.course_id)]?.overall_percent || 0
      return pb - pa
    })
  } else if (sortBy.value === 'abjad') {
    result = result.sort((a, b) => a.course_title.localeCompare(b.course_title))
  }
  return result
})
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const userId = auth.user?.id
interface Enrollment {
  id: number
  course_id: number
  course_title: string
  course_description: string
  course_thumbnail: string
  // tambahkan properti lain sesuai kebutuhan
}
const enrollments = ref<Enrollment[]>([])
const isLoading = ref(false)
const error = ref('')

const webinars = ref([
  {
    id: 1,
    title: 'Webinar: Strategi Pengentasan Kemiskinan',
    date: 'Senin, 4 Agustus',
    time: '10:00 - 12:00',
    description: 'Webinar bersama pakar ekonomi membahas strategi terbaru.'
  },
  {
    id: 2,
    title: 'Webinar: Diskusi Kelompok',
    date: 'Rabu, 6 Agustus',
    time: '14:00 - 15:30',
    description: 'Diskusi interaktif bersama peserta lain.'
  }
])
const isLoadingWebinar = ref(false)

const courses = ref<Enrollment[]>([]) // Daftar course user
interface CourseProgress {
  overall_percent: number
  completed_sections?: number
  total_sections?: number
  progress_rows?: Array<{ section_id: number; progress_percent?: number }>
  // tambahkan properti lain sesuai kebutuhan
}
const courseProgress = ref<Record<string, CourseProgress>>({}) // Key: course_id as string, Value: { overall_percent, ... }

const fetchEnrollmentsAndProgress = async () => {
  auth.loadFromStorage?.();
  if (!auth.isLoggedIn || !auth.user?.token) {
    enrollments.value = [];
    courseProgress.value = {};
    return;
  }
  isLoading.value = true;
  error.value = '';
  try {
    // Debug: log before fetching
    console.log('[DEBUG] Fetching enrollments and progress for user:', auth.user?.id);
    // Fetch enrollments
    const responseData: any = await $fetch('/api/enrollment', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.user?.token || ''}`
      }
    });
    console.log('[DEBUG] Enrollment response:', responseData);
    enrollments.value = responseData.enrollments || [];
    // Fetch course progress (sinkron dengan materi)
    const progressRes = await $fetch('/api/course_progress', {
      method: 'GET',
      params: { user_id: userId }
    });
    console.log('[DEBUG] Course progress response:', progressRes);
    courseProgress.value = (progressRes && typeof progressRes === 'object') ? progressRes as Record<string, CourseProgress> : {};
  } catch (err: any) {
    error.value = err?.message || 'Gagal memuat data kursus.';
    enrollments.value = [];
    courseProgress.value = {};
    console.error('[DEBUG] Error fetching enrollments/progress:', err);
  } finally {
    isLoading.value = false;
  }
}

// Auto-refresh dashboard when returning from a course
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('focus', () => {
    if (auth.user?.id) {
      fetchEnrollmentsAndProgress();
    }
  });
}

// On component mounted
onMounted(() => {
  if (auth.user?.id) {
    fetchEnrollmentsAndProgress();
  }
});

// Watcher agar progress tetap update saat userId berubah (misal setelah login/refresh)
watch(
  () => auth.user?.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      fetchEnrollmentsAndProgress();
    }
  }
);

// Bookmark logic
const bookmarks = ref<Record<string, boolean>>({})

function loadBookmarks() {
  const raw = localStorage.getItem('bookmarks_' + (auth.user?.id || ''))
  if (raw) {
    try {
      bookmarks.value = JSON.parse(raw)
    } catch {}
  }
}
function saveBookmarks() {
  localStorage.setItem('bookmarks_' + (auth.user?.id || ''), JSON.stringify(bookmarks.value))
}
function toggleBookmark(courseId: string | number) {
  const key = String(courseId)
  bookmarks.value[key] = !bookmarks.value[key]
  saveBookmarks()
}
onMounted(() => {
  loadBookmarks()
})
watch(() => auth.user?.id, () => {
  loadBookmarks()
})
  </script>
