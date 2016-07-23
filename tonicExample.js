var stimulate = require("stimulate");
var counter = 0;
var stimulation = stimulate({
	step: function(){
		ticker.textContent = counter++;
		console.log(counter);
		if(counter > 10){
			stimulation.stop();
		}
	}
});
