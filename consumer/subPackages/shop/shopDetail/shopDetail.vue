<template>
	<view>
		<u-swiper :list="list" height="420" @click="showSwiperImg"></u-swiper>
		<view
			class="u-flex bg-white u-margin-left-22 u-margin-right-22 u-padding-left-24 u-padding-top-22 u-padding-bottom-24 border-radius-30 wrap">
			<view class="shop-info-header">
				<view class="u-font-32 bold color-333333 u-line-1">{{shopInfo.shopName}}</view>
				<view class="u-font-26 color-666666 u-padding-top-22 u-line-1">{{shopInfo.shopAddress}}</view>
				<view class="u-flex u-padding-top-40" v-show="shopInfo.time">
					<view class="u-flex u-col-center">
						<u-icon name="clock" size="35" color="#e82822"></u-icon>
						<text class="u-font-22 color-999999">00:00-23:00</text>
					</view>
					<view class="u-flex u-col-center u-margin-left-80">
						<u-icon name="map" size="35" color="#e82822"></u-icon>
						<text class="u-font-22 color-999999">{{getDistance()}}</text>
					</view>
				</view>
			</view>
			<view class="u-flex-4 u-flex u-text-center u-col-center u-row-around u-padding-left-40 u-padding-right-40 ">
				<view class="u-margin-right-36">
					<navigator url="../../contact/contact" hover-class="none">
						<view class="box-shadow">
							<u-image width="70" height="70" src="/static/image/kefu.png" mode="aspectFit"></u-image>
						</view>
						<text class="u-font-26 color-666666 u-margin-top-18">客服</text>
					</navigator>
				</view>
				<view class="" @click="navi">
					<view class="box-shadow">
						<u-image width="70" height="70" src="/static/image/navi.png" mode="aspectFit"></u-image>
					</view>
					<text class="u-font-26 color-666666 u-margin-top-18">导航</text>
				</view>
			</view>
		</view>
		<view class="u-flex u-row-right u-relative">
			<view class="help-btn u-padding-left-30 u-padding-right-40">
				<navigator class="u-flex" url="/subPackages/guidePage/guidePage" hover-class="none">
					<u-image class="img" src='/subPackages/static/image/light.png' height="40" width="40" mode="aspectFit"></u-image>
					<text class="u-font-24 color-384AFF u-margin-left-20">下单帮助</text>
				</navigator>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view
			class="bg-white u-margin-left-22 u-margin-right-22 border-radius-30 u-margin-bottom-20 u-padding-bottom-50">
			<view class="u-flex list-header">
				<view
					:class="'u-flex-6 u-text-center u-padding-top-28 u-padding-bottom-22' + (active=='commodity'?' active':'')"
					@click="changeTab('commodity')">所有服务</view>
				<view
					:class="'u-flex-6 u-text-center u-padding-top-28 u-padding-bottom-22' + (active=='comment'?' active':'')"
					@click="changeTab('comment')">车主点评</view>
			</view>
			<view class="fixed-btn" @click="handleClick">
				<u-image width="80" height="80" src="/static/image/yue.png" mode="aspectFit"></u-image>
			</view>
			<view class="u-margin-left-20 u-margin-right-20" v-if="active=='commodity'">
				<view v-if="shopInfo.commodityInfo.length>0">
					<view v-for="(item,index) in commodityList" :key="index">

						<view class="color-1672FF u-font-28 u-padding-top-30 bold" v-if="item.commodityList.length>0">
							<view class="u-margin-right-18 line"></view>
							{{item.typeName}}
						</view>

						<view v-for="(ele,i) in item.commodityList" :key="i" class="u-flex u-col-top u-margin-top-25">
							<view @click="previewImage(ele.commodityImg[0],ele.commodityImg)">
								<u-image :src="ele.commodityImg[0]" width="150" height="150"></u-image>
							</view>
							<view class="u-margin-left-20 u-flex-1">
								<view class="color-333333 u-font-30 bold line-height-1">{{ele.commodityName}}</view>
								<view style="min-height: 60rpx;">
									<view class="color-666666 u-font-24 u-line-2 line-height-30 u-margin-top-15">
										{{ele.commodityRemark}}
									</view>
								</view>
								<view class="color-FF2828 u-font-32 line-height-1 u-margin-top-15"><text
										class="u-font-24">￥</text>
									{{ele.commodityPrice}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-empty iconSize='360' paddingTop="160" src="/static/image/nodata.png" v-else></u-empty>
			</view>
			<view class="u-margin-left-20 u-margin-right-20" v-if="active=='comment'">
				<view v-if="appraiseList.length>0">
					<view class="u-flex u-col-top u-margin-top-40" v-for="(item,index) in appraiseList" :key="index">
						<view class="u-padding-right-40">
							<u-avatar :src="item.anonymous == 1 ? '' : item.userHeadImg" size="98"></u-avatar>
							<view class="color-444444 u-font-24 u-line-1 u-text-center" style="width: 98rpx;">
								{{item.anonymous == 1 ? '匿名用户' : item.userName}}
							</view>
						</view>
						<view>
							<!-- <view class="color-333333 u-font-26">精品手工蜡（08:00--12：00）</view> -->
							<u-read-more ref="uReadMore" :toggle="true" show-height="55" text-indent="0"
								:shadow-style="shadowStyle" close-text="查看全部" color="#ffba09" font-size="24">
								<view class="color-666666 u-font-24">
									{{item.remark}}
								</view>
							</u-read-more>
							<view class="color-999999 u-font-24 u-padding-bottom-20">
								评分：<u-rate v-model="item.orderRating" disabled="true"></u-rate>
							</view>
							<view class="u-flex">
								<view class="u-margin-right-12" v-for="(i,k) in item.img" :key="k"
									@click="previewImage(i,item.img)">
									<u-image width="90" height="90" :src="i" mode="aspectFill"></u-image>
								</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="status" />
				</view>
				<u-empty iconSize='360' paddingTop="160" src="/static/image/nodata.png" v-else></u-empty>
			</view>
		</view>


		<u-mask :show="show" @click="show = false">
			<view class="pos-abs-center">
				<view class="close-wrap">
					<u-image src="/static/image/close.png" mode="aspectFit" width="100%" height="60"></u-image>
				</view>
				<view class="u-font-26 color-333333 bg-white">
					<view v-if="shopInfo.isXc == 1">
						<navigator :url="'/subPackages/washCar/washCar?data=' + JSON.stringify(shopInfo) "
							hover-class="none">
							<view class="u-padding-left-38 u-padding-right-38 u-padding-top-30 u-padding-bottom-30">
								洗车预约
							</view>
						</navigator>
					</view>
					<view v-if="shopInfo.isBy == 1">
						<navigator
							:url="'/subPackages/maintenance/maintenance?data=' + JSON.stringify(shopInfo) + '&isBy=1' "
							hover-class="none">
							<view
								class="u-padding-left-38 u-padding-right-38 u-padding-top-30 u-padding-bottom-30 u-border-top u-border-bottom">
								保养预约
							</view>
						</navigator>
					</view>
					<view v-if="shopInfo.isWx == 1">
						<navigator
							:url="'/subPackages/maintenance/maintenance?data=' + JSON.stringify(shopInfo) + '&isWx=1'"
							hover-class="none">
							<view class="u-padding-left-38 u-padding-right-38 u-padding-top-30 u-padding-bottom-30">
								维修预约
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import * as config from "../../../common/config.js"
	export default {
		data() {
			return {
				list: [],
				img: ['https://cdn.uviewui.com/uview/swiper/1.jpg',
					'https://cdn.uviewui.com/uview/swiper/2.jpg',
					'https://cdn.uviewui.com/uview/swiper/3.jpg'
				],
				content: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
				shadowStyle: {
					backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
					paddingTop: "115rpx",
					marginTop: "-115rpx"
				},
				value: 5,
				shopInfo: {
					commodityInfo:[]
				},
				commodityList: [],
				active: "commodity", // commodity,comment
				status: 'loading',
				page: 0,
				appraiseList: [],
				show: false,
				isWx: 0,
				isBy: 0
			}
		},
		onLoad(params) {
			this.shopId = params.shopId
			this.isBy = params.isBy ? 1 : 0
			this.isWx = params.isWx ? 1 : 0
			this.getShopDetail()
		},
		methods: {
			handleClick() {
				if (uni.getStorageSync('token')) {
					this.show = true
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			showModal() {
				this.show = true
			},
			changeTab(activeTab) {
				this.active = activeTab
				if (this.page == 0) {
					this.getAppraiseList()
				}
			},

			onReachBottom() {
				if (this.status == 'nomore' || this.active != 'comment') {
					return
				}
				this.status = 'loading';
				this.getAppraiseList()
			},
			getDistance() {
				return config.getDistance(this.shopInfo.latitude, this.shopInfo.longitude, uni.getStorageSync("latitude"),
					uni.getStorageSync("longitude"))
			},
			getAppraiseList() {
				this.page++
				this.$u.api.getAppraiseList({
					shopId: this.shopId,
					page: this.page
				}).then(res => {
					if (res.length < 9) {
						this.status = 'nomore'
					}
					for (var i = 0; i < res.length; i++) {
						if (res[i].img) {
							res[i].img = JSON.parse(res[i].img)
						}
					}
					this.appraiseList = this.appraiseList.concat(res)
				}).catch(err => {
					console.log(err);
				})
			},
			getShopDetail() {
				this.$u.api.getShopDetail({
					shopId: this.shopId
				}).then(res => {
					this.shopInfo = res
					this.list = JSON.parse(res.shopImgList)
					let type = res.commodityType
					let info = res.commodityInfo

					for (var i = 0; i < type.length; i++) {
						type[i].commodityList = []
						for (var j = 0; j < info.length; j++) {
							if (info[j].commodityTypeCode == type[i].typeCode) {
								info[j].commodityImg = JSON.parse(info[j].commodityImg)
								type[i].commodityList.push(info[j])
							}
						}
					}
					this.commodityList = type
				})
			},
			showSwiperImg(index) {
				this.previewImage(this.list[index],this.list)
			},
			previewImage(item, urls) {
				wx.previewImage({
					current: item,
					urls: urls
				})
			},
			navi() {
				config.tencentMapNavi(this.shopInfo.shopName, this.shopInfo.latitude, this.shopInfo.longitude)
			}
		}
	}
</script>

<style lang="scss">
	.box-shadow {
		box-shadow: 0 0px 15px 0px #d4d3d3;
		border-radius: 50%;
	}

	.shop-info-header {
		width: 400rpx;
	}

	.wrap {
		position: relative;
		top: -22rpx;
	}

	.list-header {
		.active {
			color: $uni-color-primary;
			background: url('/static/image/active.png') no-repeat;
			background-size: contain;
			background-position: bottom;
			font-weight: bold;
		}
	}

	.fixed-btn {
		position: fixed;
		right: 63rpx;
		z-index: 100;
		margin-top: 30rpx;
	}

	.line {
		display: inline-block;
		width: 5rpx;
		height: 20rpx;
		background-color: $uni-color-primary;
		border-radius: 5rpx;
	}

	.line-height-30 {
		line-height: 30rpx;
	}

	// .bg-line {
	// 	background: url('/static/image/bg-gray-car.png') no-repeat;
	// 	background-size: contain;
	// 	background-position: bottom;
	// }

	.u-swiper-indicator {
		top: 0 !important;
		right: 0 !important;
		flex-direction: column !important;
		height: 100% !important;
		width: auto !important;
	}

	.u-indicator-item-round {
		margin: 4rpx 0 !important;
		background-color: #fff !important;
	}

	.u-indicator-item-round-active {
		width: 14rpx !important;
		background-color: $uni-color-primary !important;
	}
	
	.help-btn {
		position: absolute;
		top: -32rpx;
		width: 240rpx;
		align-items: center;
		justify-content: center;
		height: 60rpx;
		background-color: rgb(255, 255, 255);
		box-shadow: 0 0 16rpx 1rpx rgba(22, 114, 255, 0.19);
		line-height: 60rpx;
		border-radius: 40rpx 0 0 40rpx;
	}
</style>
