(this["webpackJsonpcreativeyann17.github.io"]=this["webpackJsonpcreativeyann17.github.io"]||[]).push([[5],{156:function(e,t,a){var n=a(82),r=a(157),c=a(183),i=a(76);e.exports=function(e,t){return(i(e)?n:c)(e,r(t,3))}},159:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(e){return e.articlesServiceReducer.articles}},160:function(e,t,a){"use strict";a(1);var n=a(188),r=a(189),c=a(30),i=a(5);t.a=function(e){var t=e.article;return Object(i.jsxs)("div",{className:"article-details",children:[Object(i.jsxs)("span",{className:"attribute",children:[Object(i.jsx)(n.b,{})," ",t.date]}),Object(i.jsxs)("span",{className:"attribute",children:[Object(i.jsx)(r.a,{}),Object(c.c)(t.repository,"sources")]}),Object(i.jsxs)("span",{className:"attribute",children:[Object(i.jsx)(n.a,{}),"".concat(t.time," min")]})]})}},168:function(e,t,a){var n=a(184),r=a(187)(n);e.exports=r},183:function(e,t,a){var n=a(168),r=a(151);e.exports=function(e,t){var a=-1,c=r(e)?Array(e.length):[];return n(e,(function(e,n,r){c[++a]=t(e,n,r)})),c}},184:function(e,t,a){var n=a(185),r=a(154);e.exports=function(e,t){return e&&n(e,t,r)}},185:function(e,t,a){var n=a(186)();e.exports=n},186:function(e,t){e.exports=function(e){return function(t,a,n){for(var r=-1,c=Object(t),i=n(t),s=i.length;s--;){var o=i[e?s:++r];if(!1===a(c[o],o,c))break}return t}}},187:function(e,t,a){var n=a(151);e.exports=function(e,t){return function(a,r){if(null==a)return a;if(!n(a))return e(a,r);for(var c=a.length,i=t?c:-1,s=Object(a);(t?i--:++i<c)&&!1!==r(s[i],i,s););return a}}},190:function(e,t,a){var n=a(191);e.exports=function(e){var t=n(e),a=t%1;return t===t?a?t-a:t:0}},191:function(e,t,a){var n=a(192),r=1/0;e.exports=function(e){return e?(e=n(e))===r||e===-1/0?17976931348623157e292*(e<0?-1:1):e===e?e:0:0===e?e:0}},192:function(e,t,a){var n=a(83),r=a(158),c=a(81),i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,o=/^0o[0-7]+$/i,l=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(c(e))return NaN;if(r(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=r(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=n(e);var a=s.test(e);return a||o.test(e)?l(e.slice(2),a?2:8):i.test(e)?NaN:+e}},209:function(e,t,a){"use strict";var n=a(1),r=a.n(n),c=a(3),i=a(4),s=a(7),o=a.n(s),l=a(8),u=r.a.forwardRef((function(e,t){var a=e.bsPrefix,n=e.variant,s=e.pill,u=e.className,f=e.as,b=void 0===f?"span":f,d=Object(i.a)(e,["bsPrefix","variant","pill","className","as"]),j=Object(l.a)(a,"badge");return r.a.createElement(b,Object(c.a)({ref:t},d,{className:o()(u,j,s&&j+"-pill",n&&j+"-"+n)}))}));u.displayName="Badge",u.defaultProps={pill:!1};var f=u,b=a(21),d=a(169),j=a(52),v=r.a.forwardRef((function(e,t){var a=e.bsPrefix,n=e.className,s=e.variant,u=e.as,f=void 0===u?"img":u,b=Object(i.a)(e,["bsPrefix","className","variant","as"]),d=Object(l.a)(a,"card-img");return r.a.createElement(f,Object(c.a)({ref:t,className:o()(s?d+"-"+s:d,n)},b))}));v.displayName="CardImg",v.defaultProps={variant:null};var m=v,p=Object(d.a)("h5"),O=Object(d.a)("h6"),x=Object(b.a)("card-body"),h=Object(b.a)("card-title",{Component:p}),N=Object(b.a)("card-subtitle",{Component:O}),g=Object(b.a)("card-link",{Component:"a"}),y=Object(b.a)("card-text",{Component:"p"}),C=Object(b.a)("card-header"),E=Object(b.a)("card-footer"),P=Object(b.a)("card-img-overlay"),k=r.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,u=e.bg,f=e.text,b=e.border,d=e.body,v=e.children,m=e.as,p=void 0===m?"div":m,O=Object(i.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),h=Object(l.a)(a,"card"),N=Object(n.useMemo)((function(){return{cardHeaderBsPrefix:h+"-header"}}),[h]);return r.a.createElement(j.a.Provider,{value:N},r.a.createElement(p,Object(c.a)({ref:t},O,{className:o()(s,h,u&&"bg-"+u,f&&"text-"+f,b&&"border-"+b)}),d?r.a.createElement(x,null,v):v))}));k.displayName="Card",k.defaultProps={body:!1},k.Img=m,k.Title=h,k.Subtitle=N,k.Body=x,k.Link=g,k.Text=y,k.Header=C,k.Footer=E,k.ImgOverlay=P;var w=k,R=a(156),A=a.n(R),L=a(10),I=a(11),T=a(160),B=a(5);t.a=function(e){var t=e.article,a=Object(L.f)(),n=function(e){a.push("".concat(I.d.SEARCH,"/").concat(e))};return Object(B.jsxs)(w,{children:[Object(B.jsx)(w.Img,{variant:"top",src:"".concat(I.e).concat(t.thumbnail),onClick:function(e){return n=t.id,void a.push("".concat(I.d.ARTICLE,"/").concat(n));var n}}),Object(B.jsxs)(w.Body,{children:[Object(B.jsx)(T.a,{article:t}),Object(B.jsx)(w.Text,{className:"with-margin-top",children:t.description}),Object(B.jsx)(w.Text,{children:A()(t.tags,(function(e){return Object(B.jsx)(f,{variant:"light",onClick:function(){return n(e)},children:e},e)}))})]})]})}},660:function(e,t,a){var n=a(51),r=a(151),c=a(661),i=a(190),s=a(662),o=Math.max;e.exports=function(e,t,a,l){e=r(e)?e:s(e),a=a&&!l?i(a):0;var u=e.length;return a<0&&(a=o(u+a,0)),c(e)?a<=u&&e.indexOf(t,a)>-1:!!u&&n(e,t,a)>-1}},661:function(e,t,a){var n=a(79),r=a(76),c=a(80);e.exports=function(e){return"string"==typeof e||!r(e)&&c(e)&&"[object String]"==n(e)}},662:function(e,t,a){var n=a(663),r=a(154);e.exports=function(e){return null==e?[]:n(e,r(e))}},663:function(e,t,a){var n=a(82);e.exports=function(e,t){return n(t,(function(t){return e[t]}))}},664:function(e,t,a){var n=a(216),r=a(665),c=a(157),i=a(76);e.exports=function(e,t){return(i(e)?n:r)(e,c(t,3))}},665:function(e,t,a){var n=a(168);e.exports=function(e,t){var a=[];return n(e,(function(e,n,r){t(e,n,r)&&a.push(e)})),a}},666:function(e,t,a){"use strict";var n,r=a(3),c=a(4),i=a(7),s=a.n(i),o=a(1),l=a.n(o),u=a(36),f=a(37),b=a(8),d=a(28),j=a(55),v=a(54),m=((n={})[d.b]="show",n[d.a]="show",n),p=l.a.forwardRef((function(e,t){var a=e.className,n=e.children,i=Object(c.a)(e,["className","children"]),u=Object(o.useCallback)((function(e){Object(v.a)(e),i.onEnter&&i.onEnter(e)}),[i]);return l.a.createElement(d.e,Object(r.a)({ref:t,addEndListener:j.a},i,{onEnter:u}),(function(e,t){return l.a.cloneElement(n,Object(r.a)({},t,{className:s()("fade",a,n.props.className,m[e])}))}))}));p.defaultProps={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1},p.displayName="Fade";var O=p,x=a(17),h=a.n(x),N={label:h.a.string.isRequired,onClick:h.a.func},g=l.a.forwardRef((function(e,t){var a=e.label,n=e.onClick,i=e.className,o=Object(c.a)(e,["label","onClick","className"]);return l.a.createElement("button",Object(r.a)({ref:t,type:"button",className:s()("close",i),onClick:n},o),l.a.createElement("span",{"aria-hidden":"true"},"\xd7"),l.a.createElement("span",{className:"sr-only"},a))}));g.displayName="CloseButton",g.propTypes=N,g.defaultProps={label:"Close"};var y=g,C=a(169),E=a(21),P=a(53),k=Object(C.a)("h4");k.displayName="DivStyledAsH4";var w=Object(E.a)("alert-heading",{Component:k}),R=Object(E.a)("alert-link",{Component:P.a}),A={show:!0,transition:O,closeLabel:"Close alert"},L=l.a.forwardRef((function(e,t){var a=Object(u.a)(e,{show:"onClose"}),n=a.bsPrefix,i=a.show,o=a.closeLabel,d=a.className,j=a.children,v=a.variant,m=a.onClose,p=a.dismissible,x=a.transition,h=Object(c.a)(a,["bsPrefix","show","closeLabel","className","children","variant","onClose","dismissible","transition"]),N=Object(b.a)(n,"alert"),g=Object(f.a)((function(e){m&&m(!1,e)})),C=!0===x?O:x,E=l.a.createElement("div",Object(r.a)({role:"alert"},C?void 0:h,{ref:t,className:s()(d,N,v&&N+"-"+v,p&&N+"-dismissible")}),p&&l.a.createElement(y,{onClick:g,label:o}),j);return C?l.a.createElement(C,Object(r.a)({unmountOnExit:!0},h,{ref:void 0,in:i}),E):i?E:null}));L.displayName="Alert",L.defaultProps=A,L.Link=R,L.Heading=w;t.a=L},671:function(e,t,a){"use strict";a.r(t);a(1);var n=a(138),r=a(666),c=a(140),i=a(10),s=a(50),o=a(660),l=a.n(o),u=a(664),f=a.n(u),b=a(156),d=a.n(b),j=a(159),v=a(209),m=a(5);t.default=Object(s.b)((function(e){return{articles:Object(j.a)(e)}}))((function(e){var t=e.articles,a=(e.setArticlesFilter,Object(i.h)().filter),s=f()(t,(function(e){return l()(e.tags,a)}));return Object(m.jsxs)(n.a,{className:"page",children:[a&&Object(m.jsxs)(r.a,{variant:"secondary",children:[Object(m.jsx)("b",{children:"Actual search:"})," ",a," ",Object(m.jsx)("b",{children:"result(s): "})," ",s.length]}),Object(m.jsx)(c.a,{children:d()(s,(function(e){return Object(m.jsx)(v.a,{article:e},e.id)}))})]})}))}}]);
//# sourceMappingURL=5.b7380d5f.chunk.js.map