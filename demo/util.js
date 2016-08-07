import { demoHeight, demoWidth, ballDiameter } from './cssJsSharedConstants.json';
import prefixer from 'react-prefixer';

export const demoDuration = 1000;
const duration = demoDuration;

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

export const buildDemo = (ball, stimulation) => {
	const coords = demoCoords;
	setupEl({
		className: 'demo',
		tag: 'div',
		appendTo: document.body,
		children: [
			{
				tag: 'div',
				className: 'stage',
				children: [
					ball,
				],
			},
			{
				tag: 'button',
				text: 'Reset',
				onClick: () => {
					stimulation.resetAll();
				},
			},
			{
				tag: 'button',
				text: 'Stop all',
				onClick: () => {
					stimulation.stop();
				},
			},
			{
				tag: 'button',
				text: 'Stop X',
				onClick: () => {
					stimulation.aspects.x.stop();
				},
			},
			{
				tag: 'label',
				text: 'Loop:',
				children: [
					{
						tag: 'input',
						onChange: (e) => {
							stimulation.updateSettings({
								loop: e.target.checked,
							});

							if (!stimulation.running && e.target.checked) {
								stimulation.resetAll();
							}
						},
						attrs: {
							type: 'checkbox',
							checked: true,
						},
					},
				],
			},
			{
				tag: 'label',
				text: 'Duration:',
				children: [
					{
						tag: 'input',
						onInput: (e) => {
							stimulation.updateSettings({
								duration: +e.target.value,
							});
						},
						attrs: {
							type: 'range',
							min: 1,
							max: 3000,
							value: duration,
						},
					},
				],
			},
			{
				tag: 'label',
				text: 'From X:',
				children: [
					{
						tag: 'input',
						onInput: (e) => {
							// stimulation.settings.duration = +e.target.value;
							stimulation.aspects.x.updateSettings({
								from: +e.target.value,
							});
						},
						attrs: {
							type: 'range',
							min: 0,
							max: demoWidth - ballDiameter,
							value: coords.start.x,
							// step: 10,
						},
					},
				],
			},
			{
				tag: 'label',
				text: 'To X:',
				children: [
					{
						tag: 'input',
						onInput: (e) => {
							// stimulation.settings.duration = +e.target.value;
							stimulation.aspects.x.updateSettings({
								to: +e.target.value,
							});
						},
						attrs: {
							type: 'range',
							min: 0,
							max: demoWidth - ballDiameter,
							value: coords.end.x,
							// step: 10,
						},
					},
				],
			},
			{
				tag: 'label',
				text: 'From Y:',
				children: [
					{
						tag: 'input',
						onInput: (e) => {
							// stimulation.settings.duration = +e.target.value;
							stimulation.aspects.y.updateSettings({
								from: +e.target.value,
							});
						},
						attrs: {
							type: 'range',
							min: 0,
							max: demoHeight - ballDiameter,
							value: coords.start.y,
							// step: 10,
						},
					},
				],
			},
			{
				tag: 'label',
				text: 'To Y:',
				children: [
					{
						tag: 'input',
						onInput: (e) => {
							stimulation.aspects.y.updateSettings({
								to: +e.target.value,
							});
						},
						attrs: {
							type: 'range',
							min: 0,
							max: demoHeight - ballDiameter,
							value: coords.end.y,
						},
					},
				],
			},
		],
	});
};
