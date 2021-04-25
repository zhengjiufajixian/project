<template>
	<view class="u-skeleton">
		<view class="u-flex u-padding-left-30 u-padding-right-30 u-row-between top">
			<view class="u-skeleton-fillet u-font-26 u-flex location" @click="choseLocation">
				<view>{{address?address:'正在定位'}}</view>
				<u-icon name="map"></u-icon>
			</view>
		</view>
		<view class="u-padding-left-30 u-padding-right-30 u-relative banner">
			<view class="u-absolute bg"></view>
			<view class="wrap u-skeleton-fillet">
				<u-swiper :list="bannerList" border-radius="20" height="305" @click="handleClick"></u-swiper>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 vip-service">
			<view class="u-flex u-row-between common-header-wrap">
				<view class="title u-skeleton-fillet">
					<u-icon name="tags-fill" color="#ff8746" size="40"></u-icon>
					<text class="u-font-28 u-margin-left-16">会员服务</text>
				</view>
			</view>
			<view class="service-list">
				<view class="list-item service1 u-skeleton-fillet">
					<navigator url="/subPackages/shop/shop?isBy=1" hover-class="none">
						<view class="u-font-28 item-title">汽车保养</view>
						<view class="u-font-22 item-content">品牌连锁店任君选</view>
						<view class="item-btn">立即去领</view>
					</navigator>
				</view>
				<view class="list-item service2 u-skeleton-fillet">
					<navigator url="/pages/sos/sos" open-type="switchTab" hover-class="none">
						<view class="u-font-28 item-title">事故处理</view>
						<view class="u-font-22 item-content">一键搞定无需等待</view>
						<view class="item-btn">立即去领</view>
					</navigator>
				</view>
				<view class="list-item service3 u-skeleton-fillet">
					<navigator url="/subPackages/shop/shop?isWx=1" hover-class="none">
						<view class="u-font-28 item-title">汽车维修</view>
						<view class="u-font-22 item-content">快速维修免排队</view>
						<view class="item-btn">立即去领</view>
					</navigator>
				</view>
				<view class="list-item service4 u-skeleton-fillet">
					<navigator url="/pages/sos/sos" open-type="switchTab" hover-class="none">
						<view class="u-font-28 item-title">道路救援</view>
						<view class="u-font-22 item-content">搭电换胎全免费</view>
						<view class="item-btn">立即去领</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="u-padding-left-30 u-padding-right-30 u-margin-top-20 around-service">
			<view class="u-flex u-row-between common-header-wrap">
				<view class="title u-skeleton-fillet">
					<u-icon name="map-fill" color="#1672ff" size="40"></u-icon>
					<text class="u-font-28 u-margin-left-16">附近洗车</text>
				</view>
			</view>
			<view class="wrap">
				<view v-for="(ele,index) in shopList" class="shop-list u-skeleton-fillet" :key="index">
					<view class="u-skeleton-fillet" @click="toDetail(ele)">
						<view class="u-relative list-item">
							<view class="u-flex list-content u-col-top">
								<u-image class="img" :src="ele.shopImg" width="234" height="161" :fade="true"
									:lazy-load="true">
									<u-loading slot="loading"></u-loading>
								</u-image>
								<view class="shop-info">
									<view class="shop-name u-line-1">
										<text class="u-font-28">{{ele.shopName}}</text>
									</view>
									<view class="shop-rate">
										<u-rate :current="ele.shopRating" :disabled="true"></u-rate>
										<text class="u-font-26">{{ele.shopRating + '分'}}</text>
									</view>
									<view class="u-font-22 u-line-1 shop-address">{{ele.shopAddress}}</view>
									<view class="u-flex">
										<view class="shop-distance">
											<u-icon name="map"></u-icon>
											<text>{{getDistance(ele)}}</text>
										</view>
										<view class="shop-sale">
											<u-icon name="shopping-cart"></u-icon>
											<text>{{ele.goodsCount}}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="list-btn">
								<u-button type="primary" size="mini" shape="circle" :custom-style="customStyle"
									hover-class="none" @click.stop="washCar(ele)">立即预约</u-button>
							</view>
							<u-line color="#f3f4f7"></u-line>
						</view>
					</view>
				</view>
				<view class="loadmore-wrap">
					<u-loadmore :status="status" />
				</view>
			</view>
		</view>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		<u-modal v-model="carModal" content="暂未绑定车辆" confirm-text="去绑定" @confirm="toAddCar" :show-title="false"
			:mask-close-able="true" :show-cancel-button="true"></u-modal>
		<!-- <official-account @bindload="bindload"></official-account> -->
	</view>
</template>

