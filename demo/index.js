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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 118);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.4.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sharedTimingRaf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return sharedTimingCaf; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__raf__ = __webpack_require__(41);
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


/* harmony default export */ __webpack_exports__["d"] = (sharedTiming);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(27),
    createDesc = __webpack_require__(32);
module.exports = __webpack_require__(2) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil,
    floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(9),
    defined = __webpack_require__(6);
module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var id = 0,
    px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
module.exports = __webpack_require__(1).Object.assign;

/***/ }),
/* 14 */
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

      __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["d" /* default */].makeStamp('start');
      this.timestamps.start = __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["d" /* default */].stamps.start;
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
            _this2.timestamps.recentRaf = __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["d" /* default */].stamps.raf;
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
      __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["d" /* default */].caf(this.nextRafId);
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
        __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["d" /* default */].makeStamp('start');
        var duration = this.lookupSetting('duration');
        var reverse = this.lookupSetting('reverse');

        var adjustment = this.progress.ratioCompleted * duration;
        if (reverse) {
          adjustment = (1 - this.progress.ratioCompleted) * duration;
        }
        if (this.lastDelaySettingWhileDelaying) {
          adjustment += this.lastDelaySettingWhileDelaying;
        }
        this.timestamps.start = __WEBPACK_IMPORTED_MODULE_0__sharedTiming__["d" /* default */].stamps.start - adjustment;
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
/* 15 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_fn_object_assign__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_fn_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_fn_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stimulate__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sharedTiming__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stimulate", function() { return __WEBPACK_IMPORTED_MODULE_1__stimulate__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sharedTiming", function() { return __WEBPACK_IMPORTED_MODULE_2__sharedTiming__["sharedTiming"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return __WEBPACK_IMPORTED_MODULE_2__sharedTiming__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "caf", function() { return __WEBPACK_IMPORTED_MODULE_2__sharedTiming__["c"]; });





/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__stimulate__["a" /* default */]);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11),
    toLength = __webpack_require__(37),
    toIndex = __webpack_require__(36);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this),
        length = toLength(O.length),
        index = toIndex(fromIndex, length),
        value;
    // Array#includes uses SameValueZero equality algorithm
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      if (value != value) return true;
      // Array#toIndex ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(17);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4),
    document = __webpack_require__(0).document
// in old IE typeof document.createElement is 'object'
,
    is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0),
    core = __webpack_require__(1),
    hide = __webpack_require__(8),
    redefine = __webpack_require__(33),
    ctx = __webpack_require__(21),
    PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F,
      IS_GLOBAL = type & $export.G,
      IS_STATIC = type & $export.S,
      IS_PROTO = type & $export.P,
      IS_BIND = type & $export.B,
      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
      key,
      own,
      out,
      exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(22)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)

var getKeys = __webpack_require__(30),
    gOPS = __webpack_require__(28),
    pIE = __webpack_require__(31),
    toObject = __webpack_require__(38),
    IObject = __webpack_require__(9),
    $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {},
      B = {},
      S = Symbol(),
      K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target),
      aLen = arguments.length,
      index = 1,
      getSymbols = gOPS.f,
      isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]),
        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
        length = keys.length,
        j = 0,
        key;
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }return T;
} : $assign;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(18),
    IE8_DOM_DEFINE = __webpack_require__(25),
    toPrimitive = __webpack_require__(39),
    dP = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7),
    toIObject = __webpack_require__(11),
    arrayIndexOf = __webpack_require__(19)(false),
    IE_PROTO = __webpack_require__(34)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object),
      i = 0,
      result = [],
      key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(29),
    enumBugKeys = __webpack_require__(23);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0),
    hide = __webpack_require__(8),
    has = __webpack_require__(7),
    SRC = __webpack_require__(12)('src'),
    TO_STRING = 'toString',
    $toString = Function[TO_STRING],
    TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(1).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else {
    if (!safe) {
      delete O[key];
      hide(O, key, val);
    } else {
      if (O[key]) O[key] = val;else hide(O, key, val);
    }
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(35)('keys'),
    uid = __webpack_require__(12);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0),
    SHARED = '__core-js_shared__',
    store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(10),
    max = Math.max,
    min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(10),
    min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(6);
module.exports = function (it) {
  return Object(defined(it));
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(24);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(26) });

