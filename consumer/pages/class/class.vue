<template>
	<view>
		<!-- <u-gap height="20"></u-gap>
		<view class="bg-white">
			<view>
				<u-swiper-custom height="220" :list="ketangLunboList"></u-swiper-custom>
			</view>
			<view class="u-padding-left-50 u-padding-right-50">
				<u-search @click="toSearchPage" :disabled="true" :show-action="false" bg-color="#FFFFFF" border-color="#b1dbe8"
				 placeholder="你想要什么内容呢？"></u-search>
				<u-gap height="20"></u-gap>
			</view>
		</view>
		<u-gap height="20"></u-gap> -->
		<view class="u-flex u-row-around bg-white u-padding-left-25 u-padding-right-25">
			<view
				:class="'u-padding-top-36 u-padding-bottom-48 color-333333 u-font-30' + (active == index ? ' active':'')"
				v-for="(item,index) in typeList" :key="index" @click="changeTag(index)">
				<text>{{item.tagName}}</text>
				<view class="line"></view>
			</view>
			<!-- <view class="u-flex-1 u-text-right u-font-20 color-BABABA">
				<navigator :url="'../../subPackages/allClass/allClass?data=' + JSON.stringify(allType)" hover-class="none">
					<u-icon class="u-margin-right-14" name="play-right-fill" color="#8ebbff"></u-icon>更多
				</navigator>
			</view> -->
		</view>
		<view class="u-padding-30">
			<u-swiper height="342" border-radius="20" :list="tagLunboList"  @click="handleClick" :title="true" :title-style="titleStyle"></u-swiper>
			<view class="u-margin-top-30" v-for="(item,index) in newsList" :key="index">
				<navigator :url="'/subPackages/article/articleDetail/articleDetail?id='+ item.id"
					hover-class="none">
					<!-- <view
						class=" u-padding-top-30 u-padding-bottom-30 u-font-28 color-333333 u-line-1">
						{{item.title}}</view> -->
					<view class="u-flex u-col-top u-relative u-padding-top-20 u-margin-bottom-24">
						<view class="u-flex-1">
							<view class=" u-font-30 color-282828 u-margin-top-14 u-margin-right-24 u-line-2 ">
								<!-- {{getContent(item.content)}} -->
								{{item.title}}
							</view>
							<view
								class="u-text-right u-font-20 color-666666 pos-abs-left u-flex u-col-center">
								 <u-icon name="eye-fill" size="30"></u-icon>
								 <text class="u-margin-left-10">{{item.click}}浏览</text>
							</view>
						</view>
						<view>
							<u-image width="230" height="150" border-radius="20" :src="item.image"></u-image>
						</view>
					</view>
				</navigator>
				<u-gap height="18"></u-gap>
				<u-line color="#dae1eb" />
			</view>
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loading',
				page: 1,
				ketangLunboList: [],
				active: 0,
				allType: [],
				typeList: [],
				tagLunboList: [],
				newsList: [],
				titleStyle:{
					top: 0,
					bottom : 'auto',
					paddingBottom : '12rpx'
				}
			}
		},
		onLoad() {
			// this.getClassLunbo()
			this.getClassTagList()
		},
		onReachBottom() {
			if (this.status == 'nomore') {
				return
			}
			this.status = 'loading';
			this.page = ++this.page;
			this.getClassList()
		},
		methods: {
			handleClick(index) {
				uni.navigateTo({
					url:'/subPackages/article/articleDetail/articleDetail?id=' + this.tagLunboList[index].linkUrl
				})
			},
			toSearchPage() {
				uni.navigateTo({
					url: '../../subPackages/searchPage/searchPage'
				})
			},
			changeTag(index) {
				this.newsList = []
				this.page = 1
				this.status = "loadmore"
				this.active = index
				this.getClassTagLunbo()
				this.getClassList()
			},

			getClassLunbo() {
				this.$u.api.getClassLunbo().then(res => {
					let length = Math.ceil(res.length / 2)
					let data = []
					for (var i = 0; i < length; i++) {
						let arr = []
						arr.push(res.splice(0, 2))
						data.push(arr)
					}

					this.ketangLunboList = data
				}).catch(err => {
					console.log(err);
				})
			},

			getClassTagList() {
				this.$u.api.getClassTagList().then(res => {
					this.allType = this.$u.deepClone(res)
					this.typeList = res.splice(0, 4)
					this.getClassTagLunbo()
					this.getClassList()
				}).catch(err => {
					console.log(err);
				})
			},

			getClassTagLunbo() {
				this.$u.api.getClassTagLunbo({
					tagCode: this.typeList[this.active].tagCode
				}).then(res => {
					for (var i = 0; i < res.length; i++) {
						res[i].title = res[i].name
					}
					this.tagLunboList = res
				}).catch(err => {
					console.log(err);
				})
			},

			getClassList() {
				this.$u.api.getClassList({
					tagCode: this.typeList[this.active].tagCode,
					page: this.page,
					pageSize: 10
				}).then(res => {
					if (res.length < 9) {
						this.status = 'nomore'
					}
					this.newsList = this.newsList.concat(res)
				}).catch(err => {
					console.log(err);
				})
			},

			getContent(content) {
				var reg = /<[^<>]+>/g;
				content = content.replace(reg, '');
				content = content.replace(/&nbsp;/ig, '');
				return content;
			}
		}
	}
</script>

<style lang="scss">
	.color-BABABA {
		color: #BABABA;
	}

	.color-7c8da8 {
		color: #7c8da8;
	}
	.color-282828 {
		color: #282828;
	}
	.active {
		color: #282828;
		font-weight: bold;
		padding-bottom: 0 !important;
	}
	.active .line {
		width: 20rpx;
		margin: 28rpx auto 15rpx;
		height: 6rpx;
		border-radius: 10rpx;
		border: 1rpx solid #1357bf;
		background: #1672FF;
	}
	.pos-abs-left {
		position: absolute;
		left: 0;
		bottom: 0;
	}
</style>
