<template>
  <div class="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-yellow-50 text-gray-800 font-poppins">
    <nav class="breadcrumb_widgets ccn-clip-l w-full max-w-6xl mx-auto mt-8 mb-6 px-6" aria-label="breadcrumb">
      <div class="flex items-center justify-between">
        <h4 class="title text-xl font-semibold text-gray-700">My Courses</h4>
        <ol class="breadcrumb flex space-x-2 text-sm">
          <li class="breadcrumb-item">
            <NuxtLink to="/" class="text-blue-500 hover:underline">Home</NuxtLink>
          </li>
          <li class="breadcrumb-item">
            <span class="mx-1 text-gray-400">/</span>
            <NuxtLink to="/my" aria-current="page" class="text-blue-500 hover:underline">My Courses</NuxtLink>
          </li>
        </ol>
      </div>
    </nav>
    <div class="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-4 pb-12">
      <!-- Konten utama di kiri -->
      <div class="flex-1 order-2 lg:order-1">
        <!-- Jika belum login -->
        <div v-if="!auth.isLoggedIn" class="my_course_content mb-8 bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 class="text-2xl font-bold mb-4 text-blue-600">Silakan login dulu untuk mendapatkan materi</h2>
          <NuxtLink to="/login" class="btn btn-primary px-6 py-3 font-semibold rounded-xl shadow hover:bg-blue-600 transition">Login</NuxtLink>
        </div>
        <!-- Jika sudah login -->
        <div v-else class="my_course_content mb-8 bg-white rounded-xl shadow-lg p-6">
          <!-- Jika belum ada kursus yang diikuti -->
          <div v-if="enrollments.length === 0" class="text-center py-12 text-gray-400">
            Anda belum memiliki kursus yang diikuti.
          </div>
          <!-- Jika sudah ada kursus yang diikuti -->
          <div v-else>
            <!-- Daftar kursus yang diikuti -->
            <div class="my_course_content_list" role="list">
              <div v-for="enroll in enrollments" :key="enroll.enrollmentId" class="mc_content_list flex flex-col md:flex-row bg-gradient-to-r from-blue-50 via-white to-yellow-50 rounded-xl shadow p-6 mb-6 border border-gray-100" role="listitem">
                <div class="thumb mr-6 mb-4 md:mb-0 flex items-center justify-center">
                  <img :src="enroll.course_thumbnail" class="w-36 h-36 object-cover rounded-xl border border-blue-100 shadow-sm" :alt="enroll.course_title" />
                </div>
                <div class="details flex-1 flex flex-col justify-center">
                  <div class="mc_content">
                    <p class="subtitle text-sm text-blue-500 mb-1 font-medium">{{ enroll.course_title }}</p>
                    <h5 class="title text-2xl font-bold mb-2 text-gray-800">{{ enroll.course_title }}</h5>
                    <div class="ccn_mc_content_header_status mb-2">
                      <small class="tag bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold">Enrolled</small>
                    </div>
                    <p class="text-gray-600 mb-2">{{ enroll.course_description }}</p>
                    <div class="flex items-center space-x-4 mt-4">
                      <NuxtLink
                        :to="`/course/${enroll.course_id}/materi`"
                        class="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition"
                      >
                        View
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Sidebar tetap -->
      <div class="w-full lg:w-1/3 lg:sticky lg:top-8 h-fit order-1 lg:order-2">
        <!-- Timeline Block -->
        <aside class="block-region mb-8" aria-label="Blocks">
          <div class="block_timeline block ccnDashBl mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100" role="complementary">
            <h4 class="title ccnDashBlHd text-lg font-bold mb-4">Timeline</h4>
            <div class="ccnBlockContent ccnDashBlCt">
              <!-- Timeline filter and view selector -->
              <div class="flex flex-wrap gap-2 mb-4">
                <div class="dropdown">
                  <button type="button" class="btn btn-outline-blue-500 border-blue-500 text-blue-500 font-medium rounded-lg px-4 py-2 hover:bg-blue-50 transition">Next 7 days</button>
                </div>
                <div class="dropdown">
                  <button type="button" class="btn btn-outline-blue-500 border-blue-500 text-blue-500 font-medium rounded-lg px-4 py-2 hover:bg-blue-50 transition">Sort by dates</button>
                </div>
                <div class="flex-1">
                  <form class="flex items-center w-full">
                    <input type="text" class="form-control rounded-lg px-4 py-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-200" placeholder="Search by activity type or name" name="search" autocomplete="off" />
                    <button type="button" class="ml-2 text-gray-400 hover:text-blue-500">
                      <span class="sr-only">Clear search input</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </form>
                </div>
              </div>
              <div class="border-b pb-2 mb-4"></div>
              <!-- Timeline events -->
              <div class="text-center mt-6">
                <img src="https://cloudcampus.hbmsu.ac.ae/theme/image.php/edumy/block_timeline/1750320906/activities" alt="" class="mx-auto" style="height: 70px; width: 70px" />
                <p class="text-muted mt-2">No activities require action</p>
              </div>
            </div>
          </div>
        </aside>
        <!-- Upcoming Events Block -->
        <aside class="block-region mb-8" aria-label="Upcoming Events">
          <div class="block_calendar_upcoming block ccnDashBl mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100" role="complementary">
            <h4 class="title ccnDashBlHd text-lg font-bold mb-4">Upcoming events</h4>
            <div class="ccnBlockContent ccnDashBlCt">
              <div class="card-text content calendarwrapper">
                <div class="event d-flex border-bottom pt-4 pb-4">
                  <div class="activityiconcontainer small administration courseicon mr-4 flex items-center">
                    <img class="icon w-10 h-10 rounded-full border border-blue-100" alt="Activity event" title="Activity event" src="https://cloudcampus.hbmsu.ac.ae/theme/image.php/edumy/attendance/1750320906/monologo" />
                  </div>
                  <div class="overflow-auto">
                    <h6 class="d-flex mb-1 text-base font-semibold">
                      <a class="text-truncate text-blue-600 hover:underline" href="#">Attendance</a>
                    </h6>
                    <div class="date small text-gray-600">Monday, 4 August, 10:00 AM <strong>»</strong> 1:00 PM</div>
                  </div>
                </div>
                <div class="event d-flex border-bottom pt-4 pb-4">
                  <div class="activityiconcontainer small administration courseicon mr-4 flex items-center">
                    <img class="icon w-10 h-10 rounded-full border border-blue-100" alt="Activity event" title="Activity event" src="https://cloudcampus.hbmsu.ac.ae/theme/image.php/edumy/attendance/1750320906/monologo" />
                  </div>
                  <div class="overflow-auto">
                    <h6 class="d-flex mb-1 text-base font-semibold">
                      <a class="text-truncate text-blue-600 hover:underline" href="#">Attendance</a>
                    </h6>
                    <div class="date small text-gray-600">Tuesday, 5 August, 10:00 AM <strong>»</strong> 1:00 PM</div>
                  </div>
                </div>
                <div class="event d-flex border-bottom pt-4 pb-4">
                  <div class="activityiconcontainer small assessment courseicon mr-4 flex items-center">
                    <img class="icon w-10 h-10 rounded-full border border-yellow-100" alt="Activity event" title="Activity event" src="https://cloudcampus.hbmsu.ac.ae/theme/image.php/edumy/assign/1750320906/monologo" />
                  </div>
                  <div class="overflow-auto">
                    <h6 class="d-flex mb-1 text-base font-semibold">
                      <a class="text-truncate text-yellow-600 hover:underline" href="#">Submit Capstone Project Proposal is due</a>
                    </h6>
                    <div class="date small text-gray-600">Friday, 8 August, 11:59 PM</div>
                  </div>
                </div>
              </div>
              <div class="gotocal mt-4"><a class="text-blue-500 hover:underline font-medium" href="#">Go to calendar...</a></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
    <NuxtLink to="/" class="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold shadow hover:bg-blue-600 transition mt-8">Kembali ke Beranda</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
