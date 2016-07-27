import raf from "raf";
import {cancel as caf} from "raf";
const stimulate = (function(){
	var Stimulation = function(options,debug){
		this.debug = debug;
		this.running = false;
		this.aspectDefaults = {
			from: 0,
			to: 1,
			easing: function(v){return v;}
		};
		this.aspects = {};
		this.aspectDefaultKeys = Object.keys(this.aspectDefaults);
		this.settings = {
			...this.aspectDefaults,
			duration: 1000,
			endless: !options.duration || !!options.endless,
			aspects: this.aspects,
			aspectTree: this,
			skipZeroFrame: true,
			delay:0,
			frame: null,
			...options,
		};
		this.aspects = this.settings.aspects;
		this.aspectTree = this.settings.aspectTree;

		this.progress = this.getProgressDefault(this.settings);
		this.progress.aspects = {};


		// Update aspectDefaults with result of settings generation.
		// This will be applied as default for each aspect.
		// this.aspectDefaultKeys.forEach((aspectDefaultKey) => {
		// 	this.aspectDefaults[aspectDefaultKey] = this.settings[aspectDefaultKey];
		// });
		this.iterateAspectNames((name) => {
			this.aspects[name] = new Stimulation({
				...this.settings,
				aspects:{},
				frame:null,
				...this.settings.aspects[name]
			},name);
			// this.settings.aspects[name] = {
			// 	...this.aspectDefaults,
			// 	...this.settings.aspects[name]
			// };
			// this.progress.aspects[name] = this.getProgressDefault(this.settings.aspects[name]);
		});

		var a = {x:1};
		var b = {y:2,...a};

		this.durationAchieved = false;
		this.nextRafId = null;
		this.timestamps = {};

		this.timestamps.start = Date.now();
		this.timestamps.startDelay = this.timestamps.start + this.settings.delay;
		this.running = true;

		if(this.settings.skipZeroFrame) {
			this.recurse();
		} else {
			this.nextRafId = raf(() => {
				this.recurse();
			});
		}
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
		if(!this.settings.delay || this.timestamps.start + this.settings.delay <= now){
			// this.iterateAspectNames((name) => {
			// 	if(this.settings.aspects[name].frame){
			// 		this.settings.aspects[name].frame.apply(this, [this.progress.aspects[name],this.progress]);
			// 	}
			// });
			if(this.settings.frame){
				this.settings.frame.apply(this, [this.progress]);
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
	Stimulation.prototype.recurse = function(){
		if(this.running){
			if(this.progress.ratioCompleted > 0 || !this.settings.skipZeroFrame){
				this.frame();
			}
			this.nextRafId = raf(() => {
				if(this.running){
					this.timestamps.recentFrame = Date.now();
					var diff = this.timestamps.recentFrame - this.timestamps.startDelay;
					var ratioCompleted = diff/this.settings.duration;
					this.durationAchieved = this.assignProgress(ratioCompleted, this.settings, this.progress);

					// this.settings.aspectNames.forEach((name) => {
					// 	var aspectSettings = this.settings.aspects[name];
					// 	var aspectProgress = this.progress.aspects[name];
					// 	this.assignProgress(ratioCompleted, aspectSettings, aspectProgress);
					// });
					if(!this.durationAchieved){
						this.recurse();
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
	Stimulation.prototype.stop = function(){
		this.running = false;
		caf(this.nextRafId);
		if(this.settings.onStop){
			this.settings.onStop.apply(this,[this.progress]);
		}
	};



	return function(options){
		return new Stimulation(options);
	};
})();
export {stimulate,raf,caf};
export default stimulate;