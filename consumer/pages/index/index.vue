<template>
	<view>
		<view class="u-flex u-padding-left-30 u-padding-right-30 u-row-between top">
			<view class="u-font-26 location">
				清华科技园<u-icon name="map"></u-icon>
			</view>
			<view class="u-rela msg">
				<u-icon name="chat"></u-icon>
				<u-badge :is-dot="true" type="error" :offset="[5,5]"></u-badge>
			</view>
		</view>
		<view class="u-padding-left-30 u-padding-right-30 u-relative banner">
			<view class="u-absolute bg"></view>
			<view class="wrap">
				<u-swiper :list="bannerList" height="305"></u-swiper>
			</view>
			<!-- <u-image src="../../../static/image/banner.jpg" mode="widthFix" shape="square" border-radius="10">
				<u-loading slot="loading"></u-loading>
			</u-image> -->
		</view>
		<view class="u-flex u-col-center u-margin-left-30 u-margin-right-30 u-margin-top-10 u-margin-bottom-20 u-padding-top-20 u-padding-bottom-20 bg-white">
			<view class="u-flex-2 color-ff8080 bold u-font-30">
				<view class="u-text-center"><text>汽车</text></view>
				<view class="u-text-center"><text>头条</text></view>
			</view>
			<view class="u-flex-9">
				<u-notice-bar mode="vertical" :volume-icon="false" :list="list" type="none"></u-notice-bar>
				<u-notice-bar mode="vertical" :volume-icon="false" :list="list" type="none"></u-notice-bar>
			</view>
			<view class="u-flex-1">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="u-padding-left-30 u-padding-right-30 vip-service">
			<view class="u-flex u-row-between common-header-wrap">
				<view class="title">
					<u-icon name="tags-fill" color="#ff8746" size="40"></u-icon>
					<text class="u-font-28 u-margin-left-16">会员服务</text>
				</view>
				<view class="sub-title">
					<text class="u-font-22">查看全部</text>
				</view>
			</view>
			<view class="service-list">
				<view class="list-item">
					<view class="u-font-28 item-title">汽车保养</view>
					<view class="u-font-22 item-content">品牌连锁店任君选</view>
					<view class="item-btn">
						<u-button type="primary" size="mini" hair-line="false" shape="circle" :custom-style="customStyle">立即去领</u-button>
					</view>
				</view>
				<view class="list-item">
					<view class="u-font-28 item-title">汽车保养</view>
					<view class="u-font-22 item-content">品牌连锁店任君选</view>
					<view class="item-btn">
						<u-button type="primary" size="mini" hair-line="false" shape="circle" :custom-style="customStyle">立即去领</u-button>
					</view>
				</view>
				<view class="list-item">
					<view class="u-font-28 item-title">汽车保养</view>
					<view class="u-font-22 item-content">品牌连锁店任君选</view>
					<view class="item-btn">
						<u-button type="primary" size="mini" hair-line="false" shape="circle" :custom-style="customStyle">立即去领</u-button>
					</view>
				</view>
				<view class="list-item">
					<view class="u-font-28 item-title">汽车保养</view>
					<view class="u-font-22 item-content">品牌连锁店任君选</view>
					<view class="item-btn">
						<u-button type="primary" size="mini" hair-line="false" shape="circle" :custom-style="customStyle">立即去领</u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="u-padding-left-30 u-padding-right-30 u-margin-top-20 around-service">
			<view class="u-flex u-row-between common-header-wrap">
				<view class="title">
					<u-icon name="map"></u-icon>
					<text class="u-font-28">附近洗车</text>
				</view>
				<view class="sub-title" @click="seeAll">
					<text class="u-font-22">查看全部</text>
				</view>
			</view>
			<view class="wrap">
				<view v-for="ele in shopList" class="shop-list" :key="ele.id">
					<view class="u-relative list-item">
						<view class="u-flex list-content">
							<u-image class="img" :src="ele.shopImg" width="234" height="161" :fade="true" :lazy-load="true">
								<u-loading slot="loading"></u-loading>
							</u-image>
							<!-- <image class="img" ></image> -->
							<view class="shop-info">
								<view class="shop-name">
									<text class="u-font-28">{{ele.shopName}}</text>
								</view>
								<view class="shop-rate">
									<u-rate active-color="#ffba09" size="26" :count="count" v-model="ele.rating" disabled></u-rate>
									<text class="u-font-26">{{ele.rating + '分'}}</text>
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
				</view>
				<view class="loadmore-wrap">
					<u-loadmore :status="status" margin-top='20' margin-bottom="20" />
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
				page: 1,
				list: [
					'大众上半年亏损8亿欧元 迪斯再获监事...',
					'身具双重任务 东风冲高“绘”岚图...'
				]
			}
		},
		onLoad() {
			this.getBannerlist()
			this.getMerchatShopList()
			// 获取定位
			// uni.getLocation({
			//     type: 'wgs84',
			// 	geocode: true,
			//     success: function (res) {
			// 		console.log(res)
			//         console.log('当前位置的经度：' + res.longitude);
			//         console.log('当前位置的纬度：' + res.latitude);
			//     }
			// });
		},
		methods: {
			seeAll() {
				uni.navigateTo({
					url: "../allShop/allShop"
				})
			},
			getBannerlist: function() {
				this.$u.api.getBanner().then(res => {
					this.bannerList = res
				})
			},
			getMerchatShopList: function() {
				this.$u.api.getMerchatShopList({
					page: this.page
				}).then(res => {
					if (res.length < 9) {
						this.status = 'nomore'
					}
					this.shopList = this.shopList.concat(res)
				})
			},
			washCar(ele) {
				uni.navigateTo({
					url: '../washCar/washCar?data=' + JSON.stringify(ele)
				})
			}
		},
		onReachBottom() {
			if (this.status == 'nomore') {
				return
			}
			this.status = 'loading';
			this.page = ++this.page;
			this.getMerchatShopList()
		}
	}
</script>

<style lang="scss">
	.color-ff8080 {
		color: #ff8080;
	}
	.u-notice-bar  {
		padding:  0 !important;
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
			background: url(../../static/image/service.jpg) no-repeat center center;
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
