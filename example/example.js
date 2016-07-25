import stimulatex from "../src/index"
console.log("Hello from example.js");
var button = document.createElement("button");
button.textContent = "Stop";
document.body.appendChild(button);

var ticker = document.createElement("p");
document.body.appendChild(ticker);

var counter = 0;
var stimulation = stimulatex({
	frame: function(){
		ticker.textContent = counter++;
	}
});

button.addEventListener("click", function(){
	stimulation.stop();
});

export default null;