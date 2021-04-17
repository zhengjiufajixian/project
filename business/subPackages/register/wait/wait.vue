<template>
	<view>
		<view class="u-flex u-row-center u-margin-top-80">
			<u-image width="280" height="260" src="/subPackages/static/image/resgister_wait.png"></u-image>
		</view>
		<view class="u-text-center u-font-32 u-tips-color u-margin-top-55">
			商家资料及入驻信息提交成功 <br/> 等待审核
		</view>
		<!-- <view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="setPage">返回首頁</u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			setPage(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	.btn-wrap {
		position: fixed;
		width: 80%;
		left: 50%;
		bottom: 90rpx;
		transform: translateX(-50%);
	}
</style>
