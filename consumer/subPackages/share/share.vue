<template>
	<view>
		<view>
			<view class="u-flex u-row-right">
				<view class="activity-rule" @click="show2=true">
					活动详情
				</view>
			</view>
			<view class="u-padding-left-30 u-padding-right-30">
				<u-image :show-loading="false" src="/subPackages/static/image/share-head.png" width="100%" height="796"
					mode="widthFix">
				</u-image>
			</view>
			<view class="u-flex u-row-center">
				<view v-if="isLogin">
					<u-button type="default" open-type="share" :hair-line="false" hover-class="none"
						:custom-style="customStyle">
						<view class="invite-btn">
							<view>一键邀请</view>
						</view>
					</u-button>
				</view>
				<view v-if="!isLogin">
					<navigator url="/pages/login/login" hover-class="none">
						<view class="invite-btn">
							<view>一键登录领取</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="u-text-center u-margin-top-40 color-FFFFFF u-font-30 u-padding-top-20 u-padding-bottom-20"
				v-if="isLogin" @click="show3=true">
				<text>面对面邀请 ></text>
			</view>
			<view class="wrap" v-if="isLogin">
				<view class="u-flex u-col-center u-row-between">
					<view class="title">我的奖励</view>
					<navigator open-type="switchTab" url="/pages/index/index" hover-class="none">
						<view class="to-use-btn">
							去使用
						</view>
					</navigator>
				</view>
				<view class="u-flex u-row-center u-col-center u-padding-left-40 u-padding-right-40">
					<view class="u-flex-6 u-text-center">
						<view class="color-FC4F02">
							<text class="u-font-40">￥ </text>
							<text class="u-font-60">{{money}}</text>
						</view>
						<view class="u-font-24 color-2C2E2D bold">
							累计券额
						</view>
					</view>
					<view class="u-flex-6 u-text-center">
						<view class="u-relative" @click="showTip">
							<text class="u-font-60">{{count}}</text>
							<u-icon name="question-circle-fill" size="20" color="#898989"></u-icon>
							<view class="tip" v-show="show">
								<view class="tip-word">待您的好友完成注册且成功认证车辆，符合条件，您就能获得奖励，快快提醒TA</view>
								<u-image src="/subPackages/static/image/shadom-bg.png" width="666" height="147"
									mode="widthFix"></u-image>
							</view>
						</view>
						<view class="u-font-24 color-2C2E2D bold">
							已邀请人数
						</view>
					</view>
				</view>
			</view>
			<view class="wrap" v-if="isLogin">
				<view class="u-flex">
					<view class="title">邀请记录</view>
				</view>
				<!-- <view class="u-text-center">
					<view class="u-flex u-row-center u-margin-top-10 u-margin-bottom-30">
						<u-image :show-loading="false" src="/subPackages/static/image/no-invite.png" width="130"
							height="135" mode="widthFix"></u-image>
					</view>
					<view class="u-margin-bottom-20">暂无成功邀请的好友呦</view>
				</view> -->
				<view class="u-padding-top-22">
					<view class="u-flex u-row-between u-col-center u-font-24 u-margin-top-24"
						v-for="(item,index) in list" :key="index">
						<view class="u-flex color-2C2E2D">
							<u-image src="/subPackages/static/image/user-head-img.png" width="66" height="66"></u-image>
							<view class="u-margin-left-16">{{item.userName}}</view>
						</view>
						<view class="color-2C2E2D">
							{{$u.timeFormat(new Date(item.createTime).getTime(), 'yyyy/mm/dd hh:MM:SS' )}}
						</view>
						<view class="color-FFFFFF bg-orange" v-if="item.id">邀请成功</view>
						<view class="color-FFFFFF bg-gray" v-else>进行中...</view>
					</view>
					<u-loadmore :status="status" />
				</view>
			</view>
		</view>
		<u-popup v-model="show2" mode="center" border-radius="20">
			<view class="u-padding-left-30 u-padding-top-20 u-padding-right-30 u-padding-bottom-40">
				<view class="u-text-right">
					<u-icon name="close-circle-fill" size="50" color="#abaaaa" @click="show2=false"></u-icon>
				</view>
				<view class="u-font-40 color-000000 u-text-center u-margin-top-10 u-margin-bottom-40">活动规则</view>
				<view class="u-font-26 color-000000">
					<view class="u-margin-bottom-20">1. 分享链接给您的微信好友，每成功邀请1位好友注册并登记行驶证（
						<text class="color-FF2828">仅限鄂E车牌号</text>），即可获得红包奖励。（奖励最迟将于次日发放至平台个人账户）
					</view>
					<view class="u-margin-bottom-20">2. 活动邀请仅限新用户，同时邀请或重复邀请会导致无效。</view>
					<view class="u-margin-bottom-20">3. 邀请次数无上限，邀请获得的红包将直接发放至平台个人账户，可用于平台任何商品付款，不可提现。</view>
					<view class="u-margin-bottom-20">4. 本活动最终解释权归广莱车友汇所属，对本活动规则有任何异议和问题请通过平台客服咨询。</view>
				</view>
			</view>
		</u-popup>
		<!-- <u-popup v-model="show3" mode="center" border-radius="20" :custom-style="customStyle">
			<view class="popup-wrap">
				<canvas style="width: 340px; height: 460px;" canvas-id="poster" id="poster"></canvas>
				<view class="u-flex u-row-around u-padding-top-20 u-padding-bottom-20">
					<u-button type="default" size="medium" shape="circle" @click="show3 = false">关闭</u-button>
					<u-button type="primary" size="medium" shape="circle" @click="save">保存</u-button>
				</view>
			</view>
		</u-popup> -->
		<u-mask :show="show3" @click="show3 = false">
			<view class="popup-wrap" :class="show3?'active':''">
				<canvas :style="'height: 460px;margin:0 auto;' + (show3?'width:340px;':'width:0px;')" canvas-id="poster" id="poster"></canvas>
				<view class="u-flex u-row-around u-padding-top-20 u-padding-bottom-20">
					<u-button type="default" size="medium" shape="circle" @click="show3 = false">关闭</u-button>
					<u-button type="primary" size="medium" shape="circle" @click="save">保存</u-button>
				</view>
			</view>			
		</u-mask>
	</view>
