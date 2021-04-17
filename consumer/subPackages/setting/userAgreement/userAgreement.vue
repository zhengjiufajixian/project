<template>
	<view class="u-padding-left-35 u-padding-right-35">
		<view class="u-text-center">
			<view class="u-font-36 u-margin-top-30">广莱车友汇网络科技有限公司</view>
			<view class="u-font-36 u-margin-bottom-30">用户使用协议</view>
		</view>
		<!-- <view class="content">
			广莱车友汇网络科技有限公司，一般用于文字的格式化和排版，文字处理软件的发展和文字处理的电子化是信息社会发展
		</view>
		<view class="title">
			一、确认并接受
		</view> -->
		<view class="content">
			<u-parse :html="txt"></u-parse>
		</view>
	</view>
</template>

<script>
	import * as config from "../../../common/config.js"
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
		font-size: 26rpx;
		color: #666666;
		line-height: 1.8;

	}

	.title {
		font-weight: bold;
		font-size: 30rpx;
		color: #333333;
		margin-top: 26rpx;
		margin-bottom: 12rpx;
	}
</style>
