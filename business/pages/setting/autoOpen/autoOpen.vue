<template>
	<view>
		<view class="u-padding-60 u-relative">
			<u-image class="bg" height="100%" src="../../../static/image/autoOpen-bg.png" mode="scaleToFill"></u-image>
			<view class="u-flex u-col-center u-row-between u-padding-top-24 u-font-28 color-333333">
				<text>自动营业</text>
				<view class="u-flex u-col-center u-row-between ">
					<text class="u-margin-right-26">{{checked?'已开启':'已关闭'}}</text>
					<u-switch v-model="checked" @change="changeShopStatus"></u-switch>
				</view>
			</view>
			<view class="u-flex u-col-center u-row-between u-margin-top-60 u-padding-top-24 u-padding-bottom-62 u-margin-bottom-62 u-font-28 color-333333">
				<text>自动营业时间</text>
				<view class="u-flex u-col-center u-row-between">
					<view class="time" @click="setTime('start')">{{start.hour + ':' + start.minute}}</view>
					<view class="line"></view>
					<view class="time" @click="setTime('end')">{{end.hour + ':' + end.minute}}</view>
				</view>
			</view>
		</view>
		<view class="btn-wrap" @click="setBusinessTime">
			立即生效
		</view>
		<u-picker mode="time" v-model="show" :params="params" :default-time="defaultTime" @confirm="handleConfirm"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
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
		onLoad() {
			this.getBusinessTime()
		},
		methods: {
			changeShopStatus() {

			},
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
				let timestamp = new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDay() + ' ' + time.hour +
					':' + time.minute + ':00').getTime()
				console.log(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDay() + ' ' + time.hour +
					':' + time.minute + ':00');
				return timestamp + ''
			},
			getBusinessTime() {
				this.$u.api.getBusinessTime().then(res => {
					if(!res){
						return
					}
					this.checked = res.status != 0 ? true : false
					let startHours = new Date(res.startTime).getHours()
					let startMinutes = new Date(res.startTime).getMinutes()
					this.start = {
						hour: startHours < 10 ? ( '0' + startHours ) : startHours,
						minute: startMinutes < 10 ? ( '0' + startMinutes ) : startMinutes
					}
					let endHours = new Date(res.endTime).getHours()
					let endMinutes = new Date(res.endTime).getMinutes()
					this.end = {
						hour: endHours < 10 ? ( '0' + endHours ) : endHours,
						minute: endMinutes < 10 ? ( '0' + endMinutes ) : endMinutes
					}
				})
			},
			setBusinessTime() {
				this.$u.api.setBusinessTime({
					startTime: this.getFullTime(this.start),
					endTime: this.getFullTime(this.end),
					status: this.checked ? 1 : 0
				}).then(res => {
					if (res) {
						if (this.checked) {
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
							hour: startHours < 10 ? ( '0' + startHours ) : startHours,
							minute: startMinutes < 10 ? ( '0' + startMinutes ) : startMinutes
						}
						let endHours = new Date(res.endTime).getHours()
						let endMinutes = new Date(res.endTime).getMinutes()
						this.end = {
							hour: endHours < 10 ? ( '0' + endHours ) : endHours,
							minute: endMinutes < 10 ? ( '0' + endMinutes ) : endMinutes
						}
						uni.setStorageSync('start',JSON.stringify(this.start))
						uni.setStorageSync('end',JSON.stringify(this.end))
						
						setTimeout(function(){
							uni.navigateBack()
						},1000)
					} else {
						uni.showToast({
							title: '修改失败，请重试'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.bg {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		height: 100%;
		width: 100%;
		z-index: -1;
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
		width: 100%;
		height: 82rpx;
		line-height: 82rpx;
		background-color: #ff1616;
		color: #FFFFFF;
		text-align: center;
		font-weight: 24rpx;
		font-weight: bold;
		letter-spacing: 4rpx;
	}
</style>