<script>
	import QQMapWX from "../../common/qqmap-wx-jssdk.js"
	import * as config from "../../common/config.js"

	var qqmapsdk
	export default {
		data() {
			return {
				// 轮播图
				bannerList: [],
				shopList: [],
				// 按钮样式
				customStyle: {
					backgroundColor: '#ffba09',
					color: '#fff',
					height: '40rpx',
					lineHeight: '40rpx'
				},
				status: 'loading',
				page: 0,
				latitude: '',
				longitude: '',
				address: '正在定位',
				loading: true,
				carModal: false
			}
		},
		onPullDownRefresh() {
			this.page = 0
			this.shopList = []
			this.status = 'loading'
			this.getMerchatShopList(true)
		},
		onShow() {
			this.latitude = uni.getStorageSync('latitude')
			this.longitude = uni.getStorageSync('longitude')
			this.address = uni.getStorageSync('address')
			if (!uni.getStorageSync('latitude')) {
				this.getLocation()
			} else {
				if (this.loading) {
					this.loading = false
				}
				this.getMerchatShopList()
			}
		},
		onLoad() {
			qqmapsdk = new QQMapWX({
				key: config.WX_map_key
			});
			this.getBannerlist()
		},
		methods: {
			bindload(detail) {
				console.log(detail);
			},
			// 定位获取位置信息授权逻辑
			getLocation() {
				//wx.getSetting是获取用户授权的信息的，除了应用在位置信息授权还能应用在用户信息授权等等
				uni.getSetting({
					success: res => {
						// true说明已经授权，如果还拿不到定位信息，说明用户的手机没开启定位功能
						if (res.authSetting['scope.userLocation'] === true) {
							console.log('已经授权，非第一次')
							//授权后默认加载，直接获取定位
							this.handleLoacation()
						}
						// scope.userLocation === undefined代表用户未授权且第一次登陆
						else if (res.authSetting['scope.userLocation'] === undefined) {
							// 如果用户是第一次登陆且未授权的情况，会直接弹窗请求授权
							// 使用 getlocation 获取用户 经纬度位置
							console.log('第一次登陆且未授权')
							this.handleLoacation(true)
						}
						// 小程序检测到用户不是第一次进入该页面,且未授权
						else if (res.authSetting['scope.userLocation'] !== undefined && res.authSetting[
								'scope.userLocation'] !== true) {
							console.log('不是第一次进入该页面,且未授权')
							uni.showModal({
								title: '是否授权当前位置',
								content: '需要获取您的地理位置，请确认授权，否则无法使用相关功能！',
								success: res => {
									//如果点击取消则显示授权失败
									if (res.cancel) {
										uni.showModal({
											title: '提示',
											content: '授权失败!'
										})
									}
									//如果点击确定会打开授权页请求二次授权
									else if (res.confirm) {
										uni.openSetting({
											success: dataAu => {
												if (dataAu.authSetting['scope.userLocation'] === true) {
													uni.showModal({
														title: '提示',
														content: '授权成功!'
													})
													//再次授权，调用getLocationt的API
													this.handleLoacation()
												} else {
													// this.isLocation = false
													uni.showModal({
														title: '提示',
														content: '授权失败!'
													})
												}
											}
										})
									}
								}
							})
						}
					},
					fail: err => {
						// this.isLocation = false
						uni.showModal({
							title: '提示',
							content: '未知错误，请重新打开小程序！'
						})
					}
				})
			},
			handleLoacation(flag) {
				// 获取定位
				let _this = this
				uni.getLocation({
					type: 'gcj02',
					isHighAccuracy: true,
					geocode: true,
					success: function(res) {
						var lat = res.latitude
						var lon = res.longitude
						qqmapsdk.reverseGeocoder({
							location: lat + "," + lon,
							success: (res, data) => {
								var address = res.result.formatted_addresses.recommend
								_this.setLocation(lon, lat, address)
							},
						})
					},
					fail: function(res) {
						if (flag) {
							// this.$u.toast是用的框架里封装的弹出消息
							uni.showModal({
								title: '提示',
								content: '您已拒绝授权，相关功能会无法使用！'
							})
							return
						}
						uni.showModal({
							title: '提示',
							content: '请在系统设置中打开定位服务，重新进入小程序！'
						})
					}
				});
			},
			handleClick(index) {
				let selected = this.bannerList[index]
				if (selected.page == 'share') {
					uni.navigateTo({
						url: '/subPackages/share/share'
					})
				}
				if (selected.page == 'charge') {
					uni.navigateTo({
						url: '/pages/charge/charge'
					})
				}
			},
			toAddCar() {
				uni.navigateTo({
					url: '/subPackages/myCar/myCar'
				})
			},
			toDetail(ele) {
				if (uni.getStorageSync('token')) {
					if (uni.getStorageSync('carNumber')) {
						uni.navigateTo({
							url: '/subPackages/shop/shopDetail/shopDetail?shopId=' + ele.id
						})
					} else {
						this.carModal = true
					}
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})

				}
			},
			turnTo() {
				uni.navigateTo({
					url: '/subPackages/shop/shop'
				})
			},
			setLocation(lon, lat, address) {
				this.latitude = lat
				this.longitude = lon
				this.address = address

				uni.setStorageSync("latitude", lat)
				uni.setStorageSync("longitude", lon)
				uni.setStorageSync("address", address)

				this.page = 0
				this.status = 'loading'
				this.shopList = []
				this.getMerchatShopList()
				if (this.loading) {
					this.loading = false
				}
			},

			choseLocation() {
				let _this = this
				wx.chooseLocation({
					success: (data) => {
						console.log(data);
						if (data.name) {
							_this.setLocation(data.longitude, data.latitude, data.name)
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
														if (data.authSetting[
																"scope.userLocation"
															] === true) {
															wx.showToast({
																title: '授权成功',
																icon: 'success',
																duration: 1000
															})
															//授权成功之后，再调用chooseLocation选择地方
															setTimeout(
																function() {
																	_this
																		.choseLocation()
																}, 500)
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

			getDistance(ele) {
				return config.getDistance(ele.latitude, ele.longitude, uni.getStorageSync("latitude"), uni.getStorageSync(
					"longitude"))
			},

			getBannerlist() {
				this.$u.api.getBanner().then(res => {
					this.bannerList = res
				}).catch(err => {
					console.log(err);
				})
			},
			getMerchatShopList(flag) {
				this.page++
				this.$u.api.getMerchatShopList({
					type: 'XC',
					page: this.page
				}).then(res => {

					if (flag) {
						uni.stopPullDownRefresh();
					}
					if (res.length < 10) {
						this.status = 'nomore'
					}
					this.shopList = this.shopList.concat(res)
				}).catch(err => {
					uni.showToast({
						title: '啊哦，出错了，请稍后重试',
						icon: 'none'
					});
					console.log(err);
					this.status = 'nomore'
				})
			},
			washCar(ele) {
				if (uni.getStorageSync('token')) {
					if (uni.getStorageSync('carNumber')) {
						uni.navigateTo({
							url: '/subPackages/washCar/washCar?data=' + JSON.stringify(ele)
						})
					} else {
						this.carModal = true
					}
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			}
		},
		onReachBottom() {
			if (this.status == 'nomore') {
				return
			}
			this.status = 'loading';
			this.getMerchatShopList()
		}
	}
</script>

<style lang="scss">
	.color-ff8080 {
		color: #ff8080;
	}

	.u-notice-bar {
		padding: 0 !important;
	}

	.u-news-item {
		font-size: 22rpx !important;
		color: #666666 !important;
	}

	.top {
		height: 80rpx;
		background-color: $uni-color-primary;

		.location,
		.msg {
			color: #fff;
		}

		.msg {
			font-size: 60rpx;
		}
	}

	.banner {
		height: 306rpx;

		.bg {
			z-index: -1;
			background-color: $uni-color-primary;
			height: 50%;
			width: 100%;
			left: 0;
			top: 0;
		}
	}

	.news {
		overflow: hidden;
		margin: 18rpx 30rpx;
		padding: 10rpx 0;
		background-color: #fff;
		border-radius: 10rpx;

		.news-title {
			color: $uni-color-error;
			font-size: 36rpx;
			line-height: 1.5;
			font-weight: bold;
		}

		.news-list {
			.news-item {
				line-height: 2;
				padding-left: 20rpx;

				.red-dot {
					display: inline-block;
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background-color: $uni-color-error;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);

				}
			}
		}

		.arrow {
			line-height: 3.5;
		}
	}

	.common-header-wrap {
		background-color: #fff;
		padding: 28rpx 20rpx;
		border-radius: 10rpx 10rpx 0 0;

		.title {
			font-weight: bold;
		}

		.sub-title {
			color: $u-type-info;
		}
	}

	.service-list {
		background-color: #fff;
		padding-bottom: 12rpx;
		border-radius: 0 0 10rpx 10rpx;

		.list-item {
			display: inline-block;
			height: 172rpx;
			width: 324rpx;
			padding-left: 16rpx;
			padding-top: 30rpx;
			margin: 0 10rpx 18rpx;
			border-radius: 15rpx;

			.item-title {
				font-weight: bold;
			}

			.item-content {
				line-height: 50rpx;
			}

			.item-btn {
				display: inline-block;
				background-color: #ffba09;
				color: #fff;
				height: 20px;
				line-height: 20px;
				font-size: 22rpx;
				width: auto;
				padding: 0 20rpx;
				border-radius: 100rpx;
			}
		}

		.service1 {
			background: url('/static/image/service1.png') no-repeat center center;
			background-size: cover;
		}

		.service2 {
			background: url('/static/image/service2.png') no-repeat center center;
			background-size: cover;
		}

		.service3 {
			background: url('/static/image/service3.png') no-repeat center center;
			background-size: cover;
		}

		.service4 {
			background: url('/static/image/service4.png') no-repeat center center;
			background-size: cover;
		}
	}

	.around-service {
		.list-item {
			background-color: #fff;
			padding-bottom: 20rpx;

			.list-content {
				padding-bottom: 16rpx;

				.img {
					width: 236rpx;
					height: 164rpx;
					margin: 0 20rpx;
				}

				.shop-name {
					width: 90%;
					font-weight: bold;
				}

				.shop-rate {
					color: #ffba09;
				}

				.shop-address {
					color: $u-type-info;
					line-height: 2.5;
					width: 400rpx;
				}

				.shop-distance,
				.shop-sale {
					color: $u-type-info-disabled;
				}

				.shop-sale {
					margin-left: 32rpx;
				}
			}

			.list-btn {
				position: absolute;
				right: 20rpx;
				bottom: 36rpx;
			}
		}
	}
</style>
