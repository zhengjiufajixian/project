<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="setting-wrap">
			<view class="setting-item">
				<u-field v-model="phone" label=" " placeholder="请填写手机号" required>
					<u-icon name="phone" size="28" slot="icon"></u-icon>
					<u-button size="mini" slot="right" type="error" shape="circle" @click="getCode">{{codeText}}</u-button>
				</u-field>
				<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
			</view>
			<view class="setting-item">
				<u-field v-model="code" label=" " placeholder="请填写验证码">
					<u-icon name="coupon" size="28" slot="icon"></u-icon>
				</u-field>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="contact">
			<view class="u-flex u-row-center">
				<text>收不到验证码，请联系</text>
				<navigator url="/subPackages/contact/contact" hover-class="none">
					<text style="color:#1672ff;">在线客服</text>
				</navigator>
			</view>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="bindPhone">确认绑定</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import * as config from '../../../common/config.js'
	export default {
		data() {
			return {
				phone: '',
				code: '',
				codeText: ''
			}
		},
		methods: {
			codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if(!this.phone){
					uni.showToast({
						title:"请填写手机号",
						icon: "none"
					})
					return
				}
				if(!config.mobilePhoneReg.test(this.phone)){
					uni.showToast({
						title: '手机号格式错误',
						icon: 'none'
					})
					return
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.$u.api.sendMessage({
						phone: this.phone
					}).then(res => {
						uni.hideLoading();
						if (res.code) {
							this.$u.toast(res.message);
						}else{
							this.$u.toast(res);
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			bindPhone() {
				this.$u.api.bindPhone({
					userId:uni.getStorageSync("userId"),
					phone: this.phone,
					code: this.code
				}).then(res => {
					if(res){
						uni.setStorageSync("userPhone",this.phone)
						this.$refs.uToast.show({
							title: '绑定成功'
						})
						setTimeout(function(){
							uni.navigateBack()
						},1000)
					}else{
						this.$refs.uToast.show({
							title: '绑定失败，请重试'
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

		.setting-item {
			.u-label {
				flex: 0 0 20px !important;
			}
		}
	}
	.contact {
		text-align: center;
		color: $u-type-info;
		padding: 20rpx 0 30rpx 0;
	}

	.btn-wrap {
		width: 80%;
		margin: 0 auto;
	}
</style>
