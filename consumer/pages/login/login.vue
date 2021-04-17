<template>
	<view>
		<u-gap height="200"></u-gap>
		<view class='u-flex u-row-center'>
			<u-image width="188" height="188" src='/static/image/logo-square.png' mode="widthFix"></u-image>
		</view>
		<u-gap height="240"></u-gap>
		<view class="login-btn">
			<view @click="wechatLogin">微信登录</view>
		</view>
		<view class="fixed-btn u-flex u-row-center">
			<text>登录代表您已经同意</text>
			<navigator url="/subPackages/setting/userAgreement/userAgreement" hover-class="none">
				<text class="color-1672FF">广莱车友汇用户协议</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	import * as config from "../../common/config.js"
	import WXBizDataCrypt from "../../common/WXBizDataCrypt.js"

	export default {
		data() {
			return {

			}
		},
		methods: {
			wechatLogin() {
				uni.showLoading({
					title:'请求中...'
				})
				let _this = this
				uni.login({
					success: function(res) {
						console.log(res);
						_this.$u.api.login({
							code: res.code
						}).then(res => {
							console.log(res);
							uni.setStorageSync('tokenHead', res.tokenHead)
							uni.setStorageSync('openid', res.openid)
							uni.setStorageSync('session_key', res.session_key)
							uni.setStorageSync('userId', res.userId)
							uni.setStorageSync('token', res.token)
							uni.setStorageSync('refreshToken', res.refreshToken)
							uni.setStorageSync('userName', res.userName)
							if(res.userPhone){
								uni.setStorageSync('userPhone', res.userPhone)
							}
							if(res.car) {
								uni.setStorageSync('carModel', res.car.carModel)
								uni.setStorageSync('carNumber', res.car.carNumber)
								uni.setStorageSync('vehicleFrame', res.car.vehicleFrame)
							}
							uni.hideLoading()
							if(uni.getStorageSync('inviteCode')){
								uni.removeStorageSync('inviteCode')
								uni.redirectTo({
									url:'/subPackages/myCar/myCar'
								})
								return
							}
							let pages = getCurrentPages()
							console.log(pages);
							if(pages.length<2){
								uni.switchTab({
									url: '/pages/index/index'
								})
							}else{
								uni.navigateBack()
							}
							// uni.switchTab({
							// 	url: '/pages/index/index'
							// })
							// if (res.unionId) {
							// 	uni.setStorageSync('unionId', res.unionId)
							// 	uni.switchTab({
							// 		url: '/pages/index/index'
							// 	})
							// } else {
							// 	wx.getUserInfo({
							// 		success: function(res) {
										
							// 			var appId = config.WX_appId
							// 			var sessionKey = uni.getStorageSync('session_key')
							// 			var encryptedData = res.encryptedData

							// 			var iv = res.iv

							// 			var pc = new WXBizDataCrypt(appId, sessionKey)

							// 			var data = pc.decryptData(encryptedData, iv)

							// 			// console.log('解密后 data: ', data)

							// 			_this.$u.api.saveUnionId({
							// 				userId: uni.getStorageSync("userId"),
							// 				unionId: data.unionId
							// 			}).then(res => {
							// 				uni.setStorageSync('unionId', data.unionId)
							// 				uni.switchTab({
							// 					url: '/pages/index/index'
							// 				})
							// 			})
							// 		}
							// 	})
							// }

						})
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
		height: 100vh;
	}
	.login-btn {
		margin: 0rpx 46rpx;
		background-color: #1672FF;
		border-radius: 10rpx;
		line-height: 88rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32rpx;
	}
	.fixed-btn {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		color: #979797;
		font-size: 26rpx;
		line-height: 158rpx;
		text-align: center;
		letter-spacing: 1rpx;
	}
</style>
