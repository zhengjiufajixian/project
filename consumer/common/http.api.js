let postfix = '/'
let loginUrl = '/user/wx/getOpenId/';
let saveUnionIdUrl = '/user/wx/saveUnionId';
let refreshTokenUrl = '/auth/oauth/token';

let getBannerUrl = '/news/getLunBo';
let getUserInfoUrl = '/user/getUserInfo';
let bindPhoneUrl = '/user/bindPhone';
let uploadImageUrl = '/file/upload';
let upUserUrl = '/user/upUser'

let getAddressListUrl = '/user/getAddressList'
let addAddressUrl = '/user/addAddress'
let updateAddressUrl = '/user/updateAddress'
let delAddressUrl = '/user/delAddress'

let rechargeUrl = '/user/wallet/recharge'
let getWaletDetailUrl = '/user/wallet/detail'
let getWalletInfoUrl = '/user/wallet'
let getWalletRecordUrl = '/user/order'

let getTypeListUrl = '/commodity/type/list'
let getCommodityListUrl = '/commodity/getCommdityList'

let createOrderUrl = '/order/createOrder'
let createBYOrderUrl = '/order/createBYOrder'
let getOrderListUrl = '/order/list/user/'
let getOrderDetailUrl = '/order/detail'
let setOrderStatusUrl = '/order/upOrder'
let rateOrderUrl = '/appraise/order/'

let getMerchatShopListUrl = '/merchant/shop/list/';
let getShopDetailUrl = '/merchant/shop/detail'
let getCarUrl = '/user/car'
let saveCarUrl = '/user/car/save'
let delCarUrl = '/user/car/del'

let getClassLunboUrl = '/news/ketang/lunbo'
let getClassTagListUrl = '/news/ketang/tag/list'
let getClassTagLunboUrl = '/news/ketang/tag/lunbo'

let getClassListUrl = '/news/ketang/list'
let getClassDetailUrl = '/news/ketang/detail'
let getSearchStringUrl = '/news/ketang/getSearchString'
let getSearchUrl = '/news/ketang/search'

let sendMessageUrl = '/user/sendMessage'

let getNoticeListUrl = '/user/notice/list'
let getNoticeDetailUrl = '/user/notice/detail'
let getAppraiseListUrl = '/appraise/getAppraiseList'

let paymentOrderUrl = '/order/paymentOrder'
let applyRefundUrl = '/order/refund'

let getUserCancelUrl = '/user/cancel/get'
let saveUserCancelUrl = '/user/cancel/save'
let updateUserCancelUrl = '/user/cancel/update'

let saveDriverUrl = '/user/car/saveDriver'
let getDriverUrl = '/user/car/getDriver'

let addRescueUrl = '/order/rescue/add'
let getRescueListUrl = '/order/rescue/list'
let payRescueOrderUrl = '/order/rescue/payOrder'

let getTuijianAllUrl = '/user/tuijian/all'
let getTuijianListUrl = '/user/tuijian/list'

let getVipUrl = '/user/getVip'

let detailShareUrl = '/news/ketang/detail/share'

