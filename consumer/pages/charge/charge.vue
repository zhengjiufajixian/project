<template>
	<view>
		<view class="u-padding-top-46 u-padding-bottom-46 u-margin-left-30 u-font-30 color-000000">选择充值金额</view>
		<view class="u-flex u-row-between u-col-center money">
			<view class="color-FFFFFF">
				<view class="u-font-24">当前余额</view>
				<view class="u-font-56 u-margin-top-10">￥ {{walletInfo.totalAmount}}</view>
			</view>
			<view class="u-margin-60">
				<u-image :show-loading="false" src="/static/image/wallet.png" width="95" height="80" mode="widthFix"></u-image>
			</view>
		</view>
		<view class="bg-white u-margin-left-30 u-margin-right-30 u-padding-bottom-30 list">
			<view v-for="(item,index) in chargeList" @click="selected=item" :class="'list-item ' + (selected == item ? 'active' :'')"  :key="index">{{item}}元</view>
		</view>
		<view class="u-padding-top-46 u-padding-bottom-46 u-margin-left-30 u-font-30 color-000000">支付方式</view>
		<view class="u-flex u-row-between u-margin-left-30 u-margin-right-30 pay-wrap u-padding-left-20 u-padding-right-20 bg-white">
			<view class="u-flex">
				<u-icon class="u-margin-right-18" size="40" color="#17d56b"  name="weixin-circle-fill"></u-icon>
				<view class="u-font-30 color-000000">微信支付</view>
			</view>
			<u-image :show-loading="false" src="/static/image/checked.png" width="40" height="40" mode="widthFix"></u-image>
		</view>
		<view class="btn-wrap" @click="charge">
			立即充值
		</view>
		<u-popup v-model="show" mode="center" :closeable="true">
			<view class="modal-wrap u-text-center bg-white">
				<view class="u-padding-top-66 u-flex u-row-center">
					<u-image src="/static/image/pay_success.png" width="120" height="120" mode="aspectFit"></u-image>
				</view>
				<view class="u-padding-top-30 color-333333 u-font-36 bold"><text>{{chargeValue}}元充值成功</text></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	import * as config from "../../common/config.js"

	export default {
		data() {
			return {
				show: false,
				current: 0,
				customStyle: {
					fontSize: "40rpx",
					lineHeight: "40rpx",
					height: "40rpx",
				},
				list: [{
					name: '微信',
				}],
				value: '',
				chargeValue : 0,
				flag:'',
				walletInfo:{
					money:0
				},
				chargeList: [50,100,200,300,500,1000],
				selected: '',
			}
		},
		onShow() {
			this.getWalletInfo()
		},
		onLoad(params) {
			this.flag = params.flag
		},
		methods: {
			getWalletInfo() {
				this.$u.api.getWalletInfo().then(res => {
					this.walletInfo = res.wallet
				})
			},
			charge() {
				if(!this.selected){
					uni.showToast({
						title: "请选择充值金额",
						icon: "none"
					})
					return
				}
				// this.selected = Number(this.selected).toFixed(2)
				let _this = this
				this.$u.api.recharge({
					userId: uni.getStorageSync("userId"),
					money: this.selected,
					openId: uni.getStorageSync("openid"),
					type: "WX"
				}).then(res => {
					let appId = config.WX_appId
					let nonceStr = config.getNum()
					let prepay_id = 'prepay_id=' + res
					let signType = "MD5"
					let timeStamp = Date.parse(new Date()).toString()
					let key = config.key

					let paySign = md5Libs.md5("appId=" + appId +
						"&nonceStr=" + nonceStr + "&package=" + prepay_id +
						"&signType=" + signType + "&timeStamp=" + timeStamp +
						"&key=" + key)
					wx.requestPayment({
						timeStamp: timeStamp,
						nonceStr: nonceStr,
						package: prepay_id,
						signType: signType,
						paySign: paySign,
						success: function(res) {
							_this.chargeValue = _this.selected
							_this.show = true
							_this.value = ''
							if(_this.flag){
								setTimeout(function(){
									uni.navigateBack()
								},1500)								
							}
						},
						fail: function(res) {
							uni.showToast({
								title: '支付失败，请重试！',
								icon: 'none'
							})
						}

					})
				}).catch(err=>{
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.money {
		background-color: #1672ff;
		border-radius: 20rpx;
		height: 220rpx;
		margin: 0 30rpx 40rpx;
		padding-left: 20rpx;
	}
	.u-font-56 {
		font-size: 56rpx;
	}
	.list {
		border-radius: 10rpx;
	}
	.list-item {
		display: inline-block;
		width: 186rpx;
		border: 2rpx solid #1672FF;
		border-radius: 10rpx;
		line-height: 84rpx;
		text-align: center;
		color: #1672FF;
		font-size: 36rpx;
		margin-left: 33rpx;
		margin-top: 30rpx;
		transition: 0.3s all;
		&.active {
			background-color: #d6e6fe;
		}
	}
	.pay-wrap {
		height: 98rpx;
		border-radius: 20rpx;
	}
	.modal-wrap {
		width: 492rpx;
		height: 300rpx;
		// position: absolute;
		// left: 50%;
		// top: 50%;
		// transform: translate(-50%,-50%);
	}
	.btn-wrap {
		border-radius: 20rpx;
		margin: 150rpx 30rpx 0;
		text-align: center;
		font-size: 38rpx;
		color: #FFFFFF;
		background-color: #1672FF;
		line-height: 88rpx;
	}
</style>
