window.stimulate = (function(){
	function recurse() {
		// Do whatever
		requestAnimationFrame(recurse);
	}

	requestAnimationFrame(recurse);

	var Stimulation = function(options){
		this.running = false;
		this.options = options;
		this.settings = !!this.options ? this.options : {};
		this.noop = function(){};
		this.settings.step = !!this.settings.step ? this.settings.step : this.noop;
		this.step = this.settings.step;
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
			this.step();
			this.nextRafId = requestAnimationFrame(function(){
				self.recurse();
			});
		}
	};
	Stimulation.prototype.stop = function(){
		this.running = false;
		cancelAnimationFrame(this.nextRafId)
	};



	return function(options){
		return new Stimulation(options);
	};
})();