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
						<u-input v-if="payType == 0 " v-model="orderData.commodityPrice" type="text"
							:custom-style="customStyle" :disabled="true" />
						<u-input v-else v-model="orderData.orderMoney" type="text" :custom-style="customStyle"
							:disabled="true" />
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
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in list" :key="item.value">
						<view class="u-flex u-col-center u-padding-top-12 u-padding-bottom-12">
							<radio :value="item.value" :checked="index === current" :disabled="item.disabled" style="transform:scale(0.7)" />
							<u-icon class="u-margin-left-16" name="shopping-cart"></u-icon>
							<text class="u-margin-left-12 u-font-26 color-333333">{{item.name}}</text>
							<view v-if="item.value == 'YE'" class="u-flex u-col-center">
								<text class="color-333333 u-font-22 u-margin-left-20">{{'可用余额：￥' + wallet}}</text>
								<view v-if="wallet < orderData.orderMoney || wallet < orderData.commodityPrice"
									@click="charge">
									<text class="color-FF2828 u-font-22 u-margin-left-60">充值</text>
								</view>
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
					<u-image src="/static/image/pay_success.png" width="120" height="120" mode="aspectFit"></u-image>
				</view>
				<view v-if="payType == 0" class="u-padding-top-30 color-333333 u-font-36 bold">
					<text>{{orderData.commodityPrice}}元支付成功</text>
				</view>
				<view v-else class="u-padding-top-30 color-333333 u-font-36 bold">
					<text>{{orderData.orderMoney}}元支付成功</text>
				</view>
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
					},
				],
				wallet: 0,
				orderData: {},
				payType: '',
				paymentType: "YE",
				current: 0,
			}
		},
		onShow() {
			this.getWaletDetail()
		},
		onLoad(data) {
			this.payType = data.payType
			if (data.payType == 2) {
				this.getOrderDetail(data.orderId)
			}
			this.orderData = data
		},
		methods: {
			get() {
				config.getSubscribeMessage()
			},
			getOrderDetail(id) {
				this.$u.api.getOrderDetail({
					orderId: id
				}).then(res => {
					this.orderData = JSON.parse(res)
				})
			},
			charge() {
				uni.navigateTo({
					url: '/pages/charge/charge?flag=1'
				})
			},
			radioChange(event) {
				this.paymentType = event.detail.value
			},
			getWaletDetail() {
				this.$u.api.getWaletDetail().then(res => {
					this.wallet = res.totalAmount
					if (this.wallet > this.orderData.orderMoney || this.wallet > this.orderData.commodityPrice) {
						this.current = 0
						this.paymentType = 'YE'
					} else {
						this.current = 1
						this.paymentType = 'WX'
					}
				})
			},
			submit() {
				let _this = this
				if (!this.paymentType) {
					uni.showToast({
						title: "请选择支付方式",
						icon: "none"
					})
					return
				}
				if (this.paymentType == 'YE' && (this.wallet < this.orderData.commodityPrice || this.wallet < this
						.orderData.orderMoney)) {
					uni.showToast({
						title: "余额不足，请充值，或者使用微信支付",
						icon: "none"
					})
					return
				}
				// 洗车订单支付
				if (this.payType == 0) {
					this.$u.api.createOrder({
						userId: uni.getStorageSync('userId'),
						shopId: this.orderData.shopId,
						merchantId: this.orderData.merchantId,
						commodityId: this.orderData.commodityId,
						commodityPrice: this.orderData.commodityPrice,
						carNumber: this.orderData.carNumber,
						carModel: this.orderData.carModel,
						userPhone: this.orderData.userPhone,
						scheduledTime: this.orderData.scheduledTime,
						orderType: this.orderData.orderType,
						paymentType: this.paymentType,
						openId: uni.getStorageSync("openid"),
						orderRemark: this.orderData.orderRemark
					}).then(res => {
						let orderId = res.orderId
						if (this.paymentType == "WX") {
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
								success: function() {
									_this.show = true
									let callback = function() {
										setTimeout(function() {
											uni.redirectTo({
												url: "/subPackages/booking/bookingDetail/bookingDetail?orderId=" +
													orderId
											})
										}, 1500)
									}
									config.getSubscribeMessage(callback)
								},
								complete: function(res) {
									console.log(res);
								}
							})
						}
						if (this.paymentType == "YE") {
							_this.show = true
							let callback = function() {
								setTimeout(function() {
									uni.redirectTo({
										url: "/subPackages/booking/bookingDetail/bookingDetail?orderId=" +
											orderId
									})
								}, 1500)
							}
							config.getSubscribeMessage(callback)
						}
					})
				}
				// 维修保养订单支付
				if (this.payType == 1) {
					this.$u.api.paymentOrder({
						orderId: this.orderData.orderId,
						openId: uni.getStorageSync("openid"),
						paymentType: this.paymentType
					}).then(res => {
						let orderId = res.orderId
						if (this.paymentType == "WX") {
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
									_this.show = true
									let callback = function() {
										setTimeout(function() {
											uni.redirectTo({
												url: "/subPackages/booking/bookingDetail/bookingDetail?orderId=" +
													orderId
											})
										}, 1500)
									}
									config.getSubscribeMessage(callback)
								},
								complete: function(res) {
									console.log(res);
								}
							})
						}
						if (this.paymentType == "YE") {
							_this.show = true
							let callback = function() {
								setTimeout(function() {
									uni.redirectTo({
										url: "/subPackages/booking/bookingDetail/bookingDetail?orderId=" +
											orderId
									})
								}, 1500)
							}
							config.getSubscribeMessage(callback)
						}
					})
				}

				// 洗车订重新支付
				if (this.payType == 2) {
					if (this.paymentType == "WX") {
						let orderId = this.orderData.id
						let appId = config.WX_appId
						let nonceStr = config.getNum()
						let prepay_id = 'prepay_id=' + this.orderData.prepayId
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
							success: function() {
								_this.show = true
								let callback = function() {
									setTimeout(function() {
										uni.redirectTo({
											url: "/subPackages/booking/bookingDetail/bookingDetail?orderId=" +
												orderId
										})
									}, 1500)
								}
								config.getSubscribeMessage(callback)
							},
							fail: function(res) {
								if ((new Date().getTime() - _this.orderData.createTime) > 7200000) {
									uni.showLoading({
										title: '订单支付超时',
										duration: 3000
									})
									_this.$u.api.setOrderStatus({
										orderId: _this.orderData.id,
										status: 'FAIL'
									}).then(res => {
										setTimeout(function() {
											uni.hideLoading()
											uni.navigateBack()
										}, 1000)
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: '请重新发起支付'
									})
								}
							},
							complete: function(res) {

							}
						})
					}
					if (this.paymentType == "YE") {
						this.$u.api.paymentOrder({
							orderId: this.orderData.id,
							openId: uni.getStorageSync("openid"),
							paymentType: this.paymentType
						}).then(res => {
							if (this.paymentType == "YE") {
								_this.show = true
								setTimeout(() => {
									uni.redirectTo({
										url: "/subPackages/booking/bookingDetail/bookingDetail?orderId=" +
											res.orderId
									})
								}, 1500)
							}
						})
					}
				}

				// 救援订单支付
				if (this.payType == 3) {
					this.$u.api.payRescueOrder({
						orderId: this.orderData.orderId,
						openId: uni.getStorageSync("openid"),
						paymentType: this.paymentType
					}).then(res => {
						let orderId = res.orderId
						if (this.paymentType == "WX") {
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
									let callback = function() {
										setTimeout(function() {
											uni.redirectTo({
												url: "/subPackages/rescue/rescue"
											})
										}, 1500)
									}
									config.getSubscribeMessage(callback)
								},
								complete: function(res) {
									console.log(res);
								}
							})
						}
						if (this.paymentType == "YE") {
							_this.show = true
							let callback = function() {
								setTimeout(function() {
									uni.redirectTo({
										url: "/subPackages/rescue/rescue"
									})
								}, 1500)
							}
							config.getSubscribeMessage(callback)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal-wrap {
		width: 492rpx;
		height: 320rpx;
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
