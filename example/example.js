import stimulatex from "../src/index";
import {easings} from "../src/index";
import prefixer from "react-prefixer";

var appendElement = function(tag,text){
	var el = document.createElement(tag);
	el.textContent = text;
	document.body.appendChild(el);
	return el;
};

var button = appendElement("button","Stop");
var button2 = appendElement("button","Stop2");
var button3 = appendElement("button","reset");

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
var asdf = function(){

	setTimeout(function(){
		var stimulation = stimulatex({
			duration: 1000,
			delay:500,
			from:100,
			to:200,
			loop:2,
			delayLoop:true,
			aspects:{
				x:{
					// delay:400,
					// delayAddsParentDelay:true,
					loop:2,
					delayLoop:true,
					from:coords.start.x,
					to:coords.end.x,
					frame:function(aspectProgress){
						// console.log('b',this.progress.ratioCompleted)
						// console.log("B");
						// console.log("aspectProgress",this)
					},
					aspects:{
						deepY:{
							loop:2,
							delayLoop:true,
							from:30,
							to:250,
							frame:function(){
								// console.log('y');
								// this.progress.easedTweened = this.progress.easedTweened * 4;
								return {
									easedTweened: this.progress.easedTweened * 2
								}
								// this.stop();
							}
						}
					},
					// easing:function(ratio){return Math.sin(ratio)}
				},
				y:{
					loop:2,
					delayLoop:true,
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
				// console.log('a',this.progress.ratioCompleted)
				// console.log("A");
				// console.log(progress)
				// console.log(progress.aspects.y.tweenedEased);
				// console.log("THIS",this.aspects);
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
		button2.addEventListener("click", function(){
			// stimulation.aspects.x.aspects.deepY.stop();
			stimulation.aspects.x.stop();
		});
		button3.addEventListener("click", function(){
			// stimulation.aspects.x.aspects.deepY.stop();
			stimulation.resetAll();
		});
	},0);
};
asdf();
// console.log(asdf.toString())

// appendElement("pre",asdf.toString());


export default null;