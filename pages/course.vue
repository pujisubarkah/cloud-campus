<template>
  <div class="bg-base-100 py-8 pt-16">
    <div class="container mx-auto px-4">
      <div class="flex flex-col gap-8">
        <!-- Search Bar -->
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div class="w-full md:w-1/3">
            <!-- Placeholder for instructor search result -->
          </div>
          <div class="w-full md:w-2/3 flex justify-end">
            <form autocomplete="off" action="https://cloudcampus.hbmsu.ac.ae/search/index.php" method="get" class="flex gap-2">
              <input type="hidden" name="areaids" value="core_course-course" />
              <input type="text" class="input input-bordered" placeholder="Search courses" name="q" />
              <button class="btn btn-primary" type="submit"><span class="flaticon-magnifying-glass"></span></button>
            </form>
          </div>
        </div>
        <!-- Courses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <CourseCard
            v-for="course in courses"
            :key="course.id"
            :course="course"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import CourseCard from '~/components/CourseCard.vue'

const courses = [
  {
    id: 1,
    title: 'Semi-close loop ecosystem dalam Pengentasan Kemiskinan',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    id: 2,
    title: 'Rencana Induk Pengentasan Kemiskinan',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    id: 3,
    title: 'Industrialisasi untuk Memerdekakan Rakyat Miskin',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    id: 4,
    title: 'Penyusunan Proposal',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    id: 5,
    title: 'Studi Kasus Inovasi Pengentasan Kemiskinan',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    id: 6,
    title: 'Penyusunan proposal Pengentasan Kemiskinan',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
]


</script>

<style scoped>
.top_courses .thumb {
  position: relative;
}
.overlay {
  transition: background 0.2s;
}
.top_courses:hover .overlay {
  background: rgba(0,0,0,0.25);
}
</style>
