<template>
	<view>
		<view v-if="list.length>0">			
			<view v-for="(item,index) in list" :key="index" class="list-item u-flex u-col-top u-margin-20 bg-white u-padding-top-36 u-padding-right-30 u-padding-bottom-40 u-padding-left-30">
				<u-image width="80" :src="getBankIcon(item.bankCode)" mode="widthFix"></u-image>
				<view class="u-flex-1 u-margin-left-28">
					<view class="u-font-30 color-000000">{{item.bankName}}</view>
					<view class="u-font-26 color-666666">储蓄卡</view>
					<view class="u-font-32 color-666666 u-margin-top-36">{{getBankCode(item.bankAccount)}}</view>
				</view>
				<view class="u-font-26 color-999999" @click="unbindClick(item)">解绑</view>
			</view>
		</view>
		<view v-else>
			<u-empty src="/static/image/nodata-gathering.png" paddingTop="370"></u-empty>
		</view>

		<view class="btn-wrap">
			<u-button type="primary" @click="bindClick">绑定银行卡</u-button>
		</view>

		<u-popup v-model="show" mode="center" border-radius="15" height="auto" :closeable="true">
			<view class="popup-wrap u-text-center u-padding-bottom-40">
				<view class="u-font-32 color-333333 u-padding-top-50">解绑验证</view>
				<view class="u-font-30 color-666666 u-margin-top-50">已发送短信至您的登录手机号</view>
				<view class=" u-border-bottom input-wrap u-margin-top-40">
					<u-input v-model="code" :clearable="false" placeholder="请填写验证码" :custom-style="customStyle" placeholder-style="color:#666666;font-size: 28rpx;text-align:center;" />
				</view>
				<view class="u-flex u-col-center u-row-center u-margin-top-46 u-padding-left-40 u-padding-right-40">
					<view class="u-flex-6 u-padding-bottom-20 u-padding-top-20" @click="cancleBind">确认解绑</view>
					<view class="u-flex-6 u-padding-bottom-20 u-padding-top-20">
						<view :class="codeStatus?'u-font-28':'u-font-28 color-1672FF'">
							<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange" @start="codeStart" @end="codeEnd"></u-verification-code>
							<text @click="getCode">{{tips}}</text>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import * as config from '../../common/config.js'
	export default {
		data() {
			return {
				list: [],
				code: '',
				tips: '',
				seconds: config.seconds,
				customStyle: {
					textAlign: 'center',
					border: 'none'
				},
				show: false,
				codeStatus: false,
				bankAccountId: '',
			}
		},
		onShow() {
			this.getBankAccountList()
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			codeStart() {
				this.codeStatus = true
			},
			codeEnd() {
				this.codeStatus = false
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.$u.api.sendMessage().then(res => {
						uni.hideLoading();
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			getBankIcon(code) {
				let bankInfo = config.getBank(code)
				return bankInfo.bankIcon
			},
			getBankCode(code) {
				var reg = /^\d+(\d{4})$/;
				var str = code.replace(reg, "**** **** **** $1");
				return str
			},
			getBankAccountList() {
				this.$u.api.getBankAccountList().then(res => {
					this.list = res
				})
			},
			unbindClick(val) {
				this.show = true
				this.bankAccountId = val.id
				this.getCode()
			},
			bindClick() {
				uni.navigateTo({
					url: "/pages/verifyPhone/verifyPhone?url=/subPackages/gathering/addBankCart/addBankCart&title=绑定银行卡"
				})
			},
			cancleBind() {
				this.$u.api.delBankAccount({
					bankAccountId: this.bankAccountId,
					code: this.code
				}).then(res => {
					if (res&&res.message.indexOf('失败')>-1) {
						uni.showToast({
							title: '解绑失败',
							icon: 'none'
						})
					} else {
						this.getBankAccountList()
						uni.showToast({
							title: '解绑成功'
						})
					}
					this.show = false
					this.$refs.uCode.reset()
					this.code = ''
				})
			}
		}
	}
</script>

<style lang="scss">
	.list-item {
		border-radius: 15rpx;
	}

	.popup-wrap {
		width: 580rpx;
	}

	.input-wrap {
		width: 180rpx;
		margin: 0 auto;
	}

	.btn-wrap {
		position: fixed;
		left: 50%;
		bottom: 58rpx;
		transform: translateX(-50%);
		width: 396rpx;
		line-height: 80rpx;
	}
</style>
