import stimulatex from "../src/index";
import {raf} from "../src/index";
import {easings} from "../src/index";
import prefixer from "react-prefixer";

console.log(raf);

var appendElement = function(tag,text,appendTo){
	appendTo = appendTo ? appendTo : document.body;
	var el = document.createElement(tag);
	el.textContent = text;
	appendTo.appendChild(el);
	return el;
};
var setupBall = function(coords){
	var frame = appendElement("div","");
	frame.style.border = "2px solid black";
	frame.style.height = "100px";
	var button = appendElement("button","Stop",frame);
	var button2 = appendElement("button","Stop2",frame);
	var button3 = appendElement("button","reset",frame);

	var translateVal = function(x=0,y=0,z=0){
		return `translate3d(${x}px,${y}px,${z}px)`;
	};
	
	var ball = appendElement("div","",frame);
	var styles = prefixer({
		background: "red",
		width: "20px",
		height: "20px",
		borderRadius:"10px"
	});
	Object.assign(ball.style,styles);
	var updateBall = function(coords,b){
		b = b ? b : ball;
		var styles = prefixer({
			transform: translateVal(coords.x,coords.y,0)
		});
		Object.assign(b.style,styles);
	};
	updateBall(coords.start);
	var spring = easings.spring();
	var asdf = function(){

		setTimeout(function(){
			var stimulation = stimulatex({
				duration: 1000,
				// delay:500,
				// loop:2,
				delayLoop:true,
				aspects:{
					x:{
						// delay:400,
						// delayAddsParentDelay:true,
						// loop:2,
						// delayLoop:true,
						from:coords.start.x,
						to:coords.end.x,
						// easing:function(r){return 1 - spring(1-r);},
						// easing: function(r){
						// 	var toReturn = ((Math.round(Math.sin(Math.PI*r)*10000)/10000) + 1)/2
						// 	// console.log(toReturn,r)
						// 	return toReturn;
						// },
						frame:function(aspectProgress){

							if(this.progress.ratioCompleted > .5 && !this.aspects.crixus){
								this.birthAspect('crixus',{
									frame:function(){
										// console.log('HERE I AMx');
									}
								});
							}
							// console.log('b',this.progress.ratioCompleted)
							// console.log("B");
							// console.log("aspectProgress",this)
						},
						aspects:{
							deepY:{
								easing:spring,
								// loop:2,
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
						// easing:spring,
						// loop:2,
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
					console.log(this.progress.ratioCompleted);

					var ballz = appendElement("div","",frame);
					var styles = prefixer({
						background: "pink",
						width: "20px",
						height: "20px",
						borderRadius:"10px",
						position:"absolute",
						// top:this.aspectAt("x")+"px",
						// left:this.aspectAt("x.deepY")+"px",
					});
					Object.assign(ballz.style,styles);
					updateBall({
						x: this.aspectAt("x"),
						y: this.aspectAt("x.deepY")
					},ballz);

					// console.log('a',this.progress.ratioCompleted)
					// console.log("A");
					// console.log(progress)
					// console.log(progress.aspects.y.tweenedEased);
					// console.log("THIS",this.aspects);
					updateBall({
						x: this.aspectAt("x"),
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
};
setupBall({
	start:{
		x:0,
		y: 0,
	},
	end:{
		x:200,
		y: 50,
	}
});
setupBall({
	start:{
		x:0,
		y: 0,
	},
	end:{
		x:200,
		y: 50,
	}
});
// console.log(asdf.toString())

// appendElement("pre",asdf.toString());


export default null;