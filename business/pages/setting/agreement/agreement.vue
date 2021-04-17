<template>
	<view class="u-padding-left-35 u-padding-right-35">
		<view class="u-text-center"> 
			<view class="u-font-36 u-margin-top-30">广莱车友汇网络科技有限公司</view>
			<view class="u-font-36">用户服务协议</view>
		</view>
		<view class="content">
			<u-parse :html="txt"></u-parse>
		</view>
	</view>
</template>

<script>
	import * as config from '../../../common/config.js'
	export default {
		data() {
			return {
				txt: config.txt
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.content {
		padding: 0 14rpx 20rpx;
		line-height: 1.5;
		font-size: 26rpx;
		color: #444444;
	}
	.title {
		text-align: center;
		font-size: 32rpx;
		color: #000000;
		margin-top: 20rpx; 
	}
</style>
