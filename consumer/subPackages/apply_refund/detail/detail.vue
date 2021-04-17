<template>
	<view>
		<view class="bg-white u-padding-top-26 u-padding-right-30 u-padding-bottom-26 u-padding-left-30">
			<u-input type="textarea" v-model="refundMsg" height="200" placeholder="请输入您的退款原因" :disabled="disabled"/>
		</view>
		<u-gap height="20"></u-gap>
		<view class="bg-white u-padding-top-26 u-padding-right-30 u-padding-bottom-26 u-padding-left-30">
			<view class="u-flex u-col-center u-row-between">
				<text class="u-font-26 color-4A4A4A">图片上传</text>
				<text>{{refundImg.length}}/4</text>
			</view>
			<u-gap height="55"></u-gap>
			<view v-if="!disabled">
				<u-upload :action="action" :form-data="formData" :header="haeder" @on-success="addRefundImg" @on-remove="removeRefundImg"
				 max-count="4" width="140" height="140" :custom-btn="true">
					<view class="u-flex u-col-center u-row-center uplaod-wrap" slot="addBtn">
						<u-icon name="camera" size="60"></u-icon>
					</view>
				</u-upload>
			</view>
			<view v-else>
				<u-image width="140" height="140" v-for="(item,index) in refundImg" :key="index" :src="item"></u-image>
			</view>
		</view>
		<u-gap height="55"></u-gap>
		<view class="btn-wrap">
			<u-button :custom-style="fz34" type="primary" shape="circle">{{getRefundStatus()}}</u-button>
		</view>
	</view>
</template>

<script>
	import * as config from "../../../common/config.js"
	export default {
		data() {
			return {
				fz34: {
					fontSize: '34rpx'
				},
				action: config.baseUrl + '/file/upload',
				haeder: {
					'Authorization': uni.getStorageSync('tokenHead') + uni.getStorageSync('token'),
				},
				formData: {
					'type': 'refund',
					"id": ''
				},
				orderDetail:'',
				refundImg: [],
				refundMsg:'',
				disabled: false
			}
		},
		onLoad(params) {
			this.orderId = params.orderId
			this.formData.id = params.orderId
			this.getOrderDetail()
		},
		methods: {
			getRefundStatus() {
				let val = this.orderDetail
				switch (val.refundStatus){
					case 'INIT':
						return '等待审核'
						break;
					case 'EXECUTING':
						return '正在退回至原渠道'
						break;
					case 'REFUND':
						return '退款成功'
						break;
					case 'FAIL':
						return '退款驳回'
						break;
					default:
						break;
				}
			},
			getOrderDetail() {
				this.$u.api.getOrderDetail({
					orderId: this.orderId
				}).then(res => {
					// 退款状态,INIT申请退款中,EXECUTING,正在退款,REFUND已退款,FAIL,退款失败
					let data = JSON.parse(res)
					console.log(data)
					this.orderDetail = data
					this.refundMsg = data.refundMsg
					this.refundImg = JSON.parse(data.refundImg)
					this.disabled = true
				})
			},
			addRefundImg(data, index, lists, name) {
				this.refundImg.push(data)
			},
			removeRefundImg(index, lists, name) {
				let arr = this.refundImg
				arr.splice(index, 1)
				this.refundImg = arr
			},
			submit() {
				if (!this.refundMsg) {
					uni.showToast({
						title: '请输入退款原因',
						icon: 'none'
					})
					return
				}
				this.$u.api.applyRefund({
					orderId: this.orderId,
					refundImg: JSON.stringify(this.refundImg),
					refundMsg: this.refundMsg
				}).then(res => {
					if(res){
						uni.showToast({
							title: '申请提交成功'
						})
						setTimeout(function(){
							uni.navigateBack()
						},1500)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.uplaod-wrap {
		width: 140rpx;
		height: 140rpx;
		border: 2rpx solid #dcdcdc;
		color: #dcdcdc;
	}

	.u-list-item {
		margin-right: 40rpx !important;
	}

	.btn-wrap {
		width: 80%;
		margin: 0 auto;
	}
</style>
