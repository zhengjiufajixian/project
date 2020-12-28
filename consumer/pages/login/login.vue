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
							uni.setStorageSync('userId', res.userId)
							uni.setStorageSync('token', res.token)
							uni.setStorageSync('refreshToken', res.refreshToken)
							if (res.unionId) {
								uni.setStorageSync('unionId', res.unionId)
								uni.switchTab({
									url: '/pages/index/index'
								})
							} else {
								wx.getUserInfo({
									success: function(res) {
										console.log(res);
										var appId = 'wxb3891f1596d7086e'
										var sessionKey = uni.getStorageSync('session_key')
										var encryptedData = res.encryptedData

										var iv = res.iv

										var pc = new WXBizDataCrypt(appId, sessionKey)

										var data = pc.decryptData(encryptedData, iv)

										// console.log('解密后 data: ', data)

										_this.$u.api.saveUnionId({
											userId: uni.getStorageSync("userId"),
											unionId: data.unionId
										}).then(res => {
											uni.setStorageSync('unionId', data.unionId)
											uni.switchTab({
												url: '/pages/index/index'
											})
										})
									}
								})
							}

						})
						// uni.request({
						// 	url: 'http://47.96.37.228:3001/user/wx/getOpenId/' + res.code + '/',
						// 	method: 'GET',
						// 	data: {
						// 		code: res.code
						// 	},
						// 	success: function(res) {
						// 		uni.hideLoading()
						// 		console.log(res.data.data)
						// 		uni.setStorageSync('tokenHead', res.data.data.tokenHead)
						// 		uni.setStorageSync('token', res.data.data.token)
						// 		uni.setStorageSync('userId', res.data.data.userId)
						// 		console.log('授权成功')
						// 		// uni.switchTab({
						// 		//     url: '/pages/index/index'
						// 		// })
						// 	}
						// })
					}
				})
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
