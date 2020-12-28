<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="setting-wrap">
			<navigator url="bindPhone/bindPhone" hover-class="none">
				<view class="setting-item">
					<u-section title="账号绑定" sub-title=" " :show-line="false" :bold="false" font-size="26"></u-section>
				</view>
			</navigator>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<navigator url="unregister/unregister" hover-class="none">
				<view class="setting-item">
					<u-section title="账号注销" sub-title=" " :show-line="false" :bold="false" font-size="26"></u-section>
				</view>
			</navigator>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<u-gap height="20"></u-gap>
		<view class="setting-wrap">
			<navigator url="password/password" hover-class="none">
				<view class="setting-item">
					<u-section title="设置密码" sub-title=" " :show-line="false" :bold="false" font-size="26"> </u-section>
				</view>
			</navigator>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<!-- <view class="setting-wrap">
			<navigator url="bindPhone/bindPhone" hover-class="none">
				<view class="setting-item">
					<u-section title="隐私政策" sub-title=" " :show-line="false" :bold="false" font-size="26"></u-section>
				</view>
			</navigator>
			<u-line color="#f3f4f7"></u-line>
		</view> -->
		<view class="setting-wrap">
			<navigator url="userAgreement/userAgreement" hover-class="none">
				<view class="setting-item">
					<u-section title="用户协议" sub-title=" " :show-line="false" :bold="false" font-size="26"></u-section>
				</view>
			</navigator>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<navigator url="about/about" hover-class="none">
				<view class="setting-item">
					<u-section title="关于广莱" sub-title=" " :show-line="false" :bold="false" font-size="26"></u-section>
				</view>
			</navigator>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<view class="setting-wrap">
			<navigator url="suggesstion/suggesstion" hover-class="none">
				<view class="setting-item">
					<u-section title="投诉及建议" sub-title=" " :show-line="false" :bold="false" font-size="26"></u-section>
				</view>
			</navigator>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<u-gap height="45"></u-gap>
		<view class="setting-wrap">
			<view class="setting-item" @click="quit">
				<u-section title="退出登录" sub-title=" " :show-line="false" :bold="false" font-size="26"></u-section>
			</view>
			<u-line color="#f3f4f7"></u-line>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			setPage(page) {
				uni.navigateTo({
					url: '/pages/setting/' + page + "/" + page,
				});
			},
			quit() {
				let _this = this
				uni.clearStorage({
					success: function() {
						_this.$refs.uToast.show({
							title: '退出成功，即将返回登录页',
							callback:()=>{
								uni.redirectTo({
									url:'/pages/login/login'
								})
							}
						})
						// setTimeout(function(){
						// 	uni.redirectTo({
						// 		url:'/pages/index/index'
						// 	})
						// },500)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.setting-wrap {
		background-color: #fff;
		padding: 0 40rpx 0 30rpx;

		.u-section__title__text {
			line-height: 3 !important;
		}
	}
</style>
