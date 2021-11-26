<template>
  <svg class="icon w-3 h-3" aria-hidden="true">
    <use :xlink:href="'#'+props.icon"></use>
  </svg>
</template>
<script setup>
 import '../../style/iconfont'
 const props = defineProps({
  icon: String
})
</script>
<style scoped>
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
   -webkit-tap-highlight-color: transparent;
}
</style>
