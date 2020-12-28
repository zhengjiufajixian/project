<template>
	<view class="wrap">
		<view class="u-margin-left-40 u-margin-right-40">
			<view>
				<view class="u-font-32 u-padding-top-30 u-text-center">
					店铺信息
				</view>
				<view class="u-margin-top-22 u-font-26 bold">
					基本信息
				</view>
			</view>
			<u-form :model="form" ref="uForm">
				<u-form-item label="店铺名称" prop="shopName" label-position="top" :required="true">
					<u-input v-model="form.shopName" placeholder="请输入店铺名称" :disabled="!form.shopName"/>
					<!-- <u-button type="primary" @click="choseLocation" slot="right">地图选点</u-button> -->
				</u-form-item>
				<u-form-item label="店铺地址" prop="shopAddress" label-position="top" :required="true">
					<u-input v-model="form.shopAddress" placeholder="请输入店铺地址" :disabled="!form.shopAddress"/>
					<u-button type="primary" @click="choseLocation" size="mini" slot="right">地图选点</u-button>
				</u-form-item>
				<u-form-item label="店铺所有人" prop="merchantName" label-position="top" :required="true">
					<u-input v-model="form.merchantName" placeholder="请输入账号名称" />
				</u-form-item>
				<u-form-item label="联系电话" prop="merchantPhone" label-position="top" :required="true">
					<u-input v-model="form.merchantPhone" placeholder="请输入11位电话号码(用于账号登录)" />
				</u-form-item>
				<u-form-item label="账号密码" prop="merchantPassword" label-position="top" required="true">
					<u-input ref="merchantPassword" v-model="form.merchantPassword" placeholder="请输入账号密码" />
				</u-form-item>
				<u-form-item label="确认密码" prop="confirmMerchantPassword" label-position="top" required="true">
					<u-input v-model="form.confirmMerchantPassword" placeholder="请确认输入密码是否一致" />
				</u-form-item>
				<u-form-item label="店铺门头照" label-position="top" required="true">
					<u-upload :action="action" :form-data="formData" :header="haeder" @on-success="addShopImg" @on-remove="removeShopImg" max-count="1"></u-upload>
				</u-form-item>
				<u-form-item label="店铺环境照" label-position="top" required="true">
					<u-upload :action="action" :form-data="formData" :header="haeder" @on-success="addShopImgList" @on-remove="removeShopImgList" max-count="3"></u-upload>
				</u-form-item>
				<u-form-item label="店铺简介" prop="shopProfile" label-position="top" required="true">
					<u-input type="textarea" height="250" :border="true" v-model="form.shopProfile" :auto-height="true" placeholder="请输入店铺简介" />
				</u-form-item>
			</u-form>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="submit">下一步</u-button>
		</view>
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
					'type': 'commodity',
					"id": uni.getStorageSync('shopId')
				},
				name: 'file',
				form: {
					merchantId: uni.getStorageSync('merchantId'),
					shopName: '',
					shopAddress: '',
					merchantName: '',
					merchantPhone: '',
					merchantPassword: '',
					confirmMerchantPassword: '',
					longitude: '',
					latitude: '',
					shopImg: '',
					shopImgList: [],
					shopProfile: '',
				},
				rules: {
					shopName: {
						required: true,
						message: '请输入店铺名称',
						trigger: ['blur','change'],
					},
					shopAddress: {
						required: true,
						message: '请输入店铺地址',
						trigger: ['blur','change'],
					},
					merchantName: {
						required: true,
						message: '请输入账号名称',
						trigger: ['blur','change'],
					},
					merchantPhone: {
						required: true,
						message: '请输入11位电话号码',
						trigger: ['blur','change'],
					},
					merchantPassword: {
						required: true,
						message: '请输入账号密码',
						trigger: ['blur','change'],
					},
					confirmMerchantPassword: {
						required: true,
						message: '请确认输入密码是否一致',
						trigger: ['blur','change'],
					},
					shopProfile: {
						required: true,
						message: '请输入店铺地址',
						trigger: ['blur','change'],
					},
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			choseLocation() {
				let _this = this
				wx.chooseLocation({
					success: (data) => {
						if (data.name) {
							this.form.shopAddress = data.address
							this.form.shopName = data.name
							this.form.latitude = data.latitude
							this.form.longitude = data.longitude
						}
					},
					fail: () => {
						wx.getSetting({
							success: function(res) {
								var statu = res.authSetting;
								console.log(statu);
								if (!statu['scope.userLocation']) {
									wx.showModal({
										title: '是否授权当前位置',
										content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
										success(tip) {
											if (tip.confirm) {
												wx.openSetting({
													success: function(data) {
														if (data.authSetting["scope.userLocation"] === true) {
															wx.showToast({
																title: '授权成功',
																icon: 'success',
																duration: 1000
															})
															//授权成功之后，再调用chooseLocation选择地方
															setTimeout(function() {
																_this.choseLocation()
															}, 1000)
														}
													}
												})
											} else {
												wx.showToast({
													title: '授权失败',
													icon: 'none',
													duration: 1000
												})
											}
										}
									})

								}
							}
						})
					}
				})
			},
			
			addShopImg(data, index, lists, name){
				this.form.shopImg = data
			},
			removeShopImg(index, lists, name){
				this.form.shopImg = ''
			},
			addShopImgList(data, index, lists, name){
				this.form.shopImgList.push(data)
			},
			removeShopImgList(index, lists, name){
				let arr = this.form.shopImgList
				arr.splice(index,1)
				console.log(arr)
				this.form.shopImgList = arr
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					// if(this.form.shopImg || this.form.shopImgList.length){
					// 	uni.showToast({
					// 	    title: '请上传店铺相关图片',
					// 		mask: true,
					// 		icon: 'none',
					// 	    duration: 2000
					// 	});
					// 	return
					// }
					if(this.form.merchantPassword == this.form.confirmMerchantPassword && this.form.merchantPassword > 5){
						if (valid) {
							console.log('验证通过');
							this.form.shopImgList = JSON.stringify(this.form.shopImgList)
							console.log(this.form)
							this.$u.api.register(this.form).then(res=>{
								uni.redirectTo({
									url: '../wait/wait'
								})
							})
						} else {
							console.log('验证失败');
						}
					}else{
						uni.showToast({
						    title: '请确认密码是否一致，并且密码长度大于六位',
							mask: true,
							icon: 'none',
						    duration: 2000
						});
					}
				});
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		background: #fff;
		padding-bottom: 50rpx;
	}

	.bold {
		font-weight: bold;
	}

	.u-form-item {
		padding: 0 !important;
	}

	.btn-wrap {
		width: 50%;
		margin: 0 auto;
	}
</style>
