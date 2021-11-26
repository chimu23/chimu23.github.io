<script setup>
import { ref } from 'vue'
defineProps({
  list: [],
})
const currentIndex = ref(0)
</script>

<template>
  <ul class="flex items-center w-full text-sm h-6 overflow-hidden">
    <li
      :class="[currentIndex === index ? 'text-theme text-base' : 'text-gray-300']"
      class="relative mr-2 transition-all cursor-pointer"
      v-for="(item, index) in list"
      :key="index"
      @click=";(currentIndex = index), $emit('change', currentIndex)"
    >
      {{ item }}
      <div v-if="currentIndex === index" class=" w-2 h-2 absolute bottom-0 -right-1.5 rounded-full border-r-2 border-b-2 border-indigo-300"></div>
    </li>
  </ul>
</template>
