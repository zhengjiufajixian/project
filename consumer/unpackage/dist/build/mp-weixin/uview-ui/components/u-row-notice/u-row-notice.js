(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-row-notice/u-row-notice"],{3583:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var i={uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"ac40"))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.show?t.__get_style([t.textStyle]):null);t.$mp.data=Object.assign({},{$root:{s0:n}})},u=[]},"3d69":function(t,e,n){"use strict";var i=n("a3f8"),o=n.n(i);o.a},5241:function(t,e,n){"use strict";n.r(e);var i=n("3583"),o=n("8415");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("3d69");var a,r=n("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"eaec689c",null,!1,i["a"],a);e["default"]=c.exports},8415:function(t,e,n){"use strict";n.r(e);var i=n("8c9e"),o=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=o.a},"8c9e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{list:{type:Array,default:function(){return[]}},type:{type:String,default:"warning"},volumeIcon:{type:Boolean,default:!0},moreIcon:{type:Boolean,default:!1},closeIcon:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!0},color:{type:String,default:""},bgColor:{type:String,default:""},show:{type:Boolean,default:!0},fontSize:{type:[Number,String],default:26},volumeSize:{type:[Number,String],default:34},speed:{type:[Number,String],default:160},playState:{type:String,default:"play"},padding:{type:[Number,String],default:"18rpx 24rpx"}},data:function(){return{textWidth:0,boxWidth:0,animationDuration:"10s",animationPlayState:"paused",showText:""}},watch:{list:{immediate:!0,handler:function(t){var e=this;this.showText=t.join("，"),this.$nextTick((function(){e.initSize()}))}},playState:function(t){this.animationPlayState="play"==t?"running":"paused"},speed:function(t){this.initSize()}},computed:{computeColor:function(){return this.color?this.color:"none"==this.type?"#606266":this.type},textStyle:function(){var t={};return this.color?t.color=this.color:"none"==this.type&&(t.color="#606266"),t.fontSize=this.fontSize+"rpx",t},computeBgColor:function(){return this.bgColor?this.bgColor:"none"==this.type?"transparent":void 0}},mounted:function(){var t=this;this.$nextTick((function(){t.initSize()}))},methods:{initSize:function(){var e=this,n=[],i=new Promise((function(n,i){t.createSelectorQuery().in(e).select("#u-notice-content").boundingClientRect().exec((function(t){e.textWidth=t[0].width,n()}))}));n.push(i),Promise.all(n).then((function(){e.animationDuration="".concat(e.textWidth/t.upx2px(e.speed),"s"),e.animationPlayState="paused",setTimeout((function(){"play"==e.playState&&e.autoplay&&(e.animationPlayState="running")}),10)}))},click:function(t){this.$emit("click")},close:function(){this.$emit("close")},getMore:function(){this.$emit("getMore")}}};e.default=n}).call(this,n("543d")["default"])},a3f8:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-row-notice/u-row-notice-create-component',
    {
        'uview-ui/components/u-row-notice/u-row-notice-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5241"))
        })
    },
    [['uview-ui/components/u-row-notice/u-row-notice-create-component']]
]);
