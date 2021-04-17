<template>
	<view>
		<view class="search-wrap u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20">
			<u-search bg-color="#FFFFFF" placeholder="你想要什么内容呢？" :action-style="actionStyle" v-model="keyWord" @search="getSearch()" @custom="getSearch()"></u-search>		</view>
		<view>
			<view class="u-padding-20 bg-white" v-show="tagList">
				<view class="u-font-26 color-999999">热门搜索</view>
				<view class="u-flex u-flex-wrap">
					<view class=" u-margin-right-18 u-margin-top-18" v-for="(item,index) in tagList" :key="index">
						<u-tag :text="item" shape="circle" color="#333333" border-color="#dce2eb" bg-color="#ffffff" type="info" @click="getSearch(item)" />
					</view>
				</view>
			</view>
			<u-gap height="20"></u-gap>
			<view class="bg-white" v-show="newsList">
				<view class="u-padding-20 u-font-26 color-999999">热门文章</view>
				<view class="u-padding-left-18 u-padding-right-18">
					<view v-for="(item,index) in newsList" :key="index">
						<navigator :url="'../article/articleDetail/articleDetail?id=' + item.id" hover-class="none">
							<view class="u-flex u-padding-left-20 u-padding-top-20 u-col-top u-relative">
								<view class="u-flex-1">
									<view class="u-flex u-col-center u-padding-left-20 u-padding-bottom-16 u-font-28 color-333333 u-line-1">
										<text class="rank u-margin-right-10">{{getRank(index)}}</text><text class="u-font-20 color-A8A8A8">{{item.click}}热度</text>
									</view>
									<view class="u-padding-left-28 u-padding-right-20 u-font-20 color-666666 u-line-2">
										{{getContent(item.content)}}
									</view>
								</view>
								<view>
									<u-image width="150" height="100" :src="item.image"></u-image>
								</view>
							</view>
						</navigator>
						<u-gap height="18"></u-gap>
						<u-line color="#dae1eb" />
					</view>
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
		onLoad() {
			this.getSearchString()
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
				uni.navigateTo({
					url: 'searchResult/searchResult?s=' + (s ? s : this.keyWord)
				})
				// this.showResult = true
				// this.keyWord = s
				// this.result = []
				// this.$u.api.getSearch({
				// 	s: this.keyWord,
				// 	page: 1
				// }).then(res => {
				// 	if (res.length < 9) {
				// 		this.status = 'nomore'
				// 	}
				// 	this.result = this.result.concat(res)
				// })
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
