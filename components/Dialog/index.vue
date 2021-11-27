<script setup>
import { onMounted, ref } from 'vue'
import Overlay from './Overlay.vue'

const props = defineProps({
  width: {
    type: String,
    default: '50%',
  },
  title: {
    type: String,
  },
  isShow: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits('update:isShow')
const dialogRef = ref(null)
onMounted(() => {
  dialogRef.value.focus()
})
</script>

<template>
  <div
    ref="dialogRef"
    v-show="isShow"
    @keydown.esc="$emit('update:isShow', false)"
    tabindex="-1"
  >
    <Overlay></Overlay>
    <div
      class="
        w-full
        min-w-min
        fixed
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
        z-30
      "
    >
      <div class="pt-6 pb-3 mx-auto bg-white rounded-md" :style="{ width }">
        <div
          class="text-center text-indigo-500 font-bold text-base -mt-1 pb-3"
          v-if="title"
        >
          {{ title }}
        </div>
        <slot></slot>
        <div class="flex justify-end pt-6 pr-3">
          <div
            class="btn btn-info mr-3"
            plain
            @click="$emit('update:isShow', false)"
			size="mini"
          >
            取消
          </div>
          <div class="btn btn-info" size="sm" @click="$emit('confirm')">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
