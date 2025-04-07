/* esm.sh - solid-js@1.8.1/html */
import{effect as M,style as q,insert as z,untrack as U,spread as B,createComponent as H,delegateEvents as Z,classList as F,mergeProps as K,dynamicProperty as J,setAttribute as Q,setAttributeNS as X,addEventListener as Y,Aliases as ee,getPropAlias as te,Properties as re,ChildProperties as se,DelegatedEvents as ne,SVGElements as ce,SVGNamespace as le}from"./web.mjs";var ue=/(?:<!--[\S\s]*?-->|<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>)/g,ae=/(?:\s(?<boolean>[^/\s><=]+?)(?=[\s/>]))|(?:(?<name>\S+?)(?:\s*=\s*(?:(['"])(?<quotedValue>[\s\S]*?)\3|(?<unquotedValue>[^\s>]+))))/g,ie={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuitem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function pe(s){let n={type:"tag",name:"",voidElement:!1,attrs:[],children:[]},i=s.match(/<\/?([^\s]+?)[/\s>]/);if(i&&(n.name=i[1],(ie[i[1].toLowerCase()]||s.charAt(s.length-2)==="/")&&(n.voidElement=!0),n.name.startsWith("!--"))){let m=s.indexOf("-->");return{type:"comment",comment:m!==-1?s.slice(4,m):""}}let p=new RegExp(ae);for(let m of s.matchAll(p))(m[1]||m[2]).startsWith("use:")?n.attrs.push({type:"directive",name:m[1]||m[2],value:m[4]||m[5]||""}):n.attrs.push({type:"attr",name:m[1]||m[2],value:m[4]||m[5]||""});return n}function k(s,n,i){let p=n.indexOf("<",i),m=n.slice(i,p===-1?void 0:p);/^\s*$/.test(m)||s.push({type:"text",content:m})}function _(s,n){let i=n.replace("<!--","").replace("-->","");/^\s*$/.test(i)||s.push({type:"comment",content:i})}function fe(s){let n=[],i,p=-1,m=[],P={};return s.replace(ue,(x,S)=>{let A=x.charAt(1)!=="/",y=x.slice(0,4)==="<!--",E=S+x.length,b=s.charAt(E),v;A&&!y&&(p++,i=pe(x),!i.voidElement&&b&&b!=="<"&&k(i.children,s,E),P[i.tagName]=i,p===0&&n.push(i),v=m[p-1],v&&v.children.push(i),m[p]=i),y&&(p<0?_(n,x):_(m[p].children,x)),(y||!A||i.voidElement)&&(y||p--,b!=="<"&&b&&(v=p===-1?n:m[p].children,k(v,s,E)))}),n}function he(s){let n=[];for(let i of s)n.push(i.name+'="'+i.value.replace(/"/g,"&quot;")+'"');return n.length?" "+n.join(" "):""}function T(s,n){switch(n.type){case"text":return s+n.content;case"tag":return s+="<"+n.name+(n.attrs?he(n.attrs):"")+(n.voidElement?"/>":">"),n.voidElement?s:s+n.children.reduce(T,"")+"</"+n.name+">";case"comment":return s+="<!--"+n.content+"-->"}}function $e(s){return s.reduce(function(n,i){return n+T("",i)},"")}var I=new Map,me=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,N=" \\f\\n\\r\\t",V="[^"+N+`\\/>"'=]+`,O="[ "+N+"]+(?:use:<!--#-->|"+V+")",D="<([A-Za-z$#]+[A-Za-z0-9:_-]*)((?:",R=`(?:\\s*=\\s*(?:'[^']*?'|"[^"]*?"|\\([^)]*?\\)|<[^>]*?>|`+V+"))?)",de=new RegExp(D+O+R+"+)([ "+N+"]*/?>)","g"),oe=new RegExp("("+O+`\\s*=\\s*)(<!--#-->|['"(]([\\w\\s]*<!--#-->[\\w\\s]*)*['")])`,"gi"),ge=new RegExp(D+O+R+"*)([ "+N+"]*/>)","g"),L="<!--#-->",xe=new Set(["class","on","oncapture","style","use","prop","attr"]);function ye(s,n,i,p){return"<"+n+i.replace(oe,Ee)+p}function Ee(s,n,i){return n.replace(/<!--#-->/g,"###")+(i[0]==='"'||i[0]==="'"?i.replace(/<!--#-->/g,"###"):'"###"')}function ve(s,n,i){return me.test(n)?s:"<"+n+i+"></"+n+">"}function Ce(s){return s.toLowerCase().replace(/-([a-z])/g,(n,i)=>i.toUpperCase())}function j(s,n,i,p){if(s==="use:###"&&n==="###"){let m=p.counter++;p.exprs.push(`typeof exprs[${m}] === "function" ? r.use(exprs[${m}], ${i}, exprs[${p.counter++}]) : (()=>{throw new Error("use:### must be a function")})()`)}else throw new Error(`Not support syntax ${s} must be use:{function}`)}function be(s,{delegateEvents:n=!0,functionBuilder:i=(...p)=>new Function(...p)}={}){let p=1;s.wrapProps=r=>{let e=Object.getOwnPropertyDescriptors(r);for(let t in e)typeof e[t].value=="function"&&!e[t].value.length&&s.dynamicProperty(r,t);return r};function m(r,e){let t=0,a="";for(;t<r.length-1;t++)a=a+r[t]+"<!--#-->";a=a+r[t],a=[[ge,ve],[/<(<!--#-->)/g,"<###"],[/\.\.\.(<!--#-->)/g,"###"],[de,ye],[/>\n+\s*/g,">"],[/\n+\s*</g,"<"],[/\s+</g," <"],[/>\s+/g,"> "]].reduce((h,$)=>h.replace($[0],$[1]),a);let d=fe(a),[l,c]=b(d,e.funcBuilder),u=[];for(let h=0;h<l.length;h++){u.push(document.createElement("template")),u[h].innerHTML=l[h];let $=u[h].content.querySelectorAll("script,style");for(let g=0;g<$.length;g++){let o=$[g].firstChild?.data||"";if(o.indexOf(L)>-1){let w=o.split(L).reduce((C,W,G)=>(G&&C.push(""),C.push(W),C),[]);$[h].firstChild.replaceWith(...w)}}}return u[0].create=c,I.set(r,u),u}function P(r,e,t,a,f,d,l){let c=a==="###"?`!doNotWrap ? exprs[${l.counter}]() : exprs[${l.counter++}]`:a.split("###").map((o,w)=>w?` + (typeof exprs[${l.counter}] === "function" ? exprs[${l.counter}]() : exprs[${l.counter++}]) + "${o}"`:`"${o}"`).join(""),u,h;(u=t.split(":"))&&u[1]&&xe.has(u[0])&&(t=u[1],h=u[0]);let $=s.ChildProperties.has(t),g=s.Properties.has(t);if(t==="style"){let o=`_$v${p++}`;l.decl.push(`${o}={}`),l.exprs.push(`r.style(${e},${c},${o})`)}else if(t==="classList"){let o=`_$v${p++}`;l.decl.push(`${o}={}`),l.exprs.push(`r.classList(${e},${c},${o})`)}else if(h!=="attr"&&($||!f&&(s.getPropAlias(t,r.name.toUpperCase())||g)||d||h==="prop"))d&&!$&&!g&&h!=="prop"&&(t=Ce(t)),l.exprs.push(`${e}.${s.getPropAlias(t,r.name.toUpperCase())||t} = ${c}`);else{let o=f&&t.indexOf(":")>-1&&s.SVGNamespace[t.split(":")[0]];o?l.exprs.push(`r.setAttributeNS(${e},"${o}","${t}",${c})`):l.exprs.push(`r.setAttribute(${e},"${s.Aliases[t]||t}",${c})`)}}function x(r,e,t,a,f,d,l){if(t.slice(0,2)==="on")if(t.includes(":")){let c=t.startsWith("oncapture:");l.exprs.push(`${e}.addEventListener("${t.slice(c?10:3)}",exprs[${l.counter++}]${c?",true":""})`)}else{let c=t.slice(2).toLowerCase(),u=n&&s.DelegatedEvents.has(c);l.exprs.push(`r.addEventListener(${e},"${c}",exprs[${l.counter++}],${u})`),u&&l.delegatedEvents.add(c)}else if(t==="ref")l.exprs.push(`exprs[${l.counter++}](${e})`);else{let c=Object.assign({},l,{exprs:[]}),u=l.counter;if(P(r,e,t,a,f,d,c),l.decl.push(`_fn${u} = (${a==="###"?"doNotWrap":""}) => {
${c.exprs.join(`;
`)};
}`),a==="###")l.exprs.push(`typeof exprs[${u}] === "function" ? r.effect(_fn${u}) : _fn${u}(true)`);else{let h="";for(let $=u;$<c.counter;$++)$!==u&&(h+=" || "),h+=`typeof exprs[${$}] === "function"`;l.exprs.push(h+` ? r.effect(_fn${u}) : _fn${u}()`)}l.counter=c.counter,l.wrap=!1}}function S(r,e){let t=Object.assign({},e,{first:!0,multi:!1,parent:e.path});if(r.children.length>1)for(let f=0;f<r.children.length;f++){let d=r.children[f];if(d.type==="comment"&&d.content==="#"||d.type==="tag"&&d.name==="###"){t.multi=!0;break}}let a=0;for(;a<r.children.length;){let f=r.children[a];if(f.name==="###"){t.multi?(r.children[a]={type:"comment",content:"#"},a++):r.children.splice(a,1),y(f,t);continue}E(f,t),!t.multi&&f.type==="comment"&&f.content==="#"?r.children.splice(a,1):a++}e.counter=t.counter,e.templateId=t.templateId,e.hasCustomElement=e.hasCustomElement||t.hasCustomElement}function A(r){let e=[];for(let t of r)if(Array.isArray(t)){if(!t.length)continue;e.push(`r.wrapProps({${t.join(",")||""}})`)}else e.push(t);return e.length>1?`r.mergeProps(${e.join(",")})`:e[0]}function y(r,e){let t=[],a=Object.keys(r.attrs),f=[t],d=e.counter++;for(let c=0;c<a.length;c++){let{type:u,name:h,value:$}=r.attrs[c];if(u==="attr")h==="###"?(f.push(`exprs[${e.counter++}]`),f.push(t=[])):$==="###"?t.push(`${h}: exprs[${e.counter++}]`):t.push(`${h}: "${$}"`);else if(u==="directive"){let g=`_$el${p++}`,o=!e.decl.length;e.decl.push(o?"":`${g} = ${e.path}.${e.first?"firstChild":"nextSibling"}`),j(h,$,g,e)}}if(r.children.length===1&&r.children[0].type==="comment"&&r.children[0].content==="#")t.push(`children: () => exprs[${e.counter++}]`);else if(r.children.length){let c={type:"fragment",children:r.children},u=Object.assign({},e,{first:!0,decl:[],exprs:[],parent:!1});E(c,u),t.push(`children: () => { ${u.exprs.join(`;
`)}}`),e.templateId=u.templateId,e.counter=u.counter}let l;e.multi&&(l=`_$el${p++}`,e.decl.push(`${l} = ${e.path}.${e.first?"firstChild":"nextSibling"}`)),e.parent?e.exprs.push(`r.insert(${e.parent}, r.createComponent(exprs[${d}],${A(f)})${l?`, ${l}`:""})`):e.exprs.push(`${e.fragment?"":"return "}r.createComponent(exprs[${d}],${A(f)})`),e.path=l,e.first=!1}function E(r,e){if(r.type==="fragment"){let t=[];r.children.forEach(a=>{if(a.type==="tag"){if(a.name==="###"){let l=Object.assign({},e,{first:!0,fragment:!0,decl:[],exprs:[]});y(a,l),t.push(l.exprs[0]),e.counter=l.counter,e.templateId=l.templateId;return}e.templateId++;let f=p,d=Object.assign({},e,{first:!0,decl:[],exprs:[]});e.templateNodes.push([a]),E(a,d),t.push(`function() { ${d.decl.join(`,
`)+`;
`+d.exprs.join(`;
`)+`;
return _$el${f};
`}}()`),e.counter=d.counter,e.templateId=d.templateId}else if(a.type==="text")t.push(`"${a.content}"`);else if(a.type==="comment"){if(a.content==="#")t.push(`exprs[${e.counter++}]`);else if(a.content)for(let f=0;f<a.content.split("###").length-1;f++)t.push(`exprs[${e.counter++}]`)}}),e.exprs.push(`return [${t.join(`, 
`)}]`)}else if(r.type==="tag"){let t=`_$el${p++}`,a=!e.decl.length,f=e.templateId;e.decl.push(a?"":`${t} = ${e.path}.${e.first?"firstChild":"nextSibling"}`);let d=s.SVGElements.has(r.name),l=r.name.includes("-");if(e.hasCustomElement=l,r.attrs.some(c=>c.name==="###")){let c=[],u="",h=[];for(let $=0;$<r.attrs.length;$++){let{type:g,name:o,value:w}=r.attrs[$];if(g==="attr")if(w.includes("###")){let C=e.counter++;u+=`${o}: ${o!=="ref"?`typeof exprs[${C}] === "function" ? exprs[${C}]() : `:""}exprs[${C}],`}else o==="###"?(u.length&&(c.push(`()=>({${u}})`),u=""),c.push(`exprs[${e.counter++}]`)):h.push(r.attrs[$]);else g==="directive"&&j(o,w,t,e)}r.attrs=h,u.length&&c.push(`()=>({${u}})`),e.exprs.push(`r.spread(${t},${c.length===1?`typeof ${c[0]} === "function" ? r.mergeProps(${c[0]}) : ${c[0]}`:`r.mergeProps(${c.join(",")})`},${d},${!!r.children.length})`)}else for(let c=0;c<r.attrs.length;c++){let{type:u,name:h,value:$}=r.attrs[c];u==="directive"?(j(h,$,t,e),r.attrs.splice(c,1),c--):u==="attr"&&$.includes("###")&&(r.attrs.splice(c,1),c--,x(r,t,h,$,d,l,e))}e.path=t,e.first=!1,S(r,e),a&&(e.decl[0]=e.hasCustomElement?`const ${t} = r.untrack(() => document.importNode(tmpls[${f}].content.firstChild, true))`:`const ${t} = tmpls[${f}].content.firstChild.cloneNode(true)`)}else if(r.type==="text"){let t=`_$el${p++}`;e.decl.push(`${t} = ${e.path}.${e.first?"firstChild":"nextSibling"}`),e.path=t,e.first=!1}else if(r.type==="comment"){let t=`_$el${p++}`;e.decl.push(`${t} = ${e.path}.${e.first?"firstChild":"nextSibling"}`),r.content==="#"&&(e.multi?e.exprs.push(`r.insert(${e.parent}, exprs[${e.counter++}], ${t})`):e.exprs.push(`r.insert(${e.parent}, exprs[${e.counter++}])`)),e.path=t,e.first=!1}}function b(r,e){let t={path:"",decl:[],exprs:[],delegatedEvents:new Set,counter:0,first:!0,multi:!1,templateId:0,templateNodes:[]},a=p,f=r,d;return r.length>1&&(r=[{type:"fragment",children:r}]),r[0].name==="###"?(d=!0,y(r[0],t)):E(r[0],t),s.delegateEvents(Array.from(t.delegatedEvents)),[[f].concat(t.templateNodes).map(c=>$e(c)),e("tmpls","exprs","r",t.decl.join(`,
`)+`;
`+t.exprs.join(`;
`)+(d?"":`;
return _$el${a};
`))]}function v(r,...e){let t=I.get(r)||m(r,{funcBuilder:i});return t[0].create(t,e,s)}return v}var Ae=be({effect:M,style:q,insert:z,untrack:U,spread:B,createComponent:H,delegateEvents:Z,classList:F,mergeProps:K,dynamicProperty:J,setAttribute:Q,setAttributeNS:X,addEventListener:Y,Aliases:ee,getPropAlias:te,Properties:re,ChildProperties:se,DelegatedEvents:ne,SVGElements:ce,SVGNamespace:le});export{Ae as default};
//# sourceMappingURL=html.mjs.map