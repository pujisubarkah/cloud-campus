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
        <div class="my_course_content mb-8 bg-white rounded-xl shadow-lg p-6">
          <!-- Header filter dan search -->
          <div class="my_course_content_header mb-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
              <div class="flex-grow mb-2 md:mb-0">
                <form class="flex items-center w-full">
                  <input type="text" class="form-control rounded-lg px-4 py-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-200" placeholder="Search courses..." name="search" autocomplete="off" />
                  <button type="button" class="ml-2 text-gray-400 hover:text-blue-500">
                    <span class="sr-only">Clear search input</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </form>
              </div>
              <div class="flex items-center space-x-2">
                <div class="dropdown">
                  <button type="button" class="btn btn-outline-blue-500 border-blue-500 text-blue-500 font-medium rounded-lg px-4 py-2 hover:bg-blue-50 transition">All</button>
                </div>
                <div class="dropdown">
                  <button type="button" class="btn btn-outline-blue-500 border-blue-500 text-blue-500 font-medium rounded-lg px-4 py-2 hover:bg-blue-50 transition">Sort by course name</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Course list -->
          <div class="container-fluid p-0">
            <div class="my_course_content_list" role="list">
              <div class="mc_content_list flex flex-col md:flex-row bg-gradient-to-r from-blue-50 via-white to-yellow-50 rounded-xl shadow p-6 mb-6 border border-gray-100" role="listitem">
                <div class="thumb mr-6 mb-4 md:mb-0 flex items-center justify-center">
                  <img class="w-36 h-36 object-cover rounded-xl border border-blue-100 shadow-sm" src="https://cloudcampus.hbmsu.ac.ae/theme/image.php/edumy/block_myoverview/1750320906/courses" alt="Course image" />
                </div>
                <div class="details flex-1 flex flex-col justify-center">
                  <div class="mc_content">
                    <p class="subtitle text-sm text-blue-500 mb-1 font-medium">Professional Diplomas</p>
                    <h5 class="title text-2xl font-bold mb-2 text-gray-800">Indonesia Executive Leadership Program</h5>
                    <div class="ccn_mc_content_header_status mb-2"><small class="tag bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold">Published</small></div>
                    <div class="ccn_mc_progress mb-2">
                      <div class="progress bg-gray-200 h-3 rounded-full">
                        <div class="progress-bar bg-blue-500 h-3 rounded-full transition-all duration-500" style="width: 67%"></div>
                      </div>
                      <div class="text-xs mt-2 text-gray-600"><strong>67</strong>% complete</div>
                    </div>
                    <div class="flex items-center space-x-4 mt-4">
                      <NuxtLink :to="`/courses/497`" class="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition">View</NuxtLink>
                      <button class="text-yellow-500" title="Starred course"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" /></svg></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Pagination -->
          <div class="flex justify-center mt-6">
            <button class="page-item disabled px-4 py-2 text-gray-400 bg-gray-100 rounded-l-lg" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button class="page-item disabled px-4 py-2 text-gray-400 bg-gray-100 rounded-r-lg" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Sidebar di kanan -->
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

<script setup>
// Halaman sementara, tidak ada logic khusus
</script>
