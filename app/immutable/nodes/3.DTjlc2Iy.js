import{s,e as t,a as e,c as a,b as o,m as r,f as n,g as c,h as l,i,j as m,o as p,p as u,n as d,q as h,u as f,v as g}from"../chunks/scheduler.CzzqiJfr.js";import{S as v,i as b,c as y,b as I,m as k,t as P,a as S,d as w}from"../chunks/index.BmoaPBre.js";import{I as x,i as D,r as $,a as E,c as V,g as j,b as A}from"../chunks/numerics.CXxEazsC.js";const C=Object.freeze(Object.defineProperty({__proto__:null,load:async function(){return{imageUrls:["https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png","https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png","https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png","https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png","https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"]}}},Symbol.toStringTag,{value:"Module"}));function M(s){let h,f,g,v,b,D,$,E,V,j,A,C,M,T,B,O,_,H,U='<h1 class="cTitleStyle md:!text-3xl">poly-decomp</h1>',F="Create Body";return C=new x({props:{icon:"mdi:pokeball",class:"cIconStyle"}}),{c(){h=t("div"),f=t("div"),f.innerHTML=U,g=e(),v=t("div"),b=t("div"),D=t("div"),$=t("span"),$.textContent=F,E=e(),V=t("form"),j=t("button"),A=t("div"),y(C.$$.fragment),M=e(),T=t("div"),B=t("div"),this.h()},l(s){h=a(s,"DIV",{class:!0});var t=o(h);f=a(t,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-1p4vgbc"!==r(f)&&(f.innerHTML=U),g=n(t),v=a(t,"DIV",{class:!0});var e=o(v);b=a(e,"DIV",{class:!0});var l=o(b);D=a(l,"DIV",{class:!0});var i=o(D);$=a(i,"SPAN",{class:!0,"data-svelte-h":!0}),"svelte-2ivb7m"!==r($)&&($.textContent=F),E=n(i),V=a(i,"FORM",{});var m=o(V);j=a(m,"BUTTON",{type:!0,class:!0});var p=o(j);A=a(p,"DIV",{class:!0});var u=o(A);I(C.$$.fragment,u),u.forEach(c),p.forEach(c),m.forEach(c),i.forEach(c),l.forEach(c),M=n(e),T=a(e,"DIV",{class:!0});var d=o(T);B=a(d,"DIV",{class:!0}),o(B).forEach(c),d.forEach(c),e.forEach(c),t.forEach(c),this.h()},h(){l(f,"class","cTitlePartStyle md:!mb-2"),l($,"class","text-lg"),l(A,"class","cIconDivStyle"),l(j,"type","submit"),l(j,"class","cIconButtonStyle"),l(D,"class","cInputFormAndMessagePartStyle"),l(b,"class","flex items-center justify-center"),l(B,"class","w-80 h-80 bg-gray-300 border border-black"),l(T,"class","m-4"),l(v,"class","cContentPartStyle !mt-1 !ml-4 !mr-4"),l(h,"class","cRouteBodyStyle")},m(t,e){i(t,h,e),m(h,f),m(h,g),m(h,v),m(v,b),m(b,D),m(D,$),m(D,E),m(D,V),m(V,j),m(j,A),k(C,A,null),m(v,M),m(v,T),m(T,B),s[3](B),O=!0,_||(H=p(V,"submit",u(s[1])),_=!0)},p:d,i(s){O||(P(C.$$.fragment,s),O=!0)},o(s){S(C.$$.fragment,s),O=!1},d(t){t&&c(h),w(C),s[3](null),_=!1,H()}}}function T(s,t,e){let{data:a}=t;const o=a.imageUrls;let r,n,c,l;return h((()=>{n=D(r),"undefined"!=typeof decomp&&Matter.Common.setDecomp(decomp),$(n),c=E(n.engine.world,n.mouseConstraint,r,{isHolding:false})})),f((()=>{V(n),c&&c()})),s.$$set=s=>{"data"in s&&e(2,a=s.data)},[r,async function(){l=j(o.length);const s=j(100),t=await A(o[l],1,{x:50+2*s,y:20});Matter.Composite.add(n.engine.world,[t])},a,function(s){g[s?"unshift":"push"]((()=>{r=s,e(0,r)}))}]}class B extends v{constructor(t){super(),b(this,t,T,M,s,{data:2})}}export{B as component,C as universal};
