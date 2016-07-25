var stimulate = require("stimulate").default;
var counter = 0;
var stimulation = stimulate({
	frame: function(){
        counter++;
		console.log(counter);
		if(counter > 2){
			stimulation.stop();
		}
	}
});