</template>

<script>
	import * as config from '../../common/config.js'

	export default {
		data() {
			return {
				show: false,
				show2: false,
				show3: false,
				timer: null,
				money: 0,
				count: 0,
				customStyle: {
					border: 'none',
					background: 'none'
				},
				isLogin: false,
				list: [],
				page: 0,
				status: 'loading',
				filePath: '',
				popupStatus: false,
				loading: false,
			}
		},
		onShow() {
			if(uni.getStorageSync('token')){
				this.getQRCode()
			}
			this.isLogin = !!uni.getStorageSync('token')
			this.$u.mpShare = {
				title: '邀请注册', // 默认为小程序名称，可自定义
				path: '/subPackages/share/share?inviteCode=' + uni.getStorageSync(
					'userId'), // 默认为当前页面路径，一般无需修改，QQ小程序不支持
				// 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
				// 支持PNG及JPG，默认为当前页面的截图
				// imageUrl: ''
			}
			if (this.isLogin) {
				this.getTuijianAll()
				this.page = 0
				this.status = "loading"
				this.list = []
				this.getTuijianList()
			}
		},
		onLoad(params) {
			console.log(params);
			if (params.inviteCode) {
				uni.setStorageSync('inviteCode', params.inviteCode)
			}
			if (params.q) {
				let url = decodeURIComponent(params.q)
				let inviteCode = url.split('/')[3].split('=')[1]
				console.log(inviteCode);
				uni.setStorageSync('inviteCode', inviteCode)
			}
			if (params.scene) {
				let url = decodeURIComponent(params.scene)
				let inviteCode = url.split('=')[1]
				uni.setStorageSync('inviteCode', inviteCode)
			}
			
		},
		methods: {
			onReachBottom() {
				if (this.status == 'nomore') {
					return
				}
				this.status = 'loading';
				this.getTuijianList()
			},
			getQRCode() {
				let _this = this
				uni.request({
					url: config.baseUrl + '/user/getQRCode?userId=' + uni.getStorageSync('userId'),
					// url: 'http://50b2cb8.nat123.cc:31507' + '/getQRCode?userId=' + uni.getStorageSync('userId'),
					header: {
						Authorization: uni.getStorageSync('tokenHead') + uni.getStorageSync('token'),
					},
					success: function(res) {
						// let imageData = "data:image/png;base64," + res.data.data
						const fs = wx.getFileSystemManager();
						//随机定义路径名称
						var times = new Date().getTime();
						var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';

						//将base64图片写入
						fs.writeFile({
							filePath: codeimg,
							data: res.data.data,
							encoding: 'base64',
							success: function(res) {
								let context = uni.createCanvasContext('poster')
								context.drawImage('/subPackages/static/image/invite-code.png', 0, 0, 340, 460)
								context.drawImage(codeimg, 220, 350, 100, 100)
								context.draw()
							}
						});
					},

				})
			},
			
			save() {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: 340,
					height: 460,
					destWidth: 340,
					destHeight: 460,
					canvasId: 'poster',
					success: function(res) {
						// 在H5平台下，tempFilePath 为 base64
						let context = uni.createCanvasContext('poster')
						let data = res.tempFilePath
						uni.saveImageToPhotosAlbum({
							filePath: data,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '保存成功',
									icon: 'success',
									duration: 2000,
								})
							}
						});
					}
				})


			},
			showTip() {
				if (!this.timer) {
					this.show = true
					let _this = this
					this.timer = setTimeout(function() {
						_this.show = false
						_this.timer = null
					}, 1500)
				}
			},
			getTuijianAll() {
				this.$u.api.getTuijianAll().then(res => {
					this.money = res.money
					this.count = res.count
				})
			},
			getTuijianList() {
				this.page++
				this.$u.api.getTuijianList({
					page: this.page
				}).then(res => {
					if (res.length < 10) {
						this.status = 'nomore'
					}
					this.list = res
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-image: linear-gradient(90deg, rgb(255, 74, 45) 0%, rgb(249, 106, 42) 100%);
	}

	.color-FC4F02 {
		color: #fc4f02;
	}

	.color-2C2E2D {
		color: #2c2e2d;
	}

	.u-font-60 {
		font-size: 60rpx;
	}

	.bg-gray,
	.bg-orange {
		border-radius: 40rpx;
		padding: 10rpx;
	}

	.bg-gray {
		background-color: #999999;
	}

	.bg-orange {
		background-color: #fb7006;
	}

	.activity-rule {
		background-color: rgba(255, 255, 255, 0.612);
		border-radius: 10rpx 0 0 10rpx;
		color: #fc4f02;
		font-size: 26rpx;
		line-height: 42rpx;
		padding: 0 10rpx 0 20rpx;
		margin: 10rpx 5rpx;
	}

	.invite-btn {
		height: 112rpx;
		width: 623rpx;
		background-image: url(../static/image/invite-bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
		color: #fa210a;
		font-weight: bold;
		padding-bottom: 10rpx;
	}

	.close-btn {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		z-index: 100;
	}

	.wrap {
		background: #FFFFFF;
		margin: 30rpx 30rpx;
		padding: 26rpx 20rpx;
		border-radius: 20rpx;
		position: relative;
	}

	.tip {
		position: absolute;
		width: 666rpx;
		height: 147rpx;
		bottom: -166%;
		z-index: 1;
		left: -117%;
	}

	.tip .tip-word {
		position: absolute;
		left: 0;
		top: 0;
		color: #FFFFFF;
		width: 100%;
		height: 100%;
		z-index: 1;
		text-align: left;
		line-height: 1.5;
		margin-top: 40rpx;
		padding: 0 30rpx;
		font-size: 26rpx;
	}

	.wrap .title {
		font-size: 30rpx;
		color: #2c2e2d;
	}

	.to-use-btn {
		font-size: 24rpx;
		color: #FFFFFF;
		padding: 10rpx 20rpx;
		background-color: rgb(251, 112, 6);
		border-radius: 40rpx;
	}

	#myQrcode {
		position: absolute;
		right: 20px;
		bottom: 56px;
	}

	.popup-wrap {
		opacity: 0;
		border-radius: 25rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		background-color: #FFFFFF;
		&.active {
			opacity: 1;
		}
	}
</style>
