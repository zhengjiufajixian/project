<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="setting-wrap">
			<view class="setting-item">
				<u-field v-model="userName" label-width="150" label="收货人姓名"></u-field>
			</view>
			<view class="setting-item">
				<u-field v-model="userPhone" label-width="150" label="手机号码"></u-field>
			</view>
			<view class="setting-item">
				<u-field v-model="userAddress" label-width="150" label="收货地址"></u-field>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				addressId:'',
				userName: '',
				userPhone: '',
				userAddress: '',
				status:false,
			}
		},
		onLoad(option) {
			option = JSON.parse(option.data)
			console.log(option)
			this.id = option.id
			this.userId = option.userId
			this.userName = option.userName
			this.userPhone = option.userPhone
			this.userAddress = option.userAddress
			this.status = option.status>0?true:false
		},
		methods: {
			saveAddress() {
				this.$u.api.updateAddress({
					id: this.id,
					userId: this.userId,
					userName: this.userName,
					userPhone: this.userPhone,
					userAddress: this.userAddress,
					status: this.status?1:0
				}).then(res => {
					if(res){
						uni.showToast({
							title:'编辑成功'
						})
						setTimeout(function() {
							uni.navigateBack()
						}, 1500)
					}else{
						uni.showToast({
							title:'编辑失败，请重试',
							icon:'none'
						})
					}
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
