<template>
	<view>
		<view>
			<view class="u-flex u-flex-wrap u-padding-left-20 u-padding-right-20">
				<view class="u-flex u-margin-left-20 u-margin-right-20 u-margin-top-50" v-for="(item,index) in typeList" :key="index">
					<navigator url="../topic/topic" hover-class="none">
						<view class="tag u-font-28 color-333333">{{item.tagName}}</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: [],
			}
		},
		onLoad(params) {
			this.typeList = JSON.parse(params.data)
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.tag{
		line-height: 85rpx;
		padding: 0 40rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
</style>
