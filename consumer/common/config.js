// uEnvDev
if (process.env.NODE_ENV === 'development') {
	exports.baseUrl = 'http://47.96.37.228:3001'
	// exports.baseUrl = 'http://50b2cb8.nat123.cc:31507'
	// exports.baseUrl = 'https://hb.glcyh.com/app'
}
// uEnvProd
if (process.env.NODE_ENV === 'production') {
	// exports.baseUrl = 'http://47.96.37.228:3001'
	// exports.baseUrl = 'http://50b2cb8.nat123.cc:31507'
	exports.baseUrl = 'https://hb.glcyh.com/app'
}

// 微信小程序相关配置
exports.getNum = () => {
	let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
		'K',
		'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
		'g', 'h',
		'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	];
	let nums = "";
	for (let i = 0; i < 32; i++) {
		let id = parseInt(Math.random() * 61);
		nums += chars[id];
	}
	return nums;
}

function toRad(d) {
	return d * Math.PI / 180;
}
// 计算两点之间的距离
exports.getDistance = (lat1, lng1, lat2, lng2) => {

	var dis = 0;

	var radLat1 = toRad(lat1);

	var radLat2 = toRad(lat2);

	var deltaLat = radLat1 - radLat2;

	var deltaLng = toRad(lng1) - toRad(lng2);

	var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) *
		Math.pow(Math.sin(deltaLng / 2), 2)));

	var num = Math.round(dis * 6378137 * 100) / 100

	if (num > 1000) {
		num = Math.round(num / 1000 * 100) / 100 + ' km'
	} else {
		num = Math.round(num) + ' m'
	}
	return num

}

let key = "21E4ACD4CD5D4619B063F40C5A454F7D"
exports.key = key

let WX_appId = 'wxb3891f1596d7086e'
exports.WX_appId = WX_appId

let WX_map_key = 'HXVBZ-NKU3P-HH3DY-VHA4R-XOIMO-TYFJX'
exports.WX_map_key = WX_map_key

let WX_map_refer = '广莱车友汇-客户端'
exports.WX_map_refer = WX_map_refer

// 调用腾讯地图线路规划
exports.tencentMapNavi = (name, lat, lon) => {
	wx.openLocation({
		latitude: Number(lat),
		longitude: Number(lon),
		name: name,
		scale: 28
	})
}

let contactPhone = "0717-6215881"
exports.contactPhone = contactPhone

// 隐藏手机号

function hidePhoneNum(num) {
	return num.replace(/(.{3}).*(.{2})/, '$1******$2')
}
exports.hidePhoneNum = hidePhoneNum

let mobilePhoneReg = /^1[3-9]\d{9}$/

exports.mobilePhoneReg = mobilePhoneReg

// 京东万象 驾驶证识别APPKEY
let JSZSB_APPKEY = '0f1272a9e88c145072a2c03004b470ed'

exports.JSZSB_APPKEY


