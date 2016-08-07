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

		this.aspects = this.settings.aspects;
		this.aspectTree = this.lookupSetting('aspectTree');
		const reverse = !!this.lookupSetting('reverse');
		this.progress = this.getProgressDefault(reverse);
		this.progress.aspects = {};

		this.currentLoopCount = 1;


		this.durationAchieved = false;
		this.nextRafId = null;
		this.timestamps = {};

		sharedTiming.get('start');

		this.timestamps.start = sharedTiming.stamps.start;

		this.running = true;

		this.frameAlreadySkippedOnce = false;
		this.iterateAspectNames((name) => {
			if (!resetAll) {
				this.aspects[name] = new StimulationAspect({
					...this.settings.aspects[name],
				}, name, this);
			} else {
				this.aspects[name].init(true);
			}
		});

		this.recurse();
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
	getProgressDefault(reverse) {
		if (reverse) {
			return {
				ratioCompleted: 1,
				easedRatioCompleted: 1,
				tweened: this.settings.to,
				easedTweened: this.settings.to,
			};
		}
		return {
			ratioCompleted: 0,
			easedRatioCompleted: 0,
			tweened: this.settings.from,
			easedTweened: this.settings.from,
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
	getRatio(recentRaf, cumulativeDelay, duration) {
		const startDelay = this.timestamps.start + cumulativeDelay;
		const diff = recentRaf - startDelay;
		const ratioCompleted = diff / duration;
		return ratioCompleted;
	}
	recurse(reset) {
		if (this.running) {
			const duration = this.lookupSetting('duration');
			const reverse = !!this.lookupSetting('reverse');
			const cumulativeDelay = this.delayImmune ? 0 : this.getCumulativeDelay();
			// const skipZeroFrameConfirmed = this.lookupSetting('skipZeroFrame') || !!cumulativeDelay;

			if (reset) {
				Object.assign(this.progress, this.getProgressDefault(reverse));
			}

			let withinRatioBounds = this.progress.ratioCompleted > 0;
			if (reverse) {
				withinRatioBounds = this.progress.ratioCompleted < 1;
			}

			let atBeginning = this.progress.ratioCompleted === 0;
			if (reverse) {
				atBeginning = this.progress.ratioCompleted === 1;
			}

			// if (withinRatioBounds || !skipZeroFrameConfirmed || reset) {
			// 	if (this.settings.frame) {
			// 		this.frame();
			// 	}
			// }

			if (withinRatioBounds || (atBeginning && this.frameAlreadySkippedOnce)) {
				if (this.settings.frame) {
					this.frame();
				}
			}

			if (typeof this.timestamps.recentRaf !== 'undefined') {


			}

			this.nextRafId = sharedTiming.raf(() => {
				this.timestamps.recentRaf = sharedTiming.stamps.raf;
				if (this.running) {
					if (typeof this.previouslyReversed === 'undefined') {
						this.previouslyReversed = reverse;
					}
					const changedDirections = this.previouslyReversed !== reverse;
					this.previouslyReversed = reverse;

					if (reset || (atBeginning && !this.frameAlreadySkippedOnce && !this.lookupSetting('skipZeroFrame'))) {
						this.timestamps.start = this.timestamps.recentRaf;
					}
					this.frameAlreadySkippedOnce = true;


					let ratioCompleted = this.getRatio(this.timestamps.recentRaf, cumulativeDelay, duration);


					if (changedDirections) {
						this.delayImmune = true;
						const timeRemaining = (1 - ratioCompleted) * duration;
						const d = timeRemaining - (this.timestamps.recentRaf - (this.timestamps.start));
						this.timestamps.start -= d;
						ratioCompleted = this.getRatio(this.timestamps.recentRaf, cumulativeDelay, duration);
					}

					if (reverse) {
						ratioCompleted = 1 - ratioCompleted;
					}

					this.durationAchieved = this.assignProgress(ratioCompleted, reverse);


					this.stillLooping = false;
					const loop = this.lookupSetting('loop');

					if (this.durationAchieved) {
						this.delayImmune = false;
					}

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

						let pastDelay = ratioCompleted >= 0;
						if (reverse) {
							pastDelay = ratioCompleted <= 1;
						}

						if (
							this.settings.frame &&
							(
								!cumulativeDelay ||
								pastDelay
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
