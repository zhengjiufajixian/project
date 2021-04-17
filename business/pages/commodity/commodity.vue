<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#1672ff" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(swiperItem,swiperIndex) in list" :key="swiperIndex">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="commodityList[swiperIndex].length>0">
							<view class="order" v-for="(item, index) in commodityList[swiperIndex]" :key="index">
								<view class="u-flex u-col-center u-row-between u-padding-bottom-20">
									<view class="color-333333">
										商品ID: <text>{{item.id}}</text>
									</view>
									<view class="color-333333">
										{{getTextStatus(item.commodityStatus)}}
									</view>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between u-padding-top-26 u-padding-bottom-26 u-padding-left-18 u-padding-right-18">
									<view class="u-line-1 color-4A4A4A bold">
										{{item.commodityName}}
									</view>
									<view class=" color-4a4a4a">
										<text class="bold">价格：</text><text class="color-ff2828 u-font-30">￥{{item.commodityPrice}}</text>
									</view>
								</view>
								<view class="u-padding-bottom-32 u-padding-left-18 u-padding-right-18 color-333333 u-flex">
									<view class="">
										<text class="bold">服务明细：</text>
									</view>
									<view class="u-line-1 u-flex-1 text-height">
										<text class="color-666666 ">{{item.commodityRemark}}</text>
									</view>
								</view>
								<u-line color="#dfdfdf"></u-line>
								<view class="u-flex u-col-center u-row-between">
									<view class="color-999999">
										{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
									</view>
									<view class="u-flex">
										<text class="u-padding-20 color-666666" @click="getBtnClick(item,index)">{{getBtnText(item.commodityStatus)}}</text>
										<text :class="'u-padding-20 ' + (getBtnStyle(item.commodityStatus))" @click="changeStatus(item,index)">{{getBtnStatus(item.commodityStatus)}}</text>
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<view class="page-box" v-else>
							<u-empty paddingTop="350" src="/static/image/nodata.png"></u-empty>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="setPage">发布</u-button>
		</view>
		
		<u-modal v-model="modalStatus" content="需要登录之后才能使用全部功能." :show-title="false" confirm-text='去登录'
			@confirm="handleConfirm"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalStatus: true,
				list: [{
					name: '全部'
				}, {
					name: '待上架'
				}, {
					name: '上架中'
				}, {
					name: '已下架'
				}],
				currentPage: 0,
				current: 0,
				page: [1, 1, 1, 1],
				commodityList: [
					[],
					[],
					[],
					[]
				],
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onShow() {
			this.modalStatus = !uni.getStorageSync('token')
			this.loadStatus = ['loadmore', 'loadmore', 'loadmore', 'loadmore']
			this.page = [1, 1, 1, 1]
			this.commodityList = [
				[],
				[],
				[],
				[]
			]
			this.current = 0
			this.currentPage = 0
			this.swiperCurrent = 0
			if(!this.modalStatus){
				this.getCommodityList()
			}
		},
		methods: {
			setPage() {
				uni.navigateTo({
					url: 'publish/publish'
				})
			},
			getTextStatus(val) {
				switch (val) {
					case '1':
						return '未上架'
						break;
					case '2':
						return '已上架'
						break;
					case '3':
						return '已下架'
						break;
					default:
						break;
				}
			},
			getBtnStatus(val) {
				switch (val) {
					case '1':
						return '立即上架'
						break;
					case '2':
						return '立即下架'
						break;
					case '3':
						return '重新上架'
						break;
					default:
						break;
				}
			},
			getBtnStyle(val) {
				switch (val) {
					case '1':
						return 'color-FFBA09'
						break;
					case '2':
						return 'color-FF0909'
						break;
					case '3':
						return 'color-A62121'
						break;
					default:
						break;
				}
			},
			getBtnText(val) {
				switch (val) {
					case '1':
						return '编辑修改'
						break;
					case '2':
						return '编辑修改'
						break;
					case '3':
						return '删除'
						break;
					default:
						break;
				}
			},
			getBtnClick(val,index) {
				if (val.commodityStatus == 1 || val.commodityStatus == 2) {
					uni.navigateTo({
						url: 'edit/edit?data=' + JSON.stringify(val)
					})
				}
				if (val.commodityStatus == 3) {
					let status = 4
					this.$u.api.setCommodityStatus({
						commodityId: val.id,
						status: status
					}).then(res => {
						// if(res){
						uni.showToast({
							title: '删除成功'
						})
						this.commodityList[this.currentPage].splice(index,1)
						// this.$set(this.commodityList[this.currentPage][index], 'commodityStatus', status)
						// }else{
						// 	uni.showToast({
						// 		title:'操作失败，请稍后重试',
						// 		icon:'none'
						// 	})
						// }
					})
				}
			},
			// 0 全部 ，1 未上架 ，2 已上架，3 已下架，4 删除
			getCommodityList(status) {
				let current = status ? status : this.currentPage
				if (this.loadStatus[current] == 'nomore') {
					return
				}
				this.$u.api.getCommodityList({
					page: this.page[this.current],
					status: current
				}).then(res => {
					if (res.length < 10) {
						this.loadStatus.splice(current, 1, 'nomore')
					} else {
						this.loadStatus.splice(current, 1, 'loadmore')
					}
					let arr = this.commodityList[current].concat(res)

					this.commodityList.splice(current, 1, arr)
				})
			},
			changeStatus(data, index) {
				let status = ''
				if (data.commodityStatus == 1 || data.commodityStatus == 3) {
					status = '2' // 上架
				}
				if (data.commodityStatus == 2) {
					status = '3' // 下架
				}
				this.$u.api.setCommodityStatus({
					commodityId: data.id,
					status: status
				}).then(res => {

					if (!(typeof res == 'object')) {
						uni.showToast({
							title: status == '2' ? '上架失败,请重试' : '下架失败，请重试',
							icon: "none"
						})
						return
					}
					uni.showToast({
						title: status == '2' ? '上架成功' : '下架成功',
					})
					this.$set(this.commodityList[this.currentPage][index], 'commodityStatus', status)
				})
			},
			reachBottom() {
				if (this.loadStatus[this.currentPage] == "nomore") {
					return
				}
				let page = this.page[this.currentPage]
				page++
				this.page.splice(this.currentPage, 1, page)
				this.getCommodityList()
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.number;
				});
				return num;
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.currentPage = index
				this.page[this.currentPage] = 1
				this.commodityList[this.currentPage] = []
				this.loadStatus[this.currentPage] = 'loadmore'
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.currentPage = current;
				if(this.commodityList[current].length == 0) {
					this.getCommodityList()
				}
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.wrap {
		padding-bottom: 140rpx;
	}

	.order {
		background-color: #ffffff;
		box-sizing: border-box;
		padding: 30rpx 30rpx 10rpx 30rpx;
		margin-top: 20rpx;
		font-size: 26rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.text-height {
			height: 26rpx;
			line-height: 26rpx;
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.btn-wrap {
		position: fixed;
		width: 80%;
		left: 50%;
		bottom: 30rpx;
		transform: translateX(-50%);
	}

	.color-FFBA09 {
		color: #FFBA09;
	}

	.color-FF0909 {
		color: #FF0909;
	}

	.color-A62121 {
		color: #A62121;
	}
</style>
