<template>
	<view>
		<view class="u-padding-top-60 u-padding-bottom-60 u-padding-left-48 bg-white">
			<text class="color-333333 u-font-30 u-margin-right-20 bold">打分</text>
			<u-rate :count="count" v-model="rating" active-color="#FFBA09"></u-rate>
		</view>
		<u-gap height="20"></u-gap>
		<view class="u-padding-top-37 u-padding-right-46 u-padding-bottom-37 u-padding-left-46 bg-white u-font-24">
			<u-input v-model="content" :custom-style="customStyle" type="textarea" height="302" placeholder="请输入您的评价..." />
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 5,
				rating: 0,
				content: '',
				customStyle: {
					fontSize: "24rpx"
				}
			}
		},
		methods: {
			submit(){
				console.log(this.rating,this.content)
			}
		}
	}
</script>

<style lang="scss">
	.btn-wrap {
		width: 80%;
		margin: 110rpx auto 0;
	}
</style>
