<template>
	<view>
		<view class="page-section">
			<map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers">
			</map>
			<view class="sos-btn u-flex u-row-center u-col-center" @click="sosBtnClick">

			</view>
			<view class="list-wrap">
				<view class="fixed-btn u-padding-left-15 u-padding-right-15 u-margin-top-52" @click="showTips">
					<text class="u-font-26 color-384AFF">道路救援说明</text>
				</view>
				<view class="fixed-btn u-padding-left-15 u-padding-right-15 u-margin-top-42">
					<navigator class="u-flex" :url="isLogin?'/subPackages/rescue/rescue':'/pages/login/login'"
						hover-class="none">
						<text class="u-font-26 color-384AFF">我的救援记录</text>
					</navigator>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center">
			<view class="u-flex u-row-between u-col-center">
				<text class="u-padding-20 u-font-28 color-000000">重要提示</text>
				<view class="u-padding-20" @click="show=false">
					<u-icon name="close" size="28" color="#999999"></u-icon>
				</view>
			</view>
			<view class="wrap u-padding-left-50 u-padding-right-50 u-padding-top-20 u-padding-bottom-60">
				<view class="u-font-28 color-333333 u-margin-top-20 u-padding-bottom-40">
					<view>欢迎使用广莱车友汇道路救援一键SOS</view>
					<view class="u-margin-top-10">请确认您已处于安全位置，避免等待救援时出现意外情况。</view>

					<view class="u-margin-top-10">请确认您的定位，本平台道路救援服务目前仅限于宜昌市以及周边乡县，若您处于服务范围之外将无法给您提供道路救援服务，给您带来不便敬请谅解。
					</view>

					<view class="u-margin-top-10">请您将您的真实情况通过客服电话告知平台，平台将根据您的实际情况提供最优质的道路救援服务，并提前告知您具体的服务费用。
						例如：拖车服务：宜昌城区200元（20KM以内），超出的按10元/KM单边计费。</view>

				</view>
				<!-- <view class="color-1672FF u-font-28 u-text-center">
					《服务费资费说明》
				</view> -->
				<view class="btn-wrap u-flex u-row-center u-margin-top-40">
					<view class="btn-item" @click="next">已阅读并知晓</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="show2" mode="center">
			<view class="u-flex u-row-between u-col-center">
				<text class="u-padding-20 u-font-28 color-000000"></text>
				<view class="u-padding-20" @click="show2=false">
					<u-icon name="close" size="28" color="#999999"></u-icon>
				</view>
			</view>
			<view class="wrap u-padding-left-50 u-padding-right-50 u-padding-top-20 u-padding-bottom-60">
				<view class="u-font-28 color-333333 u-margin-top-20 u-padding-bottom-40">
					本平台免费为VIP会员提供道路救援服务，您还不是VIP会员，本次服务平台将收取一定的服务费用。
				</view>
				<view class="btn-wrap u-flex u-row-between u-margin-top-40">
					<navigator class="btn-item white-btn" url="/subPackages/vip/vip" hover-class="none">
						查看VIP会员权
					</navigator>
					<view class="btn-item" @click="handleClick">
						拨打电话
					</view>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="carModal" content="暂未绑定车辆" confirm-text="去绑定" @confirm="toAddCar" :show-title="false" :mask-close-able="true" :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	import QQMapWX from "../../common/qqmap-wx-jssdk.js"
	import * as config from "../../common/config.js"
	var qqmapsdk
	export default {
		data() {
			return {
				latitude: uni.getStorageSync('latitude'),
				longitude: uni.getStorageSync('longitude'),
				covers: [{
					id: 1,
					latitude: this.latitude, //纬度
					longitude: this.longitude, //经度
					iconPath: '/static/image/location-icon.png', //显示的图标
					width:'43',
					height:'53'
				}],
				show: false,
				show2: false,
				isLogin: uni.getStorageSync('token'),
				flag: false,
				carModal: false
			}
		},
		onShow() {
			this.getLocation()
			this.isLogin = uni.getStorageSync('token')
		},
		onLoad() {
			qqmapsdk = new QQMapWX({
				key: config.WX_map_key
			});
		},
		methods: {
			toAddCar() {
				uni.navigateTo({
					url:'/subPackages/myCar/myCar'
				})
			},
			getLocation() {
				// 获取定位
				let _this = this
				uni.getLocation({
				    type: 'gcj02',
					isHighAccuracy: true,
					geocode: true,
				    success: function (res) {
						var lat = res.latitude
						var lon = res.longitude
						qqmapsdk.reverseGeocoder({
							location: lat + "," + lon,
							success:(res,data)=>{
								var address = res.result.formatted_addresses.recommend
								_this.setLocation(lon,lat,address)
							},
						})
				    },
					fail:function(res) {
						// uni.showToast({
						// 	title:'需要获取定位权限',
						// 	icon: 'none'
						// })
					}
				});
			},
			setLocation(lon,lat,address) {
				this.latitude = lat
				this.longitude = lon
				this.covers[0].latitude = lat
				this.covers[0].longitude = lon
			},
			showTips() {
				this.show = true
				this.flag = true
			},
			next() {
				this.show = false
				uni.setStorageSync('sosTips', true)
				if(!this.flag){
					this.show2 = true
				}
				this.flag = false
			},
			sosBtnClick() {
				if (uni.getStorageSync('token')) {
					if(!uni.getStorageSync('carNumber')) {
						this.carModal = true
						return
					}
					if (uni.getStorageSync('sosTips')) {
						this.show2 = true
					} else {
						this.show = true
					}
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			handleClick() {
				this.show2 = false
				uni.showLoading({
					title: '请稍等...'
				})
				let _this = this
				qqmapsdk.calculateDistance({
					mode: 'driving', // driving,walking(默认)
					from: {
						latitude: config.resureLocation.latitude,
						longitude: config.resureLocation.longitude
					},
					to: [{
						latitude: uni.getStorageSync('latitude'),
						longitude: uni.getStorageSync('longitude')
					}],
					success: function(res, data) {
						if (res.status == 0) {
							_this.addRescue(res.result.elements[0])

							// distance	number	起点到终点的距离，单位：米，
							// 如果radius半径过小或者无法搜索到，则返回-1	

							// duration	number	表示从起点到终点的结合路况的时间，秒为单位
							// 注：步行方式不计算耗时，该值始终为0

						}
					}
				})

			},
			addRescue(obj) {
				this.$u.api.addRescue({
					userId: uni.getStorageSync('userId'),
					longitude: uni.getStorageSync('longitude'),
					latitude: uni.getStorageSync('latitude'),
					distance: obj.distance,
					duration: obj.duration
				}).then(res => {
					if (res.code == 500) {
						uni.showToast({
							title: '订单创建失败',
							icon: 'none'
						})
						uni.hideLoading()
						console.log(res);
					} else {
						uni.hideLoading()
						this.call()
					}
				})
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: config.contactPhone
				})
			}
		}
	}
</script>

<style lang="scss">
	.page-section {
		height: 100vh;
	}

	.wrap {
		width: 586rpx;
		// height: 250rpx;
	}

	.btn-item {
		width: 45%;
		text-align: center;
		padding: 12rpx 0;
		border-radius: 15rpx;
		background-color: $uni-color-primary;
		color: #FFFFFF;
	}

	.gray-btn {
		background-color: #c0d4f3;
	}

	.white-btn {
		background-color: #FFFFFF;
		color: #1672FF;
	}

	.sos-btn {
		position: fixed;
		bottom: 18rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		left: 50%;
		transform: translateX(-50%);
		background-image: url(../../static/image/sos-btn.png);
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}

	.list-wrap {
		position: fixed;
		right: 0;
		top: 0;
	}

	.fixed-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 52rpx;
		background-color: #1672FF;
		color: #FFFFFF;
		font-size: 28rpx;
		box-shadow: 0 0 16rpx 1rpx rgba(22, 114, 255, 0.19);
		line-height: 52rpx;
		border-radius: 40rpx 0 0 40rpx;
		box-shadow: 0 10rpx 10rpx 0 rgba(6, 0, 1, 0.27);

	}
</style>
