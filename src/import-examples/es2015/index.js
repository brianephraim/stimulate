import LIBRARYNAME from '../../dist/LIBRARYNAME.min';
LIBRARYNAME({
	duration: 1000,
	frame: function(){
		console.log(this.progress.ratioCompleted)
	}
});