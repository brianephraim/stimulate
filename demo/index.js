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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(2);
	
	__webpack_require__(6);
	
	var _index = __webpack_require__(8);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _buildDemoUI = __webpack_require__(15);
	
	var _buildDemoUI2 = _interopRequireDefault(_buildDemoUI);
	
	var _util = __webpack_require__(17);
	
	var _eases = __webpack_require__(23);
	
	var _eases2 = _interopRequireDefault(_eases);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var spring = _index.easings.spring();
	// import stimulate, { easings } from '../dist/stimulate.min';
	
	
	(0, _util.ready)(function () {
		var ball = (0, _util.setupEl)({
			tag: 'div',
			className: 'ball',
			xy: _util.demoCoords.start
		});
		// let once = false;
		var stimulation = (0, _index2.default)({
			// reverse:true,
			duration: 1000,
			// delay: 1000,
			// loop: 2,
			// delayEveryLoop: true,
			// skipZeroFrame: false,
			usePersistedSettings: true,
			from: 5,
			to: 95,
			easing: _eases2.default.sineOut,
			aspects: {
				x: {
					easing: _eases2.default.sineOut,
					from: _util.demoCoords.start.x,
					to: _util.demoCoords.end.x
				},
				y: {
					easing: spring,
					from: _util.demoCoords.start.y,
					to: _util.demoCoords.end.y,
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
				// console.log(this.progress.ratioCompleted);
				var freshCoords = {
					x: this.progressAt('x'),
					y: this.progressAt('y')
				};
				ball.update({
					xy: freshCoords
				});
	
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
	
		(0, _buildDemoUI2.default)(ball, stimulation);
	});
	
	exports.default = null;

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.buildDemoUI = undefined;
	
	var _cssJsSharedConstants = __webpack_require__(16);
	
	var _util = __webpack_require__(17);
	
	var duration = _cssJsSharedConstants.demoDuration;
	var buildDemoUI = exports.buildDemoUI = function buildDemoUI(ball, stimulation) {
		var coords = _util.demoCoords;
		var reverse = false;
		var demoEl = document.getElementById('demo');
	
		(0, _util.setupEl)({
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
						max: _cssJsSharedConstants.demoWidth - _cssJsSharedConstants.ballDiameter,
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
						max: _cssJsSharedConstants.demoWidth - _cssJsSharedConstants.ballDiameter,
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
						max: _cssJsSharedConstants.demoHeight - _cssJsSharedConstants.ballDiameter,
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
						max: _cssJsSharedConstants.demoHeight - _cssJsSharedConstants.ballDiameter,
						value: coords.end.y
					}
				}]
			}]
		});
	};
	
	exports.default = buildDemoUI;

