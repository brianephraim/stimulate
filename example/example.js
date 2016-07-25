import stimulatex from "../src/index"
import prefixer from "react-prefixer"

console.log(prefixer);

var button = document.createElement("button");
button.textContent = "Stop";
document.body.appendChild(button);

var ticker = document.createElement("p");
document.body.appendChild(ticker);


var translateVal = function(x=0,y=0,z=0){
	return `translate3d(${x}px,${y}px,${z}px)`;
};
var ball = document.createElement("div");
var styles = prefixer({
	background: "red",
	width: "20px",
	height: "20px",
	borderRadius:"10px"
});
Object.assign(ball.style,styles);
var updateBallX = function(x){
	var styles = prefixer({
		transform: translateVal(x,0,0)
	});
	Object.assign(ball.style,styles);
};
updateBallX(0);
document.body.appendChild(ball);

var counter = 0;
var stimulation = stimulatex({
	duration: 2000,
	frame: function(progress){
		ticker.textContent = progress.ratioCompleted;
		updateBallX(progress.ratioCompleted * 100)
	}
});

button.addEventListener("click", function(){
	stimulation.stop();
});

export default null;