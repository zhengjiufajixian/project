<template>
	<view>
		<u-image src="../../../static/image/register_bg.png" mode="widthFix"></u-image>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="setPage('notice')">我要入驻</u-button>
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
					url: '/pages/register/' + page + "/" + page 
				});
			},
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
