<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="setting-wrap">
			<view class="setting-item" @click="album">
				<u-section color="#333333" title="头像" :show-line="false" :bold="false" font-size="26">
					<u-avatar :src="userInfo.merchantImg" size="mini" slot="right"></u-avatar>
					<u-icon name="arrow-right" size="28" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<view class="setting-item" @click="setPage('merchantName',userInfo.merchantName)">
				<u-section color="#333333" title="昵称" :show-line="false" :bold="false" font-size="26">
					<text color="#666666" slot="right">{{userInfo.merchantName}}</text>
					<u-icon name="arrow-right" size="28" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<u-gap height="20"></u-gap>
		<view class="setting-wrap">
			<view class="setting-item" @click="setPage('bindPhone')">
				<u-section color="#333333" title="身份认证" sub-title=" " :show-line="false" :bold="false" font-size="26"> </u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<view class="setting-item" @click="setPage('shopProfile',userInfo.shopProfile)">
				<u-section color="#333333" title="店铺简介" sub-title=" " :show-line="false" :bold="false" font-size="26">
					<text color="#666666" slot="right">{{userInfo.shopProfile}}</text>
					<u-icon name="arrow-right" size="28" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<view class="setting-item" @click="setPage('shopAddress',userInfo.shopAddress)">
				<u-section color="#333333" title="店铺地址" :show-line="false" :bold="false" font-size="26">
					<text color="#666666" slot="right">{{userInfo.shopAddress}}</text>
					<u-icon name="arrow-right" size="28" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<view class="setting-item" @click="setPage('merchantPhone',userInfo.merchantPhone)">
				<u-section color="#333333" title="店铺电话" :show-line="false" :bold="false" font-size="26">
					<text color="#666666" slot="right">{{userInfo.merchantPhone}}</text>
					<u-icon name="arrow-right" size="28" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<view class="setting-item" @click="setPage('address')">
				<u-section color="#333333" title="收款信息" sub-title=" " :show-line="false" :bold="false" font-size="26"></u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import * as config from "../../common/config.js"
	export default {
		data() {
			return {
				userInfo: {},
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			setPage(page, params) {
				uni.navigateTo({
					url: '/pages/my/info/' + page + "/" + page + "?" + page + "=" + params,
				});
			},
			getUserInfo() {
				this.$u.api.getUserInfo().then(res => {
					uni.setStorageSync('merchantName',res.merchantName)
					uni.setStorageSync('merchantImg',res.merchantImg)
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
							title:'上传中...',
							mask: true
						})
						uni.uploadFile({
							url: config.baseUrl + '/file/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								Authorization: uni.getStorageSync('tokenHead') + uni.getStorageSync('token')
							},
							formData: {
								'type': 'head'
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
	.setting-wrap {
		background-color: #fff;
		padding: 0 40rpx 0 30rpx;

		.u-section__title__text {
			line-height: 3 !important;
		}
	}

	.popup-wrap {
		width: 80%;
		margin: 0 auto;
	}
</style>
