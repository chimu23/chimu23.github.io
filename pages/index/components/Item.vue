<script setup>
import { onMounted, ref } from 'vue';
import EInput from '../../../components/E/Form/EInput.vue';
import ECheckbox from '../../..//components/E/Form/ECheckBox.vue';

const props = defineProps(['item', 'index']);
const emit = defineEmits(['editItem', 'deleteItem']);

</script>
<template>
	<div
		class="
      flex
      justify-between
      items-center
      w-full
      text-base
      group
      bg-white
      rounded
      py-1.5
      pl-2
	  pr-3
    "
	>
		<e-checkbox :modelValue="item.checked" @change="$emit('delete-item', index)">
			<span
				:class="{
					' line-through italic text-gray-200 cursor-not-allowed': item.checked
				}"
			>
				{{ item.title }}
			</span>
		</e-checkbox>
		<svgIcon v-if="!item.checked" icon="icon-bianji" class="w-4 h-4 group-hover:text-theme cursor-pointer" @click="$emit('editItem', props.item)"></svgIcon>
	</div>
</template>
