<template>
	<view>
		<view class="title">《湖北广莱车友汇商家入驻须知》</view>
		<view class="content">
			<u-parse :html="txt"></u-parse>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="setPage('submit')">我要入驻</u-button>
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
			setPage(page, params) {
				uni.navigateTo({
					url: '/subPackages/register/' + page + "/" + page 
				});
			},
		}
	}
</script>

<style lang="scss">
	.title {
		text-align: center;
		font-size: 32rpx;
		color: #000000;
		margin-top: 57rpx;
		margin-bottom: 20rpx;
	}
	
	.content {
		border: 1rpx solid #eeeeee;
		margin: 0 auto;
		padding: 20rpx 14rpx;
		line-height: 1.5;
		width: 690rpx;
		height: 70vh;
		overflow-y: scroll;
		font-size: 26rpx;
		color: #444444;
	}
	.btn-wrap {
		position: fixed;
		width: 80%;
		left: 50%;
		bottom: 90rpx;
		transform: translateX(-50%);
	}
</style>
