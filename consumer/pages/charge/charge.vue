<template>
	<view>
		<view class="bg-white u-padding-top-32 u-padding-right-30 u-padding-bottom-30 u-padding-left-50">
			<view class="">
				<text class="u-font-24 color-333333">充值金额</text>
			</view>
			<view>
				<view class="u-flex">
					<text class="u-font-40">￥</text>
					<view class="u-flex-1">
						<u-input v-model="value" type="number" :custom-style="customStyle" placeholder="请输入充值金额" />
					</view>
				</view>
				<u-line color="#F3F4F7"></u-line>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view class="bg-white u-padding-top-20 u-padding-right-30 u-padding-left-50">
			<view class="">
				<text class="u-font-24 color-333333">付款方式</text>
			</view>
			<view class="">
				<radio-group>
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in list" :key="item.value">
						<view class=" u-padding-top-12 u-padding-bottom-12">
							<radio :value="item.value" :checked="index === current" style="transform:scale(0.7)" />
							<u-icon class="u-margin-left-16" size="30" name="weixin-circle-fill"></u-icon>
							<text class="u-margin-left-12 u-font-26 color-333333">{{item.name}}</text>
						</view>
						<u-line color="#F3F4F7" v-if="index%2 == 0"></u-line>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="charge">充值</u-button>
		</view>
		<u-mask :show="show">
			<view class="modal-wrap u-text-center bg-white">
				<view class="u-padding-top-66 u-flex u-row-center">
					<u-image src="../../../static/image/pay_success.png" width="120" height="120" mode="aspectFit"></u-image>
				</view>
				<view class="u-padding-top-30 color-333333 u-font-36 bold"><text>{{orderData.commodityPrice}}元支付成功</text></view>
			</view>
		</u-mask>
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
					fontWeight: "bold",
				},
				list: [{
					name: '微信',
				}],
				value: ''
			}
		},
		methods: {
			charge() {
				if(!this.value){
					uni.showToast({
						title: "请输入充值金额",
						icon: "none"
					})
					return
				}
				let _this = this
				this.$u.api.recharge({
					userId: uni.getStorageSync("userId"),
					money: this.value,
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
							_this.show = true
							_this.value = ''
							console.log('支付成功');
						},
						complete: function(res) {
							console.log(res);
						}

					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal-wrap {
		width: 492rpx;
		height: 280rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.btn-wrap {
		width: 80%;
		margin: 150rpx auto 0;
	}
</style>
