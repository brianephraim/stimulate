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
var startY = 100;
var endX = 500;
var endY = 0;
var ball = document.createElement("div");
var styles = prefixer({
	background: "red",
	width: "20px",
	height: "20px",
	borderRadius:"10px"
});
Object.assign(ball.style,styles);
var updateBall = function(x,y){
	var styles = prefixer({
		transform: translateVal(x,y,0)
	});
	Object.assign(ball.style,styles);
};
updateBall(startX,startY);
document.body.appendChild(ball);
setTimeout(function(){
	var stimulation = stimulatex({
		duration: 2000,
		from: startX,
		to: endX,
		easing: easings.spring(),
		aspects:{
			y:{
				from:startY,
				to:endY,
				easing:function(v){return v}
			},
			x:{}
		},
		frame: function(progress){
			// var x = progress.easedTweened;
			var x = progress.aspects.x.easedTweened;
			var y = progress.aspects.y.easedTweened;
			
			updateBall(x,y);
		}
		
	});
	button.addEventListener("click", function(){
		stimulation.stop();
	});
},500)


export default null;