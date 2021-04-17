<template>
	<view>
		<view class="u-padding-left-46 u-padding-right-46">
			<u-form :model="form" ref="uForm" label-position="top" :label-style="labelStyle">
				<u-form-item label="手机号" prop="merchantPhone">
					<u-input v-model="form.merchantPhone" placeholder="请输入目前登录的完整手机号码" placeholder-style="color:#999999;font-size: 25rpx;" />
				</u-form-item>
				<u-form-item label="手机验证码" prop="code">
					<u-input v-model="form.code" placeholder="请输入手机验证码" placeholder-style="color:#999999;font-size: 25rpx;" />
					<view class="u-margin-right-20" slot="right">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
						<u-button type="primary" size="mini" @click="getCode">{{tips}}</u-button>
					</view>
				</u-form-item>
				<u-form-item label="新手机号" prop="newPhone">
					<u-input v-model="form.newPhone" placeholder="请输入您新的手机号" placeholder-style="color:#999999;font-size: 25rpx;" />
				</u-form-item>
			</u-form>
		</view>
		<view class="u-margin-top-44">
			<view class="btn-1" @click="handleClick">立即修改</view>
			<view class="btn-2" @click="show=true">手机号走丢</view>
		</view>
		
		<u-mask :show="show" @click="show = false" >
			<view class="wrap pos-abs-center bg-white border-radius-30">
				<view class="u-font-40 color-010101 u-text-center u-margin-top-56 u-margin-bottom-60 ">账号提示</view>
				<view class="u-font-28 color-666666">如果您的手机号因为各种原因已无法继续使用而导致无法换绑，请致电客服热线：<text>{{phoneNumber}}</text> 咨询处理意见</view>
				<view class="u-text-right u-margin-top-50 u-margin-right-20">
					<u-button type="primary" size="medium" shape="circle" @click="show=false">关闭</u-button>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import * as config from '../../../../common/config.js'
	
	export default {
		data() {
			return {
				form: {
					merchantPhone: '',
					code: '',
					newPhone: ''
				},

				phoneNumber: config.phoneNumber,
				
				tips: '',
				seconds: config.seconds,
				labelStyle: {
					fontSize: '30rpx',
					color: '#787a81'
				},
				
				show: false
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if(!this.form.merchantPhone){
						uni.showToast({
							title:'请输入手机号',
							icon:'none'
						})
						return
					}
					if(!config.mobilePhoneReg.test(this.form.merchantPhone)){
						uni.showToast({
							title: '手机号格式错误',
							icon: 'none'
						})
						return
					}
					if(this.form.merchantPhone != uni.getStorageSync('merchantPhone')){
						uni.showToast({
							title:'原手机号不匹配，请检查后重试',
							icon:'none'
						})
						return
					}
					
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.$u.api.sendMessage().then(res=>{
						uni.hideLoading();
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			handleClick() {
				if(!this.form.merchantPhone){
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
					return
				}
				if(!this.form.code){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
					return
				}
				if(!this.form.newPhone){
					uni.showToast({
						title:'请输入新手机号',
						icon:'none'
					})
					return
				}
				this.$u.api.bindPhone({
					merchantId: uni.getStorageSync('merchantId'),
					phone: this.form.newPhone,
					code: this.form.code
				}).then(res=>{
					if(res){
						uni.setStorageSync('merchantPhone',this.form.newPhone)
						uni.showToast({
							title:'手机号更改成功',
							success: () => {
								setTimeout(function(){
									uni.navigateBack()
								},1000)
							}
						})
					}else{
						uni.showToast({
							title:'请重新获取验证码',
							icon:'none',
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
	.btn-1,.btn-2{
		width: 548rpx;
		line-height: 88rpx;
		font-size: 32rpx;
		margin: 0 auto;
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
	
	.wrap {
		width: 560rpx;
		padding-left: 50rpx;
		padding-right: 50rpx;
		padding-bottom: 38rpx;
	}
</style>
