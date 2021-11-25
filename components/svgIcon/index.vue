<template>
  <svg class="icon" aria-hidden="true">
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
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
   -webkit-tap-highlight-color: transparent;
}
</style>
