<template>
	<view>
		<view v-if="!upload">
			<view class="u-text-center u-font-28 color-999999 u-padding-top-30 u-padding-bottom-20">
				请上传实体行驶证，并录入信息
			</view>
			<view class="u-text-center u-font-22 color-FF2828  u-padding-bottom-30">
				(暂不支持新能源车牌，请手动添加。)
			</view>
			<view class="add-btn u-flex u-col-center u-row-center" @click="chooseImage">
				<u-image src="/static/image/add-car-bg.png" width="640" height="390"></u-image>
			</view>
			<view class="u-font-20 color-999999 u-flex u-col-center u-row-center u-margin-top-42 u-margin-bottom-20">
				<u-image src="/static/image/safe.png" width="30" height="30" mode="aspectFit"></u-image>
				<text class="u-margin-left-10">信息安全保护中，未经您的授权不对外提供</text>
			</view>
		</view>
		<view>
			<view class="info-wrap u-flex u-col-center">
				<u-icon name="error-circle-fill" size="30" color="#fd8a06"></u-icon>
				<text class="color-FD8A06 u-font-26 u-margin-left-10">如果信息识别有误，可手动进行修改</text>
			</view>
			<view v-for="(item,index) in carList" :key="index">
				<view class="u-flex bg-white u-margin-left-30 u-margin-top-30 u-margin-right-30">
					<view class="u-flex-7 u-flex u-padding-top-38 u-padding-bottom-28">
						<u-image class="u-margin-left-22 u-margin-right-30" src="/static/image/mycar.png" width="70"
							height="60" mode="scallToFill"></u-image>
						<text class="u-font-36 color-000000">{{item.carNumber}}</text>
					</view>
					<view
						class="u-flex-5 u-flex u-col-center u-row-center u-text-center edit-btn-wrap color-FFFFFF u-font-26">
						<view class="u-flex-6" @click="editCar(item)">
							<text
								class="u-padding-left-24 u-padding-top-10 u-padding-right-24 u-padding-bottom-10 edit-btn">
								修改
							</text>
						</view>
						<view class="u-flex-6" @click="delCar(item)">
							<text
								class="u-padding-left-24 u-padding-top-10 u-padding-right-24 u-padding-bottom-10 delete-btn">
								删除
							</text>
						</view>
					</view>
				</view>
				<view class="u-padding-left-30 u-padding-right-30">
					<u-line></u-line>
				</view>
				<view
					class="u-flex u-col-center u-margin-left-30 u-margin-right-30 u-padding-top-14 u-padding-bottom-14 u-padding-left-18 bg-white "
					@click="setDefaultCar(item)">
					<view :class="'check-wrap ' + ( item.status == 1 ? 'checked' : '')">
						<u-icon name="checkmark" size="32" color="#fff"></u-icon>
					</view>
					<view class="color-D1D1D1 u-font-26 u-margin-left-18" v-if="item.status == 0">
						设为默认
					</view>
					<view class="color-999999 u-font-26 u-margin-left-18" v-if="item.status == 1">
						默认车辆
					</view>
				</view>
			</view>
			<navigator url="/subPackages/myCar/addCar/addCar" hover-class="none">
				<view
					class="add-wrap u-flex u-col-center u-row-center u-padding-top-20 u-padding-bottom-20 u-margin-top-20 u-margin-bottom-20 u-margin-left-30 u-margin-right-30">
					<u-icon name="plus" color="#FFFFFF" size="30"></u-icon>
					<text class="color-FFFFFF u-font-30 u-margin-left-10">手动添加</text>
				</view>
			</navigator>
		</view>

		<u-popup v-model="show" mode="center" :border-radius="15" :mask-close-able="false">
			<view class="u-flex u-row-center u-col-center u-padding-left-30 u-padding-top-30 u-padding-right-30">
				<u-loading mode="flower"></u-loading>
				<text class="u-margin-left-12">正在识别，请稍等</text>
			</view>
		</u-popup>
		<u-modal v-model="show2" :content="errMsg"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				upload: true,
				carInfo: '',
				show: false, // 识别行驶证 loading 弹窗
				show2: false, // 绑定失败弹窗
				errMsg:'',
				driver: true,
				carList: [],
				baiduToken:''
			}
		},
		onShow() {
			this.getCar()
		},
		onLoad() {
			this.getDriver()
		},
		methods: {
			getToken() {
				this.$u.api.getBaiduAccessToken().then(res=>{
					this.baiduToken = res.access_token
				})
			},
			chooseImage() {
				let _this = this
				uni.chooseImage({
					count: 1, // 最多可以选择的图片张数，默认9
					sizeType: ['original'], //original 原图，compressed 压缩图，默认二者都有
					// sourceType: ['camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					success: function(res) {
						_this.show = true
						uni.showLoading({
							title: "正在识别..."
						})
						let file = res.tempFilePaths[0]
						uni.getFileSystemManager().readFile({
							filePath: file,
							encoding: 'base64',
							success: r => {
								_this.$u.api.baiduOCR({
									image: 'data:image/jpeg;base64,' + r.data,
									token: _this.baiduToken
								}).then(res => {
									_this.driver = res["words_result"]
									_this.carNumber = res["words_result"]["号牌号码"]["words"]
									_this.carModel = res["words_result"]["车辆类型"]["words"]
									_this.vehicleFrame = res["words_result"]["车辆识别代号"][
										"words"
									]
									_this.saveDriver()
								})
							}
						})

					}
				});
			},
			setDefaultCar(item) {
				if (item.status == 1) {
					return
				}
				this.$u.api.saveCar({
					userId: uni.getStorageSync("userId"),
					carId: item.id,
					status: 1,
				}).then(res => {
					if (res) {
						uni.setStorageSync('carModel', this.carModel)
						uni.setStorageSync('carNumber', this.carNumber)
						uni.setStorageSync('vehicleFrame', this.vehicleFrame)
						uni.showToast({
							title: '设置成功'
						})
						let _this = this
						setTimeout(function() {
							_this.getCar()
						}, 1500)
					} else {
						uni.showToast({
							title: '设置失败，请重试',
							icon: 'none'
						})
					}
				})
			},

			saveDriver() {
				this.$u.api.saveDriver({
					userId: uni.getStorageSync('userId'),
					name: this.driver["所有人"]["words"],
					carNumber: this.driver["号牌号码"]["words"],
					carModel: this.driver["车辆类型"]["words"],
					carBrand: this.driver["品牌型号"]["words"],
					fdjNumber: this.driver["发动机号码"]["words"],
					carSbNumber: this.driver["车辆识别代号"]["words"]
				}).then(res => {
					if (res.message && res.message.indexOf('认证') >= 0) {
						this.show = false
						this.errMsg = res.message
						this.show2 = true
					} else {
						this.saveNewCar()
					}
				})
			},
			getDriver() {
				this.$u.api.getDriver().then(res => {
					if(res){
						this.upload = true
					}else{
						this.upload = false
						this.getToken()
					}
				})
			},
			saveNewCar() {
				this.$u.api.saveCar({
					userId: uni.getStorageSync("userId"),
					carNumber: this.carNumber,
					vehicleFrame: this.vehicleFrame,
					carModel: this.carModel,
					status: 1
				}).then(res => {
					this.show = false
					if (res) {
						let _this = this
						uni.setStorageSync('carModel', this.carModel)
						uni.setStorageSync('carNumber', this.carNumber)
						uni.setStorageSync('vehicleFrame', this.vehicleFrame)
						uni.showToast({
							title: '添加成功',
							success: function() {
								if(!_this.upload){
									_this.getDriver()
								}
								_this.getCar()
							}
						})
					} else {
						console.log(res);
						uni.showToast({
							title: '添加失败，请重试',
							icon: 'none'
						})
					}
				})
			},
			getCar() {
				this.$u.api.getCar().then(res => {
					this.carList = res
					for (var i = 0; i < res.length; i++) {
						let ele = res[i]
						if(ele.status == 1) {
							uni.setStorageSync('carModel', ele.carModel)
							uni.setStorageSync('carNumber', ele.carNumber)
							uni.setStorageSync('vehicleFrame', ele.vehicleFrame)
						}
					}
				})
			},
			editCar(item) {
				uni.navigateTo({
					url: '/subPackages/myCar/addCar/addCar?data=' + JSON.stringify(item)
				})
			},
			delCar(item) {
				this.$u.api.delCar({
					carId: item.id
				}).then(res => {
					if (res) {
						this.getCar()
						uni.removeStorageSync('carModel')
						uni.removeStorageSync('carNumber')
						uni.removeStorageSync('vehicleFrame')
						uni.showToast({
							title: "删除成功"
						})
					} else {
						uni.showToast({
							title: "删除失败,请重试"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	view,
	text {
		line-height: 1;
	}

	.color-DCD9D9 {
		color: #dcd9d9;
	}

	.color-D1D1D1 {
		color: #d1d1d1;
	}

	.color-FD8A06 {
		color: #fd8a06;
	}

	.edit-btn-wrap {
		.edit-btn {
			border-radius: 40rpx;
			background-color: #fd8a06;
		}

		.delete-btn {
			border-radius: 40rpx;
			background-color: #d3d3d3;
		}
	}

	.info-wrap {
		background: #fcf1e5;
		padding: 24rpx 0 24rpx 30rpx;
	}

	.check-wrap {
		background: #FFFFFF;
		border-radius: 50%;
		padding: 5rpx;
		border: 2rpx solid rgb(226, 227, 228);
	}

	.checked {
		background: linear-gradient(-168deg, rgb(254, 78, 8) 0%, rgb(255, 137, 10) 100%);
	}

	.list-wrap {
		display: flex;

		.list-item {
			width: 236rpx;
			line-height: 65rpx;
			font-size: 26rpx;
			border-radius: 50rpx;
			color: #FFFFFF;
			text-align: center;
		}

		.gray {
			background-color: #cccccc;
		}

		.blue {
			background-color: #1672FF;
		}
	}
	
	.add-wrap {
		background: #1672FF;
		border-radius: 20rpx;
	}
</style>
