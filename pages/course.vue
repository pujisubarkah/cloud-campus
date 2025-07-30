<template>
  <div class="bg-base-100 py-8">
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
    id: 66,
    title: 'AI and Technology - الذكاء الاصطناعي والتكنولوجيا',
    image: 'https://cloudcampus.hbmsu.ac.ae/pluginfile.php/187988/course/overviewfiles/Develop%20digital%20skills.png',
    link: 'https://cloudcampus.hbmsu.ac.ae/course/index.php?categoryid=66',
  },
  {
    id: 67,
    title: 'Entrepreneurship - ريادة الأعمال',
    image: 'https://cloudcampus.hbmsu.ac.ae/pluginfile.php/136082/course/overviewfiles/1-million-arab-entrepreneurs.jpg',
    link: 'https://cloudcampus.hbmsu.ac.ae/course/index.php?categoryid=67',
  },
  {
    id: 69,
    title: 'Education - التعليم',
    image: 'https://cloudcampus.hbmsu.ac.ae/pluginfile.php/187520/course/overviewfiles/Screenshot%202025-05-08%20101623.png',
    link: 'https://cloudcampus.hbmsu.ac.ae/course/index.php?categoryid=69',
  },
  {
    id: 70,
    title: 'Innovation - الابتكار',
    image: 'https://cloudcampus.hbmsu.ac.ae/pluginfile.php/186320/course/overviewfiles/Course358.png',
    link: 'https://cloudcampus.hbmsu.ac.ae/course/index.php?categoryid=70',
  },
  {
    id: 71,
    title: 'Leadership & Management - القيادة والإدارة',
    image: 'https://cloudcampus.hbmsu.ac.ae/pluginfile.php/186375/course/overviewfiles/Screenshot%202025-04-25%20093804.png',
    link: 'https://cloudcampus.hbmsu.ac.ae/course/index.php?categoryid=71',
  },
  {
    id: 72,
    title: 'Quality & Excellence - الجودة والتميز',
    image: 'https://cloudcampus.hbmsu.ac.ae/pluginfile.php/188025/course/overviewfiles/Course%20thumbnail%20image2%20%281%29.jpg',
    link: 'https://cloudcampus.hbmsu.ac.ae/course/index.php?categoryid=72',
  },
  {
    id: 89,
    title: 'Health Sciences | العلوم الصحية',
    image: 'https://cloudcampus.hbmsu.ac.ae/pluginfile.php/187530/course/overviewfiles/thmbnail%20image.jpg',
    link: 'https://cloudcampus.hbmsu.ac.ae/course/index.php?categoryid=89',
  },
  {
    id: 90,
    title: 'Environment & Sustainability | البيئة والاستدامة',
    image: 'https://cloudcampus.hbmsu.ac.ae/pluginfile.php/186802/course/overviewfiles/Screenshot%202025-04-24%20193335.png',
    link: 'https://cloudcampus.hbmsu.ac.ae/course/index.php?categoryid=90',
  },
  {
    id: 68,
    title: 'Seminars - الندوات',
    image: 'https://cloudcampus.hbmsu.ac.ae/pluginfile.php/152987/course/overviewfiles/Dr.%20Mansoor-ignite%20-1.jpg',
    link: 'https://cloudcampus.hbmsu.ac.ae/course/index.php?categoryid=68',
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
