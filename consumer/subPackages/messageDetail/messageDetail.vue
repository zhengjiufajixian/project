<template>
	<view>
		<!-- <view>
			<u-image src="/static/image/msg_bg.png" width="100%" height="350" mode="aspectFit"></u-image>
		</view> -->
		
		<view class="u-text-center u-font-32 color-333333 u-margin-top-34">
			{{noticeDetail.title}}
		</view>
		
		<view class="u-text-center u-font-24 color-999999 u-margin-top-34">
			{{$u.timeFormat(new Date(noticeDetail.createTime).getTime(), 'yyyy-mm-dd hh:MM' )}}
		</view>
		
		<view class="content">
			<u-parse :html="noticeDetail.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeDetail:{
					title:'',
					content:'',
					createTime:''
				}
			}
		},
		onLoad(params) {
			this.getNoticeDetail(params.id)
		},
		methods: {
			getNoticeDetail(id){
				this.$u.api.getNoticeDetail({
					id:id
				}).then(res=>{
					this.noticeDetail = res
				})
			}
		}
	}
</script>

<style>
.content {
	text-indent: 42rpx;
	padding: 60rpx 46rpx;
	font-size: 26rpx;
	color: #666666;
	line-height: 1.5;
}
</style>
