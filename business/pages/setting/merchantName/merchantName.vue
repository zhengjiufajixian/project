<template>
	<view>
		<u-gap height="12"></u-gap>
		<view class="input-wrap">
			<u-input v-model="data" />
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
				this.$u.api.updateMerchant({
					merchantName: this.data,
					merchantId: uni.getStorageSync('merchantId')
				}).then(res => {
					if(res){
						uni.showToast({
							title: "修改成功",
							success: function() {
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							}
						})
					}else{
						uni.showToast({
							title: "修改失败，请重试",
							icon: "none"
						})
					}
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