interface Enrollment {
  enrollmentId: string | number
  course_id: string | number
  course_thumbnail: string
  course_title: string
  course_slug: string
  course_description: string
}

const enrollments = ref<Enrollment[]>([])

onMounted(async () => {
  if (!auth.isLoggedIn) return
  try {
    const res = await $fetch('/api/enrollment', {
      method: 'GET'
    })
    if (res && !('error' in res)) {
      if ('enrollments' in res && Array.isArray((res as any).enrollments)) {
        enrollments.value = (res as any).enrollments.map((e: any) => ({
          enrollmentId: e.enrollmentId,
          course_id: e.course_id,
          course_thumbnail: e.course_thumbnail ?? '',
          course_title: e.course_title ?? '',
          course_slug: e.course_slug ?? '',
          course_description: e.course_description ?? ''
        }))
      } else if ('enrollment' in res && (res as any).enrollment) {
        // Handle single enrollment object
        const e = (res as any).enrollment
        enrollments.value = [{
          enrollmentId: e.id ?? e.enrollmentId,
          course_id: e.course_id,
          course_thumbnail: e.course_thumbnail ?? '',
          course_title: e.course_title ?? '',
          course_slug: e.course_slug ?? '',
          course_description: e.course_description ?? ''
        }]
      } else {
        enrollments.value = []
      }
    } else {
      enrollments.value = []
    }
  } catch (err) {
    enrollments.value = []
  }
})
</script>
