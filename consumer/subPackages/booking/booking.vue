<template>
	<view>
		<view v-if="orderList.length > 0">
			<view v-for="(item,index) in orderList" :key="index">
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
						<view v-if="item.orderStatus == 'PAYOFF'">
							<navigator
								class="color-999999 u-padding-left-10 u-padding-top-20 u-padding-right-10 u-padding-bottom-20"
								:url="'/subPackages/pay/pay?payType=1&orderId=' + item.id + '&orderMoney=' + item.orderMoney "
								hover-class="none">
								立即支付</navigator>
						</view>
						<view
							class="color-999999 u-padding-left-10 u-padding-top-20 u-padding-right-10 u-padding-bottom-20"
							@click="getBtnClick(item,index)"
							v-if="getBtnText(item)">
							{{getBtnText(item)}}
						</view>
						<view
							class="color-999999 u-padding-left-10 u-padding-top-20 u-padding-right-10 u-padding-bottom-20"
							@click="cancelOrder(item)"
							v-if="item.orderStatus == 'INIT' || item.orderStatus == 'WAITCONFIRM'">
							取消订单
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
								<u-image width="40" height="40" src="/static/image/phone2.png" mode="aspectFit">
								</u-image>
							</view>
							<view class="u-font-22 color-666666 u-margin-top-10">立即致电</view>
						</view>
						<view class="" @click="getShopDetail(item,navi)">
							<view class="u-flex u-row-center">
								<u-image width="40" height="40" src="/static/image/navi2.png" mode="aspectFit">
								</u-image>
							</view>
							<view class="u-font-22 color-666666 u-margin-top-10">立即前往</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view>
		<u-empty iconSize='360' paddingTop="250" src="/static/image/nodata.png" v-else></u-empty>
	</view>
</template>

<script>
	import * as config from "../../common/config.js"
	export default {
		data() {
			return {
				page: 0,
				status: 'loading',
				orderList: []
			}
		},
		onShow() {
			this.getOrderList()
		},
		onLoad() {
			// uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.page = 0
			this.orderList = []
			this.status = 'loading'
			this.getOrderList(true)
		},
		methods: {
			getShopDetail(item, func) {
				this.$u.api.getShopDetail({
					shopId: item.shopId
				}).then(res => {
					func(res)
				})
			},
			getOrderStatus(val) {
				switch (val.orderStatus) {
					case 'INIT':
						return val.orderType == 'XC' ? '待确认' : '待接单'
						break;
					case 'WAITCONFIRM':
						return val.orderType == 'XC' ? '待接单' : '待报价'
						break;
					case 'PAYOFF':
						return '待付款'
						break;
					case 'EXECUTING':
						return '进行中'
						break;
					case 'SUCCESS':
						return val.refund == 0 ? '已完成' : '已申请退款'
						break;
					case 'FAIL':
						return '已取消'
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
						return '等待报价'
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
						return ''
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
				
				if (val.orderStatus == "WAITCONFIRM") {
					uni.showToast({
						title: '等待商家报价',
						icon: 'none'
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
			cancelOrder(val) {
				if (val.orderStatus == "INIT") {
					let status = "FAIL"
					this.$u.api.setOrderStatus({
						orderId: val.id,
						status: status
					}).then(res => {
						uni.showToast({
							title: '预约取消成功'
						})
						this.orderList[index].orderStatus = status
					})
				}
			},
			call(res) {
				uni.makePhoneCall({
					phoneNumber: res.shopPhone
				})
			},
			navi(res) {
				config.tencentMapNavi(res.shopName, res.latitude, res.longitude)
			},
			getOrderList(flag) {
				this.page++
				this.$u.api.getOrderList({
					page: this.page,
					status: 'ALL',
					orderType: 'BY'
				}).then(res => {
					if (flag) {
						uni.stopPullDownRefresh();
					}
					if (res.length < 10) {
						this.status = 'nomore'
					}
					this.orderList = this.orderList.concat(res)
				})
			},
			onReachBottom() {
				if (this.status == 'nomore') {
					return
				}
				this.status = 'loading';
				this.getOrderList()
			}
		}
	}
</script>

<style lang="scss">
	.toPay {
		position: absolute;
		width: 100%;
		height: 100%;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.7);
		z-index: 1;
	}
</style>
