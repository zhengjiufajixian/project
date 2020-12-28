<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="setting-wrap">
			<view class="setting-item">
				<u-field v-model="phone" label=" " placeholder="请填写手机号" required>
					<u-icon name="photo" size="28" slot="icon"></u-icon>
					<u-button size="mini" slot="right" type="error" shape="circle" @click="getCode">{{codeText}}</u-button>
				</u-field>
				<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
			</view>
			<view class="setting-item">
				<u-field v-model="code" label=" " placeholder="请填写验证码">
					<u-icon name="photo" size="28" slot="icon"></u-icon>
				</u-field>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="contact">
			<text>收不到验证码，请联系<text style="color:#1672ff;">在线客服</text></text>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="bindPhone">确认修改</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
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
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1000);
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