/***/ }),
/* 41 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(91);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

function bounceOut(t) {
  var a = 4.0 / 11.0;
  var b = 8.0 / 11.0;
  var c = 9.0 / 10.0;

  var ca = 4356.0 / 361.0;
  var cb = 35442.0 / 1805.0;
  var cc = 16061.0 / 1805.0;

  var t2 = t * t;

  return t < a ? 7.5625 * t2 : t < b ? 9.075 * t2 - 9.9 * t + 3.4 : t < c ? ca * t2 - cb * t + cc : 10.8 * t * t - 20.52 * t + 10.72;
}

module.exports = bounceOut;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(102);

/** Built-in value references. */
var _Symbol = root.Symbol;

module.exports = _Symbol;

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ready; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return demoCoords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setupEl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_prefixer__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_prefixer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_prefixer__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




console.log('asdf');
var ready = function ready(fn) {
	if (document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
};
var translateVal = function translateVal() {
	var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	return 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
};
var xy = function xy(el, coords) {
	var styles = __WEBPACK_IMPORTED_MODULE_1_react_prefixer___default()({
		transform: translateVal(coords.x, coords.y, 0)
	});
	Object.assign(el.style, styles);
};

var demoCoords = {
	start: {
		x: 0,
		y: 0
	},
	end: {
		x: __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["demoWidth"] - __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["ballDiameter"],
		y: __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["demoHeight"] - __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["ballDiameter"]
	}
};

var setupEl = function setupEl(o) {
	var el = o.el;
	if (o.tag) {
		el = document.createElement(o.tag);
	}
	if (!el) {
		el = document.createElement('div');
	}

	if (typeof o.text !== 'undefined') {
		el.textContent = o.text;
	}

	if (o.className) {
		el.className = o.className;
	}

	if (o.xy) {
		xy(el, o.xy);
	}

	if (o.onClick) {
		el.addEventListener('click', o.onClick);
	}

	if (o.onChange) {
		el.addEventListener('change', o.onChange);
	}

	if (o.onInput) {
		el.addEventListener('input', o.onInput);
	}

	if (o.attrs) {
		Object.keys(o.attrs).forEach(function (attrName) {
			el.setAttribute(attrName, o.attrs[attrName]);
		});
	}

	if (o.appendTo) {
		o.appendTo.appendChild(el);
	}

	if (o.children) {
		o.children.forEach(function (child) {
			if (child.el) {
				el.appendChild(child.el);
			} else {
				setupEl(_extends({}, child, {
					appendTo: el
				}));
			}
		});
	}
	return {
		el: el,
		update: function update(options) {
			setupEl(_extends({
				xy: o.xy
			}, options, {
				el: el
			}));
		}
	};
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol = __webpack_require__(44),
    getRawTag = __webpack_require__(98),
    objectToString = __webpack_require__(100);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

module.exports = isObjectLike;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = {
	"qwer": 20,
	"a": {
		"b": 2
	},
	"demoHeight": 400,
	"demoWidth": 600,
	"ballDiameter": 20,
	"demoDuration": 3000
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
	'backInOut': __webpack_require__(55),
	'backIn': __webpack_require__(56),
	'backOut': __webpack_require__(57),
	'bounceInOut': __webpack_require__(58),
	'bounceIn': __webpack_require__(59),
	'bounceOut': __webpack_require__(43),
	'circInOut': __webpack_require__(60),
	'circIn': __webpack_require__(61),
	'circOut': __webpack_require__(62),
	'cubicInOut': __webpack_require__(63),
	'cubicIn': __webpack_require__(64),
	'cubicOut': __webpack_require__(65),
	'elasticInOut': __webpack_require__(66),
	'elasticIn': __webpack_require__(67),
	'elasticOut': __webpack_require__(68),
	'expoInOut': __webpack_require__(69),
	'expoIn': __webpack_require__(70),
	'expoOut': __webpack_require__(71),
	'linear': __webpack_require__(72),
	'quadInOut': __webpack_require__(73),
	'quadIn': __webpack_require__(74),
	'quadOut': __webpack_require__(75),
	'quartInOut': __webpack_require__(76),
	'quartIn': __webpack_require__(77),
	'quartOut': __webpack_require__(78),
	'quintInOut': __webpack_require__(79),
	'quintIn': __webpack_require__(80),
	'quintOut': __webpack_require__(81),
	'sineInOut': __webpack_require__(82),
	'sineIn': __webpack_require__(83),
	'sineOut': __webpack_require__(84)
};

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export buildDemoUI */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(45);


var duration = __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["demoDuration"];
var buildDemoUI = function buildDemoUI(ball, stimulation) {
	var coords = __WEBPACK_IMPORTED_MODULE_1__util__["c" /* demoCoords */];
	var reverse = false;
	var demoEl = document.getElementById('demo');

	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* setupEl */])({
		className: 'demo',
		tag: 'div',
		appendTo: !!demoEl ? demoEl : document.body,
		children: [{
			tag: 'div',
			className: 'stage',
			children: [ball]
		}, {
			tag: 'button',
			text: 'Reset',
			onClick: function onClick() {
				stimulation.resetAll();
			}
		}, {
			tag: 'button',
			text: 'Stop all',
			onClick: function onClick() {
				stimulation.stop();
			}
		}, {
			tag: 'button',
			text: 'Resume',
			onClick: function onClick() {
				stimulation.resume();
			}
		}, {
			tag: 'button',
			text: 'Stop X',
			onClick: function onClick() {
				stimulation.aspects.x.stop();
			}
		}, {
			tag: 'button',
			text: 'Reverse',
			onClick: function onClick() {
				reverse = !reverse;
				stimulation.updateSettings({
					reverse: reverse
				});
			}
		}, {
			tag: 'label',
			text: 'Loop:',
			children: [{
				tag: 'input',
				onChange: function onChange(e) {
					stimulation.updateSettings({
						loop: e.target.checked
					});

					if (!stimulation.running && e.target.checked) {
						stimulation.resetAll();
					}
				},
				attrs: {
					type: 'checkbox'
				}
			}]
		}, {
			tag: 'hr'
		}, {
			tag: 'label',
			text: 'Duration:',
			children: [{
				tag: 'input',
				onInput: function onInput(e) {
					stimulation.updateSettings({
						duration: +e.target.value
					});
				},
				attrs: {
					type: 'range',
					min: 1,
					max: 3000,
					value: duration
				}
			}]
		}, {
			tag: 'label',
			text: 'Delay:',
			children: [{
				tag: 'input',
				onInput: function onInput(e) {
					stimulation.updateSettings({
						delay: +e.target.value
					});
				},
				attrs: {
					type: 'range',
					min: 0,
					max: 1000,
					value: 0
				}
			}]
		}, {
			tag: 'hr'
		}, {
			tag: 'label',
			text: 'From X:',
			children: [{
				tag: 'input',
				onInput: function onInput(e) {
					stimulation.aspects.x.updateSettings({
						from: +e.target.value
					});
				},
				attrs: {
					type: 'range',
					min: 0,
					max: __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["demoWidth"] - __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["ballDiameter"],
					value: coords.start.x
				}
			}]
		}, {
			tag: 'label',
			text: 'To X:',
			children: [{
				tag: 'input',
				onInput: function onInput(e) {
					stimulation.aspects.x.updateSettings({
						to: +e.target.value
					});
				},
				attrs: {
					type: 'range',
					min: 0,
					max: __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["demoWidth"] - __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["ballDiameter"],
					value: coords.end.x
				}
			}]
		}, {
			tag: 'hr'
		}, {
			tag: 'label',
			text: 'From Y:',
			children: [{
				tag: 'input',
				onInput: function onInput(e) {
					stimulation.aspects.y.updateSettings({
						from: +e.target.value
					});
				},
				attrs: {
					type: 'range',
					min: 0,
					max: __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["demoHeight"] - __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["ballDiameter"],
					value: coords.start.y
				}
			}]
		}, {
			tag: 'label',
			text: 'To Y:',
			children: [{
				tag: 'input',
				onInput: function onInput(e) {
					stimulation.aspects.y.updateSettings({
						to: +e.target.value
					});
				},
				attrs: {
					type: 'range',
					min: 0,
					max: __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["demoHeight"] - __WEBPACK_IMPORTED_MODULE_0__cssJsSharedConstants_json__["ballDiameter"],
					value: coords.end.y
				}
			}]
		}]
	});
};

