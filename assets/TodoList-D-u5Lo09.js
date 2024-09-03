import{r,i as P,c,a as t,t as h,d as J,e as K,w as m,v as T,j as b,n as N,F as D,k as M,b as v,f as y,g as q,o as i,h as x,l as O}from"./index-COikt3e9.js";const Q={id:"todoListPage",class:"bg-half"},W=t("h1",null,[t("a",{href:"#"},"ONLINE TODO LIST")],-1),X={class:"todo_sm"},Y={href:"#"},Z={class:"conatiner todoListPage vhContainer"},ee={class:"todoList_Content"},te={class:"inputBox"},oe=t("i",{class:"fa fa-plus"},null,-1),se=[oe],ne={class:"todoList_list"},ae={class:"todoList_tab"},le={class:"todoList_items"},ce={key:0,class:"todoList_item"},ie=["for"],ue=["id","onUpdate:modelValue","onChange"],de={key:1,class:"editBox"},re=["placeholder"],ve=["onClick"],_e=["onClick"],he=["onClick"],pe=t("i",{class:"fas fa-edit"},null,-1),ke=[pe],me=["onClick"],be=t("i",{class:"fa fa-times"},null,-1),ye=[be],fe={key:1,class:"todoList_item"},ge=["for"],Ce=["id","onUpdate:modelValue","onChange"],$e={key:1,class:"editBox"},Le=["placeholder"],Te=["onClick"],xe=["onClick"],Ve=["onClick"],we=t("i",{class:"fas fa-edit"},null,-1),Ue=[we],ze=["onClick"],Ae=t("i",{class:"fa fa-times"},null,-1),Be=[Ae],Fe={key:2,class:"todoList_item"},Ne=["for"],De=["id","onUpdate:modelValue","onChange"],Me={key:1,class:"editBox"},Oe=["placeholder"],Ie=["onClick"],Ee=["onClick"],Se=["onClick"],Pe=t("i",{class:"fas fa-edit"},null,-1),Re=[Pe],je=["onClick"],Ge=t("i",{class:"fa fa-times"},null,-1),He=[Ge],Je={key:3,class:"todoList_statistics"},f="https://todolist-api.hexschool.io",We={__name:"TodoList",setup(Ke){const _=r(null),g=r(""),V=r({nickname:"",uid:""});(async()=>{if(_.value=document.cookie.replace(/(?:(?:^|.*;\s*)customToken\s*\=\s*([^;]*).*$)|^.*$/,"$1"),!_.value){console.log("尚未登入！");return}const l=await y.get(`${f}/users/checkout`,{headers:{Authorization:_.value}});V.value=l.data,C()})();const I=r(""),R=async()=>{var l,o;try{const s=await y.post(`${f}/users/sign_out`,{},{headers:{Authorization:_.value}});document.cookie="customToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/",I.value="您已登出囉！",alert(I.value),V.value.uid="",console.log(s)}catch(s){console.log(s),g.value=((o=(l=s.response)==null?void 0:l.data)==null?void 0:o.message)||"登出失敗"}},p=r([]),$=r(""),C=async()=>{var l,o;try{const s=await y.get(`${f}/todos/`,{headers:{Authorization:_.value}});s.data.status?s.data.data.length===0?$.value="目前尚無待辦事項":($.value="",s.data.data.forEach(e=>{const n=e.createTime,H=new Date(n*1e3).toISOString().slice(0,19).replace("T"," ");e.createTime=H}),p.value=s.data.data):$.value="目前尚無待辦事項"}catch(s){console.log(s),g.value=((o=(l=s.response)==null?void 0:l.data)==null?void 0:o.message)||"抓清單失敗"}};C();const L=r(""),E=r({content:""}),j=async()=>{var l,o;try{E.value.content=L.value;const s=await y.post(`${f}/todos/`,E.value,{headers:{Authorization:_.value}});L.value="",console.log("新增成功",s),C()}catch(s){console.log(s),g.value=((o=(l=s.response)==null?void 0:l.data)==null?void 0:o.message)||"新增失敗"}},w=async(l,o)=>{var s,e;try{const n=await y.patch(`${f}/todos/${l}/toggle`,{status:o},{headers:{Authorization:_.value}});console.log("修改確認",n),C()}catch(n){console.log(n),g.value=((e=(s=n.response)==null?void 0:s.data)==null?void 0:e.message)||"修改確認失敗"}},U=async l=>{var o,s;try{const e=await y.delete(`${f}/todos/${l}`,{headers:{Authorization:_.value}});console.log("刪除成功",e),C()}catch(e){console.log(e),g.value=((s=(o=e.response)==null?void 0:o.data)==null?void 0:s.message)||"刪除失敗"}},u=r(""),d=r(null),z=(l,o)=>{d.value=o,p.value.forEach(s=>{s.id===l&&!u.value==""&&(s.content=u,console.log(s))})},A=()=>{d.value=null},B=async(l,o)=>{var s,e;try{console.log(u.value),p.value[o].content=u.value,d.value=null;const n=await y.put(`${f}/todos/${l}`,{content:p.value[o].content},{headers:{Authorization:_.value}});console.log("修改清單完成",n),C()}catch(n){console.log(n),g.value=((e=(s=n.response)==null?void 0:s.data)==null?void 0:e.message)||"修改清單失敗"}},k=r("taball"),F=l=>{k.value=l},G=P(()=>p.value.filter(l=>l.status===!1)),S=P(()=>p.value.filter(l=>l.status===!0));return(l,o)=>{const s=q("RouterLink");return i(),c("div",Q,[t("nav",null,[W,t("ul",null,[t("li",X,[t("a",Y,[t("span",null,"Hello!"+h(V.value.nickname)+"!",1)]),J(s,{to:"/",onClick:R},{default:K(()=>[x("登出")]),_:1})])])]),t("div",Z,[t("div",ee,[t("div",te,[m(t("input",{type:"text",placeholder:"請輸入待辦事項","onUpdate:modelValue":o[0]||(o[0]=e=>L.value=e)},null,512),[[T,L.value]]),t("a",{href:"",onClick:o[1]||(o[1]=b(e=>j(L.value),["prevent"]))},se)]),t("div",ne,[t("ul",ae,[t("li",null,[t("a",{href:"#",class:N({active:k.value==="taball"}),onClick:o[2]||(o[2]=e=>F("taball"))},"全部",2)]),t("li",null,[t("a",{href:"#",class:N({active:k.value==="tabnot"}),onClick:o[3]||(o[3]=e=>F("tabnot"))},"待完成",2)]),t("li",null,[t("a",{href:"#",class:N({active:k.value==="tabok"}),onClick:o[4]||(o[4]=e=>F("tabok"))},"已完成",2)])]),t("div",le,[k.value==="taball"?(i(),c("ul",ce,[(i(!0),c(D,null,M(p.value,(e,n)=>(i(),c("li",{key:e.id},[n!==d.value?(i(),c("label",{key:0,class:"todoList_label",for:e.id},[m(t("input",{class:"todoList_input",type:"checkbox",value:"true",id:e.id,"onUpdate:modelValue":a=>e.status=a,onChange:a=>w(e.id)},null,40,ue),[[O,e.status]]),t("span",null,h(e.content),1)],8,ie)):(i(),c("p",de,[m(t("input",{type:"text","onUpdate:modelValue":o[5]||(o[5]=a=>u.value=a),placeholder:e.content},null,8,re),[[T,u.value]]),x(" "+h(u.value)+" ",1),t("button",{type:"button",class:"btn btn-outline-secondary btn-sm mx-2",onClick:a=>A()}," 取消 ",8,ve),t("button",{type:"button",class:"btn btn-outline-primary btn-sm mx-2",onClick:a=>B(e.id,n)}," 儲存 ",8,_e)])),n!==d.value?(i(),c("a",{key:2,href:"",onClick:b(a=>z(e.id,n),["prevent"])},ke,8,he)):v("",!0),n!==d.value?(i(),c("a",{key:3,href:"",onClick:b(a=>U(e.id),["prevent"])},ye,8,me)):v("",!0)]))),128))])):v("",!0),k.value==="tabnot"?(i(),c("ul",fe,[(i(!0),c(D,null,M(G.value,(e,n)=>(i(),c("li",{key:e.id},[n!==d.value?(i(),c("label",{key:0,class:"todoList_label",for:e.id},[m(t("input",{class:"todoList_input",type:"checkbox",value:"true",id:e.id,"onUpdate:modelValue":a=>e.status=a,onChange:a=>w(e.id)},null,40,Ce),[[O,e.status]]),t("span",null,h(e.content),1)],8,ge)):(i(),c("p",$e,[m(t("input",{type:"text","onUpdate:modelValue":o[6]||(o[6]=a=>u.value=a),placeholder:e.content},null,8,Le),[[T,u.value]]),x(" "+h(u.value)+" ",1),t("button",{type:"button",class:"btn btn-outline-secondary btn-sm mx-2",onClick:a=>A()}," 取消 ",8,Te),t("button",{type:"button",class:"btn btn-outline-primary btn-sm mx-2",onClick:a=>B(e.id,n)}," 儲存 ",8,xe)])),n!==d.value?(i(),c("a",{key:2,href:"",onClick:b(a=>z(e.id,n),["prevent"])},Ue,8,Ve)):v("",!0),n!==d.value?(i(),c("a",{key:3,href:"",onClick:b(a=>U(e.id),["prevent"])},Be,8,ze)):v("",!0)]))),128))])):v("",!0),k.value==="tabok"?(i(),c("ul",Fe,[(i(!0),c(D,null,M(S.value,(e,n)=>(i(),c("li",{key:e.id},[n!==d.value?(i(),c("label",{key:0,class:"todoList_label",for:e.id},[m(t("input",{class:"todoList_input",type:"checkbox",value:"true",id:e.id,"onUpdate:modelValue":a=>e.status=a,onChange:a=>w(e.id)},null,40,De),[[O,e.status]]),t("span",null,h(e.content),1)],8,Ne)):(i(),c("p",Me,[m(t("input",{type:"text","onUpdate:modelValue":o[7]||(o[7]=a=>u.value=a),placeholder:e.content},null,8,Oe),[[T,u.value]]),x(" "+h(u.value)+" ",1),t("button",{type:"button",class:"btn btn-outline-secondary btn-sm mx-2",onClick:a=>A()}," 取消 ",8,Ie),t("button",{type:"button",class:"btn btn-outline-primary btn-sm mx-2",onClick:a=>B(e.id,n)}," 儲存 ",8,Ee)])),n!==d.value?(i(),c("a",{key:2,href:"",onClick:b(a=>z(e.id,n),["prevent"])},Re,8,Se)):v("",!0),n!==d.value?(i(),c("a",{key:3,href:"",onClick:b(a=>U(e.id),["prevent"])},He,8,je)):v("",!0)]))),128))])):v("",!0),t("p",null,h($.value),1),$.value?v("",!0):(i(),c("div",Je,[t("p",null,h(S.value.length)+" 個已完成項目",1)]))])])])])])}}};export{We as default};
