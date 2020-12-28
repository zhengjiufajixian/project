<template>
	<view>
		<u-image src="../../../static/image/modify_pwd_bg.png" mode="scaleToFill" height="420"></u-image>
		<view class="u-padding-left-70 u-padding-right-70">
			<view class="color-333333 u-font-36 bold u-margin-bottom-50">
				修改密码
			</view>
			<view class="u-flex u-col-center u-padding-top-10 u-padding-bottom-10">
				<u-icon name="lock" color="#1672FF"></u-icon>
				<view class="u-flex-1 u-margin-left-30">
					<u-input :custom-style="customStyle" v-model="value" type="password" placeholder="请输入旧密码(6-18位密码)"/>
				</view>
			</view>
			<u-line color="#F5F5F5"></u-line>
			<view class="u-flex u-col-center u-padding-top-10 u-padding-bottom-10">
				<u-icon name="lock" color="#FF7E00"></u-icon>
				<view class="u-flex-1 u-margin-left-30">
					<u-input :custom-style="customStyle" v-model="value" type="password" placeholder="请输入新密码(6-18位密码)"/>
				</view>
			</view>
			<u-line color="#F5F5F5"></u-line>
			<view class="u-flex u-col-center u-padding-top-10 u-padding-bottom-10">
				<u-icon name="lock" color="#4ED000"></u-icon>
				<view class="u-flex-1 u-margin-left-30">
					<u-input :custom-style="customStyle" v-model="value" type="password" placeholder="请确定新密码(6-18位密码)"/>
				</view>
			</view>
			<u-line color="#F5F5F5"></u-line>
			<u-gap height="60"></u-gap>
			<view class="btn-wrap">
				<u-button type="primary" shape="circle">完成</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle: {
					fontSize: "30rpx"
				}
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