let getQRCodeUrl = '/user/getQRCode'

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数

	let login = (params = {}) => vm.$u.post(loginUrl + params.code + postfix, {
		id: uni.getStorageSync('inviteCode')
	});
	let refreshToken = (params = {}) => vm.$u.post(refreshTokenUrl, {
		grant_type: 'refresh_token',
		client_id: 'client-app',
		refresh_token: uni.getStorageSync('refreshToken')
	});
	let saveUnionId = (params = {}) => vm.$u.post(saveUnionIdUrl, params);

	let getBanner = (params = {}) => vm.$u.get(getBannerUrl);
	let getMerchatShopList = (params = {}) => vm.$u.get(getMerchatShopListUrl + params.page + postfix + params
		.type, {
			longitude: uni.getStorageSync('longitude'),
			latitude: uni.getStorageSync('latitude'),
		});
	let getUserInfo = (params = {}) => vm.$u.get(getUserInfoUrl + "?userId=" + uni.getStorageSync("userId"));
	let bindPhone = (params = {}) => vm.$u.post(bindPhoneUrl, params);
	let uploadImage = (params = {}) => vm.$u.post(uploadImageUrl, params);
	let upUser = (params = {}) => vm.$u.post(upUserUrl, params);
	let getAddressList = (params = {}) => vm.$u.get(getAddressListUrl + "?userId=" + uni.getStorageSync("userId"));
	let addAddress = (params = {}) => vm.$u.post(addAddressUrl, params);
	let updateAddress = (params = {}) => vm.$u.post(updateAddressUrl, params);
	let delAddress = (params = {}) => vm.$u.post(delAddressUrl, params);
	let recharge = (params = {}) => vm.$u.post(rechargeUrl, params);
	let getTypeList = (params = {}) => vm.$u.get(getTypeListUrl);
	let getCommodityList = (params = {}) => vm.$u.get(getCommodityListUrl + "?shopId=" + params.shopId +
		"&commodityType=" + params.commodityType + "&page=" + params.page);

	let createOrder = (params = {}) => vm.$u.post(createOrderUrl, params);
	let createBYOrder = (params = {}) => vm.$u.post(createBYOrderUrl, params);
	let getWaletDetail = (params = {}) => vm.$u.get(getWaletDetailUrl + "?userId=" + uni.getStorageSync("userId"));
	let getOrderList = (params = {}) => vm.$u.get(getOrderListUrl + uni.getStorageSync("userId") + postfix + params
		.page +
		postfix + params.status, {
			orderType: params.orderType
		})
	let getOrderDetail = (params = {}) => vm.$u.get(getOrderDetailUrl + "?orderId=" + params.orderId)
	let setOrderStatus = (params = {}) => vm.$u.post(setOrderStatusUrl + postfix + params.orderId + postfix + params
		.status, {
			userId: uni.getStorageSync("userId")
		})
	let rateOrder = (params = {}) => vm.$u.post(rateOrderUrl, params)
	let getShopDetail = (params = {}) => vm.$u.get(getShopDetailUrl + postfix + params.shopId)

	let getWalletInfo = (params = {}) => vm.$u.get(getWalletInfoUrl + postfix + uni.getStorageSync("userId"))

	let getWalletRecord = (params = {}) => vm.$u.get(getWalletRecordUrl + postfix + params.orderType + postfix + uni
		.getStorageSync(
			'userId') + postfix + params.page + postfix)

	let getCar = (params = {}) => vm.$u.get(getCarUrl + postfix + uni.getStorageSync("userId"))
	let saveCar = (params = {}) => vm.$u.post(saveCarUrl, params)

	let getClassLunbo = (params = {}) => vm.$u.get(getClassLunboUrl)
	let getClassTagList = (params = {}) => vm.$u.get(getClassTagListUrl)
	let getClassTagLunbo = (params = {}) => vm.$u.get(getClassTagLunboUrl, params)
	let getClassList = (params = {}) => vm.$u.get(getClassListUrl, params)
	let getClassDetail = (params = {}) => vm.$u.get(getClassDetailUrl + postfix + params.id)
	let getSearchString = (params = {}) => vm.$u.get(getSearchStringUrl)
	let getSearch = (params = {}) => vm.$u.get(getSearchUrl, params)

	let sendMessage = (params = {}) => vm.$u.get(sendMessageUrl + (params.phone ? '?phone=' + params.phone :
		'?userId=' +
		uni.getStorageSync('userId')))

	let sendchangePhoneMessage = (params = {}) => vm.$u.get(sendMessageUrl + '?phone=' + params.phone + '&userId=' +
		uni.getStorageSync('userId'))

	let getNoticeList = (params = {}) => vm.$u.get(getNoticeListUrl, params)
	let getNoticeDetail = (params = {}) => vm.$u.get(getNoticeDetailUrl + postfix + params.id)

	let getAppraiseList = (params = {}) => vm.$u.get(getAppraiseListUrl, params)
	let paymentOrder = (params = {}) => vm.$u.post(paymentOrderUrl, params)

	let applyRefund = (params = {}) => vm.$u.post(applyRefundUrl + postfix + params.orderId + postfix + uni
		.getStorageSync(
			'userId'), {
			refundMsg: params.refundMsg,
			refundImg: params.refundImg
		})

	let delCar = (params = {}) => vm.$u.post(delCarUrl + postfix + uni.getStorageSync('userId') + postfix + params
		.carId)

	let getUserCancel = (params = {}) => vm.$u.get(getUserCancelUrl, {
		userId: uni.getStorageSync('userId')
	})

	let saveUserCancel = (params = {}) => vm.$u.post(saveUserCancelUrl, {
		userId: uni.getStorageSync('userId'),
		cause: params.cause,
		phone: params.phone
	})

	let updateUserCancel = (params = {}) => vm.$u.post(updateUserCancelUrl, {
		userId: uni.getStorageSync('userId'),
		cancelId: params.cancelId,
		status: params.status
	})

	// 获取百度access_token 过期时间一个月
	let grant_type = 'client_credentials'
	let client_id = 'K8HSXMVLSCKQXrRCsTiHt3ar'
	let client_secret = 'wpr9V3bmkz9AW1aEHCDIKtCD3ARdXSoW'

	let getBaiduAccessToken = (params = {}) => vm.$u.post('https://aip.baidubce.com/oauth/2.0/token?grant_type=' +
		grant_type + '&client_id=' + client_id + '&client_secret=' + client_secret)

	let baidu_access_token = '24.8b1999244c7ce0b510f8cea11a8b60e8.2592000.1618118926.282335-23785677'
	let baiduOCR = (params = {}) => vm.$u.post(
		'https://aip.baidubce.com/rest/2.0/ocr/v1/vehicle_license?access_token=' + params.token, {
			image: params.image
		})

	let saveDriver = (params = {}) => vm.$u.post(saveDriverUrl, params)
	let getDriver = (params = {}) => vm.$u.get(getDriverUrl, {
		userId: uni.getStorageSync('userId')
	})
	let addRescue = (params = {}) => vm.$u.post(addRescueUrl, params)
	let getRescueList = (params = {}) => vm.$u.get(getRescueListUrl, {
		userId: uni.getStorageSync('userId'),
		status: params.status,
		page: params.page ? params.page : 10
	})

	let payRescueOrder = (params = {}) => vm.$u.post(payRescueOrderUrl, {
		orderId: params.orderId,
		paymentType: params.paymentType,
		openId: params.openId
	})

	let getTuijianAll = (params = {}) => vm.$u.get(getTuijianAllUrl, {
		userId: uni.getStorageSync('userId')
	})
	let getTuijianList = (params = {}) => vm.$u.get(getTuijianListUrl, {
		userId: uni.getStorageSync('userId'),
		page: params.page
	})

	let getVip = (params = {}) => vm.$u.get(getVipUrl, {
		userId: uni.getStorageSync('userId')
	})

	let detailShare = (params = {}) => vm.$u.post(detailShareUrl, params)

	let getQRCode = (params = {}) => {
		vm.$u.http.setConfig({
			header: {
				'response-type': 'arraybuffer'
			},
		})
		vm.$u.get(getQRCodeUrl + '?userId=' + uni.getStorageSync('userId'))
	}

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		login,
		saveUnionId,
		refreshToken,
		getBanner,
		getMerchatShopList,
		getUserInfo,
		bindPhone,
		uploadImage,
		upUser,
		getAddressList,
		addAddress,
		updateAddress,
		delAddress,
		recharge,
		getTypeList,
		getCommodityList,
		createOrder,
		createBYOrder,
		getWaletDetail,
		getOrderList,
		getOrderDetail,
		setOrderStatus,
		rateOrder,
		getShopDetail,
		getWalletInfo,
		getWalletRecord,
		getCar,
		saveCar,
		delCar,
		getClassLunbo,
		getClassTagList,
		getClassTagLunbo,
		getClassList,
		getClassDetail,
		getSearchString,
		getSearch,
		sendMessage,
		getNoticeList,
		getNoticeDetail,
		getAppraiseList,
		paymentOrder,
		applyRefund,
		getUserCancel,
		saveUserCancel,
		updateUserCancel,
		getBaiduAccessToken,
		baiduOCR,
		saveDriver,
		getDriver,
		addRescue,
		getRescueList,
		payRescueOrder,
		getTuijianAll,
		getTuijianList,
		getVip,
		detailShare,
		sendchangePhoneMessage,
		getQRCode
	};
}

export default {
	install
}
