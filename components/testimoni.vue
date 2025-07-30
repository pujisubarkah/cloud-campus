<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'
const testimonials = [
  {
    quote: 'Udemy was rated the <b>most popular online course or certification program</b> for learning how to code according to <a target="_blank" rel="noreferrer" class="link" href="https://survey.stackoverflow.co/2023/#section-learning-to-code-online-course-platforms-to-learn-how-to-code">StackOverflow’s 2023 Developer survey</a>.',
    sourceImg: 'https://cms-images.udemycdn.com/96883mtakkm8/2PBcNgsQa3SvYWklkiN27r/5b8707cc79c8cae5774d5eb3b88b4001/logo_stackoverflow.svg',
    source: '37,076 responses collected',
    cta: {
      text: 'View Web Development courses',
      link: 'https://www.udemy.com/topic/web-development/'
    }
  },
  {
    quote: 'Udemy was truly <b>a game-changer and a great guide</b> for me as we brought Dimensional to life.',
    sourceImg: 'https://cms-images.udemycdn.com/96883mtakkm8/1Djz6c0gZLaCG5SQS3PgUY/54b6fb8c85d8da01da95cbb94fa6335f/Alvin_Lim.jpeg',
    source: 'Alvin Lim, Technical Co-Founder, CTO at Dimensional',
    cta: {
      text: 'View this iOS & Swift course',
      link: 'https://www.udemy.com/course/ios-13-app-development-bootcamp/'
    }
  },
  {
    quote: 'Udemy gives you the ability to be persistent. I learned exactly what I needed to know in the real world. It helped me sell myself to <b>get a new role.</b>',
    sourceImg: 'https://cms-images.udemycdn.com/96883mtakkm8/6dT7xusLHYoOUizXeVqgUk/4317f63fe25b2e07ad8c70cda641014b/William_A_Wachlin.jpeg',
    source: 'William A. Wachlin, Partner Account Manager at Amazon Web Services',
    cta: {
      text: 'View this AWS course',
      link: 'https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/'
    }
  },
  {
    quote: 'With Udemy Business employees were able to marry the two together, technology and consultant soft skills... to help <b>drive their careers forward.</b>',
    sourceImg: 'https://cms-images.udemycdn.com/96883mtakkm8/4w9dYD4F64ibQwsaAB01Z4/c4610e9b1ac65589d8b1374ad10714e2/Ian_Stevens.png',
    source: 'Ian Stevens, Head of Capability Development, North America at Publicis Sapient',
    cta: {
      text: 'Read full story',
      link: 'https://business.udemy.com/case-studies/publicis-sapient/?ref=Ian_Stevens_Testimonial_LOHP'
    }
  }
]
</script>

<template>
  <section aria-labelledby="testimonials-unit-title" class="py-12 bg-base-100">
    <div class="container mx-auto px-4">
      <div class="mb-8 text-center">
        <h2 id="testimonials-unit-title" class="text-3xl md:text-4xl font-serif font-bold mb-2">See what others are achieving through learning</h2>
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