/***/ },
/* 16 */
/***/ function(module, exports) {

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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.setupEl = exports.demoCoords = exports.ready = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _cssJsSharedConstants = __webpack_require__(16);
	
	var _reactPrefixer = __webpack_require__(18);
	
	var _reactPrefixer2 = _interopRequireDefault(_reactPrefixer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ready = exports.ready = function ready(fn) {
		if (document.readyState !== 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	};
	var translateVal = function translateVal() {
		var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
		var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
		var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
		return 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
	};
	var xy = function xy(el, coords) {
		var styles = (0, _reactPrefixer2.default)({
			transform: translateVal(coords.x, coords.y, 0)
		});
		Object.assign(el.style, styles);
	};
	
	var demoCoords = exports.demoCoords = {
		start: {
			x: 0,
			y: 0
		},
		end: {
			x: _cssJsSharedConstants.demoWidth - _cssJsSharedConstants.ballDiameter,
			y: _cssJsSharedConstants.demoHeight - _cssJsSharedConstants.ballDiameter
		}
	};
	
	var setupEl = exports.setupEl = function setupEl(o) {
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

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _prefix = __webpack_require__(19);
	
	var _prefix2 = _interopRequireDefault(_prefix);
	
	var _properties = __webpack_require__(20);
	
	var _properties2 = _interopRequireDefault(_properties);
	
	var _animatableValues = __webpack_require__(21);
	
	var _animatableValues2 = _interopRequireDefault(_animatableValues);
	
	var _CssSupportsPolyfill = __webpack_require__(22);
	
	var _CssSupportsPolyfill2 = _interopRequireDefault(_CssSupportsPolyfill);
	
	function camelToKebab(str) {
	    return str.replace(/\W+/g, "-").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
	}
	
	function applyPrefixes(obj) {
	    if (typeof obj === "object" && !!obj) {
	        Object.keys(obj).forEach(function (key) {
	            var realKey = key;
	
	            if (typeof obj[key] === "object" && !!obj[key]) {
	                obj[key] = applyPrefixes(obj[key]);
	            } else if (_properties2["default"].indexOf(key) !== -1 && !(0, _CssSupportsPolyfill2["default"])(camelToKebab(key))) {
	                var value = obj[key];
	
	                realKey = _prefix2["default"].js + key.charAt(0).toUpperCase() + key.slice(1);
	
	                delete obj[key];
	                obj[realKey] = value;
	            }
	
	            if (realKey === "display" && obj[realKey] === "flex" && !(0, _CssSupportsPolyfill2["default"])("display", "flex")) {
	                obj[realKey] = _prefix2["default"] === "ms" ? "-ms-flexbox" : _prefix2["default"].css + "flex";
	            }
	
	            if (key === "transition") {
	                _animatableValues2["default"].forEach(function (animatableValue) {
	                    var kebabValue = camelToKebab(animatableValue);
	
	                    if (!(0, _CssSupportsPolyfill2["default"])(kebabValue)) {
	                        var re = new RegExp(kebabValue, "g");
	
	                        obj[realKey] = obj[realKey].replace(re, _prefix2["default"].css + kebabValue);
	                    }
	                });
	            }
	        });
	    }
	
	    return obj;
	}
	
	exports["default"] = applyPrefixes;
	module.exports = exports["default"];

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var styles = window.getComputedStyle(document.documentElement, ""),
	    prefix = Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/)[1] || styles.OLink === "" && ["", "o"],
	    ret = {
	    css: "-" + prefix + "-",
	    js: prefix
	};
	
	if (ret.js !== "ms") {
	    ret.js = ret.js.charAt(0).toUpperCase() + ret.js.slice(1);
	}
	
	exports["default"] = ret;
	module.exports = exports["default"];

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = ["alignContent", "alignItems", "alignSelf", "animation", "animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction", "appearance", "aspectRatio", "backfaceVisibility", "backgroundClip", "borderImage", "borderImageSlice", "boxShadow", "columnCount", "columnFill", "columnGap", "columnRule", "columnRuleColor", "columnRuleStyle", "columnRuleWidth", "columnSpan", "columnWidth", "columns", "flex", "flexBasis", "flexDirection", "flexFlow", "flexGrow", "flexShrink", "flexWrap", "fontFeatureSettings", "fontKearning", "fontVariantLigatures", "justifyContent", "grid", "gridArea", "gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridColumn", "gridColumnEnd", "gridColumnStart", "gridRow", "gridRowEnd", "gridRowStart", "gridTemplate", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows", "hyphens", "lineBreak", "perspective", "perspectiveOrigin", "perspectiveOriginX", "perspectiveOriginY", "rubyPosition", "scrollSnapCoordinate", "scrollSnapDestination", "scrollSnapPoints", "scrollSnapPointsX", "scrollSnapPointsY", "scrollSnapType", "tabSize", "textDecoration", "textDecorationColor", "textDecorationLine", "textDecorationStyle", "textOrientation", "textSizeAdjust", "transform", "transition", "transformOrigin", "transformOriginX", "transformOriginY", "transformOriginZ", "transformStyle", "transitionProperty", "transitionDuration", "transitionTimingFunction", "transitionDelay", "userModify", "userSelect"];
	module.exports = exports["default"];

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = ["columnCount", "columnGap", "columnRule", "columnRuleColor", "columnRuleWidth", "columns", "flex", "flexBasis", "flexGrow", "flexShrink", "order", "perspective", "perspectiveOrigin", "perspectiveOriginX", "perspectiveOriginY", "scrollSnapCoordinate", "scrollSnapDirection", "textDecoration", "textDecorationColor", "transform", "transformOrigin", "transformOriginX", "transformOriginY", "transformOriginZ", "transformStyle"];
	module.exports = exports["default"];

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var el = document.createElement("div"),
	    camelRe = /-([a-z]|[0-9])/ig,
	    support,
	    camel;
	
	exports["default"] = function (prop, value) {
	    // If no value is supplied, use "inherit"
	    value = arguments.length === 2 ? value : "inherit";
	
	    // Try the native standard method first
	    if ("CSS" in window && "supports" in window.CSS) {
	        return window.CSS.supports(prop, value);
	    }
	
	    // Check Opera's native method
	    if ("supportsCSS" in window) {
	        return window.supportsCSS(prop, value);
	    }
	
	    // Convert to camel-case for DOM interactions
	    camel = prop.replace(camelRe, function (all, letter) {
	        return (letter + "").toUpperCase();
	    });
	
	    // Check if the property is supported
	    support = camel in el.style;
	
	    // Assign the property and value to invoke
	    // the CSS interpreter
	    el.style.cssText = prop + ":" + value;
	
	    // Ensure both the property and value are
	    // supported and return
	    return support && el.style[camel] !== "";
	};
	
	module.exports = exports["default"];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		'backInOut': __webpack_require__(24),
		'backIn': __webpack_require__(25),
		'backOut': __webpack_require__(26),
		'bounceInOut': __webpack_require__(27),
		'bounceIn': __webpack_require__(29),
		'bounceOut': __webpack_require__(28),
		'circInOut': __webpack_require__(30),
		'circIn': __webpack_require__(31),
		'circOut': __webpack_require__(32),
		'cubicInOut': __webpack_require__(33),
		'cubicIn': __webpack_require__(34),
		'cubicOut': __webpack_require__(35),
		'elasticInOut': __webpack_require__(36),
		'elasticIn': __webpack_require__(37),
		'elasticOut': __webpack_require__(38),
		'expoInOut': __webpack_require__(39),
		'expoIn': __webpack_require__(40),
		'expoOut': __webpack_require__(41),
		'linear': __webpack_require__(42),
		'quadInOut': __webpack_require__(43),
		'quadIn': __webpack_require__(44),
		'quadOut': __webpack_require__(45),
		'quartInOut': __webpack_require__(46),
		'quartIn': __webpack_require__(47),
		'quartOut': __webpack_require__(48),
		'quintInOut': __webpack_require__(49),
		'quintIn': __webpack_require__(50),
		'quintOut': __webpack_require__(51),
		'sineInOut': __webpack_require__(52),
		'sineIn': __webpack_require__(53),
		'sineOut': __webpack_require__(54)
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	function backInOut(t) {
	  var s = 1.70158 * 1.525
	  if ((t *= 2) < 1)
	    return 0.5 * (t * t * ((s + 1) * t - s))
	  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
	}
	
	module.exports = backInOut

/***/ },
/* 25 */
/***/ function(module, exports) {

	function backIn(t) {
	  var s = 1.70158
	  return t * t * ((s + 1) * t - s)
	}
	
	module.exports = backIn

/***/ },
/* 26 */
/***/ function(module, exports) {

	function backOut(t) {
	  var s = 1.70158
	  return --t * t * ((s + 1) * t + s) + 1
	}
	
	module.exports = backOut

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var bounceOut = __webpack_require__(28)
	
	function bounceInOut(t) {
	  return t < 0.5
	    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
	    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5
	}
	
	module.exports = bounceInOut

/***/ },
/* 28 */
/***/ function(module, exports) {

	function bounceOut(t) {
	  var a = 4.0 / 11.0
	  var b = 8.0 / 11.0
	  var c = 9.0 / 10.0
	
	  var ca = 4356.0 / 361.0
	  var cb = 35442.0 / 1805.0
	  var cc = 16061.0 / 1805.0
	
	  var t2 = t * t
	
	  return t < a
	    ? 7.5625 * t2
	    : t < b
	      ? 9.075 * t2 - 9.9 * t + 3.4
	      : t < c
	        ? ca * t2 - cb * t + cc
	        : 10.8 * t * t - 20.52 * t + 10.72
	}
	
	module.exports = bounceOut

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var bounceOut = __webpack_require__(28)
	
	function bounceIn(t) {
	  return 1.0 - bounceOut(1.0 - t)
	}
	
	module.exports = bounceIn

/***/ },
/* 30 */
/***/ function(module, exports) {

	function circInOut(t) {
	  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1)
	  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
	}
	
	module.exports = circInOut

/***/ },
/* 31 */
/***/ function(module, exports) {

	function circIn(t) {
	  return 1.0 - Math.sqrt(1.0 - t * t)
	}
	
	module.exports = circIn

/***/ },
/* 32 */
/***/ function(module, exports) {

	function circOut(t) {
	  return Math.sqrt(1 - ( --t * t ))
	}
	
	module.exports = circOut

/***/ },
/* 33 */
/***/ function(module, exports) {

	function cubicInOut(t) {
	  return t < 0.5
	    ? 4.0 * t * t * t
	    : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0
	}
	
	module.exports = cubicInOut

/***/ },
/* 34 */
/***/ function(module, exports) {

	function cubicIn(t) {
	  return t * t * t
	}
	
	module.exports = cubicIn

/***/ },
/* 35 */
/***/ function(module, exports) {

	function cubicOut(t) {
	  var f = t - 1.0
	  return f * f * f + 1.0
	}
	
	module.exports = cubicOut

/***/ },
/* 36 */
/***/ function(module, exports) {

	function elasticInOut(t) {
	  return t < 0.5
	    ? 0.5 * Math.sin(+13.0 * Math.PI/2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
	    : 0.5 * Math.sin(-13.0 * Math.PI/2 * ((2.0 * t - 1.0) + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0
	}
	
	module.exports = elasticInOut

/***/ },
/* 37 */
/***/ function(module, exports) {

	function elasticIn(t) {
	  return Math.sin(13.0 * t * Math.PI/2) * Math.pow(2.0, 10.0 * (t - 1.0))
	}
	
	module.exports = elasticIn

/***/ },
/* 38 */
/***/ function(module, exports) {

	function elasticOut(t) {
	  return Math.sin(-13.0 * (t + 1.0) * Math.PI/2) * Math.pow(2.0, -10.0 * t) + 1.0
	}
	
	module.exports = elasticOut

/***/ },
/* 39 */
/***/ function(module, exports) {

	function expoInOut(t) {
	  return (t === 0.0 || t === 1.0)
	    ? t
	    : t < 0.5
	      ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
	      : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0
	}
	
	module.exports = expoInOut

/***/ },
/* 40 */
/***/ function(module, exports) {

	function expoIn(t) {
	  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0))
	}
	
	module.exports = expoIn

/***/ },
/* 41 */
/***/ function(module, exports) {

	function expoOut(t) {
	  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t)
	}
	
	module.exports = expoOut

/***/ },
/* 42 */
/***/ function(module, exports) {

	function linear(t) {
	  return t
	}
	
	module.exports = linear

/***/ },
/* 43 */
/***/ function(module, exports) {

	function quadInOut(t) {
	    t /= 0.5
	    if (t < 1) return 0.5*t*t
	    t--
	    return -0.5 * (t*(t-2) - 1)
	}
	
	module.exports = quadInOut

/***/ },
/* 44 */
/***/ function(module, exports) {

	function quadIn(t) {
	  return t * t
	}
	
	module.exports = quadIn

/***/ },
/* 45 */
/***/ function(module, exports) {

	function quadOut(t) {
	  return -t * (t - 2.0)
	}
	
	module.exports = quadOut

/***/ },
/* 46 */
/***/ function(module, exports) {

	function quarticInOut(t) {
	  return t < 0.5
	    ? +8.0 * Math.pow(t, 4.0)
	    : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0
	}
	
	module.exports = quarticInOut

/***/ },
/* 47 */
/***/ function(module, exports) {

	function quarticIn(t) {
	  return Math.pow(t, 4.0)
	}
	
	module.exports = quarticIn

/***/ },
/* 48 */
/***/ function(module, exports) {

	function quarticOut(t) {
	  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0
	}
	
	module.exports = quarticOut

/***/ },
/* 49 */
/***/ function(module, exports) {

	function qinticInOut(t) {
	    if ( ( t *= 2 ) < 1 ) return 0.5 * t * t * t * t * t
	    return 0.5 * ( ( t -= 2 ) * t * t * t * t + 2 )
	}
	
	module.exports = qinticInOut

/***/ },
/* 50 */
/***/ function(module, exports) {

	function qinticIn(t) {
	  return t * t * t * t * t
	}
	
	module.exports = qinticIn

/***/ },
/* 51 */
/***/ function(module, exports) {

	function qinticOut(t) {
	  return --t * t * t * t * t + 1
	}
	
	module.exports = qinticOut

/***/ },
/* 52 */
/***/ function(module, exports) {

	function sineInOut(t) {
	  return -0.5 * (Math.cos(Math.PI*t) - 1)
	}
	
	module.exports = sineInOut

/***/ },
/* 53 */
/***/ function(module, exports) {

	function sineIn (t) {
	  var v = Math.cos(t * Math.PI * 0.5)
	  if (Math.abs(v) < 1e-14) return 1
	  else return 1 - v
	}
	
	module.exports = sineIn


/***/ },
/* 54 */
/***/ function(module, exports) {

	function sineOut(t) {
	  return Math.sin(t * Math.PI/2)
	}
	
	module.exports = sineOut

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map