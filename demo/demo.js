
import "./stylesheet.css";
import "./file.scss";



import {raf} from "../src/index";
import {easings} from "../src/index";

import {setupEl, setupDemo, demoCoords} from './util'

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}


var coords = demoCoords;
var spring = easings.spring();


ready(() => {
	setupDemo({
		appendTo: document.body,
		onStart: (frame, ball, stimulation) => {
			setupEl({
				el:ball,
				xy: coords.start
			});

			var stopButton = setupEl({
				tag: 'button',
				text: 'Stop',
				appendTo: frame,
				onClick: () => {
					stimulation.stop();
				},
			});

			var stopButton2 = setupEl({
				tag: 'button',
				text: 'Stop21',
				appendTo: frame,
				onClick: () => {
					stimulation.aspects.x.stop();
				},
			});
		},
		prepareStimulationSettings: (frame, ball) => {
			return {
				duration: 1000,
				delay:500,
				loop:2,
				delayLoop:true,
				aspects:{
					x:{
						delayLoop:true,
						from:coords.start.x,
						to:coords.end.x,
						loop:2,
						frame:function(aspectProgress){

							if(this.progress.ratioCompleted > .5 && !this.aspects.crixus){
								this.birthAspect('crixus',{
									frame:function(){
										// console.log('HERE I AMx');
									}
								});
							}
						},
						aspects:{
							deepY:{
								loop:2,
								easing:spring,
								delayLoop:true,
								from:coords.start.y,
								to:coords.end.y,
							}
						},
					},
					y:{
						delayLoop:true,
						from:coords.start.y,
						to:coords.end.y,
					}
				},
				frame: function(progress){

					setupEl({
						el: ball,
						xy: {
							x: this.aspectAt("x"),
							y: this.aspectAt("x.deepY")
						}
					});

					setupEl({
						className: 'ball ball--ghost',
						tag: 'div',
						xy: {
							x: this.aspectAt("x"),
							y: this.aspectAt("x.deepY")
						},
						appendTo: frame
					});
				}
			}
		}
	});
})




export default null;