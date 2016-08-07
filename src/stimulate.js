import raf, { cancel as caf } from 'raf';

class SharedTiming {
	constructor() {
		this.running = {
			count: 0,
			limit: 0,
		};
		this.stamps = {
			start: null,
			raf: null,
		};
		this.rafIdRegistry = {};
	}
	get(stamp, reset) {
		if (!this.stamps[stamp] || reset) {
			this.stamps[stamp] = Date.now();
		}
		return this.stamps[stamp];
	}
	raf(cb) {
		if (!this.running.count) {
			this.running.count = 1;
		} else {
			this.running.count++;
		}
		const rafId = raf(() => {
			delete this.rafIdRegistry[rafId];
			this.stamps.start = null;
			if (!this.running.limit) {
				this.running.limit = this.running.count;
				this.get('raf', true);
				this.running.count = 0;
			}
			this.running.limit--;
			cb();
		});
		this.rafIdRegistry[rafId] = true;
		return rafId;
	}
	caf(rafId) {
		if (rafId && this.rafIdRegistry[rafId]) {
			caf(rafId);
			this.stamps.start = null;
			this.running.count--;
			delete this.rafIdRegistry[rafId];
		}
	}
}
const sharedTiming = new SharedTiming();
// window.a = sharedTiming;

class StimulationAspect {
	constructor(options, debug = 'root', parent) {
		this.parent = parent;
		this.debug = debug;
		this.options = options;
		this.init();
	}
	getCumulativeDelay() {
		let total = this.lookupSetting('delay');
		if (this.parent && this.settings.delayAddsParentDelay) {
			total += this.parent.getCumulativeDelay();
		}
		return total;
	}
	updateSettings(changeDict) {
		Object.assign(this.settings, changeDict);
	}
	init(resetAll) {
		this.running = false;
		this.aspects = {};
		this.inheritableDefaults = {
			duration: 1000,
			delay: 0,
			delayLoop: false,
			loop: false,
			skipZeroFrame: true,
			aspectTree: this,
			endless: false,
			reverse: false,
		};

		this.defaultSettings = {
			delayAddsParentDelay: false,
			from: 0,
			to: 1,
			easing: null,
			aspects: this.aspects,
			frame: null,
			chainedStop: true,
		};
		this.settings = {
			...this.defaultSettings,
			...this.options,
		};

		let cumulativeDelay = 0;
		if (this.currentLoopCount && this.lookupSetting('delayLoop')) {
			cumulativeDelay = this.getCumulativeDelay();
		}


		this.aspects = this.settings.aspects;
		this.aspectTree = this.lookupSetting('aspectTree');

		this.progress = this.getProgressDefault(this.settings);
		this.progress.aspects = {};

		this.currentLoopCount = 1;


		this.durationAchieved = false;
		this.nextRafId = null;
		this.timestamps = {};

		sharedTiming.get('start');

		this.timestamps.start = sharedTiming.stamps.start;

		this.running = true;

		const skipZeroFrameConfirmed = this.lookupSetting('skipZeroFrame') || !!cumulativeDelay;

		this.iterateAspectNames((name) => {
			if (!resetAll) {
				this.aspects[name] = new StimulationAspect({
					...this.settings.aspects[name],
				}, name, this);
			} else {
				this.aspects[name].init(true);
			}
		});

		if (skipZeroFrameConfirmed) {
			this.recurse();
		} else {
			this.nextRafId = sharedTiming.raf(() => {
				this.recurse();
			});
		}
	}
	lookupSetting(settingsName) {
		if (
			typeof this.settings[settingsName] !== 'undefined' &&
			this.settings[settingsName] !== 'inherit'
		) {
			return this.settings[settingsName];
		} else if (this.parent) {
			return this.parent.lookupSetting(settingsName);
		}
		return this.inheritableDefaults[settingsName];
	}
	iterateAspectNames(cb) {
		this.settings.aspectNames = Object.keys(this.settings.aspects);
		this.settings.aspectNames.forEach((name) => {
			cb(name);
		});
	}
	getProgressDefault(settings) {
		return {
			ratioCompleted: 0,
			easedRatioCompleted: 0,
			tweened: settings.from,
			easedTweened: settings.from,
		};
	}
	frame() {
		const progressChanges = this.settings.frame.apply(this, [this.progress]);
		Object.assign(this.progress, progressChanges);
	}
	getTween(from, to, ratioCompleted) {
		return from + (ratioCompleted * (to - from));
	}
	assignProgress(ratioCompleted, reverse) {
		const settings = this.settings;
		let ratioLimit = 1;
		let withinLimit = ratioCompleted < ratioLimit;
		const from = settings.from;
		const to = settings.to;
		if (reverse) {
			ratioLimit = 0;
			withinLimit = ratioCompleted > ratioLimit;
			// from = settings.to;
			// to = settings.from;
		}
		let durationAchieved = false;
		const p = this.progress;
		p.ratioCompleted = ratioCompleted;
		const duration = this.lookupSetting('duration');
		if (withinLimit || (!duration || this.lookupSetting('endless'))) {
			if (settings.easing) {
				p.easedRatioCompleted = settings.easing(p.ratioCompleted);
			} else {
				p.easedRatioCompleted = p.ratioCompleted;
			}
			p.tweened = this.getTween(from, to, p.ratioCompleted);
			p.easedTweened = this.getTween(from, to, p.easedRatioCompleted);
		} else {
			p.ratioCompleted = ratioLimit;
			p.easedRatioCompleted = ratioLimit;
			p.tweened = to;
			p.easedTweened = to;
			durationAchieved = true;
		}
		return durationAchieved;
	}
	getRatio(cumulativeDelay, duration) {
		let startDelay = this.timestamps.start + cumulativeDelay;
		const diff = sharedTiming.stamps.raf - startDelay;
		let ratioCompleted = diff / duration;
		return ratioCompleted;
	}
	recurse(reset) {
		if (this.running) {
			const cumulativeDelay = this.getCumulativeDelay();
			const skipZeroFrameConfirmed = this.lookupSetting('skipZeroFrame') || !!cumulativeDelay;
			if (this.progress.ratioCompleted > 0 || !skipZeroFrameConfirmed) {
				if (this.settings.frame) {
					this.frame();
				}
			}

			this.nextRafId = sharedTiming.raf(() => {
				if (this.running) {
					const reverse = !!this.lookupSetting('reverse');
					if (typeof this.previouslyReversed === 'undefined') {
						this.previouslyReversed = reverse;
					}
					const changedDirections = this.previouslyReversed !== reverse;
					this.previouslyReversed = reverse;

					if (reset) {
						this.timestamps.start = sharedTiming.stamps.raf;
					}

					const duration = this.lookupSetting('duration');

					let ratioCompleted = this.getRatio(cumulativeDelay, duration);


					if (changedDirections) {
						const timeRemaining = (1 - ratioCompleted) * duration;
						const d = timeRemaining - (sharedTiming.stamps.raf - (this.timestamps.start));
						this.timestamps.start -= d;
						ratioCompleted = this.getRatio(cumulativeDelay, duration);
					}

					if (reverse) {
						ratioCompleted = 1 - ratioCompleted;
					}

					this.durationAchieved = this.assignProgress(ratioCompleted, reverse);

					this.stillLooping = false;
					const loop = this.lookupSetting('loop');
					if (
						this.durationAchieved &&
						(
							loop === true ||
							(
								loop &&
								this.currentLoopCount < loop
							)
						)
					) {
						this.currentLoopCount++;
						this.durationAchieved = false;
						this.stillLooping = true;
					}


					if (!this.durationAchieved) {
						this.recurse(this.stillLooping);
					} else {
						this.running = false;

						if (
							this.settings.frame &&
							(
								!cumulativeDelay ||
								ratioCompleted >= 0
								// startDelay <= sharedTiming.stamps.raf
							)
						) {
							// sharedTiming.raf(() => {
							this.frame();
							// });
						}

						if (this.settings.onComplete) {
							this.settings.onComplete.apply(this, [this.progress]);
						}
					}
				}
			});
		}
	}
	resetAll() {
		this.stop(true);
		this.init(true);
	}
	stop(skipCallback) {
		this.running = false;
		sharedTiming.caf(this.nextRafId);
		if (this.settings.onStop) {
			if (!skipCallback) {
				this.settings.onStop.apply(this, [this.progress]);
			}
		}
		this.iterateAspectNames((name) => {
			const aspect = this.aspects[name];
			if (aspect.settings.chainedStop) {
				this.aspects[name].stop(skipCallback);
			}
		});
	}
	birthAspect(name, settings) {
		if (this.aspects[name]) {
			this.aspects[name].stop();
		}
		this.aspects[name] = new StimulationAspect({
			...settings,
		}, name, this);
	}
	aspectAt(path) {
		const pathSplit = path.split('.');
		let lastItem = pathSplit[pathSplit.length - 1];
		if (typeof this.progress[lastItem] === 'undefined') {
			lastItem = 'easedTweened';
			pathSplit.push(lastItem);
		}
		let place = this.aspectTree;
		if (path) {
			try {
				pathSplit.forEach((name) => {
					if (name !== lastItem) {
						place = place.aspects[name];
					} else {
						place = place.progress[name];
					}
				});
			} catch (e) {
				throw new Error('Error: You specified an invalid aspect path for .aspectAt().');
			}
		} else {
			place = place.progress[lastItem];
		}
		return place;
	}
}

const stimulate = (...args) => {
	return new StimulationAspect(...args);
};
function sharedTimingRaf(...args) {
	return sharedTiming.raf(...args);
}
function sharedTimingCaf(...args) {
	return sharedTiming.caf(...args);
}
export { stimulate, sharedTimingRaf as raf, sharedTimingCaf as caf };
export default stimulate;
