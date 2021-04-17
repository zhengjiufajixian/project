<template>
	<view>
		<view class="u-padding-top-40 u-padding-bottom-40 u-padding-left-30 bg-white">
			<text class="color-333333 u-font-30 u-margin-right-20 bold">打分</text>
			<u-rate v-model="rating"></u-rate>
		</view>
		<u-gap height="20"></u-gap>
		<view class="u-padding-top-37 u-padding-right-46 u-padding-bottom-37 u-padding-left-30 bg-white u-font-24">
			<u-input v-model="content" :custom-style="customStyle" type="textarea" height="302" placeholder="请输入您的评价..." />
		</view>
		<u-gap height="20"></u-gap>
		<view class="bg-white u-padding-left-30 u-font-26">
			<view class="u-flex u-row-between u-padding-top-28 u-padding-bottom-18 u-padding-right-32">
				<view class="color-444444">图片上传</view>
				<view class="color-333333">{{imgList.length}}/4</view>
			</view>
			<view class="u-padding-bottom-30 u-padding-top-10">
				<u-upload :action="action" :form-data="formData" :header="haeder" @on-success="addImgList" @on-remove="removeImgList" max-count="4" width="140" height="140"></u-upload>
			</view>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import * as config from "../../../common/config.js"
	
	export default {
		data() {
			return {
				count: 5,
				rating: 5,
				content: '',
				customStyle: {
					fontSize: "24rpx"
				},
				action: config.baseUrl + '/file/upload',
				haeder: {
					'Authorization': uni.getStorageSync('tokenHead') + uni.getStorageSync('token'),
				},
				formData: {
					'type': 'appriase',
					"id": ''
				},
				imgList:[],
				orderDetail:{}
			}
		},
		onLoad(data) {
			this.getOrderDetail(data.orderId)
		},
		methods: {
			getOrderDetail(id) {
				this.$u.api.getOrderDetail({
					orderId: id
				}).then(res => {
					this.orderDetail = JSON.parse(res)
					this.formData.id = this.orderDetail.merchantId
				})
			},
			addImgList(data, index, lists, name){
				this.imgList.push(data)
			},
			removeImgList(index, lists, name){
				let arr = this.imgList
				arr.splice(index,1)
				this.imgList = arr
			},
			submit(){
				this.$u.api.rateOrder({
					orderNo: this.orderDetail.orderNo,
					userId: uni.getStorageSync("userId"),
					userName: uni.getStorageSync("userName"),
					star: this.rating,
					anonymous: 1,
					remark: this.content,
					img: JSON.stringify(this.imgList)
				}).then(res=>{
					uni.showToast({
						title: "评价成功",
						icon: "none",
						duration: 2000,
						mask: true,
						success: function() {
							setTimeout(() => {
								uni.hideToast()
								uni.navigateBack()
							}, 2000)
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.btn-wrap {
		width: 80%;
		margin: 110rpx auto 0;
	}
</style>
