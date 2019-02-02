/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index/main.ts":
/*!***************************!*\
  !*** ./src/index/main.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/index/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);
console.log("Hi");function onLoad(){var e=Math.pow,f=Math.floor;function a(){return k^=k<<13,k^=k>>17,k^=k<<5,k}function b(){g.width=g.clientWidth,g.height=g.clientHeight;for(var b=0;b<j.length;b++){j[b]=h.getImageData(0,0,g.width,g.height);for(var d=0;d<j[b].height;d++)for(var e=0;e<j[b].width;e++){var f=4*(e+d*j[b].width),k=a();j[b].data[f]=255&k>>24,j[b].data[f+1]=255&k>>16,j[b].data[f+2]=255&k>>8,j[b].data[f+3]=255&k>>0}}c()}function c(){++m>=j.length&&(m=0),h.putImageData(j[m],0,0)}function d(){Array.prototype.forEach.call(o,function(a){switch(f(5*Math.random())){case 0:a.innerText=a.getAttribute("data-char").toLowerCase();break;case 1:a.innerText=a.getAttribute("data-char").toUpperCase();break;case 2:a.innerText=String.fromCharCode(f(93*Math.random())+33),94===p&&(p=32);break;default:a.innerText=a.getAttribute("data-char");}})}document.body.innerHTML=`
            <canvas id="noise"></canvas>
<div id="content">
	<h1 id="title"><span class="glitch">Wel</span>co<span class="glitch-compact">m</span>e t<span class="glitch-compact">o</span><br/><span class="glitch-rand">lostofthought.com</span></h1>
	<h2 id="subtitle">A<span class="glitch-compact">r</span>e <span class="glitch-compact">y</span>ou <span class="glitch-rand">lost?</span></h2>
</div>
`;var g=document.getElementById("noise"),h=g.getContext("2d");window.addEventListener("resize",b,!1);var j=[];j.length=15;var k;if("function"==typeof window.crypto.getRandomValues){var l=new Uint32Array(1);window.crypto.getRandomValues(l),k=0|l[0]}else k=0|Math.random()*e(2,32);var m=0;b();var n=[].concat(Array.from(document.getElementsByClassName("glitch")),Array.from(document.getElementsByClassName("glitch-compact")),Array.from(document.getElementsByClassName("glitch-rand")));n.forEach(function(a){var b=a.innerText.split("");a.innerText="",b.forEach(function(b){var c=document.createElement("span");if(a.appendChild(c),c.classList.add("glitch-split"),c.setAttribute("data-char",b),a.classList.contains("glitch")&&(c.innerText=b.toUpperCase()),a.classList.contains("glitch-compact")&&(c.innerText=b.toLowerCase()),a.classList.contains("glitch-rand"))switch(f(3*Math.random())){case 0:c.innerText=b.toUpperCase();break;case 1:c.innerText=b.toLowerCase();break;case 2:c.classList.remove("glitch-split"),c.removeAttribute("data-char",b),c.innerText=b;}var d=window.getComputedStyle(c);c.style.width=d.width,c.style.height=d.height,c.innerText=b})});var o=document.getElementsByClassName("glitch-split"),p=32;c(),window.setInterval(c,16),d(),window.setInterval(d,100)}window.addEventListener("load",onLoad);

/***/ }),

/***/ "./src/index/style.scss":
/*!******************************!*\
  !*** ./src/index/style.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=index.bundle.js.map