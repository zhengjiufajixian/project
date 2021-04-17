<template>
	<view>
		<swiper :current="current" :indicator-dots="true" indicator-active-color="#1672ff" style="height: 1100rpx;"
			@change="handleChange">
			<swiper-item v-for="(item,index) in guideList" :key="index">
				<view class="swiper-item">
					<view class="u-flex u-row-center">
						<u-image :src="item.url" width="450" mode="widthFix"></u-image>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="btn-wrap">
			<view class="btn-item" v-if="current>0" @click="current--">上一页</view>
			<view class="btn-item" v-if="current<guideList.length-1" @click="current++">下一页</view>
			<view class="btn-item" v-if="current==guideList.length-1" @click="current = 0">再看一遍</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				guideList:[],
				guideWxList: [{
					url: '/subPackages/static/image/guide/guide-1.png',
				}, {
					url: '/subPackages/static/image/guide/guide-2.png',
				}, {
					url: '/subPackages/static/image/guide/guide-3.png',
				}, {
					url: '/subPackages/static/image/guide/guide-4.png',
				}, {
					url: '/subPackages/static/image/guide/guide-5.png',
				}, {
					url: '/subPackages/static/image/guide/guide-6.png',
				}, {
					url: '/subPackages/static/image/guide/guide-7.png',
				}, {
					url: '/subPackages/static/image/guide/guide-8.png'
				}, {
					url: '/subPackages/static/image/guide/guide-9.png',
				}],
				guideWashList: [{
					url: '/subPackages/static/image/guide/guide-wash-1.png',
				}, {
					url: '/subPackages/static/image/guide/guide-wash-2.png',
				}, {
					url: '/subPackages/static/image/guide/guide-wash-3.png',
				}, {
					url: '/subPackages/static/image/guide/guide-wash-4.png',
				}, {
					url: '/subPackages/static/image/guide/guide-wash-5.png',
				}, {
					url: '/subPackages/static/image/guide/guide-wash-6.png',
				}, {
					url: '/subPackages/static/image/guide/guide-wash-7.png',
				}]
			}
		},
		onLoad(params) {
			if(params.type=='XC'){
				this.guideList = this.guideWashList
				uni.setNavigationBarTitle({
				    title: '洗车流程图'
				});
			}else{
				this.guideList = this.guideWxList
				uni.setNavigationBarTitle({
				    title: '维修保养流程图'
				});
			}
		},
		methods: {
			handleChange(event) {
				if (event.detail.source == 'touch') {
					this.current = event.detail.current
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.btn-wrap {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 50rpx;

		.btn-item {
			font-size: 34rpx;
			display: inline-block;
			width: 200rpx;
			margin: 0 auto;
			background: #1672FF;
			color: #FFFFFF;
			text-align: center;
			border-radius: 40rpx;
			line-height: 60rpx;
		}
	}

	.u-indicator-item-round-active {
		background-color: #1672FF !important;
	}
</style>
