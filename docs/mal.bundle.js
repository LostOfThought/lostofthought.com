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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/mal/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/mal/main.ts":
/*!*************************!*\
  !*** ./src/mal/main.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/mal/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);
console.log('Hi');


function onLoad() {
  document.body.innerHTML = `
            <canvas id="noise"></canvas>
<div id="content">
	<h1 id="title"><span class="glitch">Wel</span>co<span class="glitch-compact">m</span>e t<span class="glitch-compact">o</span><br/><span class="glitch-rand">lostofthought.com</span></h1>
	<h2 id="subtitle">A<span class="glitch-compact">r</span>e <span class="glitch-compact">y</span>ou <span class="glitch-rand">lost?</span></h2>
</div>
`;
  var canvas = document.getElementById('noise');
  var ctx = canvas.getContext('2d');
  window.addEventListener('resize', resizeCanvas, false);
  var canvasData = [];
  canvasData.length = 15;
  var rng;

  if (typeof window.crypto.getRandomValues === "function") {
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    rng = array[0] | 0;
  } else {
    rng = Math.random() * Math.pow(2, 32) | 0;
  }

  function next() {
    rng ^= rng << 13;
    rng ^= rng >> 17;
    rng ^= rng << 5;
    return rng;
  }

  var canvasIndex = 0;

  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    for (var i = 0; i < canvasData.length; i++) {
      canvasData[i] = ctx.getImageData(0, 0, canvas.width, canvas.height);

      for (var y = 0; y < canvasData[i].height; y++) {
        for (var x = 0; x < canvasData[i].width; x++) {
          var index = (x + y * canvasData[i].width) * 4;
          var bits = next();
          canvasData[i].data[index] = bits >> 24 & 0xFF;
          canvasData[i].data[index + 1] = bits >> 16 & 0xFF;
          canvasData[i].data[index + 2] = bits >> 8 & 0xFF;
          canvasData[i].data[index + 3] = bits >> 0 & 0xFF;
        }
      }
    }

    draw();
  }

  resizeCanvas();

  function draw() {
    if (++canvasIndex >= canvasData.length) {
      canvasIndex = 0;
    }

    ctx.putImageData(canvasData[canvasIndex], 0, 0);
  }

  function splitGlitch(element) {
    var chars = element.innerText.split('');
    element.innerText = '';
    chars.forEach(function (char) {
      var split = document.createElement('span');
      element.appendChild(split);
      split.classList.add('glitch-split');
      split.setAttribute('data-char', char);

      if (element.classList.contains('glitch')) {
        split.innerText = char.toUpperCase();
      }

      if (element.classList.contains('glitch-compact')) {
        split.innerText = char.toLowerCase();
      }

      if (element.classList.contains('glitch-rand')) {
        switch (Math.floor(Math.random() * 3)) {
          case 0:
            split.innerText = char.toUpperCase();
            break;

          case 1:
            split.innerText = char.toLowerCase();
            break;

          case 2:
            split.classList.remove('glitch-split');
            split.removeAttribute('data-char', char);
            split.innerText = char;
            break;
        }
      }

      var computed = window.getComputedStyle(split);
      split.style.width = computed.width;
      split.style.height = computed.height;
      split.innerText = char;
    });
  }

  var glitchClasses = [].concat(Array.from(document.getElementsByClassName('glitch')), Array.from(document.getElementsByClassName('glitch-compact')), Array.from(document.getElementsByClassName('glitch-rand')));
  glitchClasses.forEach(splitGlitch);
  var glitchElements = document.getElementsByClassName('glitch-split');
  var num = 32;

  function glitch() {
    Array.prototype.forEach.call(glitchElements, function (element) {
      switch (Math.floor(Math.random() * 5)) {
        case 0:
          element.innerText = element.getAttribute('data-char').toLowerCase();
          break;

        case 1:
          element.innerText = element.getAttribute('data-char').toUpperCase();
          break;

        case 2:
          element.innerText = String.fromCharCode(Math.floor(Math.random() * 93) + 33); //element.innerText = String.fromCharCode(num++);

          if (num === 94) {
            num = 32;
          }

          break;

        default:
          element.innerText = element.getAttribute('data-char');
      }
    });
  }

  draw();
  window.setInterval(draw, 16);
  glitch();
  window.setInterval(glitch, 100);
}

window.addEventListener("load", onLoad);

/***/ }),

/***/ "./src/mal/style.scss":
/*!****************************!*\
  !*** ./src/mal/style.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=mal.bundle.js.map