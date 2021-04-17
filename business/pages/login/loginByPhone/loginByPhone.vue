<template>
	<view class="u-padding-left-60 u-padding-right-60">
		<view class="u-margin-top-60 u-padding-top-40">
			<view>
				<u-input v-model="phone" type="text" placeholder="请输入手机号" />
				<u-line></u-line>
			</view>
			<view class="u-margin-top-20">
				<u-input v-model="password" type="password" placeholder="请输入密码" />
				<u-line></u-line>
			</view>
		</view>
		<view class="login-btn" @click="wechatLogin">
			登录
		</view>
	</view>
</template>

<script>
	import * as config from "../../../common/config.js"
	import WXBizDataCrypt from "../../../common/WXBizDataCrypt.js"

	export default {
		data() {
			return {
				phone: '',
				password: ''
			}
		},
		onLoad(params) {
			if (params.inviteCode) {
				uni.setStorageSync('inviteCode', params.inviteCode)
			}
		},
		methods: {
			wechatLogin() {
				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号'
					})
					return
				}
				if (!this.password) {
					uni.showToast({
						title: '请输入密码'
					})
					return
				}
				let _this = this
				uni.showLoading({
					title: '请求中...'
				})
				_this.$u.api.loginByPhone({
					phone: this.phone,
					password: this.password
				}).then(res => {
					if(res.code == 500) {
						uni.showToast({
							title: '账号或密码错误',
							icon: 'none'
						})
						return
					}
					uni.setStorageSync('loginWay', 'phone')
					uni.setStorageSync('loginPhone', this.phone)
					uni.setStorageSync('password', this.password)
					
					uni.setStorageSync('tokenHead', res.tokenHead)
					uni.setStorageSync('token', res.token)
					uni.setStorageSync('refreshToken', res.refreshToken)
					uni.setStorageSync('openid', res.openid)
					uni.setStorageSync('session_key', res.session_key)
					uni.setStorageSync('merchantId', res.merchantId)
					uni.setStorageSync('merchantStatus', res.merchantStatus)
					_this.checkStatus()
					uni.hideLoading()
					// if (res.unionId) {
					// 	uni.setStorageSync('unionId', res.unionId)
					// 	_this.checkStatus()
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
					// 				merchantId: uni.getStorageSync("merchantId"),
					// 				unionId: data.unionId
					// 			}).then(res => {
					// 				uni.setStorageSync('unionId', data.unionId)
					// 				console.log(data.unionId);
					// 				_this.checkStatus()
					// 			})
					// 		}
					// 	})
					// }

				})

			},
			checkStatus() {
				if (!uni.getStorageSync('merchantStatus')) {
					return
				}
				let merchantStatus = Number(uni.getStorageSync('merchantStatus'))
				// 0禁止登陆,1未审核,2等待审核,3审核成功
				switch (merchantStatus) {
					case 0:
						uni.navigateTo({
							url: "/subPackages/forbid/forbid"
						})
						break;
					case 1:
						uni.navigateTo({
							url: "/subPackages/register/notice/notice"
						})
						break;
					case 2:
						uni.navigateTo({
							url: "/subPackages/register/wait/wait"
						})
						break;
					case 3:
						uni.switchTab({
							url: "/pages/index/index"
						})
						break;
					default:
						break;
				}
			}
		},
	}
</script>

<style>
	.yellow-btn,
	.blue-btn {
		font-size: 36rpx;
		text-align: center;
		padding: 20rpx 0;
		border-radius: 40rpx;
		color: #FFFFFF;
	}

	.blue-btn {
		background-color: #1672FF;
	}

	.yellow-btn {
		background-color: #fcca03;
		color: #000000;
	}

	page {
		background: white;
	}

	.login-btn {
		margin-top: 100rpx;
		font-size: 36rpx;
		text-align: center;
		padding: 20rpx 0;
		border-radius: 40rpx;
		color: #FFFFFF;
		background-color: #1672FF;
	}
</style>
