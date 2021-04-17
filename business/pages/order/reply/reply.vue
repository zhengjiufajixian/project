<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="bg-white u-flex u-col-center u-padding-left-50 u-padding-top-28 u-padding-bottom-16">
			<u-avatar size="56" :src="orderDetail.userHeadImg"></u-avatar>
			<text class="color-333333 u-font-26 u-margin-left-18">{{appraise.userName}}</text>
		</view>
		<view class="u-padding-left-50 u-padding-right-60 u-padding-bottom-62 bg-white">
			<u-line color="#F3F4F7"></u-line>
			<view class="u-flex u-font-20 u-col-top u-margin-top-15">
				<text class="color-333333">给出的评分 :</text>
				<view class="u-flex-1">
					<u-rate v-model="appraise.star" :disabled="true"></u-rate>
				</view>
			</view>
			<view class="u-flex u-font-20 u-col-top u-margin-top-15">
				<text class="color-333333">给出的评价 :</text>
				<text class="u-flex-1">{{appraise.remark}}</text>
			</view>
			<view class="u-flex u-font-20 u-col-top u-padding-left-12 u-margin-left-50 u-margin-top-15" v-if="appraise.img">
				<view class="u-margin-right-12" v-for="(item,index) in appraise.img" :key="index" @click="previewImage(item,appraise.img)">
					<u-image class="u-margin-right-12"  :src="item" width="70" height="70"></u-image>
				</view>
			</view>
		</view>
		<view v-for="(item,index) in orderDetail.replyList"
		 :key="index">
			<u-gap height="10"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-bottom-20 bg-white">
				<view>
					<text class="color-8C8C8C u-font-26 line-height-3">{{item.role == "merchant" ? "我的回复" : "客户的回复"}}</text>
				</view>
				<u-line color="#F3F4F7"></u-line>
				<view class="u-flex u-font-20 u-col-top u-margin-top-15">
					<text class="color-333333">给出的回复 :</text>
					<text class="u-flex-1">{{item.remark}}</text>
				</view>
				<view class="u-flex u-font-20 u-col-top u-padding-left-50 u-margin-left-50 u-margin-top-15" v-if="item.img">
					<view class="u-margin-right-12" v-for="(replyItem,replyIndex) in item.img" :key="replyIndex" @click="previewImage(replyItem,item.img)">
						<u-image :src="replyItem" width="70" height="70"></u-image>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view class="bg-white u-padding-top-26 u-padding-right-46 u-padding-bottom-26 u-padding-left-46">
			<u-input v-model="remark" type="textarea" height="130" :custom-style="customStyle" placeholder-style="font-size:24rpx;"/>
		</view>
		<view class="bg-white u-padding-left-30 u-font-26">
			<view class="u-padding-bottom-30">
				<u-upload :action="action" :form-data="formData" :header="haeder" :custom-btn="true" @on-success="addImgList" @on-remove="removeImgList" max-count="3" width="96" height="96">
					<view class="addBtn" slot='addBtn'>
						<u-icon name="plus" color="#c3c3c3" size="32"></u-icon>
					</view>
				</u-upload>
			</view>
		</view>
		<view class="btn-wrap">
			<u-button :custom-style="fz30" type="primary" shape="circle" @click="submit">回复</u-button>
		</view>
	</view>
</template>

<script>
	import * as config from "../../../common/config.js"
	export default {
		data() {
			return {
				customStyle: {
					fontSize: '24rpx'
				},
				fz30: {
					fontSize: '30rpx'
				},
				remark:'',
				orderDetail:{},
				appraise: {
					img:''
				},
				imgList:[],
				action: config.baseUrl + '/file/upload',
				haeder: {
					'Authorization': uni.getStorageSync('tokenHead') + uni.getStorageSync('token'),
				},
				formData: {
					'type': 'appriase',
					"id": ''
				},
			}
		},
		onLoad(data) {
			this.getOrderDetail(data.orderId)
		},
		methods: {
			addImgList(data, index, lists, name){
				this.imgList.push(data)
			},
			removeImgList(index, lists, name){
				let arr = this.imgList
				arr.splice(index,1)
				console.log(arr)
				this.imgList = arr
			},
			getOrderDetail(id) {
				this.$u.api.getOrderDetail({
					orderId: id
				}).then(res => {
					let data = JSON.parse(res)
					console.log(data)
					this.orderDetail = data
					this.appraise = data.appraise
					if (data.appraise.img) {
						this.appraise.img = JSON.parse(data.appraise.img)
					}
					if(data.replyList){
						for (var i = 0; i < data.replyList.length; i++) {
							if(data.replyList[i].img){
								data.replyList[i].img = JSON.parse(data.replyList[i].img)
							}
						}
					}
					this.orderDetail = data
					console.log(data)
					this.formData.id = data.merchantId
				})
			},
			previewImage(current,imgs) {
				wx.previewImage({
					current: current,
					urls: imgs
				})
			},
			submit() {
				this.$u.api.replyForOrder({
					appraiseId: this.appraise.id,
					role: "merchant",
					remark: this.remark,
					img: JSON.stringify(this.imgList)
				}).then(res => {
					if(res) {
						uni.showToast({
							title: "回复成功",
							success: function() {
								setTimeout(function() {
									uni.navigateBack()
								}, 1000)
							}
						})						
					}else{
						uni.showToast({
							title: "操作失败，请稍后重试",
							icon: 'none'
						})	
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.btn-wrap {
		width: 80%;
		margin: 153rpx auto;
	}
	.addBtn {
		border: 1rpx solid #dedede;
		padding: 35rpx;
		border-radius: 15rpx;
		line-height: 1;
	}
	.line-height-3 {
		line-height: 3;
	}
</style>
