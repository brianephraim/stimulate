import raf from "raf";
import {cancel as caf} from "raf";
const stimulate = (function(){
	var Stimulation = function(options,debug){
		this.debug = debug;
		this.options = options;
		this.init();
	};
	Stimulation.prototype.init = function(resetAll){
		this.running = false;
		this.aspects = {};
		this.toInherit = [
			"duration",
			"aspectTree",
			"skipZeroFrame",
			"delay",
			"cumulativeDelay"
		];
		this.settings = {
			duration: 1000,
			endless: !this.options.duration || !!this.options.endless,
			aspectTree: this,
			skipZeroFrame: true,
			delay:0,
			delayAddsParentDelay: false,
			from: 0,
			to: 1,
			easing: function(v){return v;},
			aspects: this.aspects,
			frame: null,
			chainedStop: true,
			delayAddsParentDelay: false,
			loop:false,
			delayLoop:false,
			...this.options,
		};
		if(!this.settings.delayAddsParentDelay){
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

		this.timestamps.startDelay = Date.now() + this.settings.cumulativeDelay;
		this.running = true;

		if(this.settings.skipZeroFrame) {
			this.recurse();
		} else {
			this.nextRafId = raf(() => {
				this.recurse();
			});
		}

		var inherit = {};
		this.toInherit.forEach((key) => {
			inherit[key] = this.settings[key]
		});
		this.iterateAspectNames((name) => {
			if(!resetAll){
				this.aspects[name] = new Stimulation({
					...inherit,
					...this.settings.aspects[name]
				},name);
			} else {
				this.aspects[name].init(true)
			}
		});
	};

	Stimulation.prototype.iterateAspectNames = function(cb){
		this.settings.aspectNames = Object.keys(this.settings.aspects);
		this.settings.aspectNames.forEach((name) => {
			cb(name);
		});
	};
	Stimulation.prototype.getProgressDefault = function(settings){
		return {
			ratioCompleted: 0,
			easedRatioCompleted: 0,
			tweened: settings.from,
			easedTweened: settings.from
		};
	};
	Stimulation.prototype.frame = function(){
		var now = Date.now();
		if(!this.settings.cumulativeDelay || this.timestamps.startDelay <= now){
			if(this.settings.frame){
				var progressChanges = this.settings.frame.apply(this, [this.progress]);
				Object.assign(this.progress,progressChanges);

			}
		}
	};
	Stimulation.prototype.getTween = function(from, to, ratioCompleted){
		return from + (ratioCompleted * (to - from));
	};
	Stimulation.prototype.assignProgress = function(ratioCompleted,settings,progress){
		var durationAchieved = false;
		progress.ratioCompleted = ratioCompleted;
		if(progress.ratioCompleted < 1 || this.settings.endless){
			progress.easedRatioCompleted = settings.easing(progress.ratioCompleted);
			progress.tweened = this.getTween(settings.from,settings.to,progress.ratioCompleted);
			progress.easedTweened = this.getTween(settings.from,settings.to,progress.easedRatioCompleted);
		} else {
			progress.ratioCompleted = 1;
			progress.easedRatioCompleted = 1;
			progress.tweened = settings.to;
			progress.easedTweened = settings.to;
			durationAchieved = true;
		}
		return durationAchieved;
	};
	Stimulation.prototype.recurse = function(reset){
		if(this.running){
			if(this.progress.ratioCompleted > 0 || !this.settings.skipZeroFrame){
				this.frame();
			}
			this.nextRafId = raf(() => {
				if(this.running){
					this.timestamps.recentFrame = Date.now();
					if(reset){
						this.timestamps.startDelay = this.timestamps.recentFrame + this.settings.cumulativeDelay;
					}
					var diff = this.timestamps.recentFrame - this.timestamps.startDelay;
					var ratioCompleted = diff/this.settings.duration;
					this.durationAchieved = this.assignProgress(ratioCompleted, this.settings, this.progress);
					var stillLooping = false;
					if(
						this.durationAchieved &&
						(
							this.settings.loop === true ||
							(
								this.settings.loop && 
								this.currentLoopCount < this.settings.loop
							)
						)
					){
						this.currentLoopCount++;
						this.durationAchieved = false;
						stillLooping = true;
						if(this.settings.delayLoop){
							this.settings.cumulativeDelay = this.settings.delay;
						} else {
							this.settings.cumulativeDelay = 0;
						}
					}
					

					if(!this.durationAchieved){
						this.recurse(stillLooping);
					} else {
						this.running = false;
						this.frame();
						if(this.settings.onComplete){
							this.settings.onComplete.apply(this,[this.progress]);
						}
					}
				}
			});
		}
	};
	Stimulation.prototype.resetAll = function(skipCallback){
		this.stop(true);
		this.init(true);
	}
	Stimulation.prototype.stop = function(skipCallback){
		this.running = false;
		caf(this.nextRafId);
		if(this.settings.onStop){
			if(!skipCallback){
				this.settings.onStop.apply(this,[this.progress]);
			}
		}
		this.iterateAspectNames((name) => {
			var aspect = this.aspects[name];
			if(aspect.settings.chainedStop){
				this.aspects[name].stop(skipCallback);
			}
		});
	};
	Stimulation.prototype.aspectAt = function(path){
		var pathSplit = path.split('.');
		var lastItem = pathSplit[pathSplit.length - 1];
		if(typeof this.progress[lastItem] === "undefined"){
			lastItem = "easedTweened";
			pathSplit.push(lastItem)
		}
		var place = this.aspectTree;
		if(path){
			try{
				pathSplit.forEach((name) => {
					if(name !== lastItem){
						place = place.aspects[name];
					} else {
						place = place.progress[name];
					}
				});
			} catch (e){
				throw("Error: You specified an invalid aspect path for .aspectAt().")
			}
		} else {
			place = place.progress[lastItem];
		}
		return place;
	};



	return function(options){
		return new Stimulation(options);
	};
})();
export {stimulate,raf,caf};
export default stimulate;