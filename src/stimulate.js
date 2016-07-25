import raf from "raf";
import {cancel as caf} from "raf";
const stimulate = (function(){

	var Stimulation = function(options){
		this.running = false;
		this.settings = {
			duration: 1000,
			endless: !options.duration || !!options.endless,
			frame: this.noop,
			from: 0,
			to: 1,
			easing: function(v){return v;},
			...options
		};
		this.settings.range = this.settings.to - this.settings.from;
		this.noop = function(){};
		var a = {x:1};
		var b = {y:2,...a};

		this.durationAchieved = false;
		this.nextRafId = null;
		this.timestamps = {};

		this.progress = {
			ratioCompleted: 0,
			easedRatioCompleted: 0,
			tweened: this.settings.from,
			easedTweened:this.settings.from

		};
		this.timestamps.start = Date.now();
		this.running = true;
		raf(() => {
			this.recurse();
		});
	};
	Stimulation.prototype.frame = function(){
		return this.settings.frame.apply(this, [this.progress]);
	};
	Stimulation.prototype.getTween = function(from, to, ratioCompleted){
		return from + (ratioCompleted * (to - from));
	};
	Stimulation.prototype.recurse = function(){
		if(this.running){
			this.frame();
			this.nextRafId = raf(() => {
				this.timestamps.recentFrame = Date.now();
				var diff = this.timestamps.recentFrame - this.timestamps.start;

				if(this.progress.ratioCompleted < 1 || this.settings.endless){
					this.progress.ratioCompleted = diff/this.settings.duration;
					this.progress.easedRatioCompleted = this.settings.easing(this.progress.ratioCompleted);
					var range = this.settings.to - this.settings.from;
					this.progress.tweened = this.getTween(this.settings.from,this.settings.to,this.progress.ratioCompleted);
					this.progress.easedTweened = this.getTween(this.settings.from,this.settings.to,this.progress.easedRatioCompleted);
					this.recurse();
				} else {
					this.progress.ratioCompleted = 1;
					this.progress.easedRatioCompleted = 1;
					this.progress.tweened = this.settings.to;
					this.durationAchieved = true;
					this.frame();
				}
				
			});
		}
	};
	Stimulation.prototype.stop = function(){
		this.running = false;
		caf(this.nextRafId)
	};



	return function(options){
		return new Stimulation(options);
	};
})();
export {stimulate};
export default stimulate;