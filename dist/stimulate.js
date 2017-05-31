(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("stimulate", [], factory);
	else if(typeof exports === 'object')
		exports["stimulate"] = factory();
	else
		root["stimulate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sharedTimingRaf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return sharedTimingCaf; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__raf__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__raf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__raf__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var SharedTiming = function () {
	function SharedTiming() {
		_classCallCheck(this, SharedTiming);

		this.running = {
			count: 0,
			limit: 0
		};
		this.stamps = {
			start: null,
			raf: null
		};
		this.rafIdRegistry = {};
	}

	_createClass(SharedTiming, [{
		key: 'makeStamp',
		value: function makeStamp(stamp, reset) {
			if (!this.stamps[stamp] || reset) {
				this.stamps[stamp] = Date.now();
			}
			return this.stamps[stamp];
		}
	}, {
		key: 'raf',
		value: function raf(cb) {
			var _this = this;

			if (!this.running.count) {
				this.running.count = 1;
			} else {
				this.running.count++;
			}
			var rafId = __WEBPACK_IMPORTED_MODULE_0__raf___default()(function () {
				delete _this.rafIdRegistry[rafId];
				_this.stamps.start = null;
				if (!_this.running.limit) {
					_this.running.limit = _this.running.count;
					_this.makeStamp('raf', true);
					_this.running.count = 0;
				}
				_this.running.limit--;
				cb();
			});
			this.rafIdRegistry[rafId] = true;
			return rafId;
		}
	}, {
		key: 'caf',
		value: function caf(rafId) {
			if (rafId && this.rafIdRegistry[rafId]) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__raf__["cancel"])(rafId);
				this.stamps.start = null;
				this.running.count--;
				delete this.rafIdRegistry[rafId];
			}
		}
	}]);

	return SharedTiming;
}();

var sharedTiming = new SharedTiming();

function sharedTimingRaf() {
	return sharedTiming.raf.apply(sharedTiming, arguments);
}
function sharedTimingCaf() {
	return sharedTiming.caf.apply(sharedTiming, arguments);
}


/* harmony default export */ __webpack_exports__["a"] = (sharedTiming);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(28)
  , createDesc = __webpack_require__(33);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(9)
  , defined = __webpack_require__(6);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_fn_object_assign__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_fn_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_fn_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stimulate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sharedTiming__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stimulate", function() { return __WEBPACK_IMPORTED_MODULE_1__stimulate__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sharedTiming", function() { return __WEBPACK_IMPORTED_MODULE_2__sharedTiming__["sharedTiming"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return __WEBPACK_IMPORTED_MODULE_2__sharedTiming__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "caf", function() { return __WEBPACK_IMPORTED_MODULE_2__sharedTiming__["d"]; });





/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__stimulate__["a" /* default */]);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = Date.now,
    root = typeof window === 'undefined' ? global : window,
    vendors = ['moz', 'webkit'],
    suffix = 'AnimationFrame',
    raf = root['request' + suffix],
    caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

for (var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix];
  caf = root[vendors[i] + 'Cancel' + suffix] || root[vendors[i] + 'CancelRequest' + suffix];
}

// Some versions of FF have rAF but not cAF
if (!raf || !caf) {
  var last = 0,
      id = 0,
      queue = [],
      frameDuration = 1000 / 60;

  raf = function raf(callback) {
    if (queue.length === 0) {
      var _now = now(),
          next = Math.max(10, frameDuration - (_now - last));
      last = next + _now;
      setTimeout(function () {
        var cp = queue.slice(0);
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0;
        for (var i = 0; i < cp.length; i++) {
          if (!cp[i].cancelled) {
            try {
              cp[i].callback(last);
            } catch (e) {
              setTimeout(function () {
                throw e;
              }, 0);
            }
          }
        }
      }, frameDuration);
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    });
    return id;
  };

  caf = function caf(handle) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].handle === handle) {
        queue[i].cancelled = true;
      }
    }
  };
}

