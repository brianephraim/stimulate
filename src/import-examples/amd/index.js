requirejs.config({
    paths: {
        "LIBRARYNAME": "../../dist/LIBRARYNAME.min"
    }
});

require(['LIBRARYNAME'], function(LIBRARYNAMELib) {
	var LIBRARYNAME = LIBRARYNAMELib.LIBRARYNAME;
	LIBRARYNAME({
		duration: 1000,
		frame: function(){
			console.log(this.progress.ratioCompleted)
		}
	});
});
