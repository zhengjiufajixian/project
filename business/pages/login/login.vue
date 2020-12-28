<template>
	<view>
		<view class='header'>
			<image src='../../static/image/logo.png'></image>
		</view>
		<view class='content'>
			<view class=""><text>申请获取以下权限</text></view>
			<view class=""><text>获得你的公开信息(昵称，头像等)</text></view>
		</view>

		<view class="btn-wrap">
			<u-button type="primary" open-type="getUserInfo" shape="circle" @click="wechatLogin">授权登录</u-button>
		</view>
	</view>
</template>

<script>
	import WXBizDataCrypt from "../../common/WXBizDataCrypt.js"

	export default {
		data() {
			return {

			}
		},
		onLoad() {
			
		},
		methods: {
			wechatLogin() {
				let _this = this
				uni.login({
					success: function(res) {
						_this.$u.api.login({
							code: res.code
						}).then(res => {
							console.log(res)
							uni.setStorageSync('tokenHead', res.tokenHead)
							uni.setStorageSync('openid', res.openid)
							uni.setStorageSync('session_key', res.session_key)
							uni.setStorageSync('merchantId', res.merchantId)
							// uni.setStorageSync('shopId', res.shopId)
							uni.setStorageSync('merchantStatus', res.merchantStatus)
							uni.setStorageSync('token', res.token)
							uni.setStorageSync('refreshToken', res.refreshToken)
							uni.setStorageSync('merchantStatus', res.merchantStatus)
							if (res.unionId) {
								uni.setStorageSync('unionId', res.unionId)
								_this.checkStatus()
							} else {
								wx.getUserInfo({
									success: function(res) {
										console.log(res);
										var appId = 'wxdfec8f307cdae32c'
										var sessionKey = uni.getStorageSync('session_key')
										var encryptedData = res.encryptedData

										var iv = res.iv

										var pc = new WXBizDataCrypt(appId, sessionKey)

										var data = pc.decryptData(encryptedData, iv)

										// console.log('解密后 data: ', data)

										_this.$u.api.saveUnionId({
											merchantId: uni.getStorageSync("merchantId"),
											unionId: data.unionId
										}).then(res => {
											uni.setStorageSync('unionId', data.unionId)
											_this.checkStatus()
										})
									}
								})
							}

						})
					}
				})
			},
			checkStatus() {
				let merchantStatus = Number(uni.getStorageSync("merchantStatus"))
				// 0禁止登陆,1未审核,2等待审核,3审核成功
				switch (merchantStatus) {
					case 1:
						uni.redirectTo({
							url: "../register/register"
						})
						break;
					case 2:
						uni.redirectTo({
							url: "../register/wait/wait"
						})
						break;
					case 3:
						uni.switchTab({
							url:"../index/index"
						})
						break;
					default:
						break;
				}
			}
		},
	}
</script>

<style scoped>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.btn-wrap {
		width: 80%;
		margin: 0 auto;
	}
</style>
