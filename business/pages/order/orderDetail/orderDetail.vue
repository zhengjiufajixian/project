<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 bg-white">
			<view class="u-flex u-col-center u-row-between line-height-3">
				<view class="">
					<text class="color-8C8C8C u-font-26">订单ID：{{orderDetail.id}}</text>
				</view>
				<view>
					<text class="color-FFBA09 u-font-26 bold">{{getOrderStatus(orderDetail)}}</text>
				</view>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<view v-if="orderDetail.orderType == 'XC'">
				<view class="u-flex u-col-center u-row-between line-height-3"
					v-for="(item,index) in orderDetail.commodity" :key="index">
					<view class="">
						<text class="color-333333 u-font-26">{{item.commodityName}}</text>
					</view>
					<view>
						<text class="color-FF2828 u-font-26">￥ {{item.commodityPrice}}</text>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="u-flex u-col-center u-row-between line-height-3"
					v-for="(item,index) in orderDetail.maintainRemark" :key="index">
					<view class="">
						<text class="color-333333 u-font-26">{{item.diyItemName}}</text>
					</view>
					<view v-if="item.diyItemPrice">
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
						<text class="color-FF2828" v-else>￥ {{orderDetail.orderMoney}}</text>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="10"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 bg-white">
			<view>
				<text class="color-8C8C8C u-font-26 line-height-3">车辆信息</text>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<view class="u-flex line-height-3 u-font-26">
				<view class="u-flex-6" v-show="orderDetail.userPhone">
					<text class="color-333333">
						车主电话：
						<text class="color-666666">{{orderDetail.userPhone}}</text>
					</text>
				</view>
				<view class="u-flex-6">
					<text class="color-333333">车牌号：<text class="color-666666">{{orderDetail.carNumber}}</text></text>
				</view>
			</view>
			<view class="u-flex line-height-3 u-font-26">
				<view class="u-flex-6">
					<text class="color-333333">
						服务时间：
						<text class="color-666666" v-if="orderDetail.scheduledTime">
							{{$u.timeFormat(new Date(orderDetail.scheduledTime).getTime(), 'yyyy-mm-dd' )}}
						</text></text>
				</view>
				<view class="u-flex-6">
					<text class="color-333333" v-show="orderDetail.carModel">车辆类型：<text
							class="color-666666">{{orderDetail.carModel}}</text></text>
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
				<view class="u-font-26 color-333333 u-margin-top-14">{{orderDetail.orderRemark}}</view>
			</view>
		</view>

		<view v-if="appraise">
			<u-gap height="10"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 bg-white">
				<view>
					<text class="color-8C8C8C u-font-26 line-height-3">客户评价</text>
				</view>
				<u-line color="#F3F4F7"></u-line>
				<view class="u-flex u-font-24 u-col-top u-margin-top-15">
					<text class="color-333333">给出的评分 :</text>
					<view class="u-flex-1">
						<u-rate v-model="appraise.star" :disabled="true"></u-rate>
					</view>
				</view>
				<view class="u-flex u-font-24 u-col-top u-margin-top-15">
					<text class="color-333333">给出的评价 :</text>
					<text class="u-flex-1">{{appraise.remark}}</text>
				</view>
				<view class="u-flex u-font-24 u-col-top u-padding-left-80 u-margin-left-50 u-margin-top-15">
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
							class="color-8C8C8C u-font-26 line-height-3">{{item.role == "merchant" ? "我的回复" : "客户的回复"}}</text>
					</view>
					<u-line color="#F3F4F7"></u-line>
					<view class="u-flex u-font-24 u-col-top u-margin-top-15">
						<text class="color-333333">给出的回复 :</text>
						<text class="u-flex-1">{{item.remark}}</text>
					</view>
					<view class="u-flex u-font-24 u-col-top u-padding-left-80 u-margin-left-50 u-margin-top-15"
						v-if="item.img">
						<view class="u-margin-right-12" v-for="(replyItem,replyIndex) in item.img" :key="replyIndex"
							@click="previewImage(replyItem,item.img)">
							<u-image :src="replyItem" width="70" height="70"></u-image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<movable-area
			v-if="orderDetail.orderStatus != 'INIT' && orderDetail.orderStatus != 'WAITCONFIRM' && orderDetail.orderStatus != 'PAYOFF'">
			<movable-view direction="vertical" y="100">
				<view class="u-padding-left-30 u-padding-right-40">
					<navigator class="u-flex" :url="'addImage/addImage?data=' + JSON.stringify(orderDetail)"
						hover-class="none">
						<view class="u-font-0">
							<u-image src="/static/image/hand.png" width="34" height="30"></u-image>
						</view>
						<text class="u-font-26 color-384AFF u-margin-left-20">作业跟踪</text>
					</navigator>
				</view>
			</movable-view>
		</movable-area>

		<view v-if="orderDetail.orderStatus"
			class="u-flex u-margin-top-40 u-margin-bottom-40 u-padding-left-28 u-padding-right-28 u-row-between u-col-center u-text-center">
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 cancel-btn" @click="handleCall"
				v-if="orderDetail != 'SUCCESS'  && orderDetail != 'REFUND' ">联系客户</view>
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 confirm-btn" @click="getBtnClick">
				{{getBtnText(orderDetail)}}
			</view>
		</view>

		<u-modal v-model="show" @confirm="confirm" :content="content" confirm-text="确认收款" :show-cancel-button="true"
			:mask-close-able="true"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList1: [],
				imgList2: [],
				orderDetail: {
					orderStatus: '',
					replyList: [],
					commodityPrice: 0,
					orderMoney:0,
					id: '',
				},
				orderId: '',
				value: 0,
				appraise: '',
				fz30: {
					fontSize: '30rpx'
				},
				show: false,
				content: '建议您上传作业图片，再确认收款！'
			}
		},
		onShow() {
			this.getOrderDetail()
		},
		onLoad(data) {
			this.orderId = data.orderId
		},
		methods: {
			handleCall() {
				uni.makePhoneCall({
					phoneNumber: this.orderDetail.userPhone
				})
			},
			confirm() {
				let status = "SUCCESS"
				this.$u.api.setOrderStatus({
					orderId: this.orderDetail.id,
					status: status
				}).then(res => {
					if (res.indexOf('成功')) {
						uni.showToast({
							title: '收款成功'
						})
						let _this = this
						setTimeout(function(){
							_this.getOrderDetail()
						},1500)
					}
				})
			},
			addImgList1(data, index, lists, name) {
				this.imgList1.push(data)
			},
			removeImgList1(index, lists, name) {
				let arr = this.imgList1
				arr.splice(index, 1)
				this.imgList1 = arr
			},
			addImgList2(data, index, lists, name) {
				this.imgList2.push(data)
			},
			removeImgList2(index, lists, name) {
				let arr = this.imgList2
				arr.splice(index, 1)
				this.imgList2 = arr
			},
			getOrderDetail() {
				this.$u.api.getOrderDetail({
					orderId: this.orderId
				}).then(res => {
					let data = JSON.parse(res)
					this.orderDetail = data
					if (data.maintainRemark) {
						this.orderDetail.maintainRemark = JSON.parse(data.maintainRemark)
					}
					if (data.workBeforeImg) {
						this.imgList1 = JSON.parse(data.workBeforeImg)
					}
					if (data.workAfterImg) {
						this.imgList2 = JSON.parse(data.workAfterImg)
					}
					this.appraise = data.appraise
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
			getOrderStatus(val) {
				switch (val.orderStatus) {
					case 'INIT':
						return val.orderType == 'XC' ? '未支付' : '已预约'
						break;
					case 'WAITCONFIRM':
						return val.orderType == 'XC' ? '待确认' : '待完善'
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
			getBtnText() {
				let val = this.orderDetail
				switch (val.orderStatus) {
					case 'INIT':
						return val.orderType == 'XC' ? '' : '确认接单'
						break;
					case 'WAITCONFIRM':
						return val.orderType == 'XC' ? '确认接单' : '完善订单'
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
					case 'FAIL':
						return '已取消'
						break;
					default:
						return ''
						break;
				}
			},
			getBtnClick() {
				let val = this.orderDetail

				if (val.orderType == 'XC') {
					if (val.orderStatus == "WAITCONFIRM") {
						let status = "EXECUTING"
						this.$u.api.setOrderStatus({
							orderId: val.id,
							status: status,
						}).then(res => {
							if (res.indexOf('成功')) {
								uni.showToast({
									title: '接单成功'
								})
								let _this = this
								setTimeout(function(){
									_this.getOrderDetail()
								},1500)
							}
						})
					}
					if (val.orderStatus == "EXECUTING") {
						if (val.workAfterImg && val.workBeforeImg && JSON.parse(val.workAfterImg).length > 0 &&
							JSON.parse(val.workBeforeImg).length > 0) {
							this.confirm()
						} else {
							this.show = true
						}
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
								url: '/pages/order/reply/reply?orderId=' + val.id
							})
						}
					}
					if (val.orderStatus == "FEFUND") {
						uni.showToast({
							title: '订单已退款',
							icon: 'none'
						})
					}
					if (val.orderStatus == "FAIL") {
						uni.showToast({
							title: '订单已取消',
							icon: 'none'
						})
					}
				} else {
					// 维修保养
					if (val.orderStatus == "INIT") {
						let status = "WAITCONFIRM"
						this.$u.api.setOrderStatus({
							orderId: val.id,
							status: status
						}).then(res => {
							console.log(res.indexOf('成功'));
							if (res.indexOf('成功')) {
								uni.showToast({
									title: '接单成功'
								})
								let _this = this
								setTimeout(function(){
									_this.getOrderDetail()
								},1500)
							}
						})
					}

					if (val.orderStatus == "WAITCONFIRM") {
						uni.navigateTo({
							url: '/pages/order/orderDetail/payBookingOrder/payBookingOrder?orderId=' + val.id
						})
					}

					if (val.orderStatus == "PAYOFF") {
						uni.showToast({
							title: '等待客户支付',
							icon: 'none'
						})
					}

					if (val.orderStatus == "EXECUTING") {
						if (val.workAfterImg && val.workBeforeImg && JSON.parse(val.workAfterImg).length > 0 &&
							JSON.parse(val.workBeforeImg).length > 0) {
							this.confirm()
						} else {
							this.show = true
						}

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
								url: '/pages/order/reply/reply?orderId=' + val.id
							})
						}
					}
					if (val.orderStatus == "FAIL") {
						uni.showToast({
							title: '订单已取消',
							icon: 'none'
						})
					}
				}



			},
		}
	}
</script>

<style lang="scss" scoped>
	movable-area {
		position: fixed;
		right: 0;
		top: 0;
		height: 30%;
		width: 240rpx;
		z-index: 100;
	}

	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60rpx;
		width: 100%;
		background-color: rgb(255, 255, 255);
		box-shadow: 0 0 16rpx 1rpx rgba(22, 114, 255, 0.19);
		line-height: 60rpx;
		border-radius: 40rpx 0 0 40rpx;
	}

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

	.btn-wrap {
		width: 80%;
		margin: 100rpx auto;
	}

	.color-384AFF {
		color: #384AFF;
	}

	.u-font-0 {
		font-size: 0;
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