/* harmony default export */ __webpack_exports__["a"] = (buildDemoUI);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export easings */
// https://www.kirupa.com/forum/showthread.php?300358-Reversing-an-easing-function
// var reversedEase = function(originalEase,completedRatio, duration) {
//     return 1 - (originalEase(completedRatio));
// }

// adapted from https://raw.github.com/michaelvillar/dynamics.js/master/src/dynamics.coffee
var applyDefaults = function applyDefaults(options, defaults) {
    var k, results, v;
    results = [];
    for (k in defaults) {
        v = defaults[k];
        results.push(options[k] != null ? options[k] : options[k] = v);
    }
    return results;
};
var defaults = {
    spring: {
        frequency: 300,
        friction: 200,
        anticipationSize: 0,
        anticipationStrength: 0
    }
};
var dynamics = {};
dynamics.spring = function (options) {
    var A1, A2, decal, frequency, friction, s;
    if (options == null) {
        options = {};
    }
    applyDefaults(options, defaults.spring);
    frequency = Math.max(1, options.frequency / 20);
    friction = Math.pow(20, options.friction / 100);
    s = options.anticipationSize / 1000;
    decal = Math.max(0, s);
    A1 = function A1(t) {
        var M, a, b, x0, x1;
        M = 0.8;
        x0 = s / (1 - s);
        x1 = 0;
        b = (x0 - M * x1) / (x0 - x1);
        a = (M - b) / x0;
        return a * t * options.anticipationStrength / 100 + b;
    };
    A2 = function A2(t) {
        return Math.pow(friction / 10, -t) * (1 - t);
    };
    return function (t) {
        var A, At, a, angle, b, frictionT, y0, yS;
        frictionT = t / (1 - s) - s / (1 - s);
        if (t < s) {
            yS = s / (1 - s) - s / (1 - s);
            y0 = 0 / (1 - s) - s / (1 - s);
            b = Math.acos(1 / A1(yS));
            a = (Math.acos(1 / A1(y0)) - b) / (frequency * -s);
            A = A1;
        } else {
            A = A2;
            b = 0;
            a = 1;
        }
        At = A(frictionT);
        angle = frequency * (t - s) * a + b;
        return 1 - At * Math.cos(angle);
    };
};

