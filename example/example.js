import stimulatex from "../src/index"
var button = document.createElement("button");
button.textContent = "Stop";
document.body.appendChild(button);

var ticker = document.createElement("p");
document.body.appendChild(ticker);

var counter = 0;
var stimulation = stimulatex({
	duration: 2000,
	frame: function(progress){
		ticker.textContent = progress.ratioCompleted;
	}
});
console.log(stimulation)

button.addEventListener("click", function(){
	stimulation.stop();
});

export default null;