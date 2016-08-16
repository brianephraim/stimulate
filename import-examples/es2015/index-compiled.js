/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stimulate = __webpack_require__(1);

	var _stimulate2 = _interopRequireDefault(_stimulate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _stimulate2.default)({
		duration: 1000,
		frame: function frame() {
			console.log(this.progress.ratioCompleted);
		}
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	!function (t, e) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.stimulate = e() : t.stimulate = e();
	}(undefined, function () {
	  return function (t) {
	    function e(n) {
	      if (s[n]) return s[n].exports;var i = s[n] = { exports: {}, id: n, loaded: !1 };return t[n].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
	    }var s = {};return e.m = t, e.c = s, e.p = "", e(0);
	  }([function (t, e, s) {
	    t.exports = s(8);
	  },,,,,,,, function (t, e, s) {
	    "use strict";
	    function n(t) {
	      return t && t.__esModule ? t : { "default": t };
	    }Object.defineProperty(e, "__esModule", { value: !0 }), e.caf = e.raf = e.sharedTiming = e.easings = e.stimulate = void 0;var i = s(9),
	        a = n(i),
	        r = s(12),
	        o = n(r),
	        u = s(10);e.stimulate = a["default"], e.easings = o["default"], e.sharedTiming = u.sharedTiming, e.raf = u.raf, e.caf = u.caf, e["default"] = a["default"];
	  }, function (t, e, s) {
	    "use strict";
	    function n(t) {
	      return t && t.__esModule ? t : { "default": t };
	    }function i(t, e) {
	      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
	    }Object.defineProperty(e, "__esModule", { value: !0 }), e.StimulationAspect = e.stimulate = void 0;var a = Object.assign || function (t) {
	      for (var e = 1; e < arguments.length; e++) {
	        var s = arguments[e];for (var n in s) {
	          Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n]);
	        }
	      }return t;
	    },
	        r = function () {
	      function t(t, e) {
	        for (var s = 0; s < e.length; s++) {
	          var n = e[s];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
	        }
	      }return function (e, s, n) {
	        return s && t(e.prototype, s), n && t(e, n), e;
	      };
	    }(),
	        o = s(10),
	        u = n(o),
	        l = function () {
	      function t(e) {
	        var s = arguments.length <= 1 || void 0 === arguments[1] ? "root" : arguments[1],
	            n = arguments[2];i(this, t), this.parent = n, this.debug = s, this.options = e, this.init();
	      }return r(t, [{ key: "init", value: function value(e) {
	          var s = this;this.aspects = {}, this.persistedSettings || (this.persistedSettings = {}), this.inheritableDefaults = { duration: 1e3, delay: 0, delayEveryLoop: !1, loop: !1, skipZeroFrame: !0, endless: !1, reverse: !1, usePersistedSettings: !1 }, this.defaultSettings = { delayAddsParentDelay: !1, from: 0, to: 1, easing: null, aspects: this.aspects, frame: null, chainedStop: !0 }, this.settings = a({}, this.defaultSettings, this.options), this.lookupSetting("usePersistedSettings") && Object.assign(this.settings, this.persistedSettings), this.aspects = this.settings.aspects, this.parent ? this.aspectTree = this.parent.aspectTree : this.aspectTree = this;var n = !!this.lookupSetting("reverse");this.previousReverseSetting = n;var i = this.getProgressDefault(n);this.progress ? Object.assign(this.progress, i) : (this.progress = i, this.progress.aspects = {}), this.currentLoopCount = 1, this.lastDelaySettingWhileDelaying = null, this.running = !0, this.nextRafId = null, this.timestamps = {}, u["default"].makeStamp("start"), this.timestamps.start = u["default"].stamps.start, this.timestamps.recentRaf = null, this.frameCount = 0, this.iterateAspectNames(function (n) {
	            e ? s.aspects[n].init(!0) : (s.aspects[n] = new t(a({}, s.settings.aspects[n]), n, s), s.progress.aspects[n] = s.aspects[n].progress);
	          });var r = this.lookupSetting("skipZeroFrame");this.recurse(!r);
	        } }, { key: "getCumulativeDelay", value: function value() {
	          var t = this.lookupSetting("delay");return this.parent && this.settings.delayAddsParentDelay && (t += this.parent.getCumulativeDelay()), t;
	        } }, { key: "updateSettings", value: function value(t) {
	          return this.lookupSetting("usePersistedSettings") && Object.assign(this.persistedSettings, t), Object.assign(this.settings, t), this;
	        } }, { key: "lookupSetting", value: function value(t) {
	          return "undefined" != typeof this.settings[t] && "inherit" !== this.settings[t] ? this.settings[t] : this.parent ? this.parent.lookupSetting(t) : this.inheritableDefaults[t];
	        } }, { key: "iterateAspectNames", value: function value(t) {
	          this.settings.aspectNames = Object.keys(this.settings.aspects), this.settings.aspectNames.forEach(function (e) {
	            t(e);
	          });
	        } }, { key: "getProgressDefault", value: function value(t) {
	          return t ? { ratioCompleted: 1, easedRatioCompleted: 1, tweened: this.settings.to, easedTweened: this.settings.to } : { ratioCompleted: 0, easedRatioCompleted: 0, tweened: this.settings.from, easedTweened: this.settings.from };
	        } }, { key: "getTween", value: function value(t, e, s) {
	          return t + s * (e - t);
	        } }, { key: "calculateRatio", value: function value(t) {
	          var e = t.start + t.delay,
	              s = t.later - e,
	              n = s / t.duration;return n;
	        } }, { key: "recurse", value: function value(t, e) {
	          var s = this;this.running && (this.nextRafId = u["default"].raf(function () {
	            if (s.running) {
	              s.timestamps.recentRaf = u["default"].stamps.raf, t && (s.timestamps.start = s.timestamps.recentRaf);var n = !!s.lookupSetting("reverse"),
	                  i = n ? -1 : 1,
	                  a = s.previousReverseSetting !== n;s.previousReverseSetting = n, e && Object.assign(s.progress, s.getProgressDefault(n));var r = 0;r = null !== s.lastDelaySettingWhileDelaying ? s.lastDelaySettingWhileDelaying : s.getCumulativeDelay();var o = s.lookupSetting("duration"),
	                  l = s.calculateRatio({ start: s.timestamps.start, later: s.timestamps.recentRaf, delay: r, duration: o }),
	                  p = s.lookupSetting("delayEveryLoop");if (l > 0 && l < 1 && null === s.lastDelaySettingWhileDelaying && (s.lastDelaySettingWhileDelaying = r, (!s.lookupSetting("skipZeroFrame") && r && s.currentLoopCount <= 1 || r && p && s.currentLoopCount > 1) && (s.timestamps.start = s.timestamps.recentRaf - r, l = s.calculateRatio({ start: s.timestamps.start, later: s.timestamps.recentRaf, delay: r, duration: o }))), a) {
	                null === s.lastDelaySettingWhileDelaying && (s.currentLoopCount--, s.progress.ratioCompleted = -i * (1 + (-i * s.progress.ratioCompleted + r / o)));var c = s.progress.ratioCompleted;n && (c = 1 - s.progress.ratioCompleted);var f = c * o,
	                    h = s.timestamps.recentRaf - f;s.timestamps.start = h - r, l = s.calculateRatio({ start: s.timestamps.start, later: s.timestamps.recentRaf, delay: r, duration: o });
	              }n && (l = 1 - l);var g = s.lookupSetting("loop"),
	                  d = 1,
	                  m = l < d,
	                  v = s.settings.from,
	                  y = s.settings.to;n && (d = 0, m = l > d);var S = !1,
	                  k = !1,
	                  C = !1,
	                  w = s.progress;if (w.ratioCompleted = l, m || !o || s.lookupSetting("endless")) s.settings.easing ? w.easedRatioCompleted = s.settings.easing(w.ratioCompleted) : w.easedRatioCompleted = w.ratioCompleted, w.tweened = s.getTween(v, y, w.ratioCompleted), w.easedTweened = s.getTween(v, y, w.easedRatioCompleted);else {
	                var R = g === !0 || g && s.currentLoopCount < g;R && !p ? (w.ratioCompleted = -i + l, s.timestamps.start = s.timestamps.start + o, s.settings.easing ? w.easedRatioCompleted = s.settings.easing(w.ratioCompleted) : w.easedRatioCompleted = w.ratioCompleted, w.tweened = s.getTween(v, y, w.ratioCompleted), w.easedTweened = s.getTween(v, y, w.easedRatioCompleted), k = !0) : (w.ratioCompleted = d, w.easedRatioCompleted = d, w.tweened = y, w.easedTweened = y, n && (w.tweened = v, w.easedTweened = v)), R ? (s.currentLoopCount++, C = !k, s.lastDelaySettingWhileDelaying = null) : S = !0;
	              }var b = s.progress.ratioCompleted >= 0;if (n && (b = s.progress.ratioCompleted <= 1), s.settings.frame && b) {
	                var D = s.settings.frame.apply(s, [s.progress]);s.frameCount++, Object.assign(s.progress, D);
	              }S ? (s.running = !1, s.settings.onComplete && s.settings.onComplete.apply(s, [s.progress])) : s.recurse(C, C);
	            }
	          }));
	        } }, { key: "resetAll", value: function value() {
	          return this.stop(!0), this.init(!0), this;
	        } }, { key: "stop", value: function value(t) {
	          var e = this;return this.running = !1, u["default"].caf(this.nextRafId), this.settings.onStop && (t || this.settings.onStop.apply(this, [this.progress])), this.iterateAspectNames(function (s) {
	            var n = e.aspects[s];n.settings.chainedStop && e.aspects[s].stop(t);
	          }), this;
	        } }, { key: "resume", value: function value() {
	          var t = this;if (!this.running) {
	            u["default"].makeStamp("start");var e = this.lookupSetting("duration"),
	                s = this.lookupSetting("reverse"),
	                n = this.progress.ratioCompleted * e;s && (n = (1 - this.progress.ratioCompleted) * e), this.lastDelaySettingWhileDelaying && (n += this.lastDelaySettingWhileDelaying), this.timestamps.start = u["default"].stamps.start - n, this.timestamps.recentRaf = null, this.running = !0, this.iterateAspectNames(function (e) {
	              t.aspects[e].resume();
	            }), this.recurse();
	          }return this;
	        } }, { key: "birthAspect", value: function value(e, s) {
	          return this.aspects[e] && this.aspects[e].stop(), this.aspects[e] = new t(a({}, s), e, this), this.aspects[e];
	        } }, { key: "progressAt", value: function value(t) {
	          var e = t.split("."),
	              s = e[e.length - 1];"undefined" == typeof this.progress[s] && (s = "easedTweened", e.push(s));var n = this.aspectTree;if (t) try {
	            e.forEach(function (t) {
	              n = t !== s ? n.aspects[t] : n.progress[t];
	            });
	          } catch (i) {
	            throw new Error("Error: You specified an invalid aspect path for .progressAt().");
	          } else n = n.progress[s];return n;
	        } }, { key: "aspectAt", value: function value(t) {
	          var e = t.split("."),
	              s = this.aspectTree;if (t) try {
	            e.forEach(function (t) {
	              s = s.aspects[t];
	            });
	          } catch (n) {
	            throw new Error("Error: You specified an invalid aspect path for .aspectAt().");
	          }return s;
	        } }]), t;
	    }(),
	        p = function p() {
	      for (var t = arguments.length, e = Array(t), s = 0; s < t; s++) {
	        e[s] = arguments[s];
	      }return new (Function.prototype.bind.apply(l, [null].concat(e)))();
	    };e.stimulate = p, e.StimulationAspect = l, e["default"] = p;
	  }, function (t, e, s) {
	    "use strict";
	    function n(t) {
	      return t && t.__esModule ? t : { "default": t };
	    }function i(t, e) {
	      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
	    }function a() {
	      return c.raf.apply(c, arguments);
	    }function r() {
	      return c.caf.apply(c, arguments);
	    }Object.defineProperty(e, "__esModule", { value: !0 }), e.caf = e.raf = e.sharedTiming = void 0;var o = function () {
	      function t(t, e) {
	        for (var s = 0; s < e.length; s++) {
	          var n = e[s];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
	        }
	      }return function (e, s, n) {
	        return s && t(e.prototype, s), n && t(e, n), e;
	      };
	    }(),
	        u = s(11),
	        l = n(u),
	        p = function () {
	      function t() {
	        i(this, t), this.running = { count: 0, limit: 0 }, this.stamps = { start: null, raf: null }, this.rafIdRegistry = {};
	      }return o(t, [{ key: "makeStamp", value: function value(t, e) {
	          return this.stamps[t] && !e || (this.stamps[t] = Date.now()), this.stamps[t];
	        } }, { key: "raf", value: function value(t) {
	          var e = this;this.running.count ? this.running.count++ : this.running.count = 1;var s = (0, l["default"])(function () {
	            delete e.rafIdRegistry[s], e.stamps.start = null, e.running.limit || (e.running.limit = e.running.count, e.makeStamp("raf", !0), e.running.count = 0), e.running.limit--, t();
	          });return this.rafIdRegistry[s] = !0, s;
	        } }, { key: "caf", value: function value(t) {
	          t && this.rafIdRegistry[t] && ((0, u.cancel)(t), this.stamps.start = null, this.running.count--, delete this.rafIdRegistry[t]);
	        } }]), t;
	    }(),
	        c = new p();e.sharedTiming = c, e.raf = a, e.caf = r, e["default"] = c;
	  }, function (t, e) {
	    (function (e) {
	      "use strict";
	      for (var s = Date.now, n = "undefined" == typeof window ? e : window, i = ["moz", "webkit"], a = "AnimationFrame", r = n["request" + a], o = n["cancel" + a] || n["cancelRequest" + a], u = 0; !r && u < i.length; u++) {
	        r = n[i[u] + "Request" + a], o = n[i[u] + "Cancel" + a] || n[i[u] + "CancelRequest" + a];
	      }if (!r || !o) {
	        var l = 0,
	            p = 0,
	            c = [],
	            f = 1e3 / 60;r = function r(t) {
	          if (0 === c.length) {
	            var e = s(),
	                n = Math.max(10, f - (e - l));l = n + e, setTimeout(function () {
	              var t = c.slice(0);c.length = 0;for (var e = 0; e < t.length; e++) {
	                if (!t[e].cancelled) try {
	                  t[e].callback(l);
	                } catch (s) {
	                  setTimeout(function () {
	                    throw s;
	                  }, 0);
	                }
	              }
	            }, f);
	          }return c.push({ handle: ++p, callback: t, cancelled: !1 }), p;
	        }, o = function o(t) {
	          for (var e = 0; e < c.length; e++) {
	            c[e].handle === t && (c[e].cancelled = !0);
	          }
	        };
	      }t.exports = function (t) {
	        return r.call(n, t);
	      }, t.exports.cancel = function () {
	        o.apply(n, arguments);
	      }, t.exports.polyfill = function () {
	        n.requestAnimationFrame = r, n.cancelAnimationFrame = o;
	      };
	    }).call(e, function () {
	      return this;
	    }());
	  }, function (t, e) {
	    "use strict";
	    Object.defineProperty(e, "__esModule", { value: !0 });var s = function s(t, e) {
	      var s, n, i;n = [];for (s in e) {
	        i = e[s], n.push(null != t[s] ? t[s] : t[s] = i);
	      }return n;
	    },
	        n = { spring: { frequency: 300, friction: 200, anticipationSize: 0, anticipationStrength: 0 } },
	        i = {};i.spring = function (t) {
	      var e, i, a, r, o, u;return null == t && (t = {}), s(t, n.spring), r = Math.max(1, t.frequency / 20), o = Math.pow(20, t.friction / 100), u = t.anticipationSize / 1e3, a = Math.max(0, u), e = function e(_e) {
	        var s, n, i, a, r;return s = .8, a = u / (1 - u), r = 0, i = (a - s * r) / (a - r), n = (s - i) / a, n * _e * t.anticipationStrength / 100 + i;
	      }, i = function i(t) {
	        return Math.pow(o / 10, -t) * (1 - t);
	      }, function (t) {
	        var s, n, a, o, l, p, c, f;return p = t / (1 - u) - u / (1 - u), t < u ? (f = u / (1 - u) - u / (1 - u), c = 0 / (1 - u) - u / (1 - u), l = Math.acos(1 / e(f)), a = (Math.acos(1 / e(c)) - l) / (r * -u), s = e) : (s = i, l = 0, a = 1), n = s(p), o = r * (t - u) * a + l, 1 - n * Math.cos(o);
	      };
	    };var a = i;e.easings = a, e["default"] = a;
	  }]);
	});
	//# sourceMappingURL=stimulate.min.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ }
/******/ ]);