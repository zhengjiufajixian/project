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
							<view class="bg-white" v-for="(item,index) in orderList[listIndex]" :key="index">
								<u-gap height="20" bg-color="#f3f4f7"></u-gap>
								<navigator :url="'/subPackages/rescue/orderDetail/orderDetail?data=' + JSON.stringify(item)"
									hover-class="none">
									<view
										class="u-flex u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 u-col-top">
										<view
											class="u-flex-9 u-font-30 color-000000 u-padding-top-10 u-padding-bottom-10">
											订单ID：{{item.id}}
										</view>
										<view
											:class="'u-flex-3 u-text-right u-padding-top-10 u-padding-bottom-10 u-font-30 ' + getBtnStyle(item)">
											{{getOrderStatus(item)}}
										</view>
									</view>
									<view class="u-padding-left-27 u-padding-right-27">
										<u-line></u-line>
									</view>
									<view
										class="u-flex u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-30 u-col-bottom">
										<view class="u-flex-8">
											<text
												class="u-font-30 color-333333">{{item.userCarNumber ? item.userCarNumber : '等待客服填写'}}</text>
											<text
												class="u-font-24 color-AFAFAF u-margin-left-20">{{item.userName ? item.userName :''}}{{item.userPhone? '(' + item.userPhone + ')':''}}</text>
										</view>
										<view class="u-flex-4 u-text-right u-font-24 color-AFAFAF">
											{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
										</view>
									</view>
									<view
										class="u-flex u-padding-left-30 u-padding-right-30 u-padding-bottom-30 u-col-bottom">
										<view class="u-flex-4 u-line-1">
											<text
												class="u-line-1 color-666666 u-font-24">问题描述：{{item.remark? item.remark :'' }}</text>
										</view>
										<view
											class="u-flex-3 u-flex u-col-center color-19C1A3 u-font-24 u-margin-left-56">
											<text class="u-margin-right-6">展开</text>
											<u-icon name="play-right-fill" color="#19c1a3" size="14"></u-icon>
										</view>
										<view class="u-flex-5 u-text-right u-font-24 color-666666">
											<text>合计：</text>
											<text class="color-FF2828">￥</text>
											<text class="u-font-36 color-FF2828">{{item.money? item.money :0}}</text>
										</view>
									</view>
									<view class="u-padding-left-27 u-padding-right-27">
										<u-line></u-line>
									</view>
								</navigator>

								<view
									class="u-flex u-row-between u-padding-top-10 u-padding-bottom-20 u-padding-left-34 u-padding-right-30">
									<view class="u-font-30 color-000000" v-if="item.status == 'INIT'">{{item.money?'等待支付':'等待客服填写'}}</view>
									<view class="u-font-30 color-000000" v-if="item.status == 'EXECUTING'">{{!item.workPeople?'正在分配': item.workPeople + ' 正在路上'}}</view>
									<view class="u-font-30 color-000000" v-if="item.status == 'SUCCESS'">已完成</view>
									<view class="u-font-30 color-000000" v-if="item.status == 'FAIL'"></view>
									<view v-if="item.status == 'INIT'">
										<view class="u-flex u-col-center u-row-center" v-if="!item.money">
											<u-icon name="server-man" size="42" color="#1672ff"></u-icon>
											<view class="u-font-30 color-000000 u-margin-left-10" @click="call(config.contactPhone)">联系客服</view>
										</view>
										<view class="u-flex u-col-center u-row-center" v-else>
											<navigator :url="'/subPackages/pay/pay?payType=3&orderId=' + item.id + '&orderMoney='+ item.money " hover-class="none" class="u-font-30 color-000000 u-margin-left-10">去支付</navigator>
										</view>
									</view>
									<view v-if="item.status == 'EXECUTING'">
										<view class="u-flex u-col-center u-row-center" v-if="item.workPeople">
											<u-image width="42" height="42" src="/static/image/phone2.png" mode="aspectFit">
											</u-image>
											<view class="u-font-30 color-000000 u-margin-left-10" @click="call(item.workPeoplePhone)">致电 {{item.workPeople}}</view>
										</view>
										<view class="u-flex u-col-center u-row-center" v-else>
											<u-icon name="server-man" size="42" color="#1672ff"></u-icon>
											<view class="u-font-30 color-000000 u-margin-left-10" @click="call(config.contactPhone)">联系客服</view>
										</view>
									</view>
									<view v-if="item.status == 'SUCCESS' || item.status == 'FAIL'">
										<view class="u-flex u-col-center u-row-center">
											<u-icon name="server-man" size="42" color="#1672ff"></u-icon>
											<view class="u-font-30 color-000000 u-margin-left-10" @click="call(config.contactPhone)">联系客服</view>
										</view>
									</view>
									<!-- <view v-if="item.status == 'SUCCESS'">
										<navigator class="u-flex u-col-center u-row-center" :url="'/subPackages/order/rate/rate?orderId=' + item.id" hover-class="none">
											<u-image width="42" height="42" src="/static/image/rate.png" mode="aspectFit">
											</u-image>
											<view class="u-font-30 color-000000 u-margin-left-10">前往评价</view>
										</navigator>
									</view> -->
								</view>
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
						value: ""
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
				config: config
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
			getShopDetail(item, func) {
				this.$u.api.getShopDetail({
					shopId: item.shopId
				}).then(res => {
					func(res)
				})
			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
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
				switch (val.status) {
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
				switch (val.status) {
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
						if (val.refund == 0) {
							return val.evaluate == 0 ? "去评价" : "查看评价"
						} else {
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
				switch (val.status) {
					case 'INIT':
						return 'color-FFBA09'
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
					default:
						break;
				}
			},
			getBtnClick(val, index) {
				if (val.status == "INIT") {
					let status = "FAIL"
					this.$u.api.setOrderStatus({
						orderId: val.id,
						status: status
					}).then(res => {
						uni.showToast({
							title: '订单取消成功'
						})
						this.$set(this.orderList[this.currentPage][index], 'status', status)
					})
				}
				if (val.status == "WAITCONFIRM") {
					let status = "FAIL"
					this.$u.api.setOrderStatus({
						orderId: val.id,
						status: status
					}).then(res => {
						uni.showToast({
							title: '订单取消成功'
						})
						this.$set(this.orderList[this.currentPage][index], 'status', status)
					})
				}
				if (val.status == "SUCCESS") {
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
				this.$u.api.getRescueList({
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

<style lang="scss" scoped>
	view,
	text {
		line-height: 1;
	}

	.color-AFAFAF {
		color: #afafaf;
	}

	.color-19C1A3 {
		color: #19c1a3;
	}

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
