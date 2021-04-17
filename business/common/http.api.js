let postfix = '/'
let loginUrl = '/merchant/wx/login/';
let saveUnionIdUrl = '/merchant/wx/saveUnionId';
let refreshTokenUrl = '/auth/oauth/token';

let getUserInfoUrl = '/merchant/getMerchantInfo';
let uploadImageUrl = '/file/upload';
let updateMerchantUrl = '/merchant/updateMerchant'

let getAddressListUrl = '/user/getAddressList'
let addAddressUrl = '/user/addAddress'
let updateAddressUrl = '/user/updateAddress'
let delAddressUrl = '/user/delAddress'

let registerUrl = '/merchant/merchant/regiest'
let getTypeListUrl = '/commodity/type/list'
let addCommodityUrl = '/commodity/add'
let getCommodityListUrl = '/commodity/list'
let setCommodityStatusUrl = '/commodity'
let updateCommodityUrl = '/commodity/update'

let changShopStatusUrl = '/merchant/shop'

let getOrderListUrl = '/order/list/'
let getOrderDetailUrl = '/order/detail'
let setOrderStatusUrl = '/order/upOrder'

let replyForOrderUrl = '/appraise/replyForOrder'

let getBankAccountListUrl = '/merchant/getBankAccountList'
let addBankAccountUrl = '/merchant/addBankAccount'

let upShopUrl = '/merchant/shop/upShop'
let getYesterdayUrl = '/merchant/merchant/yesterday'

let setBusinessTimeUrl = '/merchant/shop/businessTime'
let getBusinessTimeUrl = '/merchant/shop/businessTime'

let getUpShopUrl = '/merchant/shop/getUpShop'
let analysisPageDataUrl = '/order/jyfx'
let analysisOrderDataUrl = '/order/jyfx/order'
let analysisCommodityDataUrl = '/order/jyfx/commodity'

let sendMessageUrl = '/merchant/sendMessage'
let validateMsgUrl = '/merchant/validateMsg'

let bindPhoneUrl = '/merchant/bindPhone'

let delBankAccountUrl = '/merchant/delBankAccount'

let upLoginPwdUrl = '/merchant/upLoginPwd'

let upLoginPwdByPhoneUrl = '/merchant/upLoginPwdByPhone'

let getWalletInfoUrl = '/merchant/wallet'

let getWalletRecordUrl = '/merchant/wallet'

let getServicelistUrl = '/merchant/shop/servicelist'

let setOrderConfigUrl = '/order/setOrderConfig'

let upServiceUrl = '/merchant/shop/upService'

let sendWithdrawalUrl = '/merchant/wallet/sendWithdrawal'

let getWithdrawalListUrl = '/merchant/wallet/getWithdrawalList'