let txt = `<br/>&nbsp;&nbsp;&nbsp;&nbsp;广莱车友汇（以下或称“我们”）非常注重保护用户（以下或称“您”）的个人信息，我们深知个人信息对您的重要性，并将按照法律法规要求和业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。
<br/>&nbsp;&nbsp;&nbsp;&nbsp;【特别提示】请您在使用我们提供的各项产品服务前，仔细阅读并充分理解本《隐私政策》（重点内容我们已将字体加粗请您特别关注）并作出相应选择。一旦您使用或继续使用我们的产品服务时，即意味着您同意我们按照本隐私政策收集、使用、保存、共享和保护您的相关信息。如对本隐私政策有任何疑问，您可以通过我们的小程序上的客服系统与我们联系。
<br/>&nbsp;&nbsp;&nbsp;&nbsp;“广莱车友汇商家版的产品服务”是指广莱车友汇的网络及技术服务提供者通过下述途径向您提供的产品服务：包括但不限于微信开放平台账号或小程序等。
<br/>&nbsp;&nbsp;&nbsp;&nbsp;本政策所称的广莱车友汇及其关联方是指湖北广莱车友汇网络科技有限公司及现有和或未来设立的相关关联公司的单称或合称。 广莱车友汇商家版所有的产品服务（包括广莱车友汇商家提供的产品服务及未设独立隐私政策的广莱车友汇商家关联方提供的产品服务）均适用本隐私政策。
<br/>&nbsp;&nbsp;&nbsp;&nbsp;请您注意，您应保证在使用广莱车友汇商家服务中所提供的一切数据信息均为真实，且经过合法途径获得，如其中包含第三方个人信息（如您的员工信息、会员信息、供应商信息以及商家后续使用新增功能时所提供的个人信息等），请确认您已取得该信息所有方的充分、合法的授权，一旦您在使用我们服务的过程中提供此类信息，我们将认为该类信息均为您有权处理，不存在任何违反法律、法规或侵犯任何第三方合法权利的事由/瑕疵/场景。
<br/>&nbsp;&nbsp;&nbsp;&nbsp;本政策不适用于您通过我们的产品服务而接入的其他第三方产品服务(“其他第三方”，包括但不限于您的交易相对方、任何第三方网站以及第三方服务提供者)，具体规定请参照该第三方的隐私政策或类似声明。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;一、我们如何收集和使用您的个人信息 我们会出于本政策所述的以下目的，收集和使用您的个人信息：
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）帮助您登录我们的商家版后台 为登录我们的商家版后台，以便我们为您提供商家服务，您需要提供手机号码，网络身份识别信息（如头像、昵称及账号密码等）等。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）向您提供产品服务 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、您向我们提供的信息 为便于向您提供产品服务，我们有权从身份校验、完成交易、售后及客户服务、提供安全保障等多种角度，收集您向我们提供的联系人信息（姓名、性别、电话号码等）、法定代表人信息、商家地址、电子邮箱、银行账户或其他支付工具的账户信息等，您在使用广莱车友汇商家版服务的过程中所提交的任何文字、照片、视频等各种形式的信息，也可能会包含或者关联到您的个人信息，我们将对于上述信息中涉及的个人信息予以严格保护。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、我们在您使用服务过程中收集的信息 为向您展示有关订单信息，我们会收集您在使用我们服务过程中产生的订单信息用于向您展示及便于您对订单进行管理。 为了满足法律法规及提供服务的基本要求，保障您的账号安全与系统运行安全，我们会收集您的日志信息、订单信息、浏览及搜索信息、位置信息、设备信息、行为偏好等，以及将您在使用我们关联方的某项服务中提供的信息结合起来，进行综合统计、分析以形成用户画像，用来向您推荐或展示您可能感兴趣的产品服务信息； 当您与我们联系时，我们可能会收集您的通信通话记录和内容或您留下的联系方式等信息，以便与您联系、帮助您解决问题，或记录相关问题的处理方案及结果。 当您参与我们的推广活动和问卷调查过程中，我们可能会收集您主动提供的相关信息等。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、我们通过间接收集到的您的个人信息 为能向您提供更优质的服务，同时为能确认交易状态及为您提供售后与争议解决服务，经您授权后我们会通过您选择的交易对象和交易直接涉及的第三方信息系统、支付机构等收集与交易进度相关的您的交易、支付、配送等信息，或者将您的信息共享给上述服务提供者，以便于我们处理您的订单并保证服务的顺利完成，或者更好地预防诈骗、刷单等恶意行为。我们会依据法律法规的要求以及与第三方的约定，经您授权后向美团点评的关联方、合作伙伴等获得您的有关信息，并对其信息来源的合法性进行确认后使用您的这些信息。 请注意，无法与任何特定个人直接建立联系的数据，不属于个人信息。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）改进我们的产品服务 为改善我们的产品或服务、向您提供个性化的信息搜索及交易服务，使您及时了解丰富的商品信息，提升服务体验，我们会根据您的浏览及搜索记录、设备信息、位置信息、订单信息，提取您的浏览、搜索偏好、行为习惯、位置信息等特征，基于特征标签进行间接人群画像并展示、推送相关信息，包括通过短信、电话、邮件等各种方式向你推送营销活动信息、商品交易信息、促销信息等。如果您不同意接收来自平台的推送信息，可以通过相应的退订方式进行退订。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（四）为您提供安全保障 为提高您使用我们提供的服务的安全性，更准确地预防钓鱼网站欺诈和木马病毒，我们可能会使用或整合您的个人信息以及我们的关联方、合作伙伴取得您授权或者依法共享的信息，根据您的使用习惯和常用软件信息等来综合判断您的账号及交易风险，包括验证身份，预防、发现、调查可能存在的欺诈、网络病毒、网络攻击等安全风险以及违反我们或关联方协议、政策或规则等行为，以保护您、其他用户、我们或关联方的合法权益，并记录一些我们认为有风险的链接(“URL”)。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（五）征得同意的例外 请您知悉，以下情形中，我们收集、使用个人信息无需征得您的授权同意： 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、与国家安全、国防安全有关的； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、与公共安全、公共卫生、重大公共利益有关的； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、与犯罪侦查、起诉、审判和判决执行等有关的； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、所收集的个人信息是个人信息主体自行向社会公众公开的； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6、从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7、根据您的要求签订合同所必需的； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8、用于维护所提供的产品与/或服务的安全稳定运行所必需的，例如发现、处置产品与/或服务的故障； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9、为合法的新闻报道所必需的； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;10、学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;11、法律法规规定的其他情形。
<br/>&nbsp;&nbsp;&nbsp;&nbsp;二、我们如何共享、转让、公开披露您的个人信息 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）共享 我们不会与平台以外的任何公司、组织和个人共享您的个人信息，但以下情况除外： 基于法定情形下：根据法律法规的规定、诉讼争议解决需要，或行政、司法等有权机关依法提出的要求； 与关联公司共享：为向用户提供一致化服务以及便于用户进行统一管理，我们会基于必要性的前提下将您的个人信息与我们的关联公司共享。 与合作伙伴分享：我们可能会向业务合作伙伴共享为您提供服务所必要的订单信息、账户信息、支付信息等。我们的业务合作伙伴包括供应商、第三方服务提供商等业务合作伙伴。 基于协议约定：依据您与我们签署的相关协议(包括在线签署的电子协议及平台规则)或法律文件，有必要向第三方共享时； 基于合理商业习惯：例如与第三方共享联合营销活动中的中奖信息，以便第三方能及时向您发放奖品等。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）转让 我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外： 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、在我们发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）公开披露 我们不会公开披露您的个人信息，但以下情况除外： 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、基于您的主动选择或获得您的明确同意，我们可能会公开您的相关个人信息； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、 如果我们确定您出现违反法律法规或严重违反广莱车友汇相关协议规则的情况，或为保护广莱车友汇及其关联公司用户或公众的人身财产安全免遭侵害以及维护良好的公平交易环境，我们可能依据法律法规或广莱车友汇相关协议规则披露您的相关个人信息，例如若您销售不符合安全标准的商品而严重违反广莱车友汇规则时，我们可能会公开披露您的店铺主体信息与相关处罚情况。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;三、我们如何保护您个人信息的安全 为保障您的信息安全，我们努力采取各种符合业界标准的物理、电子和管理方面的安全措施来保护您的个人信息，防止您的个人信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息，使用加密技术确保数据的保密性；使用受信赖的保护机制防止数据遭到恶意攻击；部署访问控制机制，确保只有授权人员才可访问个人信息；以及举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。 在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;四、您的个人信息如何在全球范围转移 我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内，以下情形除外： 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、法律法规有明确规定； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、获得您的明确授权； 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、您通过互联网进行跨境交易等个人主动行为。 针对以上情形，我们会确保依据本隐私权政策对您的个人信息提供足够的保护。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;五、通知与修订 为给您提供更好的服务，我们的业务将不时变化，本隐私政策也将随之调整。未经您明确同意，我们不会削减您依据本隐私政策所应享有的权利。我们会通过在我们网站、小程序上发出更新版本或以其他方式提醒您相关内容的更新，也请您访问我们以便及时了解最新的隐私政策。在前述情况下，若您继续使用我们的服务，即表示同意接受修订后的本政策并受之约束。 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;六、如何联系我们 如果您对于我们的个人信息处理行为存在任何投诉举报需求，您可以通过广莱车友汇/广莱车友汇商家端上提供的联系方式客服系统与我们联系并作充分描述，我们将在验证您身份的30天内答复您的请求并尽力解决。如果您对我们的回复不满意，特别是认为我们的个人信息处理行为损害了您的合法权益，您还可以通过向被告住所地有管辖权的法院提起诉讼
`
exports.txt = txt


