<template>
  <div class="top_courses ccnWithFoot bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
    <a :href="course.link" target="_blank" class="block">
      <div class="thumb relative">
        <img :src="course.image" alt="" class="w-full h-48 object-cover" />
        <div class="overlay absolute inset-0 bg-black bg-opacity-10 flex items-end p-2">
          <span class="tc_preview_course text-white text-xs bg-primary px-2 py-1 rounded">View all courses</span>
        </div>
      </div>
    </a>
    <div class="details p-4">
      <div class="tc_content">
        <h5 class="font-bold text-base mb-2">
          <a :href="course.link" target="_blank" class="hover:text-primary">{{ course.title }}</a>
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  course: Object
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
