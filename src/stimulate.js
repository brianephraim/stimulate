import raf from "raf";
import {cancel as caf} from "raf";
const stimulate = (function(){

	var Stimulation = function(options){
		this.running = false;
		this.settings = {
			duration: 1000,
			endless: !options.duration || !!options.endless,
			frame: this.noop,
			easing: function(v){return v;},
			...options
		};
		this.noop = function(){};
		var a = {x:1};
		var b = {y:2,...a};

		this.durationAchieved = false;
		this.nextRafId = null;
		this.timestamps = {};

		this.progress = {
			ratioCompleted: 0,
			easedRatioCompleted: 0
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
	Stimulation.prototype.recurse = function(){
		if(this.running){
			this.frame();
			this.nextRafId = raf(() => {
				this.timestamps.recentFrame = Date.now();
				var diff = this.timestamps.recentFrame - this.timestamps.start;

				if(this.progress.ratioCompleted < 1 || this.settings.endless){
					this.progress.ratioCompleted = diff/this.settings.duration;
					this.progress.easedRatioCompleted = this.settings.easing(this.progress.ratioCompleted);
					this.recurse();
				} else {
					this.progress.ratioCompleted = 1;
					this.progress.easedRatioCompleted = 1;
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