module.exports = function (fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn);
};
module.exports.cancel = function () {
  caf.apply(root, arguments);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export stimulate */
/* unused harmony export StimulationAspect */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sharedTiming__ = __webpack_require__(5);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint no-inner-declarations:0 */
/* eslint-disable class-methods-use-this */


var StimulationAspect = function () {
  function StimulationAspect(options) {
    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'root';
    var parent = arguments[2];

    _classCallCheck(this, StimulationAspect);

    this.parent = parent;
    this.debug = debug;
    this.options = options;
    if (!options.noInit) {
      this.init();
    }
  }

  _createClass(StimulationAspect, [{
    key: 'init',
    value: function init(resetAll) {
      var _this = this;

      this.aspects = {};
      if (!this.persistedSettings) {
        this.persistedSettings = {};
      }
      this.inheritableDefaults = {
        duration: 1000,
        delay: 0,
        delayEveryLoop: false,
        loop: false,
        skipZeroFrame: true,
        endless: false,
        reverse: false,
        usePersistedSettings: false
      };
      this.defaultSettings = {
        delayAddsParentDelay: false,
        from: 0,
        to: 1,
        easing: null,
        aspects: this.aspects,
        frame: null,
        chainedStop: true
      };
      this.settings = _extends({}, this.defaultSettings, this.options);
      if (this.lookupSetting('usePersistedSettings')) {
        Object.assign(this.settings, this.persistedSettings);
      }

      this.aspects = this.settings.aspects;
      if (this.parent) {
        this.aspectTree = this.parent.aspectTree;
      } else {
        this.aspectTree = this;
      }

      var reverse = !!this.lookupSetting('reverse');
      this.previousReverseSetting = reverse;
      var progressDefaults = this.getProgressDefault(reverse);
      if (!this.progress) {
        this.progress = progressDefaults;
        this.progress.aspects = {};
      } else {
        Object.assign(this.progress, progressDefaults);
      }

      this.currentLoopCount = 1;
      this.lastDelaySettingWhileDelaying = null;
      this.running = true;

      this.nextRafId = null;
      this.timestamps = {};

      __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["a" /* default */].makeStamp('start');
      this.timestamps.start = __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["a" /* default */].stamps.start;
      this.timestamps.recentRaf = null;

      this.frameCount = 0;

      this.iterateAspectNames(function (name) {
        if (!resetAll) {
          _this.aspects[name] = new StimulationAspect(_extends({}, _this.settings.aspects[name]), name, _this);
          _this.progress.aspects[name] = _this.aspects[name].progress;
        } else {
          _this.aspects[name].init(true);
        }
      });
      var skipZeroFrame = this.lookupSetting('skipZeroFrame');
      this.recurse(!skipZeroFrame);
    }
  }, {
    key: 'getCumulativeDelay',
    value: function getCumulativeDelay() {
      var total = this.lookupSetting('delay');
      if (this.parent && this.settings.delayAddsParentDelay) {
        total += this.parent.getCumulativeDelay();
      }
      return total;
    }
  }, {
    key: 'updateSettings',
    value: function updateSettings(changeDict) {
      if (this.lookupSetting('usePersistedSettings')) {
        Object.assign(this.persistedSettings, changeDict);
      }
      Object.assign(this.settings, changeDict);

      return this;
    }
  }, {
    key: 'lookupSetting',
    value: function lookupSetting(settingsName) {
      if (typeof this.settings[settingsName] !== 'undefined' && this.settings[settingsName] !== 'inherit') {
        return this.settings[settingsName];
      } else if (this.parent) {
        return this.parent.lookupSetting(settingsName);
      }
      return this.inheritableDefaults[settingsName];
    }
  }, {
    key: 'iterateAspectNames',
    value: function iterateAspectNames(cb) {
      this.settings.aspectNames = Object.keys(this.settings.aspects);
      this.settings.aspectNames.forEach(function (name) {
        cb(name);
      });
    }
  }, {
    key: 'getProgressDefault',
    value: function getProgressDefault(reverse) {
      if (reverse) {
        return {
          ratioCompleted: 1,
          easedRatioCompleted: 1,
          tweened: this.settings.to,
          easedTweened: this.settings.to
        };
      }
      return {
        ratioCompleted: 0,
        easedRatioCompleted: 0,
        tweened: this.settings.from,
        easedTweened: this.settings.from
      };
    }
  }, {
    key: 'getTween',
    value: function getTween(from, to, ratioCompleted) {
      return from + ratioCompleted * (to - from);
    }
  }, {
    key: 'calculateRatio',
    value: function calculateRatio(options) {
      var startDelay = options.start + options.delay;
      var diff = options.later - startDelay;
      var ratioCompleted = diff / options.duration;
      return ratioCompleted;
    }
  }, {
    key: 'recurse',
    value: function recurse(resetTimestampStart, resetProgress) {
      var _this2 = this;

      if (this.running) {
        this.nextRafId = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sharedTiming__["b" /* raf */])(function () {
          if (_this2.running) {
            _this2.timestamps.recentRaf = __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["a" /* default */].stamps.raf;
            if (resetTimestampStart) {
              _this2.timestamps.start = _this2.timestamps.recentRaf;
            }

            var reverse = !!_this2.lookupSetting('reverse');
            var reverseIsNegativeOne = reverse ? -1 : 1;
            var changedDirections = _this2.previousReverseSetting !== reverse;
            var loop = _this2.lookupSetting('loop');

            if (changedDirections) {
              _this2.currentLoopCount = loop + 1 - _this2.currentLoopCount;
            }

            _this2.previousReverseSetting = reverse;

            if (resetProgress) {
              Object.assign(_this2.progress, _this2.getProgressDefault(reverse));
            }

            var delay = 0;
            if (_this2.lastDelaySettingWhileDelaying !== null) {
              delay = _this2.lastDelaySettingWhileDelaying;
            } else {
              delay = _this2.getCumulativeDelay();
            }

            var duration = _this2.lookupSetting('duration');

            var ratioCompleted = _this2.calculateRatio({
              start: _this2.timestamps.start,
              later: _this2.timestamps.recentRaf,
              delay: delay,
              duration: duration
            });

            var delayEveryLoop = _this2.lookupSetting('delayEveryLoop');
            if (ratioCompleted > 0 && ratioCompleted < 1 && _this2.lastDelaySettingWhileDelaying === null) {
              _this2.lastDelaySettingWhileDelaying = delay;
              if (!_this2.lookupSetting('skipZeroFrame') && delay && _this2.currentLoopCount <= 1 || delay && delayEveryLoop && _this2.currentLoopCount > 1) {
                _this2.timestamps.start = _this2.timestamps.recentRaf - delay;
                ratioCompleted = _this2.calculateRatio({
                  start: _this2.timestamps.start,
                  later: _this2.timestamps.recentRaf,
                  delay: delay,
                  duration: duration
                });
              }
            }

            if (changedDirections) {
              if (_this2.lastDelaySettingWhileDelaying === null) {
                _this2.currentLoopCount--;
                _this2.progress.ratioCompleted = -reverseIsNegativeOne * (1 + (-reverseIsNegativeOne * _this2.progress.ratioCompleted + delay / duration));
              }

              var reverseAdjustedRatioCompleted = _this2.progress.ratioCompleted;
              if (reverse) {
                reverseAdjustedRatioCompleted = 1 - _this2.progress.ratioCompleted;
              }
              var diff = reverseAdjustedRatioCompleted * duration;
              var startDelay = _this2.timestamps.recentRaf - diff;
              _this2.timestamps.start = startDelay - delay;

              ratioCompleted = _this2.calculateRatio({
                start: _this2.timestamps.start,
                later: _this2.timestamps.recentRaf,
                delay: delay,
                duration: duration
              });
            }

            if (reverse) {
              ratioCompleted = 1 - ratioCompleted;
            }
            var ratioLimit = 1;
            var withinLimit = ratioCompleted < ratioLimit;
            var from = _this2.settings.from;
            var to = _this2.settings.to;

            if (reverse) {
              ratioLimit = 0;
              withinLimit = ratioCompleted > ratioLimit;
            }

            var durationAchieved = false;
            var overlapLoop = false;
            var stillLooping = false;
            var p = _this2.progress;
            p.ratioCompleted = ratioCompleted;
            if (withinLimit || !duration || _this2.lookupSetting('endless')) {
              if (_this2.settings.easing) {
                p.easedRatioCompleted = _this2.settings.easing(p.ratioCompleted);
              } else {
                p.easedRatioCompleted = p.ratioCompleted;
              }
              p.tweened = _this2.getTween(from, to, p.ratioCompleted);
              p.easedTweened = _this2.getTween(from, to, p.easedRatioCompleted);
            } else {
              var needsAnotherLoop = loop === true || loop && _this2.currentLoopCount < loop;
              if (needsAnotherLoop && !delayEveryLoop) {
                p.ratioCompleted = -reverseIsNegativeOne + ratioCompleted;
                _this2.timestamps.start = _this2.timestamps.start + duration;
                if (_this2.settings.easing) {
                  p.easedRatioCompleted = _this2.settings.easing(p.ratioCompleted);
                } else {
                  p.easedRatioCompleted = p.ratioCompleted;
                }
                p.tweened = _this2.getTween(from, to, p.ratioCompleted);
                p.easedTweened = _this2.getTween(from, to, p.easedRatioCompleted);
                overlapLoop = true;
              } else {
                p.ratioCompleted = ratioLimit;
                p.easedRatioCompleted = ratioLimit;
                p.tweened = to;
                p.easedTweened = to;
                if (reverse) {
                  p.tweened = from;
                  p.easedTweened = from;
                }
              }

              if (needsAnotherLoop) {
                _this2.currentLoopCount++;
                stillLooping = true && !overlapLoop;
                _this2.lastDelaySettingWhileDelaying = null;
              } else {
                durationAchieved = true;
              }
            }

            var withinRatioBounds = _this2.progress.ratioCompleted >= 0;
            if (reverse) {
              withinRatioBounds = _this2.progress.ratioCompleted <= 1;
            }

            if (_this2.settings.frame && withinRatioBounds) {
              // const startExtreme = reverse ? 1 : 0;
              // if (this.settings.itDescription) {
              //   console.log(this.settings.itDescription);
              // }
              // console.log(
              // this.lookupSetting('skipZeroFrame'),
              // this.frameCount === 0,
              // ratioCompleted,startExtreme
              // );
              // if (
              // this.settings.boomer && this.lookupSetting('skipZeroFrame') &&
              // this.frameCount === 0 && delay && startExtreme === ratioCompleted
              // ) {
              // console.log('vvvvvvvvvvv');
              // console.log('--- wtf ---');
              // console.log('--- ' + this.settings.itDescription);
              // console.log(this.timestamps.start,this.timestamps.raf);
              // console.log('^^^^^^^^^^^');
              // }
              // if (this.settings.boomer) {
              //   console.log('vvvvvvvvvvv');
              //   console.log(this.timestamps.start,this.timestamps.recentRaf,ratioCompleted);
              //   console.log('^^^^^^^^^^^');
              // }
              var progressChanges = _this2.settings.frame.apply(_this2, [_this2.progress]);
              _this2.iterateFrameCbs(_this2.progress);
              _this2.frameCount++;
              Object.assign(_this2.progress, progressChanges);
            }

            if (!durationAchieved) {
              _this2.recurse(stillLooping, stillLooping);
            } else {
              _this2.running = false;
              if (_this2.settings.onComplete) {
                _this2.settings.onComplete.apply(_this2, [_this2.progress]);
              }
            }
          }
        });
      }
    }
  }, {
    key: 'onFrame',
    value: function onFrame(cb) {
      var _this3 = this;

      if (!this.callbacks) {
        this.callbacks = {};
      }
      if (!this.callbacks.frame) {
        this.callbacks.frame = [];
      }
      this.callbacks.frame.push(cb);
      return function () {
        _this3.callbacks = _this3.callbacks.frame.filter(function (accum, cachedCb) {
          return cachedCb !== cb;
        });
      };
    }
  }, {
    key: 'iterateFrameCbs',
    value: function iterateFrameCbs() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (this.callbacks && this.callbacks.frame) {
        this.callbacks.frame.forEach(function (cb) {
          cb.apply(undefined, args);
        });
      }
    }
  }, {
    key: 'resetAll',
    value: function resetAll() {
      this.stop(true);
      this.init(true);

      return this;
    }
  }, {
    key: 'stop',
    value: function stop(skipCallback) {
      var _this4 = this;

      this.running = false;
      __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["a" /* default */].caf(this.nextRafId);
      if (this.settings.onStop) {
        if (!skipCallback) {
          this.settings.onStop.apply(this, [this.progress]);
        }
      }
      this.iterateAspectNames(function (name) {
        var aspect = _this4.aspects[name];
        if (aspect.settings.chainedStop) {
          _this4.aspects[name].stop(skipCallback);
        }
      });

      return this;
    }
  }, {
    key: 'resume',
    value: function resume() {
      var _this5 = this;

      if (!this.running) {
        __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["a" /* default */].makeStamp('start');
        var duration = this.lookupSetting('duration');
        var reverse = this.lookupSetting('reverse');

        var adjustment = this.progress.ratioCompleted * duration;
        if (reverse) {
          adjustment = (1 - this.progress.ratioCompleted) * duration;
        }
        if (this.lastDelaySettingWhileDelaying) {
          adjustment += this.lastDelaySettingWhileDelaying;
        }
        this.timestamps.start = __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["a" /* default */].stamps.start - adjustment;
        this.timestamps.recentRaf = null;
        this.running = true;

        this.iterateAspectNames(function (name) {
          _this5.aspects[name].resume();
        });

        this.recurse();
      }
      return this;
    }
  }, {
    key: 'birthAspect',
    value: function birthAspect(name, settings) {
      if (this.aspects[name]) {
        this.aspects[name].stop();
      }
      this.aspects[name] = new StimulationAspect(_extends({}, settings), name, this);

      return this.aspects[name];
    }
  }, {
    key: 'progressAt',
    value: function progressAt(path) {
      var pathSplit = path.split('.');
      var place = this.aspectTree;
      if (path) {
        try {
          pathSplit.forEach(function (name) {
            place = place.aspects[name];
          });
        } catch (e) {
          throw new Error('Error: You specified an invalid aspect path for .progressAt().');
        }
      }
      return place ? place.progress : place;
    }
  }, {
    key: 'aspectAt',
    value: function aspectAt(path) {
      var pathSplit = path.split('.');
      var place = this.aspectTree;
      if (path) {
        try {
          pathSplit.forEach(function (name) {
            place = place.aspects[name];
          });
        } catch (e) {
          throw new Error('Error: You specified an invalid aspect path for .aspectAt().');
        }
      }
      return place;
    }
  }]);

  return StimulationAspect;
}();

