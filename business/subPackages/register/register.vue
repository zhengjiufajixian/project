<template>
	<view>
		<u-image src="/subPackages/static/image/register_bg.png" mode="widthFix"></u-image>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="setPage('submit')">我要入驻</u-button>
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
			setPage(page, params) {
				uni.navigateTo({
					url: '/subPackages/register/' + page + "/" + page 
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
	.btn-wrap {
		position: fixed;
		width: 80%;
		left: 50%;
		bottom: 90rpx;
		transform: translateX(-50%);
	}
</style>
