<template>
	<view>
		<view v-if="detail">
			<view class="u-font-36 color-333333 u-margin-top-50 u-margin-left-40 u-margin-right-40 u-margin-bottom-44">
				{{detail.title}}
			</view>
			<view class="u-font-22 color-999999 u-margin-left-40">
				<text>
					{{$u.timeFormat(new Date(detail.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
				</text>
				<u-icon class="u-margin-left-26 u-margin-right-10" name="eye-fill"></u-icon>
				<text>{{detail.click}}</text>
				<u-icon class="u-margin-left-26 u-margin-right-10" name="share-fill"></u-icon>
				<text>{{detail.share}}</text>
			</view>
			<view class="u-padding-top-20 u-padding-left-40 u-padding-right-40 u-padding-bottom-60 ">
				<u-parse :html="detail.content" :tag-style="style"></u-parse>
			</view>
			<u-gap height="60"></u-gap>
			<view class="u-flex u-row-between fixed-btn">
				<view class="u-font-26 color-666666">{{detail.tagName}}</view>
				<view>
					<u-button type="default" open-type="share" :hair-line="false" :custom-style="customStyle" @click="handleClick">
						<u-icon name="share-fill" size="60"></u-icon>
					</u-button>
				</view>
			</view>
		</view>
		<view class="u-flex u-row-center" v-else>
			<view>
				<u-gap height="100"></u-gap>
				<u-image src="/static/image/no-detail.png" width="200" height="200" ></u-image>
				<view class="u-margin-top-20 color-999999 u-font-30">文章过期不存在</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle: {
					border: 'none'
				},
				style:{
					p : 'margin-top: 20rpx;'
				},
				id:'',
				detail: {
					title: '文章加载中...'
				}
			}
		},
		onLoad(params) {
			uni.showLoading()
			this.id = params.id
			this.getClassDetail()
		},
		methods: {
			getClassDetail() {
				this.$u.api.getClassDetail({
					id: this.id
				}).then(res => {
					this.detail = res
					uni.hideLoading()
				}).catch(err => {
					console.log(err);
				})
			},
			handleClick(){
				this.$u.api.detailShare({
					id: this.id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.fixed-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10rpx 0 10rpx 40rpx;
		background: #FFFFFF;
	}
</style>
