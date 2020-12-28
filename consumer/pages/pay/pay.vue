<template>
	<view>
		<view class="bg-white u-padding-top-32 u-padding-right-30 u-padding-bottom-30 u-padding-left-50">
			<view class="">
				<text class="u-font-24 color-333333">支付金额</text>
			</view>
			<view>
				<view class="u-flex">
					<text class="u-font-40">￥</text>
					<view class="u-flex-1">
						<u-input v-model="orderData.commodityPrice" type="text" :custom-style="customStyle" :disabled="true"/>
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
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in list"
					 :key="item.value">
						<view class="u-flex u-padding-top-12 u-padding-bottom-12">
							<radio :value="item.value" :checked="index === current" style="transform:scale(0.7)" />
							<u-icon class="u-margin-left-16" name="shopping-cart"></u-icon>
							<text class="u-margin-left-12 u-font-26 color-333333">{{item.name}}</text>
							<view v-if="item.value == 'YE'" class="u-flex">
								<text class="color-333333 u-font-22 u-margin-left-20">{{'可用余额：￥' + wallet}}</text>
								<navigator url="../charge/charge" v-if="wallet < 100" hover-class="none">
									<text class="color-FF2828 u-font-22 u-margin-left-60" >充值</text>
								</navigator>
							</view>
						</view>
						<u-line color="#F3F4F7" v-if="index%2 == 0"></u-line>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="submit">支付</u-button>
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
	import * as config from "../../common/config.js"
	import md5Libs from "uview-ui/libs/function/md5"
	
	export default {
		data() {
			return {
				show: false,
				customStyle: {
					fontSize: "40rpx",
					lineHeight: "40rpx",
					height: "40rpx",
					fontWeight: "bold",
				},
				list: [{
						name: '余额',
						value: 'YE'
					},
					{
						name: '微信',
						value: 'WX'
					}
				],
				wallet: {},
				orderData:{},
				paymentType: ""
			}
		},
		onShow() {
			this.getWaletDetail()
		},
		onLoad(data) {
			this.orderData = data
		},
		methods: {
			radioChange(event){
				this.paymentType = event.detail.value
			},
			getWaletDetail() {
				this.$u.api.getWaletDetail().then(res=>{
					this.wallet = res.totalAmount
				})
			},
			submit() {
				let _this = this
				if(!this.paymentType) {
					uni.showToast({
						title: "请选择支付方式",
						icon: "none"
					})
					return
				}
				if(this.paymentType == 'YE' && this.wallet < this.orderData.commodityPrice){
					uni.showToast({
						title: "余额不足，请充值，或者使用微信支付",
						icon: "none"
					})
					return
				}
				this.$u.api.createOrder({
					userId: uni.getStorageSync('userId'),
					shopId: this.orderData.shopId,
					merchantId: this.orderData.merchantId,
					commodityId: this.orderData.commodityId,
					commodityPrice: this.orderData.commodityPrice,
					carNumber: this.orderData.carNumber,
					scheduledTime: this.orderData.scheduledTime,
					orderType: this.orderData.orderType,
					paymentType: this.paymentType,
					openId: uni.getStorageSync("openid"),
					orderRemark: this.orderData.orderRemark
				}).then(res => {
					if(this.paymentType == "WX"){
						let orderId = res.orderId
						let appId = config.WX_appId
						let nonceStr = config.getNum()
						let prepay_id = 'prepay_id=' + res.prepayid
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
								console.log(res)
								_this.show = true
							},
							complete: function(res) {
								console.log(res);
							}
						})
					}
					if(this.paymentType == "YE"){
						_this.show = true
						setTimeout(()=>{
							uni.redirectTo({
								url: "../order/orderDetail/orderDetail?id=" + res.orderId
							})
						},1500)
					}
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
