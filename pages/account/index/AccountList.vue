<script setup>
import AccountItem from './AccountItem.vue';
import Popup from '/components/E/Popup/index.vue';
import { onMounted, ref, reactive } from 'vue';

const isOpenDetail = ref(false);
let account = reactive({
	current: {},
	index: undefined
});
const props = defineProps(['list'])
// const list = ref([]);
// onMounted(() => {
// 	getAccount().then(({ data }) => {
// 		list.value = data;
// 		console.log(list.value);
// 	});
// });

function openDetail(item, index) {
	account.current = item;
	account.index = index;
	isOpenDetail.value = true;
}
</script>

<template>
	<AccountItem :account="item" @onUpdateAccount="updateAccount" @click="openDetail(item, index)" v-for="(item, index) in list" :key="index"></AccountItem>
	<Popup v-model:isOpen="isOpenDetail">
		<view class="detail-popup">
			<view class="item">
				<svgIcon icon="icon-shoucang"></svgIcon>
				<view>{{ account.current.label }}</view>
			</view>
			<view class="item">
				<svgIcon icon="icon-lishuyu" class="text-primary"></svgIcon>
				<view>{{ account.current.belong }}</view>
			</view>
			<view class="item">
				<svgIcon icon="icon-zhanghao" class="text-blue-200"></svgIcon>
				<view>{{ account.current.current }}</view>
			</view>
			<view class="item">
				<svgIcon icon="icon-lock"></svgIcon>
				<view>{{ account.current.password }}</view>
			</view>
		</view>
	</Popup>
</template>

<style lang="scss" scoped>
.detail-popup {
	padding: 0.6rem 1.5rem 0.3rem;
	.item {
		margin-top: 30rpx;
		margin-bottom: 40rpx;
		display: flex;
		align-items: center;
		svg{
			margin-right: 1rem;
		}
	}
}
</style>
