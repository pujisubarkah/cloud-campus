
<script setup>
const povertyCourses = [
  {
    title: 'Semi-close loop ecosystem dalam Pengentasan kemiskinan',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Rencana Induk Pengentasan kemiskinan',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Industrialisasi untuk Memerdekakan Rakyat Miskin',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Penyusunan Proposal',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Studi Kasus Inovasi Pengentasan Kemiskinan',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Penyusunan proposal Pengentasan Kemiskinan',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
    link: '#'
  }
];
</script>

<template>
  <section class="features-course pb-20">
    <div class="container mx-auto px-4">
      <div class="flex justify-center">
        <div class="max-w-xl w-full">
          <div class="main-title text-center">
            <h3 class="mb-0 mt-0" data-ccn="title">Materi Pengentasan Kemiskinan</h3>
            <p data-ccn="subtitle"></p>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <div class="w-full">
          <div class="flex gap-6 overflow-x-auto pb-4">
            <div v-for="course in povertyCourses" :key="course.title" class="min-w-[355px]">
              <div class="top_courses ccnWithFoot hbmsu-masonry-grid-custom bg-white rounded-lg shadow p-2">
                <div class="thumb relative">
                  <img class="img-whp rounded-lg" :src="course.img" :alt="course.title">
                  <a class="overlay absolute inset-0 flex items-center justify-center" :href="course.link">
                    <div class="tag bg-[#FFD966] text-[#3399FF] px-2 py-1 rounded" data-ccn="hover_accent">View Materi</div>
                  </a>
                </div>
                <div class="details mt-2">
                  <div class="tc_content">
                    <a :href="course.link"><h5 class="font-bold">{{ course.title }}</h5></a>
                  </div>
                </div>
                <div class="course-start-date-status text-xs text-gray-500 mt-1"><span>Self Study</span></div>
                <div class="tc_footer flex justify-end items-center mt-2">
                  <!-- Add more info if needed -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
