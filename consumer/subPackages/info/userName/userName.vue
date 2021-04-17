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
			this.data = option.userName
		},
		methods: {
			handleClick() {
				this.$u.api.upUser({
					userId:uni.getStorageSync("userId"),
					userName: this.data
				}).then(res => {
					this.$refs.uToast.show({
						title: '操作成功'
					})
					setTimeout(function(){
						uni.navigateBack()
					},500)
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
