<template>
	<view>
		<u-gap height="20"></u-gap>
		<view
			class="u-flex u-row-between u-col-center u-padding-top-22 u-padding-right-30 u-padding-bottom-28 u-padding-left-30 bg-white"
			v-if="bankList.length>0" @click="show2 = true">
			<view class="u-flex u-col-center">
				<u-image width="60" :src="getBankIcon(bankList[selected].bankCode)" mode="widthFix"></u-image>
				<view class="u-margin-left-18">
					<view class="color-333333 u-font-30">{{'卡号：'+hideBankAccount(bankList[selected])}}</view>
					<view class="color-999999 u-font-24">{{bankList[selected].bankAddress}}</view>
				</view>
			</view>
			<view>
				<u-icon name="arrow-right" size="30"></u-icon>
			</view>
		</view>
		<view v-else>
			<navigator
				class="u-flex u-row-between u-col-center u-padding-top-22 u-padding-right-30 u-padding-bottom-28 u-padding-left-30 bg-white"
				url="/subPackages/gathering/addBankCart/addBankCart" hover-class="none">
				<view class="u-font-30">暂无银行卡</view>
				<view class="u-font-24">
					<text>去绑定</text>
					<u-icon name="arrow-right" size="30"></u-icon>
				</view>
			</navigator>
		</view>
		<u-gap height="20"></u-gap>
		<view class="u-padding-top-22 u-padding-right-30 u-padding-bottom-28 u-padding-left-30 bg-white">
			<view>提现金额</view>
			<view>
				<view class="u-flex">
					<text class="u-font-40">￥</text>
					<view class="u-flex-1">
						<u-input v-model="money" type="digit" :custom-style="customStyle" placeholder="请输入提现金额" />
					</view>
				</view>
				<u-line color="#F3F4F7"></u-line>
				<view class="color-999999 u-font-20 u-padding-top-19">可提现金额： {{walletInfo.withdrawable}}</view>
			</view>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="sendWithdrawal">提现</u-button>
		</view>

		<u-mask :show="show">
			<view class="modal-wrap u-text-center bg-white">
				<view class="u-padding-top-66 u-flex u-row-center">
					<u-image src="/static/image/pay_success.png" width="120" height="120" mode="aspectFit"></u-image>
				</view>
				<view class="u-padding-top-30 color-333333 u-font-36 bold"><text>提现申请提交成功</text></view>
			</view>
		</u-mask>

		<u-popup v-model="show2" mode="center">
			<view class="u-padding-20">
				<view class="u-flex u-row-between">
					<view class="u-padding-20 u-font-30 color-333333">
						已绑定银行卡列表
					</view>
					<view class="u-padding-20" @click="show2=false">
						<u-icon name="close" size="30"></u-icon>
					</view>
				</view>
				<view v-for="(item,index) in bankList" :key="index">
					<view class="u-flex u-col-center u-padding-20" @click="handleClick(index)">
						<u-image width="60" :src="getBankIcon(item.bankCode)" mode="widthFix"></u-image>
						<view class="u-margin-left-18">
							<view class="color-333333 u-font-30">{{'卡号：'+hideBankAccount(item)}}</view>
							<view class="color-999999 u-font-24">{{item.bankAddress}}</view>
						</view>
						<view
							:class="'u-padding-20 u-margin-left-20 ' + (index== selected? 'color-1672FF':'color-999999')">
							{{index==selected?'已选择':'选择'}}</view>
					</view>
					<u-line></u-line>
				</view>
				<view class="u-text-center u-padding-top-20 u-padding-bottom-20" @click="toAddBankCard">
					去添加新卡
				</view>
			</view>
		</u-popup>

		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	import * as config from "../../common/config.js"
	export default {
		data() {
			return {
				show: false,
				show2: false,
				customStyle: {
					fontSize: "48rpx",
					lineHeight: "100rpx",
					color: "#333333",
					height: "100rpx",
				},
				money: '',
				walletInfo: {
					withdrawable: 0
				},
				bankList: [],
				selected: 0
			}
		},
		onShow() {
			this.getBankList()
		},
		onLoad() {
			this.getWalletInfo()
		},
		methods: {
			toAddBankCard() {
				this.show2 = false
				uni.navigateTo({
					url: '/subPackages/gathering/gathering'
				})
			},
			hideBankAccount(item) {
				return config.hideBankAccount(item.bankAccount)
			},
			handleClick(index) {
				if (index == this.selected) {
					this.show2 = false
					return
				}
				this.show2 = false
				this.selected = index
			},
			getBankIcon(code) {
				let bankInfo = config.getBank(code)
				return bankInfo.bankIcon
			},
			getWalletInfo() {
				this.$u.api.getWalletInfo().then(res => {
					this.walletInfo = res
				})
			},
			getBankList() {
				this.$u.api.getBankAccountList().then(res => {
					this.bankList = res
				})
			},
			sendWithdrawal() {
				if(this.bankList.length<=0) {
					this.$refs.uTips.show({
						title: '暂未绑定银行卡',
						type: 'error',
						duration: '2000'
					})
					return
				}
				let minMoney = 20
				if (this.walletInfo.withdrawable < minMoney) {
					this.$refs.uTips.show({
						title: '可提现金额不足' + minMoney + '元',
						type: 'error',
						duration: '2000'
					})
					return
				}
				this.money = Number(this.money).toFixed(2)
				if (this.money < minMoney) {
					this.$refs.uTips.show({
						title: '最低提现' + minMoney + '元',
						type: 'error',
						duration: '2000'
					})
					return
				}
				if (this.money > this.walletInfo.withdrawable) {
					this.$refs.uTips.show({
						title: '最多只能提现' + this.walletInfo.withdrawable + '元',
						type: 'error',
						duration: '2000'
					})
					return
				}
				this.$u.api.sendWithdrawal({
					merchantId: uni.getStorageSync('merchantId'),
					bankAccountId: this.bankList[this.selected].id,
					money: this.money
				}).then(res => {
					if (res) {
						this.show = true
						let _this = this
						setTimeout(function() {
							_this.show = false
							uni.navigateBack()
						}, 1500)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal-wrap {
		width: 492rpx;
		padding-bottom: 50rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.btn-wrap {
		width: 80%;
		margin: 150rpx auto 0;
	}
</style>