var easings = dynamics;

/* harmony default export */ __webpack_exports__["a"] = (easings);

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 54 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 55 */
/***/ (function(module, exports) {

function backInOut(t) {
  var s = 1.70158 * 1.525;
  if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}

module.exports = backInOut;

/***/ }),
/* 56 */
/***/ (function(module, exports) {

function backIn(t) {
  var s = 1.70158;
  return t * t * ((s + 1) * t - s);
}

module.exports = backIn;

/***/ }),
/* 57 */
/***/ (function(module, exports) {

function backOut(t) {
  var s = 1.70158;
  return --t * t * ((s + 1) * t + s) + 1;
}

module.exports = backOut;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var bounceOut = __webpack_require__(43);

function bounceInOut(t) {
  return t < 0.5 ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0)) : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}

module.exports = bounceInOut;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var bounceOut = __webpack_require__(43);

function bounceIn(t) {
  return 1.0 - bounceOut(1.0 - t);
}

module.exports = bounceIn;

/***/ }),
/* 60 */
/***/ (function(module, exports) {

function circInOut(t) {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}

module.exports = circInOut;

/***/ }),
/* 61 */
/***/ (function(module, exports) {

function circIn(t) {
  return 1.0 - Math.sqrt(1.0 - t * t);
}

module.exports = circIn;

/***/ }),
/* 62 */
/***/ (function(module, exports) {

function circOut(t) {
  return Math.sqrt(1 - --t * t);
}

module.exports = circOut;

/***/ }),
/* 63 */
/***/ (function(module, exports) {

function cubicInOut(t) {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}

module.exports = cubicInOut;

/***/ }),
/* 64 */
/***/ (function(module, exports) {

function cubicIn(t) {
  return t * t * t;
}

module.exports = cubicIn;

/***/ }),
/* 65 */
/***/ (function(module, exports) {

function cubicOut(t) {
  var f = t - 1.0;
  return f * f * f + 1.0;
}

module.exports = cubicOut;

/***/ }),
/* 66 */
/***/ (function(module, exports) {

function elasticInOut(t) {
  return t < 0.5 ? 0.5 * Math.sin(+13.0 * Math.PI / 2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0)) : 0.5 * Math.sin(-13.0 * Math.PI / 2 * (2.0 * t - 1.0 + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
}

module.exports = elasticInOut;

/***/ }),
/* 67 */
/***/ (function(module, exports) {

function elasticIn(t) {
  return Math.sin(13.0 * t * Math.PI / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}

module.exports = elasticIn;

/***/ }),
/* 68 */
/***/ (function(module, exports) {

function elasticOut(t) {
  return Math.sin(-13.0 * (t + 1.0) * Math.PI / 2) * Math.pow(2.0, -10.0 * t) + 1.0;
}

module.exports = elasticOut;

/***/ }),
/* 69 */
/***/ (function(module, exports) {

function expoInOut(t) {
  return t === 0.0 || t === 1.0 ? t : t < 0.5 ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0) : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
}

module.exports = expoInOut;

/***/ }),
/* 70 */
/***/ (function(module, exports) {

function expoIn(t) {
  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}

module.exports = expoIn;

/***/ }),
/* 71 */
/***/ (function(module, exports) {

function expoOut(t) {
  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
}

module.exports = expoOut;

/***/ }),
/* 72 */
/***/ (function(module, exports) {

function linear(t) {
  return t;
}

module.exports = linear;

/***/ }),
/* 73 */
/***/ (function(module, exports) {

function quadInOut(t) {
    t /= 0.5;
    if (t < 1) return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
}

module.exports = quadInOut;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

function quadIn(t) {
  return t * t;
}

module.exports = quadIn;

/***/ }),
/* 75 */
/***/ (function(module, exports) {

function quadOut(t) {
  return -t * (t - 2.0);
}

module.exports = quadOut;

/***/ }),
/* 76 */
/***/ (function(module, exports) {

function quarticInOut(t) {
  return t < 0.5 ? +8.0 * Math.pow(t, 4.0) : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}

module.exports = quarticInOut;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

function quarticIn(t) {
  return Math.pow(t, 4.0);
}

module.exports = quarticIn;

/***/ }),
/* 78 */
/***/ (function(module, exports) {

function quarticOut(t) {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}

module.exports = quarticOut;

/***/ }),
/* 79 */
/***/ (function(module, exports) {

function qinticInOut(t) {
    if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
}

module.exports = qinticInOut;

/***/ }),
/* 80 */
/***/ (function(module, exports) {

function qinticIn(t) {
  return t * t * t * t * t;
}

module.exports = qinticIn;

/***/ }),
/* 81 */
/***/ (function(module, exports) {

function qinticOut(t) {
  return --t * t * t * t * t + 1;
}

module.exports = qinticOut;

/***/ }),
/* 82 */
/***/ (function(module, exports) {

function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}

module.exports = sineInOut;

/***/ }),
/* 83 */
/***/ (function(module, exports) {

function sineIn(t) {
  var v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;else return 1 - v;
}

module.exports = sineIn;

/***/ }),
/* 84 */
/***/ (function(module, exports) {

function sineOut(t) {
  return Math.sin(t * Math.PI / 2);
}

module.exports = sineOut;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;

/***/ }),
/* 87 */
/***/ (function(module, exports) {

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;

/***/ }),
/* 88 */
/***/ (function(module, exports) {

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

module.exports = asciiWords;

/***/ }),
/* 89 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;

/***/ }),
/* 90 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol = __webpack_require__(44),
    arrayMap = __webpack_require__(85),
    isArray = __webpack_require__(109),
    isSymbol = __webpack_require__(111);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

module.exports = baseToString;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(90);

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}

module.exports = castSlice;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var castSlice = __webpack_require__(92),
    hasUnicode = __webpack_require__(47),
    stringToArray = __webpack_require__(103),
    toString = __webpack_require__(42);

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function (string) {
    string = toString(string);

    var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;

    var chr = strSymbols ? strSymbols[0] : string.charAt(0);

    var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

module.exports = createCaseFirst;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__(86),
    deburr = __webpack_require__(108),
    words = __webpack_require__(113);

/** Used to compose unicode capture groups. */
var rsApos = '[\'\u2019]';

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function (string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

module.exports = createCompounder;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var basePropertyOf = __webpack_require__(89);

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C', '\xe7': 'c',
  '\xd0': 'D', '\xf0': 'd',
  '\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e', '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I', '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N', '\xf1': 'n',
  '\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A', '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a', '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C', '\u0108': 'C', '\u010A': 'C', '\u010C': 'C',
  '\u0107': 'c', '\u0109': 'c', '\u010B': 'c', '\u010D': 'c',
  '\u010E': 'D', '\u0110': 'D', '\u010F': 'd', '\u0111': 'd',
  '\u0112': 'E', '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011A': 'E',
  '\u0113': 'e', '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011B': 'e',
  '\u011C': 'G', '\u011E': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011D': 'g', '\u011F': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H', '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I', '\u012A': 'I', '\u012C': 'I', '\u012E': 'I', '\u0130': 'I',
  '\u0129': 'i', '\u012B': 'i', '\u012D': 'i', '\u012F': 'i', '\u0131': 'i',
  '\u0134': 'J', '\u0135': 'j',
  '\u0136': 'K', '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L', '\u013B': 'L', '\u013D': 'L', '\u013F': 'L', '\u0141': 'L',
  '\u013A': 'l', '\u013C': 'l', '\u013E': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N', '\u0145': 'N', '\u0147': 'N', '\u014A': 'N',
  '\u0144': 'n', '\u0146': 'n', '\u0148': 'n', '\u014B': 'n',
  '\u014C': 'O', '\u014E': 'O', '\u0150': 'O',
  '\u014D': 'o', '\u014F': 'o', '\u0151': 'o',
  '\u0154': 'R', '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r', '\u0157': 'r', '\u0159': 'r',
  '\u015A': 'S', '\u015C': 'S', '\u015E': 'S', '\u0160': 'S',
  '\u015B': 's', '\u015D': 's', '\u015F': 's', '\u0161': 's',
  '\u0162': 'T', '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't', '\u0165': 't', '\u0167': 't',
  '\u0168': 'U', '\u016A': 'U', '\u016C': 'U', '\u016E': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u', '\u016B': 'u', '\u016D': 'u', '\u016F': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W', '\u0175': 'w',
  '\u0176': 'Y', '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z', '\u017B': 'Z', '\u017D': 'Z',
  '\u017A': 'z', '\u017C': 'z', '\u017E': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017F': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

module.exports = deburrLetter;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(101);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol = __webpack_require__(44);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

/***/ }),
/* 99 */
/***/ (function(module, exports) {

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

module.exports = hasUnicodeWord;

/***/ }),
/* 100 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),
/* 101 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(96);

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var asciiToArray = __webpack_require__(87),
    hasUnicode = __webpack_require__(47),
    unicodeToArray = __webpack_require__(104);

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}

module.exports = stringToArray;

/***/ }),
/* 104 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
    return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;

/***/ }),
/* 105 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = '[\'\u2019]',
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
    rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var capitalize = __webpack_require__(107),
    createCompounder = __webpack_require__(94);

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder(function (result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

module.exports = camelCase;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(42),
    upperFirst = __webpack_require__(112);

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

module.exports = capitalize;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var deburrLetter = __webpack_require__(95),
    toString = __webpack_require__(42);

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

module.exports = deburr;

/***/ }),
/* 109 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(46),
    getPrototype = __webpack_require__(97),
    isObjectLike = __webpack_require__(48);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var baseGetTag = __webpack_require__(46),
    isObjectLike = __webpack_require__(48);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

module.exports = isSymbol;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var createCaseFirst = __webpack_require__(93);

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = upperFirst;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var asciiWords = __webpack_require__(88),
    hasUnicodeWord = __webpack_require__(99),
    toString = __webpack_require__(42),
    unicodeWords = __webpack_require__(105);

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = words;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ANIMATABLE_VALUES = ['columnCount', 'columnGap', 'columnRule', 'columnRuleColor', 'columnRuleWidth', 'columns', 'flex', 'flexBasis', 'flexGrow', 'flexShrink', 'order', 'perspective', 'perspectiveOrigin', 'perspectiveOriginX', 'perspectiveOriginY', 'scrollSnapCoordinate', 'scrollSnapDirection', 'textDecoration', 'textDecorationColor', 'transform', 'transformOrigin', 'transformOriginX', 'transformOriginY', 'transformOriginZ', 'transformStyle'];

var CSS_PROPERTIES = ['alignContent', 'alignItems', 'alignSelf', 'animation', 'animationDelay', 'animationDirection', 'animationDuration', 'animationFillMode', 'animationIterationCount', 'animationName', 'animationPlayState', 'animationTimingFunction', 'appearance', 'aspectRatio', 'backfaceVisibility', 'backgroundClip', 'borderImage', 'borderImageSlice', 'boxShadow', 'columnCount', 'columnFill', 'columnGap', 'columnRule', 'columnRuleColor', 'columnRuleStyle', 'columnRuleWidth', 'columnSpan', 'columnWidth', 'columns', 'flex', 'flexBasis', 'flexDirection', 'flexFlow', 'flexGrow', 'flexShrink', 'flexWrap', 'fontFeatureSettings', 'fontKearning', 'fontVariantLigatures', 'justifyContent', 'grid', 'gridArea', 'gridAutoColumns', 'gridAutoFlow', 'gridAutoRows', 'gridColumn', 'gridColumnEnd', 'gridColumnStart', 'gridRow', 'gridRowEnd', 'gridRowStart', 'gridTemplate', 'gridTemplateAreas', 'gridTemplateColumns', 'gridTemplateRows', 'hyphens', 'lineBreak', 'perspective', 'perspectiveOrigin', 'perspectiveOriginX', 'perspectiveOriginY', 'rubyPosition', 'scrollSnapCoordinate', 'scrollSnapDestination', 'scrollSnapPoints', 'scrollSnapPointsX', 'scrollSnapPointsY', 'scrollSnapType', 'tabSize', 'textDecoration', 'textDecorationColor', 'textDecorationLine', 'textDecorationStyle', 'textOrientation', 'textSizeAdjust', 'transform', 'transition', 'transformOrigin', 'transformOriginX', 'transformOriginY', 'transformOriginZ', 'transformStyle', 'transitionProperty', 'transitionDuration', 'transitionTimingFunction', 'transitionDelay', 'userModify', 'userSelect'];

exports.ANIMATABLE_VALUES = ANIMATABLE_VALUES;
exports.CSS_PROPERTIES = CSS_PROPERTIES;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _isPlainObject = __webpack_require__(110);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _prefix = __webpack_require__(116);

var _prefix2 = _interopRequireDefault(_prefix);

var _supports = __webpack_require__(117);

var _supports2 = _interopRequireDefault(_supports);

var _constants = __webpack_require__(114);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var toKebabCase = function toKebabCase(string) {
  return string.replace(/([A-Z])/g, function ($1) {
    return '-' + $1.toLowerCase();
  });
};

/**
 * create a new style object with prefixes applied
 *
 * @param {Object} object
 * @returns {Object}
 */
