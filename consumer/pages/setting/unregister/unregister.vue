<template>
	<view class="u-padding-40">
		<view class="u-margin-top-5 u-padding-top-45 u-margin-bottom-45 u-padding-bottom-40 u-font-32 color-4A4A4A">《注销广莱车友汇账号》</view>
		<view class="u-font-26 color-4A4A4A">
			尊敬的用户，注销账号是不可恢复的操作，请谨慎操作。若你经过慎重考虑后仍执意决定注销广莱车友汇账号，请让我们知道您关闭账号的理由······
		</view>
		<u-gap height="35"></u-gap>
		<u-input type="textarea" height="204" :border="true" border-color="#c8c8c8" />
		<u-gap height="20"></u-gap>
		<u-input :custom-style="customStyle" :type="text" placeholder="请留下您的联系方式,方便确认" :border="true" border-color="#c8c8c8" />
		<u-gap height="80"></u-gap>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="show=true">已清楚风险，确认注销</u-button>
		</view>
		<u-popup v-model="show" mode="center"  width="584" height="auto">
			<view class="u-padding-45">
				<view class="u-margin-top-3 2 u-text-center bold u-font-40 color-4A4A4A">确认注销</view>
				<view class="u-margin-top-50 u-margin-bottom-45 u-font-28 color-666666">
					您的账户中如果有现金余额或未完成的服务，账号注销后将无法找回，请谨慎操作
				</view>
				<u-row gutter="16">
					<u-col span="6">
						<u-button shape="circle" :hair-line="false" :custom-style="customStyle2" @click="show=false">暂不注销</u-button>
					</u-col>
					<u-col span="6">
						<u-button type="primary" shape="circle" @click="show=false">继续注销</u-button>
					</u-col>
				</u-row>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle: {
					fontSize: '26rpx',
				},
				customStyle2: {
					background: "#f0eef1",
					border:"none"
				},
				show: false
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}
</style>
