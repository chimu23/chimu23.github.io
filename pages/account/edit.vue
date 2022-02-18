<template>
	<view>
		<view class="header flex justify-between items-center">
			<view class="logo_name">{{ pageName }}</view>
			<view class="nav-options flex">
				<view @tap="$refs.romdomPasswordREF.$refs.popup.toggle()" class="icon-lock" url="/pages/account/add/index" hover-class="none"></view>
			</view>
		</view>
		<view class="body">
			<view class="form">
				<view class="form-item">
					<text class="icon-shoucang text-red-400"></text>
					<input type="text" v-model="form.label" placeholder="标签" />
				</view>
				<view class="form-item">
					<text class="icon-lishuyu text-primary"></text>
					<input type="text" v-model="form.belong" placeholder="账号所属" />
				</view>
				<view class="form-item">
					<text class="icon-zhanghao text-blue-200"></text>
					<input type="text" v-model="form.account" placeholder="账号" />
				</view>
				<view class="form-item">
					<text class="icon-lock text-purple-400"></text>
					<input type="text" placeholder="密码" v-model="form.password" />
				</view>
			</view>
			<button type="default" class="btn" @click="doAccount">{{ pageName }}</button>
			<romdomPassword ref="romdomPasswordREF" data-desc="密码生成器"></romdomPassword>
		</view>
	</view>
</template>

<script>
import { encrypt } from '/lib/utils.js';
import {
	addAccount
} from '/api/account/index.js'

export default {
	onLoad(options) {
		console.log();
		// const { type, form = '{}' } = options;
		// if (type === 'update') {
		// 	this.pageName = '修改账号';
		// 	this.form = JSON.parse(decodeURIComponent(form));
		// }
		// this.accountLabels = getApp().globalData.accounts.map(item => {
		// 	return item.account;
		// });
		// this.typeLabels = getApp().globalData.accounts.map(item => {
		// 	return item.label;
		// });
	},
	data() {
		return {
			pageName: '添加账号',
			secretkey: getApp().globalData.password,
			form: {
				label: '',
				belong: '',
				account: '',
				password: '',
				isCollection: false,
			},
			// 标签下拉可选
			typeLabels: [],
			// 账号下拉可选
			accountLabels: []
		};
	},
	methods: {
		async doAccount() {
			// console.log(_encrypt(this.form.account));
			this.form.password = encrypt(this.form.password)
			addAccount(this.form).then(resp=>{
				console.log(resp);
			})


			return
			uni.showLoading({
				title: '请稍后'
			});
			const data = Object.assign({}, this.form);
			data.password = _encrypt(this.form.password);
			data.isCollection = false
			if (this.form.hasOwnProperty('_id')) {
				// 存在账号=》更新
				await this.$http('account','updateAccount', data);
			} else {
				await this.$http('account','addAccount', data);
				uni.$emit('accountUpdate')
			}
			uni.navigateBack({
				success: () => {
					uni.$emit('accountUpdate');
					uni.showToast({
						icon: 'success',
						title: '操作成功'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.header {
	height: 112rpx;
	padding: 0 30rpx;
	// box-shadow: $shadow-sm;

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

.form {
	padding: 30rpx 30rpx 70rpx;

	.form-item {
		padding: 0 30rpx;
		margin-bottom: 40rpx;
		display: flex;
		align-items: center;

		cuihai-combox,
		input {
			flex: 1;
			// border-bottom: 1rpx solid map-get($map: $colors, $key: purple-100);
		}
		> text {
			width: 90rpx;
		}

		input {
			height: 60rpx;
		}
	}
}
</style>
