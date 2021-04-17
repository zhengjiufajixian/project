<template>
	<view>
		<view class="list u-padding-left-30 u-padding-right-30">
			<u-gap height="42"></u-gap>
			<view class="list-item u-flex u-row-center ">
				<view class="u-font-26 color-000000">店铺地址</view>
				<view class="u-flex-1">
					<u-input v-model="form.shopAddress" :type="text" :custom-style="customStyle" placeholder="请输入店铺地址" :placeholder-style="placeholderStyle" :disabled="true"/>
				</view>
			</view>
			<u-gap height="42"></u-gap>
			<view class="list-item u-flex u-row-center ">
				<view class="u-font-26 color-000000">店铺名称</view>
				<view class="u-flex-1">
					<u-input v-model="form.shopName" :type="text" :custom-style="customStyle" placeholder="请输入店铺名称" :placeholder-style="placeholderStyle" />
				</view>
			</view>
			<u-gap height="42"></u-gap>
			<view class="list-item u-flex u-row-center ">
				<view class="u-font-26 color-000000">店铺法人</view>
				<view class="u-flex-1">
					<u-input v-model="form.merchantName" :type="text" :custom-style="customStyle" placeholder="请输入店铺地址" :placeholder-style="placeholderStyle" />
				</view>
			</view>
			<u-gap height="42"></u-gap>
			<view class="list-item u-flex u-row-center ">
				<view class="u-font-26 color-000000">店铺电话</view>
				<view class="u-flex-1">
					<u-input v-model="form.shopPhone" :type="text" :custom-style="customStyle" placeholder="请输入店铺地址" :placeholder-style="placeholderStyle" />
				</view>
			</view>
			<u-gap height="42"></u-gap>
			<view class="list-item u-flex u-row-center u-col-top ">
				<view class="u-font-26 color-000000">店铺简介</view>
				<view class="u-flex-1">
					<u-input type="textarea" height="250" v-model="form.shopProfile" :auto-height="true" placeholder="请输入店铺简介" :custom-style="customStyle1"
					 :placeholder-style="placeholderStyle" />
				</view>
			</view>
			<u-gap height="50"></u-gap>
			<view class="list-item u-font-26 color-000000">
				<view>店铺门头照</view>
				<u-gap height="40"></u-gap>
				<view class="u-flex u-row-center">
					<u-upload width="100" height="100" :custom-btn="true" :action="action" :form-data="formData" :header="haeder"
					 :beforeUpload="beforeUpload" @on-success="addImg" @on-remove="removeImg" max-count="1" :file-list="shopImg" index="shopImg">
						<view slot="addBtn" class="u-flex u-col-center u-row-center addBtn">
							<u-image src="/static/image/upload.png" width="50" height="50"></u-image>
						</view>
					</u-upload>
				</view>
				<u-gap height="50"></u-gap>
				<view>店铺环境照</view>
				<u-gap height="40"></u-gap>
				<view class="u-flex u-row-center">
					<u-upload width="100" height="100" :custom-btn="true" :action="action" :form-data="formData" :header="haeder"
					 :beforeUpload="beforeUpload" @on-success="addImg" @on-remove="removeImg" max-count="3" :file-list="shopImgList" index="shopImgList">
						<view slot="addBtn" class="u-flex u-col-center u-row-center addBtn">
							<u-image src="/static/image/upload.png" width="50" height="50"></u-image>
						</view>
					</u-upload>
				</view>
			</view>
		</view>
		<u-gap height="60"></u-gap>
		<view class="u-flex u-row-between u-col-center u-text-center">
			<navigator class="u-margin-left-56 u-margin-right-28 u-flex-6 set-location" url="../shopLocation/shopLocation" hover-class="none">
				<view>更新店铺地址</view>
			</navigator>
			<view class="u-margin-left-28 u-margin-right-56 u-flex-6 set-shopInfo" @click="upShop">更新店铺信息</view>
		</view>
		<u-gap height="60"></u-gap>
	</view>
</template>

<script>
	import * as config from '../../../common/config.js'
	export default {
		data() {
			return {
				action: config.baseUrl + '/file/upload',
				haeder: {
					'Authorization': uni.getStorageSync('tokenHead') + uni.getStorageSync('token'),
				},
				formData: {
					type: config.uploadImgtype.shop,
					id: uni.getStorageSync('shopId')
				},

				customStyle: {
					lineHeight: '56rpx',
					color: '#333333',
					fontSize: '24rpx',
					background: '#fff',
					paddingLeft: '26rpx',
					marginLeft: '22rpx'
				},
				placeholderStyle: 'font-size:24rpx;color: #cec7cc;background:#fff;',
				customStyle1: {
					color: '#333333',
					fontSize: '24rpx',
					background: '#fff',
					paddingLeft: '26rpx',
					marginLeft: '22rpx'
				},
				
				form: {
					merchantId: '',
					shopName: '',
					shopAddress: '',
					shopPhone: '',
					shopProfile: '',
					merchantName: '',
					merchantPhone: '',
					code: '',
					merchantPassword: '',
					confirmMerchantPassword: '',
					longitude: '',
					latitude: '',
					shopImg: '',
					shopImgList: [],
				},
				shopImg: [],
				shopImgList: []
			}
		},
		onShow() {
			if(this.form.shopAddress){
				this.upInfo()
			}
		},
		onLoad() {
			this.getUpShop()
		},
		methods: {
			
			getImg() {
				let img = this.form.shopImg
				this.shopImg = [{
					url: img
				}]
				let obj = this.form.shopImgList
				let arr = []
				for (let i = 0; i < obj.length; i++) {
					let ele = obj[i]
					let item = {
						url: ele
					}
					arr.push(item)
				}
				this.shopImgList = arr
				this.$forceUpdate()
			},
			upInfo() {
				this.$u.api.getUpShop().then(res=>{
					this.form.shopAddress = res.shopAddress
				})
			},
			getUpShop() {
				this.$u.api.getUpShop().then(res=>{
					this.form = res
					this.form.shopImgList = JSON.parse(res.shopImgList)
					this.getImg()
				})
			},
			
			beforeUpload() {
				uni.showLoading({
					title: '正在上传...'
				})
			},
			addImg(data, index, lists, name) {
				if(name.indexOf('List')>=0) {
					this.form[name].push(data)
				}else{
					this.form[name] = data
				}
			},
			removeImg(index, lists, name) {
				if(name.indexOf('List')>=0) {
					let arr = this.form[name]
					arr.splice(index, 1)
					this.form[name] = arr
				}else{
					this.form[name] = ''
				}
			},
			
			upShop() {
				this.form.shopImgList = JSON.stringify(this.form.shopImgList)
				this.$u.api.upShop(this.form).then(res => {
					if(res) {
						uni.showToast({
							title:'更新成功',
							success: () => {
								setTimeout(function(){
									uni.navigateBack()
								},1000)
							}
						})						
					}else{
						uni.showToast({
							icon:'none',
							title:'更新失败'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	// page {
	// 	background-color: #FFFFFF;
	// }
	.addBtn {
		width: 100rpx;
		height: 100rpx;
		background-color: #efefef;
		border-radius: 10rpx;
	}

	.set-location,
	.set-shopInfo {
		line-height: 65rpx;
		font-size: 30rpx;
		border-radius: 30rpx;
	}

	.set-location {
		color: #FFFFFF;
		background-color: #d3d3d3;
	}

	.set-shopInfo {
		color: #1672ff;
		background-color: #FFFFFF;
		box-shadow: 0px 3rpx 28rpx 2rpx rgba(22, 114, 255, 0.09);
	}
</style>
