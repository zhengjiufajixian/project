(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"0fd1":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{userInfo:null}},onShow:function(){var e=this;this.$u.api.getUserInfo().then((function(t){n.setStorageSync("headImg",t.headImg),e.userInfo=t}))},methods:{setPage:function(e){n.navigateTo({url:"/pages/my/"+e+"/"+e})},toMerchant:function(){n.navigateToMiniProgram({appId:"wxdfec8f307cdae32c",path:"pages/login/login",success:function(n){console.log(n)},fail:function(n){console.log(n)}})}}};e.default=t}).call(this,t("543d")["default"])},"2dab":function(n,e,t){},aeec:function(n,e,t){"use strict";t.r(e);var u=t("0fd1"),o=t.n(u);for(var a in u)"default"!==a&&function(n){t.d(e,n,(function(){return u[n]}))}(a);e["default"]=o.a},b23d:function(n,e,t){"use strict";var u=t("2dab"),o=t.n(u);o.a},c7b2:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return a})),t.d(e,"a",(function(){return u}));var u={uAvatar:function(){return t.e("uview-ui/components/u-avatar/u-avatar").then(t.bind(null,"ccb6"))},uRow:function(){return t.e("uview-ui/components/u-row/u-row").then(t.bind(null,"c324"))},uCol:function(){return t.e("uview-ui/components/u-col/u-col").then(t.bind(null,"4980"))},uImage:function(){return t.e("uview-ui/components/u-image/u-image").then(t.bind(null,"7e8b"))},uLoading:function(){return t.e("uview-ui/components/u-loading/u-loading").then(t.bind(null,"64fa"))}},o=function(){var n=this,e=n.$createElement;n._self._c},a=[]},e8bf:function(n,e,t){"use strict";t.r(e);var u=t("c7b2"),o=t("aeec");for(var a in o)"default"!==a&&function(n){t.d(e,n,(function(){return o[n]}))}(a);t("b23d");var i,c=t("f0c5"),r=Object(c["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],i);e["default"]=r.exports},f2b1:function(n,e,t){"use strict";(function(n){t("a739");u(t("66fd"));var e=u(t("e8bf"));function u(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])}},[["f2b1","common/runtime","common/vendor"]]]);