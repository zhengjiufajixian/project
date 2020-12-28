<template>
	<view>
		<view class="navbar"></view>
		<view class="u-text-center user-info">
			<view class="avatar">
				<u-avatar :src="userInfo.headImg" size="150" mode="circle"></u-avatar>
			</view>
			<view class="u-font-34 user-name">
				<text>{{userInfo.userName}}</text>
			</view>
			<view class="u-font-24 edit-info" @click="setPage('info')">
				<text>编辑资料</text>
			</view>
		</view>
		<view class="wrap1">
			<u-row class="info-list">
				<u-col class="list-item" span="3">
					<navigator url="../wallet/wallet" hover-class="none">
						<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的钱包</text>
						</view>
					</navigator>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="../order/order" hover-class="none">
						<u-image class="img" src='../../../static/image/dingdan.png' height="55" width="62">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的订单</text>
						</view>
					</navigator>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="../vip/vip" hover-class="none">
						<u-image class="img" src='../../../static/image/huiyuan.png' height="55" width="62">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的会员</text>
						</view>
					</navigator>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="../myCar/myCar" hover-class="none">
						<u-image class="img" src='../../../static/image/cheliang.png' height="55" width="62">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的车辆</text>
						</view>
					</navigator>
				</u-col>
			</u-row>
		</view>
		<view class="wrap2">
			<view class="title">
				<text>我的服务</text>
			</view>
			<u-row class="info-list">
				<u-col class="list-item" span="3">
					<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">我的消息</text>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">联系客服</text>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">我的活动</text>
					</view>
				</u-col>
				<u-col class="list-item" span="3" @click="toMerchant">
					<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">入驻申请</text>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="wrap3">
			<u-row class="info-list">
				<u-col class="list-item" span="3">
					<u-image class="img" src='../../../static/image/qianbao.png' height="55" width="62">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">急速救援</text>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<u-image class="img" src='../../../static/image/dingdan.png' height="55" width="62">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">事故处理</text>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<u-image class="img" src='../../../static/image/huiyuan.png' height="55" width="62">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">美容保养</text>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="/pages/setting/setting" hover-class="none">
						<u-image class="img" src='../../../static/image/cheliang.png' height="55" width="62">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">设置</text>
						</view>
					</navigator>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null
			}
		},
		onShow() {
			this.$u.api.getUserInfo().then(res => {
				uni.setStorageSync('headImg', res.headImg)
				this.userInfo = res
			})
		},
		methods: {
			setPage(page) {
				uni.navigateTo({
					url: '/pages/my/' + page + "/" + page,
				});
			},
			toMerchant() {
				uni.navigateToMiniProgram({
					appId: "wxdfec8f307cdae32c",
					path: "pages/login/login",
					success: res => {
						console.log(res)
					},
					fail: err => {
						console.log(err)
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
	.wrap3 {
		background-color: #fff;
		margin: 18rpx 30rpx 0;
		padding: 25rpx 0 22rpx 0;
		border-radius: 15rpx;
	}

	.wrap2 {
		border-radius: 15rpx 15rpx 0 0;
		color: $u-type-info-dark;

		.title {
			font-size: 28rpx;
			font-weight: bold;
			text-indent: 30rpx;
			margin-bottom: 40rpx;
			color: #000;
		}
	}

	.wrap3 {
		margin: 0rpx 30rpx 0;
		border-radius: 0 0 15rpx 15rpx;
		color: $u-type-info-dark;
	}

	.info-list {
		background-color: #FFFFFF;
	}
</style>
