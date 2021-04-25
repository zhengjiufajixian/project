<template>
	<view>
		<view>
			<swiper class="swiper" v-if="getChecked()">
				<swiper-item v-for="(item,index) in JSON.parse(getChecked().commodityImgList)" :key="index">
					<view v-if="item.type=='img'" class="">
						<u-image :src="item.link" width="100%" height="600" mode="aspectFit"></u-image>
					</view>
					<view v-if="item.type=='video'" class="u-flex u-row-center u-col-center" style="height: 100%;">
						<video :src="item.link" style="width: 100%;"></video>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="u-flex u-padding-left-20 u-padding-right-20 u-margin-top-20">
			<view class="color-FF2828">
				<text class="u-font-24">￥</text>
				<text class="u-font-36">{{getChecked().money}}</text>
			</view>
			<!-- <view class="activity-wrap u-font-24 color-FF2828">
				活动商品
			</view>
			<view class="activity-wrap u-font-24 color-FF2828">
				活动商品
			</view> -->
		</view>

		<view class="u-line-2 u-padding-left-20 u-padding-right-20 u-padding-top-40 u-font-30">
			<text>{{getChecked().commodityName}}</text>
		</view>

		<view class="u-line-2 u-padding-left-20 u-padding-right-20 u-padding-top-20 u-font-24 color-FF2828">
			<text>{{getChecked().introduction}}</text>
		</view>
		<view class="u-margin-top-20">
			<u-gap height="20" bg-color="#f3f4f7"></u-gap>
		</view>
		<view class="u-flex u-padding-20" @click="show=true">
			<view class="bold">已选</view>
			<view class="u-margin-left-20" v-if="getChecked()">
				{{getChecked().s_value_1?getChecked().s_value_1:''}}
				{{getChecked().s_value_2?getChecked().s_value_2:''}}
				{{getChecked().s_value_3?getChecked().s_value_3:''}}
			</view>
		</view>
		<u-gap height="20" bg-color="#f3f4f7"></u-gap>
		<view class="u-padding-20 u-flex u-row-between" style="background-color: #e2f4ff;" @click="show2=true">
			<view class="u-flex">
				<view class="u-margin-left-20">
					<u-icon name="checkmark-circle" size="26" color="#2d9cba"></u-icon>
					<text class="color-000000 u-font-26 u-margin-left-6" style="color: #2d9cba;" >全正品</text>
				</view>
				<view class="u-margin-left-20">
					<u-icon name="checkmark-circle" size="26" color="#2d9cba"></u-icon>
					<text class="color-000000 u-font-26 u-margin-left-6" style="color: #2d9cba;" >七天无理由退货</text>
				</view>
				<view class="u-margin-left-20">
					<u-icon name="checkmark-circle" size="26" color="#2d9cba"></u-icon>
					<text class="color-000000 u-font-26 u-margin-left-6" style="color: #2d9cba;" >放心购</text>
				</view>
			</view>
			<view class="u-flex">
				<view class="dot dot-small"></view>
				<view class="dot dot-big"></view>
				<view class="dot dot-small"></view>
			</view>
		</view>
		<u-gap height="20" bg-color="#f3f4f7"></u-gap>
		<view class="u-margin-left-20 u-margin-right-20 u-padding-bottom-20" v-if="getChecked()">
			<view class="u-padding-top-20 u-padding-bottom-20">规格参数</view>
			<view class="u-flex u-border u-font-24" v-for="(item,index) in JSON.parse(getChecked().specifications)" :key="index">
				<view style="background: #d3d3d3;width: 200rpx;padding: 20rpx;">
					{{index}}
				</view>
				<view style="padding: 20rpx;">
					{{item}}
				</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#f3f4f7"></u-gap>
		
		<view class="u-margin-left-20 u-margin-right-20 u-padding-bottom-20" v-if="getChecked()">
			<view class="u-padding-top-20 u-padding-bottom-20">商品详情</view>
			<view style="font-size: 0;">
				<u-image v-for="(item,index) in JSON.parse(getChecked().detail)" @click="previewImage(item)" :key="index" :src="item" width="100%" mode="widthFix"></u-image>
			</view>
		</view>
		
		<u-popup v-model="show" mode="bottom">
			<view class="u-padding-left-20 u-padding-bottom-40 u-padding-right-20">
				<view class="u-margin-top-20 u-margin-bottom-10">价格</view>
				<view>
					{{ getChecked().money}}
				</view>
				<view v-if="list1">
					<view class="u-margin-top-20 u-margin-bottom-10">{{list1Name}}</view>
					<view>
						<view class="list-btn" v-for="(item,index) in list1" :key="index"
							@click="selectedList1(item)"
							:class="disabledList1.indexOf(item) == -1 ? 'disabled' : getChecked().s_value_1 == item ? 'active':''">
							{{item}}
						</view>
					</view>
				</view>
				<view v-if="list2">
					<view class="u-margin-top-20 u-margin-bottom-10">{{list2Name}}</view>
					<view>
						<view class="list-btn" v-for="(item,index) in list2" :key="index"
							@click="selectedList2(item)"
							:class="disabledList2.indexOf(item) == -1 ? 'disabled' : getChecked().s_value_2 == item ? 'active':''">
							{{item}}
						</view>
					</view>
				</view>
				<view v-if="list3">
					<view class="u-margin-top-20 u-margin-bottom-10">{{list3Name}}</view>
					<view>
						<view class="list-btn" v-for="(item,index) in list3" :key="index"
							@click="selectedList3(item)"
							:class="disabledList3.indexOf(item) == -1 ? 'disabled' : getChecked().s_value_3 == item ? 'active':''">
							{{item}}
						</view>
					</view>
				</view>
				<view class="u-flex u-row-between u-padding-top-20 u-padding-bottom-20">
					<view>数量</view>
					<u-number-box v-model="value" min="1"></u-number-box>
				</view>
			</view>
		</u-popup>

		<u-popup v-model="show2" mode="bottom" :closeable="true">
			<view style="height: 650rpx;">
				<view class="u-text-center u-padding-28">服务</view>
				<u-line></u-line>
				<view class="u-padding-20">
					<view>
						<u-icon name="checkmark-circle" size="26" color="#e7ce3e"></u-icon>
						<text class="color-000000 u-font-26 u-margin-left-14" >全正品</text>
					</view>
					<view>
						<text class="u-font-22 color-999999 u-margin-left-40">各大厂商，直接供货</text>
					</view>
				</view>
				<view class="u-padding-20">
					<view>
						<u-icon name="checkmark-circle" size="26" color="#e7ce3e"></u-icon>
						<text class="color-000000 u-font-26 u-margin-left-14" >全正品</text>
					</view>
					<view>
						<text class="u-font-22 color-999999 u-margin-left-40">各大厂商，直接供货</text>
					</view>
				</view>
				<view class="u-padding-20">
					<view>
						<u-icon name="checkmark-circle" size="26" color="#e7ce3e"></u-icon>
						<text class="color-000000 u-font-26 u-margin-left-14" >全正品</text>
					</view>
					<view>
						<text class="u-font-22 color-999999 u-margin-left-40">各大厂商，直接供货</text>
					</view>
				</view>
				<view class="u-padding-20">
					<view>
						<u-icon name="checkmark-circle" size="26" color="#e7ce3e"></u-icon>
						<text class="color-000000 u-font-26 u-margin-left-14" >全正品</text>
					</view>
					<view>
						<text class="u-font-22 color-999999 u-margin-left-40">各大厂商，直接供货</text>
					</view>
				</view>
			</view>
		</u-popup>
		<view class="navigation">
			<view class="left">
				<navigator url="/subPackages/contact/contact" class="item">
					<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
				</navigator>
				<view class="item car">
					<u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
		<!-- <view class="new-boxshadow u-margin-20" :class="click?'click':''" @click="handleClick">

		</view> -->
		<u-gap height="200"></u-gap>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				commidityData: [],
				sizeList: [],
				colorList: [],
				activeSize: '',
				sizeDisabled: [],
				activeColor: '',
				colorDisabled: [],
				click: false,
				show: false,
				show2: false,
				detail: null,
				commidityList: [],
				list1: [],
				disabledList1: [],
				list1Name: '',
				list2: [],
				disabledList2: [],
				list2Name: '',
				list3: [],
				disabledList3: [],
				list3Name: '',
				value:1
			};
		},
		onLoad(params) {
			this.id = params.id
			this.getScCommodityInfo()
		},
		methods: {
			previewImage(item) {
				console.log(item);
			},
			getChecked() {
				let res = this.commidityList
				for (var i = 0; i < res.length; i++) {
					let obj = res[i]
					if (obj.checked == true) {
						return obj
					}
				}
			},
			getScCommodityInfo() {
				this.$u.api.getScCommodityInfo({
					id: this.id
				}).then(res => {
					let list1 = []
					let list1Name = ''
					let list2 = []
					let list2Name = ''
					let list3 = []
					let list3Name = ''
					for (var i = 0; i < res.length; i++) {
						let obj = res[i]
						if (obj.id == this.id) {
							obj.checked = true
						} else {
							obj.checked = false
						}
						if (obj.s_value_1 && list1.indexOf(obj.s_value_1) == -1) {
							list1Name = obj.s_1
							list1.push(obj.s_value_1)
						}
						if (obj.s_value_2 && list2.indexOf(obj.s_value_2) == -1) {
							list2Name = obj.s_2
							list2.push(obj.s_value_2)
						}
						if (obj.s_value_3 && list3.indexOf(obj.s_value_3) == -1) {
							list3Name = obj.s_3
							list3.push(obj.s_value_3)
						}
					}
					this.list1 = list1
					this.list1Name = list1Name
					this.list2 = list2
					this.list2Name = list2Name
					this.list3 = list3
					this.list3Name = list3Name
					this.commidityList = res

					this.getDisabledList1()
					this.getDisabledList2()
					// this.getDisabledList3()
				})
			},
			getDisabledList1() {
				let res = this.commidityList
				let checked = this.getChecked()

				let disabledList1 = []
				for (var i = 0; i < res.length; i++) {
					let obj = res[i]
					if (checked.s_value_2 == obj.s_value_2 && disabledList1.indexOf(obj.s_value_2) == -1) {
						disabledList1.push(obj.s_value_1)
					}
				}
				this.disabledList1 = disabledList1
			},
			getDisabledList2() {
				let res = this.commidityList
				let checked = this.getChecked()

				let disabledList2 = []
				for (var i = 0; i < res.length; i++) {
					let obj = res[i]
					if (checked.s_value_1 == obj.s_value_1 && disabledList2.indexOf(obj.s_value_1) == -1) {
						disabledList2.push(obj.s_value_2)
					}
				}
				this.disabledList2 = disabledList2
			},
			// getDisabledList3() {
			// 	let res = this.commidityList
			// 	let checked = this.getChecked()

			// 	let disabledList3 = []
			// 	for (var i = 0; i < res.length; i++) {
			// 		let obj = res[i]
			// 		if (checked.s_value_1 == obj.s_value_1 && disabledList2.indexOf(obj.s_value_1) == -1) {
			// 			disabledList2.push(obj.s_value_2)
			// 		}
			// 	}
			// 	this.disabledList2 = disabledList2
			// },
			handleClick() {
				this.click = true
				let _this = this
				setTimeout(function() {
					_this.click = false
				}, 200)
			},
			selectedList1(item) {
				if (this.disabledList1.indexOf(item) == -1) {
					return
				}
				let res = this.commidityList
				let checked = this.getChecked()
				for (var i = 0; i < res.length; i++) {
					if (res[i].s_value_1 == item && res[i].s_value_2 == checked.s_value_2) {
						res[i].checked = true
					} else {
						res[i].checked = false
					}
				}
				this.commidityList = res
				this.getDisabledList2()
			},
			selectedList2(item) {
				if (this.disabledList2.indexOf(item) == -1) {
					return
				}
				let res = this.commidityList
				let checked = this.getChecked()
				for (var i = 0; i < res.length; i++) {
					if (res[i].s_value_2 == item && res[i].s_value_1 == checked.s_value_1) {
						res[i].checked = true
					} else {
						res[i].checked = false
					}
				}
				this.commidityList = res
				this.getDisabledList1()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.swiper {
		height: 600rpx;
	}

	.navigation {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		justify-content: space-evenly;

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 30rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
	}

	.activity-wrap {
		display: inline-block;
		padding: 5rpx 10rpx;
		background: #ffd2d3;
		border-radius: 5rpx;
		margin-left: 20rpx;
	}
	
	.list-btn {
		display: inline-block;
		margin-right: 20rpx;
		margin-top: 20rpx;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		background-color: #f6f6f6;
		border: 1rpx solid #f6f6f6;
	}
	
	.active {
		border: 1rpx solid #f20000;
		background-color: #ffcfcf;
		color: #f20000;
	}

	.disabled {
		background-color: gray;
	}

	.new-boxshadow {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		border-radius: 10px;
		background: linear-gradient(145deg, #f0f0f0, #cacaca);
		box-shadow: 4px 4px 8px #bebebe,
			-4px -4px 8px #ffffff;
		transition: all 0.1s;

		&.click {
			background: linear-gradient(145deg, #cacaca, #f0f0f0);
		}
	}
	
	.dot {
		display: inline-block;
		border-radius: 50%;
		background-color: #2d9cba;
		&.dot-small {
			width: 8rpx;
			height: 8rpx;
		}
		&.dot-big {
			width: 15rpx;
			height: 15rpx;
			margin-left: 2rpx;
			margin-right: 2rpx;
		}
	}
	
	
</style>
