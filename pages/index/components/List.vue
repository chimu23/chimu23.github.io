<script setup>
import { ref, reactive, computed } from 'vue';
import Item from './Item.vue';
import { getList, deleteTodo, addTodo } from '../../../api/todo';
import TodoDialog from './TodoDialog.vue';
import EInput from '../../../components/E/Form/EInput.vue';

const props = defineProps(['item', 'tabInfo', 'isLoading', 'todoTotal']);
const emits = defineEmits(['update:isLoading', 'update:todoTotal']);
const isShow = ref(false);
const inputValue = ref('');
const isSending= ref(false);
const todo = reactive({
	item: { title: '', note: '' },
	list: []
});

let computedList = computed(() => {
	let list = [];
	switch (props.tabInfo) {
		case '全部':
			list = todo.list;
			break;
		case '已完成':
			list = todo.list.filter(item => item.checked === true);
			break
		case '未完成':
			list = todo.list.filter(item => item.checked === false);
			break
	}
	emits('update:todoTotal', list.length);
	return list;
});

getList().then(({ data: items, count }) => {
	todo.list = items;
	emits('update:isLoading', false);
	emits('update:todoTotal', count);
});

function addNewTodo() {
	const { value: title } = inputValue;
	if (!title.trim())
		return uni.showToast({
			title: '不能为空',
			icon: 'none'
		});
	isSending.value = true
	addTodo({
		title
	}).then(({ id }) => {
		todo.list.push({
			_id: id,
			title: inputValue.value,
			checked: false
		});
		inputValue.value = '';
		isSending.value = false
		emits('update:todoTotal', props.todoTotal + 1);
	});
}

function deleteItem(index) {
	const item = todo.list[index];
	item.checked = true;
	deleteTodo(item._id).catch(()=>{
		item.checked = false;
	})
}
function updateItem(detailInfo) {
	const { _id } = todo.item;
	const itemIndex = todo.list.findIndex(item => item._id === _id);
	todo.list[itemIndex] = detailInfo;
}
</script>

<template>
	<div class="flex items-center mb-3">
		<EInput v-model="inputValue" class="flex-1"></EInput>
		<svgIcon class="w-7 h-7 ml-3" :class="{'animate-pulse':isSending}" icon="icon-fasong" @click="addNewTodo"></svgIcon>
	</div>
	<div data-desc="todo列表" class="space-y-2">
		<Item v-for="(item, index) in computedList" :key="index" :item="item" :index="index" @delete-item="deleteItem" @edit-item="(todo.item = $event), (isShow = true)"></Item>
	</div>
	<TodoDialog ref="todoDialogRef" v-model:isShow="isShow" :item="todo.item" @add-item="todo.list.push($event)" @update-item="updateItem" v-if="isShow" />
</template>
