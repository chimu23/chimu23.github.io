<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	num:{
		type: String,
		default:0
	}
})
</script>

<template>
	<div class="relative">
		<slot>数字</slot>
		<div class=" w-4 h-4 leading-4 text-center absolute -top-2 -right-2 text-xxs text-white bg-indigo-200 rounded-full">{{num}}</div>
	</div>
</template>
