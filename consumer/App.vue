<script>
	export default {
		onLaunch: function() {
			uni.removeStorageSync("latitude")
			uni.removeStorageSync("longitude")
			uni.removeStorageSync("address")
			if (uni.getStorageSync('token') && uni.getStorageSync('userId')) {
				let _this = this
				uni.login({
					success: function(res) {
						_this.$u.api.login({
							code: res.code
						}).then(res => {
							uni.setStorageSync('tokenHead', res.tokenHead)
							uni.setStorageSync('openid', res.openid)
							uni.setStorageSync('session_key', res.session_key)
							uni.setStorageSync('userId', res.userId)
							uni.setStorageSync('token', res.token)
							uni.setStorageSync('refreshToken', res.refreshToken)
							uni.setStorageSync('userName', res.userName)
							if (res.userPhone) {
								uni.setStorageSync('userPhone', res.userPhone)
							}
							if (res.car) {
								uni.setStorageSync('carModel', res.car.carModel)
								uni.setStorageSync('carNumber', res.car.carNumber)
								uni.setStorageSync('vehicleFrame', res.car.vehicleFrame)
							}
							// if(getCurrentPages().length !=0) {
							// 	getCurrentPages()[getCurrentPages().length -1].onLoad()
							// }
						})
					}
				})
			}

			var self = this
			// 获取小程序更新机制兼容
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager()
				//1. 检查小程序是否有新版本发布
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						//检测到新版本，需要更新，给出提示
						wx.showModal({
							title: '更新提示',
							showCancel: false, //隐藏取消按钮
							confirmText: "确定更新", //只保留确定更新按钮
							content: '检测到新版本，是否下载新版本并重启小程序？',
							success: function(res) {
								if (res.confirm) {
									//2. 用户确定下载更新小程序，小程序下载及更新静默进行
									self.downLoadAndUpdate(updateManager)
								} else if (res.cancel) {
									//用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
									wx.showModal({
										title: '温馨提示~',
										content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
										showCancel: false, //隐藏取消按钮
										confirmText: "确定更新", //只保留确定更新按钮
										success: function(res) {
											if (res.confirm) {
												//下载新版本，并重新应用
												self.downLoadAndUpdate(updateManager)
											}
										}
									})
								}
							}
						})
					}
				})
			} else {
				// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
		},
		methods: {
			downLoadAndUpdate: function(updateManager) {
				var self = this
				wx.showLoading();
				//静默下载更新小程序新版本
				updateManager.onUpdateReady(function() {
					wx.hideLoading()
					//新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					updateManager.applyUpdate()
				})
				updateManager.onUpdateFailed(function() {
					// 新的版本下载失败
					wx.showModal({
						title: '已经有新版本了哟~',
						content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #f3f4f7;
	}

	// view,text {
	// 	line-height: 1;
	// }

	.color-000000 {
		color: #000000;
	}

	.color-1672FF {
		color: #1672FF;
	}

	.color-333333 {
		color: #333333;
	}

	.color-444444 {
		color: #444444;
	}

	.color-FEFEFE {
		color: #FEFEFE;
	}

	.color-FFFFFF {
		color: #FFFFFF;
	}

	.color-FFBA09 {
		color: #FFBA09;
	}

	.color-4A4A4A {
		color: #4A4A4A;
	}

	.color-FF2828 {
		color: #FF2828;
	}

	.color-666666 {
		color: #666666;
	}

	.color-999999 {
		color: #999999;
	}

	.color-8C8C8C {
		color: #8C8C8C;
	}

	.color-13E3A5 {
		color: #13E3A5;
	}

	.bold {
		font-weight: bold;
	}

	.bg-white {
		background-color: #fff;
	}

	.border-radius-30 {
		border-radius: 30rpx;
	}

	.pos-abs-center {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.line-height-1 {
		line-height: 1;
	}

	.line-height-3 {
		line-height: 3;
	}

	/* #ifdef APP-PLUS || MP-WEIXIN */
	// 多选框样式
	checkbox .wx-checkbox-input {
		border-radius: 50%;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #1672FF;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		color: #fff;
	}

	// 单选框样式
	radio .wx-radio-input.wx-radio-input-checked {
		background: #1672FF;
	}

	radio .wx-radio-input.wx-radio-input-checked::before {
		color: #fff;
	}

	/* #endif */

	@import "uview-ui/index.scss";
</style>
