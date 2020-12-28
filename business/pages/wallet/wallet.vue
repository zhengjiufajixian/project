<template>
	<view>
		<u-gap height="30"></u-gap>
		<view class="bg-linear u-margin-left-30 u-margin-right-30 u-padding-left-42 u-padding-right-36">
			<view class="u-padding-top-32">
				<text class="color-FEFEFE u-font-28">总资产</text>
			</view>
			<view class="u-flex u-col-center u-row-between u-padding-top-6">
				<view class="color-FEFEFE u-font-38">88.00</view>
				<navigator url="../withdraw/withdraw" hover-class="none">
					<view class="color-FFFFFF u-font-32 btn">提现</view>
				</navigator>
			</view>
			<view class="u-flex u-col-center u-row-between color-FEFEFE u-font-24 u-padding-top-40 u-margin-top-40 u-padding-bottom-20">
				<view>可提现： 26.00</view>
				<view>本月已提现： 62.00</view>
			</view>
		</view>
		<view class="u-margin-left-36 u-margin-right-36">
			<view class="u-flex u-margin-top-24">
				<text :class="activeTab?'u-padding-24 active':'u-padding-24'" @click="activeTab=true">收款记录</text>
				<text :class="activeTab?'u-padding-24':'u-padding-24 active'" @click="activeTab=false">提现记录</text>
			</view>
			<navigator url="recordDetail/recordDetail">
				<view class="list-item">
					<view class="u-flex u-col-center u-row-between u-padding-top-24">
						<view>
							<text class="dot u-margin-left-32 u-margin-right-10"></text>
							<text class="u-font-28 color-1672FF">洗车</text>
						</view>
						<view class="u-font-26 color-333333 u-margin-right-22 ">
							+ ￥ 50.00
						</view>
					</view>
					<view class="u-flex u-col-center u-row-between u-margin-top-12 u-margin-left-52 u-margin-right-20 u-padding-bottom-16 u-font-24 color-999999">
						<view>
							<text>2020/02/30</text>
						</view>
						<view                                     >
							收款后余额 ￥ 62.66
						</view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: true
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.bg-linear {
		background: linear-gradient(34deg, #1672FF, #16BAFF);
		border-radius: 20rpx;
	}

	.btn {
		border: 2rpx solid #FFFFFF;
		border-radius: 10rpx;
		padding: 6rpx 10rpx;
	}
	.active {
		color: #1672FF;
	}
	.list-item {
		border-radius: 10rpx;
		box-shadow: 0px 0px 24rpx 0px rgba(200, 159, 206, 0.49);
		.dot {
			display: inline-block;
			width: 7rpx;
			height: 7rpx;
			border-radius: 50%;
			background: #0036FF;
			vertical-align: middle;
		}
	}
</style>
