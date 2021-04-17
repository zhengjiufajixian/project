<template>
	<view>
		<u-gap height="20"></u-gap>
		<view
			class="u-flex u-padding-top-36 u-padding-right-28 u-padding-bottom-36 u-padding-left-28 u-margin-left-28 u-margin-right-28 bg-white ">
			<view class="">
				<u-avatar :src="shopInfo.shopImg" size="120"></u-avatar>
			</view>
			<view class="u-margin-left-20">
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
				<u-input v-model="userPhone" placeholder="请输入联系电话" type="text" />
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
		<view class="">
			<checkbox-group @change="getTotalPrice">
				<u-collapse :head-style="headStyle" hover-class="none">
					<u-collapse-item v-for="(item, index) in commodityList" :key="index">
						<view slot="title-all" class="u-flex-1">
							<view
								class="u-flex u-col-center u-row-between u-padding-top-10 u-padding-right-28 u-padding-bottom-10 u-padding-left-28 u-margin-left-28 u-margin-right-28 bg-white ">
								<view class="u-font-24 color-4A4A4A">{{item.commodityName}} <text
										class="u-margin-left-26 u-font-28 color-FF2828">{{"￥" + item.commodityPrice}}</text>
								</view>
								<view>
									<checkbox :value="JSON.stringify(item)" :checked="item.checked" color="#19BE6B" />
								</view>
							</view>
						</view>
						<view
							class="bg-white u-padding-left-52 u-padding-right-28 u-padding-bottom-28 u-margin-left-28 u-margin-right-28">
							<u-icon name="arrow-up" class="u-margin-left-50"></u-icon>
							<view class="u-flex u-col-center">
								<u-image :src="JSON.parse(item.commodityImg)[0]" width="117" height="72"></u-image>
								<text
									class="u-flex-1 u-margin-left-28 u-font-20 color-999999">{{item.commodityRemark}}</text>
							</view>
						</view>
					</u-collapse-item>
				</u-collapse>
			</checkbox-group>

			<!-- 	<checkbox-group @change="getTotalPrice">
				<view v-for="(item,index) in commodityList" :key="index">
					<view class="u-flex u-col-center u-row-between u-padding-top-10 u-padding-right-28 u-padding-bottom-10 u-padding-left-28 u-margin-left-28 u-margin-right-28 bg-white ">
						<view class="u-font-24 color-4A4A4A">{{item.commodityName}} <text class="u-margin-left-26 u-font-28 color-FF2828">{{"￥" + item.commodityPrice}}</text></view>
						<view>
							<checkbox :value="JSON.stringify(item)" :checked="item.checked" color="#19BE6B" />
						</view>
					</view>
				</view>
			</checkbox-group> -->
			<u-line color="#F3F4F7"></u-line>
			<view
				class="u-text-right u-padding-top-10 u-padding-right-28 u-padding-bottom-10 u-padding-left-28 u-margin-left-28 u-margin-right-28 bg-white ">
				<text class="u-font-26 color-FF2828">合计: ￥{{commodityPrice}}</text>
			</view>
			<u-gap height="150"></u-gap>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="submit">预约下单</u-button>
		</view>

		<view v-if="isBindCar">
			<!-- <movable-area>
				<movable-view direction="vertical" y="150"> -->
			<view class="fixed-btn u-padding-left-30 u-padding-right-40">
				<navigator class="u-flex" url="/subPackages/myCar/myCar" hover-class="none">
					<u-icon name="plus" color="#FF2828"></u-icon>
					<text class="u-font-26 color-384AFF u-margin-left-20">添加车辆</text>
				</navigator>
			</view>
			<!-- </movable-view>
			</movable-area> -->
		</view>

		<u-picker v-model="show" mode="time" :params="params" @confirm="pickerConfirm"></u-picker>
		<u-action-sheet :list="actionSheetList" v-model="listStatus" @click="actionSheetCallback"></u-action-sheet>
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
				actionSheetList: config.actionSheetList
			}
		},
		onShow() {
			if(!this.userPhone){
				this.userPhone = uni.getStorageSync('userPhone')
			}
			this.carNumber = uni.getStorageSync('carNumber')
			this.carModel = uni.getStorageSync('carModel')
			this.isBindCar = !Boolean(uni.getStorageSync('carNumber'))
			this.page = 0
			this.getTypeList()
		},
		onLoad(option) {
			this.shopInfo = JSON.parse(option.data)
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
					price += (Number(ele.commodityPrice) * 100)
					commodityId.push(ele.id)
				}
				this.commodityPrice = price / 100
				this.commodityId = commodityId
			},
			pickerConfirm(obj) {
				let time = obj.year + "-" + obj.month + "-" + obj.day + " " + obj.hour + ":" + obj.minute + ":00"
				this.scheduledTime = time
			},
			submit() {
				if (!this.userPhone) {
					uni.showToast({
						title: "请输入联系电话",
						icon: "none"
					})
					return
				}
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
				if (this.commodityId.length == 0) {
					uni.showToast({
						title: "请选择服务项目",
						icon: "none"
					})
					return
				}
				uni.navigateTo({
					url: "../pay/pay?payType=0&shopId=" + this.shopInfo.id +
						"&merchantId=" + this.shopInfo.merchantId +
						"&commodityId=" + this.commodityId +
						"&commodityPrice=" + this.commodityPrice +
						"&carNumber=" + this.carNumber +
						"&carModel=" + this.carModel +
						"&userPhone=" + this.userPhone +
						"&scheduledTime=" + new Date(this.scheduledTime.replace(/-/g, '/')).getTime() +
						"&orderType=" + this.commodityType +
						"&orderRemark=" + this.orderRemark
				})
			}
		}
	}
</script>

<style lang="scss">
	.fixed-btn {
		position: fixed;
		right: 0;
		top: 340rpx;
		width: 240rpx;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60rpx;
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

	.btn-wrap {
		position: fixed;
		width: 80%;
		left: 50%;
		bottom: 30rpx;
		transform: translateX(-50%);
	}
</style>
