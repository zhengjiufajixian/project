<template>
	<view>
		<u-gap height="25"></u-gap>
		<view class="u-flex u-col-center u-row-between u-padding-left-20 u-padding-right-20">
			<text class="color-333333 u-font-26 bold">保养价格</text>
			<view class="u-flex-1 u-margin-left-20">
				<u-input :custom-style="fz22" v-model="price" type="digit" placeholder="请输入保养总价是多少供用户支付" />
			</view>
			<view>
				<u-button size="mini" type="primary" @click="submit">提交</u-button>
			</view>
		</view>
		<view class="u-padding-left-20 u-padding-right-20">
			<u-table>
				<u-tr>
					<u-th width="60%">保养项目</u-th>
					<u-th width="20%">价格</u-th>
					<u-th width="20%">操作</u-th>
				</u-tr>
				<u-tr v-for="(item,index) in selected" :key="index">
					<u-td>{{item.diyItemName}}</u-td>
					<u-td>{{item.diyItemPrice}}</u-td>
					<u-td>
						<view @click="remove(index)">
							移除
						</view>
					</u-td>
				</u-tr>
				<u-tr>
					<u-td>
						<u-input :custom-style="fz22" v-model="diyItemName" type="text" placeholder="保养项目" />
					</u-td>
					<u-td>
						<u-input :custom-style="fz22" v-model="diyItemPrice" type="digit" placeholder="价格" />
					</u-td>
					<u-td>
						<view class="u-padding-top-14 u-padding-bottom-14 btn" @click="addDiyItem">添加</view>
					</u-td>
				</u-tr>
			</u-table>
		</view>

		<u-gap height="25"></u-gap>
		<view class="u-col-center u-row-between u-padding-left-20 u-padding-right-20">
			<view class="color-333333 u-font-26 bold">请选择保养项目</view>
			<view class="list-wrap">
				<view class="list-item" v-for="(item,index) in list" :key="index">
					<view class="item-border" @click="setName(item)">{{item}}</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					"更换机油，机滤",
					"空气滤清器",
					"汽油滤清器",
					"空调滤芯",
					"火花塞",
					"换刹车油",
					"手动变速箱油",
					"换自动变速箱油及清洗",
					"换冷却液",
					"轮胎换位",
					"动平衡",
					"前后刹车片",
					"清洗燃油系统",
					"清洗润滑系统",
					"三元催化清洗",
					"空调除菌清洁",
					"四轮定位",
				],
				selected: [],
				diyItemName: '',
				diyItemPrice: '',
				price: '',
				orderId:''
			};
		},
		onLoad(params){
			this.orderId = params.orderId
		},
		methods: {
			setName(item) {
				this.diyItemName = item
			},
			addDiyItem() {
				if (this.diyItemName) {
					this.selected.push({
						diyItemName: this.diyItemName,
						diyItemPrice: this.diyItemPrice,
					})
					this.diyItemName = ''
					this.diyItemPrice = ''
					uni.showToast({
						title: '添加成功',
						icon: 'none'
					})
				}
			},
			remove(index) {
				console.log(index);
				this.selected.splice(index,1)
				uni.showToast({
					title: '移除成功',
					icon: 'none'
				})
			},
			submit() {
				if(!this.price){
					uni.showToast({
						title: '请输入价格',
						icon: 'none'
					})
					return
				}
				this.$u.api.setOrderConfig({
					orderId: this.orderId,
					orderMoney: this.price,
					maintainRemark: JSON.stringify(this.selected)
				}).then(res=>{
					uni.showToast({
						title:'操作成功'
					})
					setTimeout(function(){
						uni.navigateBack()
					},1000)
				})
			}
		}
	}
</script>

<style lang="scss">
	.list-item {
		display: inline-block;
		width: 50%;
		box-sizing: border-box;
		color: #333333;
		font-size: 24rpx;
		text-align: center;
		padding: 10rpx;

		.item-border {
			line-height: 42rpx;
			border: 1rpx solid #999999;
		}	
	}
	.submit-btn {
		
	}
	.btn {
		
	}
</style>
