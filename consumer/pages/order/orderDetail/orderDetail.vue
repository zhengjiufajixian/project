<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-20 bg-white">
			<view class="u-flex u-col-center u-row-between line-height-3">
				<view class="">
					<text class="color-8C8C8C u-font-26">订单ID：{{orderDetail.id}}</text>
				</view>
				<view>
					<text class="color-FFBA09 u-font-26 bold">{{getOrderStatus(orderDetail)}}</text>
				</view>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<view>
				<view class="u-flex u-col-center u-row-between line-height-3">
					<view class="">
						<text class="color-333333 u-font-26">{{orderDetail.commodityName}}</text>
					</view>
					<view>
						<text class="color-FF2828 u-font-26">￥ </text>
					</view>
				</view>
				<view class="u-flex u-col-center u-row-between line-height-3">
					<view class="">
						<text class="color-333333 u-font-26"></text>
					</view>
					<view>
						<text class="color-FF2828 u-font-26">￥ 15</text>
					</view>
				</view>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<view class="u-flex u-col-center u-row-between line-height-3">
				<view class="">
					<text class="color-999999 u-font-26">2018-03-09 08:24</text>
				</view>
				<view>
					<text class="color-4A4A4A u-font-26">合计： <text class="color-FF2828">￥ 40</text></text>
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
				<view class="u-flex-6">
					<text class="color-333333">车主电话：<text class="color-666666">132-9054-1565</text></text>
				</view>
				<view class="u-flex-6">
					<text class="color-333333">车牌号：<text class="color-666666">鄂E7545J</text></text>
				</view>
			</view>
			<view class="u-flex line-height-3 u-font-26">
				<view class="u-flex-6">
					<text class="color-333333">服务时间：<text class="color-666666">2020.02.02</text></text>
				</view>
				<view class="u-flex-6">
					<text class="color-333333">车辆类型：<text class="color-666666">两厢轿车</text></text>
				</view>
			</view>
		</view>
		<view class="u-flex u-col-center u-text-center u-padding-left-20 u-padding-right-20 u-margin-top-40">
			<view class="btn">
				去评价
			</view>
			<view class="btn">
				去导航
			</view>
		</view>
	</view>
</template>

<script>	
	export default {
		data() {
			return {
				orderDetail: {},
			}
		},
		onLoad(data) {
			this.getOrderDetail(data.orderId)
		},
		methods: {
			getOrderDetail(id) {
				this.$u.api.getOrderDetail({
					orderId: id
				}).then(res => {
					console.log(res)
					this.orderDetail = res
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
</style>