let loginByPhoneUrl = 'merchant/wx/login/loginPhone'

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	
	let login = (params = {}) => vm.$u.get(loginUrl + params.code + postfix);
	let refreshToken = (params = {}) => vm.$u.post(refreshTokenUrl, {
		grant_type: 'refresh_token',
		client_id: 'client-app',
		client_secret: '123456',
		refresh_token: uni.getStorageSync('refreshToken')
	});
	let saveUnionId = (params = {}) => vm.$u.post(saveUnionIdUrl, params);

	let getBanner = (params = {}) => vm.$u.get(getBannerUrl);
	let getMerchatShopList = (params = {}) => vm.$u.get(getMerchatShopListUrl + params.page);
	let getUserInfo = (params = {}) => vm.$u.get(getUserInfoUrl + "?merchantId=" + uni.getStorageSync(
		"merchantId"));
	let uploadImage = (params = {}) => vm.$u.post(uploadImageUrl, params);
	let updateMerchant = (params = {}) => vm.$u.post(updateMerchantUrl, params);
	let getAddressList = (params = {}) => vm.$u.get(getAddressListUrl + "?merchantId=" + uni.getStorageSync(
		"merchantId"));
	let addAddress = (params = {}) => vm.$u.post(addAddressUrl, params);
	let updateAddress = (params = {}) => vm.$u.post(updateAddressUrl, params);
	let delAddress = (params = {}) => vm.$u.post(delAddressUrl, params);

	let register = (params = {}) => vm.$u.post(registerUrl, params);
	let getTypeList = (params = {}) => vm.$u.get(getTypeListUrl);
	let addCommodity = (params = {}) => vm.$u.post(addCommodityUrl, params);
	let getCommodityList = (params = {}) => vm.$u.get(getCommodityListUrl + "?shopId=" + uni.getStorageSync(
			"shopId") +
		"&status=" + params.status + "&page=" + params.page);
	let setCommodityStatus = (params = {}) => vm.$u.post(setCommodityStatusUrl + postfix + uni.getStorageSync(
			'merchantId') + postfix + params.commodityId + postfix +
		params.status);

	let changShopStatus = (params = {}) => vm.$u.post(changShopStatusUrl + postfix + uni.getStorageSync(
			"merchantId") +
		postfix +
		uni.getStorageSync("shopId") + postfix + params.status + postfix);

	let updateCommodity = (params = {}) => vm.$u.post(updateCommodityUrl + postfix + uni.getStorageSync(
			"merchantId") +
		postfix + params.commodityId, params)

	let getOrderList = (params = {}) => vm.$u.get(getOrderListUrl + uni.getStorageSync("merchantId") + postfix + uni
		.getStorageSync(
			"shopId") + postfix + params.page +
		postfix + params.status + (params.status ? postfix : ''), {
			orderType: params.orderType
		})
	let getOrderDetail = (params = {}) => vm.$u.get(getOrderDetailUrl + "?orderId=" + params.orderId)

	let setOrderStatus = (params = {}) => {
		let query = {
			merchantId: uni.getStorageSync("merchantId")
		}
		if (params.before) {
			query.before = params.before
		}
		if (params.after) {
			query.after = params.after
		}
		return vm.$u.post(setOrderStatusUrl + postfix + params.orderId + (params.status ? (postfix + params
			.status) : ''), query)
	}

	let replyForOrder = (params = {}) => vm.$u.post(replyForOrderUrl, params)
	let getBankAccountList = (params = {}) => vm.$u.get(getBankAccountListUrl + postfix + uni.getStorageSync(
		"merchantId"))
	let addBankAccount = (params = {}) => vm.$u.post(addBankAccountUrl + postfix + uni.getStorageSync(
		"merchantId") + postfix, params)

	let upShop = (params = {}) => vm.$u.post(upShopUrl + postfix + uni.getStorageSync("merchantId") + postfix + uni
		.getStorageSync(
			"shopId") + postfix, params)

	let getYesterday = (params = {}) => vm.$u.get(getYesterdayUrl + postfix + uni.getStorageSync("merchantId"))

	let setBusinessTime = (params = {}) => vm.$u.post(setBusinessTimeUrl + postfix + uni.getStorageSync('shopId') +
		postfix + uni.getStorageSync('merchantId'), params)

	let getBusinessTime = (params = {}) => vm.$u.get(getBusinessTimeUrl + postfix + uni.getStorageSync('shopId'))
	let getUpShop = (params = {}) => vm.$u.get(getUpShopUrl + postfix + uni.getStorageSync('merchantId') + postfix +
		uni.getStorageSync(
			'shopId'))

	let analysisPageData = (params = {}) => vm.$u.get(analysisPageDataUrl + postfix + uni.getStorageSync(
		'merchantId'))
	let analysisOrderData = (params = {}) => vm.$u.get(analysisOrderDataUrl + postfix + uni.getStorageSync(
			'merchantId') +
		'?type=' + params.time)
	let analysisCommodityData = (params = {}) => vm.$u.get(analysisCommodityDataUrl + postfix + uni.getStorageSync(
		'merchantId') + '?type=' + params.time)

	let sendMessage = (params = {}) => vm.$u.get(sendMessageUrl + (params.phone ? '?phone=' + params.phone :
		'?merchantId=' + uni.getStorageSync('merchantId')))

	let validateMsg = (params = {}) => vm.$u.post(validateMsgUrl, params)

	let bindPhone = (params = {}) => vm.$u.post(bindPhoneUrl, params)

	let delBankAccount = (params = {}) => vm.$u.post(delBankAccountUrl + postfix + uni.getStorageSync(
			'merchantId') +
		postfix + params.bankAccountId, {
			code: params.code
		})

	let upLoginPwd = (params = {}) => vm.$u.post(upLoginPwdUrl, params)

	let upLoginPwdByPhone = (params = {}) => vm.$u.post(upLoginPwdByPhoneUrl, params)

	let getWalletInfo = (params = {}) => vm.$u.get(getWalletInfoUrl + postfix + uni.getStorageSync('merchantId'))
	let getWalletRecord = (params = {}) => vm.$u.get(getWalletRecordUrl + postfix + params.type + postfix + uni
		.getStorageSync(
			'merchantId') + postfix + params.page)

	let getServicelist = (params = {}) => vm.$u.get(getServicelistUrl)

	let setOrderConfig = (params = {}) => vm.$u.post(setOrderConfigUrl, params)

	let upService = (params = {}) => vm.$u.post(upServiceUrl + postfix + uni.getStorageSync('merchantId') +
		postfix + uni
		.getStorageSync('shopId') + postfix + params.type + postfix + params.status)

	let sendWithdrawal = (params = {}) => vm.$u.post(sendWithdrawalUrl, params)

	let getWithdrawalList = (params = {}) => vm.$u.get(getWithdrawalListUrl,{
		merchantId : uni.getStorageSync('merchantId'),
		page: params.page,
		pageSize: params.pageSize ? params.pageSize : 10
	})
	
	let loginByPhone = (params = {}) => vm.$u.get(loginByPhoneUrl + postfix + '?phone=' + params.phone + '&password=' + params.password)
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		login,
		saveUnionId,
		refreshToken,
		getBanner,
		getMerchatShopList,
		getUserInfo,
		uploadImage,
		updateMerchant,
		getAddressList,
		addAddress,
		updateAddress,
		delAddress,
		register,
		getTypeList,
		addCommodity,
		getCommodityList,
		setCommodityStatus,
		changShopStatus,
		updateCommodity,
		getOrderList,
		getOrderDetail,
		setOrderStatus,
		replyForOrder,
		getBankAccountList,
		addBankAccount,
		upShop,
		getYesterday,
		setBusinessTime,
		getBusinessTime,
		getUpShop,
		analysisPageData,
		analysisOrderData,
		analysisCommodityData,
		sendMessage,
		validateMsg,
		bindPhone,
		delBankAccount,
		upLoginPwd,
		upLoginPwdByPhone,
		getWalletInfo,
		getWalletRecord,
		getServicelist,
		setOrderConfig,
		upService,
		sendWithdrawal,
		getWithdrawalList,
		loginByPhone
	};
}

export default {
	install
}
