<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="setting-wrap">
			<view class="setting-item">
				<u-field v-model="userName" label-width="150" label="收货人姓名"></u-field>
			</view>
			<view class="setting-item">
				<u-field v-model="phone" label-width="150" label="手机号码"></u-field>
			</view>
			<view class="setting-item">
				<u-field v-model="address" label-width="150" label="收货地址"></u-field>
			</view>
			<view class="setting-item">
				<u-field label="设为默认" :disabled="true">
					<u-switch v-model="status" slot="right"></u-switch>
				</u-field>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="saveAddress">保存</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '',
				phone: '',
				address: '',
				status: 1,
			}
		},
		methods: {
			saveAddress() {
				this.$u.api.addAddress({
					userId: uni.getStorageSync("userId"),
					userName: this.userName,
					phone: this.phone,
					address: this.address,
					status: this.status?1:0
				}).then(res => {
					this.$refs.uToast.show({
						title: '操作成功'
					})
					setTimeout(function() {
						uni.navigateBack()
					}, 500)
				})
			}
		}
	}
</script>

<style lang="scss">
	.setting-wrap {
		background-color: #fff;
		padding: 0 40rpx 0 30rpx;

		.u-section__title__text {
			line-height: 3 !important;
		}

		.setting-item {}
	}

	.btn-wrap {
		position: fixed;
		width: 80%;
		left: 50%;
		bottom: 90rpx;
		transform: translateX(-50%);
	}
</style>
