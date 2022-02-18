<template>
	<view :class="['item',account.isCollection?'collect':'']" hover-class="item-hover">
		<view class="text">{{ account.belong }}</view>
		<view class="value">{{ account.account }}</view>
	</view>
</template>

<script>
export default {
	name: 'account-item',
	props: {
		accounts: {
			type: Array,
			default: []
		},
		account: {
			type: Object
		}
	},
	data() {
		return {
			currentAccount: {}
		};
	},
	methods: {
		updateAccount(e) {
			let index = this.accounts.findIndex(item => item._id === e._id);
			this.accounts[index] = this.currentAccount = e;
			this.$emit('onUpdateAccount', this.accounts);
		},
		// 触发长按账户操作
		longTapAccount(account) {
			setTimeout(() => {
				uni.showActionSheet({
					itemList: ['编辑', '删除'],
					success: async res => {
						switch (res.tapIndex) {
							case 0: {
								uni.navigateTo({
									url: '/pages/account/add/index?type=update&form=' + encodeURIComponent(JSON.stringify(account))
								});

								break;
							}
							case 1: {
								await this.$http('account', 'deleteAccountByID', {
									_id: account._id
								});
								const index = this.accounts.findIndex(item => item._id === account._id);
								this.accounts.splice(index, 1);
								this.$emit('onUpdateAccount', this.accounts);
								uni.showToast({
									icon: 'success',
									title: '操作成功!'
								});
								break;
							}
						}
					}
				});
			}, 250);
		},
		// 点击账户复制密码
		tapAccount(account) {
			this.currentAccount = account;
			this.$refs.accountCard.$refs.popup.toggle();
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	padding: 22rpx 38rpx 20rpx 50rpx;
	position: relative;
	&::after {
		pointer-events: none;
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 15%;
		height: 100%;
		border-radius: 30rpx;
		z-index: -1;
	}
	&:last-child {
		padding-top: 0;
	}

	.label {
		font-size: 27rpx;
	}

	.value {
		font-size: 26rpx;
		font-weight: 400;
		color: $uni-text-color-grey;
		padding-top: 12rpx;
	}
}
.item-hover {
	&::after {
		width: 100%;
		height: 100%;
		transition: all 0.32s ease-in;
		border-radius: 0;
		background-color: $uni-bg-color-grey;
	}
}
.item.collect {
	&::before {
		content: '\e600';
		font-family: iconfont;
		position: absolute;
		font-size: 22rpx;
		color: rgba(255, 192, 43, 1);
		left: 16rpx;
		top: 23rpx;
	}
}
</style>
