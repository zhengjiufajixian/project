<template>
	<view>
		<view>
			<u-image src="/static/image/login-bg.jpg" mode="widthFix" width="100%" height="1100"></u-image>
		</view>
		<view class="btn-wrap u-flex u-row-between u-margin-top-20 u-margin-bottom-30">
			<view class="u-flex-6 u-margin-left-20 u-margin-right-10 blue-btn" @click="wechatLogin">微信登录</view>
			<view class="u-flex-6 u-margin-right-20 u-margin-left-10 yellow-btn" @click="wechatLogin">注册</view>
		</view>
		<view class="btn-wrap color-333333 u-padding-top-20 u-padding-bottom-30 u-text-center">
			<navigator url="/pages/login/loginByPhone/loginByPhone" hover-class="none">
				手机号登录
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
		onLoad(params) {
			if(params.inviteCode) {
				uni.setStorageSync('inviteCode', params.inviteCode)
			}
		},
		methods: {
			wechatLogin() {
				let _this = this
				uni.showLoading({
					title:'请求中...'
				})
				uni.login({
					success: function(res) {
						if (!res.code) {
							uni.showToast({
								title: '啊哦，登录失败了，重新试试',
								icon: 'none'
							})
							return
						}
						_this.$u.api.login({
							code: res.code
						}).then(res => {
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
					fail: function(error) {
						uni.showToast({
							title: '啊哦，登录失败，重新试试',
							icon: 'none'
						})
					}
				})
			},
			checkStatus() {
				if(!uni.getStorageSync('merchantStatus')){
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
							url: "../index/index"
						})
						break;
					default:
						break;
				}
			}
		},
	}
</script>

<style >
	.yellow-btn,.blue-btn{
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
	page{
		background: white;
	}
	
</style>
