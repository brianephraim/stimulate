import raf from "raf";
import {cancel as caf} from "raf";
const stimulate = (function(){
	function recurse() {
		// Do whatever
		raf(recurse);
	}

	raf(recurse);

	var Stimulation = function(options){
		this.running = false;
		this.options = options;
		this.settings = !!this.options ? this.options : {};
		this.noop = function(){};
		this.settings.frame = !!this.settings.frame ? this.settings.frame : this.noop;
		this.frame = this.settings.frame;
		this.nextRafId = null;
		this.start();
	};
	Stimulation.prototype.start = function(){
		this.running = true;
		this.recurse();
	};
	Stimulation.prototype.recurse = function(){
		var self = this;
		if(this.running){
			this.frame();
			this.nextRafId = raf(function(){
				self.recurse();
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