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
var coords = {
	start:{
		x:50,
		y: 50,
	},
	end:{
		x:400,
		y: 50,
	}
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
var updateBall = function(coords){
	var styles = prefixer({
		transform: translateVal(coords.x,coords.y,0)
	});
	Object.assign(ball.style,styles);
};
updateBall(coords.start);
document.body.appendChild(ball);
setTimeout(function(){
	var stimulation = stimulatex({
		duration: 2000,
		delay:500,
		from:100,
		to:200,
		aspects:{
			x:{
				from:coords.start.x,
				to:coords.end.x,
				frame:function(aspectProgress, allProgress){
					// console.log("aspectProgress",this)
				},
				aspects:{
					deepY:{
						from:30,
						to:250,
						frame:function(){
							// console.log("deep")
						}
					}
				},
				// easing:function(ratio){return Math.sin(ratio)}
			},
			y:{
				from:coords.start.y,
				to:coords.end.y,
				easing:function(ratio){
					if(ratio > .5){
						return 2;
					}
					return ratio;
				}
				// easing: easings.spring()
			}
		},
		frame: function(progress){
			// console.log(progress)
			// console.log(progress.aspects.y.tweenedEased);
			// console.log("THIS",this.aspects);
			console.log(this.aspectAt("x.deepY.ratioCompleted"))
			updateBall({
				x: this.aspectAt(""),
				y: this.aspectAt("x.deepY")
				// y: (
				// 	(Math.sin(progress.ratioCompleted*15) * 100)
				// 	+ progress.aspects.y.easedTweened
				// ),
				// y:progress.aspects.y.tweenedEased,
				// y:progress.aspects.y.easedTweened * (1 - Math.pow(progress.ratioCompleted,.4))
			});
		}
		
	});
	button.addEventListener("click", function(){
		stimulation.stop();
	});
},0)


export default null;