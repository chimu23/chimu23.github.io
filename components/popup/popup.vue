<template>
	<view :class="['popup',isShowing?'show':'']">
		<view class="overlay" @tap="toggle"></view>
		<view :class="['body',isShowing?'show':'hide']">
			<view class="header flex justify-between">
				<view class="title font-medium" @tap="copyPassword">{{title}}</view>
				<slot name="right"></slot>
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "popup",
		props: {
			title: {
				type: String,
				default: '标题'
			}
		},
		data() {
			return {
				isShowing: false
			};
		},
		methods: {
			toggle() {
				this.isShowing = !this.isShowing
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		pointer-events: none;
	}

	.popup.show {
		pointer-events: auto;
		transform: translateZ(0deg);

		.overlay {
			background-color: rgba(0, 0, 0, .6);
		}

		.body {
			animation: animate-show .3s linear forwards;
		}
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		background-color: transparent;
		transition: all .4s ease-in;
	}

	@keyframes animate-show {
		0% {
			opacity: 0;
			transform: translateY(100%);
		}

		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.body {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 100;
		border-radius: 30rpx 30rpx 0 0;
		transform: translateY(100%);
	}

	.body {
		.header {
			height: 110rpx;
			line-height: 110rpx;
			padding: 0 50rpx;
			box-shadow: $shadow-sm;
			overflow: hidden;
		}
	}
</style>
