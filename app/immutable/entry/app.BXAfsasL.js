const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.BOSbqfMJ.js","../chunks/scheduler.CzzqiJfr.js","../chunks/index.BmoaPBre.js","../chunks/entry.BYWytXqE.js","../chunks/spread.BgszbExe.js","../chunks/navigation.client.BQBsfDqO.js","../assets/0.C0yPa1G0.css","../nodes/1.DF5_2aCc.js","../nodes/2.CaSH5_cT.js","../nodes/3.DPyn_uPh.js","../chunks/numerics.Dq0art_w.js","../nodes/4.M8YixWC7.js"])))=>i.map(i=>d[i]);
import{s as t,a as e,y as n,f as r,i as o,g as a,z as s,q as i,e as l,c,b as u,h as m,A as d,t as f,d as p,k as $,v as h,B as g,C as _}from"../chunks/scheduler.CzzqiJfr.js";import{S as v,i as E,a as y,e as w,t as b,g as P,c as A,b as L,m as j,d as x}from"../chunks/index.BmoaPBre.js";const k={},D=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){const t=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),a=(null==o?void 0:o.nonce)||(null==o?void 0:o.getAttribute("nonce"));r=Promise.all(e.map((e=>{if(e=function(t,e){return new URL(t,e).href}(e,n),e in k)return;k[e]=!0;const r=e.endsWith(".css"),o=r?'[rel="stylesheet"]':"";if(!!n)for(let n=t.length-1;n>=0;n--){const o=t[n];if(o.href===e&&(!r||"stylesheet"===o.rel))return}else if(document.querySelector(`link[href="${e}"]${o}`))return;const s=document.createElement("link");return s.rel=r?"stylesheet":"modulepreload",r||(s.as="script",s.crossOrigin=""),s.href=e,a&&s.setAttribute("nonce",a),document.head.appendChild(s),r?new Promise(((t,n)=>{s.addEventListener("load",t),s.addEventListener("error",(()=>n(new Error(`Unable to preload CSS for ${e}`))))})):void 0})))}return r.then((()=>t())).catch((t=>{const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}))},I={};function N(t){let e,r,s;var i=t[1][0];function l(t,e){return{props:{data:t[3],form:t[2]}}}return i&&(e=g(i,l(t)),t[12](e)),{c(){e&&A(e.$$.fragment),r=n()},l(t){e&&L(e.$$.fragment,t),r=n()},m(t,n){e&&j(e,t,n),o(t,r,n),s=!0},p(t,n){if(2&n&&i!==(i=t[1][0])){if(e){P();const t=e;y(t.$$.fragment,1,0,(()=>{x(t,1)})),w()}i?(e=g(i,l(t)),t[12](e),A(e.$$.fragment),b(e.$$.fragment,1),j(e,r.parentNode,r)):e=null}else if(i){const r={};8&n&&(r.data=t[3]),4&n&&(r.form=t[2]),e.$set(r)}},i(t){s||(e&&b(e.$$.fragment,t),s=!0)},o(t){e&&y(e.$$.fragment,t),s=!1},d(n){n&&a(r),t[12](null),e&&x(e,n)}}}function O(t){let e,r,s;var i=t[1][0];function l(t,e){return{props:{data:t[3],$$slots:{default:[R]},$$scope:{ctx:t}}}}return i&&(e=g(i,l(t)),t[11](e)),{c(){e&&A(e.$$.fragment),r=n()},l(t){e&&L(e.$$.fragment,t),r=n()},m(t,n){e&&j(e,t,n),o(t,r,n),s=!0},p(t,n){if(2&n&&i!==(i=t[1][0])){if(e){P();const t=e;y(t.$$.fragment,1,0,(()=>{x(t,1)})),w()}i?(e=g(i,l(t)),t[11](e),A(e.$$.fragment),b(e.$$.fragment,1),j(e,r.parentNode,r)):e=null}else if(i){const r={};8&n&&(r.data=t[3]),8215&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)}},i(t){s||(e&&b(e.$$.fragment,t),s=!0)},o(t){e&&y(e.$$.fragment,t),s=!1},d(n){n&&a(r),t[11](null),e&&x(e,n)}}}function R(t){let e,r,s;var i=t[1][1];function l(t,e){return{props:{data:t[4],form:t[2]}}}return i&&(e=g(i,l(t)),t[10](e)),{c(){e&&A(e.$$.fragment),r=n()},l(t){e&&L(e.$$.fragment,t),r=n()},m(t,n){e&&j(e,t,n),o(t,r,n),s=!0},p(t,n){if(2&n&&i!==(i=t[1][1])){if(e){P();const t=e;y(t.$$.fragment,1,0,(()=>{x(t,1)})),w()}i?(e=g(i,l(t)),t[10](e),A(e.$$.fragment),b(e.$$.fragment,1),j(e,r.parentNode,r)):e=null}else if(i){const r={};16&n&&(r.data=t[4]),4&n&&(r.form=t[2]),e.$set(r)}},i(t){s||(e&&b(e.$$.fragment,t),s=!0)},o(t){e&&y(e.$$.fragment,t),s=!1},d(n){n&&a(r),t[10](null),e&&x(e,n)}}}function T(t){let e,n=t[6]&&V(t);return{c(){e=l("div"),n&&n.c(),this.h()},l(t){e=c(t,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var r=u(e);n&&n.l(r),r.forEach(a),this.h()},h(){m(e,"id","svelte-announcer"),m(e,"aria-live","assertive"),m(e,"aria-atomic","true"),d(e,"position","absolute"),d(e,"left","0"),d(e,"top","0"),d(e,"clip","rect(0 0 0 0)"),d(e,"clip-path","inset(50%)"),d(e,"overflow","hidden"),d(e,"white-space","nowrap"),d(e,"width","1px"),d(e,"height","1px")},m(t,r){o(t,e,r),n&&n.m(e,null)},p(t,r){t[6]?n?n.p(t,r):(n=V(t),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(t){t&&a(e),n&&n.d()}}}function V(t){let e;return{c(){e=f(t[7])},l(n){e=p(n,t[7])},m(t,n){o(t,e,n)},p(t,n){128&n&&$(e,t[7])},d(t){t&&a(e)}}}function S(t){let s,i,l,c,u;const m=[O,N],d=[];function f(t,e){return t[1][1]?0:1}s=f(t),i=d[s]=m[s](t);let p=t[5]&&T(t);return{c(){i.c(),l=e(),p&&p.c(),c=n()},l(t){i.l(t),l=r(t),p&&p.l(t),c=n()},m(t,e){d[s].m(t,e),o(t,l,e),p&&p.m(t,e),o(t,c,e),u=!0},p(t,[e]){let n=s;s=f(t),s===n?d[s].p(t,e):(P(),y(d[n],1,1,(()=>{d[n]=null})),w(),i=d[s],i?i.p(t,e):(i=d[s]=m[s](t),i.c()),b(i,1),i.m(l.parentNode,l)),t[5]?p?p.p(t,e):(p=T(t),p.c(),p.m(c.parentNode,c)):p&&(p.d(1),p=null)},i(t){u||(b(i),u=!0)},o(t){y(i),u=!1},d(t){t&&(a(l),a(c)),d[s].d(t),p&&p.d(t)}}}function q(t,e,n){let{stores:r}=e,{page:o}=e,{constructors:a}=e,{components:l=[]}=e,{form:c}=e,{data_0:u=null}=e,{data_1:m=null}=e;s(r.page.notify);let d=!1,f=!1,p=null;return i((()=>{const t=r.page.subscribe((()=>{d&&(n(6,f=!0),_().then((()=>{n(7,p=document.title||"untitled page")})))}));return n(5,d=!0),t})),t.$$set=t=>{"stores"in t&&n(8,r=t.stores),"page"in t&&n(9,o=t.page),"constructors"in t&&n(1,a=t.constructors),"components"in t&&n(0,l=t.components),"form"in t&&n(2,c=t.form),"data_0"in t&&n(3,u=t.data_0),"data_1"in t&&n(4,m=t.data_1)},t.$$.update=()=>{768&t.$$.dirty&&r.page.set(o)},[l,a,c,u,m,d,f,p,r,o,function(t){h[t?"unshift":"push"]((()=>{l[1]=t,n(0,l)}))},function(t){h[t?"unshift":"push"]((()=>{l[0]=t,n(0,l)}))},function(t){h[t?"unshift":"push"]((()=>{l[0]=t,n(0,l)}))}]}class C extends v{constructor(e){super(),E(this,e,q,S,t,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const B=[()=>D((()=>import("../nodes/0.BOSbqfMJ.js")),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url),()=>D((()=>import("../nodes/1.DF5_2aCc.js")),__vite__mapDeps([7,1,2,3]),import.meta.url),()=>D((()=>import("../nodes/2.CaSH5_cT.js")),__vite__mapDeps([8,5,2,1,3]),import.meta.url),()=>D((()=>import("../nodes/3.DPyn_uPh.js")),__vite__mapDeps([9,1,2,10,4]),import.meta.url),()=>D((()=>import("../nodes/4.M8YixWC7.js")),__vite__mapDeps([11,1,2,10,4]),import.meta.url)],U=[],z={"/(root)":[2],"/poly-decomp":[3],"/simple":[4]},W={handleError:({error:t})=>{console.error(t)},reroute:()=>{}};export{z as dictionary,W as hooks,I as matchers,B as nodes,C as root,U as server_loads};
