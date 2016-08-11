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
		this.running = false;
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
		this.previouslyReversed = reverse;
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
		this.delayLock = null;

		this.running = true;

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
	frame() {
		const progressChanges = this.settings.frame.apply(this, [this.progress]);
		Object.assign(this.progress, progressChanges);
	}
	getTween(from, to, ratioCompleted) {
		return from + (ratioCompleted * (to - from));
	}
	needsAnotherLoop(loop) {
		return (
			loop === true ||
			(
				loop &&
				this.currentLoopCount < loop
			)
		);
	}
	calculateProgress(ratioCompleted, reverse) {
		const settings = this.settings;
		let ratioLimit = 1;
		let withinLimit = ratioCompleted < ratioLimit;
		const from = settings.from;
		const to = settings.to;
		let loopCompensator = -1;
		if (reverse) {
			loopCompensator = 1;
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
			const loop = this.lookupSetting('loop');
			const delayEveryLoop = this.lookupSetting('delayEveryLoop');
			if (this.needsAnotherLoop(loop) && !delayEveryLoop) {
				p.ratioCompleted = loopCompensator + ratioCompleted;
				this.timestamps.start = this.timestamps.start + (duration);
				if (settings.easing) {
					p.easedRatioCompleted = settings.easing(p.ratioCompleted);
				} else {
					p.easedRatioCompleted = p.ratioCompleted;
				}
				p.tweened = this.getTween(from, to, p.ratioCompleted);
				p.easedTweened = this.getTween(from, to, p.easedRatioCompleted);
				p.overlapLoop = true;
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
			p.durationAchieved = true;
		}
		return p;
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

	calculateRatio(options) {
		const startDelay = options.start + options.delay;
		const diff = options.later - startDelay;
		const ratioCompleted = diff / options.duration;
		return ratioCompleted;
	}
	determineIfDirectionChanged(reverse) {
		const changedDirections = (
			this.previouslyReversed !== reverse
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

					this.timestamps.recentRaf = sharedTiming.stamps.raf;
					const changedDirections = this.determineIfDirectionChanged(reverse);
					if (reset) {
						this.timestamps.start = this.timestamps.recentRaf;
					}

					let delay = this.delayImmune ? 0 : this.getCumulativeDelay();

					if (this.delayLock !== null) {
						delay = this.delayLock;
					}

					let ratioCompleted = this.calculateRatio({
						start: this.timestamps.start,
						later: this.timestamps.recentRaf,
						delay,
						duration,
					});
					if (
						ratioCompleted > 0 &&
						ratioCompleted < 1 &&
						this.delayLock === null
					) {
						this.delayLock = delay;
						if (
							(!this.lookupSetting('skipZeroFrame') && delay && this.currentLoopCount <= 1) ||
							(delay && this.lookupSetting('delayEveryLoop') && this.currentLoopCount > 1)
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
						this.delayImmune = true;

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

					const updatedProgress = this.calculateProgress(ratioCompleted, reverse);
					const overlapLoop = updatedProgress.overlapLoop;
					delete updatedProgress.overlapLoop;
					Object.assign(this.progress, updatedProgress);
					let stillLooping = false;
					const loop = this.lookupSetting('loop');

					if (this.progress.durationAchieved) {
						this.delayImmune = false;
					}

					if (
						this.progress.durationAchieved &&
						(
							this.needsAnotherLoop(loop)
						)
					) {
						this.currentLoopCount++;
						this.progress.durationAchieved = false;
						stillLooping = true && !overlapLoop;
						this.delayLock = null;
					}

					if (
						this.settings.frame && (
							this.isWithinBounds(reverse) ||
							(this.isAtBeginning(reverse))
						)
					) {
						this.frame();
					}

					if (!this.progress.durationAchieved) {
						this.recurse(stillLooping);
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
