<template>
	<view class="header flex justify-between items-center">
		<view class="logo_name">账号本子</view>
		<view class="nav-options flex">
			<navigator url="/pages/account/edit" hover-class="none"><svgIcon icon="icon-add" class=" text-indigo-500"></svgIcon></navigator>
			<navigator url="/pages/account/add/index" hover-class="none"><svgIcon icon="icon-chaxun2x"></svgIcon></navigator>
			<navigator url="/pages/account/add/index" hover-class="none"><svgIcon icon="icon-menu"></svgIcon></navigator>
		</view>
	</view>
	<view class="body flex">
		<scroll-view scroll-y="true" class="scroll-left">
			<view @tap="currentLabel = index" :class="['item', index === currentLabel ? 'active' : '']" v-for="(label, index) in account.labels" :key="index">{{ label }}</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="flex-1"><AccountList :list="account.list"></AccountList></scroll-view>
	</view>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import AccountList from './index/AccountList.vue';
import { getAccount } from '/api/account/index.js';
const labels = ref(['1', '2']);
const list = ref([]);
let account = reactive({
	list: [],
	labels: ['收藏']
});
getAccount().then(({ data }) => {
	account.list = data;
	account.labels = Array.from(new Set([...account.labels,...data.map(item=>item.label)]));
	console.log(account.list);
});
</script>

<style lang="scss" scoped>
.header {
	height: 112rpx;
	padding: 0 30rpx;
	box-shadow: 0 1rpx 16rpx 3rpx rgba(0, 0, 0, 0.1);

	.logo_name {
		font-size: 32rpx;
		font-weight: bold;
	}

	.nav-options {
		> view,
		navigator {
			margin: 6rpx 14rpx;
		}
	}
}

.body {
	height: calc(100vh - 112rpx);

	[class^='scroll'] {
		position: relative;
		height: 100%;
		padding: 20rpx 0;

		::-webkit-scrollbar {
			display: none;
		}
	}

	.scroll-left {
		width: 25%;
		border-right: 1rpx solid #eaeaea;

		.item {
			font-size: 29rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-weight: 400;
			// color: $text-color-d-active;

			&.active {
				// color: $text-color-active;
				font-weight: bold;
			}
		}
	}
}
</style>
