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
	    function e(s) {
	      if (n[s]) return n[s].exports;var i = n[s] = { exports: {}, id: s, loaded: !1 };return t[s].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
	    }var n = {};return e.m = t, e.c = n, e.p = "", e(0);
	  }([function (t, e, n) {
	    t.exports = n(8);
	  },,,,,,,, function (t, e, n) {
	    "use strict";
	    function s(t) {
	      return t && t.__esModule ? t : { "default": t };
	    }Object.defineProperty(e, "__esModule", { value: !0 }), e.caf = e.raf = e.sharedTiming = e.easings = e.stimulate = void 0;var i = n(9),
	        r = s(i),
	        a = n(14),
	        o = s(a),
	        u = n(10);e.stimulate = r["default"], e.easings = o["default"], e.sharedTiming = u.sharedTiming, e.raf = u.raf, e.caf = u.caf, e["default"] = r["default"];
	  }, function (t, e, n) {
	    "use strict";
	    function s(t) {
	      return t && t.__esModule ? t : { "default": t };
	    }function i(t, e) {
	      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
	    }Object.defineProperty(e, "__esModule", { value: !0 }), e.StimulationAspect = e.stimulate = void 0;var r = Object.assign || function (t) {
	      for (var e = 1; e < arguments.length; e++) {
	        var n = arguments[e];for (var s in n) {
	          Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
	        }
	      }return t;
	    },
	        a = function () {
	      function t(t, e) {
	        for (var n = 0; n < e.length; n++) {
	          var s = e[n];s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
	        }
	      }return function (e, n, s) {
	        return n && t(e.prototype, n), s && t(e, s), e;
	      };
	    }(),
	        o = n(10),
	        u = s(o);console.log("qqqqqqqqqqq");var l = function () {
	      function t(e) {
	        var n = arguments.length <= 1 || void 0 === arguments[1] ? "root" : arguments[1],
	            s = arguments[2];i(this, t), this.parent = s, this.debug = n, this.options = e, this.init();
	      }return a(t, [{ key: "init", value: function value(e) {
	          var n = this;this.aspects = {}, this.persistedSettings || (this.persistedSettings = {}), this.inheritableDefaults = { duration: 1e3, delay: 0, delayEveryLoop: !1, loop: !1, skipZeroFrame: !0, endless: !1, reverse: !1, usePersistedSettings: !1 }, this.defaultSettings = { delayAddsParentDelay: !1, from: 0, to: 1, easing: null, aspects: this.aspects, frame: null, chainedStop: !0 }, this.settings = r({}, this.defaultSettings, this.options), this.lookupSetting("usePersistedSettings") && Object.assign(this.settings, this.persistedSettings), this.aspects = this.settings.aspects, this.parent ? this.aspectTree = this.parent.aspectTree : this.aspectTree = this;var s = !!this.lookupSetting("reverse");this.previousReverseSetting = s;var i = this.getProgressDefault(s);this.progress ? Object.assign(this.progress, i) : (this.progress = i, this.progress.aspects = {}), this.currentLoopCount = 1, this.lastDelaySettingWhileDelaying = null, this.running = !0, this.nextRafId = null, this.timestamps = {}, u["default"].makeStamp("start"), this.timestamps.start = u["default"].stamps.start, this.timestamps.recentRaf = null, this.iterateAspectNames(function (s) {
	            e ? n.aspects[s].init(!0) : (n.aspects[s] = new t(r({}, n.settings.aspects[s]), s, n), n.progress.aspects[s] = n.aspects[s].progress);
	          });var a = this.lookupSetting("skipZeroFrame");this.recurse(!a);
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
	        } }, { key: "getTween", value: function value(t, e, n) {
	          return t + n * (e - t);
	        } }, { key: "calculateRatio", value: function value(t) {
	          var e = t.start + t.delay,
	              n = t.later - e,
	              s = n / t.duration;return s;
	        } }, { key: "recurse", value: function value(t, e) {
	          var n = this;this.running && (this.nextRafId = u["default"].raf(function () {
	            if (n.running) {
	              n.timestamps.recentRaf = u["default"].stamps.raf, t && (n.timestamps.start = n.timestamps.recentRaf);var s = !!n.lookupSetting("reverse"),
	                  i = s ? -1 : 1,
	                  r = n.previousReverseSetting !== s;n.previousReverseSetting = s, e && Object.assign(n.progress, n.getProgressDefault(s));var a = 0;a = null !== n.lastDelaySettingWhileDelaying ? n.lastDelaySettingWhileDelaying : n.getCumulativeDelay();var o = n.lookupSetting("duration"),
	                  l = n.calculateRatio({ start: n.timestamps.start, later: n.timestamps.recentRaf, delay: a, duration: o }),
	                  c = n.lookupSetting("delayEveryLoop");if (l > 0 && l < 1 && null === n.lastDelaySettingWhileDelaying && (n.lastDelaySettingWhileDelaying = a, (!n.lookupSetting("skipZeroFrame") && a && n.currentLoopCount <= 1 || a && c && n.currentLoopCount > 1) && (n.timestamps.start = n.timestamps.recentRaf - a, l = n.calculateRatio({ start: n.timestamps.start, later: n.timestamps.recentRaf, delay: a, duration: o }))), r) {
	                null === n.lastDelaySettingWhileDelaying && (n.currentLoopCount--, n.progress.ratioCompleted = -i * (1 + (-i * n.progress.ratioCompleted + a / o)));var p = n.progress.ratioCompleted;s && (p = 1 - n.progress.ratioCompleted);var f = p * o,
	                    h = n.timestamps.recentRaf - f;n.timestamps.start = h - a, l = n.calculateRatio({ start: n.timestamps.start, later: n.timestamps.recentRaf, delay: a, duration: o });
	              }s && (l = 1 - l);var d = n.lookupSetting("loop"),
	                  g = 1,
	                  m = l < g,
	                  v = n.settings.from,
	                  y = n.settings.to;s && (g = 0, m = l > g);var w = !1,
	                  S = !1,
	                  k = !1,
	                  C = n.progress;if (C.ratioCompleted = l, m || !o || n.lookupSetting("endless")) n.settings.easing ? C.easedRatioCompleted = n.settings.easing(C.ratioCompleted) : C.easedRatioCompleted = C.ratioCompleted, C.tweened = n.getTween(v, y, C.ratioCompleted), C.easedTweened = n.getTween(v, y, C.easedRatioCompleted);else {
	                var b = d === !0 || d && n.currentLoopCount < d;b && !c ? (C.ratioCompleted = -i + l, n.timestamps.start = n.timestamps.start + o, n.settings.easing ? C.easedRatioCompleted = n.settings.easing(C.ratioCompleted) : C.easedRatioCompleted = C.ratioCompleted, C.tweened = n.getTween(v, y, C.ratioCompleted), C.easedTweened = n.getTween(v, y, C.easedRatioCompleted), S = !0) : (C.ratioCompleted = g, C.easedRatioCompleted = g, C.tweened = y, C.easedTweened = y, s && (C.tweened = v, C.easedTweened = v)), b ? (n.currentLoopCount++, k = !S, n.lastDelaySettingWhileDelaying = null) : w = !0;
	              }var T = n.progress.ratioCompleted >= 0;if (s && (T = n.progress.ratioCompleted <= 1), n.settings.frame && T) {
	                var R = n.settings.frame.apply(n, [n.progress]);Object.assign(n.progress, R);
	              }w ? (n.running = !1, n.settings.onComplete && n.settings.onComplete.apply(n, [n.progress])) : n.recurse(k, k);
	            }
	          }));
	        } }, { key: "resetAll", value: function value() {
	          return this.stop(!0), this.init(!0), this;
	        } }, { key: "stop", value: function value(t) {
	          var e = this;return this.running = !1, u["default"].caf(this.nextRafId), this.settings.onStop && (t || this.settings.onStop.apply(this, [this.progress])), this.iterateAspectNames(function (n) {
	            var s = e.aspects[n];s.settings.chainedStop && e.aspects[n].stop(t);
	          }), this;
	        } }, { key: "resume", value: function value() {
	          var t = this;if (!this.running) {
	            u["default"].makeStamp("start");var e = this.lookupSetting("duration"),
	                n = this.lookupSetting("reverse"),
	                s = this.progress.ratioCompleted * e;n && (s = (1 - this.progress.ratioCompleted) * e), this.lastDelaySettingWhileDelaying && (s += this.lastDelaySettingWhileDelaying), this.timestamps.start = u["default"].stamps.start - s, this.timestamps.recentRaf = null, this.running = !0, this.iterateAspectNames(function (e) {
	              t.aspects[e].resume();
	            }), this.recurse();
	          }return this;
	        } }, { key: "birthAspect", value: function value(e, n) {
	          return this.aspects[e] && this.aspects[e].stop(), this.aspects[e] = new t(r({}, n), e, this), this.aspects[e];
	        } }, { key: "progressAt", value: function value(t) {
	          var e = t.split("."),
	              n = e[e.length - 1];"undefined" == typeof this.progress[n] && (n = "easedTweened", e.push(n));var s = this.aspectTree;if (t) try {
	            e.forEach(function (t) {
	              s = t !== n ? s.aspects[t] : s.progress[t];
	            });
	          } catch (i) {
	            throw new Error("Error: You specified an invalid aspect path for .progressAt().");
	          } else s = s.progress[n];return s;
	        } }, { key: "aspectAt", value: function value(t) {
	          var e = t.split("."),
	              n = this.aspectTree;if (t) try {
	            e.forEach(function (t) {
	              n = n.aspects[t];
	            });
	          } catch (s) {
	            throw new Error("Error: You specified an invalid aspect path for .aspectAt().");
	          }return n;
	        } }]), t;
	    }(),
	        c = function c() {
	      for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) {
	        e[n] = arguments[n];
	      }return new (Function.prototype.bind.apply(l, [null].concat(e)))();
	    };e.stimulate = c, e.StimulationAspect = l, e["default"] = c;
	  }, function (t, e, n) {
	    "use strict";
	    function s(t) {
	      return t && t.__esModule ? t : { "default": t };
	    }function i(t, e) {
	      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
	    }function r() {
	      return p.raf.apply(p, arguments);
	    }function a() {
	      return p.caf.apply(p, arguments);
	    }Object.defineProperty(e, "__esModule", { value: !0 }), e.caf = e.raf = e.sharedTiming = void 0;var o = function () {
	      function t(t, e) {
	        for (var n = 0; n < e.length; n++) {
	          var s = e[n];s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
	        }
	      }return function (e, n, s) {
	        return n && t(e.prototype, n), s && t(e, s), e;
	      };
	    }(),
	        u = n(11),
	        l = s(u),
	        c = function () {
	      function t() {
	        i(this, t), this.running = { count: 0, limit: 0 }, this.stamps = { start: null, raf: null }, this.rafIdRegistry = {};
	      }return o(t, [{ key: "makeStamp", value: function value(t, e) {
	          return this.stamps[t] && !e || (this.stamps[t] = Date.now()), this.stamps[t];
	        } }, { key: "raf", value: function value(t) {
	          var e = this;this.running.count ? this.running.count++ : this.running.count = 1;var n = (0, l["default"])(function () {
	            delete e.rafIdRegistry[n], e.stamps.start = null, e.running.limit || (e.running.limit = e.running.count, e.makeStamp("raf", !0), e.running.count = 0), e.running.limit--, t();
	          });return this.rafIdRegistry[n] = !0, n;
	        } }, { key: "caf", value: function value(t) {
	          t && this.rafIdRegistry[t] && ((0, u.cancel)(t), this.stamps.start = null, this.running.count--, delete this.rafIdRegistry[t]);
	        } }]), t;
	    }(),
	        p = new c();e.sharedTiming = p, e.raf = r, e.caf = a, e["default"] = p;
	  }, function (t, e, n) {
	    (function (e) {
	      for (var s = n(12), i = "undefined" == typeof window ? e : window, r = ["moz", "webkit"], a = "AnimationFrame", o = i["request" + a], u = i["cancel" + a] || i["cancelRequest" + a], l = 0; !o && l < r.length; l++) {
	        o = i[r[l] + "Request" + a], u = i[r[l] + "Cancel" + a] || i[r[l] + "CancelRequest" + a];
	      }if (!o || !u) {
	        var c = 0,
	            p = 0,
	            f = [],
	            h = 1e3 / 60;o = function o(t) {
	          if (0 === f.length) {
	            var e = s(),
	                n = Math.max(0, h - (e - c));c = n + e, setTimeout(function () {
	              var t = f.slice(0);f.length = 0;for (var e = 0; e < t.length; e++) {
	                if (!t[e].cancelled) try {
	                  t[e].callback(c);
	                } catch (n) {
	                  setTimeout(function () {
	                    throw n;
	                  }, 0);
	                }
	              }
	            }, Math.round(n));
	          }return f.push({ handle: ++p, callback: t, cancelled: !1 }), p;
	        }, u = function u(t) {
	          for (var e = 0; e < f.length; e++) {
	            f[e].handle === t && (f[e].cancelled = !0);
	          }
	        };
	      }t.exports = function (t) {
	        return o.call(i, t);
	      }, t.exports.cancel = function () {
	        u.apply(i, arguments);
	      }, t.exports.polyfill = function () {
	        i.requestAnimationFrame = o, i.cancelAnimationFrame = u;
	      };
	    }).call(e, function () {
	      return this;
	    }());
	  }, function (t, e, n) {
	    (function (e) {
	      (function () {
	        var n, s, i;"undefined" != typeof performance && null !== performance && performance.now ? t.exports = function () {
	          return performance.now();
	        } : "undefined" != typeof e && null !== e && e.hrtime ? (t.exports = function () {
	          return (n() - i) / 1e6;
	        }, s = e.hrtime, n = function n() {
	          var t;return t = s(), 1e9 * t[0] + t[1];
	        }, i = n()) : Date.now ? (t.exports = function () {
	          return Date.now() - i;
	        }, i = Date.now()) : (t.exports = function () {
	          return new Date().getTime() - i;
	        }, i = new Date().getTime());
	      }).call(this);
	    }).call(e, n(13));
	  }, function (t, e) {
	    function n(t) {
	      return u === setTimeout ? setTimeout(t, 0) : u.call(null, t, 0);
	    }function s(t) {
	      l === clearTimeout ? clearTimeout(t) : l.call(null, t);
	    }function i() {
	      h && p && (h = !1, p.length ? f = p.concat(f) : d = -1, f.length && r());
	    }function r() {
	      if (!h) {
	        var t = n(i);h = !0;for (var e = f.length; e;) {
	          for (p = f, f = []; ++d < e;) {
	            p && p[d].run();
	          }d = -1, e = f.length;
	        }p = null, h = !1, s(t);
	      }
	    }function a(t, e) {
	      this.fun = t, this.array = e;
	    }function o() {}var u,
	        l,
	        c = t.exports = {};!function () {
	      try {
	        u = setTimeout;
	      } catch (t) {
	        u = function u() {
	          throw new Error("setTimeout is not defined");
	        };
	      }try {
	        l = clearTimeout;
	      } catch (t) {
	        l = function l() {
	          throw new Error("clearTimeout is not defined");
	        };
	      }
	    }();var p,
	        f = [],
	        h = !1,
	        d = -1;c.nextTick = function (t) {
	      var e = new Array(arguments.length - 1);if (arguments.length > 1) for (var s = 1; s < arguments.length; s++) {
	        e[s - 1] = arguments[s];
	      }f.push(new a(t, e)), 1 !== f.length || h || n(r);
	    }, a.prototype.run = function () {
	      this.fun.apply(null, this.array);
	    }, c.title = "browser", c.browser = !0, c.env = {}, c.argv = [], c.version = "", c.versions = {}, c.on = o, c.addListener = o, c.once = o, c.off = o, c.removeListener = o, c.removeAllListeners = o, c.emit = o, c.binding = function (t) {
	      throw new Error("process.binding is not supported");
	    }, c.cwd = function () {
	      return "/";
	    }, c.chdir = function (t) {
	      throw new Error("process.chdir is not supported");
	    }, c.umask = function () {
	      return 0;
	    };
	  }, function (t, e) {
	    "use strict";
	    Object.defineProperty(e, "__esModule", { value: !0 });var n = function n(t, e) {
	      var n, s, i;s = [];for (n in e) {
	        i = e[n], s.push(null != t[n] ? t[n] : t[n] = i);
	      }return s;
	    },
	        s = { spring: { frequency: 300, friction: 200, anticipationSize: 0, anticipationStrength: 0 } },
	        i = {};i.spring = function (t) {
	      var e, i, r, a, o, u;return null == t && (t = {}), n(t, s.spring), a = Math.max(1, t.frequency / 20), o = Math.pow(20, t.friction / 100), u = t.anticipationSize / 1e3, r = Math.max(0, u), e = function e(_e) {
	        var n, s, i, r, a;return n = .8, r = u / (1 - u), a = 0, i = (r - n * a) / (r - a), s = (n - i) / r, s * _e * t.anticipationStrength / 100 + i;
	      }, i = function i(t) {
	        return Math.pow(o / 10, -t) * (1 - t);
	      }, function (t) {
	        var n, s, r, o, l, c, p, f;return c = t / (1 - u) - u / (1 - u), t < u ? (f = u / (1 - u) - u / (1 - u), p = 0 / (1 - u) - u / (1 - u), l = Math.acos(1 / e(f)), r = (Math.acos(1 / e(p)) - l) / (a * -u), n = e) : (n = i, l = 0, r = 1), s = n(c), o = a * (t - u) * r + l, 1 - s * Math.cos(o);
	      };
	    };var r = i;e.easings = r, e["default"] = r;
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