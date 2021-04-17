<template>
	<view>
		<view class="list-wrap u-padding-top-24">
			<!-- <view class="u-flex u-col-center list-item u-padding-left-22 u-padding-right-22">
				<view class="u-margin-right-60 u-padding-right-44 color-000000 u-font-30">原密码</view>
				<view class="u-flex-1"><u-input type="text" v-model="oldPassword" placeholder="请输入原密码" :height="98"></u-input></view>
			</view>
			<u-line></u-line> -->
			<view class="u-flex u-col-center list-item u-padding-left-22 u-padding-right-22">
				<view class="u-margin-right-60 u-padding-right-44 color-000000 u-font-30">新密码</view>
				<view class="u-flex-1"><u-input type="text" v-model="newPassword1" placeholder="请输入新密码" :height="98"></u-input></view>
			</view>
			<u-line></u-line>
			<view class="u-flex u-col-center list-item u-padding-left-22 u-padding-right-22">
				<view class="u-margin-right-60 u-padding-right-44 color-000000 u-font-30">新密码</view>
				<view class="u-flex-1"><u-input type="text" v-model="newPassword2" placeholder="再次输入新密码" :height="98"></u-input></view>
			</view>
			<u-line></u-line>
		</view>
		<view class="u-padding-left-22 u-padding-right-22 u-margin-top-44">
			<view class="btn-1" @click="handleClick">确定</view>
			<view class="btn-2">
				<navigator url="../forgetPassword/forgetPassword" open-type="redirect" hover-class="none">
					忘记密码
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// oldPassword:'',
				newPassword1:'',
				newPassword2:''
			}
		},
		methods: {
			handleClick() {
				// if(!this.oldPassword){
				// 	uni.showToast({
				// 		title:'请输入原密码',
				// 		icon:'none'
				// 	})
				// 	return
				// }
				if(!this.newPassword1){
					uni.showToast({
						title:'请输入新密码',
						icon:'none'
					})
					return
				}
				if(!this.newPassword2){
					uni.showToast({
						title:'请再次输入新密码',
						icon:'none'
					})
					return
				}
				if(this.newPassword1 != this.newPassword2){
					uni.showToast({
						title:'两次密码输入不一致',
						icon:'none'
					})
					return
				}
				this.$u.api.upLoginPwd({
					merchantId:uni.getStorageSync('merchantId'),
					password: this.newPassword1
				}).then(res=>{
					if(res){
						uni.showToast({
							title: '密码修改成功',
							success: () => {
								setTimeout(function(){
									uni.navigateBack()
								},1000)
							}
						})
					}else{
						uni.showToast({
							title: '修改失败，请稍后重试',
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	.list-item {
		line-height: 98rpx;
	}
	.btn-1,.btn-2{
		width: 100%;
		line-height: 88rpx;
		font-size: 32rpx;
		border-radius: 10rpx;
		text-align: center;
		border: 2rpx solid $uni-color-primary;
	}
	.btn-1 {
		color: #FFFFFF;
		background-color: $uni-color-primary;
	}
	.btn-2 {
		margin-top: 35rpx;
		color: $uni-color-primary;
		background-color: #FFFFFF;
	}
</style>
