(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setting/autoOpen/autoOpen"],{"057d":function(t,e,n){"use strict";(function(t){n("7ade");i(n("66fd"));var e=i(n("6e0b"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"10a5":function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uImage:function(){return n.e("uview-ui/components/u-image/u-image").then(n.bind(null,"412e"))},uSwitch:function(){return n.e("uview-ui/components/u-switch/u-switch").then(n.bind(null,"dee3"))},uPicker:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-picker/u-picker")]).then(n.bind(null,"b935"))}},u=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"49af":function(t,e,n){"use strict";var i=n("f414"),u=n.n(i);u.a},"5a6b":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{checked:!1,params:{hour:!0,minute:!0,timestamp:!0},show:!1,start:{hour:"08",minute:"00"},end:{hour:"18",minute:"00"},current:"start",defaultTime:"00:00"}},onLoad:function(){this.getBusinessTime()},methods:{changeShopStatus:function(){},setTime:function(t){this.defaultTime=this[t].hour+":"+this[t].minute,this.show=!0,this.current=t},handleConfirm:function(t){this[this.current]=t},getFullTime:function(t){var e=new Date,n=new Date(e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDay()+" "+t.hour+":"+t.minute+":00").getTime();return console.log(e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDay()+" "+t.hour+":"+t.minute+":00"),n+""},getBusinessTime:function(){var t=this;this.$u.api.getBusinessTime().then((function(e){if(e){t.checked=0!=e.status;var n=new Date(e.startTime).getHours(),i=new Date(e.startTime).getMinutes();t.start={hour:n<10?"0"+n:n,minute:i<10?"0"+i:i};var u=new Date(e.endTime).getHours(),a=new Date(e.endTime).getMinutes();t.end={hour:u<10?"0"+u:u,minute:a<10?"0"+a:a}}}))},setBusinessTime:function(){var e=this;this.$u.api.setBusinessTime({startTime:this.getFullTime(this.start),endTime:this.getFullTime(this.end),status:this.checked?1:0}).then((function(n){if(n){e.checked?t.showToast({title:"自动营业已开启",icon:"none"}):t.showToast({title:"自动营业已关闭",icon:"none"});var i=new Date(n.startTime).getHours(),u=new Date(n.startTime).getMinutes();e.start={hour:i<10?"0"+i:i,minute:u<10?"0"+u:u};var a=new Date(n.endTime).getHours(),s=new Date(n.endTime).getMinutes();e.end={hour:a<10?"0"+a:a,minute:s<10?"0"+s:s},t.setStorageSync("start",JSON.stringify(e.start)),t.setStorageSync("end",JSON.stringify(e.end)),setTimeout((function(){t.navigateBack()}),1e3)}else t.showToast({title:"修改失败，请重试"})}))}}};e.default=n}).call(this,n("543d")["default"])},"6e0b":function(t,e,n){"use strict";n.r(e);var i=n("10a5"),u=n("aa6a");for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);n("49af");var s,r=n("f0c5"),o=Object(r["a"])(u["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=o.exports},aa6a:function(t,e,n){"use strict";n.r(e);var i=n("5a6b"),u=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=u.a},f414:function(t,e,n){}},[["057d","common/runtime","common/vendor"]]]);