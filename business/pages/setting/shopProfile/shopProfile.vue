<template>
	<view>
		<u-gap height="12"></u-gap>
		<view class="input-wrap">
			<u-input type="textarea" height="250" :border="true" v-model="data" :auto-height="true" placeholder="请输入店铺简介" />
		</view>
		<u-gap height="60"></u-gap>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="handleClick">保存</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: ''
			};
		},
		onLoad(option) {
			this.data = option.data
		},
		methods: {
			handleClick() {
				this.$u.api.upShop({
					shopProfile: this.data
				}).then(res => {
					uni.showToast({
						title: "修改成功",
						icon: "none",
						duration: 2000,
						mask: true,
						success: function() {
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.input-wrap {
		background: #fff;
		padding: 5px 40rpx 5px 30rpx;
	}
	.btn-wrap {
		width: 80%;
		margin: 0 auto;
	}
</style>
