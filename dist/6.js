(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{261:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(82),m=a(7),u=(a(87),a(19)),l=function(e){return r.a.createElement("li",{className:"sub"},r.a.createElement(u.a,null,r.a.createElement("div",{className:"player-name"},e.playerName),r.a.createElement("input",{id:"sub-points".concat(e.index),type:"number",placeholder:"0"})))},s=a(37);function o(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(a);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return c(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}t.default=function(e){var t=function(t){t.preventDefault();var a=o(e.players);a.map((function(e,t){var a=document.getElementById("sub-points".concat(t)).value;return e.currentScore-=a})),m.a.collection("games").doc(e.gameId).update({players:a,pointsSubtracted:!0}),e.renderGameSummary(a)};return r.a.createElement("div",{className:"game-summary"},r.a.createElement(s.a,null),r.a.createElement("h2",null,r.a.createElement(i.a,null,"Subtract points of unused letters")),r.a.createElement("ul",{className:"results"},o(e.players).map((function(e,t){return r.a.createElement(l,{playerName:e.playerName,key:t,index:t})}))),r.a.createElement("button",{onClick:function(a){for(var n=0;n<e.players.length;n++){var r=document.getElementById("sub-points".concat(n)).value;if((r=parseFloat(r))||(r=0),r<0||!Number.isInteger(r)){return void e.alert("alert","Points value must be positive integer")}}t(a)}},r.a.createElement(i.a,null,"Continue")))}},87:function(e,t,a){var n=a(24),r=a(88);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var i={insert:"head",singleton:!1};n(r,i);e.exports=r.locals||{}},88:function(e,t,a){(t=a(25)(!1)).push([e.i,".game-summary h2{margin-bottom:20px}.game-summary button{margin:10px auto;display:block}.game-summary .card{width:100%}.game-summary .card button{margin:30px auto;height:auto;max-width:95%}.game-summary .results{text-align:center;font-size:1.3em;padding:0 5px;display:flex;flex-direction:column;align-items:center}.game-summary .results .card{justify-content:unset}.game-summary .results li{margin:5px 0;width:100%;max-width:400px}.game-summary .results li.sub{display:inline-flex;align-items:center}.game-summary .results li.sub .card{flex-direction:row;justify-content:unset}.game-summary .results li.sub .player-name{padding-left:5px;width:50%;text-align:end}.game-summary .results input{width:30%;max-width:50px;margin-left:10px}.game-summary .results input::-webkit-time-picker-indicator,.game-summary .results input::-webkit-clear-button,.game-summary .results input::-webkit-inner-spin-button{display:none;-webkit-appearance:none}.game-summary .results .player-name{font-size:1.4em;margin:5px 0;text-align:center;color:#626262}.game-summary .results .player-name .place{display:inline-flex;justify-content:center;align-items:center;padding:3px 0}.game-summary .results .player-name .place img{margin-left:10px}.game-summary .results span{font-weight:600}.game-summary .player-result{width:100%}\n",""]),e.exports=t}}]);