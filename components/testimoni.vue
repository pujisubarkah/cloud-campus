<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'
const testimonials = [
  {
    quote: 'Program Akademi Pengentasan Kemiskinan telah membantu saya mendapatkan keterampilan baru dan peluang kerja yang lebih baik di desa saya.',
    sourceImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    source: 'Budi Santoso, Peserta Akademi 2024',
    cta: {
      text: 'Lihat kisah Budi',
      link: '#'
    }
  },
  {
    quote: 'Saya sangat terbantu dengan pelatihan digital marketing dari Akademi. Sekarang usaha kecil saya berkembang pesat.',
    sourceImg: 'https://randomuser.me/api/portraits/women/44.jpg',
    source: 'Siti Aminah, UMKM Desa',
    cta: {
      text: 'Lihat kisah Siti',
      link: '#'
    }
  },
  {
    quote: 'Akademi ini memberikan harapan baru bagi generasi muda di daerah kami untuk keluar dari lingkaran kemiskinan.',
    sourceImg: 'https://randomuser.me/api/portraits/men/65.jpg',
    source: 'Rizky Pratama, Relawan Pengajar',
    cta: {
      text: 'Lihat kisah Rizky',
      link: '#'
    }
  },
  {
    quote: 'Materi yang diberikan sangat relevan dan mudah dipahami. Saya kini lebih percaya diri untuk mencari pekerjaan.',
    sourceImg: 'https://randomuser.me/api/portraits/women/68.jpg',
    source: 'Dewi Lestari, Alumni Akademi',
    cta: {
      text: 'Lihat kisah Dewi',
      link: '#'
    }
  }
]
</script>

<template>
  <section aria-labelledby="testimonials-unit-title" class="py-12 bg-base-100">
    <div class="container mx-auto px-4">
      <div class="mb-8 text-center">
        <h2 id="testimonials-unit-title" class="text-3xl md:text-4xl font-serif font-bold mb-2">Cerita Sukses Alumni Akademi Pengentasan Kemiskinan</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div v-for="(t, i) in testimonials" :key="i" class="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 items-center">
          <div class="flex items-center gap-3 mb-2">
            <img src="https://s.udemycdn.com/browse_components/student-quote-unit/quote.svg" alt="quote" width="18" height="16" />
            <span class="text-base text-gray-700" v-html="t.quote"></span>
          </div>
          <div class="flex items-center gap-3">
            <img :src="t.sourceImg" alt="source" class="rounded-full w-12 h-12 object-cover" />
            <span class="text-sm text-gray-500">{{ t.source }}</span>
          </div>
          <a :href="t.cta.link" target="_blank" rel="noopener" class="btn btn-link text-primary font-semibold flex items-center gap-2">
            {{ t.cta.text }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
