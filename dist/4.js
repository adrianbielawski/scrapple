(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{223:function(e,t,n){var r=n(24),a=n(224);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},224:function(e,t,n){(t=n(25)(!1)).push([e.i,".game-menu h1{margin:0}.game-menu p{font-size:1.2em;color:#5f5f5f;font-weight:600}.game-menu .menu{width:100%;max-width:400px;margin:0 auto;display:flex;align-items:center;flex-flow:column;box-sizing:border-box}.game-menu .card{margin-bottom:5px}.game-menu .choose-language{display:flex;flex-direction:column}.game-menu .choose-language .language,.game-menu .choose-language .current-lang{display:inline-flex;align-items:center;justify-content:center;margin:5px;cursor:pointer}.game-menu .choose-language .languages{max-height:0px;overflow:hidden;transition-property:max-height;transition-duration:.5s;transition-delay:.0s}.game-menu .choose-language .languages.active{max-height:70px}.game-menu .choose-language p{margin:0 0 0 5px}.game-menu .choose-language img{width:35px}.game-menu .time-option{display:inline-flex;align-items:center;margin-left:-15px}.game-menu input{width:80%;text-transform:none}.game-menu input[type=time]{font-size:2em;width:100%;max-height:0px;overflow:hidden;padding:0;border:none;transition-property:max-height;transition-duration:.5s;transition-delay:.0s;display:flex;justify-content:center;-webkit-appearance:none}.game-menu input[type=time]::-webkit-time-picker-indicator,.game-menu input[type=time]::-webkit-clear-button,.game-menu input[type=time]::-webkit-inner-spin-button{display:none;-webkit-appearance:none}.game-menu input[type=time].active{max-height:50px;border:1px solid #bbb}.game-menu input[type=time]::-webkit-datetime-edit-hour-field:focus,.game-menu input[type=time]::-webkit-datetime-edit-minute-field:focus,.game-menu input[type=time]::-webkit-datetime-edit-second-field:focus{background:#e1e1e1;color:#32c7a2}.game-menu .add{padding:5px 7px;margin-left:3px;height:30px;width:30px;font-size:1.3em;color:#fff}.game-menu .add-player{align-items:center}.game-menu .add-player p{text-align:center;margin:0 0 5px 0}.game-menu .add-player .form{display:inline-flex;justify-content:center;align-items:center;text-transform:none}.game-menu ul{color:#5f5f5f;width:100%;margin:10px 0;position:relative}.game-menu ul .player{font-size:1.2em;background:#fff;border:.5px solid transparent;border-bottom:0.5px solid #bbb;width:100%;max-height:1000px;overflow:hidden;float:right;box-sizing:border-box;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-o-user-select:none;cursor:grab}.game-menu ul .player .wrapper{padding-left:10px;display:flex;align-items:center;justify-content:space-between}.game-menu ul .player .player-name{margin:5px 0 5px 0;display:flex;flex-grow:1;flex-shrink:0}.game-menu ul .player p{font-weight:unset;font-size:1em;text-align:left;width:100%;margin:0}.game-menu ul .player span{font-weight:700;font-size:1.2em}.game-menu ul .player .top-list-space{height:0;overflow:hidden;transition:height .3s ease-out}.game-menu ul .player .top-list-space.visible{border-top:0.5px solid #bbb;border-bottom:0.5px solid #bbb}.game-menu ul .player .bottom-list-space{overflow:hidden;height:0;transition:height .3s ease-out}.game-menu ul .player .bottom-list-space.visible{border-top:0.5px solid #bbb}.game-menu ul .player.no-touch-device .game-menu ul .player:hover{position:relative;border-radius:10px;border:0.5px solid #e1e1e1;box-shadow:2px 2px 3px #a2a2a2}.game-menu ul .player.grabbed{position:absolute;border-radius:10px;border:0.5px solid #e1e1e1;box-shadow:2px 2px 3px #a2a2a2;z-index:10;width:100%}.game-menu ul .player button{margin-right:5px;width:25px;height:25px;font-size:1em}.game-menu button[type=submit]{margin:5px auto}\n",""]),e.exports=t},259:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(82),i=n(7),l=(n(223),n(85)),s=n(86);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){h(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?d(e):t}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(u,e);var t,n,r,i,c=(t=u,function(){var e,n=g(t);if(b()){var r=g(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return y(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),h(d(t=c.call(this,e)),"handleGrab",(function(e){if("touchstart"===e.type){if(t.props.isOtherGrabbed)return void t.props.setTouches(1);t.setState((function(e){return p({},e,{isTouchDevice:!0})}))}t.props.setGrabbedElement(t.state.index,e.type);var n=document.getElementsByClassName("players")[0],r=n.getBoundingClientRect();n.style.height="".concat(r.height,"px");var a=t.element.getBoundingClientRect().y-r.y,o=e.clientX,i=e.clientY;"touchstart"===e.type&&(o=e.touches[0].clientX,i=e.touches[0].clientY),t.setState((function(e){return p({},e,{isGrabbed:!0,top:a,topStart:a,startX:o})})),t.handleMove=function(){t.move(event,o,i,a)},"mousedown"===e.type&&window.addEventListener("mousemove",t.handleMove),"touchstart"===e.type&&window.addEventListener("touchmove",t.handleMove)})),h(d(t),"move",(function(e,n,r,a){t.props.setTransition(!0);var o=e.clientX,i=e.clientY;"touchmove"==e.type&&(o=e.touches[0].clientX,i=e.touches[0].clientY);var l=i-r+a,s=o-n,c=(l-a)/t.elementH;-0===(c=Math.round(c))&&(c=0),c!==t.state.distance&&t.props.addSpace(c),t.setState((function(e){return p({},e,{top:l,left:s,startX:n,distance:c})}))})),h(d(t),"handleDrop",(function(e){if(t.props.setTransition(!1),t.props.isOtherGrabbed)t.props.setTouches(-1);else{window.removeEventListener("mousemove",t.handleMove),window.removeEventListener("touchmove",t.handleMove),document.getElementsByClassName("players")[0].style.height="auto",t.props.addSpace(0);var n=e.type;t.props.drop(t.state.index,t.state.distance,n),t.setState((function(e){return p({},e,{isGrabbed:!1,top:0,left:0,distance:0,startX:0})}))}})),h(d(t),"removePlayer",(function(e){e.preventDefault(),t.removedPlayerTransition(),setTimeout(t.remove,500)})),h(d(t),"removedPlayerTransition",(function(){var e=t.element;e.style.transitionProperty="width, max-height",e.style.transitionDuration=".4s, .4s",e.style.transitionDelay="0.1s, .4s",e.style.transitionTimingFunction="ease-in, ease",e.style.width=0,e.style.maxHeight=0})),h(d(t),"remove",(function(){t.element.style={},t.props.removePlayer(t.state.index)})),h(d(t),"getStyles",(function(){var e={topSpaceStyle:{},bottomSpaceStyle:{},topSpaceClass:"",bottomSpaceClass:"",grabbed:"",position:{},hover:"no-touch-device"};return t.props.topSpace&&!t.state.isGrabbed?(e.topSpaceStyle={height:t.elementH},e.topSpaceClass="visible"):t.props.bottomSpace&&!t.state.isGrabbed&&(e.bottomSpaceStyle={height:t.elementH},e.bottomSpaceClass="visible"),t.props.isTransitionEnableed||t.state.isGrabbed||(e.bottomSpaceStyle.transition="none",e.topSpaceStyle.transition="none"),t.state.isGrabbed&&(e.grabbed="grabbed",e.position={top:t.state.top,left:t.state.left}),t.state.isTouchDevice&&(e.hover=""),e})),t.state={index:t.props.index,isGrabbed:!1,isTouchDevice:!1,top:0,left:0,startX:0,elementH:0,distance:0,topSpace:t.props.topSpace,bottomSpace:t.props.bottomSpace},t}return n=u,(r=[{key:"componentDidMount",value:function(){this.element=document.getElementsByClassName("player")[this.props.index],this.elementH=this.element.getBoundingClientRect().height}},{key:"render",value:function(){var e=this.getStyles();return a.a.createElement("li",{className:"player ".concat(e.grabbed," ").concat(e.hover),style:e.position},a.a.createElement("div",{className:"top-list-space ".concat(e.topSpaceClass),style:e.topSpaceStyle}),a.a.createElement("div",{className:"wrapper"},a.a.createElement("div",{onMouseDown:this.handleGrab,onMouseUp:this.handleDrop,onTouchStart:this.handleGrab,onTouchEnd:this.handleDrop,className:"player-name"},a.a.createElement("p",null,a.a.createElement(o.a,null,"Player")," ",this.props.index+1,": ",a.a.createElement("span",null," ",this.props.player))),a.a.createElement("button",{onClick:this.removePlayer,className:"remove"},a.a.createElement(l.a,{icon:s.e,onClick:this.handleClick}))),a.a.createElement("div",{className:"bottom-list-space ".concat(e.bottomSpaceClass),style:e.bottomSpaceStyle}))}}])&&m(n.prototype,r),i&&m(n,i),u}(r.Component);function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e){return function(e){if(Array.isArray(e))return E(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return E(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){D(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function C(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?N(e):t}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function T(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function D(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var A=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}(l,e);var t,n,r,o,i=(t=l,function(){var e,n=k(t);if(T()){var r=k(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return C(this,e)});function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),D(N(t=i.call(this,e)),"setTransition",(function(e){t.setState((function(t){return O({},t,{isTransitionEnableed:e})}))})),D(N(t),"setTouches",(function(e){t.setState((function(n){return O({},n,{touches:t.state.touches+e})}))})),D(N(t),"setGrabbedElement",(function(e,n){var r="touchstart"===n&&t.state.touches+1;t.setState((function(t){return O({},t,{grabbedElement:e,initialListSpace:e-1,listSpace:e-1,touches:r})}))})),D(N(t),"addSpace",(function(e){var n=t.state.initialListSpace+e;t.state.grabbedElement<=n&&(n+=1),n>=t.props.players.length&&(n=t.props.players.length-1),t.state.grabbedElement===t.props.players.length-1&&n>=t.props.players.length-2&&(console.log("sf"),n=t.props.players.length-2),t.setState((function(e){return O({},e,{listSpace:n})}))})),D(N(t),"drop",(function(e,n,r){var a=w(t.props.players),o=e+n;o<1?o=0:o>=a.length&&(o=a.length-1);var i=0;"touchend"===r&&(i=t.state.touches-1),t.props.reorderPlayers(e,o),t.setState((function(e){return O({},e,{grabbedElement:null,initialListSpace:null,listSpace:null,touches:i})}))})),D(N(t),"getPlayers",(function(){return w(t.props.players).map((function(e,n){var r=n===t.state.listSpace,o=0!=t.state.grabbedElement&&t.state.listSpace<0&&0===n||0===t.state.grabbedElement&&t.state.listSpace<0&&1===n,i=t.state.touches>0&&n!==t.state.grabbedElement;return a.a.createElement(v,{drop:t.drop,addSpace:t.addSpace,setGrabbedElement:t.setGrabbedElement,setTouches:t.setTouches,setTransition:t.setTransition,removePlayer:t.props.removePlayer,isOtherGrabbed:i,isTransitionEnableed:t.state.isTransitionEnableed,key:n,index:n,player:e,topSpace:o,bottomSpace:r})}))})),t.state={initialListSpace:null,listSpace:null,grabbedElement:null,isTransitionEnableed:!1,touches:0},t}return n=l,(r=[{key:"render",value:function(){var e=this.getPlayers();return a.a.createElement("ul",{className:"players"},e)}}])&&P(n.prototype,r),o&&P(n,o),l}(r.Component),G=n(44),_=n(257),R=function(e){var t=e.setTime,n=e.toggleTimer,r=e.timer,i=e.time,l=r?"active":null,s="".concat(i.hours,":").concat(i.minutes,":").concat(i.seconds);return a.a.createElement("div",null,a.a.createElement("div",{className:"time-option"},a.a.createElement(_.a,{onClick:n,checked:r}),a.a.createElement("p",null,a.a.createElement(o.a,null,"Player's time limit"))),a.a.createElement("input",{type:"time",className:l,onChange:function(e){t(e.target.value)},defaultValue:s,step:"1"}))},I=function(e){var t=Object(r.useRef)(null);return a.a.createElement("div",{className:"add-player"},a.a.createElement("p",null,a.a.createElement(o.a,null,"Add player")),a.a.createElement("div",{className:"form"},a.a.createElement("input",{id:"player-name",type:"text",autoComplete:"false",spellCheck:"false",ref:t}),a.a.createElement("button",{className:"add",onClick:function(){var n=t.current.value.trim();e.validatePlayerName(n)}},a.a.createElement(l.a,{icon:s.d,className:"plus"}))))},L=n(37),M=n(36),z=n(12),J=function(e){var t=e.gameId?"Game created succesfully":"Creating new game",n="Please wait";return e.gameId&&(n="Waiting for other players to join the game"),e.allPlayersJoined&&(n="All players has joined the game, press start game to begin"),a.a.createElement(M.a,{className:"confirmation"},a.a.createElement("h2",null,a.a.createElement(o.a,null,t)),e.gameId?a.a.createElement("p",{className:"game-id"},a.a.createElement(o.a,null,"Game ID"),": ",e.gameId):null,a.a.createElement("p",{className:"message"},a.a.createElement(o.a,null,n)),e.allPlayersJoined?a.a.createElement("button",{onClick:e.handleStartAdminGame},a.a.createElement(o.a,null,"Start game")):a.a.createElement("div",null,a.a.createElement(z.a,null),a.a.createElement("p",{className:"or"},a.a.createElement(o.a,null,"Or")),a.a.createElement("button",{onClick:e.handleStartAdminGame},a.a.createElement(o.a,null,"Start anyway"))))},X=n(19);function B(e){return(B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function W(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?W(Object(n),!0).forEach((function(t){Z(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):W(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function U(e){return function(e){if(Array.isArray(e))return Y(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return Y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Y(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function $(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function V(e,t){return!t||"object"!==B(t)&&"function"!=typeof t?q(e):t}function q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function K(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function Q(e){return(Q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ee=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(c,e);var t,n,r,l,s=(t=c,function(){var e,n=Q(t);if(K()){var r=Q(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return V(this,e)});function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),Z(q(t=s.call(this,e)),"handleCreateNewGame",(function(){var e=t.state.gameId?t.state.gameId:Math.floor(1e6*Math.random()).toString();t.props.setPlayersNames(t.state.playersNames);var n=t.getPlayers();t.createNewGame(n,e)})),Z(q(t),"getPlayers",(function(){var e=U(t.state.playersNames);return e=e.map((function(e,t){return{playerName:e,playerId:t,currentScore:0,bestScore:0,allPoints:[]}}))})),Z(q(t),"createNewGame",(function(e,n){var r={language:t.props.language,players:e,currentPlayer:0,gameStarted:!0,joinedPlayers:[1],exitOption:t.props.playedAgainWithSettings?"playAgainWithSettings":null};t.state.timer&&(r=H({},r,{gameStarted:!1,timer:t.state.timer,time:t.state.time,endTime:null})),i.a.collection("games").doc(n).set(r).then((function(){var e={gameId:n,showConfirmation:!0,exitOption:!1,playedAgainWithSettings:!1};t.setState((function(t){return H({},t,{},e)})),t.state.timer&&t.serverChangeListener(n),t.props.gameCreated(n,t.state.timer)})).catch((function(e){console.log(e)}))})),Z(q(t),"serverChangeListener",(function(e){t.unsubscribe=i.a.collection("games").doc(e).onSnapshot((function(e){e.data().joinedPlayers.length>=t.state.playersNames.length&&t.setState((function(e){return H({},e,{allPlayersJoined:!0})}))}))})),Z(q(t),"handleStartAdminGame",(function(){t.props.startAdminGame()})),Z(q(t),"toggleTimer",(function(){t.setState((function(e){return H({},e,{timer:!e.timer})}))})),Z(q(t),"setTime",(function(e){var n={},r=e.slice(0,2),a=e.slice(3,5),o=e.slice(6,8);""==o&&(o="00"),n.hours=r,n.minutes=a,n.seconds=o,t.setState((function(e){return H({},e,{time:n})}))})),Z(q(t),"validatePlayerName",(function(e){if(t.isPlayerExists(e)){var n={player:e};t.props.alert("alert","Player exists",n,null)}else if(e.length<1){t.props.alert("alert","Please type in player's name")}else if(t.state.playersNames.length>=4){t.props.alert("alert","Max 4 players")}else{document.getElementById("player-name").value="",t.addPlayer(e)}})),Z(q(t),"addPlayer",(function(e){var n=U(t.state.playersNames);n.push(e),t.setState((function(e){return H({},e,{playersNames:n})}))})),Z(q(t),"removePlayer",(function(e){var n=U(t.state.playersNames).filter((function(t,n){return e!==n}));t.setState((function(e){return H({},e,{playersNames:n})}))})),Z(q(t),"reorderPlayers",(function(e,n){var r=U(t.state.playersNames);r.splice(n,0,r.splice(e,1)[0]),t.setState((function(e){return H({},e,{playersNames:r})}))})),Z(q(t),"isPlayerExists",(function(e){var n=e.toLowerCase();return U(t.state.playersNames).map((function(e){return e.toLowerCase()})).includes(n)})),Z(q(t),"validateSettings",(function(e){if(e.preventDefault(),t.state.playersNames.length<2){t.props.alert("alert","Please add at least 2 players")}else t.handleCreateNewGame(),t.setState((function(e){return H({},e,{showConfirmation:!e.showConfirmation})}))})),t.state={gameId:t.props.gameId,playersNames:["sd","sdf"],timer:!0,time:{hours:"00",minutes:"05",seconds:"00"},listSpace:null,caughtElement:null,showConfirmation:!(!t.props.playedAgain||t.props.playedAgainWithSettings),allPlayersJoined:!1},t.listenServerChanges=t.props.playedAgain?t.serverChangeListener(t.props.gameId):null,t}return n=c,(r=[{key:"componentWillUnmount",value:function(){this.state.timer&&this.unsubscribe()}},{key:"render",value:function(){var e=this.props.playedAgainWithSettings?"Play again":"Create game";return a.a.createElement("div",{className:"game-menu"},this.state.showConfirmation?a.a.createElement(J,{gameId:this.state.gameId,handleStartAdminGame:this.handleStartAdminGame,allPlayersJoined:this.state.allPlayersJoined}):null,a.a.createElement(L.a,null),a.a.createElement("div",{className:"menu"},a.a.createElement(X.a,null,a.a.createElement(G.a,{changeLanguage:this.props.changeLanguage,currentLanguage:this.props.language,showName:!0})),a.a.createElement(X.a,null,a.a.createElement(R,{toggleTimer:this.toggleTimer,setTime:this.setTime,timer:this.state.timer,time:this.state.time})),a.a.createElement(X.a,null,a.a.createElement(I,{validatePlayerName:this.validatePlayerName,alert:this.props.alert}),a.a.createElement(A,{removePlayer:this.removePlayer,reorderPlayers:this.reorderPlayers,players:this.state.playersNames})),a.a.createElement("button",{onClick:this.validateSettings,type:"submit"},a.a.createElement(o.a,null,e))))}}])&&$(n.prototype,r),l&&$(n,l),c}(r.Component);t.default=ee}}]);