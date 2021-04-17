<template>
	<view>
		<view class="u-flex u-padding-left-30 u-padding-right-30 top">
			<u-avatar size="84" :src="headImg"></u-avatar>
			<view class="u-margin-left-15">
				<view><text class="color-FFFFFF u-font-34">{{userName}}</text></view>
				<view v-if="level == 1 && time"><text class="color-999999 u-font-26">会员到期时间 {{time}} <text
							class="color-FF2828 u-margin-left-10"> (已过期)</text></text></view>
				<view v-if="level == 1 && !time"><text class="color-999999 u-font-26">未开通会员</text></view>
				<view v-if="level != 1"><text class="color-999999 u-font-26">会员到期时间 {{time}}</text></view>
			</view>
		</view>
		<view class="u-relative banner">
			<view class="u-absolute bg"></view>
			<view class="wrap">
				<u-swiper :list="bannerList" height="366" :effect3d="true" bg-color="rgba(0,0,0,0))"
					:autoplay="autoplay" :current="current">
				</u-swiper>
			</view>
		</view>
		<view class="list u-text-center u-padding-left-24 u-padding-right-24">
			<view class="u-relative u-padding-bottom-30">
				<text class="color-E6C393">年度VIP</text>
				<text class="border-bottom"></text>
			</view>
			<u-line color="#F3F4F7"></u-line>
			<u-gap height="44"></u-gap>
			<view
				:class="'list-item u-flex u-row-between u-padding-left-26 u-padding-right-36 ' + (level == 2 ? 'active':'') ">
				<text class="color-333333 u-font-30">车价20万以下</text>
				<text class="u-font-40 color-DCBA8C"><text class="u-font-20">￥</text>1500</text>
			</view>
			<u-gap height="20"></u-gap>
			<view
				:class="'list-item u-flex u-row-between u-padding-left-26 u-padding-right-36 ' + (level == 3 ? 'active':'') ">
				<text class="color-333333 u-font-30">车价20万-30万</text>
				<text class="u-font-40 color-DCBA8C"><text class="u-font-20">￥</text>3000</text>
			</view>
			<u-gap height="20"></u-gap>
			<view
				:class="'list-item u-flex u-row-between u-padding-left-26 u-padding-right-36 ' + (level == 4 ? 'active':'') ">
				<text class="color-333333 u-font-30">车价30万以上</text>
				<text class="u-font-40 color-DCBA8C"><text class="u-font-20">￥</text>5000</text>
			</view>
		</view>
		<u-gap height="52"></u-gap>
		<view class="fixed-btn u-flex u-row-center u-padding-top-40 u-padding-bottom-40" @click="call">
			<view class="u-flex u-row-center u-col-center">
				<u-image src="/subPackages/static/image/kefu.png" width="42" height="42"></u-image>
			</view>
			<text class="u-margin-left-10 color-000000 u-font-26">联系客服</text>
		</view>
		<!-- <view class="u-text-center u-margin-top-25 u-margin-bottom-60">
			<view><checkbox value="cb" checked="true" /><text class="u-font-28 color-999999">我已阅读并同意<text class="color-DCBA8C">《会员服务协议》</text></text></view>
		</view>
		<u-gap height="20" bg-color="#F4F4F4"></u-gap> -->
		<!-- <view class="u-flex u-row-between u-col-center u-padding-left-22 u-padding-right-22 u-padding-top-26 u-padding-bottom-34">
			<view>
				<text class="color-333333 u-font-32 bold">会员中心</text>
			</view>
			<view>
				<text class="color-999999 u-font-26">点击查看全部<text class="color-FF0000">4</text>项特权</text>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="u-flex u-row-center u-col-center u-text-center color-DEBA88 u-font-26">
			<view class="u-flex-3">
				<view class="">
					<u-icon name="home" size="100"></u-icon>
				</view>
				<view class="">
					<text>汽车保养</text>
				</view>
			</view>
			<view class="u-flex-3">
				<view class="">
					<u-icon name="home" size="100"></u-icon>
				</view>
				<view class="">
					<text>汽车保养</text>
				</view>
			</view>
			<view class="u-flex-3">
				<view class="">
					<u-icon name="home" size="100"></u-icon>
				</view>
				<view class="">
					<text>汽车保养</text>
				</view>
			</view>
			<view class="u-flex-3">
				<view class="">
					<u-icon name="home" size="100"></u-icon>
				</view>
				<view class="">
					<text>汽车保养</text>
				</view>
			</view>
		</view>
		<view class="btn-wrap u-padding-left-22 u-padding-right-22">
			<u-button :custom-style="customStyle">开通年度VIP (1500元)</u-button>
		</view> -->
	</view>
</template>

<script>
	import * as config from "../../common/config.js"
	export default {
		data() {
			return {
				// 轮播图
				bannerList: [{
					image: '/subPackages/static/image/level1.png',
				}, {
					image: '/subPackages/static/image/level2.png',
				}, {
					image: '/subPackages/static/image/level3.png',
				}],
				current: 0,
				shopList: [],
				// 按钮样式
				customStyle: {
					backgroundColor: '#DEBA88',
					color: '#F4F4F4',
					height: '80rpx',
					lineHeight: '80rpx'
				},
				status: 'loading',
				page: 1,
				level: 0, // 普通用户 1   依次叠加 （2-4）
				time: '', // 到期时间
				headImg: '',
				userName: '',
				autoplay: true,
			}
		},
		onShow() {
			this.headImg = uni.getStorageSync('headImg')
			this.userName = uni.getStorageSync('userName')
		},
		onLoad() {
			this.getVip()
		},
		methods: {
			getVip() {
				this.$u.api.getVip().then(res => {
					this.level = res.level
					this.time = res.time
					if (res.level != 1) {
						let obj = {
							image: '/subPackages/static/image/level' + (res.level - 1) + '-active.png'
						}
						this.bannerList.splice(res.level - 2, 1, obj)
						this.current = res.level - 2
						this.autoplay = false
					}
				})
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: config.contactPhone
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.top {
		height: 160rpx;
		background-color: #3D3C3A;

	}

	.banner {
		height: 250rpx;
		margin-bottom: 160rpx;

		.bg {
			z-index: -1;
			background-color: #3D3C3A;
			height: 80%;
			width: 100%;
			left: 0;
			top: 0;
		}
	}

	.color-E6C393 {
		color: #E6C393;
	}

	.color-DCBA8C {
		color: #DCBA8C;
	}

	.color-DEBA88 {
		color: #DEBA88;
	}

	.color-FF0000 {
		color: #FF0000;
	}

	.list {

		.border-bottom {
			width: 60rpx;
			height: 8rpx;
			background: #DDB88E;
			display: inline-block;
			border-radius: 4rpx;
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
		}

		.list-item {
			border: 1rpx solid #EBCB9C;
			border-radius: 10rpx;
			line-height: 98rpx;
			background-size: 100% 100%;
		}

		.active {
			background: url('/subPackages/static/image/vip-list-bg.png') no-repeat;
			background-size: 100% 100%;
		}
	}

	.btn-wrap {
		border-radius: 10rpx;
		margin: 20rpx auto 20px;
	}

	.fixed-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		border-top: 2rpx solid #dedede;
	}
</style>
