<template>
	<view>
		<u-gap height="32"></u-gap>
		<view class="u-padding-left-25 u-padding-right-25">
			<u-image src="/static/image/msg_bg.png" width="100%" height="316" mode="aspectFit"></u-image>
		</view>
		<view class="bg-white u-margin-left-25 u-margin-right-25 u-padding-left-25 u-padding-right-25 u-padding-bottom-32 u-margin-bottom-15"
		 v-for="(item,index) in noticeList" :key="index">
			<navigator :url="'../messageDetail/messageDetail?id=' + item.id" hover-class="none">
				<view class="u-font-30 color-333333 u-padding-top-30 u-line-1">{{item.title}}</view>
				<view class="u-font-24 color-999999 u-padding-top-18">{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}</view>
				<!-- <view class="u-font-26 color-666666 u-padding-top-40">系统消息</view> -->
			</navigator>
		</view>
		<u-loadmore :status="status" v-if="noticeList.length>0" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 0,
				status: 'loading',
				noticeList: []
			}
		},
		onLoad() {
			this.getNoticeList()
		},
		methods: {
			getNoticeList() {
				this.page++
				this.$u.api.getNoticeList({
					page: this.page
				}).then(res => {
					if (res.length < 10) {
						this.status = 'nomore'
					}
					this.noticeList = this.noticeList.concat(res)
				})
			},
			onReachBottom() {
				if (this.status == 'nomore') {
					return
				}
				this.status = 'loading';
				this.getNoticeList()
			}
		}
	}
</script>

<style>

</style>
