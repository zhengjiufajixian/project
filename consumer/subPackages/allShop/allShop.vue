<template>
	<view>
		<view class="wrap">
			<u-swiper :list="bannerList" height="217"></u-swiper>
		</view>

		<view class="u-padding-left-30 u-padding-right-30 u-margin-top-20 around-service">
			<view class="wrap">
				<view v-for="ele in shopList" class="shop-list" :key="ele.id">
					<navigator :url="'/subPackages/shop/shopDetail/shopDetail?shopId=' + ele.id" hover-class="none">
						<view class="u-relative list-item">
							<view class="u-flex list-content u-padding-top-20">
								<u-image class="img" :src="ele.shopImg" width="234" height="161" :fade="true" :lazy-load="true">
									<u-loading slot="loading"></u-loading>
								</u-image>
								<view class="shop-info">
									<view class="shop-name u-line-1 u-font-28">{{ele.shopName}}</view>
									<view class="shop-rate">
										<u-rate v-model="ele.shopRating" disabled></u-rate>
										<text class="u-font-26">{{ele.shopRating + '分'}}</text>
									</view>
									<view class="u-font-22 u-line-1 shop-address">{{ele.shopAddress}}</view>
									<view class="u-flex">
										<view class="shop-distance">
											<u-icon name="map"></u-icon>
											<text>330m</text>
										</view>
										<view class="shop-sale">
											<u-icon name="shopping-cart"></u-icon>
											<text>{{ele.goodsCount}}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="list-btn">
								<u-button type="primary" size="mini" hair-line="false" shape="circle" :custom-style="customStyle" hover-class="none"
								 @click="washCar(ele)">立即预约</u-button>
							</view>
							<u-line color="#f3f4f7"></u-line>
						</view>
					</navigator>
				</view>
				<view class="loadmore-wrap">
					<u-loadmore :status="status" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				page: 0
			}
		},
		onLoad() {
			this.getBannerlist()
			this.getMerchatShopList()
		},
		methods: {
			washCar(ele) {
				uni.navigateTo({
					url: '../washCar/washCar?data=' + JSON.stringify(ele)
				})
			},
			getBannerlist: function() {
				this.$u.api.getBanner().then(res => {
					this.bannerList = res
				})
			},
			getMerchatShopList: function() {
				this.page++
				this.$u.api.getMerchatShopList({
					page: this.page
				}).then(res => {
					if (res.length < 9) {
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
					width: 90%;
				}

				.shop-rate {
					color: #ffba09;
				}

				.shop-address {
					color: $u-type-info;
					line-height: 3;
					width: 90%;
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
