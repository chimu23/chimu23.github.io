<script setup>
import { ref } from 'vue';
import todoList from './components/List.vue';
import ETab from '../../components/E/Tab/index.vue';
import EBandage from '../../components/E/Bandage/index.vue';

const todoDialogRef = ref(null);
const isShow = ref(false);
const isLoading = ref(true)
const todoTotal = ref(0)
const tabs = ref(['全部', '已完成', '未完成']);
const currentTab = ref(tabs.value[0]);

function updateItem(item) {
	const { _id } = item;
	let index = todo.list.findIndex(item => item._id === _id);
	todo.list[index] = item;
}

function tabChange(index) {
	currentTab.value = tabs.value[index];
}
</script>

<template>
	<div class="w-11/12 p-3 mx-auto shadow-md rounded-md bg-indigo-50">
		<div class="flex justify-between border-b-2 border-white pb-1 mb-2">
			<span class="text-lg font-bold">List</span>
			<EBandage :num="todoTotal">
				<svgIcon v-if="isLoading" icon="icon-loading" class="w-5 h-5 cursor-pointer animate-spin"></svgIcon>
				<svgIcon v-else icon="icon-xiangsu_tuzi" class="w-5 h-5"></svgIcon>
			</EBandage>
		</div>
		<ETab @change="tabChange" class="mb-2" :list="tabs"></ETab>
		<todoList v-model:todoTotal="todoTotal" v-model:isLoading="isLoading" @edit-item="isShow = true" :tab-info="currentTab"></todoList>
	</div>
</template>