var applyPrefixes = function applyPrefixes(object) {
  if (!(0, _isPlainObject2.default)(object)) {
    return object;
  }

  var value = void 0;

  return Object.keys(object).reduce(function (styleObject, originalKey) {
    var key = originalKey;

    value = object[key];

    if ((0, _isPlainObject2.default)(value)) {
      return _extends({}, styleObject, _defineProperty({}, key, applyPrefixes(value)));
    }

    if (_constants.CSS_PROPERTIES.indexOf(key) !== -1 && !(0, _supports2.default)(toKebabCase(key))) {
      key = '' + _prefix2.default.js + key.charAt(0).toUpperCase() + key.slice(1);
    }

    if (originalKey === 'display' && object[originalKey] === 'flex' && !(0, _supports2.default)('display', 'flex')) {
      return _extends({}, styleObject, _defineProperty({}, key, _prefix2.default.js === 'ms' ? '-ms-flexbox' : _prefix2.default.css + 'flex'));
    }

    if (originalKey === 'transition') {
      var animatableValuesObject = _constants.ANIMATABLE_VALUES.reduce(function (animatableValues, animatableValue) {
        var kebabValue = toKebabCase(animatableValue);
        var re = new RegExp(kebabValue, 'g');

        if (re.test(object[originalKey]) && !(0, _supports2.default)(kebabValue)) {
          var cleanValue = object[originalKey].replace(re, '' + _prefix2.default.css + kebabValue);

          return _extends({}, animatableValues, _defineProperty({}, key, cleanValue));
        }

        return animatableValues;
      }, {});

      return _extends({}, styleObject, animatableValuesObject);
    }

    return _extends({}, styleObject, _defineProperty({}, key, value));
  }, {});
};

