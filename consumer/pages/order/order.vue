<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#1672ff" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[0].length>0">
							<navigator :url="'orderDetail/orderDetail?orderId='+item.id" class="order" v-for="(item, index) in orderList[0]"
							 :key="index">
								<view class="u-flex u-col-center u-row-between u-padding-bottom-20 u-font-24">
									<view class="color-333333">
										订单ID: <text>{{item.id}}</text>
									</view>
									<view class="color-FFBA09">
										{{getOrderStatus(item)}}
									</view>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between u-padding-top-26 u-padding-bottom-14 u-padding-left-18 u-padding-right-18 u-font-24 bold">
									<view class="u-line-1 color-4A4A4A">
										{{item.commodityName}}
									</view>
									<view class=" color-4a4a4a">
										合计：<text class="color-FF2828 u-font-28 bold">￥{{item.orderMoney}}</text>
									</view>
								</view>
								<view class="u-line-1 u-padding-bottom-16 u-padding-left-18 u-padding-right-18 color-333333 u-font-24 bold">
									服务时间：<text class="color-666666">{{$u.timeFormat(new Date(item.scheduledTime).getTime(), 'yyyy-mm-dd hh:MM' )}}</text>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between u-margin-top-14">
									<view class="color-999999 u-font-24">
										{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM:ss' )}}
									</view>
									<view class="">
										<u-button size="mini" shape="circle" hover-class="none" :hair-line="false" :custom-style="getBtnStyle(item)"
										 @click="getBtnClick(item)">{{getBtnText(item)}}</u-button>
									</view>
								</view>
							</navigator>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2" margin-top="50" margin-bottom="50"></u-loadmore>
						</view>
						<u-empty text="没有相关订单" mode="list" v-else></u-empty>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[1].length>0">
							<navigator :url="'orderDetail/orderDetail?orderId='+item.id" class="order" v-for="(item, index) in orderList[1]"
							 :key="index">
								<view class="u-flex u-col-center u-row-between u-padding-bottom-20 u-font-24">
									<view class="color-333333">
										订单ID: <text>{{item.id}}</text>
									</view>
									<view class="color-FFBA09">
										{{getOrderStatus(item)}}
									</view>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between u-padding-top-26 u-padding-bottom-14 u-padding-left-18 u-padding-right-18 u-font-24 bold">
									<view class="u-line-1 color-4A4A4A">
										{{item.commodityName}}
									</view>
									<view class=" color-4a4a4a">
										合计：<text class="color-FF2828 u-font-28 bold">￥{{item.orderMoney}}</text>
									</view>
								</view>
								<view class="u-line-1 u-padding-bottom-16 u-padding-left-18 u-padding-right-18 color-333333 u-font-24 bold">
									服务时间：<text class="color-666666">{{$u.timeFormat(new Date(item.scheduledTime).getTime(), 'yyyy-mm-dd hh:MM' )}}</text>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between u-margin-top-14">
									<view class="color-999999 u-font-24">
										{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM:ss' )}}
									</view>
									<view class="">
										<u-button size="mini" shape="circle" hover-class="none" :hair-line="false" :custom-style="getBtnStyle(item)"
										 @click="getBtnClick(item)">{{getBtnText(item)}}</u-button>
									</view>
								</view>
							</navigator>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2" margin-top="50" margin-bottom="50"></u-loadmore>
						</view>
						<u-empty text="没有相关订单" mode="list" v-else></u-empty>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box" v-if="orderList[2].length>0">
							<navigator :url="'orderDetail/orderDetail?orderId='+item.id" class="order" v-for="(item, index) in orderList[1]"
							 :key="index">
								<view class="u-flex u-col-center u-row-between u-padding-bottom-20 u-font-24">
									<view class="color-333333">
										订单ID: <text>{{item.id}}</text>
									</view>
									<view class="color-FFBA09">
										{{getOrderStatus(item)}}
									</view>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between u-padding-top-26 u-padding-bottom-14 u-padding-left-18 u-padding-right-18 u-font-24 bold">
									<view class="u-line-1 color-4A4A4A">
										{{item.commodityName}}
									</view>
									<view class=" color-4a4a4a">
										合计：<text class="color-FF2828 u-font-28 bold">￥{{item.orderMoney}}</text>
									</view>
								</view>
								<view class="u-line-1 u-padding-bottom-16 u-padding-left-18 u-padding-right-18 color-333333 u-font-24 bold">
									服务时间：<text class="color-666666">{{$u.timeFormat(new Date(item.scheduledTime).getTime(), 'yyyy-mm-dd hh:MM' )}}</text>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between u-margin-top-14">
									<view class="color-999999 u-font-24">
										{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM:ss' )}}
									</view>
									<view class="">
										<u-button size="mini" shape="circle" hover-class="none" :hair-line="false" :custom-style="getBtnStyle(item)"
										 @click="getBtnClick(item)">{{getBtnText(item)}}</u-button>
									</view>
								</view>
							</navigator>
							<u-loadmore :status="loadStatus[2]" bgColor="#f2f2f2" margin-top="50" margin-bottom="50"></u-loadmore>
						</view>
						<u-empty text="没有相关订单" mode="list" v-else></u-empty>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[1].length>0">
							<navigator :url="'orderDetail/orderDetail?orderId='+item.id" class="order" v-for="(item, index) in orderList[3]"
							 :key="index">
								<view class="u-flex u-col-center u-row-between u-padding-bottom-20 u-font-24">
									<view class="color-333333">
										订单ID: <text>{{item.id}}</text>
									</view>
									<view class="color-FFBA09">
										{{getOrderStatus(item)}}
									</view>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between u-padding-top-26 u-padding-bottom-14 u-padding-left-18 u-padding-right-18 u-font-24 bold">
									<view class="u-line-1 color-4A4A4A">
										{{item.commodityName}}
									</view>
									<view class=" color-4a4a4a">
										合计：<text class="color-FF2828 u-font-28 bold">￥{{item.orderMoney}}</text>
									</view>
								</view>
								<view class="u-line-1 u-padding-bottom-16 u-padding-left-18 u-padding-right-18 color-333333 u-font-24 bold">
									服务时间：<text class="color-666666">{{$u.timeFormat(new Date(item.scheduledTime).getTime(), 'yyyy-mm-dd hh:MM' )}}</text>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between u-margin-top-14">
									<view class="color-999999 u-font-24">
										{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM:ss' )}}
									</view>
									<view class="">
										<u-button size="mini" shape="circle" hover-class="none" :hair-line="false" :custom-style="getBtnStyle(item)"
										 @click="getBtnClick(item)">{{getBtnText(item)}}</u-button>
									</view>
								</view>
							</navigator>
							<u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2" margin-top="50" margin-bottom="50"></u-loadmore>
						</view>
						<u-empty text="没有相关订单" mode="list" v-else></u-empty>
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
						name: '待支付',
						value: "INIT"
					},
					{
						name: '进行中',
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
			this.getOrderList(0)
			this.getOrderList(1)
			this.getOrderList(2)
			this.getOrderList(3)
		},
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
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
					case 'INIT':
						return '未支付'
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
					default:
						break;
				}
			},
			getBtnText(val) {
				switch (val.orderStatus) {
					case 'INIT':
						return '取消订单'
						break;
					case 'EXECUTING':
						return '等待完成'
						break;
					case 'SUCCESS':
						return '去评价'
						break;
					case 'FAIL':
						return '无效订单'
						break;
					default:
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
					case 'EXECUTING':
						return {
							color: "#13E3A5",
							borderColor: "#13E3A5"
						}
						break;
					case 'SUCCESS':
						return {
							color: "#FF2828",
							borderColor: "#FF2828"
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
			getBtnClick(val) {
				console.log(val)
				this.$u.api.setOrderStatus({
					orderId: val.id,
					status: "FAIL"
				}).then(res=>{
					console.log(res)
				})
			},
			getOrderList(status) {
				let current = status ? status : this.currentPage
				if (this.loadStatus[current] == 'nomore') {
					return
				}
				this.$u.api.getOrderList({
					page: this.page[current],
					status: this.list[current].value
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
				this.getOrderList()
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
