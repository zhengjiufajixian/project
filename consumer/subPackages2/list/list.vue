<template>
	<view class="wrap">
		<view class="search-wrap u-padding-left-20 u-padding-top-40 u-padding-right-20 u-padding-bottom-40">
			<u-search placeholder="请输入内容" v-model="keyword"></u-search>
		</view>
		<u-sticky>
			<view class="filter-wrap u-flex u-text-center u-border-top u-font-26">
				<view class="u-flex-3 u-padding-top-26 u-padding-bottom-26 active">综合</view>
				<view class="u-flex-3 u-padding-top-26 u-padding-bottom-26">销量</view>
				<view class="u-flex-3 u-padding-top-26 u-padding-bottom-26">价格</view>
				<view class="u-flex-3 u-padding-top-26 u-padding-bottom-26">筛选</view>
			</view>
		</u-sticky>
		<navigator class="u-flex u-col-top u-padding-20 u-border-top" v-for="(item,index) in flowList" :key="index"
			:url="'/subPackages2/detail/detail?id=' + item.id">
			<u-image :src="item.commodity_img" width="180" height="240"></u-image>
			<view class="u-margin-left-20 u-rela" style="height: 240rpx; width: 100%;">
				<!-- <view>{{item.commodity_name}}</view> -->
				<view class="u-line-2 u-font-26 color-000000">{{item.commodity_name}}</view>
				<view style="position: absolute;bottom: 0;left: 0;">
					<view class="u-margin-bottom-10">
						<u-tag class="u-margin-right-10" text="标签1" size="mini" />
						<u-tag class="u-margin-right-10" text="标签2" size="mini" />
						<u-tag class="u-margin-right-10" text="标签3" size="mini" />
					</view>
					<view class="color-FF2828">
						<text class="u-font-24">￥</text>
						<text class="u-font-36">{{item.commodity_price}}</text>
					</view>
					<view class="color-666666 u-font-20 u-margin-top-10">
						999条评价
					</view>
				</view>
			</view>
		</navigator>
		<u-loadmore :status="status"></u-loadmore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				flowList: [],
				typeId: '',
				page: 0
			};
		},
		onLoad(params) {
			this.typeId = params.id
			this.getScCommodityList();
		},
		onReachBottom() {
			if (this.status == 'nomore') {
				return
			}
			this.status = 'loading';
			this.getScCommodityList()
		},
		methods: {
			getScCommodityList() {
				this.page++
				this.$u.api.getScCommodityList({
					id: this.typeId,
					page: this.page,
					orderBy: ''
				}).then(res => {
					if (res.length < 10) {
						this.status = 'nomore'
					}
					this.flowList = this.flowList.concat(res)
				})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.filter-wrap {
		background: #FFFFFF;
		.active {
			color: #ff2828;
		}
	}
</style>
