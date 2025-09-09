<template>
  <aside class="w-64 bg-white shadow rounded-lg p-4 h-fit sticky top-24">
    <nav class="flex flex-col gap-2">
      <button :class="menuClass('profile')" @click="$emit('select', 'profile')">
        Profile
      </button>
      <button :class="menuClass('identitas')" @click="$emit('select', 'identitas')">
        Identitas Kepegawaian
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps<{ selected: string }>();
const emit = defineEmits(['select']);

function menuClass(menu: string) {
  return [
    'text-left px-4 py-2 rounded font-semibold',
    props.selected === menu ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
  ].join(' ');
}
</script>

<style scoped>
</style>
