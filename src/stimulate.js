import raf, { cancel as caf } from 'raf';

class Stimulation {
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

		if (!this.aspectTree.startTimestamp) {
			this.aspectTree.startTimestamp = Date.now();
		}
		this.timestamps.startDelay = this.aspectTree.startTimestamp + this.settings.cumulativeDelay;
		this.running = true;

		this.skipZeroFrameConfirmed = this.settings.skipZeroFrame || !!this.settings.cumulativeDelay;


		const inherit = {};
		this.toInherit.forEach((key) => {
			inherit[key] = this.settings[key];
		});
		this.iterateAspectNames((name) => {
			if (!resetAll) {
				this.aspects[name] = new Stimulation({
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
			this.nextRafId = raf(() => {
				this.recurse();
			});
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
			if (!this.aspectTree.runningCount) {
				this.aspectTree.runningCount = 1;
			} else {
				this.aspectTree.runningCount++;
			}
			// console.log("this.aspectTree.runningCount",this.aspectTree.runningCount)
			this.nextRafId = raf(() => {
				if (this.running) {
					// console.log("this.aspectTree.runningCount",this.aspectTree.runningCount)
					if (!this.aspectTree.runningLimit) {
						this.aspectTree.runningLimit = this.aspectTree.runningCount;
						this.aspectTree.recentFrameTimestamp = Date.now();
						this.aspectTree.runningCount = 0;
						// console.log("LIMIT",this.aspectTree.runningCount);
					}

					this.aspectTree.runningLimit--;

					this.timestamps.recentFrame = this.aspectTree.recentFrameTimestamp;
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
							(
								!this.settings.cumulativeDelay ||
								this.timestamps.startDelay <= this.aspectTree.recentFrameTimestamp
							) &&
							this.settings.frame
						) {
							this.frame();
						}

						// this.frame();
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
		delete this.aspectTree.startTimestamp;
		this.aspectTree.runningCount = 0;
		this.init(true);
	}
	stop(skipCallback) {
		this.running = false;
		caf(this.nextRafId);
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
	return new Stimulation(options);
};
export { stimulate, raf, caf };
export default stimulate;
