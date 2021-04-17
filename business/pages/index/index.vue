<template>
	<view class="u-skeleton">
		<view class="u-text-center user-info">
			<view class="avatar u-skeleton-circle">
				<u-avatar :src="userInfo.merchantImg" size="150" mode="circle"></u-avatar>
			</view>
			<view class="u-font-34 user-name">
				<text class="u-skeleton-fillet">{{userInfo.merchantName?userInfo.merchantName:''}}</text>
			</view>
			<view class="u-font-26 edit-info" v-if="userInfo.shopName">
				<text class="u-skeleton-fillet">店铺名称：{{userInfo.shopName}}</text>
			</view>
			<view class="u-font-26 u-margin-top-10 edit-info" v-if="start">
				<text
					class="u-skeleton-fillet">营业时间：{{start.hour + ':' + start.minute }}-{{end.hour + ':' + end.minute}}</text>
			</view>
			<view class="u-font-26 u-margin-top-10 edit-info" v-else>
				<text class="u-skeleton-fillet">营业时间：暂未设置</text>
			</view>
		</view>
		<view class="wrap1 u-skeleton-fillet">
			<u-row class="info-list">
				<u-col class="list-item" span="4">
					<view class="number">+{{shopData.money}}</view>
					<view class="title">昨日营收</view>
				</u-col>
				<u-col class="list-item" span="4">
					<view class="number">{{shopData.orderCount}}</view>
					<view class="title">业务订单</view>
				</u-col>
				<u-col class="list-item" span="4">
					<view class="number">{{shopData.add ? shopData.add + '%' :0 + '%'}}</view>
					<view class="title">较昨日增长</view>
				</u-col>
			</u-row>
		</view>
		<view class="wrap2 u-flex u-col-center u-row-between u-skeleton-fillet"
			v-if="userInfo.shopStatus!=3 && isLogin">
			<text>是否开始营业</text>
			<u-switch v-model="checked" @change="changeShopStatus"></u-switch>
		</view>
		<view class="wrap2 u-flex u-col-center u-row-between u-skeleton-fillet" @click="naviToSet"
			v-if="userInfo.shopStatus!=3">
			<text>营业设置</text>
			<u-icon name="arrow-right" size="32"></u-icon>
		</view>
		<view class="wrap2 u-flex u-col-center u-row-between" v-if="userInfo.shopStatus == 3">
			<text>店铺已关闭下架</text>
		</view>
		<view class="wrap3 u-skeleton-fillet" v-if="isLogin">
			<view class="title">
				<text>我的服务</text>
			</view>
			<u-row class="info-list">
				<u-col class="list-item" span="3">
					<navigator url="../wallet/wallet" hover-class="none">
						<u-image class="img" src='/static/image/wallet.png' height="40" width="40" mode="aspectFit">
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的钱包</text>
						</view>
					</navigator>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="../commodity/commodity" open-type="switchTab" hover-class="none">
						<u-image class="img" src='/static/image/commodity.png' height="40" width="40" mode="aspectFit">
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">商品管理</text>
						</view>
					</navigator>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="../setting/setting" open-type="switchTab" hover-class="none">
						<u-image class="img" src='/static/image/setting.png' height="40" width="40" mode="aspectFit">
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">个人信息</text>
						</view>
					</navigator>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="/subPackages/contact/contact" hover-class="none">
						<u-image class="img" src='/static/image/contact.png' height="40" width="40" mode="aspectFit">
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">专属客服</text>
						</view>
					</navigator>
				</u-col>
			</u-row>
		</view>
		<view class="wrap4" v-if="isLogin">
			<u-row class="info-list">
				<u-col class="list-item" span="3">
					<navigator url="/subPackages/analysis/analysis" hover-class="none">
						<u-image class="img" src='/static/image/analysis.png' height="40" width="40" mode="aspectFit">
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">经营分析</text>
						</view>
					</navigator>
				</u-col>

				<u-col class="list-item" span="3">
					<navigator url="/subPackages/guidePage/guidePage" hover-class="none">
						<u-image class="img" src='/static/image/help-2.png' height="40" width="40" mode="aspectFit">
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">操作指南</text>
						</view>
					</navigator>
				</u-col>
			</u-row>
		</view>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>

		<u-modal v-model="modalStatus" content="需要登录之后才能使用全部功能." :show-title="false" confirm-text='去登录'
			@confirm="handleConfirm"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalStatus: true,
				loading: false,
				userInfo: {
					merchantImg: '',
					merchantName: '',
					shopName: ''
				},
				start: '',
				end: '',
				checked: false,
				shopData: {
					money: '0.00',
					orderCount: '0'
				},
				customStyle: {
					border: 'none'
				},
				isLogin: false
			}
		},
		onShow() {
			this.isLogin = !!uni.getStorageSync('token')
			this.modalStatus = !this.isLogin
			this.userInfo.merchantImg = uni.getStorageSync('merchantImg')
			this.userInfo.merchantName = uni.getStorageSync('merchantName')
			this.userInfo.shopName = uni.getStorageSync('shopName')
			if (uni.getStorageSync('start')) {
				this.start = JSON.parse(uni.getStorageSync('start'))
				this.end = JSON.parse(uni.getStorageSync('end'))
			}
			// this.$u.mpShare = {
			// 	title: '邀请注册', // 默认为小程序名称，可自定义
			// 	path: '/pages/login/login?inviteCode=' + uni.getStorageSync('promoCode'), // 默认为当前页面路径，一般无需修改，QQ小程序不支持
			// 	// 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
			// 	// 支持PNG及JPG，默认为当前页面的截图
			// 	imageUrl: '/static/image/share.jpg'
			// }
		},
		onLoad() {
			if (uni.getStorageSync('token')) {
				this.getUserInfo()
				this.getYesterday()
			}
		},
		methods: {
			handleConfirm() {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			},
			naviToSet() {
				if (this.isLogin) {
					uni.navigateTo({
						url: '/subPackages/setBusiness/setBusiness'
					})
				}
			},
			getBusinessTime() {
				this.$u.api.getBusinessTime().then(res => {

					this.loading = false

					if (!res) {
						return
					}
					let startHours = new Date(res.startTime).getHours()
					let startMinutes = new Date(res.startTime).getMinutes()
					this.start = {
						hour: startHours < 10 ? ('0' + startHours) : startHours,
						minute: startMinutes < 10 ? ('0' + startMinutes) : startMinutes
					}

					let endHours = new Date(res.endTime).getHours()
					let endMinutes = new Date(res.endTime).getMinutes()
					this.end = {
						hour: endHours < 10 ? ('0' + endHours) : endHours,
						minute: endMinutes < 10 ? ('0' + endMinutes) : endMinutes
					}

					uni.setStorageSync('start', JSON.stringify(this.start))
					uni.setStorageSync('end', JSON.stringify(this.end))


				})
			},
			setPage(page) {
				uni.navigateTo({
					url: '/pages/my/' + page + "/" + page,
				});
			},
			getYesterday() {
				this.$u.api.getYesterday().then(res => {
					this.shopData = res
				})
			},
			getUserInfo() {
				this.$u.api.getUserInfo().then(res => {
					uni.setStorageSync('merchantName', res.merchantName)
					uni.setStorageSync('merchantImg', res.merchantImg)
					uni.setStorageSync('merchantPhone', res.merchantPhone)
					uni.setStorageSync('shopId', res.shopId)
					uni.setStorageSync('shopName', res.shopName)
					uni.setStorageSync('promoCode', res.promoCode)
					uni.setStorageSync('isXC', res.isXc)
					uni.setStorageSync('isBY', res.isBy)
					uni.setStorageSync('isWX', res.isWx)
					this.userInfo = res
					// status 1休息,2营业,3关闭下架
					if (res.shopStatus == 1) {
						this.checked = false
					}
					if (res.shopStatus == 2) {
						this.checked = true
					}
					this.getBusinessTime()
				})
			},
			changeShopStatus() {
				let status = this.checked ? 2 : 1
				this.$u.api.changShopStatus({
					status: status
				}).then(res => {
					if (res.code == 500) {
						this.checked = status == 1 ? true : false
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					} else {
						let title = this.checked ? '开始营业成功' : '暂停营业成功'

						uni.showToast({
							title: title,
						})

					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-image {
		margin: 0 auto;
	}

	.user-info {
		// background-color: $uni-color-primary;
		background: url('/static/image/setting_bg.png') no-repeat center center;
		background-size: 100% 100%;
		height: 390rpx;
		color: #fff;
	}

	.avatar {
		display: inline-block;
		margin-top: 20rpx;
	}

	.user-name {
		margin: 20rpx 0 10rpx 0;
	}

	.edit-info {}

	.wrap1,
	.wrap2,
	.wrap3,
	.wrap4,
		{
		background-color: #fff;
		margin: 18rpx 30rpx 0;
		padding: 25rpx 0 22rpx 0;
		border-radius: 15rpx;
	}

	.wrap1 {
		.list-item {
			.number {
				text-align: center;
				font-size: 36rpx;
				color: $uni-color-primary;
				font-weight: bold;
			}

			.title {
				text-align: center;
				font-size: 26rpx;
				color: #666;
			}
		}
	}

	.wrap2 {
		padding-left: 30rpx;
		padding-right: 30rpx;
		color: #666;
	}

	.wrap3 {
		border-radius: 15rpx 15rpx 0 0;
		color: #666;

		.title {
			font-size: 28rpx;
			font-weight: bold;
			text-indent: 30rpx;
			margin-bottom: 40rpx;
			color: #000;
		}
	}

	.wrap4 {
		margin: 0rpx 30rpx 0;
		border-radius: 0 0 15rpx 15rpx;
		color: #666;
	}

	.info-list {
		background-color: #FFFFFF;
	}
</style>
