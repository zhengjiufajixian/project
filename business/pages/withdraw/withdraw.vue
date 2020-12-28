<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="u-flex u-row-between u-col-center u-padding-top-22 u-padding-right-50 u-padding-bottom-28 u-padding-left-55 bg-white">
			<view class="u-flex">
				<u-icon name="weixin-circle-fill" size="54" color="#2dc100"></u-icon>
				<view class="u-margin-left-18">
					<view class="color-333333 u-font-24">微信</view>
					<view class="color-999999 u-font-20">微信号：6544984494879</view>
				</view>
			</view>
			<view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view class="u-padding-top-22 u-padding-right-50 u-padding-bottom-28 u-padding-left-55 bg-white">
			<view>提现金额</view>
			<view>
				<view class="u-flex">
					<text class="u-font-40">￥</text>
					<view class="u-flex-1">
						<u-input v-model="value" type="number" :custom-style="customStyle" placeholder="请输入提现金额" />
					</view>
				</view>
				<u-line color="#F3F4F7"></u-line>
				<view class="color-999999 u-font-20 u-padding-top-19">可提现金额： 0.00</view>
			</view>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="show=true">提现</u-button>
		</view>
		
		<u-mask :show="show">
			<view class="modal-wrap u-text-center bg-white">
				<view class="u-padding-top-66 u-flex u-row-center">
					<u-image src="../../../static/image/pay_success.png" width="120" height="120" mode="aspectFit"></u-image>
				</view>
				<view class="u-padding-top-30 color-333333 u-font-36 bold"><text>{{orderData.commodityPrice}}元提现成功</text></view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				customStyle: {
					fontSize: "48rpx",
					lineHeight: "100rpx",
					color: "#333333",
					height: "100rpx",
					fontWeight: "bold",
				},
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.modal-wrap {
		width: 492rpx;
		height: 280rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.btn-wrap {
		width: 80%;
		margin: 150rpx auto 0;
	}
</style>

