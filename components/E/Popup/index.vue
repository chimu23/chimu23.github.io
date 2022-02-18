<template>
	<!-- 	<view :class="['popup', isShowing ? 'show' : '']">
		<view class="overlay" @tap="toggle"></view>
		<view :class="['body', isShowing ? 'show' : 'hide']">
			<view class="header flex justify-between">
				<view class="title font-medium" @tap="copyPassword">{{ title }}</view>
				<slot name="right"></slot>
			</view>
			<slot></slot>
		</view>
	</view> -->
	<Overlay @click="$emit('update:isOpen', false)" :isOpen="isOpen"></Overlay>
	<view :class="[mos_popup,props.position]">
		<view class="mos-popup-header mos-tail" v-if="title"><slot name="header">{{title}}</slot></view>
		<slot name="default"></slot>
	</view>
</template>

<script setup lang="ts">
import Overlay from '../Overlay/index.vue';
import { onMounted, ref, reactive, watch, nextTick } from 'vue';
import anime from 'animejs';
interface Props {
	position?: string;
	isOpen?: boolean;
	title?: string;
}
const props = withDefaults(defineProps<Props>(), {
	position: 'bottom',
	isOpen: false,
	title: ''
});

const mos_popup = ref('mos-popup'+Date.now().toString().slice(-5));
// const configs = reactive({
// 	style:{
// 		color:'red'
// 	}
// })

watch(
	() => props.isOpen,
	(n, o) => {
		nextTick(() => {
			if (n) {
				open();
			} else {
				close();
			}
		});
	}
);
function open() {
	var myAnimation = anime({
		targets: `.${mos_popup.value}`,
		bottom: 0,
		duration: 360,
		easing: 'linear'
	});
}
function close() {
	var myAnimation = anime({
		targets: `.${mos_popup.value}`,
		bottom: -999,
		duration: 360,
		easing: 'linear'
	});
}
</script>

<style lang="scss" scoped>
[class^="mos-popup"] {
	position: fixed;
	z-index: 100;

	&.top {
		top: 0;
		left: 0;
		width: 100vw;
		height: 50vh;
		background-color: white;
		border-radius: 0 0 1rem 1rem;
		padding: 1rem 1.25rem 1rem;
	}
	&.left {
		bottom: 0;
		left: 0;
		width: 50vw;
		height: 100vh;
		background-color: white;
		border-radius: 0 1rem 1rem 0;
		padding: 1rem 1.25rem 1rem;
	}
	&.bottom {
		bottom: -999px;
		left: 0;
		width: 100vw;
		height: min-content;
		background-color: white;
		border-radius: 1rem 1rem 0 0;
		// padding: 1rem 0 1rem;
	}
}
.mos-popup-header {
	width: min-content;
}
.mos-popup-body{
	color: red;
	// height: 500px;
}
</style>
