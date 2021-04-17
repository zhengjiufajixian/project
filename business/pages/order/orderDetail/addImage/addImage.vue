<template>
	<view>
		<u-gap height="90"></u-gap>
		<view class="u-text-center">
			<u-image src='/static/image/car-1.png' widht="546" height="114" mode="aspectFit"></u-image>
			<view class="u-font-26 color-666666 u-margin-top-24">
				<text>在为客户汽车服务后，请在此留存记录。</text>
			</view>
		</view>
		<u-gap height="90"></u-gap>
		<view class="bg-white">
			<view class="u-font-26 color-333333 u-padding-left-30 u-padding-top-40 u-padding-bottom-40">作业前</view>
			<view class="u-padding-left-54 u-padding-bottom-30">
				<u-upload :action="action" :form-data="formData" :header="haeder" :custom-btn="true"
					@on-success="addImgList1" @on-remove="removeImgList1" max-count="3" width="96" height="96"
					:file-list="orderDetail.workBeforeImg" v-if="orderDetail.orderStatus == 'EXECUTING'">
					<view class="addBtn" slot='addBtn'>
						<u-icon name="plus" color="#FFFFFF" size="54"></u-icon>
					</view>
				</u-upload>

				<view v-else>
					<view v-if="orderDetail.workBeforeImg.length > 0" class="u-flex">
						<view class="u-margin-right-20" v-for="(item,index) in orderDetail.workBeforeImg" :key="index"
							@click="previewImage(item,orderDetail.workBeforeImg)">
							<u-image width="94rpx" height="94rpx" :src="item"></u-image>
						</view>
					</view>
					<view v-else>
						未上传图片
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white">
			<view class="u-font-26 color-333333 u-padding-left-30 u-padding-top-40 u-padding-bottom-40">作业后</view>
			<view class="u-padding-left-54 u-padding-bottom-30">
				<u-upload :action="action" :form-data="formData" :header="haeder" :custom-btn="true"
					@on-success="addImgList2" @on-remove="removeImgList2" max-count="3" width="96" height="96"
					:file-list="orderDetail.workAfterImg" v-if="orderDetail.orderStatus == 'EXECUTING'">
					<view class="addBtn" slot='addBtn'>
						<u-icon name="plus" color="#FFFFFF" size="54"></u-icon>
					</view>
				</u-upload>

				<view v-else>
					<view v-if="orderDetail.workAfterImg.length > 0" class="u-flex">
						<view class="u-margin-right-20" v-for="(item,index) in orderDetail.workAfterImg" :key="index"
							@click="previewImage(item,orderDetail.workAfterImg)">
							<u-image width="94rpx" height="94rpx" :src="item"></u-image>
						</view>
					</view>
					<view v-else>
						未上传图片
					</view>
				</view>
			</view>
		</view>

		<view v-if="orderDetail.orderStatus == 'EXECUTING'"
			class="u-flex u-margin-top-40 u-padding-left-28 u-padding-right-28 u-row-between u-col-center u-text-center">
			<view class="u-margin-left-28 u-margin-right-28 u-flex-6 confirm-btn" @click="handleClick">
				上传图片
			</view>
		</view>
	</view>
</template>

<script>
	import * as config from '../../../../common/config.js'

	export default {
		data() {
			return {
				imgList1: [],
				imgList2: [],
				action: config.baseUrl + '/file/upload',
				haeder: {
					'Authorization': uni.getStorageSync('tokenHead') + uni.getStorageSync('token'),
				},
				formData: {
					'type': 'order',
					"id": '' // orderId
				},
				orderDetail: {}
			}
		},
		onLoad(params) {
			let data = JSON.parse(params.data)
			if(data.orderStatus == 'EXECUTING') {
				if (data.workBeforeImg) {
					let imgArr = JSON.parse(data.workBeforeImg)
					let arr = []
					for (let i = 0; i < imgArr.length; i++) {
						let ele = imgArr[i]
						let item = {
							url: ele
						}
						arr.push(item)
					}
					data.workBeforeImg = arr
				}
				if (data.workAfterImg) {
					let imgArr = JSON.parse(data.workAfterImg)
					let arr = []
					for (let i = 0; i < imgArr.length; i++) {
						let ele = imgArr[i]
						let item = {
							url: ele
						}
						arr.push(item)
					}
					data.workAfterImg = arr
				}
			}else{
				data.workBeforeImg = JSON.parse(data.workBeforeImg)
				data.workAfterImg = JSON.parse(data.workAfterImg)
			}
			
			this.orderDetail = data
			this.formData.id = data.id
		},
		methods: {
			previewImage(current, imgs) {
				wx.previewImage({
					current: current,
					urls: imgs
				})
			},
			addImgList1(data, index, lists, name) {
				let pages = getCurrentPages();
				let beforePage = pages[pages.length - 2];
				beforePage.$vm.addImgList1(data)
			},
			removeImgList1(index, lists, name) {
				let pages = getCurrentPages();
				let beforePage = pages[pages.length - 2];
				beforePage.$vm.removeImgList1(index)
			},
			addImgList2(data, index, lists, name) {
				let pages = getCurrentPages();
				let beforePage = pages[pages.length - 2];
				beforePage.$vm.addImgList2(data)
			},
			removeImgList2(index, lists, name) {
				let pages = getCurrentPages();
				let beforePage = pages[pages.length - 2];
				beforePage.$vm.removeImgList2(index)
			},
			handleClick() {
				let pages = getCurrentPages();
				let beforePage = pages[pages.length - 2];
				this.$u.api.setOrderStatus({
					orderId: this.formData.id,
					before: JSON.stringify(beforePage.$vm.imgList1),
					after: JSON.stringify(beforePage.$vm.imgList2)
				}).then(res => {
					console.log(res);
					if (res.indexOf('成功')) {
						uni.showToast({
							title: '图片保存成功'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.addBtn {
		// border: 1rpx solid #dedede;
		// border-radius: 15rpx;
		padding: 22rpx;
		background-color: #eaeff4;
		line-height: 1;
	}

	.confirm-btn,
	.cancel-btn {
		line-height: 80rpx;
		font-size: 30rpx;
		border-radius: 100rpx;
	}

	.cancel-btn {
		color: #FFFFFF;
		background-color: #d3d3d3;
	}

	.confirm-btn {
		color: #FFFFFF;
		background-color: #1672ff;
		box-shadow: 0px 3rpx 28rpx 2rpx rgba(22, 114, 255, 0.09);
	}
</style>
