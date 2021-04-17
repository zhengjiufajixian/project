<template>
	<view>
		<view>
			<u-image src="/subPackages/static/image/contact_bg.png" mode="scaleToFill" height="360"></u-image>
		</view>
		<view class="u-flex bg-white u-padding-top-28 u-padding-bottom-28">
			<view class="u-flex-6 u-flex u-row-center u-col-center">
				<u-button :hair-line="false" hover-class="none" open-type="contact" :custom-style="customStyle">
					<u-icon name="kefu-ermai" size="60" color="#1672FF"></u-icon>
					<text class="u-margin-left-26">在线客服</text>
				</u-button>
			</view>
			<view class="u-flex-6 u-flex u-row-center u-col-center" @click="call">
				<view class="border u-flex u-row-center u-col-center">
					<u-icon name="phone-fill" size="30" color="#1672FF"></u-icon>
				</view>
				<text class="u-margin-left-26">电话客服</text>
			</view>
		</view>
		<!-- <view class="u-padding-top-52 u-padding-bottom-10 u-padding-left-30 color-424242 bold">
			常见问题
		</view>
		<view class="u-margin-left-30 u-margin-right-30">
			<view class="u-flex u-row-between u-col-center u-padding-top-26 u-padding-bottom-26 color-424242">
				<view>订单操作流程</view>
				<u-icon name="arrow-right" size="30" color="#999999"></u-icon>
			</view>
			<u-line color="#C6C6C6"></u-line>
		</view>
		<view class="u-margin-left-30 u-margin-right-30">
			<view class="u-flex u-row-between u-col-center u-padding-top-26 u-padding-bottom-26 color-424242">
				<view>如何修改店铺定位</view>
				<u-icon name="arrow-right" size="30" color="#999999"></u-icon>
			</view>
			<u-line color="#C6C6C6"></u-line>
		</view> -->
	</view>
</template>

<script>
	import * as config from "../../common/config.js"
	export default {
		data() {
			return {
				customStyle: {
					border: 'none'
				}
			}
		},
		methods: {
			call() {
				uni.makePhoneCall({
					phoneNumber: config.contactPhone
				})
			}
		}
	}
</script>

<style lang="scss">
	.color-424242 {
		color: #424242;
	}

	.border {
		border: 1rpx solid $uni-color-primary;
		border-radius: 50%;
		width: 60rpx;
		height: 60rpx;
	}
</style>
