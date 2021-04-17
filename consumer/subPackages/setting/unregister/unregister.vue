<template>
	<view class="u-padding-40">
		<view class="u-margin-top-5 u-padding-top-45 u-margin-bottom-45 u-padding-bottom-40 u-font-32 color-4A4A4A">
			《注销广莱车友汇账号》</view>
		<view class="u-font-26 color-4A4A4A">
			尊敬的用户，注销账号是不可恢复的操作，请谨慎操作。若你经过慎重考虑后仍执意决定注销广莱车友汇账号，请让我们知道您关闭账号的理由······
		</view>
		<u-gap height="35"></u-gap>
		<u-input type="textarea" v-model="cause" height="204" :border="true" border-color="#c8c8c8" />
		<u-gap height="20"></u-gap>
		<u-input v-model="phone" :custom-style="customStyle" :type="text" placeholder="请留下您的联系方式,方便确认" :border="true"
			border-color="#c8c8c8" />
		<u-gap height="80"></u-gap>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="handleClick">已清楚风险，确认注销</u-button>
		</view>
		<u-popup v-model="submitPopup" mode="center" width="584" height="auto">
			<view class="u-padding-45">
				<view class="u-margin-top-3 2 u-text-center bold u-font-40 color-4A4A4A">确认注销</view>
				<view class="u-margin-top-50 u-margin-bottom-45 u-font-28 color-666666">
					您的账户中如果有现金余额或未完成的服务，账号注销后将无法找回，请谨慎操作
				</view>
				<u-row gutter="16">
					<u-col span="6">
						<u-button shape="circle" :hair-line="false" :custom-style="customStyle2"
							@click="submitPopup=false">
							暂不注销</u-button>
					</u-col>
					<u-col span="6">
						<u-button type="primary" shape="circle" @click="submit">继续注销</u-button>
					</u-col>
				</u-row>
			</view>
		</u-popup>

		<u-popup v-model="cancelPopup" mode="center" width="584" height="auto">
			<view class="u-padding-45">
				<view class="u-margin-top-3 2 u-text-center bold u-font-40 color-4A4A4A"
					v-if="cancelInfo.cancelStatus == 'INIT'">注销申请审核中</view>
				<view class="u-margin-top-3 2 u-text-center bold u-font-40 color-4A4A4A"
					v-if="cancelInfo.cancelStatus == 'SUCCESS'">注销申请审核成功</view>
				<view class="u-margin-top-3 2 u-text-center bold u-font-40 color-4A4A4A"
					v-if="cancelInfo.cancelStatus == 'FAIL'">注销申请审核失败</view>
				<view class="u-margin-top-50 u-margin-bottom-45 u-font-28 color-666666">
					<text v-if="cancelInfo.cancelStatus == 'INIT'">您的注销申请正在审核中，请耐心等候。</text>
					<text v-if="cancelInfo.cancelStatus == 'SUCCESS'">您的注销申请于{{$u.timeFormat(new Date(cancelInfo.cancelTime).getTime(), 'yyyy-mm-dd hh:MM' )}}审核通过，您可以在7日内取消注销申请。</text>
					<text v-if="cancelInfo.cancelStatus == 'FAIL'">您的注销申请审核失败，您可以重新提交申请。</text>
				</view>
				<u-row gutter="16">
					<u-col span="6">
						<u-button shape="circle" :hair-line="false" :custom-style="customStyle2" @click="back">
							返回
						</u-button>
					</u-col>
					<u-col span="6">
						<u-button type="primary" shape="circle" @click="cancelPopup = false"
							v-if="cancelInfo.cancelStatus == 'FAIL'">重新申请</u-button>
						<u-button type="primary" shape="circle" @click="cancel" v-else>取消注销</u-button>
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
					border: "none"
				},
				submitPopup: false,
				cancelPopup: false,
				cause: '',
				phone: '',
				cancelInfo: ''
			}
		},
		onLoad() {
			this.getUserCancel()
		},
		methods: {
			getUserCancel() {
				this.$u.api.getUserCancel().then(res => {
					if (res) {
						this.cancelInfo = res
						this.cancelPopup = true
					}
				})
			},
			cancel() {
				this.cancelPopup = false
				this.$u.api.updateUserCancel({
					cancelId: this.cancelInfo.cancelId,
					status: 'FAIL'
				}).then(res => {
					uni.showToast({
						title: '取消成功'
					})
					this.getUserCancel()
				})
			},
			handleClick() {
				if(!this.cause){
					uni.showToast({
						title:'请填写注销原因',
						icon:'none'
					})
					return
				}
				if(!this.phone){
					uni.showToast({
						title:'请填写联系方式',
						icon:'none'
					})
					return
				}
				this.submitPopup = true
			},
			submit() {
				this.$u.api.saveUserCancel({
					cause: this.cause,
					phone: this.phone
				}).then(res => {
					this.submitPopup = false
					this.getUserCancel()
				})
			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}
</style>
