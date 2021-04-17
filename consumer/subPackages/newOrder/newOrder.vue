<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#1672ff" ref="tabs" :list="list" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(listItem,listIndex) in list" :key="listIndex">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[listIndex].length>0">
							<view v-for="(item,index) in orderList[listIndex]" :key="index">
								<navigator :url="'/subPackages/booking/bookingDetail/bookingDetail?orderId=' + item.id"
									hover-class="none">
									<view
										class="u-flex u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 u-col-top">
										<view class="u-flex-9 u-line-1">
											<view class="u-font-28 u-line-1 bold">
												店铺名称：{{item.shop.shopName?item.shop.shopName:''}}
											</view>
											<view class="u-font-28 u-padding-top-10 u-padding-bottom-10">订单号：{{item.id}}
											</view>
											<view class="u-font-24 color-999999">
												预约时间：{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
											</view>
										</view>
										<view class="u-flex-3 u-font-30 u-text-right">
											<view :class="'u-padding-bottom-20 u-font-28 ' + getBtnStyle(item)">
												{{getOrderStatus(item)}}
											</view>
											<view>￥ {{item.orderMoney}}元</view>
										</view>
									</view>
								</navigator>
								<view class="u-padding-left-30 u-padding-right-30">
									<u-line></u-line>
								</view>
								<view class="u-flex u-padding-top-10 u-padding-bottom-10">
									<view class="u-flex-7 u-flex u-font-24 u-padding-left-30">
										<view>
											<navigator class="color-1672FF u-padding-top-20 u-padding-right-20 u-padding-bottom-20 "
												:url="'/subPackages/booking/bookingDetail/bookingDetail?orderId=' + item.id"
												hover-class="none">
												订单详情
											</navigator>
										</view>
										<view v-if="item.orderStatus == 'INIT'">
											<navigator
												class="color-999999 u-padding-left-10 u-padding-top-20 u-padding-right-10 u-padding-bottom-20"
												:url="'/subPackages/pay/pay?payType=1&orderId=' + item.id + '&orderMoney=' + item.orderMoney "
												hover-class="none">
												重新支付</navigator>
										</view>
										<view
											class="color-999999 u-padding-left-10 u-padding-top-20 u-padding-right-10 u-padding-bottom-20"
											@click="getBtnClick(item,index)"
											v-if="getBtnText(item)">
											{{getBtnText(item)}}
										</view>
										<view class="color-999999 u-padding-left-10 u-padding-top-20 u-padding-right-10 u-padding-bottom-20"
											v-if="item.orderStatus == 'SUCCESS' && item.refund == 0">
											<navigator :url="'/subPackages/apply_refund/apply_refund?orderId=' + item.id"
												hover-class="none">
												申请退款
											</navigator>
										</view>
										<view class="color-999999 u-padding-left-10 u-padding-top-20 u-padding-right-10 u-padding-bottom-20"
											v-if="item.orderStatus == 'SUCCESS' && item.refund == 1">
											<navigator :url="'/subPackages/apply_refund/detail/detail?orderId=' + item.id"
												hover-class="none">
												查看退款申请
											</navigator>
										</view>
									</view>
									<!-- <view class="u-rela u-margin-left-30 u-padding-right-30">
										<view class="u-flex u-row-center u-col-center color-FF2828 toPay" v-if="item.orderStatus == 'INIT'">
											<navigator :url="'/subPackages/pay/pay?payType=1&orderId=' + item.id + '&orderMoney=' + item.orderMoney " hover-class="none">
												立即支付
											</navigator>
										</view>
										<view class="u-flex u-row-center u-col-center color-FF2828 toPay"
											v-if="item.orderStatus == 'EXECUTING'">订单服务中</view>
										<view class="u-flex u-row-center u-col-center color-FF2828 toPay"
											v-if="item.orderStatus == 'SUCCESS' && item.refund == 0">订单已完成</view>
										<view class="u-flex u-row-center u-col-center color-FF2828 toPay"
											v-if="item.orderStatus == 'SUCCESS' && item.refund == 1">已申请退款</view>
										<view class="u-flex u-row-center u-col-center color-999999 toPay"
											v-if="item.orderStatus == 'REFUND' && item.refund == 1">订单已退款</view>
										<view class="u-flex u-row-center u-col-center color-999999 toPay"
											v-if="item.orderStatus == 'FAIL'">订单已取消</view>
										<view class="u-padding-top-20 u-font-24">请按预约时间前门店服务</view>
										<view class="u-padding-top-20 u-padding-bottom-20 u-font-22 color-999999">
											<u-icon margin-right="20" name="clock" size="20"></u-icon>
											<text>{{$u.timeFormat(new Date(item.scheduledTime).getTime(), 'yyyy-mm-dd hh:MM' )}}</text>
										</view>
									</view> -->
									<view class="u-flex-1 u-flex u-row-center u-col-center">
										<u-icon name="arrow-right-double" color="#e1e1e1" size="30"></u-icon>
									</view>
									<view class="u-flex-4 u-padding-right-30 u-flex u-row-around u-col-center">
										<view class="u-text-center" @click="getShopDetail(item,call)">
											<view class="u-flex u-row-center">
												<u-image width="40" height="40" src="/static/image/phone2.png"
													mode="aspectFit"></u-image>
											</view>
											<view class="u-font-22 color-666666 u-margin-top-10">立即致电</view>

										</view>
										<view class="" @click="getShopDetail(item,navi)">
											<view class="u-flex u-row-center">
												<u-image width="40" height="40" src="/static/image/navi2.png"
													mode="aspectFit"></u-image>
											</view>
											<view class="u-font-22 color-666666 u-margin-top-10">立即前往</view>
										</view>
									</view>
								</view>
								<u-gap height="20" bg-color="#ffffff"></u-gap>
							</view>
							<u-loadmore :status="loadStatus[listIndex]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<u-empty iconSize='360' paddingTop="250" src="/static/image/nodata.png" v-else></u-empty>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import * as config from '../../common/config.js'
	export default {
		data() {
			return {
				list: [{
						name: '全部',
						value: "ALL"
					},
					{
						name: '待支付',
						value: "INIT"
					},
					{
						name: '服务中',
						value: "EXECUTING"
					},
					{
						name: '已完成',
						value: "SUCCESS"
					},
					{
						name: '已取消',
						value: "FAIL"
					}
				],
				currentPage: 0,
				current: 0,
				page: [1, 1, 1, 1, 1],
				orderList: [
					[],
					[],
					[],
					[],
					[]
				],
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onShow() {
			this.loadStatus = ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore']
			this.page = [1, 1, 1, 1, 1]
			this.orderList = [
				[],
				[],
				[],
				[],
				[]
			]
			this.current = 0
			this.currentPage = 0
			this.swiperCurrent = 0
			this.getOrderList()
		},
		methods: {
			getShopDetail(item, func) {
				this.$u.api.getShopDetail({
					shopId: item.shopId
				}).then(res => {
					func(res)
				})
			},
			call(res) {
				uni.makePhoneCall({
					phoneNumber: res.shopPhone
				})
			},
			navi(res) {
				config.tencentMapNavi(res.shopName, res.latitude, res.longitude)
			},
			setPage() {
				uni.navigateTo({
					url: 'publish/publish'
				})
			},
			customStyle() {
				return {}
			},
			getOrderStatus(val) {
				switch (val.orderStatus) {
					case 'INIT':
						return '未支付'
						break;
					case 'WAITCONFIRM':
						return '待接单'
						break;
					case 'EXECUTING':
						return '进行中'
						break;
					case 'SUCCESS':
						return '已完成'
						break;
					case 'FAIL':
						return '已取消'
						break;
					case 'REFUND':
						return '已退款'
						break;
					default:
						break;
				}
			},
			getBtnText(val) {
				switch (val.orderStatus) {
					case 'INIT':
						return '取消订单'
						break;
					case 'WAITCONFIRM':
						return '取消订单'
						break;
					case 'EXECUTING':
						return '等待完成'
						break;
					case 'SUCCESS':
						if(val.refund == 0) {
							return val.evaluate == 0 ? "去评价" : "查看评价"
						}else{
							return ''
						}
						break;
					case 'FAIL':
						return '无效订单'
						break;
					case 'REFUND':
						return '已退款'
						break;
					default:
						break;
				}
			},
			getBtnStyle(val) {
				switch (val.orderStatus) {
					case 'INIT':
						return 'color-FFBA09'
						break;
					case 'WAITCONFIRM':
						return 'color-1672FF'
						break;
					case 'PAYOFF':
						return 'color-1672FF'
						break;
					case 'EXECUTING':
						return 'color-13E3A5'
						break;
					case 'SUCCESS':
						return 'color-FF2828'
						break;
					case 'FAIL':
						return 'color-999999'
						break;
					case 'REFUND':
						return 'color-999999'
						break;
					default:
						break;
				}
			},
			getBtnClick(val, index) {
				if (val.orderStatus == "INIT") {
					let status = "FAIL"
					this.$u.api.setOrderStatus({
						orderId: val.id,
						status: status
					}).then(res => {
						uni.showToast({
							title: '订单取消成功'
						})
						this.$set(this.orderList[this.currentPage][index], 'orderStatus', status)
					})
				}
				if (val.orderStatus == "WAITCONFIRM") {
					let status = "FAIL"
					this.$u.api.setOrderStatus({
						orderId: val.id,
						status: status
					}).then(res => {
						uni.showToast({
							title: '订单取消成功'
						})
						this.$set(this.orderList[this.currentPage][index], 'orderStatus', status)
					})
				}
				if (val.orderStatus == "SUCCESS") {
					if (val.evaluate == 0) {
						uni.navigateTo({
							url: "/subPackages/order/rate/rate?orderId=" + val.id
						})
					} else {
						uni.navigateTo({
							url: "/subPackages/booking/bookingDetail/bookingDetail?orderId=" + val.id
						})
					}
				}
			},
			getOrderList(status) {
				let current = status ? status : this.currentPage
				if (this.loadStatus[current] == 'nomore') {
					return
				}
				this.$u.api.getOrderList({
					page: this.page[current],
					status: this.list[current].value,
					orderType: 'XC'
				}).then(res => {
					if (res.length < 10) {
						this.loadStatus.splice(current, 1, 'nomore')
					} else {
						this.loadStatus.splice(current, 1, 'loadmore')
					}
					let arr = this.orderList[current].concat(res)

					this.orderList.splice(current, 1, arr)
				})
			},
			reachBottom() {
				if (this.loadStatus[this.currentPage] == "nomore") {
					return
				}
				let page = this.page[this.currentPage]
				page++
				this.page.splice(this.currentPage, 1, page)
				this.getOrderList()
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.number;
				});
				return num;
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.currentPage = index
				this.page[this.currentPage] = 1
				this.orderList[this.currentPage] = []
				this.loadStatus[this.currentPage] = 'loadmore'
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.currentPage = current;
				if (this.orderList[current].length == 0) {
					this.getOrderList()
				}
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		background-color: #ffffff;
		box-sizing: border-box;
		padding: 30rpx 30rpx 10rpx 30rpx;
		margin-top: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.btn-wrap {
		position: fixed;
		width: 80%;
		left: 50%;
		bottom: 90rpx;
		transform: translateX(-50%);
	}

	.toPay {
		position: absolute;
		width: 100%;
		height: 100%;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.7);
		z-index: 1;
	}
</style>
