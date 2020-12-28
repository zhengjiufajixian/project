<template>
	<view>
		<view class="navbar"></view>
		<view class="u-text-center user-info">
			<view class="avatar">
				<u-avatar :src="userInfo.merchantImg" size="150" mode="circle"></u-avatar>
			</view>
			<view class="u-font-34 user-name">
				<text>{{userInfo.merchantName}}</text>
			</view>
			<view class="u-font-26 edit-info" @click="setPage('info')">
				<text>营业时间：9:00-22:00</text>
			</view>
		</view>
		<view class="wrap1">
			<u-row class="info-list">
				<u-col class="list-item" span="4">
					<view class="number">+6000</view>
					<view class="title">昨日营收</view>
				</u-col>
				<u-col class="list-item" span="4">
					<view class="number">200</view>
					<view class="title">业务订单</view>
				</u-col>
				<u-col class="list-item" span="4">
					<view class="number">3%</view>
					<view class="title">较昨日增长</view>
				</u-col>
			</u-row>
		</view>
		<view class="wrap2 u-flex u-col-center u-row-between" v-if="userInfo.shopStatus!=3">
			<text>是否开始营业</text>
			<u-switch v-model="checked" @change="changeShopStatus"></u-switch>
		</view>
		<view class="wrap2 u-flex u-col-center u-row-between" v-else>
			<text>店铺已关闭下架</text>
		</view>
		<view class="wrap3">
			<view class="title">
				<text>我的服务</text>
			</view>
			<u-row class="info-list">
				<u-col class="list-item" span="3">
					<navigator url="../wallet/wallet">
						<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的钱包</text>
						</view>
					</navigator>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="../order/order" open-type="switchTab">
						<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的订单</text>
						</view>
					</navigator>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="../commodity/commodity" open-type="switchTab">
						<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">商品管理</text>
						</view>
					</navigator>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="../setting/setting" open-type="switchTab">
						<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">个人信息</text>
						</view>
					</navigator>
				</u-col>
			</u-row>
		</view>
		<view class="wrap4">
			<u-row class="info-list">
				<u-col class="list-item" span="3">
					<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">经营分析</text>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<u-image class="img" src='../../../static/image/dingdan.png' height="55" width="62">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">专属客服</text>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					merchantImg: '',
					merchantName: ''
				},
				checked: false
			}
		},
		onShow() {
			this.userInfo.merchantImg = uni.getStorageSync('merchantImg')
			this.userInfo.merchantName = uni.getStorageSync('merchantName')
		},
		onLoad() {
			this.$u.api.getUserInfo().then(res => {
				uni.setStorageSync('merchantName', res.merchantName)
				uni.setStorageSync('merchantImg', res.merchantImg)
				uni.setStorageSync('shopId', res.shopId)
				this.userInfo = res
				// status 1休息,2营业,3关闭下架
				if (res.shopStatus == 1) {
					this.checked = false
				}
				if (res.shopStatus == 2) {
					this.checked = true
				}
			})
		},
		methods: {
			setPage(page) {
				uni.navigateTo({
					url: '/pages/my/' + page + "/" + page,
				});
			},
			changeShopStatus() {
				let status = this.checked ? 2 : 1
				console.log(status)
				this.$u.api.changShopStatus({
					status: status
				}).then(res => {
					uni.showToast({
						title: "修改成功"
					})
					this.checked = status == 1 ? false : true
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
		background: url(../../static/image/setting_bg.png) no-repeat center center;
		background-size: 100% 100%;
		height: 390rpx;
		color: #fff;
	}

	.avatar {
		display: inline-block;
		margin-top: 28rpx;
	}

	.user-name {
		margin: 20rpx 0 12rpx 0;
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
