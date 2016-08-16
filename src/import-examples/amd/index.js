requirejs.config({
    paths: {
        "stimulate": "../../dist/stimulate.min"
    }
});

require(['stimulate'], function(stimulateLib) {
	var stimulate = stimulateLib.stimulate;
	stimulate({
		duration: 1000,
		frame: function(){
			console.log(this.progress.ratioCompleted)
		}
	});
});
