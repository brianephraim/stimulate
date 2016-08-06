import { demoHeight, demoWidth, ballDiameter } from './cssJsSharedConstants.json';
import prefixer from 'react-prefixer';
import stimulate from '../src/index';

export const ready = (fn) => {
	if (document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
};
const translateVal = (x = 0, y = 0, z = 0) => {
	return `translate3d(${x}px,${y}px,${z}px)`;
};
const xy = (el, coords) => {
	const styles = prefixer({
		transform: translateVal(coords.x, coords.y, 0),
	});
	Object.assign(el.style, styles);
};
export const setupEl = (o) => {
	let el = o.el;
	if (o.tag) {
		el = document.createElement(o.tag);
	}
	if (!el) {
		el = document.createElement('div');
	}

	if (typeof o.text !== 'undefined') {
		el.textContent = o.text;
	}

	if (o.className) {
		el.className = o.className;
	}

	if (o.xy) {
		xy(el, o.xy);
	}

	if (o.onClick) {
		el.addEventListener('click', o.onClick);
	}

	if (o.appendTo) {
		o.appendTo.appendChild(el);
	}
	return el;
};

export const setupDemo = (options) => {
	const container = setupEl({
		className: 'demo',
		tag: 'div',
	});
	if (options.appendTo) {
		setupEl({
			el: container,
			appendTo: options.appendTo,
		});
	}

	const ball = setupEl({
		className: 'ball',
		tag: 'div',
		appendTo: container,
	});

	const stimulation = stimulate(options.prepareStimulationSettings(container, ball));

	setupEl({
		tag: 'button',
		text: 'Reset',
		appendTo: container,
		onClick: () => {
			stimulation.resetAll();
		},
	});

	if (options.onStart) {
		options.onStart(container, ball, stimulation);
	}

	return container;
};

export const demoCoords = {
	start: {
		x: 0,
		y: 0,
	},
	end: {
		x: demoWidth - ballDiameter,
		y: demoHeight - ballDiameter,
	},
};
