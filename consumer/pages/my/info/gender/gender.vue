<template>
	<view>
		<u-gap height="12"></u-gap>
		<view class="input-wrap">
			<u-radio-group v-model="data">
				<u-radio v-for="(item, index) in list" :key="index" :name="item.name">
					{{item.name}}
				</u-radio>
			</u-radio-group>
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
				data: '',
				list: [{
					name: "男"
				},{
					name: "女"
				}]
			};
		},
		onLoad(option) {
			this.data = option.gender
		},
		methods: {
			handleClick() {
				this.$u.api.upUser({
					userId: uni.getStorageSync("userId"),
					gender: this.data
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
	.input-wrap {
		background: #fff;
		padding: 5px 40rpx 5px 30rpx;
	}

	.btn-wrap {
		width: 80%;
		margin: 0 auto;
	}
</style>