exports.default = applyPrefixes;
module.exports = exports['default'];

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var prefixObject = {
  css: '',
  js: ''
};

if (typeof window !== 'undefined') {
  var styles = window.getComputedStyle(document.documentElement);

  var prefixString = Array.prototype.slice.call(styles).join('');
  var standardPrefixString = prefixString.match(/-(moz|webkit|ms)-/);
  var operaPrefixString = prefixString.match(styles.OLink === '' && ['', 'o']);
  var prefixMatch = standardPrefixString || operaPrefixString;

  var prefix = prefixMatch ? prefixMatch[1] : '';

  prefixObject = {
    css: '-' + prefix + '-',
    js: prefix
  };

  if (prefixObject.js !== 'ms') {
    prefixObject = _extends({}, prefixObject, {
      js: '' + prefixObject.js.charAt(0).toUpperCase() + prefixObject.js.slice(1)
    });
  }
}

exports.default = prefixObject;
module.exports = exports['default'];

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _camelCase = __webpack_require__(106);

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * is the property supported, or is the value supported for the given property
 * 
 * @param {string} property
 * @param {number|string} value
 * @returns {boolean}
 */
var isSupported = function isSupported(property, value) {
  // Try the native standard method first
  if ('CSS' in window && 'supports' in window.CSS) {
    return window.CSS.supports(property, value);
  }

  // Check Opera's native method
  if ('supportsCSS' in window) {
    return window.supportsCSS(property, value);
  }

  // Convert to camel-case for DOM interactions
  var camelCaseProperty = (0, _camelCase2.default)(property);

  // Check if the property is supported
  var element = document.createElement('div');
  var support = camelCaseProperty in element.style;

  // Assign the property and value to invoke the CSS interpreter
  element.style.cssText = property + ':' + value;

  // Ensure both the property and value are
  // supported and return
  return support && element.style[camelCaseProperty] !== '';
};

