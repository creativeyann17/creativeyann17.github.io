(this["webpackJsonpcreativeyann17.github.io"]=this["webpackJsonpcreativeyann17.github.io"]||[]).push([[1],{11:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"d",(function(){return c})),n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i})),n.d(t,"e",(function(){return s}));var r=!1,c={HOME:"/",ARTICLE:"/article",SEARCH:"/search",EXTERNALS:{GITHUB:"https://github.com/creativeyann17",GITHUB_PAGE:"https://github.com/creativeyann17/creativeyann17.github.io",GITHUB_PRIVACY:"https://docs.github.com/en/github/site-policy/github-privacy-statement",GITHUB_TOS:"https://docs.github.com/en/github/site-policy/github-terms-of-service",LINKEDIN:"https://www.linkedin.com/in/yann-marcou-21280267/"}},a="/articles.json",i="/articles/",s="/thumbnails/"},130:function(e,t,n){},131:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),a=n(22),i=n.n(a),s=n(48),o=n(47),u=n(24),l=n.n(u),j=n(18),b=n(27),d=n(70),h=n(19),O="ARTICLES_SERVICE",f=O+"_FETCH_REQUEST",p=O+"_FETCH_SUCCESS",x=O+"_FETCH_FAILURE",v={isFetching:!1,articles:[],error:null};var g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f:return Object(h.a)(Object(h.a)({},e),{},{isFetching:!0,error:null});case p:return Object(h.a)(Object(h.a)({},e),{},{isFetching:!1,error:null,articles:t.articles});case x:return Object(h.a)(Object(h.a)({},e),{},{isFetching:!1,error:t.error,articles:[]});default:return e}},E=n(62),m=n.n(E),S=function(e){return{type:p,articles:e}},T=n(11),y=l.a.mark(R),w=l.a.mark(C);function R(e){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.a.get(T.b).then((function(e){return e.data}));case 3:return t=e.sent,e.next=6,Object(b.b)(S(t));case 6:e.next=12;break;case 8:return e.prev=8,e.t0=e.catch(0),e.next=12,Object(b.b)((n=e.t0.message,{type:x,error:n}));case 12:case"end":return e.stop()}var n}),y,null,[[0,8]])}function C(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.c)(f,R);case 2:case"end":return e.stop()}}),w)}var I=n(5),_=function(){return Object(I.jsx)("div",{})},k=n(31),A=n(10),H=n(35),N=n(137),L=n(136),F=n(133),U=n(138),P=n(134),B=n(66),G=n(63),D=n.n(G),M=n(68),X=function(e){var t=Object(A.g)(),n=Object(A.f)(),c=Object(r.useState)({searchFilter:null}),a=Object(H.a)(c,2),i=a[0],s=a[1],o=function(e){return e===t.pathname},u=function(e,t){return Object(I.jsx)(N.a.Link,{href:e,active:o(e),onClick:function(t){return l(t,e)},children:t})},l=function(e,t){e.preventDefault(),e.stopPropagation(),n.push(t)};return Object(I.jsx)(L.a,{bg:"primary",variant:"dark",expand:"lg",sticky:"top",children:Object(I.jsxs)(F.a,{children:[Object(I.jsxs)(L.a.Brand,{href:"/",children:[Object(I.jsx)("img",{alt:"",src:"/favicon.ico",height:"32",className:"d-inline-block align-top"})," "]}),Object(I.jsx)(L.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(I.jsxs)(L.a.Collapse,{id:"basic-navbar-nav",children:[Object(I.jsxs)(N.a,{className:"mr-auto",children:[u(T.d.HOME,"Home"),u(T.d.SEARCH+"/react","React"),u(T.d.SEARCH+"/spring-boot","Spring-boot"),u(T.d.SEARCH+"/micronaut","Micronaut")]}),Object(I.jsx)(U.a,{inline:!0,onSubmit:function(e){e.preventDefault(),e.stopPropagation(),i.searchFilter&&n.push("".concat(T.d.SEARCH,"/").concat(i.searchFilter))},children:Object(I.jsxs)(P.a,{children:[Object(I.jsx)(P.a.Prepend,{children:Object(I.jsx)(P.a.Text,{children:Object(I.jsx)(M.a,{})})}),Object(I.jsx)(B.a,{placeholder:"Search",onChange:function(e){return s(Object(h.a)(Object(h.a)({},i),{},{searchFilter:D()(e.target.value)}))}})]})})]})]})})},Y=n(135),V=n(67),z=n(28),J=function(e){var t=(new Date).getFullYear();return Object(I.jsx)("div",{className:"footer",children:Object(I.jsx)(F.a,{children:Object(I.jsxs)(Y.a,{children:[Object(I.jsx)(V.a,{sm:6,children:Object(I.jsx)(Y.a,{children:Object(I.jsx)("img",{alt:"creativeyann17-logo",src:"/logo.png",height:"64"})})}),Object(I.jsxs)(V.a,{sm:6,children:[Object(I.jsxs)(Y.a,{className:"right",children:[Object(z.c)(T.d.EXTERNALS.GITHUB_TOS,"Terms of use"),Object(z.c)(T.d.EXTERNALS.GITHUB_PRIVACY,"Privacy policy"),Object(z.b)(T.d.EXTERNALS.GITHUB,"/github128.png"),Object(z.b)(T.d.EXTERNALS.LINKEDIN,"/linkedin128.png")]}),Object(I.jsx)(Y.a,{className:"right copyright",children:Object(I.jsxs)("span",{children:["\xa9 ",t," Yann MARCOU"]})})]})]})})})},K=n(69),W=function(e){var t=Object(r.useState)(!1),n=Object(H.a)(t,2),c=n[0],a=n[1];return Object(r.useEffect)((function(){var e=function(){var e=window.scrollY;e>100&&!c&&a(!0),e<100&&c&&a(!1)};return window.addEventListener("scroll",e,{passive:!0}),function(){return window.removeEventListener("scroll",e)}}),[c]),c?Object(I.jsx)("div",{className:"back-to-top",children:Object(I.jsx)("a",{href:"#top",children:Object(I.jsx)(K.a,{})})}):null},Q=c.a.lazy((function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,667))})),q=c.a.lazy((function(){return Promise.all([n.e(0),n.e(3),n.e(7)]).then(n.bind(null,666))})),Z=c.a.lazy((function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,664))})),$=function(){var e=function(e,t){return"".concat(e,"/:").concat(t)};return Object(I.jsxs)("div",{children:[Object(I.jsxs)(k.a,{children:[Object(I.jsx)(X,{}),Object(I.jsxs)(A.c,{children:[Object(I.jsx)(A.a,{exact:!0,path:T.d.HOME,children:Object(I.jsx)(Q,{})}),Object(I.jsx)(A.a,{path:e(T.d.ARTICLE,"id"),children:Object(I.jsx)(q,{})}),Object(I.jsx)(A.a,{path:e(T.d.SEARCH,"filter"),children:Object(I.jsx)(Z,{})})]})]}),Object(I.jsx)(W,{}),Object(I.jsx)(J,{})]})};var ee=function(){var e=function(){var e=l.a.mark(r),t=Object(j.c)({articlesServiceReducer:g});function r(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.a)([C()]);case 2:case"end":return e.stop()}}),e)}var c=Object(d.a)(),a=[c],i=j.d;if(T.c){var s=n(111).logger;a=[].concat(Object(o.a)(a),[s]),i=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||j.d}var u=Object(j.e)(t,i(j.a.apply(void 0,Object(o.a)(a))));return c.run(r),u}();return e.dispatch({type:f}),Object(I.jsx)(s.a,{store:e,children:Object(I.jsx)(r.Suspense,{fallback:Object(I.jsx)(_,{}),children:Object(I.jsx)($,{})})})};n(130);i.a.render(Object(I.jsx)(c.a.StrictMode,{children:Object(I.jsx)(ee,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},28:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return s}));var r=n(11),c=n(5),a=function(e,t){return Object(c.jsx)("a",{target:"_blank",rel:"noreferrer",href:e,children:t})},i=function(e,t){return Object(c.jsx)("a",{target:"_blank",rel:"noreferrer",href:e,children:Object(c.jsx)("img",{src:t,alt:"external-links-to-".concat(e),width:32})})},s=function(e){return"".concat(window.location.origin.toString()).concat(r.d.ARTICLE,"/").concat(e.id)}}},[[131,2,4]]]);
//# sourceMappingURL=main.925ed9c7.chunk.js.map