<template>
	<view class="wrap">
		<u-gap height="25"></u-gap>
		<view class="u-flex u-col-center u-row-between u-padding-top-24 u-padding-left-20 u-padding-bottom-24 u-padding-right-20 type-item">
			<text class="color-333333 u-font-26 bold">产品类型</text>
			<view class="u-flex-1 u-text-right" @click="show=true">
				<text class="u-margin-right-20 color-999999 u-font-26">{{commodityTypeName?commodityTypeName:'去设置'}}</text>
				<u-icon name="arrow-right" size="32"></u-icon>
			</view>
		</view>
		<u-gap height="10"></u-gap>
		<view class="img-item u-padding-bottom-30">
			<view class="u-flex u-col-center u-row-between u-padding-left-20 u-padding-right-20">
				<text class="color-333333 u-font-26 bold">产品名称</text>
				<view class="u-flex-1 u-margin-left-20">
					<u-input :custom-style="fz26" v-model="commodityName" type="text" placeholder="请输入详细名称" />
				</view>
			</view>
			<u-line color="#f3f4f7" />
			<u-upload :action="action" :form-data="formData" :header="haeder" :beforeUpload="beforeUpload" @on-success="addCommodityImgList" @on-remove="removeCommodityImgList"
			 max-count="3"></u-upload>
			<view class=" u-padding-left-20 u-padding-right-20">
				<text class="color-999999 u-font-22">*默认第一张为主图</text>
			</view>
		</view>
		<u-gap height="10"></u-gap>
		<view class="u-flex u-col-center u-row-between u-padding-left-20 u-padding-right-20 type-item">
			<text class="color-333333 u-font-26 bold">产品单价</text>
			<view class="u-flex-1 u-margin-left-20">
				<u-input :custom-style="fz26" v-model="commodityPrice" type="digit" placeholder="请输入价格" />
			</view>
		</view>
		<u-gap height="10"></u-gap>
		<view class="u-padding-top-24 u-padding-left-20 u-padding-bottom-24 u-padding-right-20 type-item">
			<text class="color-333333 u-font-26 bold">产品详情</text>
			<u-input :custom-style="fz26" v-model="commodityRemark" type="textarea" height="210" maxlength="500" placeholder="请描述您的产品..." />
			<view class="u-text-right color-999999 u-font-22">
				<text>字数限制 500</text>
				<text class="u-margin-left-20">{{commodityRemark.length}}/500</text>
			</view>
		</view>
		<view class="btn-wrap">
			<u-button :custom-style="fz30" type="primary" shape="circle" @click="submit">发布</u-button>
		</view>

		<u-select v-model="show" :list="typeList" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	import * as config from '../../../common/config.js'
	export default {
		data() {
			return {
				fz26: {
					fontSize: '26rpx'
				},
				fz30: {
					fontSize: '30rpx'
				},
				action: config.baseUrl + '/file/upload',
				haeder: {
					'Authorization': uni.getStorageSync('tokenHead') + uni.getStorageSync('token'),
				},
				formData: {
					type: 'commodity',
					id: uni.getStorageSync('shopId') || 1
				},
				commodityName: '',
				commodityTypeCode: '',
				commodityTypeName: '',
				commodityPrice: '',
				commodityRemark: '',
				commodityImg: [],
				type: '',
				show: false,
				list: [],
				typeList: []
			}
		},
		onLoad() {
			this.getTypeList()
		},
		methods: {
			getTypeList() {
				this.$u.api.getTypeList().then(res => {
					var arr = []
					for (var i = 0; i < res.length; i++) {
						var ele = res[i]
						var obj = {
							label: ele.typeName,
							value: ele.typeCode
						}
						arr.push(obj)
					}
					this.typeList = arr
				})
			},
			beforeUpload(){
				uni.showLoading({
					title:"正在上传..."
				})
			},
			addCommodityImgList(data, index, lists, name) {
				this.commodityImg.push(data)
			},
			removeCommodityImgList(index, lists, name) {
				let arr = this.commodityImg
				arr.splice(index, 1)
				this.commodityImg = arr
			},
			confirm(e) {
				this.commodityTypeCode = e[0].value
				this.commodityTypeName = e[0].label
			},
			submit() {
				if (!this.commodityTypeCode) {
					uni.showToast({
						title: "请选择产品类型",
						icon: "none"
					})
					return
				}
				if (!this.commodityName) {
					uni.showToast({
						title: "请输入详细名称",
						icon: "none"
					})
					return
				}
				if (this.commodityImg.length <= 0) {
					uni.showToast({
						title: "请至少上传一张图片",
						icon: "none"
					})
					return
				}
				if (!this.commodityPrice) {
					uni.showToast({
						title: "请输入价格",
						icon: "none"
					})
					return
				}
				this.commodityPrice = Number(this.commodityPrice).toFixed(2)
				if (!this.commodityRemark) {
					uni.showToast({
						title: "请输入商品描述",
						icon: "none"
					})
					return
				}
				this.$u.api.addCommodity({
					merchantId: uni.getStorageSync('merchantId'),
					shopId: uni.getStorageSync('shopId'),
					commodityName: this.commodityName,
					commodityTypeCode: this.commodityTypeCode,
					commodityPrice: this.commodityPrice,
					commodityRemark: this.commodityRemark,
					commodityImg: JSON.stringify(this.commodityImg)
				}).then(res => {
					if (res) {
						uni.showToast({
							title: "商品发布成功",
							mask: true,
							success: function() {
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							}
						})
					} else {
						uni.showToast({
							title: "商品添加失败，请稍后重试",
							icon: "none",
							mask: true
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		.type-item,
		.img-item {
			background: #fff;
			margin: 0 30rpx;
		}
	}

	.u-form-item {
		padding: 0 !important;
	}

	.btn-wrap {
		width: 80%;
		margin: 100rpx auto;
	}
</style>
