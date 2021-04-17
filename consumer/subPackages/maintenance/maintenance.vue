<template>
	<view>
		<u-gap height="20"></u-gap>
		<view
			class="u-flex u-padding-top-28 u-padding-right-28 u-padding-bottom-28 u-padding-left-28 u-margin-left-28 u-margin-right-28 bg-white ">
			<view class="">
				<u-avatar :src="shopInfo.shopImg" size="120"></u-avatar>
			</view>
			<view class="u-margin-left-28">
				<view class="">
					<text class="u-font-30 color-333333 u-line-1">{{shopInfo.shopName}}</text>
				</view>
				<view>
					<u-rate v-model="shopInfo.shopRating" disabled></u-rate> {{shopInfo.shopRating + '分'}}
				</view>
				<view class="u-flex color-666666 u-font-30">
					<!-- <view class="">
						<u-icon name="file-text-fill" color="#30C0FE"></u-icon>
						<text>{{shopInfo.goodsCount}}单</text>
					</view> -->
					<view class="">
						<u-icon name="map-fill" color="#FFC617"></u-icon>
						<text>{{getDistance()}}</text>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="10"></u-gap>
		<view
			class="u-flex u-padding-top-10 u-padding-right-28 u-padding-bottom-10 u-padding-left-28 u-margin-left-28 u-margin-right-28 bg-white ">
			<u-icon name="phone-fill" size="40" color="#06df9e" class="u-margin-right-16"></u-icon>
			<view class="u-flex-1">
				<u-input v-model="userPhone" type="text" />
			</view>
		</view>
		<u-gap height="10"></u-gap>
		<view
			class="u-flex u-padding-top-10 u-padding-right-28 u-padding-bottom-10 u-padding-left-28 u-margin-left-28 u-margin-right-28 bg-white ">
			<u-icon name="car-fill" size="40" color="#febe41" class="u-margin-right-16"></u-icon>
			<view class="u-flex-1">
				<u-input v-model="carNumber" type="text" placeholder="您的车牌号" />
			</view>
		</view>
		<u-gap height="10"></u-gap>
		<view
			class="u-flex u-padding-top-10 u-padding-right-28 u-padding-bottom-10 u-padding-left-28 u-margin-left-28 u-margin-right-28 bg-white "
			@click="listStatus=true">
			<u-icon name="car" size="40" color="#febe41" class="u-margin-right-16"></u-icon>
			<view class="u-flex-1 u-padding-top-15 u-padding-bottom-15">
				{{carModel?carModel:'请选择车型'}}
			</view>
		</view>
		<u-gap height="10"></u-gap>
		<view
			class="u-flex u-padding-top-10 u-padding-right-28 u-padding-bottom-10 u-padding-left-28 u-margin-left-28 u-margin-right-28 bg-white"
			@click="show=true">
			<u-icon name="clock-fill" size="40" color="#ff6258" class="u-margin-right-16"></u-icon>
			<view class="u-flex-1 u-padding-top-15 u-padding-bottom-15">{{scheduledTime}}</view>
		</view>
		<u-gap height="10"></u-gap>
		<view
			class="u-flex u-padding-top-10 u-padding-right-28 u-padding-bottom-10 u-padding-left-28 u-margin-left-28 u-margin-right-28 bg-white "
			style="min-height: 90rpx;">
			<u-icon name="file-text-fill" size="40" color="#18e3a6" class="u-margin-right-16"></u-icon>
			<view class="u-flex-1">
				<u-input v-model="orderRemark" custom-style="{min-height:'auto'}" type="textarea" placeholder="请输入备注" />
			</view>
		</view>
		<u-gap height="10"></u-gap>

		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="submit">预约下单</u-button>
			<view class="color-999999 u-font-26 u-text-center u-margin-top-30">注：预约下单后，等待商家确认</view>
		</view>

		<u-picker v-model="show" mode="time" :params="params" @confirm="pickerConfirm"></u-picker>
		<u-action-sheet :list="actionSheetList" v-model="listStatus" @click="actionSheetCallback"></u-action-sheet>

		<u-mask :show="bookingSuccessStatus">
			<view class="modal-wrap u-text-center bg-white">
				<view class="u-padding-top-66 u-flex u-row-center">
					<u-image src="/static/image/pay_success.png" width="120" height="120" mode="aspectFit"></u-image>
				</view>
				<view class="u-padding-top-30 color-333333 u-font-36 bold"><text>订单预约成功</text></view>
			</view>
		</u-mask>

		<view v-if="isBindCar">
			<movable-area>
				<movable-view direction="vertical" y="150">
					<view class="u-padding-left-30 u-padding-right-40">
						<navigator class="u-flex" url="/subPackages/myCar/myCar" hover-class="none">
							<u-icon name="plus" color="#FF2828"></u-icon>
							<text class="u-font-26 color-384AFF u-margin-left-20">添加车辆</text>
						</navigator>
					</view>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script>
	import * as config from "../../common/config.js"
	import md5Libs from "uview-ui/libs/function/md5"

	export default {
		data() {
			return {
				count: 4,
				value: 2,
				show: false,
				bookingSuccessStatus: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				userPhone: "",
				carNumber: '',
				carModel: '',
				isBindCar: false,
				select: false,
				shopInfo: {},
				commodityType: '',
				commodityList: [],
				commodityPrice: 0,
				commodityId: [],
				scheduledTime: "选择服务时间",
				orderRemark: "",
				page: 0,

				headStyle: {
					padding: 0
				},

				listStatus: false,
				actionSheetList: [{
					text: '微型车'
				}, {
					text: '小型车'
				}, {
					text: '紧凑型车'
				}, {
					text: '中型车'
				}, {
					text: '中大型车'
				}, {
					text: '豪华车'
				}],

				isWx: 0,
				isBy: 0
			}
		},
		onShow() {
			this.carNumber = uni.getStorageSync('carNumber')
			this.userPhone = uni.getStorageSync('userPhone')
			this.carModel = uni.getStorageSync('carModel')
			this.isBindCar = !Boolean(uni.getStorageSync('carNumber'))
		},
		onLoad(option) {
			this.isWx = option.isWx == 1 ? 1 : 0
			this.isBy = option.isBy == 1 ? 1 : 0
			if (this.isBy == 1) {
				uni.setNavigationBarTitle({
					title: '保养预约'
				})
			}
			if (this.isWx == 1) {
				uni.setNavigationBarTitle({
					title: '维修预约'
				})
			}
			this.shopInfo = JSON.parse(option.data)
			this.getTypeList()
		},
		methods: {
			actionSheetCallback(index) {
				this.carModel = this.actionSheetList[index].text;
			},
			getDistance() {
				return config.getDistance(this.shopInfo.latitude, this.shopInfo.longitude, uni.getStorageSync("latitude"),
					uni.getStorageSync(
						"longitude"))
			},
			getCar() {
				this.$u.api.getCar().then(res => {
					this.carNumber = res.carNumber
				})
			},
			getBtnStatus() {
				return !(this.carNumber && this.scheduledTime != "选择服务时间" && this.commodityId.length > 0)
			},

			setPage(page, params) {
				uni.navigateTo({
					url: '/pages/' + page + "/" + page + "?data=" + JSON.stringify(params),
				});
			},
			getTypeList() {
				this.$u.api.getTypeList().then(res => {
					for (let i = 0; i < res.length; i++) {
						let type = res[i]
						if (type.typeName == "洗车") {
							this.commodityType = type.typeCode
						}
					}
					this.getCommodityList()
				})
			},
			getCommodityList() {
				this.page++
				this.$u.api.getCommodityList({
					page: this.page,
					shopId: this.shopInfo.id,
					commodityType: this.commodityType
				}).then(res => {
					this.commodityList = res
				})
			},
			getTotalPrice(data) {
				let detail = data.detail.value
				let commodityId = []
				let price = 0

				for (let i = 0; i < detail.length; i++) {
					let ele = JSON.parse(detail[i])
					price += Number(ele.commodityPrice)
					commodityId.push(ele.id)

				}
				this.commodityPrice = price
				this.commodityId = commodityId
			},
			pickerConfirm(obj) {
				let time = obj.year + "-" + obj.month + "-" + obj.day + " " + obj.hour + ":" + obj.minute + ":00"
				this.scheduledTime = time
			},
			submit() {
				if (!this.carNumber) {
					uni.showToast({
						title: "请输入车牌号",
						icon: "none"
					})
					return
				}
				if (this.scheduledTime == "选择服务时间") {
					uni.showToast({
						title: "请选择服务时间",
						icon: "none"
					})
					return
				}
				this.$u.api.createBYOrder({
					userId: uni.getStorageSync('userId'),
					shopId: this.shopInfo.id,
					merchantId: this.shopInfo.merchantId,
					carNumber: this.carNumber,
					scheduledTime: new Date(this.scheduledTime.replace(/-/g, '/')).getTime(),
					orderType: this.isBy == 1 ? "BY" : "WX",
					orderRemark: this.orderRemark,
					userPhone: this.userPhone,
					carModel: this.carModel
				}).then(res => {
					this.bookingSuccessStatus = true
					let _this = this
					setTimeout(() => {
						_this.bookingSuccessStatus = false
						uni.navigateTo({
							url: '/subPackages/booking/booking'
						})
					}, 1500)
				})
			}
		}
	}
</script>

<style lang="scss">
	movable-area {
		position: fixed;
		right: 0;
		top: 0;
		height: 100%;
		width: 240rpx;
		z-index: 100;
	}

	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60rpx;
		width: 100%;
		background-color: rgb(255, 255, 255);
		box-shadow: 0 0 16rpx 1rpx rgba(22, 114, 255, 0.19);
		line-height: 60rpx;
		border-radius: 40rpx 0 0 40rpx;
	}

	checkbox-group {
		width: 100%;
	}

	.u-input__textarea {
		min-height: auto !important;
	}

	.modal-wrap {
		width: 492rpx;
		height: 320rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.btn-wrap {
		position: fixed;
		width: 80%;
		left: 50%;
		bottom: 150rpx;
		transform: translateX(-50%);
	}
</style>