exports.default = isSupported;
module.exports = exports['default'];

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylesheet_css__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylesheet_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylesheet_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__file_scss__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__file_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__file_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_index__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buildDemoUI__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__easings__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_eases__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_eases___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_eases__);








var spring = __WEBPACK_IMPORTED_MODULE_5__easings__["a" /* default */].spring();

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* ready */])(function () {
	var ball = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* setupEl */])({
		tag: 'div',
		className: 'ball',
		xy: __WEBPACK_IMPORTED_MODULE_4__util__["c" /* demoCoords */].start
	});
	var once = false;
	var last = null;
	var crossedZeroToOneCount = 0;
	var stimulation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__library_index__["default"])({
		reverse: true,
		duration: 1000,
		// delay: 1000,
		loop: 3,
		// delayEveryLoop: true,
		// skipZeroFrame: false,
		usePersistedSettings: true,
		from: 5,
		to: 95,
		easing: __WEBPACK_IMPORTED_MODULE_6_eases___default.a.sineOut,
		aspects: {
			x: {
				easing: __WEBPACK_IMPORTED_MODULE_6_eases___default.a.sineOut,
				from: __WEBPACK_IMPORTED_MODULE_4__util__["c" /* demoCoords */].start.x,
				to: __WEBPACK_IMPORTED_MODULE_4__util__["c" /* demoCoords */].end.x
			},
			y: {
				easing: spring,
				from: __WEBPACK_IMPORTED_MODULE_4__util__["c" /* demoCoords */].start.y,
				to: __WEBPACK_IMPORTED_MODULE_4__util__["c" /* demoCoords */].end.y,
				// delayAddsParentDelay: true,
				// delay: 10,
				aspects: {
					asdf: {
						// delayAddsParentDelay: true,
						// delay: 10,
						frame: function frame() {
							// console.log(this.getCumulativeDelay());
						}
					}
				}
			}
		},
		frame: function frame() {
			if (last !== null && this.settings.reverse && last < this.progress.ratioCompleted) {
				crossedZeroToOneCount++;
				console.log('d');
			}
			if (this.currentLoopCount === 3 && this.progress.ratioCompleted > 0.5 && !once) {
				this.updateSettings({
					reverse: true
				});
				once = true;
			}
			last = this.progress.ratioCompleted;

			console.log(this.currentLoopCount);
			var freshCoords = {
				x: this.progressAt('x').easedTweened,
				y: this.progressAt('y').easedTweened
			};
			ball.update({
				xy: freshCoords
			});

			console.log(JSON.stringify(this.progress));

			// if (this.progress.ratioCompleted > 0.5 && !this.settings.reverse) {
			// 	this.updateSettings({
			// 		delay: 1500,
			// 	});
			// }

			// if (this.progress.ratioCompleted > 0.6 && !this.settings.reverse) {
			// 	this.updateSettings({
			// 		reverse: true,
			// 	});
			// }

			// if (this.progress.ratioCompleted < 0.5 && this.settings.reverse) {
			// 	this.updateSettings({
			// 		delay: 1200,
			// 	});
			// }

			// if (this.progress.ratioCompleted < 0.4 && this.settings.reverse) {
			// 	this.updateSettings({
			// 		reverse: false,
			// 	});
			// }

			// if (this.progress.ratioCompleted < 0.3 && this.settings.reverse) {
			// 	this.updateSettings({
			// 		reverse: false,
			// 	});
			// }

			// setupEl({
			// 	el: ball.el,
			// 	xy: freshCoords,
			// });

			// setupEl({
			// 	className: 'ball ball--ghost',
			// 	tag: 'div',
			// 	xy: freshCoords,
			// 	appendTo: container,
			// });
		},
		onComplete: function onComplete() {
			// if (!once) {
			// 	this.updateSettings({
			// 		reverse: true,
			// 	});
			// 	this.resetAll();
			// }
			// once = true;
		}
	});

	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__buildDemoUI__["a" /* default */])(ball, stimulation);
});

/* harmony default export */ __webpack_exports__["default"] = (null);

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map