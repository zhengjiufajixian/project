<template>
	<view>
		<view class="u-padding-top-28 u-padding-left-30 bold u-font-30 u-padding-bottom-10">
			营业服务设置
		</view>
		<view class="wrap2 u-flex u-col-center u-row-between">
			<text>洗车服务</text>
			<u-switch v-model="XC" @change="changeStatus('XC')"></u-switch>
		</view>
		<view class="wrap2 u-flex u-col-center u-row-between">
			<text>保养服务</text>
			<u-switch v-model="BY" @change="changeStatus('BY')"></u-switch>
		</view>
		<view class="wrap2 u-flex u-col-center u-row-between">
			<text>维修服务</text>
			<u-switch v-model="WX" @change="changeStatus('WX')"></u-switch>
		</view>
		<view class="u-padding-top-28 u-padding-left-30 bold u-font-30 u-padding-bottom-10">
			营业时间设置
		</view>
		<view class="wrap2 u-flex u-col-center u-row-between">
			<text>自动营业</text>
			<u-switch v-model="AR" @change="setBusinessTime"></u-switch>
		</view>
		<view class="wrap2 u-flex u-col-center u-row-between">
			<text>自动营业时间</text>
			<view class="u-flex u-col-center u-row-between">
				<view class="time" @click="setTime('start')">{{start.hour + ':' + start.minute}}</view>
				<view class="line"></view>
				<view class="time" @click="setTime('end')">{{end.hour + ':' + end.minute}}</view>
			</view>
		</view>

		<view class="btn-wrap u-padding-50">
			<u-button type="primary" shape="circle" @click="setBusinessTime">更新自动营业时间</u-button>
		</view>

		<u-picker mode="time" v-model="show" :params="params" :default-time="defaultTime" @confirm="handleConfirm">
		</u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				XC: false,
				BY: false,
				WX: false,
				AR: false,
				params: {
					hour: true,
					minute: true,
					timestamp: true
				},
				show: false,
				start: {
					hour: '08',
					minute: '00'
				},
				end: {
					hour: '18',
					minute: '00'
				},

				current: 'start',
				defaultTime: '00:00'
			}
		},
		onShow() {
			this.XC = uni.getStorageSync('isXC')
			this.BY = uni.getStorageSync('isBY')
			this.WX = uni.getStorageSync('isWX')
		},
		onLoad() {
			this.getBusinessTime()
		},
		methods: {
			setTime(current) {
				this.defaultTime = this[current].hour + ':' + this[current].minute
				this.show = true
				this.current = current
			},
			handleConfirm(res) {
				this[this.current] = res
			},
			getFullTime(time) {
				let today = new Date()
				let timestamp = new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDay() + ' ' +
					time.hour +
					':' + time.minute + ':00').getTime()
				console.log(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDay() + ' ' + time.hour +
					':' + time.minute + ':00');
				return timestamp + ''
			},
			getBusinessTime() {
				this.$u.api.getBusinessTime().then(res => {
					if (!res) {
						return
					}
					this.AR = res.status != 0 ? true : false
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
				})
			},
			setBusinessTime() {
				this.$u.api.setBusinessTime({
					startTime: this.getFullTime(this.start),
					endTime: this.getFullTime(this.end),
					status: this.AR ? 1 : 0
				}).then(res => {
					if (res.code == 500) {
						this.AR = !this.AR
						uni.showToast({
							title: '操作失败，请稍后重试',
							icon: "none"
						})
					} else {
						if (this.AR) {
							uni.showToast({
								title: '自动营业已开启',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '自动营业已关闭',
								icon: 'none'
							})
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
					}
				})
			},

			changeStatus(type) {
				this.$u.api.upService({
					type: type,
					status: (this[type] ? 1 : 0)
				}).then(res => {
					if (res.code == 500) {
						this[type] = !this[type]
						uni.showToast({
							title: '操作失败，请稍后重试',
							icon: "none"
						})
					} else {
						uni.setStorageSync('isXC', res.isXc)
						uni.setStorageSync('isBY', res.isBy)
						uni.setStorageSync('isWX', res.isWx)
						uni.showToast({
							title: '服务' + (this[type] ? '开启' : '关闭') + '成功'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrap2 {
		color: #666;
		background-color: #fff;
		margin: 18rpx 30rpx 0;
		padding: 15rpx 0 15rpx 0;
		padding-left: 30rpx;
		padding-right: 30rpx;
		border-radius: 15rpx;
	}

	.time {
		background-color: $uni-color-primary;
		color: #FFFFFF;
		font-size: 26rpx;
		padding: 10rpx 20rpx;
		font-weight: bold;
	}

	.line {
		width: 36rpx;
		height: 2rpx;
		background-color: #aaaaaa;
		margin: 0 18rpx;
	}

	.btn-wrap {
		width: 60%;
		margin: 0 auto;
	}
</style>
