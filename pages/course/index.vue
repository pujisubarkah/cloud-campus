<template>
  <div class="bg-base-100 py-8 pt-24">
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
import { ref, onMounted } from 'vue'
import CourseCard from '~/components/CourseCard.vue'

const courses = ref([])

onMounted(async () => {
  const res = await fetch('/api/course')
  const data = await res.json()
  courses.value = data
})
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
