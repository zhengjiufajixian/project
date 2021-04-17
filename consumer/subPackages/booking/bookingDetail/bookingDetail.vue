<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-20 bg-white">
			<view class="u-flex u-col-center u-row-between line-height-3">
				<view class="u-flex-9 color-333333 u-font-26 bold u-line-1">
					<view class="u-line-1">
						店铺名称: <text>{{orderDetail.shop.shopName}}</text>
					</view>
				</view>
				<view class="u-flex-3 u-text-right">
					<text class="color-FFBA09 u-font-26 bold">{{getOrderStatus(orderDetail)}}</text>
				</view>
			</view>
			<view class="u-flex u-col-center u-row-between line-height-3">
				<view class="">
					<text class="color-8C8C8C u-font-26">订单ID：{{orderDetail.id}}</text>
				</view>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<view>
				<view class="u-flex u-col-center u-row-between line-height-3"
					v-for="(item,index) in orderDetail.maintainRemark" :key="index">
					<view class="">
						<text class="color-333333 u-font-26">{{item.diyItemName}}</text>
					</view>
					<view>
						<text class="color-FF2828 u-font-26">￥ {{item.diyItemPrice}}</text>
					</view>
				</view>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<view class="u-flex u-col-center u-row-between line-height-3">
				<view class="">
					<text class="color-999999 u-font-26">
						{{$u.timeFormat(new Date(orderDetail.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
					</text>
				</view>
				<view class="u-flex-1 u-text-right">
					<view class="color-4A4A4A u-font-26">
						合计：
						<text class="color-FF2828"
							v-if="orderDetail.orderType == 'XC'">￥{{orderDetail.commodityPrice}}</text>
						<text class="color-FF2828" v-else>￥{{orderDetail.orderMoney}}</text>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="10"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-20 bg-white">
			<view>
				<text class="color-8C8C8C u-font-26 line-height-3">车辆信息</text>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<view class="u-flex line-height-3 u-font-26">
				<view class="u-flex-6" v-show="orderDetail.userPhone">
					<text class="color-333333">车主电话：<text class="color-666666">{{orderDetail.userPhone}}</text></text>
				</view>
				<view class="u-flex-6">
					<text class="color-333333">车牌号：<text class="color-666666">{{orderDetail.carNumber}}</text></text>
				</view>
			</view>
			<view class="u-flex line-height-3 u-font-26">
				<view class="u-flex-6">
					<text class="color-333333">
						服务时间：
						<text class="color-666666">
							{{$u.timeFormat(new Date(orderDetail.scheduledTime).getTime(), 'yyyy-mm-dd' )}}
						</text>
					</text>
				</view>
				<view class="u-flex-6" v-show="orderDetail.carModel">
					<text class="color-333333">车辆类型：<text class="color-666666">{{orderDetail.carModel}}</text></text>
				</view>
			</view>
		</view>

		<view v-if="orderDetail.orderRemark">
			<u-gap height="10"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-20 bg-white">
				<view>
					<text class="color-8C8C8C u-font-26 line-height-3">订单备注</text>
				</view>
				<u-line color="#F3F4F7"></u-line>
				<view class="u-font-20 color-333333">{{orderDetail.orderRemark}}</view>
			</view>
		</view>

		<view v-if="orderDetail.orderStatus == 'SUCCESS' && orderDetail.evaluate == 1">
			<u-gap height="10"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-20 bg-white">
				<view>
					<text class="color-8C8C8C u-font-26 line-height-3">我的评价</text>
				</view>
				<u-line color="#F3F4F7"></u-line>
				<view class="u-flex u-font-20 u-col-top u-margin-top-15">
					<text class="color-333333">给出的评分 :</text>
					<view class="u-flex-1">
						<u-rate v-model="appraise.star" :disabled="true"></u-rate>
					</view>
				</view>
				<view class="u-flex u-font-20 u-col-top u-margin-top-15">
					<text class="color-333333">给出的评价 :</text>
					<text class="u-flex-1">{{appraise.remark}}</text>
				</view>
				<view class="u-flex u-font-20 u-col-top u-padding-left-50 u-margin-left-50 u-margin-top-15">
					<view class="u-margin-right-12" v-for="(item,index) in appraise.img" :key="index"
						@click="previewImage(item,appraise.img)">
						<u-image class="u-margin-right-12" :src="item" width="70" height="70"></u-image>
					</view>
				</view>
			</view>
			<view v-for="(item,index) in orderDetail.replyList" :key="index">
				<u-gap height="10"></u-gap>
				<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-20 bg-white">
					<view>
						<text
							class="color-8C8C8C u-font-26 line-height-3">{{item.role == "merchant" ? "商家回复" : "我的回复"}}</text>
					</view>
					<u-line color="#F3F4F7"></u-line>
					<view class="u-flex u-font-20 u-col-top u-margin-top-15">
						<text class="color-333333">给出的回复 :</text>
						<text class="u-flex-1">{{item.remark}}</text>
					</view>
					<view class="u-flex u-font-20 u-col-top u-padding-left-50 u-margin-left-50 u-margin-top-15"
						v-if="item.img">
						<view class="u-margin-right-12" v-for="(replyItem,replyIndex) in item.img" :key="replyIndex"
							@click="previewImage(replyItem,item.img)">
							<u-image :src="replyItem" width="70" height="70"></u-image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="orderDetail.orderStatus"
			class="u-flex u-margin-top-40 u-padding-left-28 u-padding-right-28 u-row-between u-col-center u-text-center">
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 cancel-btn" @click="handleCancel"
				v-if="orderDetail.orderStatus == 'INIT'">
				取消订单</view>
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 cancel-btn" @click="handleCancel"
				v-if="orderDetail.orderStatus == 'WAITCONFIRM'">
				取消订单</view>
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 cancel-btn" @click="handleCancel"
				v-if="orderDetail.orderStatus == 'SUCCESS' && orderDetail.refund == 0 ">
				申请退款</view>
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 cancel-btn" @click="handleCancel"
				v-if="orderDetail.orderStatus == 'SUCCESS' && orderDetail.refund == 1 ">
				查看退款申请</view>
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 cancel-btn" @click="handleCancel"
				v-if="orderDetail.orderStatus == 'REFUND' ">
				已退款</view>
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 cancel-btn" @click="handleCancel"
				v-if="orderDetail.orderStatus == 'FAIL' ">
				已取消</view>
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 confirm-btn" @click="handleConfirm"
				v-if="getBtnText()">{{getBtnText()}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderDetail: {
					id: '',
					shop: {
						shopName: ''
					},
					orderStatus: '',
					commodityPrice: '',
					orderMoney: '',
					replyList: []
				},
				orderId: '',
				value: 0,
				appraise: {},
				fz30: {
					fontSize: '30rpx'
				},
			}
		},
		onShow() {
			this.getOrderDetail()
		},
		onLoad(data) {
			this.orderId = data.orderId
		},
		methods: {
			handleCancel() {
				let val = this.orderDetail
				console.log(val);
				if (val.orderStatus == "INIT" || val.orderStatus == "WAITCONFIRM") {
					let status = 'FAIL'
					this.$u.api.setOrderStatus({
						orderId: val.id,
						status: status
					}).then(res => {
						uni.showToast({
							title: '订单取消成功',
						})
						let _this = this
						setTimeout(function(){
							_this.getOrderDetail()
						},1500)
					})
				}
				if (val.orderStatus == "SUCCESS" && val.refund == 0) {
					uni.navigateTo({
						url: '/subPackages/apply_refund/apply_refund?orderId=' + val.id
					})
				}
				if (val.orderStatus == "SUCCESS" && val.refund == 1) {
					uni.navigateTo({
						url: '/subPackages/apply_refund/detail/detail?orderId=' + val.id
					})
				}
			},
			getOrderDetail() {
				this.$u.api.getOrderDetail({
					orderId: this.orderId
				}).then(res => {
					let data = JSON.parse(res)
					console.log(data)
					this.orderDetail = data
					this.appraise = data.appraise
					if (data.maintainRemark) {
						data.maintainRemark = JSON.parse(data.maintainRemark)
					}
					if (data.appraise && data.appraise.img) {
						this.appraise.img = JSON.parse(data.appraise.img)
					}
					if (data.replyList) {
						for (var i = 0; i < data.replyList.length; i++) {
							if (data.replyList[i].img) {
								data.replyList[i].img = JSON.parse(data.replyList[i].img)
							}
						}
					}
					this.orderDetail = data
				})
			},
			previewImage(current, imgs) {
				wx.previewImage({
					current: current,
					urls: imgs
				})
			},
			getOrderStatus() {
				let val = this.orderDetail
				switch (val.orderStatus) {
					case 'INIT':
						return val.orderType == 'XC' ? '未支付' : '待接单'
						break;
					case 'WAITCONFIRM':
						return val.orderType == 'XC' ? '待接单' : '待报价'
						break;
					case 'PAYOFF':
						return '待支付'
						break;
					case 'EXECUTING':
						return '进行中'
						break;
					case 'SUCCESS':
						return val.refund == 0 ? '已完成' : '已申请退款'
						break;
					case 'REFUND':
						return '已退款'
						break;
					case 'FAIL':
						return '已取消'
						break;
					default:
						break;
				}
			},
			getBtnText() {
				let val = this.orderDetail
				switch (val.orderStatus) {
					case 'INIT':
						return val.orderType == 'XC' ? '去支付' : '待接单'
						break;
					case 'WAITCONFIRM':
						return val.orderType == 'XC' ? '待接单' : '待报价'
						break;
					case 'PAYOFF':
						return '去支付'
						break;
					case 'EXECUTING':
						return '等待商家完成'
						break;
					case 'SUCCESS':
						if (val.refund == 0) {
							return val.evaluate == 0 ? "去评价" : "已完成"
						} else {
							return ''
						}
						break;
					default:
						return ''
						break;
				}
			},
			handleConfirm() {
				let val = this.orderDetail
				// 洗车订单
				if (val.orderType == 'XC') {
					if (val.orderStatus == "INIT") {
						uni.navigateTo({
							url: '/subPackages/pay/pay?payType=2&orderId=' + val.id + '&orderMoney=' + val
								.orderMoney
						})
					}
					if (val.orderStatus == "WAITCONFIRM") {
						uni.showToast({
							title: '等待商家接单',
							icon: "none"
						})
					}

					if (val.orderStatus == "EXECUTING") {
						uni.showToast({
							title: '等待商家确认完成',
							icon: "none"
						})
					}
					if (val.orderStatus == "SUCCESS") {
						if (val.evaluate == 0) {
							uni.navigateTo({
								url: "/subPackages/order/rate/rate?orderId=" + val.id
							})
						}
					}
					if (val.orderStatus == "REFUND") {
						uni.showToast({
							title: '该订单已退款',
							icon: "none"
						})
					}
				} else {
					// 维修保养
					if (val.orderStatus == "INIT") {
						uni.showToast({
							title: '等待商家接单',
							icon: "none"
						})
					}
					if (val.orderStatus == "WAITCONFIRM") {
						uni.showToast({
							title: '等待商家报价',
							icon: "none"
						})
					}
					if (val.orderStatus == "PAYOFF") {
						uni.navigateTo({
							url: '/subPackages/pay/pay?payType=1&orderId=' + val.id + '&orderMoney=' + val
								.orderMoney
						})
					}
					if (val.orderStatus == "EXECUTING") {
						uni.showToast({
							title: '等待商家确认完成',
							icon: "none"
						})
					}
					if (val.orderStatus == "SUCCESS") {
						if (val.evaluate == 0) {
							uni.navigateTo({
								url: "/subPackages/order/rate/rate?orderId=" + val.id
							})
						}
					}
					if (val.orderStatus == "REFUND") {
						uni.showToast({
							title: '该订单已退款',
							icon: "none"
						})
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.btn {
		border-radius: 45rpx;
		background: #1672ff;
		color: #fff;
		line-height: 2.5;
		width: 45%;
		margin: 0 auto;
	}

	.line-height-3 {
		line-height: 3;
	}

	.confirm-btn,
	.cancel-btn {
		line-height: 80rpx;
		font-size: 30rpx;
		border-radius: 100rpx;
	}

	.cancel-btn {
		color: #FFFFFF;
		background-color: #d3d3d3;
	}

	.confirm-btn {
		color: #FFFFFF;
		background-color: #1672ff;
		box-shadow: 0px 3rpx 28rpx 2rpx rgba(22, 114, 255, 0.09);
	}
</style>
