!function(t){function e(e){for(var r,i,c=e[0],u=e[1],s=e[2],f=0,p=[];f<c.length;f++)i=c[f],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);for(l&&l(e);p.length;)p.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,c=1;c<n.length;c++){var u=n[c];0!==o[u]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={0:0},a=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var s=0;s<c.length;s++)e(c[s]);var l=u;a.push([122,1]),n()}({122:function(t,e,n){n(123),t.exports=n(314)},313:function(t,e,n){},314:function(t,e,n){"use strict";n.r(e);n(309);var r=n(60),o=n.n(r);n(312),n(313),n.p;var a=function(t,e){return Math.random()*(e-t)+t},i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0};return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))};function c(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){c(a,r,o,i,u,"next",t)}function u(t){c(a,r,o,i,u,"throw",t)}i(void 0)}))}}var s=function(){var t=u(regeneratorRuntime.mark((function t(e){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:return n=t.sent,r=new Error("".concat(e.status,": ").concat(n.error?n.error:"Something went wrong, result couln't be provided")),e.status>=400&&e.status<=599&&(r.originError=n),t.abrupt("return",Promise.reject(r));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),l=function(){var t=u(regeneratorRuntime.mark((function t(e){var n,r,o,a,i,c=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=c.length>1&&void 0!==c[1]?c[1]:"GET",r=c.length>2?c[2]:void 0,o="GET"===n?null:{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(r)},t.prev=3,t.next=6,fetch(e,o);case 6:if((a=t.sent).ok){t.next=9;break}return t.abrupt("return",s(a));case 9:return t.abrupt("return",a.json());case 12:throw t.prev=12,t.t0=t.catch(3),console.error(t.t0),(i=new Error).status="No internet connection",i;case 18:case"end":return t.stop()}}),t,null,[[3,12]])})));return function(e){return t.apply(this,arguments)}}(),f=function(){var t=u(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n="".concat("http://localhost:9090/").concat("scores/"),t.next=3,l(n,"POST",e);case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),p=function(){var t=u(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e="".concat("http://localhost:9090/").concat("scores/"),t.next=3,l(e);case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();function d(t){return function(t){if(Array.isArray(t))return g(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||b(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function v(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?y(Object(n),!0).forEach((function(e){h(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function m(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=t[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(t,e)||b(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(t,e){if(t){if("string"==typeof t)return g(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(t,e):void 0}}function g(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}!function(t){var e,n,r,c,u,s,l,y,h,b=[15,50,100],g=[{points:3,scaleRatio:4},{points:2,scaleRatio:2},{points:1,scaleRatio:1}],w=t.document,x=t.window,O=!1,j=60,E=0,P=[320,240],S=[];function _(){O&&((j-=1)<0&&(j=0,h.text(E),y.modal("show"),y.on("hide.bs.modal",(function(){L(),l.textContent="Play",O=!1}))),r.textContent=j)}function C(){j=60,r.textContent=j}function k(){!function(){O&&(t=S.length)<4&&Array(4-t).fill(null).forEach((function(){S.push(function(){var t=[a(1e3/60,500),a(1e3,2e3)],e=t[0],n=t[1],r=a(0,100),o=b.findIndex((function(t){return r<=t})),i=g[o],c=i.points,u=i.scaleRatio,s={points:c,color:"rgb(".concat(a(0,255),", ").concat(a(0,255),", ").concat(a(0,255),")"),scaleRatio:u,pos:I(u),delay:e,lifeTime:n},l=w.createElement("span");l.classList.add("dice__points"),l.textContent="+".concat(s.points);var f=w.createElement("div");return f.classList.add("dice","dice_appear"),Object.assign(f.style,{backgroundColor:s.color,left:"".concat(s.pos.x,"px"),top:"".concat(s.pos.y,"px"),width:"".concat(50/u,"px"),height:"".concat(50/u,"px"),animationPlayState:"running"}),f.appendChild(l),v(v({},s),{},{element:f})}())}));var t;S=S.filter((function(t){var n=t.element;if(!O)return n.style.animationPlayState="paused",!0;if(n.style.animationPlayState="running",e.contains(n)){if(t.lifeTime-=1e3/60,t.lifeTime<=0)return n.classList.add("dice_disappear"),n.addEventListener("animationend",(function t(e){n.remove(n),e.currentTarget.removeEventListener(e.type,t)})),!1}else t.delay-=1e3/60,t.delay<=0&&e.appendChild(n);return!0}))}()}function L(){O=!0,C(),E=0,c.textContent=0,e.innerHTML="",S=[],l.textContent="Pause"}function T(t){n.find(".alert-content").text(t.message),n.show()}var I=function(t){var e,n,r=50/t,o=!0,c=20;do{var u=m(P,2),s=u[0],l=u[1],f=[a(0,s-r),a(0,l-r)];e=f[0],n=f[1],o=S.some((function(t){var r=t.pos;return i(r,{x:e,y:n})<75}))}while(o&&--c);return{x:e,y:n}};function R(t){if(!t.classList.contains("dice_disappear")){var e=S.find((function(e){return e.element===t})).points;E+=e,c.textContent=E,t.style.backgroundColor="#ff0000",t.classList.add("dice_disappear"),t.firstElementChild.classList.add("dice__points_show")}}var M=function(){P=[e.clientWidth,e.clientHeight]};function A(t){var e,n=t.map((function(t){var e=t.name,n=t.score,r=w.createElement("tr"),o=w.createElement("td");o.textContent=e.length>16?"".concat(e.slice(0,16),"..."):e;var a=w.createElement("td");return a.textContent=n,r.append(o,a),r}));u.innerHTML="",(e=u).append.apply(e,d(n))}w.addEventListener("DOMContentLoaded",(function(){!function(){e=w.getElementById("stage"),r=w.getElementById("timer"),c=w.getElementById("score"),u=w.getElementById("score-table-body"),s=w.getElementById("replay-btn"),l=w.getElementById("toggle-game-btn"),y=o()("#modal-window"),h=y.find(".modal__score-value"),(n=o()("#alert")).on("close.bs.alert",(function(){return n.hide(),!1})),n.hide(),x.addEventListener("resize",M),M(),C(),c.textContent=E,s.addEventListener("click",L),l.addEventListener("click",(function(t){var e=t.currentTarget;e.textContent="Play"==e.textContent?"Pause":"Play",O=!O}));var t=m(P,2);e.style.width=t[0],e.style.height=t[1],e.addEventListener("click",(function(t){var e=t.target;e.classList.contains("dice")&&O&&R(e)})),p().then((function(t){return A(t)})).catch(T),y.modal({keyboard:!1,show:!1}),h.text(E),y.find(".modal__ok-btn").on("click",(function(){var t=y.find(".modal__input").val().trim();f({name:t||"Anonymous",score:E}).then((function(t){return A(t)})).catch(T),y.modal("hide")}))}(),setInterval(_,1e3),setInterval(k,1e3/60)}))}(window)}});