<script setup>
import { computed, ref } from 'vue';

const emits = defineEmits(['update:modelValue','confirm']);
const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: ''
	}
});
const inputVal = computed({
	get() {
		return props.modelValue;
	},
	set(val) {
		emits('update:modelValue', val);
	}
});
</script>

<template>
	<input v-model="inputVal" @confirm="$emit('confirm')" type="text" class=" w-full outline-none ring-1 focus:ring-2 px-2 text-sm h-7 rounded-sm" placeholder-style="color:#e5e5e5;font-size:.5rem;" :placeholder="placeholder" />
</template>