let resureLocation = {
	longitude: '111.348578',
	latitude: '30.736555',
	name: '天楚汽修'
}
exports.resureLocation = resureLocation


let actionSheetList = [{
	text: '小型车(轿车)'
}, {
	text: '中型车(SUV)'
}, {
	text: '大型车(7座以上)'
}]
exports.actionSheetList = actionSheetList

let getSubscribeMessage = function(callback) {
	uni.requestSubscribeMessage({
		// 商家接单提醒
		tmplIds: ['FV-aIJQ2njJqK-yVq-3ipnwsiWKb9Nf6R2mHN04AA2U',
			'hu4QTiYSfmx39DNGyoC6miBCiAMrNvdHUnOWJ9W6SHQ'
		],
		complete: (res) => {
			console.log(res)
			callback ? callback() : ''
		}
	})
}
exports.getSubscribeMessage = getSubscribeMessage

function btoa(string) {
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		// Regular expression to check formal correctness of base64 encoded strings

		b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
	// base64 character set, plus padding character (=)
	string = String(string);
	var bitmap, a, b, c,
		result = "",
		i = 0,
		rest = string.length % 3; // To determine the final padding

	for (; i < string.length;) {
		if ((a = string.charCodeAt(i++)) > 255 ||
			(b = string.charCodeAt(i++)) > 255 ||
			(c = string.charCodeAt(i++)) > 255)
			throw new TypeError(
				"Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
				);

		bitmap = (a << 16) | (b << 8) | c;
		result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) +
			b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
	}

	// If there's need of padding, replace the last 'A's with equal signs
	return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
};
exports.btoa = btoa