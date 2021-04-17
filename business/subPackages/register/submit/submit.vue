<template>
	<view>
		<u-gap height="28"></u-gap>
		<u-steps :list="numList" :current="current"></u-steps>
		<u-gap height="28"></u-gap>
		<u-line color="#bcbcbc"></u-line>
		<u-form :model="form" ref="uForm" label-width="170" label-align="center" :label-style="labelStyle"
			v-show="current==0">
			<u-form-item label="店铺名称" prop="shopName" :required="true">
				<u-input v-model="form.shopName" placeholder="请填写您的店铺名称"
					placeholder-style="color:#999999;font-size: 25rpx;" />
			</u-form-item>
			<u-form-item label="店铺地址" prop="shopAddress" :required="true">
				<u-input v-model="form.shopAddress" placeholder="请输入您的店铺地址"
					placeholder-style="color:#999999;font-size: 25rpx;" />
			</u-form-item>
			<u-form-item label="店铺法人" prop="merchantName" :required="true">
				<u-input v-model="form.merchantName" placeholder="请输入店铺的法人姓名"
					placeholder-style="color:#999999;font-size: 25rpx;" />
			</u-form-item>
			<u-form-item label="店铺电话" prop="shopPhone" :required="true">
				<u-input v-model="form.shopPhone" placeholder="请输入您店铺的联系电话"
					placeholder-style="color:#999999;font-size: 25rpx;" />
			</u-form-item>
			<view class="u-padding-right-66">
				<u-form-item label="店铺简介" prop="shopProfile" required="true">
					<u-input type="textarea" height="250" :border="true" v-model="form.shopProfile" :auto-height="true"
						placeholder="请输入店铺简介" placeholder-style="color:#999999;font-size: 25rpx;background:#ececec;" />
					<view class="color-999999 u-font-24 u-text-right">300字以内</view>
				</u-form-item>
			</view>
			<u-form-item label="服务分类">
				<u-checkbox-group @change="serviceCodeChange">
					<u-checkbox v-model="item.checked" v-for="(item, index) in servicelist" :key="index"
						:name="item.serviceCode">
						{{ item.serviceName }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
		</u-form>

		<u-form :model="form" ref="uForm" label-width="170" label-align="center" :label-style="labelStyle"
			v-show="current==1">
			<u-form-item label="绑定手机" prop="merchantPhone" :required="true">
				<u-input v-model="form.merchantPhone" placeholder="请填写您绑定的手机号"
					placeholder-style="color:#999999;font-size: 25rpx;" />
			</u-form-item>
			<u-form-item label="验证码" prop="code" :required="true">
				<u-input v-model="form.code" placeholder="请输入验证码" placeholder-style="color:#999999;font-size: 25rpx;" />
				<view class="u-margin-right-20" slot="right">
					<u-toast ref="uToast"></u-toast>
					<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
					<u-button shape="circle" type="primary" size="mini" @click="getCode">{{tips}}</u-button>
				</view>
			</u-form-item>
			<u-form-item label="登录密码" prop="merchantPassword" :required="true">
				<u-input v-model="form.merchantPassword" placeholder="请输入您登录的密码"
					placeholder-style="color:#999999;font-size: 25rpx;" />
			</u-form-item>
			<u-form-item label="确认密码" prop="confirmMerchantPassword" :required="true">
				<u-input v-model="form.confirmMerchantPassword" placeholder="请再次输入您的密码"
					placeholder-style="color:#999999;font-size: 25rpx;" />
			</u-form-item>
		</u-form>

		<view class="u-text-center" v-show="current==2">
			<view class="u-flex u-col-top u-font-25 u-padding-right-60 u-padding-top-50 u-margin-right-60">
				<view class="u-flex-4 u-text-center color-333333">
					<view>店铺门头照</view>
					<view>（1张）</view>
				</view>
				<view class="u-flex-8">
					<view class="color-999999">（需要提供有完整牌匾的门头照）</view>
					<u-gap height="56"></u-gap>
					<view class="u-flex u-row-center">
						<u-upload width="100" height="100" :custom-btn="true" :action="action" :form-data="formData"
							:header="haeder" :beforeUpload="beforeUpload" @on-success="addShopImg" @on-remove="removeShopImg"
							max-count="1">
							<view slot="addBtn" class="u-flex u-col-center u-row-center addBtn">
								<u-image src="/static/image/upload.png" width="50" height="50"></u-image>
							</view>
						</u-upload>
					</view>
					<u-gap height="18"></u-gap>
					<view class="color-C3C3C3">上传门头照</view>
					<u-gap height="45"></u-gap>
				</view>
			</view>
			<u-line color="#bebebe"></u-line>
			<view class="u-flex u-col-top u-font-25 u-padding-right-60 u-padding-top-50 u-margin-right-60">
				<view class="u-flex-4 u-text-center color-333333">
					<view>店铺环境照</view>
					<view>（最多3张）</view>
				</view>
				<view class="u-flex-8">
					<view class="color-999999">（需要提供真实店铺环境图）</view>
					<u-gap height="56"></u-gap>
					<view class="u-flex u-row-center">
						<u-upload width="100" height="100" :custom-btn="true" :action="action" :form-data="formData"
							:header="haeder" :beforeUpload="beforeUpload" @on-success="addShopImgList"
							@on-remove="removeShopImgList" max-count="3">
							<view slot="addBtn" class="u-flex u-col-center u-row-center addBtn">
								<u-image src="/static/image/upload.png" width="50" height="50"></u-image>
							</view>
						</u-upload>
					</view>
					<u-gap height="18"></u-gap>
					<view class="color-C3C3C3">上传环境照</view>
					<u-gap height="45"></u-gap>
				</view>
			</view>
			<u-line color="#bebebe"></u-line>
			<view class="u-flex u-col-top u-font-25 u-padding-right-60 u-padding-top-50 u-margin-right-60">
				<view class="u-flex-4 u-text-center color-333333">
					<view>营业执照</view>
					<view>（1张）</view>
				</view>
				<view class="u-flex-8">
					<view class="color-999999">（需要提供有效的营业执照）</view>
					<u-gap height="56"></u-gap>
					<view class="u-flex u-row-center">
						<u-upload width="100" height="100" :custom-btn="true" :action="action" :form-data="formData"
							:header="haeder" :beforeUpload="beforeUpload" @on-success="addMerchantShopImg"
							@on-remove="removeMerchantShopImg" max-count="1">
							<view slot="addBtn" class="u-flex u-col-center u-row-center addBtn">
								<u-image src="/static/image/upload.png" width="50" height="50"></u-image>
							</view>
						</u-upload>
					</view>
					<u-gap height="18"></u-gap>
					<view class="color-C3C3C3">上传营业执照</view>
					<u-gap height="45"></u-gap>
				</view>
			</view>
			<u-line color="#bebebe"></u-line>
			<view class="u-flex u-col-top u-font-25 u-padding-right-60 u-padding-top-50 u-margin-right-60">
				<view class="u-flex-4 u-text-center color-333333">
					<view>法人身份证</view>
					<view>（1张）</view>
				</view>
				<view class="u-flex-8">
					<view class="color-999999">（需要提供法人的身份证正面照）</view>
					<u-gap height="56"></u-gap>
					<view class="u-flex u-row-center">
						<u-upload width="100" height="100" :custom-btn="true" :action="action" :form-data="formData"
							:header="haeder" :beforeUpload="beforeUpload" @on-success="addMerchantImg"
							@on-remove="removeMerchantImg" max-count="1">
							<view slot="addBtn" class="u-flex u-col-center u-row-center addBtn">
								<u-image src="/static/image/upload.png" width="50" height="50"></u-image>
							</view>
						</u-upload>
					</view>
					<u-gap height="18"></u-gap>
					<view class="color-C3C3C3">上传法人身份证</view>
					<u-gap height="45"></u-gap>
				</view>
			</view>
		</view>
		<view v-show="current==3">
			<view class="title">《湖北广莱车友汇商家入驻服务协议》</view>
			<view class="content">
				<u-parse :html="txt"></u-parse>
			</view>
			<view class="u-margin-top-12 u-margin-bottom-12 u-text-center">
				<u-checkbox-group class="u-flex u-row-center u-col-center" @change="checkboxGroupChange">
					<u-checkbox v-model="item.checked" v-for="(item, index) in list" :key="index" :name="item.name">
						{{item.name}}
					</u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<view class="btn-wrap u-padding-top-20 u-padding-left-25 u-padding-right-25 u-padding-bottom-50">
			<u-row gutter="25" v-if="current==0">
				<u-col span="6">
					<view class="btn btn-primary" @click="next">
						提交
					</view>
				</u-col>
				<u-col span="6">
					<view class="btn" @click="choseLocation">
						地图选点
					</view>
				</u-col>
			</u-row>

			<u-row gutter="25" v-if="current==1 || current==2">
				<u-col span="6">
					<view class="btn" @click="previous">
						上一步
					</view>
				</u-col>
				<u-col span="6">
					<view class="btn btn-primary" @click="next">
						提交
					</view>
				</u-col>
			</u-row>

			<u-row gutter="25" v-if="current==3">
				<u-col span="6">
					<view class="btn" @click="previous">
						上一步
					</view>
				</u-col>
				<u-col span="6">
					<view class="btn btn-primary" @click="submit">
						提交
					</view>
				</u-col>
			</u-row>
		</view>

		<u-mask :show="show" @click="show = false" :mask-click-able="false">
			<view class="wrap pos-abs-center bg-white border-radius-30">
				<view class="u-font-40 color-010101 u-text-center u-margin-top-56 u-margin-bottom-60 ">入驻提示</view>
				<view class="u-font-28 color-666666">为了便于用户在平台上就近寻找您的店铺进行服务，请点击下方的按钮标注您的店铺所在。</view>
				<view class="u-text-right u-margin-top-60 u-margin-right-20">
					<u-button type="primary" size="mini" shape="circle" @click="choseLocation" @tap.stop>地图选点</u-button>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import * as config from '../../../common/config.js'
	export default {
		data() {
			return {
				list: [{
					name: '我已详细阅读并同意',
					checked: false,
					disabled: false
				}],
				servicelist: [],
				serviceCodeList: [],
				tips: '',
				seconds: 60,
				show: true,
				txt: config.txt,
				action: config.baseUrl + '/file/upload',
				haeder: {
					'Authorization': uni.getStorageSync('tokenHead') + uni.getStorageSync('token'),
				},
				formData: {
					'type': config.uploadImgtype.shop,
					"id": uni.getStorageSync('shopId')
				},
				name: 'file',
				form: {
					isXc: 0,
					isWx: 0,
					isBy: 0,
					merchantId: uni.getStorageSync('merchantId'),
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
					merchantShopImg: '',
					merchantImg: []
				},

				labelStyle: {
					fontSize: '25rpx',
					color: '#333333'
				},
				current: 0,
				agree: [],
				numList: [{
					name: "填写店铺信息"
				}, {
					name: "填写登录信息"
				}, {
					name: "上传图片信息"
				}, {
					name: "商家服务协议"
				}]
			}
		},
		onLoad() {
			this.getServicelist()
		},
		methods: {
			getServicelist() {
				this.$u.api.getServicelist().then(res => {
					for (var i = 0; i < res.length; i++) {
						res[i].checked = false
					}
					this.servicelist = res
				})
			},
			serviceCodeChange(e) {
				this.form.isXc = 0
				this.form.isBy = 0
				this.form.isWx = 0

				for (var i = 0; i < e.length; i++) {
					var str = e[i]
					this.form['is' + str[0] + str[1].toLowerCase()] = 1
				}
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				this.agree = e
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if (!this.form.merchantPhone) {
						uni.showToast({
							title: "请输入手机号",
							icon: "none"
						})
						return
					}
					if(!config.mobilePhoneReg.test(this.form.merchantPhone)){
						uni.showToast({
							title: '手机号格式错误',
							icon: 'none'
						})
						return
					}
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.$u.api.sendMessage({
						phone: this.form.merchantPhone
					}).then(res => {
						uni.hideLoading();
						if (res == '短信发送成功') {
							this.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						} else {
							this.$u.toast(res.message);
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			async next() {
				if (this.current >= 4) {
					return
				}
				let index = this.current
				if (index == 0) {
					if (!this.form.shopName) {
						uni.showToast({
							title: '请填写店铺名称',
							icon: 'none'
						})
						return
					}
					if (!this.form.shopAddress) {
						uni.showToast({
							title: '请填写店铺地址',
							icon: 'none'
						})
						return
					}
					if (!this.form.merchantName) {
						uni.showToast({
							title: '请填写店铺法人',
							icon: 'none'
						})
						return
					}
					if (!this.form.shopPhone) {
						uni.showToast({
							title: '请填写店铺电话',
							icon: 'none'
						})
						return
					}
					if (!this.form.shopProfile) {
						uni.showToast({
							title: '请填写店铺简介',
							icon: 'none'
						})
						return
					}
					if (this.form.isWx == 0 && this.form.isBy == 0 && this.form.isXc == 0) {
						uni.showToast({
							title: '请选择服务',
							icon: 'none'
						})
						return
					}
					this.current++
				}
				if (index == 1) {
					if (!this.form.merchantPhone) {
						uni.showToast({
							title: '请填写您绑定的手机号',
							icon: 'none'
						})
						return
					}
					if (!this.form.code) {
						uni.showToast({
							title: '请输入验证码',
							icon: 'none'
						})
						return
					}
					if (!this.form.merchantPassword) {
						uni.showToast({
							title: '请输入您登录的密码',
							icon: 'none'
						})
						return
					}
					if (!this.form.confirmMerchantPassword) {
						uni.showToast({
							title: '请再次输入您的密码',
							icon: 'none'
						})
						return
					}
					if (this.form.merchantPassword != this.form.confirmMerchantPassword) {
						uni.showToast({
							title: '两次密码输入不一致',
							icon: 'none'
						})
						return
					}
					this.$u.api.validateMsg({
						phone: this.form.merchantPhone,
						code: this.form.code
					}).then(res=>{
						if (res.code==500 && res.message.indexOf('短信验证码有误')>-1) {
							uni.showToast({
								title: '手机验证失败，请重试',
								icon: 'none'
							})
						}else{
							this.current++
						}
					})
				}
				if (index == 2) {
					if (!this.form.shopImg) {
						uni.showToast({
							title: '请上传店铺门头照',
							icon: 'none'
						})
						return
					}
					if (this.form.shopImgList.length <= 0) {
						uni.showToast({
							title: '请上传店铺环境照',
							icon: 'none'
						})
						return
					}
					if (!this.form.merchantShopImg) {
						uni.showToast({
							title: '请上传营业执照',
							icon: 'none'
						})
						return
					}
					if (!this.form.merchantImg) {
						uni.showToast({
							title: '请上传法人身份证正面照',
							icon: 'none'
						})
						return
					}
					this.current++
				}
				if (index == 3) {
					if (this.agree.length <= 0) {
						uni.showToast({
							title: '请点击同意按钮',
							icon: 'none'
						})
						return
					}
					this.current++
				}
				
			},
			previous() {
				if (this.current <= 0) {
					return
				}
				this.current--
			},
			choseLocation() {
				let _this = this
				wx.chooseLocation({
					success: (data) => {
						if (data.name) {
							this.form.shopAddress = data.address
							this.form.shopName = data.name
							this.form.latitude = data.latitude
							this.form.longitude = data.longitude
							this.show = false
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
														if (data.authSetting[
																"scope.userLocation"
															] === true) {
															wx.showToast({
																title: '授权成功',
																icon: 'success',
																duration: 1000
															})
															//授权成功之后，再调用chooseLocation选择地方
															setTimeout(
																function() {
																	_this
																		.choseLocation()
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

			addShopImg(data, index, lists, name) {
				this.form.shopImg = data
			},
			removeShopImg(index, lists, name) {
				this.form.shopImg = ''
			},

			addMerchantShopImg(data, index, lists, name) {
				this.form.merchantShopImg = data
			},
			removeMerchantShopImg(index, lists, name) {
				this.form.merchantShopImg = ''
			},

			addMerchantImg(data, index, lists, name) {
				this.form.merchantImg = data
			},
			removeMerchantImg(index, lists, name) {
				this.form.merchantImg = ''
			},

			addShopImgList(data, index, lists, name) {
				this.form.shopImgList.push(data)
			},
			removeShopImgList(index, lists, name) {
				let arr = this.form.shopImgList
				arr.splice(index, 1)
				this.form.shopImgList = arr
			},
			submit() {
				let index = this.current
				if (index == 3) {
					if (this.agree.length <= 0) {
						uni.showToast({
							title: '请点击同意按钮',
							icon: 'none'
						})
						return
					}
				}
				this.form.shopImgList = JSON.stringify(this.form.shopImgList)
				this.form.promoCode = uni.getStorageSync('inviteCode')
				this.$u.api.register(this.form).then(res => {
					uni.removeStorageSync('inviteCode')
					uni.redirectTo({
						url: '../wait/wait'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	.color-C3C3C3 {
		color: #c3c3c3;
	}
	.u-input {
		width: 95%;
	}

	.addBtn {
		width: 100rpx;
		height: 100rpx;
		background-color: #f4f4f4;
	}

	.wrap {
		width: 560rpx;
		height: 430rpx;
		padding-left: 50rpx;
		padding-right: 50rpx;
	}

	.title {
		text-align: center;
		font-size: 32rpx;
		color: #000000;
		margin-top: 57rpx;
		margin-bottom: 64rpx;
	}

	.content {
		border: 1rpx solid #eeeeee;
		margin: 0 auto;
		padding: 0 14rpx 40rpx;
		line-height: 1.5;
		width: 690rpx;
		height: 690rpx;
		overflow-y: scroll;
		font-size: 26rpx;
		color: #444444;
	}

	.icon-wrap {
		width: 38rpx;
		height: 38rpx;
		border-radius: 50%;
		border: 1rpx solid #000000;
	}

	.color-D81E06 {
		color: #D81E06;
	}

	.btn {
		border: 1rpx solid $uni-color-primary;
		color: $uni-color-primary;
		font-size: 28rpx;
		text-align: center;
		line-height: 62rpx;
		border-radius: 15rpx;
	}

	.btn-primary {
		color: #FFFFFF;
		background-color: $uni-color-primary;
	}

	.btn-wrap {}
</style>