var stimulate = function stimulate() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return new (Function.prototype.bind.apply(StimulationAspect, [null].concat(args)))();
};

/* harmony default export */ __webpack_exports__["a"] = (stimulate);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
module.exports = __webpack_require__(1).Object.assign;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11)
  , toLength  = __webpack_require__(38)
  , toIndex   = __webpack_require__(37);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(18);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(0).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(0)
  , core      = __webpack_require__(1)
  , hide      = __webpack_require__(8)
  , redefine  = __webpack_require__(34)
  , ctx       = __webpack_require__(22)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(23)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(31)
  , gOPS     = __webpack_require__(29)
  , pIE      = __webpack_require__(32)
  , toObject = __webpack_require__(39)
  , IObject  = __webpack_require__(9)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(19)
  , IE8_DOM_DEFINE = __webpack_require__(26)
  , toPrimitive    = __webpack_require__(40)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(7)
  , toIObject    = __webpack_require__(11)
  , arrayIndexOf = __webpack_require__(20)(false)
  , IE_PROTO     = __webpack_require__(35)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(30)
  , enumBugKeys = __webpack_require__(24);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(0)
  , hide      = __webpack_require__(8)
  , has       = __webpack_require__(7)
  , SRC       = __webpack_require__(12)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(1).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(36)('keys')
  , uid    = __webpack_require__(12);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(10)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(10)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(6);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(25);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(27)});

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ })
/******/ ]);
});
//# sourceMappingURL=stimulate.js.map