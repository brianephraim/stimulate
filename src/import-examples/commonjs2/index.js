var LIBRARYNAME = require('../../dist/LIBRARYNAME.min').LIBRARYNAME;
LIBRARYNAME({
	duration: 1000,
	frame: function(){
		console.log(this.progress.ratioCompleted)
	}
});