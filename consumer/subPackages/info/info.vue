<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="setting-wrap">
			<view class="setting-item" @click="showPopup">
				<u-section color="#333333" title="头像" :show-line="false" :bold="false" font-size="26">
					<u-avatar :src="userInfo.headImg" size="mini" slot="right"></u-avatar>
					<u-icon name="arrow-right" size="28" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<view class="setting-item" @click="setPage('userName',userInfo.userName)">
				<u-section color="#333333" title="昵称" :show-line="false" :bold="false" font-size="26">
					<text color="#666666" slot="right">{{userInfo.userName}}</text>
					<u-icon name="arrow-right" size="28" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<u-gap height="20"></u-gap>
		<!-- <view class="setting-wrap">
			<view class="setting-item" @click="setPage('bindPhone')">
				<u-section color="#333333" title="身份认证" sub-title=" " :show-line="false" :bold="false" font-size="26"> </u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view> -->
		<view class="setting-wrap">
			<view class="setting-item" @click="setPage('editPhone')">
				<u-section color="#333333" title="手机号" sub-title=" " :show-line="false" :bold="false" font-size="26">
					<text color="#666666" slot="right">{{userInfo.phone?userInfo.phone:'暂未绑定'}}</text>
					<u-icon name="arrow-right" size="28" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<view class="setting-item" @click="setPage('gender',userInfo.gender)">
				<u-section color="#333333" title="性别" :show-line="false" :bold="false" font-size="26">
					<text color="#666666" slot="right">{{userInfo.gender?userInfo.gender:''}}</text>
					<u-icon name="arrow-right" size="28" slot="right"></u-icon>
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<navigator class="setting-item" url="/subPackages/vip/vip" hover-class="none">
				<u-section color="#333333" title="会员到期时间" :show-line="false" :bold="false" font-size="26">
					<text color="#666666" slot="right" v-if="level == 1 && time">{{time}} <text
							class="color-FF2828 u-margin-left-10">(已过期)</text></text>
					<text color="#666666" slot="right" v-if="level == 1 && !time">去开通</text>
					<text color="#666666" slot="right" v-if="level != 1">{{time}}</text>
					<u-icon name="arrow-right" size="28" slot="right"></u-icon>
				</u-section>
			</navigator>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<u-gap height="10"></u-gap>
		<view class="setting-wrap">
			<view class="setting-item" @click="setPage('address')">
				<u-section color="#333333" title="收货地址" sub-title=" " :show-line="false" :bold="false" font-size="26">
				</u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<u-toast ref="uToast" />
		<u-popup v-model="show" mode="bottom">
			<view class="popup-wrap">
				<u-gap height="18"></u-gap>
				<u-button @click="camera">拍照</u-button>
				<u-gap height="10"></u-gap>
				<u-button @click="album">相册</u-button>
				<u-gap height="10"></u-gap>
				<u-button type="primary" @click="show = false">取消</u-button>
				<u-gap height="40"></u-gap>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import * as config from "../../common/config.js"
	export default {
		data() {
			return {
				userInfo: {},
				show: false,
				level: 1,
				time: ''
			}
		},
		onShow() {
			this.getUserInfo()
			this.getVip()
		},
		methods: {
			getVip() {
				this.$u.api.getVip().then(res => {
					this.level = res.level
					this.time = res.time
				})
			},
			setPage(page, params) {
				uni.navigateTo({
					url: '/subPackages/info/' + page + "/" + page + "?" + page + "=" + params,
				});
			},
			getUserInfo() {
				this.$u.api.getUserInfo().then(res => {
					this.userInfo = res
				})
			},
			showPopup() {
				this.show = true
			},
			camera() {
				let _this = this
				uni.chooseImage({
					count: 1, // 最多可以选择的图片张数，默认9
					sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					success: function(res) {
						_this.show = false
						uni.showLoading({
							title: "上传中..."
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
								'type': 'head'
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								_this.$u.api.upUser({
									headImg: uploadFileRes.data,
									userId: uni.getStorageSync('userId')
								}).then(res => {
									uni.hideLoading()
									_this.getUserInfo()
								})
							}
						});
					},
					fail:function(err){
						console.log(err);
					}
				});
			},
			album() {
				let _this = this
				uni.chooseImage({
					count: 1, // 最多可以选择的图片张数，默认9
					sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					success: function(res) {
						_this.show = false
						uni.showLoading({
							title: "上传中..."
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
								'type': 'head'
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								_this.$u.api.upUser({
									headImg: uploadFileRes.data,
									userId: uni.getStorageSync('userId')
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
