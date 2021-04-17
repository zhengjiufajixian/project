<template>
	<view>
		<!-- <view class="wrap">
			<u-swiper :list="bannerList" height="421"></u-swiper>
		</view> -->
		<view class="u-padding-30">
			<u-image src="/static/image/bg.jpg" width="100%" height="340"></u-image>
		</view>
		<!-- <navigator class="u-flex u-row-between u-col-center u-margin-top-40" url="/subPackages/notice/notice"
			hover-class="none">
			<view class="u-font-28 color-333333 u-margin-left-26">查看用户须知</view>
			<view class="u-font-24 color-000000 u-margin-right-26">取消订单、拒绝提供服务等措施...<u-icon name="order"></u-icon>
			</view>
		</navigator> -->

		<view class="u-padding-left-30 u-padding-right-30 u-margin-top-20 around-service">
			<view class="wrap">
				<view v-for="ele in shopList" class="shop-list" :key="ele.id">
					<view @click="toDetail(ele)">
						<view class="u-relative list-item">
							<view class="u-flex list-content u-padding-top-20">
								<u-image class="img" :src="ele.shopImg" width="234" height="161" :fade="true"
									:lazy-load="true">
									<u-loading slot="loading"></u-loading>
								</u-image>
								<view class="shop-info">
									<view class="shop-name u-line-1 u-font-28">{{ele.shopName}}</view>
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
							<view class="list-btn" @click.stop="handleClick(ele)">立即预约</view>
							<u-line color="#f3f4f7"></u-line>
						</view>
					</view>
				</view>
				<view class="loadmore-wrap">
					<u-loadmore :status="status" />
				</view>
			</view>
		</view>
		<u-mask :show="show" @click="show = false">
			<view class="pos-abs-center">
				<view class="close-wrap ">
					<u-image src="/static/image/close.png" mode="aspectFit" width="100%" height="60"></u-image>
				</view>
				<view class="u-font-26 color-333333 bg-white">
					<view class="u-padding-left-38 u-padding-right-38 u-padding-top-30 u-padding-bottom-30">
						<navigator :url="'/subPackages/washCar/washCar?data=' + JSON.stringify(currentData) "
							hover-class="none">
							洗车预约
						</navigator>
					</view>
					<view
						class="u-padding-left-38 u-padding-right-38 u-padding-top-30 u-padding-bottom-30 u-border-top u-border-bottom">
						<navigator :url="'/subPackages/maintenance/maintenance?data=' + JSON.stringify(currentData) "
							hover-class="none">
							保养预约
						</navigator>
					</view>
					<view class="u-padding-left-38 u-padding-right-38 u-padding-top-30 u-padding-bottom-30">
						<navigator :url="'/subPackages/maintenance/maintenance?data=' + JSON.stringify(currentData) "
							hover-class="none">
							维修预约
						</navigator>
					</view>
				</view>
			</view>
		</u-mask>
		
		<u-modal v-model="carModal" content="暂未绑定车辆" confirm-text="去绑定" @confirm="toAddCar" :show-title="false" :mask-close-able="true" :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	import * as config from '../../common/config.js'
	export default {
		data() {
			return {
				// 轮播图
				show: false,
				currentData: {},
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
				isWx: 0,
				isBy: 0,
				type: '',
				carModal: false
			}
		},
		onPullDownRefresh() {
			this.page = 0
			this.shopList = []
			this.status = 'loading'
			this.getMerchatShopList(true)
		},
		onLoad(params) {
			console.log(params);
			this.isBy = params.isBy == 1 ? 1 : 0
			this.isWx = params.isWx == 1 ? 1 : 0
			if (this.isBy == 1) {
				this.type = 'BY'
				uni.setNavigationBarTitle({
					title: '汽车保养'
				})
			}
			if (this.isWx == 1) {
				this.type = 'WX'
				uni.setNavigationBarTitle({
					title: '汽车维修'
				})
			}
			this.getBannerlist()
			this.getMerchatShopList()
		},
		methods: {
			toDetail(ele){
				if(uni.getStorageSync('token')){
					if(uni.getStorageSync('carNumber')){
						uni.navigateTo({
							url:'/subPackages/shop/shopDetail/shopDetail?shopId=' + ele.id + (this.isWx == 1 ? '&isWx=1':'' + this.isBy == 1 ? '&isBy=1' :'')
						})
					}else{
						this.carModal = true
					}
				}else{
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
				
			},
			toAddCar() {
				uni.navigateTo({
					url:'/subPackages/myCar/myCar'
				})
			},
 			getDistance(ele) {
				return config.getDistance(ele.latitude, ele.longitude, uni.getStorageSync("latitude"), uni.getStorageSync(
					"longitude"))
			},
			handleClick(ele) {
				if (uni.getStorageSync('token')) {
					if(uni.getStorageSync('carNumber')){
						uni.navigateTo({
							url: '/subPackages/maintenance/maintenance?data=' + JSON.stringify(ele)
						})						
					}else{
						this.carModal = true
					}
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			showModal(item) {
				this.currentData = item
				this.show = true
			},
			getBannerlist() {
				this.$u.api.getBanner().then(res => {
					this.bannerList = res
				})
			},
			getMerchatShopList(flag) {
				this.page++
				this.$u.api.getMerchatShopList({
					type: this.type,
					page: this.page
				}).then(res => {
					if (flag) {
						uni.stopPullDownRefresh();
					}
					if (res.length < 10) {
						this.status = 'nomore'
					}
					this.shopList = this.shopList.concat(res)
				})
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

<style lang="scss" scoped>
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
			height: 80%;
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
			// background: url('/static/image/service.jpg') no-repeat center center;
			background-size: cover;
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

			.item-btn {}
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
					font-weight: bold;
					width: 400rpx;
				}

				.shop-rate {
					color: #ffba09;
				}

				.shop-address {
					color: $u-type-info;
					line-height: 3;
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
	}
</style>
