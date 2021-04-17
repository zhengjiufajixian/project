<template>
	<view>
		<u-gap height="30"></u-gap>
		<view class="bg-linear u-margin-left-30 u-margin-right-30 u-padding-left-42 u-padding-right-36">
			<view class="u-padding-top-32">
				<text class="color-FEFEFE u-font-28">总资产</text>
			</view>
			<view class="u-flex u-col-center u-row-between u-padding-top-6">
				<view class="color-FEFEFE u-font-38">{{walletInfo.totalAmount}}</view>
				<navigator url="../../pages/charge/charge" hover-class="none">
					<view class="color-FFFFFF u-font-30 u-flex u-col-center u-row-center btn">充值</view>
				</navigator>
			</view>
			<view
				class="u-flex u-col-center u-row-between color-FEFEFE u-font-24 u-padding-top-40 u-margin-top-40 u-padding-bottom-20">
				<view>充值余额： {{walletInfo.rechargeAmount}}</view>
				<view>赠送余额： {{walletInfo.promotionAmount}}</view>
			</view>
		</view>
		<view class="u-margin-left-36 u-margin-right-36">
			<view class="u-flex u-margin-top-24">
				<text :class="activeTab == 0?'u-padding-24 active':'u-padding-24'" @click="changeTab(0)">充值记录</text>
				<text :class="activeTab == 1?'u-padding-24 active':'u-padding-24'" @click="changeTab(1)">消费记录</text>
			</view>
			<view class="list-item" v-for="(item,index) in chargeList" :key="index" v-if="activeTab == 0">
				<view class="u-flex u-col-center u-row-between u-padding-top-24">
					<view>
						<text class="dot u-margin-left-32 u-margin-right-10"></text>
						<text class="u-font-30 color-1672FF" v-if="item.orderType == 'RECHARGE'">充值</text>
						<text class="u-font-30 color-FF2828" v-if="item.orderType == 'PROMOTION'">推广</text>
					</view>
					<view class="u-font-26 color-333333 u-margin-right-22 ">
						+ ￥ {{item.orderMoney}}
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
						{{item.orderType == 'RECHARGE' ?'充值':'领取'}}后余额 ￥ {{item.userAfterMoney}}
					</view>
				</view>
			</view>
			<view class="list-item" v-for="(item,index) in chargeList" :key="index" v-if="activeTab == 1">
				<view class="u-flex u-col-center u-row-between u-padding-top-24">
					<view>
						<text class="dot u-margin-left-32 u-margin-right-10"></text>
						<text
							:class="'u-font-30 ' + (item.orderType == 'REFUND' ?'color-999999' : 'color-1672FF')">{{item.orderType == 'REFUND' ? '退款':'消费'}}</text>
					</view>
					<view
						:class="'u-font-26 u-margin-right-22 ' + (item.orderType=='REFUND'?'color-999999':'color-333333')">
						{{item.orderType == 'REFUND' ? '+':'-'}} ￥ {{item.orderMoney}}
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
						{{item.orderType == 'REFUND' ?'退款':'消费'}}后余额 ￥ {{item.userAfterMoney}}
					</view>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 0,
				walletInfo: {
					totalAmount: '0',
					rechargeAmount: '0',
					promotionAmount: '0'
				},
				chargeList: [],
				page: 1,
				status: 'loadmore'
			}
		},
		onShow() {
			this.getWalletInfo()
		},
		methods: {
			changeTab(active) {
				this.activeTab = active
				this.page = 0
				this.chargeList = []
				this.status = 'loadmore'
				this.getWaletRecord()
			},
			getWalletInfo() {
				this.$u.api.getWalletInfo().then(res => {
					this.walletInfo = res.wallet
					if (res.order.length < 10) {
						this.status = "nomore"
					}
					this.chargeList = res.order
				})
			},
			getWaletRecord() {
				this.page++
				this.$u.api.getWalletRecord({
					orderType: this.activeTab == 0 ? "RECHARGE" : "CONSUMPTION",
					page: this.page
				}).then(res => {
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
				this.getWaletRecord()
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
