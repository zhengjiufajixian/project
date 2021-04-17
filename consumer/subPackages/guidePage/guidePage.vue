<template>
	<view>
		<navigator url="/subPackages/guide/guide?type=XC" hover-class="none">
			<view class="wrap2 u-flex u-col-center u-row-between">
				<text>洗车流程</text>
				<u-icon name="arrow-right" size="32"></u-icon>
			</view>
		</navigator>
		<navigator url="/subPackages/guide/guide?type=WX" hover-class="none">
			<view class="wrap2 u-flex u-col-center u-row-between">
				<text>维修保养流程</text>
				<u-icon name="arrow-right" size="32"></u-icon>
			</view>
		</navigator>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onShow() {

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
