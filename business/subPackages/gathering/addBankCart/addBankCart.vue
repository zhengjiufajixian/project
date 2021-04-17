<template>
	<view>
		<view class="u-text-center color-000000 bold">
			<u-gap height="90"></u-gap>
			<view class="u-font-30">添加银行卡</view>
			<u-gap height="15"></u-gap>
			<view class="u-font-24">请绑定持卡人本人的银行卡</view>
		</view>
		<view class="u-padding-50">
			<u-line color="#999999"></u-line>
			<view class="u-flex color-000000 bold u-font-24">
				<view class="width-160">持卡人</view>
				<view class="u-flex-1">
					<u-input v-model="name" :custom-style="customStyle" placeholder="请输入姓名"
						:placeholder-style="placeholderStyle" />
				</view>
			</view>
			<u-line color="#999999"></u-line>
			<view class="u-flex color-000000 bold u-font-24">
				<view class="width-160">银行卡号</view>
				<view class="u-flex-1">
					<u-input v-model="bankAccount" :custom-style="customStyle" placeholder="请输入本人银行卡号"
						:placeholder-style="placeholderStyle" />
				</view>
			</view>
			<u-line color="#999999"></u-line>
			<view class="u-flex color-000000 bold u-font-24">
				<view class="width-160">开户行</view>
				<view class="u-flex-1">
					<u-input v-model="bankAddress" :custom-style="customStyle" placeholder="请输入开户行"
						:placeholder-style="placeholderStyle" />
				</view>
			</view>
			<u-line color="#999999"></u-line>
			<view class="u-flex color-000000 u-font-24">
				<view class="width-160 bold">所属银行</view>
				<view class="u-flex-1 line-height-70" @click="show=true">
					<text :class="bankName?'color-000000':'color-999999'">{{bankName?bankName:"请选择所属银行"}}</text>
				</view>
			</view>
			<u-line color="#999999"></u-line>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="handleClick">确认添加</u-button>
		</view>
		<u-select v-model="show" :list="list" label-name="bankName" value-name="bankId" @confirm="confirm"></u-select>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	import * as config from "../../../common/config.js"
	export default {
		data() {
			return {
				name: '',
				bankAccount: '',
				bankName: '',
				bankCode: '',
				bankAddress: '',
				customStyle: {
					fontWeight: "normal",
					fontSize: "24rpx"
				},
				placeholderStyle: {
					color: "#999999",
					fontSize: "24rpx"
				},
				show: false,
				list: []
			}
		},
		onLoad() {
			this.list = config.bankList
		},
		methods: {
			confirm(e) {
				this.bankName = e[0].label
				this.bankCode = e[0].value
			},
			handleClick() {
				if (!this.name) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return
				}
				if (!this.bankAccount) {
					uni.showToast({
						title: '请输入银行卡号',
						icon: 'none'
					})
					return
				}
				if (!this.bankAddress) {
					uni.showToast({
						title: '请输入开户支行名称',
						icon: 'none'
					})
					return
				}
				if (!this.bankName) {
					uni.showToast({
						title: '请选择所属银行',
						icon: 'none'
					})
					return
				}
				this.$u.api.addBankAccount({
					bankAccount: this.bankAccount,
					name: this.name,
					bankName: this.bankName,
					bankCode: this.bankCode,
					bankAddress: this.bankAddress
				}).then(res => {
					if (res.code == 500) {
						this.$refs.uTips.show({
							title: res.message,
							type: 'error',
							duration: '1500'
						})
					} else {
						uni.showToast({
							title: "绑定成功",
							mask: true,
						})
						setTimeout(function() {
							uni.navigateBack()
						}, 1000)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.width-160 {
		width: 160rpx;
	}

	.line-height-70 {
		line-height: 70rpx;
	}

	.btn-wrap {
		width: 80%;
		margin: 500rpx auto 0;
	}
</style>
