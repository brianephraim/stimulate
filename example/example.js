import stimulatex from "../src/index";
import {easings} from "../src/index";
import prefixer from "react-prefixer";

var button = document.createElement("button");
button.textContent = "Stop";
document.body.appendChild(button);

var ticker = document.createElement("p");
document.body.appendChild(ticker);


var translateVal = function(x=0,y=0,z=0){
	return `translate3d(${x}px,${y}px,${z}px)`;
};
var startX = 200;
var endX = 100;
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
updateBallX(startX);
document.body.appendChild(ball);
setTimeout(function(){
	var stimulation = stimulatex({
		duration: 2000,
		from: startX,
		to: endX,
		easing: easings.spring(),
		frame: function(progress){
			console.log(progress)
			var x = progress.easedTweened;
			updateBallX(x);
		},
		
	});
	button.addEventListener("click", function(){
		stimulation.stop();
	});
},200)


export default null;