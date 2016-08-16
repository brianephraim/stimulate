var LIBRARYNAME = require("LIBRARYNAME").default;
var counter = 0;
var stimulation = LIBRARYNAME({
	frame: function(){
        counter++;
		console.log(counter);
		if(counter > 2){
			stimulation.stop();
		}
	}
});