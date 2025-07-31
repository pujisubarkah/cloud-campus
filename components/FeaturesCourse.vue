
<script setup>
const povertyCourses = [
  {
    title: 'Semi-close loop ecosystem dalam Pengentasan Kemiskinan',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    desc: 'Membangun ekosistem berkelanjutan untuk mendukung pengentasan kemiskinan secara terpadu.',
    link: '#'
  },
  {
    title: 'Rencana Induk Pengentasan Kemiskinan',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    desc: 'Strategi dan perencanaan jangka panjang untuk menurunkan angka kemiskinan.',
    link: '#'
  },
  {
    title: 'Industrialisasi untuk Memerdekakan Rakyat Miskin',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    desc: 'Mendorong industrialisasi sebagai solusi untuk meningkatkan taraf hidup masyarakat miskin.',
    link: '#'
  },
  {
    title: 'Penyusunan Proposal',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    desc: 'Teknik dan tips dalam menyusun proposal program pengentasan kemiskinan yang efektif.',
    link: '#'
  },
  {
    title: 'Studi Kasus Inovasi Pengentasan Kemiskinan',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    desc: 'Belajar dari berbagai inovasi dan praktik terbaik di lapangan.',
    link: '#'
  },
  {
    title: 'Penyusunan proposal Pengentasan Kemiskinan',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
    desc: 'Langkah-langkah detail dalam membuat proposal pengentasan kemiskinan yang berdampak.',
    link: '#'
  }
];
</script>

<template>
  <section class="features-course pb-20">
    <div class="container mx-auto px-4">
      <div class="flex justify-center">
        <div class="max-w-xl w-full">
          <div class="main-title text-center mb-4">
            <h3 class="mb-0 mt-0 text-3xl font-bold text-blue-700" data-ccn="title">Materi Pengentasan Kemiskinan</h3>
            <p class="text-gray-600 mt-2" data-ccn="subtitle">Berbagai materi dan studi kasus untuk mendukung upaya pengentasan kemiskinan di Indonesia.</p>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <div class="w-full">
          <div class="flex gap-6 overflow-x-auto pb-4">
            <div v-for="course in povertyCourses" :key="course.title" class="min-w-[355px]">
              <div class="top_courses ccnWithFoot hbmsu-masonry-grid-custom bg-white rounded-xl shadow-lg p-4 transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl">
                <div class="thumb relative mb-2">
                  <img class="img-whp rounded-lg w-full h-48 object-cover" :src="course.img" :alt="course.title">
                  <a class="overlay absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-30 rounded-lg" :href="course.link">
                    <div class="tag bg-[#FFD966] text-[#3399FF] px-3 py-2 rounded font-semibold shadow">Lihat Materi</div>
                  </a>
                </div>
                <div class="details mt-2">
                  <div class="tc_content">
                    <a :href="course.link"><h5 class="font-bold text-lg text-gray-800 mb-1">{{ course.title }}</h5></a>
                    <p class="text-sm text-gray-600 mb-2">{{ course.desc }}</p>
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
