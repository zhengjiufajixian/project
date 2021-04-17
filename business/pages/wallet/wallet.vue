<template>
	<view>
		<u-gap height="30"></u-gap>
		<view class="bg-linear u-margin-left-30 u-margin-right-30 u-padding-left-42 u-padding-right-36">
			<view class="u-padding-top-32 u-flex u-row-between u-col-center">
				<text class="color-FEFEFE u-font-28">总资产</text>
				<!-- <view class="u-flex u-row-between u-col-center">
					<u-icon name="error-circle-fill" size="30" color="#fff"></u-icon>
					<text class="color-FFFFFF u-font-24 u-margin-left-10">提现说明</text>
				</view> -->
			</view>
			<view class="u-flex u-col-center u-row-between u-padding-top-6">
				<view class="color-FEFEFE u-font-38">{{walletInfo.all}}</view>
				<view class="color-FFFFFF u-font-30 u-flex u-col-center u-row-center btn" @click="toWithdraw">提现</view>
			</view>
			<view
				class="u-flex u-col-center u-row-between color-FEFEFE u-font-24 u-padding-top-40 u-margin-top-40 u-padding-bottom-20">
				<view>可提现： {{walletInfo.withdrawable}}</view>
				<view>本月已提现： {{walletInfo.thisMonth}}</view>
			</view>
		</view>
		<view class="u-margin-left-36 u-margin-right-36">
			<view class="u-flex u-margin-top-24">
				<text :class="activeTab == 0?'u-padding-24 active':'u-padding-24'" @click="changeTab(0)">收款记录</text>
				<text :class="activeTab == 1?'u-padding-24 active':'u-padding-24'" @click="changeTab(1)">提现记录</text>
			</view>
			<view class="list-item" v-for="(item,index) in chargeList" :key="index" v-if="activeTab == 0">
				<!-- <navigator url="recordDetail/recordDetail" hover-class="none"> -->
				<view class="u-flex u-col-center u-row-between u-padding-top-24">
					<view>
						<text class="dot u-margin-left-32 u-margin-right-10"></text>
						<text
							:class="'u-font-30 ' + (item.moneyType == 'REFUND' ?'color-999999' : 'color-1672FF')">{{item.moneyType == 'REFUND' ? '退款' : '收款'}}</text>
					</view>
					<view
						:class="'u-font-26 u-margin-right-22 ' + (item.moneyType=='REFUND'?'color-999999':'color-333333')">
						{{item.moneyType == 'REFUND' ? '-':'+'}} ￥ {{item.money}}
					</view>
				</view>
				<view
					class="u-flex u-col-center u-row-between u-margin-top-12 u-margin-left-52 u-margin-right-20 u-padding-bottom-16 u-font-24 color-999999">
					<view>
						<text v-if="item.completionTime">
							{{$u.timeFormat(new Date(item.completionTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
						</text>
						<text v-else>
							{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
						</text>
					</view>
					<view>
						{{item.moneyType == "REFUND" ? "退款":"收款"}}后余额 ￥ {{item.afterMoney}}
					</view>
				</view>
				<!-- </navigator> -->
			</view>
			<view class="list-item" v-for="(item,index) in chargeList" :key="index" v-if="activeTab == 1">
				<!-- <navigator url="recordDetail/recordDetail" hover-class="none"> -->
				<view class="u-flex u-col-center u-row-between u-padding-top-24">
					<view>
						<text class="dot u-margin-left-32 u-margin-right-10"></text>
						<text class="u-font-30 color-1672FF">提现</text>
					</view>
					<view class="u-font-26 color-999999 u-margin-right-22 " v-if="item.status == 'INIT'">
						正在审核
					</view>
					<view class="u-font-26 color-13E3A5 u-margin-right-22 " v-if="item.status == 'SUCCESS'">
						提现成功
					</view>
					<view class="u-font-26 color-FF2828 u-margin-right-22 " v-if="item.status == 'FAIL'">
						提现失败
					</view>
				</view>
				<view class="u-font-24 color-999999 u-padding-left-50 u-padding-right-20">
					<view class="u-flex u-row-between">
						<view class="u-padding-top-10">
							{{item.bankName}}
						</view>
						<view class="u-padding-top-10">
							{{ hideBankAccount(item.bankAccount)}}
						</view>
					</view>
					<view class="u-flex u-row-between">
						<view class="u-padding-top-10">
							提现金额
						</view>
						<view class="u-padding-top-10">
							{{Number(item.money).toFixed(2)}}
						</view>
					</view>
					<view class="u-padding-top-10">
						{{item.bankAddress}}
					</view>
					<view class="u-padding-top-10 color-FF2828" v-if="item.remark">
						失败原因：{{item.remark}}
					</view>
				</view>
				<view
					class="u-flex u-col-center u-row-between u-margin-top-12 u-margin-left-52 u-margin-right-20 u-padding-bottom-16 u-font-24 color-999999">
					<view>
						<text v-if="item.completionTime">
							{{$u.timeFormat(new Date(item.completionTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
						</text>
						<text v-else>
							{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
						</text>
					</view>
				</view>
				<!-- </navigator> -->
			</view>
			<u-loadmore :status="status" />
		</view>
		<u-top-tips ref="uTips"></u-top-tips>

		<u-popup v-model="show" mode="center" border-radius="20">
			<view class="u-padding-left-30 u-padding-top-20 u-padding-right-30 u-padding-bottom-40">
				<view class="u-text-right">
					<u-icon name="close-circle-fill" size="50" color="#abaaaa" @click="show=false"></u-icon>
				</view>
				<view class="u-font-40 color-000000 u-text-center u-margin-top-10 u-margin-bottom-40">提现规则</view>
				<view class="u-font-26 color-000000">
					<view class="u-margin-bottom-20">
						1. 发起提现时间：每周二下午4点前。
					</view>
					<view class="u-margin-bottom-20">
						2. 资金到账时间：每周二下午6点前。
					</view>
				</view>
				<view class="u-flex u-row-center u-margin-top-40">
					<u-button type="primary" size="medium" @click="show=false">已了解</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import * as config from "../../common/config.js"
	export default {
		data() {
			return {
				activeTab: 0,
				walletInfo: {
					all: '0',
					thisMonth: '0',
					withdrawable: '0'
				},
				chargeList: [],
				page: 0,
				status: 'loading',
				show: false
			}
		},
		onPullDownRefresh() {
			this.page = 0
			this.chargeList = []
			this.status = 'loading'
			if (this.activeTab == 0) {
				this.getWaletRecord(true)
			} else {
				this.getWithdrawalList(true)
			}
		},
		onShow() {
			this.getWalletInfo()
		},
		onLoad() {
			this.getWaletRecord()
		},
		methods: {
			toWithdraw() {
				if (new Date().getDay() == 2 && new Date().getHours() < 16) {
					uni.navigateTo({
						url: '/subPackages/withdraw/withdraw'
					})
				} else {
					this.show = true
				}
			},

			hideBankAccount(account) {
				return config.hideBankAccount(account)
			},

			changeTab(active) {
				this.activeTab = active
				this.page = 0
				this.chargeList = []
				this.status = 'loadmore'
				if (this.activeTab == 0) {
					this.getWaletRecord()
				} else {
					this.getWithdrawalList()
				}
			},
			getWalletInfo() {
				this.$u.api.getWalletInfo().then(res => {
					this.walletInfo = res
				})
			},
			getWaletRecord(flag) {
				this.page++
				this.$u.api.getWalletRecord({
					type: this.activeTab ? "cr" : "wr",
					page: this.page
				}).then(res => {
					if (flag) {
						uni.stopPullDownRefresh();
					}
					if (res.length < 10) {
						this.status = "nomore"
					}
					this.chargeList = this.chargeList.concat(res)
				})
			},
			getWithdrawalList(flag) {
				this.page++
				this.$u.api.getWithdrawalList({
					page: this.page
				}).then(res => {
					if (flag) {
						uni.stopPullDownRefresh();
					}
					if (res.length < 10) {
						this.status = "nomore"
					}
					this.chargeList = this.chargeList.concat(res)
				})
			},
			onReachBottom() {
				if (this.status == 'nomore') {
					return
				}
				this.status = 'loading';
				if (this.activeTab == 0) {
					this.getWaletRecord()
				} else {
					this.getWithdrawalList()
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.bg-linear {
		background: linear-gradient(34deg, #1672FF, #16BAFF);
		border-radius: 20rpx;
	}

	.btn {
		border: 2rpx solid #FFFFFF;
		border-radius: 10rpx;
		width: 100rpx;
		height: 52rpx;
	}

	.active {
		color: #1672FF;
	}

	.list-item {
		border-radius: 10rpx;
		box-shadow: 0px 0px 24rpx 0px rgba(200, 159, 206, 0.49);
		margin-bottom: 20rpx;

		.dot {
			display: inline-block;
			width: 7rpx;
			height: 7rpx;
			border-radius: 50%;
			background: #0036FF;
			vertical-align: middle;
		}
	}
</style>
