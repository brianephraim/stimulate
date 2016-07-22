var button = document.createElement("button");
button.textContent = "Stop";
document.body.appendChild(button);

var ticker = document.createElement("p");
document.body.appendChild(ticker);

var counter = 0;
var stimulation = stimulate({
	step: function(){
		ticker.textContent = counter++;
	}
});

button.addEventListener("click", function(){
	stimulation.stop();
});