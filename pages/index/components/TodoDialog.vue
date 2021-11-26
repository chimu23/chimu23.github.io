<script setup>
import { updateTodo } from '../../../api/todo/index.js';
import Dialog from '../../../components/Dialog/index.vue';
import EInput from '../../../components/E/Form/EInput.vue';
import { ref } from 'vue';

const emit = defineEmits(['addItem', 'updateItem']);
const props = defineProps({
	isShow: {
		type: Boolean,
		default: false
	},
	item: {
		type: Object,
		default: {
			title: '',
			note: ''
		}
	}
});
const title = ref(props.item.title);
const note = ref(props.item.note);

function editForm() {
	const { _id } = props.item;
	updateTodo(_id, title.value, note.value).then(() => {
		emit('updateItem', {
			title: title.value,
			note: note.value,
			checked: false
		});
		emit('update:isShow', false);
	});
}
</script>

<template>
	<Dialog width="20rem" title="修改todo" :isShow="isShow" @update:isShow="$emit('update:isShow', $event)" @confirm="editForm" v-if="isShow">
		<div class="text-sm flex justify-around px-2 mb-3">
			<span class="mr-3">标题:</span>
			<EInput v-model="title" />
		</div>
		<div class="text-sm flex justify-around px-2">
			<span class="mr-3">内容:</span>
			<EInput v-model="note" />
		</div>
	</Dialog>
</template>
