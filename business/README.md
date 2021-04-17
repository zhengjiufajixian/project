洗车订单状态 
	用户下单						----INIT
	支付成功						----WAITCONFIRM
	商家确认操作后				----EXECUTING
	商家完成按钮					----SUCCESS
	用户申请退款，后台操作退款后	----REFUND
	用户取消订单					----FAIL

维修保养订单
	用户下单						----INIT
	商家确认操作后				----WAITCONFIRM
	商家填写具体项目和金额			----PAYOFF
	用户支付后					----EXECUTING
	商家完成按钮					----SUCCESS
	用户申请退款，后台操作退款后	----REFUND
	用户取消订单					----FAIL

字体大小(最小设置24rpx)
主标题		30rpx
小标题		24rox