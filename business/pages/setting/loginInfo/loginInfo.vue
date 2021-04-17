<template>
	<view class="u-text-center">
		<u-gap height="85"></u-gap>
		<view class="u-font-26 color-999999 u-margin-top-12 ">已绑定的登录手机号</view>
		<u-gap height="64"></u-gap>
		<view class="font-60 color-3F3F3F">{{hidePhoneNum()}}</view>
		<u-gap height="110"></u-gap>
		<view class="u-flex u-col-center u-row-center btn-wrap">
			<navigator class="btn" hover-class="none" url="changePhone/changePhone">换绑</navigator>
			<navigator class="btn" hover-class="none" url="/pages/verifyPhone/verifyPhone?url=/pages/setting/loginInfo/changePassword/changePassword&title=修改密码">改密</navigator>
		</view>
	</view>
</template>

<script>
	import * as config from "../../../common/config.js"

	export default {
		data() {
			return {

			}
		},
		methods: {
			hidePhoneNum() {
				return config.hidePhoneNum(uni.getStorageSync('merchantPhone'))
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.font-60 {
		font-size: 60rpx;
		letter-spacing: 5rpx;
	}

	.color-3F3F3F {
		color: #3F3F3F;
	}

	.btn-wrap {
		.btn {
			width: 115rpx;
			line-height: 55rpx;
			background-color: #f2f4f8;
			color: #1672ff;
			font-size: 26rpx;
			margin: 0 15rpx;
			letter-spacing: 5rpx;
		}
	}
</style>
