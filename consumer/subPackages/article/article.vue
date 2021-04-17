<template>
	<view>
		<navigator url="articleDetail/articleDetail" hover-class="none" class="u-flex bg-white u-padding-top-38 u-padding-left-62  u-padding-right-62 u-padding-bottom-22" v-for="(item,index) in list"
		 :key="index">
			<view class="u-margin-right-24">
				<view class="u-font-28 color-333333 u-line-2">特斯拉Model Y获NHTSA碰撞测试最高评分 2020年曾被召回2次</view>
				<u-gap height="20"></u-gap>
				<view class="u-font-20 color-b7b7b7">
					<text>2021-02-01</text>
					<text class="u-margin-left-40">阅 270</text>
				</view>
			</view>
			<view>
				<u-image src="/subPackages/static/image/contact_bg.png" width="110" height="110" mode="widthFill"></u-image>
			</view>
			<u-line color="#ebecee"></u-line>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.color-b7b7b7 {
		color: #b7b7b7;
	}
</style>
