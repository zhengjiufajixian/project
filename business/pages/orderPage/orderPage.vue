<template>
	<view>
		<navigator url="/pages/order/order" hover-class="none">
			<view class="wrap2 u-flex u-col-center u-row-between">
				<text>洗车订单</text>
				<u-icon name="arrow-right" size="32"></u-icon>
			</view>
		</navigator>
		<navigator url="/subPackages/bookingOrder/bookingOrder" hover-class="none">
			<view class="wrap2 u-flex u-col-center u-row-between">
				<text>维修保养</text>
				<u-icon name="arrow-right" size="32"></u-icon>
			</view>
		</navigator>
		
		<u-modal v-model="modalStatus" content="需要登录之后才能使用全部功能." :show-title="false" confirm-text='去登录'
			@confirm="handleConfirm"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalStatus: true
			}
		},
		onShow() {
			this.modalStatus = !uni.getStorageSync('token')
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.list-item {
		background-color: #1672FF;
		color: #FFFFFF;
		font-size: 26rpx;
		padding: 20rpx 40rpx;
		border-radius: 50rpx;
		text-align: center;
	}

	.wrap2 {
		background-color: #fff;
		margin: 18rpx 30rpx 0;
		padding: 25rpx 0 22rpx 0;
		border-radius: 15rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		color: #666;
	}
</style>
