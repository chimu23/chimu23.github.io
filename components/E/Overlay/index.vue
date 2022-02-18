<template>
	<view class="mos-overylay" ></view>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch, nextTick } from 'vue';
import anime from 'animejs';
interface Props {
	isOpen?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	isOpen: false
});
const overlayDOM = ref(null)
onMounted(()=>{
	overlayDOM.value = document.querySelector('.mos-overylay')
})
watch(()=>props.isOpen,(n,o)=>{
	if(n){
		anime({
			targets: overlayDOM.value,
			opacity: .3,
			easing: 'linear',
			duration: 500,
			complete(){
				overlayDOM.value.style.pointerEvents = 'all'
			}
		});
	}else{
		anime({
			targets: overlayDOM.value,
			opacity: 0,
			easing: 'linear',
			duration: 500,
			complete(){
				overlayDOM.value.style.pointerEvents = 'none'
			}
		});
	}
})
// import { onMounted } from 'vue';
// onMounted(() => {
// 	console.log('mounted');
// });
// defineEmits(['click'])
// function clickOverlay() {
// 	console.log('clickOverlay');
// }
</script>

<style lang="scss" scoped>
.mos-overylay {
	z-index: 99;
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	background-color: black;
	opacity: 0;
	pointer-events: none;
}
</style>
