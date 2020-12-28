<template>
	<view>
		<view class="u-flex u-padding-left-30 u-padding-right-30 top">
			<u-avatar size="84"></u-avatar>
			<view class="u-margin-left-15">
				<view><text class="color-FFFFFF u-font-34">MINGMING</text></view>
				<view><text class="color-999999 u-font-26">未开通会员</text></view>
			</view>
		</view>
		<view class="u-relative banner">
			<view class="u-absolute bg"></view>
			<view class="wrap">
				<u-swiper :list="bannerList" height="366" :effect3d="true" bg-color="rgba(0,0,0,0))" :autoplay="false">
				</u-swiper>
			</view>
		</view>
		<view class="list u-text-center u-padding-left-24 u-padding-right-24">
			<view class="u-relative u-padding-bottom-30">
				<text class="color-E6C393">年度VIP</text>
				<text class="border-bottom"></text>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<u-gap height="44"></u-gap>
			<view class="list-item u-flex u-row-between u-padding-left-26 u-padding-right-36">
				<text class="color-333333 u-font-30">20万以下</text>
				<text class="u-font-40 color-DCBA8C"><text class="u-font-20">￥</text>1500</text>
			</view>
			<u-gap height="20"></u-gap>
			<view class="list-item u-flex u-row-between u-padding-left-26 u-padding-right-36">
				<text class="color-333333 u-font-30">20万-30万</text>
				<text class="u-font-40 color-DCBA8C"><text class="u-font-20">￥</text>1500</text>
			</view>
			<u-gap height="20"></u-gap>
			<view class="list-item u-flex u-row-between u-padding-left-26 u-padding-right-36">
				<text class="color-333333 u-font-30">30万-70万</text>
				<text class="u-font-40 color-DCBA8C"><text class="u-font-20">￥</text>1500</text>
			</view>
			<u-gap height="20"></u-gap>
			<view class="list-item u-flex u-row-between u-padding-left-26 u-padding-right-36">
				<text class="color-333333 u-font-30">70万以上</text>
				<text class="u-font-40 color-DCBA8C"><text class="u-font-20">￥</text>1500</text>
			</view>
		</view>
		<u-gap height="52"></u-gap>
		<u-line color="#F3F4F7"></u-line>
		<view class="u-text-center u-margin-top-25 u-margin-bottom-60">
			<view><checkbox value="cb" checked="true" /><text class="u-font-28 color-999999">我已阅读并同意<text class="color-DCBA8C">《会员服务协议》</text></text></view>
		</view>
		<u-gap height="20" bg-color="#F4F4F4"></u-gap>
		<view class="u-flex u-row-between u-col-center u-padding-left-22 u-padding-right-22 u-padding-top-26 u-padding-bottom-34">
			<view>
				<text class="color-333333 u-font-32 bold">会员中心</text>
			</view>
			<view>
				<text class="color-999999 u-font-26">点击查看全部<text class="color-FF0000">4</text>项特权</text>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="u-flex u-row-center u-col-center u-text-center color-DEBA88 u-font-26">
			<view class="u-flex-3">
				<view class="">
					<u-icon name="home" size="100"></u-icon>
				</view>
				<view class="">
					<text>汽车保养</text>
				</view>
			</view>
			<view class="u-flex-3">
				<view class="">
					<u-icon name="home" size="100"></u-icon>
				</view>
				<view class="">
					<text>汽车保养</text>
				</view>
			</view>
			<view class="u-flex-3">
				<view class="">
					<u-icon name="home" size="100"></u-icon>
				</view>
				<view class="">
					<text>汽车保养</text>
				</view>
			</view>
			<view class="u-flex-3">
				<view class="">
					<u-icon name="home" size="100"></u-icon>
				</view>
				<view class="">
					<text>汽车保养</text>
				</view>
			</view>
		</view>
		<view class="btn-wrap u-padding-left-22 u-padding-right-22">
			<u-button :custom-style="customStyle">开通年度VIP (1500元)</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图
				bannerList: [{
					title: "年度VIP",
					content: "四项权益助你行：汽车保养，汽车维修，事故处理， 道路救援。【详情咨询客服】",
					image: '../../../static/image/vip-bg.png',
				}, {
					image: '../../../static/image/vip-bg.png',
				}, {
					image: '../../../static/image/vip-bg.png',
				}],
				shopList: [],
				// 按钮样式
				customStyle: {
					backgroundColor: '#DEBA88',
					color: '#F4F4F4',
					height: '80rpx',
					lineHeight: '80rpx'
				},
				status: 'loading',
				page: 1
			}
		},
		onLoad() {
			// this.getBannerlist()
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

		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.top {
		height: 160rpx;
		background-color: #3D3C3A;

	}

	.banner {
		height: 250rpx;
		margin-bottom: 160rpx;

		.bg {
			z-index: -1;
			background-color: #3D3C3A;
			height: 80%;
			width: 100%;
			left: 0;
			top: 0;
		}
	}

	.color-E6C393 {
		color: #E6C393;
	}
	.color-DCBA8C {
		color: #DCBA8C;
	}
	.color-DEBA88 {
		color: #DEBA88;
	}
	.color-FF0000 {
		color: #FF0000;
	}
	.list {

		.border-bottom {
			width: 60rpx;
			height: 8rpx;
			background: #DDB88E;
			display: inline-block;
			border-radius: 4rpx;
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
		}

		.list-item {
			border: 1rpx solid #EBCB9C;
			border-radius: 10rpx;
			line-height: 98rpx;
			background: url(../../static/image/vip-list-bg.png);
			background-size: 100% 100%;
			
		}
	}
	
	.btn-wrap {
		border-radius: 10rpx;
		margin: 20rpx auto 20px;
	}
	
	/* #ifdef APP-PLUS || MP-WEIXIN */
	checkbox .wx-checkbox-input {
		width: 30rpx;
		height: 30rpx;
	}
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #DEBA88;
	}
	/* #endif */
</style>
