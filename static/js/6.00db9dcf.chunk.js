(this["webpackJsonpcreativeyann17.github.io"]=this["webpackJsonpcreativeyann17.github.io"]||[]).push([[6],{156:function(e,t,a){var r=a(82),c=a(157),n=a(183),i=a(76);e.exports=function(e,t){return(i(e)?r:n)(e,c(t,3))}},159:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r=function(e){return e.articlesServiceReducer.articles}},160:function(e,t,a){"use strict";a(1);var r=a(188),c=a(189),n=a(30),i=a(5);t.a=function(e){var t=e.article;return Object(i.jsxs)("div",{className:"article-details",children:[Object(i.jsxs)("span",{className:"attribute",children:[Object(i.jsx)(r.b,{})," ",t.date]}),Object(i.jsxs)("span",{className:"attribute",children:[Object(i.jsx)(c.a,{}),Object(n.c)(t.repository,"sources")]}),Object(i.jsxs)("span",{className:"attribute",children:[Object(i.jsx)(r.a,{}),"".concat(t.time," min")]})]})}},168:function(e,t,a){var r=a(184),c=a(187)(r);e.exports=c},183:function(e,t,a){var r=a(168),c=a(151);e.exports=function(e,t){var a=-1,n=c(e)?Array(e.length):[];return r(e,(function(e,r,c){n[++a]=t(e,r,c)})),n}},184:function(e,t,a){var r=a(185),c=a(154);e.exports=function(e,t){return e&&r(e,t,c)}},185:function(e,t,a){var r=a(186)();e.exports=r},186:function(e,t){e.exports=function(e){return function(t,a,r){for(var c=-1,n=Object(t),i=r(t),s=i.length;s--;){var o=i[e?s:++c];if(!1===a(n[o],o,n))break}return t}}},187:function(e,t,a){var r=a(151);e.exports=function(e,t){return function(a,c){if(null==a)return a;if(!r(a))return e(a,c);for(var n=a.length,i=t?n:-1,s=Object(a);(t?i--:++i<n)&&!1!==c(s[i],i,s););return a}}},209:function(e,t,a){"use strict";var r=a(1),c=a.n(r),n=a(3),i=a(4),s=a(7),o=a.n(s),l=a(8),b=c.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.variant,s=e.pill,b=e.className,u=e.as,d=void 0===u?"span":u,j=Object(i.a)(e,["bsPrefix","variant","pill","className","as"]),f=Object(l.a)(a,"badge");return c.a.createElement(d,Object(n.a)({ref:t},j,{className:o()(b,f,s&&f+"-pill",r&&f+"-"+r)}))}));b.displayName="Badge",b.defaultProps={pill:!1};var u=b,d=a(21),j=a(169),f=a(52),O=c.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,s=e.variant,b=e.as,u=void 0===b?"img":b,d=Object(i.a)(e,["bsPrefix","className","variant","as"]),j=Object(l.a)(a,"card-img");return c.a.createElement(u,Object(n.a)({ref:t,className:o()(s?j+"-"+s:j,r)},d))}));O.displayName="CardImg",O.defaultProps={variant:null};var m=O,v=Object(j.a)("h5"),p=Object(j.a)("h6"),h=Object(d.a)("card-body"),x=Object(d.a)("card-title",{Component:v}),g=Object(d.a)("card-subtitle",{Component:p}),N=Object(d.a)("card-link",{Component:"a"}),y=Object(d.a)("card-text",{Component:"p"}),P=Object(d.a)("card-header"),w=Object(d.a)("card-footer"),E=Object(d.a)("card-img-overlay"),k=c.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,b=e.bg,u=e.text,d=e.border,j=e.body,O=e.children,m=e.as,v=void 0===m?"div":m,p=Object(i.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),x=Object(l.a)(a,"card"),g=Object(r.useMemo)((function(){return{cardHeaderBsPrefix:x+"-header"}}),[x]);return c.a.createElement(f.a.Provider,{value:g},c.a.createElement(v,Object(n.a)({ref:t},p,{className:o()(s,x,b&&"bg-"+b,u&&"text-"+u,d&&"border-"+d)}),j?c.a.createElement(h,null,O):O))}));k.displayName="Card",k.defaultProps={body:!1},k.Img=m,k.Title=x,k.Subtitle=g,k.Body=h,k.Link=N,k.Text=y,k.Header=P,k.Footer=w,k.ImgOverlay=E;var C=k,I=a(156),R=a.n(I),T=a(10),A=a(11),H=a(160),L=a(5);t.a=function(e){var t=e.article,a=Object(T.f)(),r=function(e){a.push("".concat(A.d.SEARCH,"/").concat(e))};return Object(L.jsxs)(C,{children:[Object(L.jsx)(C.Img,{variant:"top",src:"".concat(A.e).concat(t.thumbnail),onClick:function(e){return r=t.id,void a.push("".concat(A.d.ARTICLE,"/").concat(r));var r}}),Object(L.jsxs)(C.Body,{children:[Object(L.jsx)(H.a,{article:t}),Object(L.jsx)(C.Text,{className:"with-margin-top",children:t.description}),Object(L.jsx)(C.Text,{children:R()(t.tags,(function(e){return Object(L.jsx)(u,{variant:"light",onClick:function(){return r(e)},children:e},e)}))})]})]})}},674:function(e,t,a){"use strict";a.r(t);var r=a(1),c=a.n(r),n=a(138),i=a(3),s=a(4),o=a(7),l=a.n(o),b=a(8),u=c.a.forwardRef((function(e,t){var a,r=e.as,n=void 0===r?"div":r,o=e.className,u=e.fluid,d=e.bsPrefix,j=Object(s.a)(e,["as","className","fluid","bsPrefix"]),f=((a={})[d=Object(b.a)(d,"jumbotron")]=!0,a[d+"-fluid"]=u,a);return c.a.createElement(n,Object(i.a)({ref:t},j,{className:l()(o,f)}))}));u.defaultProps={fluid:!1},u.displayName="Jumbotron";var d=u,j=a(140),f=a(156),O=a.n(f),m=a(50),v=a(159),p=a(209),h=a(11),x=a(30),g=a(5);t.default=Object(m.b)((function(e){return{articles:Object(v.a)(e)}}))((function(e){var t=e.articles;return Object(g.jsxs)(n.a,{className:"page",children:[Object(g.jsxs)(d,{children:[Object(g.jsx)("h1",{children:"Welcome"}),Object(g.jsxs)("p",{children:["This web-site acts as my blog / portfolio / showcase / poc ... somewhere ready to test an idea.",Object(g.jsx)("li",{children:"If you want to know more about the technicals you can click on the button below to be redirected to the GitHub repository."}),Object(g.jsxs)("li",{children:["If you want to contact me please use the Linkedin link + private message."," ",Object(g.jsx)("b",{children:"Have a nice day :)"})]})]}),Object(g.jsxs)("p",{children:[Object(x.b)(h.d.EXTERNALS.GITHUB_PAGE,"/github128.png"),Object(x.b)(h.d.EXTERNALS.LINKEDIN,"/linkedin128.png")]})]}),Object(g.jsx)(j.a,{children:O()(t,(function(e){return Object(g.jsx)(p.a,{article:e},e.id)}))})]})}))}}]);
//# sourceMappingURL=6.00db9dcf.chunk.js.map