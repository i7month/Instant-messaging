(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3170366c"],{"26c0":function(e,t,n){},"2b37":function(e,t,n){"use strict";var r=n("26c0"),a=n.n(r);a.a},"455e":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"lineUp"},[e._m(0),r("div",{staticClass:"container"},[e._m(1),e._m(2),r("div",{staticClass:"text"},[e._v("正在排队，您前边还有 "+e._s(e.lineUp||0)+" 人")])]),r("div",{staticClass:"phone",on:{click:e.hangUp}},[r("img",{attrs:{src:n("c7cf"),alt:""}})])])},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"layer layer_one"},[n("div",{staticClass:"layer layer_two"},[n("div",{staticClass:"layer layer_three"})])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"title"},[r("img",{attrs:{src:n("5ea1"),alt:""}})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"bg"},[r("img",{attrs:{src:n("5607"),alt:""}})])}],s=n("a34a"),i=n.n(s),c=n("9550"),u=n("4ec3");function o(e,t,n,r,a,s,i){try{var c=e[s](i),u=c.value}catch(o){return void n(o)}c.done?t(u):Promise.resolve(u).then(r,a)}function l(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var s=e.apply(t,n);function i(e){o(s,r,a,i,c,"next",e)}function c(e){o(s,r,a,i,c,"throw",e)}i(void 0)})}}var p={name:"lineUp",data:function(){return{lineUp:0}},watch:{"$store.state.user.message":function(e){var t=e;t&&"2"==t.msgType&&t.channelID&&this.$router.push({name:"call",query:{name:this.$route.query.name,phone:this.$route.query.phone,channelID:t.channelID}})},"$store.state.user.uid":function(e){}},mounted:function(){Object(c["a"])(this.$md5(this.$route.query.phone).toUpperCase()),this.applyForVideoCall()},methods:{hangUp:function(){var e=l(i.a.mark(function e(){var t;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].hangUp({hangUp:this.$route.query.phone});case 2:if(t=e.sent,t.success){e.next=5;break}return e.abrupt("return",void 0);case 5:this.$router.push("/");case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),applyForVideoCall:function(){var e=l(i.a.mark(function e(){var t;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].applyForVideoCall({idNumber:this.$route.query.phone,serviceCategory:1,userName:this.$route.query.name});case 2:if(t=e.sent,t.success){e.next=6;break}return this.applyForVideoCall(),e.abrupt("return",void 0);case 6:this.lineUp=t.queueNum;case 7:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),toMessage:function(){Object(c["c"])()}}},h=p,f=(n("2b37"),n("2877")),v=Object(f["a"])(h,r,a,!1,null,"799663c7",null);t["default"]=v.exports},5607:function(e,t,n){e.exports=n.p+"img/bg.527d2a42.png"}}]);
//# sourceMappingURL=chunk-3170366c.be068b8b.js.map