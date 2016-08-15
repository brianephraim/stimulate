var stimulate = require('../../dist/stimulate.min').stimulate;
stimulate({
	duration: 1000,
	frame: function(){
		console.log(this.progress.ratioCompleted)
	}
});