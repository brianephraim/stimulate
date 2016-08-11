/* eslint no-inner-declarations:0 */

import sharedTiming from './sharedTiming';

class StimulationAspect {
	constructor(options, debug = 'root', parent) {
		this.parent = parent;
		this.debug = debug;
		this.options = options;
		this.init();
	}
	init(resetAll) {
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
		if (this.parent) {
			this.aspectTree = this.parent.aspectTree;
		} else {
			this.aspectTree = this;
		}

		const reverse = !!this.lookupSetting('reverse');
		this.previousReverseSetting = reverse;
		const progressDefaults = this.getProgressDefault(reverse);
		if (!this.progress) {
			this.progress = progressDefaults;
		} else {
			Object.assign(this.progress, progressDefaults);
		}

		this.progress.aspects = {};

		this.currentLoopCount = 1;
		this.lastDelaySettingWhileDelaying = null;
		this.running = true;

		this.nextRafId = null;
		this.timestamps = {};

		sharedTiming.makeStamp('start');
		this.timestamps.start = sharedTiming.stamps.start;
		this.timestamps.recentRaf = null;

		this.iterateAspectNames((name) => {
			if (!resetAll) {
				this.aspects[name] = new StimulationAspect({
					...this.settings.aspects[name],
				}, name, this);
			} else {
				this.aspects[name].init(true);
			}
		});
		const skipZeroFrame = this.lookupSetting('skipZeroFrame');
		this.recurse(!skipZeroFrame);
	}
	getCumulativeDelay() {
		let total = this.lookupSetting('delay');
		if (this.parent && this.settings.delayAddsParentDelay) {
			total += this.parent.getCumulativeDelay();
		}
		return total;
	}
	updateSettings(changeDict) {
		if (this.lookupSetting('usePersistedSettings')) {
			Object.assign(this.persistedSettings, changeDict);
		}
		Object.assign(this.settings, changeDict);
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
	getTween(from, to, ratioCompleted) {
		return from + (ratioCompleted * (to - from));
	}
	calculateRatio(options) {
		const startDelay = options.start + options.delay;
		const diff = options.later - startDelay;
		const ratioCompleted = diff / options.duration;
		return ratioCompleted;
	}
	recurse(resetTimestampStart, resetProgress) {
		if (this.running) {
			this.nextRafId = sharedTiming.raf(() => {
				if (this.running) {
					this.timestamps.recentRaf = sharedTiming.stamps.raf;
					if (resetTimestampStart) {
						this.timestamps.start = this.timestamps.recentRaf;
					}

					const reverse = !!this.lookupSetting('reverse');
					const reverseIsNegativeOne = reverse ? -1 : 1;
					const changedDirections = this.previousReverseSetting !== reverse;

					this.previousReverseSetting = reverse;

					if (resetProgress) {
						Object.assign(this.progress, this.getProgressDefault(reverse));
					}

					let delay = 0;
					if (this.lastDelaySettingWhileDelaying !== null) {
						delay = this.lastDelaySettingWhileDelaying;
					} else {
						delay = this.getCumulativeDelay();
					}

					const duration = this.lookupSetting('duration');

					let ratioCompleted = this.calculateRatio({
						start: this.timestamps.start,
						later: this.timestamps.recentRaf,
						delay,
						duration,
					});
					const delayEveryLoop = this.lookupSetting('delayEveryLoop');
					if (
						ratioCompleted > 0 &&
						ratioCompleted < 1 &&
						this.lastDelaySettingWhileDelaying === null
					) {
						this.lastDelaySettingWhileDelaying = delay;
						if (
							(!this.lookupSetting('skipZeroFrame') && delay && this.currentLoopCount <= 1) ||
							(delay && delayEveryLoop && this.currentLoopCount > 1)
						) {
							this.timestamps.start = this.timestamps.recentRaf - delay;
							ratioCompleted = this.calculateRatio({
								start: this.timestamps.start,
								later: this.timestamps.recentRaf,
								delay,
								duration,
							});
						}
					}

					if (changedDirections) {
						if (this.lastDelaySettingWhileDelaying === null) {
							this.currentLoopCount--;
							this.progress.ratioCompleted = (-reverseIsNegativeOne * (
								1 + (
									(-reverseIsNegativeOne * this.progress.ratioCompleted) + (delay / duration)
								)
							));
						}

						let reverseAdjustedRatioCompleted = this.progress.ratioCompleted;
						if (reverse) {
							reverseAdjustedRatioCompleted = 1 - this.progress.ratioCompleted;
						}
						const diff = reverseAdjustedRatioCompleted * duration;
						const startDelay = this.timestamps.recentRaf - diff;
						this.timestamps.start = startDelay - delay;

						ratioCompleted = this.calculateRatio({
							start: this.timestamps.start,
							later: this.timestamps.recentRaf,
							delay,
							duration,
						});
					}

					if (reverse) {
						ratioCompleted = 1 - ratioCompleted;
					}

					const loop = this.lookupSetting('loop');

					let ratioLimit = 1;
					let withinLimit = ratioCompleted < ratioLimit;
					const from = this.settings.from;
					const to = this.settings.to;

					if (reverse) {
						ratioLimit = 0;
						withinLimit = ratioCompleted > ratioLimit;
					}

					let durationAchieved = false;
					let overlapLoop = false;
					let stillLooping = false;
					const p = this.progress;
					p.ratioCompleted = ratioCompleted;
					if (withinLimit || (!duration || this.lookupSetting('endless'))) {
						if (this.settings.easing) {
							p.easedRatioCompleted = this.settings.easing(p.ratioCompleted);
						} else {
							p.easedRatioCompleted = p.ratioCompleted;
						}
						p.tweened = this.getTween(from, to, p.ratioCompleted);
						p.easedTweened = this.getTween(from, to, p.easedRatioCompleted);
					} else {
						const needsAnotherLoop = (
							loop === true || (loop && this.currentLoopCount < loop)
						);
						if (needsAnotherLoop && !delayEveryLoop) {
							p.ratioCompleted = -reverseIsNegativeOne + ratioCompleted;
							this.timestamps.start = this.timestamps.start + (duration);
							if (this.settings.easing) {
								p.easedRatioCompleted = this.settings.easing(p.ratioCompleted);
							} else {
								p.easedRatioCompleted = p.ratioCompleted;
							}
							p.tweened = this.getTween(from, to, p.ratioCompleted);
							p.easedTweened = this.getTween(from, to, p.easedRatioCompleted);
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
							this.currentLoopCount++;
							stillLooping = true && !overlapLoop;
							this.lastDelaySettingWhileDelaying = null;
						} else {
							durationAchieved = true;
						}
					}

					let withinRatioBounds = this.progress.ratioCompleted >= 0;
					if (reverse) {
						withinRatioBounds = this.progress.ratioCompleted <= 1;
					}

					if (this.settings.frame && withinRatioBounds) {
						const progressChanges = this.settings.frame.apply(this, [this.progress]);
						Object.assign(this.progress, progressChanges);
					}

					if (!durationAchieved) {
						this.recurse(stillLooping, stillLooping);
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
			if (this.lastDelaySettingWhileDelaying) {
				adjustment += this.lastDelaySettingWhileDelaying;
			}
			this.timestamps.start = sharedTiming.stamps.start - adjustment;
			this.timestamps.recentRaf = null;
			this.running = true;


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
