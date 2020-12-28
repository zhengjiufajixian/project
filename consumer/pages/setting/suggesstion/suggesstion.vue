<template>
	<view>
		<view class="bg-white u-padding-top-26 u-padding-right-30 u-padding-bottom-26 u-padding-left-30">
			<u-input type="textarea" height="200" placeholder="请提出您的宝贵建议或遇到的问题"/>
		</view>
		<u-gap height="20"></u-gap>
		<view class="bg-white u-padding-top-26 u-padding-right-30 u-padding-bottom-26 u-padding-left-30">
			<view class="u-flex u-col-center u-row-between">
				<text class="u-font-26 color-4A4A4A">图片上传</text>
				<text>{{suggestionImg.length}}/4</text>
			</view>
			<u-gap height="55"></u-gap>
			<u-upload :action="action" :form-data="formData" :header="haeder" @on-success="addSuggestionImgList" @on-remove="removeSuggestionImgList"
			 max-count="4" width="142" height="142"></u-upload>
		</view>
		<u-gap height="55"></u-gap>
		<view class="btn-wrap">
			<u-button :custom-style="fz40" type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import * as config from "../../../common/config.js"
	export default {
		data() {
			return {
				fz40: {
					fontSize: '40rpx'
				},
				action: config.baseUrl + '/file/upload',
				haeder: {
					'Authorization': uni.getStorageSync('tokenHead') + uni.getStorageSync('token'),
				},
				formData: {
					type: ''
				},
				suggestionImg: []
			}
		},
		methods: {
			addSuggestionImgList(data, index, lists, name) {
				this.suggestionImg.push(data)
			},
			removeSuggestionImgList(index, lists, name) {
				let arr = this.suggestionImg
				arr.splice(index, 1)
				this.suggestionImg = arr
			},
		}
	}
</script>

<style>

</style>
