import stimulate from '../../dist/stimulate.min';
stimulate({
	duration: 1000,
	frame: function(){
		console.log(this.progress.ratioCompleted)
	}
});