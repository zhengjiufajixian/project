<template>
	<view>
		<view class="search-wrap u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20">
			<u-search bg-color="#FFFFFF" placeholder="你想要什么内容呢？" :action-style="actionStyle" v-model="keyWord" @search="getSearch()" @custom="getSearch()"></u-search>
		</view>
		<view class="" v-show="showResult" v-if="result.length > 0">
			<view class="bg-white" v-show="result">
				<view class="u-padding-left-18 u-padding-right-18">
					<view v-for="(item,index) in result" :key="index">
						<navigator :url="'../../article/articleDetail/articleDetail?id=' + item.id" hover-class="none">
							<view class=" u-padding-left-20 u-padding-top-30 u-padding-bottom-30 u-font-28 color-333333 u-line-1">{{item.title}}</view>
							<view class="u-flex u-padding-left-20 u-col-top u-relative">
								<view>
									<u-image width="169" height="138" :src="item.image"></u-image>
								</view>
								<view class="u-flex-1">
									<view class="u-padding-left-28 u-padding-right-20 u-font-22 color-333333 u-line-4 ">
										{{getContent(item.content)}}
									</view>
									<view class="u-text-right u-padding-right-20 u-padding-top-10 u-font-20 color-7c8da8 pos-abs-right">
										{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
									</view>
								</view>
							</view>
						</navigator>
						<u-gap height="18"></u-gap>
						<u-line color="#dae1eb" />
					</view>
					<u-loadmore :status="status" />
				</view>
			</view>
		</view>
		<view v-show="showResult" v-else>
			<view class="pos-abs-center u-text-center">
				<view v-if="status=='loading'">
					<text>正在搜索</text>
				</view>
				<view v-else>
					<u-empty src="/subPackages/static/image/search_no_data.png" icon-size="360"></u-empty>
					<view class="u-font-26 color-999999">没有搜索到相关信息</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loading',
				page: 1,
				keyWord: '',
				tagList: [],
				newsList: [],
				result: [],
				showResult: false,
				actionStyle: {
					fontSize: '28rpx',
					color: '#FFFFFF'
				}
			}
		},
		onLoad(params) {
			this.getSearch(params.s)
		},
		onReachBottom() {
			if (this.status == 'nomore' || !this.showResult) {
				return
			}
			this.status = 'loading';
			this.page = ++this.page;
			this.getSearch()
		},
		methods: {
			getRank(index) {
				if (index < 10) {
					return '0' + (index + 1)
				} else {
					return index + 1
				}
			},
			getContent(content) {
				var reg = /<[^<>]+>/g;
				content = content.replace(reg, '');
				content = content.replace(/&nbsp;/ig, '');
				return content;
			},
			getSearch(s) {
				this.showResult = true
				this.keyWord = s
				this.result = []
				this.$u.api.getSearch({
					s: this.keyWord,
					page: 1
				}).then(res => {
					if (res.length < 9) {
						this.status = 'nomore'
					}
					this.result = this.result.concat(res)
				})
			},
			getSearchString() {
				this.$u.api.getSearchString().then(res => {
					this.tagList = res.searchString
					this.newsList = res.list
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	.search-wrap {
		background-color: $uni-color-primary;
	}
	.rank {
		display: inline-block;
		text-align: center;
		width: 44rpx;
		line-height: 36rpx;
		background-color: #ffcb23;
		font-size: 20rpx;
		color: #FFFFFF;
	}
	.color-A8A8A8 {
		color: #A8A8A8;
	}
	.pos-abs-right {
		position: absolute;
		right: 0;
		bottom: 0;
	}
</style>