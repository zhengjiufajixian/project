<template>
	<view>
		<view class="map-wrap">
			<map style="width: 100%; height: 100%;" :latitude="form.latitude" :longitude="form.longitude" :markers="covers">
			</map>
		</view>
		<view class="u-padding-left-50 u-padding-right-50 u-font-26 color-0F0F0F">
			<view>
				店铺坐标：{{form.latitude}} {{form.longitude}}
			</view>
			<view>
				{{form.shopAddress}}
			</view>
		</view>
		<u-gap height="60"></u-gap>
		<view class="u-flex u-row-between u-col-center u-text-center btn-wrap">
			<view class="u-margin-left-56 u-margin-right-28 u-flex-6 set-location" @click="choseLocation">地图选点</view>
			<view class="u-margin-left-28 u-margin-right-56 u-flex-6 set-shopInfo" @click="upShop">确认修改</view>
		</view>
		<u-gap height="60"></u-gap>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					latitude: '',
					longitude: '',
					shopAddress: ''
				},
				title: 'map',
				covers: [{
					latitude: '', //纬度
					longitude: '', //经度
					iconPath: '/static/image/location-icon.png', //显示的图标
				}]
			}
		},
		onLoad() {
			this.getUpShop()
		},
		methods: {
			setCover(latitude, longitude) {
				this.covers = [{
					latitude: latitude, //纬度
					longitude: longitude, //经度
					iconPath: '/static/image/location-icon.png', //显示的图标
				}]
			},
			getUpShop() {
				this.$u.api.getUpShop().then(res => {
					this.form = res
					this.setCover(res.latitude, res.longitude)
				})
			},
			choseLocation() {
				let _this = this
				wx.chooseLocation({
					success: (data) => {
						if (data.name) {
							this.form.shopAddress = data.address
							this.form.latitude = data.latitude
							this.form.longitude = data.longitude
							this.$forceUpdate()
							this.setCover(data.latitude, data.longitude)
						}
					},
					fail: () => {
						wx.getSetting({
							success: function(res) {
								var statu = res.authSetting;
								console.log(statu);
								if (!statu['scope.userLocation']) {
									wx.showModal({
										title: '是否授权当前位置',
										content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
										success(tip) {
											if (tip.confirm) {
												wx.openSetting({
													success: function(data) {
														if (data.authSetting["scope.userLocation"] === true) {
															wx.showToast({
																title: '授权成功',
																icon: 'success',
																duration: 1000
															})
															//授权成功之后，再调用chooseLocation选择地方
															setTimeout(function() {
																_this.choseLocation()
															}, 1000)
														}
													}
												})
											} else {
												wx.showToast({
													title: '授权失败',
													icon: 'none',
													duration: 1000
												})
											}
										}
									})

								}
							}
						})
					}
				})
			},
			upShop() {
				this.$u.api.upShop(this.form).then(res => {
					if (res) {
						this.getUpShop()
						uni.showToast({
							title: '定位修改成功',
							success: () => {
								setTimeout(function() {
									uni.navigateBack()
								}, 1000)
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '定位修改失败'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.map-wrap {
		width: 653rpx;
		height: 409rpx;
		margin: 50rpx auto;
		border: 4rpx solid $uni-color-primary;
		border-radius: 5rpx;
	}

	.btn-wrap {
		.set-location,
		.set-shopInfo {
			line-height: 65rpx;
			font-size: 30rpx;
			border-radius: 30rpx;
		}
		
		.set-location {
			color: #FFFFFF;
			background-color: #d3d3d3;
		}
		
		.set-shopInfo {
			color: #1672ff;
			background-color: #FFFFFF;
			box-shadow: 0px 3rpx 28rpx 2rpx rgba(22, 114, 255, 0.09);
		}
	}

	.color-0F0F0F {
		color: #0f0f0f;
	}
</style>
