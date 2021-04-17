<template>
	<view>
		<view class="font-60 u-margin-top-36 u-margin-left-50 u-margin-bottom-60">忘记密码？</view>
		<view class="u-padding-left-46 u-padding-right-46">
			<u-form :model="form" ref="uForm" label-position="top" :label-style="labelStyle">
				<u-form-item label="手机号" prop="merchantPhone">
					<u-input v-model="form.merchantPhone" placeholder="请输入您的手机号码" placeholder-style="color:#999999;font-size: 25rpx;" />
				</u-form-item>
				<u-form-item label="手机验证码" prop="code">
					<u-input v-model="form.code" placeholder="请输入手机验证码" placeholder-style="color:#999999;font-size: 25rpx;" />
					<view class="u-margin-right-20" slot="right">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
						<u-button type="primary" size="mini" @click="getCode">{{tips}}</u-button>
					</view>
				</u-form-item>
				<u-form-item label="新密码" prop="merchantPassword">
					<u-input v-model="form.merchantPassword1" placeholder="请输入您新密码" placeholder-style="color:#999999;font-size: 25rpx;" />
				</u-form-item>
				<u-form-item label="确认密码" prop="merchantPassword">
					<u-input v-model="form.merchantPassword2" placeholder="请再次确认密码" placeholder-style="color:#999999;font-size: 25rpx;" />
				</u-form-item>
			</u-form>
		</view>
		<view class="u-margin-top-44">
			<view class="btn-1" @click="handleClick">立即修改</view>
		</view>

	</view>
</template>

<script>
	import * as config from '../../../../common/config.js'

	export default {
		data() {
			return {
				form: {
					merchantPhone: '',
					code: '',
					merchantPassword1: '',
					merchantPassword2: ''
				},

				phoneNumber: config.phoneNumber,

				tips: '',
				seconds: 60,
				labelStyle: {
					fontSize: '30rpx',
					color: '#787a81'
				},
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if(!this.form.merchantPhone){
						uni.showToast({
							title:'请输入手机号',
							icon:'none'
						})
						return
					}
					if(!config.mobilePhoneReg.test(this.form.merchantPhone)){
						uni.showToast({
							title: '手机号格式错误',
							icon: 'none'
						})
						return
					}
					if(this.form.merchantPhone!= uni.getStorageSync('merchantPhone')){
						uni.showToast({
							title: '与当前绑定号码不一致',
							icon: 'none'
						})
						return
					}
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.$u.api.sendMessage().then(res => {
						uni.hideLoading();
						if (res) {
							this.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						} else {
							this.$u.toast('发送失败，请稍后重试');
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			handleClick() {
				if (this.form.merchantPhone != uni.getStorageSync('merchantPhone')) {
					uni.showToast({
						title: '与当前绑定的号码不一致',
						icon: 'none'
					})
					return
				}
				if (!this.form.code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				if (!this.form.merchantPassword1) {
					uni.showToast({
						title: '请输入新密码',
						icon: 'none'
					})
					return
				}
				if (!this.form.merchantPassword2) {
					uni.showToast({
						title: '请再次确认密码',
						icon: 'none'
					})
					return
				}
				if (this.form.merchantPassword2 != this.form.merchantPassword2) {
					uni.showToast({
						title: '两次密码输入不一致',
						icon: 'none'
					})
					return
				}
				this.$u.api.upLoginPwdByPhone({
					phone: this.form.merchantPhone,
					password: this.form.merchantPassword1,
					code: this.form.code
				}).then(res => {
					if(res){
						uni.showToast({
							title: '密码设置成功',
							success: function() {
								setTimeout(function() {
									uni.navigateBack()
								}, 1000)
							}
						})						
					}else{
						console.log(res);
						uni.showToast({
							title: '操作失败，请稍后重试',
							icon: 'none',
						})	
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.font-60 {
		font-size: 60rpx;
		color: #421a1a;
	}

	.btn-1,
	.btn-2 {
		width: 548rpx;
		line-height: 88rpx;
		font-size: 32rpx;
		margin: 0 auto;
		border-radius: 10rpx;
		text-align: center;
		border: 2rpx solid $uni-color-primary;
	}

	.btn-1 {
		color: #FFFFFF;
		background-color: $uni-color-primary;
	}

	.btn-2 {
		margin-top: 35rpx;
		color: $uni-color-primary;
		background-color: #FFFFFF;
	}

	.wrap {
		width: 560rpx;
		padding-left: 50rpx;
		padding-right: 50rpx;
		padding-bottom: 38rpx;
	}
</style>
