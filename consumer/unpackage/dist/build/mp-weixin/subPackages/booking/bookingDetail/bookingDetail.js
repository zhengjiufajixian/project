(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subPackages/booking/bookingDetail/bookingDetail"],{"54ad":function(e,t,r){"use strict";(function(e){r("921c");a(r("66fd"));var t=a(r("c52e"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("543d")["createPage"])},"5ee9":function(e,t,r){"use strict";var a=r("7bba"),n=r.n(a);n.a},"77ff":function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return a}));var a={uGap:function(){return r.e("uview-ui/components/u-gap/u-gap").then(r.bind(null,"0d4b"))},uLine:function(){return r.e("uview-ui/components/u-line/u-line").then(r.bind(null,"a939"))},uRate:function(){return r.e("uview-ui/components/u-rate/u-rate").then(r.bind(null,"b903"))},uImage:function(){return r.e("uview-ui/components/u-image/u-image").then(r.bind(null,"7f81"))}},n=function(){var e=this,t=e.$createElement,r=(e._self._c,e.getOrderStatus(e.orderDetail)),a=e.$u.timeFormat(new Date(e.orderDetail.createTime).getTime(),"yyyy-mm-dd hh:MM"),n=e.$u.timeFormat(new Date(e.orderDetail.scheduledTime).getTime(),"yyyy-mm-dd"),o=e.orderDetail.orderStatus?e.getBtnText():null,i=e.orderDetail.orderStatus&&o?e.getBtnText():null;e.$mp.data=Object.assign({},{$root:{m0:r,g0:a,g1:n,m1:o,m2:i}})},o=[]},"7bba":function(e,t,r){},c52e:function(e,t,r){"use strict";r.r(t);var a=r("77ff"),n=r("cd46");for(var o in n)"default"!==o&&function(e){r.d(t,e,(function(){return n[e]}))}(o);r("5ee9");var i,u=r("f0c5"),d=Object(u["a"])(n["default"],a["b"],a["c"],!1,null,"77950217",null,!1,a["a"],i);t["default"]=d.exports},cd46:function(e,t,r){"use strict";r.r(t);var a=r("e76e"),n=r.n(a);for(var o in a)"default"!==o&&function(e){r.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},e76e:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{orderDetail:{id:"",shop:{shopName:""},orderStatus:"",commodityPrice:"",orderMoney:"",replyList:[]},orderId:"",value:0,appraise:{},fz30:{fontSize:"30rpx"}}},onShow:function(){this.getOrderDetail()},onLoad:function(e){this.orderId=e.orderId},methods:{handleCancel:function(){var t=this,r=this.orderDetail;if(console.log(r),"INIT"==r.orderStatus||"WAITCONFIRM"==r.orderStatus){var a="FAIL";this.$u.api.setOrderStatus({orderId:r.id,status:a}).then((function(r){e.showToast({title:"订单取消成功"});var a=t;setTimeout((function(){a.getOrderDetail()}),1500)}))}"SUCCESS"==r.orderStatus&&0==r.refund&&e.navigateTo({url:"/subPackages/apply_refund/apply_refund?orderId="+r.id}),"SUCCESS"==r.orderStatus&&1==r.refund&&e.navigateTo({url:"/subPackages/apply_refund/detail/detail?orderId="+r.id})},getOrderDetail:function(){var e=this;this.$u.api.getOrderDetail({orderId:this.orderId}).then((function(t){var r=JSON.parse(t);if(console.log(r),e.orderDetail=r,e.appraise=r.appraise,r.maintainRemark&&(r.maintainRemark=JSON.parse(r.maintainRemark)),r.appraise&&r.appraise.img&&(e.appraise.img=JSON.parse(r.appraise.img)),r.replyList)for(var a=0;a<r.replyList.length;a++)r.replyList[a].img&&(r.replyList[a].img=JSON.parse(r.replyList[a].img));e.orderDetail=r}))},previewImage:function(e,t){wx.previewImage({current:e,urls:t})},getOrderStatus:function(){var e=this.orderDetail;switch(e.orderStatus){case"INIT":return"XC"==e.orderType?"未支付":"待接单";case"WAITCONFIRM":return"XC"==e.orderType?"待接单":"待报价";case"PAYOFF":return"待支付";case"EXECUTING":return"进行中";case"SUCCESS":return 0==e.refund?"已完成":"已申请退款";case"REFUND":return"已退款";case"FAIL":return"已取消";default:break}},getBtnText:function(){var e=this.orderDetail;switch(e.orderStatus){case"INIT":return"XC"==e.orderType?"去支付":"待接单";case"WAITCONFIRM":return"XC"==e.orderType?"待接单":"待报价";case"PAYOFF":return"去支付";case"EXECUTING":return"等待商家完成";case"SUCCESS":return 0==e.refund?0==e.evaluate?"去评价":"已完成":"";default:return""}},handleConfirm:function(){var t=this.orderDetail;"XC"==t.orderType?("INIT"==t.orderStatus&&e.navigateTo({url:"/subPackages/pay/pay?payType=2&orderId="+t.id+"&orderMoney="+t.orderMoney}),"WAITCONFIRM"==t.orderStatus&&e.showToast({title:"等待商家接单",icon:"none"}),"EXECUTING"==t.orderStatus&&e.showToast({title:"等待商家确认完成",icon:"none"}),"SUCCESS"==t.orderStatus&&0==t.evaluate&&e.navigateTo({url:"/subPackages/order/rate/rate?orderId="+t.id}),"REFUND"==t.orderStatus&&e.showToast({title:"该订单已退款",icon:"none"})):("INIT"==t.orderStatus&&e.showToast({title:"等待商家接单",icon:"none"}),"WAITCONFIRM"==t.orderStatus&&e.showToast({title:"等待商家报价",icon:"none"}),"PAYOFF"==t.orderStatus&&e.navigateTo({url:"/subPackages/pay/pay?payType=1&orderId="+t.id+"&orderMoney="+t.orderMoney}),"EXECUTING"==t.orderStatus&&e.showToast({title:"等待商家确认完成",icon:"none"}),"SUCCESS"==t.orderStatus&&0==t.evaluate&&e.navigateTo({url:"/subPackages/order/rate/rate?orderId="+t.id}),"REFUND"==t.orderStatus&&e.showToast({title:"该订单已退款",icon:"none"}))}}};t.default=r}).call(this,r("543d")["default"])}},[["54ad","common/runtime","common/vendor"]]]);