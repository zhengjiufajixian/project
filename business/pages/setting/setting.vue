<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="setting-wrap">
			<view class="setting-item" @click="album">
				<u-section color="#333333" title="头像" :show-line="false" :bold="false" font-size="26">
					<u-avatar :src="userInfo.merchantImg" size="68" slot="right"></u-avatar>
					<u-icon name="arrow-right" size="24" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<navigator :url="'merchantName/merchantName?data=' + userInfo.merchantName" hover-class="none">
				<view class="setting-item">
					<u-section color="#333333" title="昵称" :show-line="false" :bold="false" font-size="26">
						<text color="#666666" slot="right">{{userInfo.merchantName}}</text>
						<u-icon name="arrow-right" size="24" slot="right"></u-icon>
					</u-section>
				</view>
			</navigator>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<u-gap height="20"></u-gap>

		<view class="setting-wrap" v-for="(item,index) in list" :key="index">
			<navigator :url="item.url" hover-class="none">
				<view class="setting-item">
					<u-section color="#333333" :title="item.title" sub-title=" " :show-line="false" :bold="false"
						font-size="26"></u-section>
				</view>
			</navigator>
			<u-line color="#f3f4f7"></u-line>
		</view>
		
		<u-gap height="20"></u-gap>
		<view class="share-wrap">
			<u-button type="default" open-type="share" class="setting-item" :hair-line="false" hover-class="none" :custom-style="customStyle">
				<view class="share-btn u-flex u-row-between">
					<view class="color-333333 u-font-26">邀请入驻</view>
					<u-icon name="arrow-right" size="24" slot="right"></u-icon>
				</view>
			</u-button>
			<u-line color="#f3f4f7"></u-line>
		</view>
		
		<u-gap height="20"></u-gap>
		<view class="setting-wrap" @click="quit">
			<view class="setting-item">
				<u-section color="#333333" title="退出登录" :show-line="false" :bold="false" font-size="26">
					<u-icon name="arrow-right" size="24" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<u-gap height="20"></u-gap>

		<u-toast ref="uToast" />

		<u-modal v-model="modalStatus" content="需要登录之后才能使用全部功能." :show-title="false" confirm-text='去登录'
			@confirm="handleConfirm"></u-modal>
	</view>
</template>

<script>
	import * as config from "../../common/config.js"
	export default {
		data() {
			return {
				modalStatus: true,
				userInfo: {},
				list: [{
					title: '店铺信息',
					url: './shopInfo/shopInfo',
				}, {
					title: '登录信息',
					url: './loginInfo/loginInfo',
				}, {
					title: '收款信息',
					url: '../../subPackages/gathering/gathering',
				}, {
					title: '服务协议',
					url: './agreement/agreement',
				}, {
					title: '商家定位',
					url: './shopLocation/shopLocation',
				}],
				customStyle: {
					border: 'none'
				},
			}
		},
		onShow() {
			this.modalStatus = !uni.getStorageSync('token')
			if (!this.modalStatus) {
				this.getUserInfo()
			}
			this.$u.mpShare = {
				title: '邀请注册', // 默认为小程序名称，可自定义
				path: '/pages/login/login?inviteCode=' + uni.getStorageSync('promoCode'), // 默认为当前页面路径，一般无需修改，QQ小程序不支持
				// 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
				// 支持PNG及JPG，默认为当前页面的截图
				imageUrl: '/static/image/share.jpg'
			}
		},
		methods: {
			quit() {
				let _this = this
				uni.clearStorage({
					success: function() {
						_this.$refs.uToast.show({
							title: '退出成功，返回首页',
							isTab: true,
							url: '/pages/index/index'
						})
						// setTimeout(function(){
						// 	uni.redirectTo({
						// 		url:'/pages/index/index'
						// 	})
						// },500)
					}
				})
			},
			setPage(page, params) {
				uni.navigateTo({
					url: '/pages/my/info/' + page + "/" + page + "?" + page + "=" + params,
				});
			},
			getUserInfo() {
				this.$u.api.getUserInfo().then(res => {
					uni.setStorageSync('merchantName', res.merchantName)
					uni.setStorageSync('merchantImg', res.merchantImg)
					uni.setStorageSync('merchantPhone', res.merchantPhone)
					uni.setStorageSync('shopName', res.shopName)
					this.userInfo = res
				})
			},
			album() {
				let _this = this
				uni.chooseImage({
					count: 1, // 最多可以选择的图片张数，默认9
					sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					success: function(res) {
						uni.showLoading({
							title: '上传中...',
							mask: true
						})
						uni.uploadFile({
							url: config.baseUrl + '/file/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								Authorization: uni.getStorageSync('tokenHead') + uni.getStorageSync(
									'token')
							},
							formData: {
								'type': config.uploadImgtype.head
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								_this.$u.api.updateMerchant({
									merchantImg: uploadFileRes.data,
									merchantId: uni.getStorageSync('merchantId')
								}).then(res => {
									uni.hideLoading()
									_this.getUserInfo()
								})
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.share-wrap {
		.share-btn {
			font-size: 26rpx;
			width: 100%;
			margin-left: 10rpx;
		}
	}
	.setting-wrap {
		background-color: #fff;
		padding: 5rpx 40rpx 5rpx 30rpx;

		.u-section__title__text {
			line-height: 3 !important;
		}

		.setting-item {
			padding-left: 20rpx;
		}
	}

	.popup-wrap {
		width: 80%;
		margin: 0 auto;
	}
</style>
