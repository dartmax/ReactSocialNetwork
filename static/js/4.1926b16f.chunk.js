(this.webpackJsonpsamuray=this.webpackJsonpsamuray||[]).push([[4],{431:function(e,t,a){e.exports={descriptionBlock:"ProfileInfo_descriptionBlock__3cd8Y",contact:"ProfileInfo_contact__1N3gp",mainPhoto:"ProfileInfo_mainPhoto__1Fgjo"}},433:function(e,t,a){"use strict";function n(e){if(Array.isArray(e))return e}a.d(t,"a",(function(){return n}))},434:function(e,t,a){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}a.d(t,"a",(function(){return n}))},435:function(e,t,a){e.exports={postsBlock:"MyPosts_postsBlock__2K6MG",posts:"MyPosts_posts__rqfnz"}},436:function(e,t,a){e.exports={item:"Post_item__3rx0n"}},444:function(e,t,a){"use strict";a.r(t);var n=a(157),o=a(158),r=a(199),c=a(202),l=a(0),i=a.n(l),s=a(154),u=a(431),d=a.n(u),m=a(53),p=function(e){var t=Object(l.useState)(!1),a=Object(s.a)(t,2),n=a[0],o=a[1],r=Object(l.useState)(e.status),c=Object(s.a)(r,2),u=c[0],d=c[1];Object(l.useEffect)((function(){d(e.status)}),[e.status]);return i.a.createElement("div",null,!n&&i.a.createElement("div",null,i.a.createElement("b",null,"Status: "),i.a.createElement("span",{onDoubleClick:function(){o(!0)}},"My status: ",e.status||"------------")),n&&i.a.createElement("div",null,i.a.createElement("input",{onChange:function(e){d(e.currentTarget.value)},autoFocus:!0,onBlur:function(){o(!1),e.updateStatus(u)},value:u})))},f=a(105),b=a.n(f),h=a(124),v=a(442),E=a(44),g=a(198),y=a(1),O=a(15),k=(a(6),a(94)),j=a(433);var S=a(434);function P(e,t){return Object(j.a)(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var a=[],n=!0,o=!1,r=void 0;try{for(var c,l=e[Symbol.iterator]();!(n=(c=l.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(i){o=!0,r=i}finally{try{n||null==l.return||l.return()}finally{if(o)throw r}}return a}}(e,t)||Object(S.a)()}var C=i.a.createContext();var w=C;var z=a(95),x=a(104),I=a(445),N=a(68),F=i.a.forwardRef((function(e,t){var a=e.edge,n=void 0!==a&&a,o=e.children,r=e.classes,c=e.className,l=e.color,s=void 0===l?"default":l,u=e.disabled,d=void 0!==u&&u,m=e.disableFocusRipple,p=void 0!==m&&m,f=e.size,b=void 0===f?"medium":f,h=Object(O.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return i.a.createElement(I.a,Object(y.a)({className:Object(k.a)(r.root,c,"default"!==s&&r["color".concat(Object(N.a)(s))],d&&r.disabled,"small"===b&&r["size".concat(Object(N.a)(b))],{start:r.edgeStart,end:r.edgeEnd}[n]),centerRipple:!0,focusRipple:!p,disabled:d,ref:t},h),i.a.createElement("span",{className:r.label},o))})),A=Object(z.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(x.b)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(x.b)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(x.b)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(F),R=i.a.forwardRef((function(e,t){var a=e.autoFocus,n=e.checked,o=e.checkedIcon,r=e.classes,c=e.className,l=e.defaultChecked,s=e.disabled,u=e.icon,d=e.id,m=e.inputProps,p=e.inputRef,f=e.name,b=e.onBlur,h=e.onChange,v=e.onFocus,E=e.readOnly,g=e.required,j=e.tabIndex,S=e.type,C=e.value,z=Object(O.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),x=P(function(e){var t=e.controlled,a=e.default,n=(e.name,i.a.useRef(void 0!==t).current),o=i.a.useState(a),r=o[0],c=o[1];return[n?t:r,i.a.useCallback((function(e){n||c(e)}),[])]}({controlled:n,default:Boolean(l),name:"SwitchBase"}),2),I=x[0],N=x[1],F=i.a.useContext(w),R=s;F&&"undefined"===typeof R&&(R=F.disabled);var B="checkbox"===S||"radio"===S;return i.a.createElement(A,Object(y.a)({component:"span",className:Object(k.a)(r.root,c,I&&r.checked,R&&r.disabled),disabled:R,tabIndex:null,role:void 0,onFocus:function(e){v&&v(e),F&&F.onFocus&&F.onFocus(e)},onBlur:function(e){b&&b(e),F&&F.onBlur&&F.onBlur(e)},ref:t},z),i.a.createElement("input",Object(y.a)({autoFocus:a,checked:n,defaultChecked:l,className:r.input,disabled:R,id:B&&d,name:f,onChange:function(e){var t=e.target.checked;N(t),h&&h(e,t)},readOnly:E,ref:p,required:g,tabIndex:j,type:S,value:C},m)),I?o:u)})),B=Object(z.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(R),M=i.a.forwardRef((function(e,t){var a=e.children,n=e.classes,o=e.className,r=e.color,c=void 0===r?"inherit":r,l=e.component,s=void 0===l?"svg":l,u=e.fontSize,d=void 0===u?"default":u,m=e.htmlColor,p=e.titleAccess,f=e.viewBox,b=void 0===f?"0 0 24 24":f,h=Object(O.a)(e,["children","classes","className","color","component","fontSize","htmlColor","titleAccess","viewBox"]);return i.a.createElement(s,Object(y.a)({className:Object(k.a)(n.root,o,"inherit"!==c&&n["color".concat(Object(N.a)(c))],"default"!==d&&n["fontSize".concat(Object(N.a)(d))]),focusable:"false",viewBox:b,color:m,"aria-hidden":p?void 0:"true",role:p?"img":"presentation",ref:t},h),a,p?i.a.createElement("title",null,p):null)}));M.muiName="SvgIcon";var _=Object(z.a)((function(e){return{root:{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:"currentColor",flexShrink:0,fontSize:e.typography.pxToRem(24),transition:e.transitions.create("fill",{duration:e.transitions.duration.shorter})},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorAction:{color:e.palette.action.active},colorError:{color:e.palette.error.main},colorDisabled:{color:e.palette.action.disabled},fontSizeInherit:{fontSize:"inherit"},fontSizeSmall:{fontSize:e.typography.pxToRem(20)},fontSizeLarge:{fontSize:e.typography.pxToRem(35)}}}),{name:"MuiSvgIcon"})(M);function T(e,t){var a=i.a.memo(i.a.forwardRef((function(t,a){return i.a.createElement(_,Object(y.a)({},t,{ref:a}),e)})));return a.muiName=_.muiName,a}var D=T(i.a.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"})),J=T(i.a.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"})),L=T(i.a.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"})),$=i.a.createElement(J,null),V=i.a.createElement(D,null),H=i.a.createElement(L,null),U=i.a.forwardRef((function(e,t){var a=e.checkedIcon,n=void 0===a?$:a,o=e.classes,r=e.color,c=void 0===r?"secondary":r,l=e.icon,s=void 0===l?V:l,u=e.indeterminate,d=void 0!==u&&u,m=e.indeterminateIcon,p=void 0===m?H:m,f=e.inputProps,b=e.size,h=void 0===b?"medium":b,v=Object(O.a)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]);return i.a.createElement(B,Object(y.a)({type:"checkbox",classes:{root:Object(k.a)(o.root,o["color".concat(Object(N.a)(c))],d&&o.indeterminate),checked:o.checked,disabled:o.disabled},color:c,inputProps:Object(y.a)({"data-indeterminate":d},f),icon:i.a.cloneElement(d?p:s,{fontSize:"small"===h?"small":"default"}),checkedIcon:i.a.cloneElement(d?p:n,{fontSize:"small"===h?"small":"default"}),ref:t},v))})),q=Object(z.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(x.b)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(x.b)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(U),Y=a(81),G=a.n(Y),K=Object(g.a)({form:"edit-profile"})((function(e){var t=e.handleSubmit,a=e.profile,n=e.error;return i.a.createElement("form",{onSubmit:t},i.a.createElement("div",null,i.a.createElement(v.a,{variant:"outlined"},"Save")),n&&i.a.createElement("div",{className:G.a.formSummaryError},n),i.a.createElement("div",null,i.a.createElement("b",null,"Full name"),": ",Object(E.c)("Full name","fullName",[],E.a)),i.a.createElement("div",null,i.a.createElement("b",null,"Looking for a job"),": ",Object(E.c)("","lookingForAJob",[],E.a,{type:q})),i.a.createElement("div",null,i.a.createElement("b",null,"My proffesional skills"),":",Object(E.c)("","lookingForAJobDescription",[],E.b)),"}",i.a.createElement("div",null,i.a.createElement("b",null,"About me"),":",Object(E.c)("About Me","aboutMe",[],E.b)),i.a.createElement("div",null,i.a.createElement("b",null,"Contacts"),": ",Object.keys(a.contacts).map((function(e){return i.a.createElement("div",{key:e,className:d.a.contact},i.a.createElement("b",null,e,":",Object(E.c)(e,"contacts."+e,[],E.a)))}))))})),Q=function(e){var t=e.profile,a=e.isOwner,n=e.goToEditMode;return i.a.createElement("div",null,a&&i.a.createElement("div",null,i.a.createElement(h.a,{onClick:n},"Edit")),i.a.createElement("div",null,i.a.createElement("b",null,"Full name"),": ",t.fullName),i.a.createElement("div",null,i.a.createElement("b",null,"Looking for a job"),": ",t.lookingForAJob?"Yes":"No"),t.lookingForAJob&&i.a.createElement("div",null,i.a.createElement("b",null,"My professional skills"),": ",t.lookingForAJobDescription),i.a.createElement("div",null,i.a.createElement("b",null,"About me"),": ",t.aboutMe),i.a.createElement("div",null,i.a.createElement("b",null,"Contacts"),": ",Object.keys(t.contacts).map((function(e){return i.a.createElement(W,{key:e,contactTitle:e,contactValue:t.contacts[e]})}))))},W=function(e){var t=e.contactTitle,a=e.contactValue;return i.a.createElement("div",{className:d.a.contact},i.a.createElement("b",null,t),": ",a)},X=function(e){var t=e.profile,a=e.status,n=e.isOwner,o=e.savePhoto,r=e.updateStatus,c=e.saveProfile,u=Object(l.useState)(!1),f=Object(s.a)(u,2),h=f[0],v=f[1];if(!t)return i.a.createElement(m.a,null);return i.a.createElement("div",null,i.a.createElement("div",{className:d.a.descriptionBlock},i.a.createElement("img",{src:t.photos.large||b.a,alt:"",className:d.a.mainPhoto}),n&&i.a.createElement("input",{type:"file",onChange:function(e){e.target.files&&e.target.files.length&&o(e.target.files[0])}}),h?i.a.createElement(K,{profile:t,onSubmit:function(e){c(e).then((function(){v(!1)}))}}):i.a.createElement(Q,{goToEditMode:function(){v(!0)},profile:t,isOwner:n}),i.a.createElement(p,{status:a,updateStatus:r})))},Z=a(155),ee=a(69),te=a(435),ae=a.n(te),ne=a(436),oe=a.n(ne),re=function(e){return i.a.createElement("div",{className:oe.a.item},i.a.createElement("img",{src:"https://s3.amazonaws.com/liberty-uploads/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg",alt:"no pick"}),e.message,i.a.createElement("div",null,i.a.createElement("span",null,"Superlike:",e.like)))},ce=a(106),le=Object(ce.a)(100),ie=Object(g.a)({form:"ProfileAddNewPostForm"})((function(e){return i.a.createElement("form",{onSubmit:e.handleSubmit},i.a.createElement("div",null,Object(E.c)("Your post","newPostText",[ce.b,le],E.a)),i.a.createElement("div",null,i.a.createElement(h.a,{onClick:e.handleSubmit},"Add Post")))})),se=i.a.memo((function(e){var t=Object(ee.a)(e.posts).reverse().map((function(e){return i.a.createElement(re,{key:e.id,message:e.message,like:e.like})}));return i.a.createElement("div",{className:ae.a.postsBlock},i.a.createElement("h3",null,"My Posts"),i.a.createElement(ie,{onSubmit:function(t){e.addPost(t.newPostText)}}),i.a.createElement("div",{className:ae.a.posts},t))})),ue=a(11),de=Object(ue.b)((function(e){return{posts:e.profilePage.posts}}),{addPost:Z.a.addPostActionCreator})(se),me=function(e){return i.a.createElement("div",null,i.a.createElement(X,{saveProfile:e.saveProfile,savePhoto:e.savePhoto,isOwner:e.isOwner,profile:e.profile,status:e.status,updateStatus:e.updateStatus}),i.a.createElement(de,null))},pe=a(45),fe=a(14),be=function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"refreshProfile",value:function(){var e=+this.props.match.params.userId;if(e||(e=this.props.authorizedUserId)||this.props.history.push("/login"),!e)throw new Error("ID should exists");this.props.getUserProfile(e),this.props.getStatus(e)}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(e,t){this.props.match.params.userId!==e.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return i.a.createElement(me,Object.assign({},this.props,{isOwner:!this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto}))}}]),a}(i.a.Component);t.default=Object(fe.d)(Object(ue.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.userId,isAuth:e.auth.isAuth}}),{getUserProfile:Z.d,getStatus:Z.c,updateStatus:Z.g,savePhoto:Z.e,saveProfile:Z.f}),pe.h)(be)}}]);
//# sourceMappingURL=4.1926b16f.chunk.js.map