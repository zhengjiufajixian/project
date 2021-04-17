<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 bg-white">
			<view class="u-flex u-col-center u-row-between line-height-3">
				<view class="">
					<text class="color-8C8C8C u-font-26"><text>订单ID：</text>{{ orderDetail.id}}</text>
				</view>
				<view>
					<text class="color-FFBA09 u-font-26 bold">{{getOrderStatus(orderDetail)}}</text>
				</view>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<view class="u-flex u-col-center u-row-between line-height-3">
				<view class="">
					<text class="color-999999 u-font-26">
						{{$u.timeFormat(new Date(orderDetail.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
					</text>
				</view>
				<view>
					<text class="color-4A4A4A u-font-26">
						合计： <text class="color-FF2828">￥ {{orderDetail.money?orderDetail.money:0}}</text></text>
				</view>
			</view>
		</view>
		<u-gap height="10"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 bg-white">
			<view>
				<text class="color-8C8C8C u-font-26 line-height-3">车辆信息</text>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<view class="u-flex line-height-3 u-font-26" v-if="orderDetail.userName">
				<view class="u-flex-6">
					<text class="color-333333">车主姓名：<text class="color-666666">{{orderDetail.userName}}</text></text>
				</view>
				<view class="u-flex-6">
					<text class="color-333333">车主电话：<text class="color-666666">{{orderDetail.userPhone}}</text></text>
				</view>
			</view>
			<view class="u-flex line-height-3 u-font-26" v-if="orderDetail.userCarNumber">
				<view class="u-flex-6">
					<text class="color-333333">
						车牌号：
						<text class="color-666666">
							{{orderDetail.userCarNumber}}
						</text>
					</text>
				</view>
				<view class="u-flex-6">
					车辆备注：
					<text class="color-666666">
						{{orderDetail.userCarRemark}}
					</text>
				</view>
			</view>
			<view class="u-flex line-height-3 u-font-26" v-if="!orderDetail.userName&&!orderDetail.userCarNumber">
				<text class="color-333333">
					等待客服填写
				</text>
			</view>
		</view>

		<view v-if="orderDetail.remark">
			<u-gap height="10"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 bg-white u-padding-bottom-20">
				<view>
					<text class="color-8C8C8C u-font-26 line-height-3">问题描述</text>
				</view>
				<u-line color="#F3F4F7"></u-line>
				<view class="u-font-24 color-333333">{{orderDetail.remark}}</view>
			</view>
		</view>

		<view v-if="orderDetail.status"
			class="u-flex u-margin-top-40 u-padding-left-28 u-padding-right-28 u-row-between u-col-center u-text-center">
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 cancel-btn" @click="handleCancel"
				v-if="orderDetail.status == 'EXECUTING' ">
				{{orderDetail.workPeople ? '联系' + orderDetail.workPeople : '等待分配' }}
			</view>
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 confirm-btn" @click="handleConfirm"
				v-if="getBtnText()">{{getBtnText()}}
			</view>
		</view>
	</view>
</template>
<script>
	import * as config from '../../../common/config.js'
	export default {
		data() {
			return {
				orderId: '',
				orderDetail: {
					id: '',
					shop: {
						shopName: ''
					},
					commodityPrice: '',
					replyList: []
				},
				value: 0,
				appraise: {},
				fz30: {
					fontSize: '30rpx'
				},
			}
		},
		onShow() {

		},
		onLoad(data) {
			this.orderDetail = JSON.parse(data.data)
		},
		methods: {
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			getOrderDetail(id) {
				this.$u.api.getOrderDetail({
					orderId: id
				}).then(res => {
					let data = JSON.parse(res)
					console.log(data)
					this.orderDetail = data
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
			getBtnText() {
				let val = this.orderDetail
				switch (val.status) {
					case 'INIT':
						if (!val.userName && !val.userCarNumber) {
							return '等待客服填写'
						} else {
							return '去支付'
						}
						break;
					case 'EXECUTING':
						return '联系客服'
						break;
					case 'SUCCESS':
						return '联系客服'
						break;
					case 'FAIL':
						return '联系客服'
						break;
					default:
						break;
				}
			},
			handleCancel() {
				let val = this.orderDetail
				if (val.status == "EXECUTING" && val.workPeoplePhone) {
					this.call(val.workPeoplePhone)
				}
			},
			handleConfirm() {
				let val = this.orderDetail
				let status = 'FAIL'
				if (val.status == "INIT") {
					if (val.userName) {
						uni.navigateTo({
							url: '/subPackages/pay/pay?payType=3&orderId=' + val.id + '&orderMoney=' + val.money
						})
					}
				}
				if (val.status == "EXECUTING" || val.status == "SUCCESS" || val.status == "FAIL") {
					this.call(config.contactPhone)
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

	.btn-wrap {
		width: 80%;
		margin: 100rpx auto;
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
