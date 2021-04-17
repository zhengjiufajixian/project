<template>
	<view class="qiun-columns">
		<view class="bg-white">
			<view class="u-text-center">
				<view class="color-999999 u-font-22 u-margin-top-20">累计交易额(元)</view>
				<view class="color-FF2828 u-font-40 u-margin-top-20">{{pageData.totalOrderMoney}}</view>
			</view>
			<view class="u-flex u-row-center u-text-center u-padding-bottom-20">
				<view class="u-flex-1">
					<view class="color-999999 u-font-22 u-margin-top-30">本月交易额(元)</view>
					<view class="color-333333 u-font-32 u-margin-top-10">{{pageData.thisMonthOrderInfo.orderMoney}}</view>
				</view>
				<view class="u-flex-1">
					<view class="color-999999 u-font-22 u-margin-top-40">本月订单(笔)</view>
					<view class="color-333333 u-font-32 u-margin-top-10">{{pageData.thisMonthOrderInfo.orderCount}}</view>
				</view>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view class="qiun-charts">
			<canvas canvas-id="canvasColumn" id="canvasColumn" disable-scroll=true class="charts" @touchstart="touchLineA"
			 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
		</view>
		<view class="u-flex u-row-center">
			<view v-for="(item,index) in timeData1" :key="index" :class="activeTab1==index ? 'active1':'unActive1'" @click="getAnalysisOrderData(index)">
				{{item.name}}
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view>
			<view class="u-flex u-col-center height-100 bg-white u-row-between">
				<view>
					<u-icon class="u-margin-left-34 u-margin-right-20" name="grid" color="#1672FF" size="32"></u-icon>
					<text class="u-font-28 color-333333">热销商品排行榜</text>
				</view>
				<view class="u-flex list-wrap u-margin-right-40">
					<view v-for="(item,index) in timeData2" :class="activeTab2==index ? 'list-item active':'list-item' " :key="index" @click="getAnalysisCommodityData(index)">{{item.name}}</view>
				</view>
			</view>
			<view class="u-flex bg-white color-999999 u-font-22 u-text-center">
				<view class="u-flex-6 u-padding-top-20 u-padding-bottom-20 u-border-top u-border-bottom">热销商品</view>
				<view class="u-flex-2 u-padding-top-20 u-padding-bottom-20 u-border-top u-border-bottom u-border-left u-border-right">订单数</view>
				<view class="u-flex-2 u-padding-top-20 u-padding-bottom-20 u-border-top u-border-bottom u-border-right">成交额</view>
				<view class="u-flex-2 u-padding-top-20 u-padding-bottom-20 u-border-top u-border-bottom">退款率</view>
			</view>
			<view class="u-flex bg-white color-999999 u-font-22 u-text-center color-333333 u-font-26" v-for="(item,index) in pageData.commodityList"
			 :key="index">
				<view class="u-flex-6 height-140 u-border-bottom u-text-left u-flex u-col-center u-line-1 bold">
					<text class="u-margin-left-14 u-margin-right-14">{{index + 1 + '.'}}</text>
					<u-image width="60" height="60" mode="aspectFill" :src="JSON.parse(item.image)[0]"></u-image>
					<text class="u-margin-left-22">{{item.commodityName}}</text>
				</view>
				<view class="u-flex-2 u-flex u-row-center u-col-center height-140 u-border-bottom u-border-left u-border-right">
					{{item.orderCount}}
				</view>
				<view class="u-flex-2 u-flex u-row-center u-col-center height-140 u-border-bottom u-border-right">
					{{item.orderMoney}}
				</view>
				<view class="u-flex-2 u-flex u-row-center u-col-center height-140 u-border-bottom">
					{{(item.refundCount / 100).toFixed(2) + '%'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from "../static/u-charts/u-charts.js"
	var _self;
	var canvaColumn = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',

				pageData: {
					commodityList: [],
					thisMonthOrderInfo: {
						orderCount: 0,
						orderMoney: 0
					},
					totalOrderMoney: 0,
					weekOrderInfo: []
				},
				activeTab1: 0,
				activeTab2: 0,
				timeData1: [{
					name: '近7日',
					value: 'week'
				}, {
					name: '近1月',
					value: 'month'
				}, {
					name: '近3月',
					value: 'threeMonth'
				}, {
					name: '近6月',
					value: 'sixMonth'
				}, {
					name: '近1年',
					value: 'year'
				}, ],
				timeData2: [{
					name: '近7日',
					value: 'week'
				}, {
					name: '近1月',
					value: 'month'
				}, {
					name: '近3月',
					value: 'threeMonth'
				}]
			}
		},
		onLoad() {
			this.getAnalysisPageData()
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		},
		methods: {
			getAnalysisPageData() {
				this.$u.api.analysisPageData().then(res => {
					this.pageData = res
					this.formateData()
				})
			},
			formateData() {
				let time = this.timeData1[this.activeTab1].value
				let lineData = {
					"categories": [],
					"series": [{
						"index": 0,
						"type": "line",
						"style": "curve",
						"name": "订单金额",
						"data": []
					}, {
						"index": 1,
						"type": "line",
						"style": "curve",
						"name": "订单数量",
						"data": []
					}]
				}
				if (time == 'week') {
					let number = 7
					for (var i = 0; i < number; i++) {
						let currentTime = this.$u.timeFormat(new Date().getTime() - 1000 * 60 * 60 * 24 * i, 'yyyy-mm-dd')
						lineData.categories.push(currentTime)
						let obj = this.returnData(currentTime)
						if (obj) {
							lineData.series[0].data.push(obj.orderMoney)
							lineData.series[1].data.push(obj.orderCount)
						} else {
							lineData.series[0].data.push(0)
							lineData.series[1].data.push(0)
						}
					}
					_self.showColumn("canvasColumn", lineData);
				}
				if (time == 'month') {
					let number = 30
					for (var i = 0; i < number; i++) {
						let currentTime = this.$u.timeFormat(new Date().getTime() - 1000 * 60 * 60 * 24 * i, 'yyyy-mm-dd')
						lineData.categories.push(currentTime)
						let obj = this.returnData(currentTime)
						if (obj) {
							lineData.series[0].data.push(obj.orderMoney)
							lineData.series[1].data.push(obj.orderCount)
						} else {
							lineData.series[0].data.push(0)
							lineData.series[1].data.push(0)
						}
					}
					_self.showColumn("canvasColumn", lineData);
				}
				if (time == 'threeMonth' || time == 'sixMonth' || time == 'year') {
					let number = 0
					switch (time) {
						case 'threeMonth':
							number = 3
							break;
						case 'sixMonth':
							number = 6
							break;
						case 'year':
							number = 12
							break;
						default:
							break;
					}
					let currentTime = new Date().getTime()
					for (var i = 0; i < number; i++) {
						let time = null
						if (i != 0) {
							currentTime = currentTime - 1000 * 60 * 60 * 24 * (new Date(currentTime).getDate())
						}
						time = this.$u.timeFormat(currentTime, 'yyyy-mm')
						lineData.categories.push(time)
						let obj = this.returnData(time)
						if (obj) {
							lineData.series[0].data.push(obj.orderMoney)
							lineData.series[1].data.push(obj.orderCount)
						} else {
							lineData.series[0].data.push(0)
							lineData.series[1].data.push(0)
						}
					}
					_self.showColumn("canvasColumn", lineData);
				}
			},
			returnData(time) {
				let data = this.pageData.weekOrderInfo
				for (var j = 0; j < data.length; j++) {
					if (data[j].date == time) {
						return data[j]
					}
				}
			},
			getAnalysisOrderData(index) {
				this.activeTab1 = index
				this.$u.api.analysisOrderData({
					time: this.timeData1[this.activeTab1].value
				}).then(res => {
					this.pageData.weekOrderInfo = res
					this.formateData()
				})
			},
			getAnalysisCommodityData(index) {
				this.activeTab2 = index
				this.$u.api.analysisCommodityData({
					time: this.timeData2[this.activeTab2].value
				}).then(res => {
					this.pageData.commodityList = res
				})
			},

			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'mix',
					legend: true,
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					padding: [30, 15, 4, 15],
					categories: chartData.categories,
					series: chartData.series,
					enableScroll: true, //开启图表拖拽功能

					xAxis: {
						disableGrid: true,
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
						scrollBackgroundColor: '#F7F7FF',
						scrollColor: '#DEE7F7',
					},
					yAxis: {
						showTitle: true,
						data: [{
							position: 'left',
							title: '订单金额',
							format: val => {
								return val.toFixed(0)
							}
						}, {
							position: 'right',
							title: '订单数量',
							format: val => {
								return val.toFixed(0)
							}
						}]
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});
			},
			touchLineA(e) {
				canvaColumn.scrollStart(e);
			},
			moveLineA(e) {
				canvaColumn.scroll(e);
			},
			touchEndLineA(e) {
				canvaColumn.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EEEEEE;
	}

	.unActive1 {
		flex: 1;
		text-align: center;
		background-color: #F6F6F6;
		line-height: 70rpx;
		font-size: 22rpx;
		color: #999999;
	}

	.active1 {
		flex: 1;
		text-align: center;
		background-color: #FFFFFF;
		line-height: 70rpx;
		font-size: 22rpx;
		color: #444444;
	}
	
	.height-140 {
		height: 100rpx;
	}
	.height-100 {
		height: 100rpx;
	}
	
	.list-wrap {
		background-color: #EEEEEE;
		color: #999999;
		font-size: 20rpx;
		line-height: 30rpx;
		border-radius: 10rpx;
		.list-item{
			padding: 5rpx 15rpx;
		}
		.active {
			color: #FFFFFF;
			background-color: $uni-color-primary;
		}
	}
	
	.qiun-padding {
		padding: 4%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	/* 通用样式 */
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
