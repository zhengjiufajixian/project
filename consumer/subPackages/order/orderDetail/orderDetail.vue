<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 bg-white">
			<view class="color-333333 u-font-26 u-padding-top-20">
				<text class="bold">店铺名称: </text><text>{{orderDetail.shop.shopName}}</text>
			</view>
			<view class="u-flex u-col-center u-row-between line-height-3">
				<view class="">
					<text class="color-8C8C8C u-font-26"><text>订单ID：</text>{{ orderDetail.id}}</text>
				</view>
				<view>
					<text class="color-FFBA09 u-font-26 bold">{{getOrderStatus(orderDetail)}}</text>
				</view>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<view>
				<view class="u-flex u-col-center u-row-between line-height-3" v-for="(item,index) in orderDetail.commodity" :key="index">
					<view class="">
						<text class="color-333333 u-font-26">{{item.commodityName}}</text>
					</view>
					<view>
						<text class="color-FF2828 u-font-26">￥ {{item.commodityPrice}}</text>
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
				<view>
					<text class="color-4A4A4A u-font-26">合计： <text class="color-FF2828">￥ {{orderDetail.commodityPrice}}</text></text>
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
			<view class="u-padding-left-30 u-padding-right-30 bg-white">
				<view>
					<text class="color-8C8C8C u-font-26 line-height-3">订单备注</text>
				</view>
				<u-line color="#F3F4F7"></u-line>
				<view class="u-font-24 color-333333">{{orderDetail.orderRemark}}</view>
			</view>
		</view>
		
		<view v-if="orderDetail.orderStatus == 'SUCCESS' && orderDetail.evaluate == 1">
			<u-gap height="10"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 bg-white">
				<view>
					<text class="color-8C8C8C u-font-26 line-height-3">我的评价</text>
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
					<view class="u-margin-right-12" v-for="(item,index) in appraise.img" :key="index" @click="previewImage(item,appraise.img)">
						<u-image class="u-margin-right-12" :src="item" width="70" height="70"></u-image>
					</view>
				</view>
			</view>
			<view v-for="(item,index) in orderDetail.replyList" :key="index">
				<u-gap height="10"></u-gap>
				<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-20 bg-white">
					<view>
						<text class="color-8C8C8C u-font-26 line-height-3">{{item.role == "merchant" ? "商家回复" : "我的回复"}}</text>
					</view>
					<u-line color="#F3F4F7"></u-line>
					<view class="u-flex u-font-24 u-col-top u-margin-top-15">
						<text class="color-333333">给出的回复 :</text>
						<text class="u-flex-1">{{item.remark}}</text>
					</view>
					<view class="u-flex u-font-24 u-col-top u-padding-left-80 u-margin-left-50 u-margin-top-15" v-if="item.img">
						<view class="u-margin-right-12" v-for="(replyItem,replyIndex) in item.img" :key="replyIndex" @click="previewImage(replyItem,item.img)">
							<u-image :src="replyItem" width="70" height="70"></u-image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="btn-wrap">
			<u-button :custom-style="fz30" type="primary" shape="circle" @click="getBtnClick">{{getBtnText()}}</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:'',
				orderDetail: {
					id:'',
					shop:{
						shopName:''
					},
					commodityPrice:'',
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
			this.getOrderDetail(this.orderId)
		},
		onLoad(data) {
			this.orderId = data.orderId
		},
		methods: {
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
			getBtnText() {
				let val = this.orderDetail
				switch (val.orderStatus) {
					case 'INIT':
						return '取消订单'
						break;
					case 'EXECUTING':
						return '待确认'
						break;
					case 'SUCCESS':
						return val.evaluate == 0 ? "去评价" : "已完成"
						break;
					case 'FAIL':
						return '已取消'
						break;
					default:
						break;
				}
			},
			getBtnClick() {
				let val = this.orderDetail
				let status = 'FAIL'
				if (val.orderStatus == "INIT") {
					this.$u.api.setOrderStatus({
						orderId: val.id,
						status: status
					}).then(res => {
						uni.showToast({
							title: '取消成功'
						})
						this.orderDetail.orderStatus = status
					})
				}
				if (val.orderStatus == "EXECUTING") {
					uni.showToast({
						title: '等待商家确认',
						icon: "none"
					})
				}
				if (val.orderStatus == "SUCCESS") {
					if (val.evaluate == 0) {
						uni.navigateTo({
							url:'../rate/rate?orderId=' + val.id
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

	.btn-wrap {
		width: 80%;
		margin: 100rpx auto;
	}
</style>
