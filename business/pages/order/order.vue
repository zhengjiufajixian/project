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
							<navigator :url="'orderDetail/orderDetail?orderId='+item.id" class="order"
								v-for="(item, index) in orderList[listIndex]" :key="index">
								<view class="u-flex u-col-center u-row-between u-padding-bottom-20 u-font-24">
									<view class="color-333333">
										订单ID: <text>{{item.id}}</text>
									</view>
									<view class="color-333333">
										{{getOrderStatus(item)}}
									</view>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view
									class="u-flex u-col-center u-row-between u-padding-top-26 u-padding-bottom-14 u-padding-left-18 u-font-24 bold">
									<view class="u-line-1 color-4A4A4A">
										{{item.commodityName}}
									</view>
									<view class=" color-4a4a4a">
										合计：<text class="color-FF2828 u-font-28 bold">￥{{item.orderMoney}}</text>
									</view>
								</view>
								<view
									class="u-line-1 u-padding-bottom-16 u-padding-left-18 u-padding-right-18 color-333333 u-font-24 bold">
									服务时间：<text
										class="color-666666">{{$u.timeFormat(new Date(item.scheduledTime).getTime(), 'yyyy-mm-dd hh:MM' )}}</text>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between u-margin-top-14">
									<view class="color-999999 u-font-24">
										{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM:ss' )}}
									</view>
									<view class="">
										<u-button size="mini" shape="circle" hover-class="none" :hair-line="false"
											:custom-style="getBtnStyle(item)" @click="getBtnClick(item,index)">
											{{getBtnText(item)}}
										</u-button>
									</view>
								</view>
							</navigator>
							<u-loadmore :status="loadStatus[listIndex]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<u-empty src="/static/image/nodata.png" v-else></u-empty>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '全部',
						value: ""
					},
					// {
					// 	name: '待确认',
					// 	value: "WAIT"
					// },
					{
						name: '服务中',
						value: "EXECUTING"
					},
					{
						name: '已完成',
						value: "SUCCESS"
					},
					{
						name: '已退款',
						value: 'REFUND'
					}
				],
				currentPage: 0,
				current: 0,
				page: [1, 1, 1, 1],
				orderList: [
					[],
					[],
					[],
					[]
				],
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onShow() {
			this.loadStatus = ['loadmore', 'loadmore', 'loadmore', 'loadmore']
			this.page = [1, 1, 1, 1]
			this.orderList = [
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
					case 'WAITCONFIRM':
						return '待接单'
						break;
					case 'PAYOFF':
						return '待支付'
						break;
					case 'EXECUTING':
						return '服务中'
						break;
					case 'SUCCESS':
						return '已完成'
						break;
					case 'REFUND':
						return '已退款'
						break;
					default:
						return ''
						break;
				}
			},
			getBtnText(val) {
				switch (val.orderStatus) {
					case 'WAITCONFIRM':
						return '确认接单'
						break;
					case 'PAYOFF':
						return '待支付'
						break;
					case 'EXECUTING':
						return '确认收款'
						break;
					case 'SUCCESS':
						if (val.refund == 1) {
							return "已申请退款"
						} else {
							return val.evaluate == 0 ? "待评价" : "去回复"
						}
						break;
					case 'REFUND':
						return '已退款'
						break;
					default:
						return ''
						break;
				}
			},
			getBtnStyle(val) {
				switch (val.orderStatus) {
					case 'INIT':
						return {
							color: "#FFBA09",
								borderColor: "#FFBA09"
						}
						break;
					case 'WAITCONFIRM':
						return {
							color: "#FFBA09",
								borderColor: "#FFBA09"
						}
						break;
					case 'PAYOFF':
						return {
							color: "#FFBA09",
								borderColor: "#FFBA09"
						}
						break;
					case 'EXECUTING':
						return {
							color: "#FFBA09",
								borderColor: "#FFBA09"
						}
						break;

					case 'SUCCESS':
						if (val.evaluate == 0) {
							return {
								color: "#FF2828",
								borderColor: "#FF2828"
							}
						} else {
							return {
								color: "#13E3A5",
								borderColor: "#13E3A5"
							}
						}
						break;
					case 'REFUND':
						return {
							color: "#999999",
								borderColor: "#999999"
						}
						break;
					case 'FAIL':
						return {
							color: "#999999",
								borderColor: "#999999"
						}
						break;
					default:
						break;
				}
			},
			getBtnClick(val, index) {
				uni.navigateTo({
					url: '/pages/order/orderDetail/orderDetail?orderId=' + val.id
				})
				return

				let status = "SUCCESS"
				if (val.orderStatus == "EXECUTING") {
					this.$u.api.setOrderStatus({
						orderId: val.id,
						status: status
					}).then(res => {
						if (res) {
							uni.showToast({
								title: '修改成功'
							})
							this.$set(this.orderList[this.currentPage][index], 'orderStatus', status)
						} else {
							uni.showToast({
								icon: "none",
								title: '修改失败，请重试'
							})
						}
					})
				}
				if (val.orderStatus == "SUCCESS") {
					if (val.evaluate == 0) {
						uni.showToast({
							title: '等待用户评价',
							icon: 'none'
						})
					}
					if (val.evaluate == 1) {
						uni.navigateTo({
							url: 'reply/reply?orderId=' + val.id
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
</style>
