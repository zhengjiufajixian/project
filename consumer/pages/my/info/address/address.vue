<template>
	<view>
		<u-gap height="20" bg-color="#f3f4f7"></u-gap>
		<view class="list-wrap" v-if="addressList.length>0">
			<u-swipe-action class="list-item" v-for="(item,index) in addressList" :key="index" :options="options">
				<u-row class="item-head">
					<u-col span="6">
						<view class="u-text-left head-text">
							<u-checkbox @change="checkboxChange(item)" shape="circle" v-model="item.status>0?true:false">{{item.status?"默认地址":"设为默认"}}</u-checkbox>
						</view>
					</u-col>
					<u-col span="6">
						<view class="u-text-right head-text" @click="setPage('editAddress',item)">
							编辑
						</view>
					</u-col>
				</u-row>
				<u-line color="#f3f4f7"></u-line>
				<view class="item-content">
					<view class="content-top">
						<text>{{item.userName}}</text>
						<text>{{item.userPhone}}</text>
					</view>
					<view class="content-bottom">
						<text>{{item.userAddress}}</text>
					</view>
				</view>
				<u-gap height="10" bg-color="#f3f4f7"></u-gap>
			</u-swipe-action>
			<u-loadmore :status="loadStatus" margin-bottom="200"/>
		</view>
		<view class="empty-wrap" v-else>
			<u-empty mode="data"></u-empty>
		</view>
		<view class="btn-wrap">
			<u-button type="primary" shape="circle" @click="setPage('addNewAddress')">新增收货地址</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus:"loading",
				addressList: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onShow() {
			this.getAddressList()
		},
		methods: {
			setPage(page, params) {
				uni.navigateTo({
					url: '/pages/my/info/address/' + page + "/" + page + "?data=" + JSON.stringify(params),
				});
			},
			getAddressList() {
				this.$u.api.getAddressList().then(res => {
					this.addressList = res
					this.loadStatus = 'nomore'
				})
			},
			checkboxChange(address) {
				console.log(address)
				if(address.status>0){
					return
				}
				this.$u.api.updateAddress({
					id: address.id,
					userId: uni.getStorageSync("userId"),
					status: 1
				}).then(res => {
					this.getAddressList()
				})
			}
		}
	}
</script>

<style lang="scss">
	.list-item {
		margin: 10rpx 0;
		background-color: #fff;
		border-radius: 10rpx;

		.item-head {
			.head-text {
				padding: 20rpx;
			}
		}

		.item-content {
			.content-top {
				font-weight: bold;
			}

			padding: 20rpx 50rpx;

		}
	}

	.empty-wrap {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.btn-wrap {
		position: fixed;
		width: 80%;
		left: 50%;
		bottom: 90rpx;
		transform: translateX(-50%);
	}
</style>
