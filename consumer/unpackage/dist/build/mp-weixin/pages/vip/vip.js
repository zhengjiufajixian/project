(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/vip/vip"],{"171a":function(n,t,e){"use strict";e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return u}));var u={uAvatar:function(){return e.e("uview-ui/components/u-avatar/u-avatar").then(e.bind(null,"ccb6"))},uSwiper:function(){return e.e("uview-ui/components/u-swiper/u-swiper").then(e.bind(null,"5deb"))},uLine:function(){return e.e("uview-ui/components/u-line/u-line").then(e.bind(null,"99e7"))},uGap:function(){return e.e("uview-ui/components/u-gap/u-gap").then(e.bind(null,"936d"))},uIcon:function(){return e.e("uview-ui/components/u-icon/u-icon").then(e.bind(null,"ac40"))},uButton:function(){return e.e("uview-ui/components/u-button/u-button").then(e.bind(null,"45ba"))}},i=function(){var n=this,t=n.$createElement;n._self._c},a=[]},"5e19":function(n,t,e){},"785c":function(n,t,e){"use strict";e.r(t);var u=e("e8c6"),i=e.n(u);for(var a in u)"default"!==a&&function(n){e.d(t,n,(function(){return u[n]}))}(a);t["default"]=i.a},afa7:function(n,t,e){"use strict";e.r(t);var u=e("171a"),i=e("785c");for(var a in i)"default"!==a&&function(n){e.d(t,n,(function(){return i[n]}))}(a);e("f799");var o,c=e("f0c5"),r=Object(c["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);t["default"]=r.exports},b90f:function(n,t,e){"use strict";(function(n){e("a739");u(e("66fd"));var t=u(e("afa7"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},e8c6:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{bannerList:[{title:"年度VIP",content:"四项权益助你行：汽车保养，汽车维修，事故处理， 道路救援。【详情咨询客服】",image:"../../../static/image/vip-bg.png"},{image:"../../../static/image/vip-bg.png"},{image:"../../../static/image/vip-bg.png"}],shopList:[],customStyle:{backgroundColor:"#DEBA88",color:"#F4F4F4",height:"80rpx",lineHeight:"80rpx"},status:"loading",page:1}},onLoad:function(){},methods:{seeAll:function(){n.navigateTo({url:"../allShop/allShop"})},getBannerlist:function(){var n=this;this.$u.api.getBanner().then((function(t){n.bannerList=t}))}}};t.default=e}).call(this,e("543d")["default"])},f799:function(n,t,e){"use strict";var u=e("5e19"),i=e.n(u);i.a}},[["b90f","common/runtime","common/vendor"]]]);