<template>
	<view class="page">
		<lottie></lottie>
		<view class=" flex">
			<span class="mr-5">账户</span>
			<input type="number" maxlength="4" v-model="account" />
		</view>
		<view class=" flex mt-2">
			<span class="mr-5">密码</span>
			<input type="number" v-model="password" @confirm="login" />
		</view>
		<view class="btn btn-info" @click="login()">Login</view>
		<view class="wave" data-desc="波纹效果"></view>
	</view>
</template>

<script>
import { login } from '/api/user';
export default {
	mounted() {
		const token = uni.getStorageSync('uni_id_token') || '';
		if (!token) {
			this.hasAccount = false;
		}
		// this.init();
	},
	props: {
		width: {
			type: String,
			default: '400rpx'
		},
		height: {
			type: String,
			default: '400rpx'
		}
	},
	data() {
		return {
			account: '',
			password: ''
		};
	},
	methods: {
		async login() {
			login(this.account, this.password).then(resp => {
				if (resp.result.code === 0) {
					// 2.8.0版本起调整为蛇形uni_id_token（调整后在一段时间内兼容驼峰uniIdToken）
					uni.setStorageSync('uni_id_token', resp.result.token);
					uni.setStorageSync('uni_id_token_expired', resp.result.tokenExpired);
					uni.setStorageSync('uni_id', resp.result.uid);
					getApp().globalData.uid = resp.result.uid
					uni.redirectTo({
						url: '/pages/home/index'
					});
				} else {
					uni.showModal({
						content: resp.result.message,
						showCancel: false
					});
				}
			});
		},
		// 输入密码
		inputPassword() {
			if (this.password.length === 4) {
				uni.hideKeyboard();
				uni.showToast({
					icon: 'loading',
					title: '登录中...'
				});
				this.login();
			}
		}
	}
};
</script>
<style>
page {
	background-color: #ececec;
	height: 100vh;
	overflow: hidden;
}
</style>
<style lang="scss" scoped>
.page {
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 32rpx;
	text-align: center;

	.input-tip {
		margin: 30rpx 0;
		transition: all 0.3s linear;
		&.focus {
			color: $uni-color-primary;
			font-weight: bold;
			transform: translateY(18rpx);
		}
	}

	@keyframes animate-wave {
		0% {
			opacity: 1;
		}
		80% {
			opacity: 0.1;
			width: 200rpx;
			height: 200rpx;
		}
		90% {
			opacity: 0;
			width: 200rpx;
			height: 200rpx;
		}
		100% {
			opacity: 0;
		}
	}
	[class^='wave'] {
		position: fixed;
		width: 120rpx;
		height: 120rpx;
		// border: 2rpx solid $uni-color-primary;
		bottom: -70rpx;
		right: -70rpx;
		border-radius: 50%;
		animation: animate-wave 3s linear infinite;

		&::before,
		&::after {
			content: '';
			position: absolute;
			left: calc(50% - 40%);
			top: calc(50% - 40%);
			width: 80%;
			height: 80%;
			border: 1rpx solid red;
			border-radius: 50%;
		}
		&::after {
			left: calc(50% - 30%);
			top: calc(50% - 30%);
			width: 60%;
			height: 60%;
		}
	}
}
</style>
