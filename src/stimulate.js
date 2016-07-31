import raf, { cancel as caf } from 'raf';

const sharedTiming = {
	running: {
		count: 0,
		limit: 0,
	},
	stamps: {
		start: null,
		raf: null,
	},
	get(stamp, reset) {
		if (!this.stamps[stamp] || reset) {
			this.stamps[stamp] = Date.now();
		}
		return this.stamps[stamp];
	},
	rafIdRegistry: {},
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
	},
};
// window.a = sharedTiming;

class StimulationAspect {
	constructor(options, debug = 'root') {
		this.debug = debug;
		this.options = options;
		this.init();
	}
	init(resetAll) {
		this.running = false;
		this.aspects = {};
		this.toInherit = [
			'duration',
			'aspectTree',
			'skipZeroFrame',
			'delay',
			'cumulativeDelay',
		];
		this.settings = {
			duration: 1000,
			endless: !this.options.duration || !!this.options.endless,
			aspectTree: this,
			skipZeroFrame: true,
			delay: 0,
			delayAddsParentDelay: false,
			from: 0,
			to: 1,
			easing(v) { return v; },
			aspects: this.aspects,
			frame: null,
			chainedStop: true,
			loop: false,
			delayLoop: false,
			...this.options,
		};
		if (!this.settings.delayAddsParentDelay) {
			this.settings.cumulativeDelay = this.settings.delay;
		} else {
			this.settings.cumulativeDelay = this.settings.delay + this.settings.cumulativeDelay;
		}

		this.aspects = this.settings.aspects;
		this.aspectTree = this.settings.aspectTree;

		this.progress = this.getProgressDefault(this.settings);
		this.progress.aspects = {};

		this.currentLoopCount = 1;


		this.durationAchieved = false;
		this.nextRafId = null;
		this.timestamps = {};

		sharedTiming.get('start');

		this.timestamps.startDelay = sharedTiming.stamps.start + this.settings.cumulativeDelay;
		this.running = true;

		this.skipZeroFrameConfirmed = this.settings.skipZeroFrame || !!this.settings.cumulativeDelay;


		const inherit = {};
		this.toInherit.forEach((key) => {
			inherit[key] = this.settings[key];
		});
		this.iterateAspectNames((name) => {
			if (!resetAll) {
				this.aspects[name] = new StimulationAspect({
					...inherit,
					...this.settings.aspects[name],
				}, name);
			} else {
				this.aspects[name].init(true);
			}
		});

		if (this.skipZeroFrameConfirmed) {
			this.recurse();
		} else {
			this.nextRafId = sharedTiming.raf(() => {
				// delete sharedTiming.rafIdRegistry[this.nextRafId];
				// sharedTiming.stamps.start = null;
				this.recurse();
			});
			// sharedTiming.rafIdRegistry[this.nextRafId] = true;
		}
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
	assignProgress(ratioCompleted, settings) {
		let durationAchieved = false;
		const p = this.progress;
		p.ratioCompleted = ratioCompleted;
		if (p.ratioCompleted < 1 || this.settings.endless) {
			p.easedRatioCompleted = settings.easing(p.ratioCompleted);
			p.tweened = this.getTween(settings.from, settings.to, p.ratioCompleted);
			p.easedTweened = this.getTween(settings.from, settings.to, p.easedRatioCompleted);
		} else {
			p.ratioCompleted = 1;
			p.easedRatioCompleted = 1;
			p.tweened = settings.to;
			p.easedTweened = settings.to;
			durationAchieved = true;
		}
		return durationAchieved;
	}
	recurse(reset) {
		if (this.running) {
			if (this.progress.ratioCompleted > 0 || !this.skipZeroFrameConfirmed) {
				if (this.settings.frame) {
					this.frame();
				}
			}

			this.nextRafId = sharedTiming.raf(() => {
				if (this.running) {
					this.timestamps.recentFrame = sharedTiming.stamps.raf;
					if (reset) {
						const sum = this.timestamps.recentFrame + this.settings.cumulativeDelay;
						this.timestamps.startDelay = sum;
					}
					const diff = this.timestamps.recentFrame - this.timestamps.startDelay;
					const ratioCompleted = diff / this.settings.duration;
					this.durationAchieved = this.assignProgress(ratioCompleted, this.settings);
					let stillLooping = false;
					if (
						this.durationAchieved &&
						(
							this.settings.loop === true ||
							(
								this.settings.loop &&
								this.currentLoopCount < this.settings.loop
							)
						)
					) {
						this.currentLoopCount++;
						this.durationAchieved = false;
						stillLooping = true;
						if (this.settings.delayLoop) {
							this.settings.cumulativeDelay = this.settings.delay;
						} else {
							this.settings.cumulativeDelay = 0;
						}
					}


					if (!this.durationAchieved) {
						this.recurse(stillLooping);
					} else {
						this.running = false;

						if (
							this.settings.frame &&
							(
								!this.settings.cumulativeDelay ||
								this.timestamps.startDelay <= sharedTiming.stamps.raf
							)
						) {
							this.frame();
						}

						if (this.settings.onComplete) {
							this.settings.onComplete.apply(this, [this.progress]);
						}
					}
				}
			});
			// sharedTiming.rafIdRegistry[this.nextRafId] = true;
		}
	}
	resetAll() {
		this.stop(true);
		this.init(true);
	}
	stop(skipCallback) {
		this.running = false;
		if (this.nextRafId && sharedTiming.rafIdRegistry[this.nextRafId]) {
			caf(this.nextRafId);
			sharedTiming.stamps.start = null;
			sharedTiming.running.count--;
			delete sharedTiming.rafIdRegistry[this.nextRafId];
		}
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
		const inherit = {};
		this.toInherit.forEach((key) => {
			inherit[key] = this.settings[key];
		});
		this.aspects[name] = new StimulationAspect({
			...inherit,
			...settings,
		}, name);
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

const stimulate = (options) => {
	return new StimulationAspect(options);
};
const sharedTimingRaf = sharedTiming.raf;
export { stimulate, sharedTimingRaf as raf, caf };
export default stimulate;
