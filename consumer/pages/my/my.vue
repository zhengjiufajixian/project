<template>
	<view>
		<!-- <view class="top">
			<view class="avatar">
				<u-avatar :src="userInfo.headImg" size="150"></u-avatar>
			</view>
			<view v-if="userInfo.userName">
				<view class="u-font-34 user-name">
					<text>{{userInfo.userName}}</text>
				</view>
				<view @click="checkLoginStatus('/pages/my/info/info')">
					<view class="u-font-24 edit-info">
						<text>编辑资料</text>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="u-font-34 user-name">
					<navigator url="/pages/login/login" hover-class="none">
						去登录
					</navigator>
				</view>
			</view>
			<image class='img' src='https://6e69-niew6-1302638010.tcb.qcloud.la/%E5%85%B6%E4%BB%96%E6%96%87%E4%BB%B6/bolangbeijing.gif?sign=9940c77963b09fcbb9048c1083d515e0&t=1605080423'
			 mode='scaleToFill'></image>
		</view> -->
		<view class="u-text-center user-info">
			<view class="avatar">
				<u-avatar :src="userInfo.headImg" size="150"></u-avatar>
			</view>
			<view v-if="userInfo.userName">
				<view class="u-font-34 user-name">
					<text>{{userInfo.userName}}</text>
				</view>
				<view @click="checkLoginStatus('/subPackages/info/info')">
					<view class="u-font-24 edit-info">
						<text>编辑资料</text>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="u-font-34 user-name">
					<navigator url="/pages/login/login" hover-class="none">
						去登录
					</navigator>
				</view>
			</view>
		</view>
		<view class="wrap1">
			<u-row class="info-list">
				<u-col class="list-item" span="3">
					<view @click="checkLoginStatus('/subPackages/wallet/wallet')">
						<u-image class="img" src='/static/image/qianbao.png' height="55" width="55" mode="aspectFit"></u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的钱包</text>
						</view>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<view @click="checkLoginStatus('/subPackages/newOrder/newOrder')">
						<u-image class="img" src='/static/image/dingdan.png' height="55" width="55" mode="aspectFit"></u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的订单</text>
						</view>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<view @click="checkLoginStatus('/subPackages/vip/vip')">
						<u-image class="img" src='/static/image/huiyuan.png' height="55" width="55" mode="aspectFit"></u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的会员</text>
						</view>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator :url="isLogin?'/subPackages/myCar/myCar':'/pages/login/login'" hover-class="none">
						<u-image class="img" src='/static/image/cheliang.png' height="55" width="55" mode="aspectFit"></u-image>
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
					<view @click="checkLoginStatus('/subPackages/message/message')">
						<u-image class="img" src='/static/image/message.png' height="55" width="55" mode="aspectFit"></u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的消息</text>
						</view>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="/subPackages/contact/contact" hover-class="none">
						<u-image class="img" src='/static/image/contact.png' height="55" width="55" mode="aspectFit"></u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">联系客服</text>
						</view>
					</navigator>
				</u-col>
				<u-col class="list-item" span="3">
					<view @click="checkLoginStatus('/subPackages/booking/booking')">
						<u-image class="img" src='/static/image/booking.png' height="55" width="55" mode="aspectFit"></u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">我的预约</text>
						</view>						
					</view>
				</u-col>
				<u-col class="list-item" span="3" @click="toMerchant">
					<u-image class="img" src='/static/image/qianbao.png' height="55" width="55" mode="aspectFit"></u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">入驻申请</text>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="wrap3">
			<u-row class="info-list">
				
				<!-- <u-col class="list-item" span="3" @click="noData">
					<u-image class="img" src='/static/image/shigu.png' height="55" width="55" mode="aspectFit"></u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">事故处理</text>
					</view>
				</u-col>
				<u-col class="list-item" span="3" @click="noData">
					<u-image class="img" src='/static/image/baoyang.png' height="55" width="55" mode="aspectFit"></u-image>
					<view class="u-text-center u-margin-top-12">
						<text class="u-font-26">美容保养</text>
					</view>
				</u-col> -->
				<u-col class="list-item" span="3">
					<view @click="checkLoginStatus('/subPackages/setting/setting')">
						<u-image class="img" src='/static/image/cheliang.png' height="55" width="55" mode="aspectFit"></u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">设置</text>
						</view>
					</view>
				</u-col>
				<u-col class="list-item" span="3">
					<navigator url="/subPackages/guidePage/guidePage" hover-class="none">
						<u-image class="img" src='/static/image/help-2.png' height="55" width="55" mode="aspectFit"></u-image>
						<view class="u-text-center u-margin-top-12">
							<text class="u-font-26">使用手册</text>
						</view>						
					</navigator>
				</u-col>
			</u-row>
		</view>
		<u-modal v-model="carModal" content="暂未绑定车辆" confirm-text="去绑定" @confirm="toAddCar" :show-title="false" :mask-close-able="true" :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					headImg:''
				},
				isLogin: false,
				carModal: false
			}
		},
		onShow() {
			if(uni.getStorageSync('token')){
				this.isLogin = true
				this.getUserInfo()
			}else{
				this.isLogin = false
				this.userInfo = {
					headImg:''
				}
			}
		},
		methods: {
			getUserInfo() {
				this.$u.api.getUserInfo().then(res => {
					uni.setStorageSync('headImg', res.headImg)
					uni.setStorageSync('userName', res.userName)
					this.userInfo = res
				})
			},
			checkLoginStatus(url) {
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}else{
					if(uni.getStorageSync('carNumber')){
						uni.navigateTo({
							url: url
						})						
					}else{
						this.carModal = true
					}
				}
			},
			toAddCar() {
				uni.navigateTo({
					url:'/subPackages/myCar/myCar'
				})
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
	.top {
		position: relative;
		width: 100%;
		height: 400rpx;
		background: #1672FF;
		text-align: center;
		color: #fff;
		.img {
			position: absolute;
			width: 100%;
			bottom: 0;
			left: 0;
			z-index: 99;
			mix-blend-mode: screen;
			height: 150rpx; //需要波浪高的话，调整该值
		}
	}
	
	
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
		margin-top: 28rpx;
	}

	.user-name {
		margin: 20rpx 0 0 0;
	}
	
	.edit-info {
		display: inline-block;
		padding: 20rpx;
	}
	
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
