<!-- 密码生成器 -->
<template>
	<view>
		<popup ref="popup" title="随机密码生成器">
			<template v-slot:right>
				<text class="right-header text-purple-400" @tap="generatePassword()">重新生成</text>
			</template>
			<view class="add-popup">
				<view class="password">{{password}}</view>
				<view class="flex justify-between items-center">
					<view class="option-wrap" data-desc="密码类型多选">
						<checkbox-group @change="passwordTypeChange">
							<label class="flex items-center" v-for="item in passwordTypes" :key="item.value">
								<checkbox color="#909399" :value="item.value" :checked="item.checked" />
								<text>{{item.name}}</text>
							</label>
						</checkbox-group>
					</view>
					<view class="picker-box" data-desc="密码长度滚轮">
						<picker-view indicator-style="border: 1px solid #fff;" @change="changePwdLength" :value="[2]"
							class="picker-view">
							<picker-view-column>
								<view v-for="(length,index) in passwordLengthArr" :key="index">{{length}}</view>
							</picker-view-column>
						</picker-view>
					</view>
				</view>
				<view class="btn" style="margin: 30rpx auto;" @tap="_copyText(password),$refs.popup.toggle()">复制密码</view>
			</view>
		</popup>
	</view>
</template>

<script>
	import {copyText} from '/lib/utils.js'
	export default {
		name: "romdomPassword",
		mounted() {
			this.generatePassword()
		},
		data() {
			function getPasswordLengthArr() {
				let start = 6
				return new Array(20).fill(0).map(item => {
					return item = start++
				})
			}
			return {
				password: '',
				passwordLength: 8,
				passwordLengthArr: getPasswordLengthArr(),
				capitalLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
				lowercaseLetters: 'abcdefghijklmnopqrstuvwxyz',
				numbers: '0123456789',
				specialCharacters: '!@#$%^&*()_+',
				selectedPwdTypes:['capitalLetters','lowercaseLetters','numbers'],
				passwordTypes: [{
						value: 'capitalLetters',
						name: '包含大写字母',
						checked:true
					},
					{
						value: 'lowercaseLetters',
						name: '包含小写字母',
						checked:true
					},
					{
						value: 'numbers',
						name: '包含数字',
						checked:true
					},
					{
						value: 'specialCharacters',
						name: '包含特殊字符'
					}
				]
			};
		},
		methods: {
			generatePassword() {
				this.password = ''
				let passwordStr = '' //从该字符串中选取字符生成密码
				this.selectedPwdTypes.forEach(type=>{
					passwordStr+= this[type]
				})
				for (let i = 0; i <= this.passwordLength; i++) {
					this.password += passwordStr.charAt(this.getRandomNumber(0, passwordStr.length-1))
				}
			},
			getRandomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min
			},
			changePwdLength(e) {
				this.passwordLength = this.passwordLengthArr[e.detail.value[0]];
				this.generatePassword()
			},
			passwordTypeChange(e){
				this.selectedPwdTypes = e.detail.value || []
				this.generatePassword()
			},
			copyText
		}
	}
</script>

<style lang="scss" scoped>
	.right-header {
		font-size: $uni-font-size-sm;
	}

	.add-popup {
		padding: 50rpx 50rpx 0;
		.password {
			color: $uni-color-primary;
			padding-bottom: 60rpx;
		}

		.option-wrap {
			width: 300rpx;

			label {
				margin-bottom: 8rpx;
				font-size: 24rpx;
				// color: map-get($map: $colors, $key: gray-600);
				checkbox {
					transform: scale(.6);
					margin-right: 10rpx;
				}
			}
		}

		.picker-box {
			width: 150rpx;
			height: 220rpx;
			border: 1rpx solid $uni-border-color;
			padding: 12rpx 4rpx;
			border-radius: 6rpx;
			overflow: hidden;
		}

		.picker-view {
			width: 100%;
			height: 100%;
			padding: 2rpx;

			::v-deep picker-view-column {
				view {
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
