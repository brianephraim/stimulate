import sharedTiming from './sharedTiming';

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
		Object.assign(this.persistedSettings, changeDict);
		Object.assign(this.settings, changeDict);
	}
	init(resetAll) {
		this.running = false;
		this.aspects = {};
		if (!this.persistedSettings) {
			this.persistedSettings = {};
		}
		this.inheritableDefaults = {
			duration: 1000,
			delay: 0,
			delayLoop: false,
			loop: false,
			skipZeroFrame: true,
			aspectTree: this,
			endless: false,
			reverse: false,
			usePersistedSettings: false,
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
		if (this.lookupSetting('usePersistedSettings')) {
			Object.assign(this.settings, this.persistedSettings);
		}

		this.aspects = this.settings.aspects;
		this.aspectTree = this.lookupSetting('aspectTree');
		const reverse = !!this.lookupSetting('reverse');
		const progressDefaults = this.getProgressDefault(reverse);
		if (!this.progress) {
			this.progress = progressDefaults;
		} else {
			Object.assign(this.progress, progressDefaults);
		}

		this.progress.aspects = {};

		this.currentLoopCount = 1;


		this.progress.durationAchieved = false;
		this.nextRafId = null;
		this.timestamps = {};


		sharedTiming.makeStamp('start');

		this.timestamps.start = sharedTiming.stamps.start;
		this.timestamps.recentRaf = null;
		this.running = true;
		this.delayLock = null;

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
	calculateProgress(ratioCompleted, reverse) {
		const settings = this.settings;
		let ratioLimit = 1;
		let withinLimit = ratioCompleted < ratioLimit;
		const from = settings.from;
		const to = settings.to;
		if (reverse) {
			ratioLimit = 0;
			withinLimit = ratioCompleted > ratioLimit;
		}
		const p = {};
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
			p.durationAchieved = false;
		} else {
			p.ratioCompleted = ratioLimit;
			p.easedRatioCompleted = ratioLimit;
			p.tweened = to;
			p.easedTweened = to;
			if (reverse) {
				p.tweened = from;
				p.easedTweened = from;
			}
			p.durationAchieved = true;
		}
		return p;
	}
	calculateRatio(options) {
		let delay = options.delay;
		if (this.delayLock !== null) {
			delay = this.delayLock;
		}
		const startDelay = options.start + delay;
		const diff = options.later - startDelay;
		const ratioCompleted = diff / options.duration;
		if (
			this.progress.ratioCompleted > 0 &&
			this.progress.ratioCompleted < 1 &&
			this.delayLock === null
		) {
			this.delayLock = delay;
		}


		return ratioCompleted;
	}
	isAtBeginning(reverse) {
		let atBeginning = this.progress.ratioCompleted === 0;
		if (reverse) {
			atBeginning = this.progress.ratioCompleted === 1;
		}
		return atBeginning;
	}
	isWithinBounds(reverse) {
		let withinRatioBounds = this.progress.ratioCompleted > 0;
		if (reverse) {
			withinRatioBounds = this.progress.ratioCompleted < 1;
		}
		return withinRatioBounds;
	}
	determineIfDirectionChanged(reverse) {
		if (typeof this.previouslyReversed === 'undefined') {
			this.previouslyReversed = reverse;
		}
		const changedDirections = (
			this.previouslyReversed !== reverse &&
			this.frameAlreadySkippedOnce
		);
		this.previouslyReversed = reverse;
		return changedDirections;
	}
	recurse(reset) {
		if (this.running) {
			this.nextRafId = sharedTiming.raf(() => {
				if (this.running) {
					const duration = this.lookupSetting('duration');
					const reverse = !!this.lookupSetting('reverse');

					if (reset) {
						Object.assign(this.progress, this.getProgressDefault(reverse));
					}
					let updatedProgress;
					if (this.timestamps.recentRaf) {
						const changedDirections = this.determineIfDirectionChanged(reverse);
						if (reset || (
							this.isAtBeginning(reverse) &&
							!this.frameAlreadySkippedOnce &&
							!this.lookupSetting('skipZeroFrame')
						)) {
							this.timestamps.start = this.timestamps.recentRaf;
						}
						this.frameAlreadySkippedOnce = true;

						const cumulativeDelay = this.getCumulativeDelay();

						const delayForRatioConsideration = this.delayImmune ? 0 : cumulativeDelay;

						let ratioCompleted = this.calculateRatio({
							start: this.timestamps.start,
							later: this.timestamps.recentRaf,
							delay: delayForRatioConsideration,
							duration,
						});

						if (changedDirections) {
							this.delayImmune = true;
							// const timeRemaining = (1 - ratioCompleted) * duration;
							// const d = timeRemaining - (this.timestamps.recentRaf - (this.timestamps.start));
							// let delayAdjustment = 0;
							// if (this.delayLock) {
							// 	delayAdjustment = cumulativeDelay;
							// }
							// this.timestamps.start -= d + delayAdjustment;
							const options = {
								start: this.timestamps.start,
								later: this.timestamps.recentRaf,
								delay: delayForRatioConsideration,
								duration,
							};

							let delay = options.delay;
							if (this.delayLock !== null) {
								delay = this.delayLock;
							}
							let reverseAdjustedRatioCompleted = this.progress.ratioCompleted;
							if (reverse) {
								reverseAdjustedRatioCompleted = 1 - this.progress.ratioCompleted;
							}
							const diff = reverseAdjustedRatioCompleted * options.duration;
							const startDelay = options.later - diff;
							this.timestamps.start = startDelay - delay;

							ratioCompleted = this.calculateRatio({
								start: this.timestamps.start,
								later: this.timestamps.recentRaf,
								delay: delayForRatioConsideration,
								duration,
							});

							if (
								this.progress.ratioCompleted > 0 &&
								this.progress.ratioCompleted < 1 &&
								this.delayLock === null
							) {
								this.delayLock = delay;
							}
						}

						if (reverse) {
							ratioCompleted = 1 - ratioCompleted;
						}

						updatedProgress = this.calculateProgress(ratioCompleted, reverse);
						this.stillLooping = false;
						const loop = this.lookupSetting('loop');

						if (updatedProgress.durationAchieved) {
							this.delayImmune = false;
						}

						if (
							updatedProgress.durationAchieved &&
							(
								loop === true ||
								(
									loop &&
									this.currentLoopCount < loop
								)
							)
						) {
							this.currentLoopCount++;
							updatedProgress.durationAchieved = false;
							this.stillLooping = true;
							this.delayLock = null;
						}
						Object.assign(this.progress, updatedProgress);

						if (
							this.settings.frame && (
								this.isWithinBounds(reverse) ||
								(this.isAtBeginning(reverse) && this.frameAlreadySkippedOnce)
							)
						) {
							this.frame();
						}
					}
					this.timestamps.recentRaf = sharedTiming.stamps.raf;

					if (!this.progress.durationAchieved) {
						this.recurse(this.stillLooping);
					} else {
						this.running = false;
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
	resume() {
		if (!this.running) {
			sharedTiming.makeStamp('start');
			const duration = this.lookupSetting('duration');
			const reverse = this.lookupSetting('reverse');

			let adjustment = (this.progress.ratioCompleted * duration);
			if (reverse) {
				adjustment = (1 - this.progress.ratioCompleted) * duration;
			}

			if (this.delayLock) {
				adjustment += this.delayLock;
			}
			// console.log(this.delayLock);
			this.timestamps.start = sharedTiming.stamps.start - adjustment;
			this.timestamps.recentRaf = null;
			this.running = true;

			this.frameAlreadySkippedOnce = false;

			this.iterateAspectNames((name) => {
				this.aspects[name].resume();
			});

			this.recurse();
		}
	}
	birthAspect(name, settings) {
		if (this.aspects[name]) {
			this.aspects[name].stop();
		}
		this.aspects[name] = new StimulationAspect({
			...settings,
		}, name, this);
	}
	progressAt(path) {
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
				throw new Error('Error: You specified an invalid aspect path for .progressAt().');
			}
		} else {
			place = place.progress[lastItem];
		}
		return place;
	}
	aspectAt(path) {
		const pathSplit = path.split('.');
		let place = this.aspectTree;
		if (path) {
			try {
				pathSplit.forEach((name) => {
					place = place.aspects[name];
				});
			} catch (e) {
				throw new Error('Error: You specified an invalid aspect path for .aspectAt().');
			}
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
export { stimulate, StimulationAspect, sharedTimingRaf as raf, sharedTimingCaf as caf };
export default stimulate;
