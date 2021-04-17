<template>
	<view>
		<view class="u-text-center u-font-36 color-000000 u-margin-top-60 u-padding-top-24">接收验证码{{hidePhoneNum()}}</view>
		<view class="u-text-center u-font-26 color-999999 u-margin-top-44">{{title}}需要进行短信确认</view>
		<view class="u-flex u-row-center u-col-center u-margin-top-52">
			<view class="u-font-30 color-444444 u-margin-right-10">验证码</view>
			<view class=" u-border-bottom u-flex">
				<u-input v-model="code" :clearable="false" placeholder="请填写验证码" :custom-style="customStyle" placeholder-style="color:#c0c0c0;font-size: 30rpx;text-align:center;" />
			</view>
			<view class="u-font-28 color-9B9B9B">
				<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
				<text @click="getCode">{{tips}}</text>
			</view>
		</view>
		<u-gap height="80"></u-gap>
		<view class="btn-wrap" @click="handClick">下一步</view>
	</view>
</template>

<script>
	import * as config from "../../common/config.js"

	export default {
		data() {
			return {
				code: '',
				tips: '',
				seconds: config.seconds,
				customStyle: {
					textAlign: 'center'
				},
				labelStyle: {
					fontSize: '30rpx',
					color: '#787a81'
				},
				redirectUrl: '',
				title: ''
			}
		},
		onLoad(params) {
			this.redirectUrl = params.url
			this.title = params.title
		},
		methods: {
			hidePhoneNum() {
				return config.hidePhoneNum(uni.getStorageSync('merchantPhone'))
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
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
						}else{
							this.$u.toast('发送失败，请稍后重试');
						}
					})

				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			handClick() {
				if (!this.code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				this.$u.api.validateMsg({
					merchantId: uni.getStorageSync('merchantId'),
					code: this.code
				}).then(res => {
					if (res) {
						uni.redirectTo({
							url: this.redirectUrl
						})
					} else {
						uni.showToast({
							title: '验证失败，请重新获取',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.color-444444 {
		color: #444444;
	}

	.color-9B9B9B {
		color: #9B9B9B;
	}

	.btn-wrap {
		line-height: 94rpx;
		background: $uni-color-primary;
		font-size: 36rpx;
		text-align: center;
		color: #FFFFFF;
		margin: 0 32rpx;
	}
</style>
