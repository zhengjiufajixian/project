(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/info/address/editAddress/editAddress"],{"1ec6":function(t,e,u){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={data:function(){return{id:"",addressId:"",userName:"",userPhone:"",userAddress:"",status:!1}},onLoad:function(t){t=JSON.parse(t.data),console.log(t),this.id=t.id,this.userId=t.userId,this.userName=t.userName,this.userPhone=t.userPhone,this.userAddress=t.userAddress,this.status=t.status>0},methods:{saveAddress:function(){var e=this;this.$u.api.updateAddress({id:this.id,userId:this.userId,userName:this.userName,userPhone:this.userPhone,userAddress:this.userAddress,status:this.status?1:0}).then((function(u){e.$refs.uToast.show({title:"操作成功"}),setTimeout((function(){t.navigateBack()}),500)}))}}};e.default=u}).call(this,u("543d")["default"])},"1f8d":function(t,e,u){"use strict";u.r(e);var n=u("1ec6"),s=u.n(n);for(var i in n)"default"!==i&&function(t){u.d(e,t,(function(){return n[t]}))}(i);e["default"]=s.a},"27b7":function(t,e,u){"use strict";(function(t){u("a739");n(u("66fd"));var e=n(u("8767"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,u("543d")["createPage"])},"7a95":function(t,e,u){},8767:function(t,e,u){"use strict";u.r(e);var n=u("cf92"),s=u("1f8d");for(var i in s)"default"!==i&&function(t){u.d(e,t,(function(){return s[t]}))}(i);u("d56f");var r,d=u("f0c5"),o=Object(d["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=o.exports},cf92:function(t,e,u){"use strict";u.d(e,"b",(function(){return s})),u.d(e,"c",(function(){return i})),u.d(e,"a",(function(){return n}));var n={uGap:function(){return u.e("uview-ui/components/u-gap/u-gap").then(u.bind(null,"936d"))},uField:function(){return u.e("uview-ui/components/u-field/u-field").then(u.bind(null,"8806"))},uSwitch:function(){return u.e("uview-ui/components/u-switch/u-switch").then(u.bind(null,"6d7f"))},uButton:function(){return u.e("uview-ui/components/u-button/u-button").then(u.bind(null,"45ba"))},uToast:function(){return u.e("uview-ui/components/u-toast/u-toast").then(u.bind(null,"692a"))}},s=function(){var t=this,e=t.$createElement;t._self._c},i=[]},d56f:function(t,e,u){"use strict";var n=u("7a95"),s=u.n(n);s.a}},[["27b7","common/runtime","common/vendor"]]]);