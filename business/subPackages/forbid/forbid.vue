<template>
	<view>
		<view class="header u-text-center">
			<image src='/static/image/logo.png'></image>
		</view>
		<view class="u-text-center u-font-30 color-333333 u-margin-bottom-30">店铺因违规已暂停服务</view>
		<view class="content u-text-center u-font-24">
			<view>很抱歉，您旗下门店因大量客户投诉，对社会</view>
			<view>造成不良影响，现决定关闭您的店铺</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.header {
		margin: 290rpx auto 40rpx;
	}
	
	.header image {
		width: 200rpx;
		height: 200rpx;
	}
	.content {
		color: #c7c7c7;
	}
</style>
