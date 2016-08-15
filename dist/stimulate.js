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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.caf = exports.raf = exports.sharedTiming = exports.easings = exports.stimulate = undefined;
	
	var _stimulate = __webpack_require__(9);
	
	var _stimulate2 = _interopRequireDefault(_stimulate);
	
	var _easings = __webpack_require__(14);
	
	var _easings2 = _interopRequireDefault(_easings);
	
	var _sharedTiming = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.stimulate = _stimulate2.default;
	exports.easings = _easings2.default;
	exports.sharedTiming = _sharedTiming.sharedTiming;
	exports.raf = _sharedTiming.raf;
	exports.caf = _sharedTiming.caf;
	exports.default = _stimulate2.default;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.StimulationAspect = exports.stimulate = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-inner-declarations:0 */
	
	var _sharedTiming = __webpack_require__(10);
	
	var _sharedTiming2 = _interopRequireDefault(_sharedTiming);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StimulationAspect = function () {
		function StimulationAspect(options) {
			var debug = arguments.length <= 1 || arguments[1] === undefined ? 'root' : arguments[1];
			var parent = arguments[2];
	
			_classCallCheck(this, StimulationAspect);
	
			this.parent = parent;
			this.debug = debug;
			this.options = options;
			this.init();
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
	
				_sharedTiming2.default.makeStamp('start');
				this.timestamps.start = _sharedTiming2.default.stamps.start;
				this.timestamps.recentRaf = null;
	
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
					this.nextRafId = _sharedTiming2.default.raf(function () {
						if (_this2.running) {
							_this2.timestamps.recentRaf = _sharedTiming2.default.stamps.raf;
							if (resetTimestampStart) {
								_this2.timestamps.start = _this2.timestamps.recentRaf;
							}
	
							var reverse = !!_this2.lookupSetting('reverse');
							var reverseIsNegativeOne = reverse ? -1 : 1;
							var changedDirections = _this2.previousReverseSetting !== reverse;
	
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
	
							var loop = _this2.lookupSetting('loop');
	
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
								var progressChanges = _this2.settings.frame.apply(_this2, [_this2.progress]);
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
			key: 'resetAll',
			value: function resetAll() {
				this.stop(true);
				this.init(true);
	
				return this;
			}
		}, {
			key: 'stop',
			value: function stop(skipCallback) {
				var _this3 = this;
	
				this.running = false;
				_sharedTiming2.default.caf(this.nextRafId);
				if (this.settings.onStop) {
					if (!skipCallback) {
						this.settings.onStop.apply(this, [this.progress]);
					}
				}
				this.iterateAspectNames(function (name) {
					var aspect = _this3.aspects[name];
					if (aspect.settings.chainedStop) {
						_this3.aspects[name].stop(skipCallback);
					}
				});
	
				return this;
			}
		}, {
			key: 'resume',
			value: function resume() {
				var _this4 = this;
	
				if (!this.running) {
					_sharedTiming2.default.makeStamp('start');
					var duration = this.lookupSetting('duration');
					var reverse = this.lookupSetting('reverse');
	
					var adjustment = this.progress.ratioCompleted * duration;
					if (reverse) {
						adjustment = (1 - this.progress.ratioCompleted) * duration;
					}
					if (this.lastDelaySettingWhileDelaying) {
						adjustment += this.lastDelaySettingWhileDelaying;
					}
					this.timestamps.start = _sharedTiming2.default.stamps.start - adjustment;
					this.timestamps.recentRaf = null;
					this.running = true;
	
					this.iterateAspectNames(function (name) {
						_this4.aspects[name].resume();
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
				var lastItem = pathSplit[pathSplit.length - 1];
				if (typeof this.progress[lastItem] === 'undefined') {
					lastItem = 'easedTweened';
					pathSplit.push(lastItem);
				}
				var place = this.aspectTree;
				if (path) {
					try {
						pathSplit.forEach(function (name) {
							if (name !== lastItem) {
								place = place.aspects[name];
							} else {
								place = place.progress[name];
							}
						});
					} catch (e) {
						throw new Error('Error: You specified an invalid aspect path for .progressAt().');
					}
				} else {
					place = place.progress[lastItem];
				}
				return place;
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
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}
	
		return new (Function.prototype.bind.apply(StimulationAspect, [null].concat(args)))();
	};
	exports.stimulate = stimulate;
	exports.StimulationAspect = StimulationAspect;
	exports.default = stimulate;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.caf = exports.raf = exports.sharedTiming = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _raf2 = __webpack_require__(11);
	
	var _raf3 = _interopRequireDefault(_raf2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
				var rafId = (0, _raf3.default)(function () {
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
					(0, _raf2.cancel)(rafId);
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
	
	exports.sharedTiming = sharedTiming;
	exports.raf = sharedTimingRaf;
	exports.caf = sharedTimingCaf;
	exports.default = sharedTiming;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(12)
	  , root = typeof window === 'undefined' ? global : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root['request' + suffix]
	  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]
	
	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix]
	  caf = root[vendors[i] + 'Cancel' + suffix]
	      || root[vendors[i] + 'CancelRequest' + suffix]
	}
	
	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60
	
	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }
	
	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}
	
	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(root, arguments)
	}
	module.exports.polyfill = function() {
	  root.requestAnimationFrame = raf
	  root.cancelAnimationFrame = caf
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;
	
	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        return setTimeout(fun, 0);
	    } else {
	        return cachedSetTimeout.call(null, fun, 0);
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        clearTimeout(marker);
	    } else {
	        cachedClearTimeout.call(null, marker);
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	exports.easings = easings;
	exports.default = easings;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=stimulate.js.map