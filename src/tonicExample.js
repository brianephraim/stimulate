var LIBRARYNAME = require("LIBRARYNAME").default;
var when = require("when");
var counter = 0;

var promise = when.promise(function(resolve, reject, notify) {
	var stimulation = stimulate({
		duration:200,
		frame: function(){
			counter++;
			console.log(counter);
			if(counter > 5){
				stimulation.stop();
				resolve();
			}
		}
	});
});
await promise;