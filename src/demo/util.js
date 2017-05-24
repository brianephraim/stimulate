import { demoHeight, demoWidth, ballDiameter } from './cssJsSharedConstants.json';
import prefixer from 'react-prefixer';

console.log('asdf');
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

	if (o.onChange) {
		el.addEventListener('change', o.onChange);
	}

	if (o.onInput) {
		el.addEventListener('input', o.onInput);
	}

	if (o.attrs) {
		Object.keys(o.attrs).forEach((attrName) => {
			el.setAttribute(attrName, o.attrs[attrName]);
		});
	}

	if (o.appendTo) {
		o.appendTo.appendChild(el);
	}

	if (o.children) {
		o.children.forEach((child) => {
			if (child.el) {
				el.appendChild(child.el);
			} else {
				setupEl({
					...child,
					appendTo: el,
				});
			}
		});
	}
	return {
		el,
		update(options) {
			setupEl({
				xy: o.xy,
				...options,
				el,
			});
		},
	};
};
