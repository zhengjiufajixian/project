<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="bg-white u-padding-left-30 u-padding-right-30">
			<view class="u-font-26 color-999999 u-padding-top-36 u-margin-bottom-20">输入车牌号</view>
			<view class="u-flex u-col-center input-wrap u-text-center" @click="show=true">
				<view :class="'input-item ' + (carNumber.length == 0 && show ? 'active':'')">{{carNumber[0]}}</view>
				<view :class="'input-item ' + (carNumber.length == 1 && show ? 'active':'')">{{carNumber[1]}}</view>
				<view class="dot"></view>
				<view :class="'input-item ' + (carNumber.length == 2 && show ? 'active':'')">{{carNumber[2]}}</view>
				<view :class="'input-item ' + (carNumber.length == 3 && show ? 'active':'')">{{carNumber[3]}}</view>
				<view :class="'input-item ' + (carNumber.length == 4 && show ? 'active':'')">{{carNumber[4]}}</view>
				<view :class="'input-item ' + (carNumber.length == 5 && show ? 'active':'')">{{carNumber[5]}}</view>
				<view :class="'input-item ' + (carNumber.length == 6 && show ? 'active':'')">{{carNumber[6]}}</view>
				<view :class="'input-item ' + (carNumber.length == 7 && show ? 'active':'')">{{carNumber[7]}}</view>
			</view>
			<!-- <view class="u-font-26 color-999999 u-margin-top-44">车架号</view>
			<view>
				<u-input type="text" v-model="vehicleFrame" placeholder="请输入车架号"></u-input>
			</view> -->
			<u-line color="#eff3f7"></u-line>
			<view class="u-margin-top-38" @click="listStatus=true">
				<view class="u-font-26 color-999999">车型</view>
				<view class="u-flex u-row-between ">
					<text class="color-666666 u-font-28 u-padding-top-30 u-padding-bottom-30">{{carModel?carModel:'请选择车型'}}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="u-flex u-col-center u-row-between u-padding-top-20 u-padding-bottom-20">
				<text>设为默认</text>
				<u-switch v-model="checked"></u-switch>
			</view>
		</view>
		<view class="btn-wrap" @click="saveCar">{{'确认' + btnText}}</view>

		<u-keyboard ref="uKeyboard" mode="car" v-model="show" @change="valChange" @backspace="backspace"></u-keyboard>
		<u-action-sheet :list="actionSheetList" v-model="listStatus" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	import * as config from '../../../common/config.js'
	export default {
		data() {
			return {
				checked: true,
				show: false,
				carNumber: '',
				vehicleFrame: '',
				carModel: '',
				listStatus: false,
				actionSheetList: config.actionSheetList,
				btnText: '添加',
				
			}
		},
		onLoad(params) {
			if (params.data) {
				let data = JSON.parse(params.data)
				uni.setNavigationBarTitle({
					title: '修改车辆'
				})
				this.carNumber = data.carNumber
				this.vehicleFrame = data.vehicleFrame
				this.carModel = data.carModel
				this.carId = data.id
				this.checked = data.status == 0 ? false : true
				this.btnText = '修改'
			}

		},
		methods: {
			valChange(val) {
				if (this.carNumber.length > 7) {
					return
				}
				this.carNumber += val;
			},
			// 退格键被点击
			backspace() {
				if (this.carNumber.length) this.carNumber = this.carNumber.substr(0, this.carNumber.length - 1);
				console.log(this.carNumber);
			},
			actionSheetCallback(index) {
				this.carModel = this.actionSheetList[index].text;
			},
			saveCar() {
				if (!this.carNumber) {
					uni.showToast({
						title: '请填写车牌号',
						icon: 'none'
					})
					return
				}
				// if (!this.vehicleFrame) {
				// 	uni.showToast({
				// 		title: '请填写车架号',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				if (!this.carModel) {
					uni.showToast({
						title: '请选择车型',
						icon: 'none'
					})
					return
				}
				let body = {
					userId: uni.getStorageSync("userId"),
					carNumber: this.carNumber,
					vehicleFrame: this.vehicleFrame,
					carModel: this.carModel,
					status: this.checked ? 1 : 0,
				}
				if(this.carId){
					body.carId = this.carId
				}
				this.$u.api.saveCar(body).then(res => {
					if (res) {
						uni.setStorageSync('carModel', this.carModel)
						uni.setStorageSync('carNumber', this.carNumber)
						uni.setStorageSync('vehicleFrame', this.vehicleFrame)
						uni.showToast({
							title: this.btnText + '成功',
							success: () => {
								setTimeout(function() {
									uni.navigateBack()
								}, 1500)
							}
						})
					} else {
						console.log(res);
						uni.showToast({
							title: this.btnText + '失败，请重试',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.input-wrap {
		display: flex;

		.input-item {
			width: 74rpx;
			height: 90rpx;
			line-height: 90rpx;
			border: 1rpx solid #c0c0c0;
			border-radius: 10rpx;
			margin-right: 10rpx;
		}

		.active {
			border-color: $uni-color-primary;
		}

		.dot {
			width: 10rpx;
			height: 10rpx;
			background-color: #c0c0c0;
			border-radius: 50%;
			margin: 0 26rpx 0 13rpx;
		}
	}

	.btn-wrap {
		background-color: $uni-color-primary;
		color: #FFFFFF;
		font-size: 34rpx;
		border-radius: 20rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 107rpx 30rpx 0;
	}
</style>
