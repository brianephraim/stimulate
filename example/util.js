import { demoHeight, demoWidth, ballDiameter } from "./cssJsSharedConstants.json";
import prefixer from "react-prefixer";
import stimulate from "../src/index";

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
var translateVal = function(x=0,y=0,z=0){
	return `translate3d(${x}px,${y}px,${z}px)`;
};
var xy = function(el,coords){
	var styles = prefixer({
		transform: translateVal(coords.x,coords.y,0)
	});
	Object.assign(el.style,styles);
};
export const setupEl = function(o){
	var el = o.el;
	if(o.tag){
		el = document.createElement(o.tag);
	}
	if(!el){
		el = document.createElement('div');
	}

	if(typeof o.text !== 'undefined'){
		console.log('SDF',o.text)
		el.textContent = o.text;
	}

	if(o.className){
		el.className = o.className;
	}

	if(o.xy){
		xy(el,o.xy);
	}

	if(o.onClick){
		el.addEventListener("click", o.onClick);
	}
	
	if(o.appendTo){
		o.appendTo.appendChild(el);
	}
	return el;
};

export const setupDemo = function(options){
	var frame = setupEl({
		className: 'demo',
		tag: 'div'
	});
	if(options.appendTo){
		setupEl({
			el:frame,
			appendTo: options.appendTo
		});
	}
	
	var resetButton = setupEl({
		tag: 'button',
		text: 'Reset',
		appendTo: frame,
		onClick: () => {
			stimulation.resetAll();
		},
	});

	var ball = setupEl({
		className: 'ball',
		tag: 'div',
		appendTo: frame
	});

	var stimulation = stimulate(options.prepareStimulationSettings(frame, ball));

	if(options.onStart){
		options.onStart(frame, ball, stimulation);
	}

	return frame;
};

export const demoCoords = {
	start:{
		x:0,
		y: 0,
	},
	end:{
		x: demoWidth - ballDiameter,
		y: demoHeight - ballDiameter,
	}
};