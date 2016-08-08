import { demoHeight, demoWidth, ballDiameter } from './cssJsSharedConstants.json';
import { setupEl, demoCoords, demoDuration } from './util';
const duration = demoDuration;
export const buildDemoUI = (ball, stimulation) => {
	const coords = demoCoords;
	let reverse = false;
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
				text: 'Resume',
				onClick: () => {
					stimulation.resume();
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
				tag: 'button',
				text: 'Reverse',
				onClick: () => {
					reverse = !reverse;
					stimulation.updateSettings({
						reverse,
					});
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
						},
					},
				],
			},
			{
				tag: 'hr',
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
				text: 'Delay:',
				children: [
					{
						tag: 'input',
						onInput: (e) => {
							stimulation.updateSettings({
								delay: +e.target.value,
							});
						},
						attrs: {
							type: 'range',
							min: 0,
							max: 1000,
							value: 0,
						},
					},
				],
			},
			{
				tag: 'hr',
			},
			{
				tag: 'label',
				text: 'From X:',
				children: [
					{
						tag: 'input',
						onInput: (e) => {
							stimulation.aspects.x.updateSettings({
								from: +e.target.value,
							});
						},
						attrs: {
							type: 'range',
							min: 0,
							max: demoWidth - ballDiameter,
							value: coords.start.x,
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
							stimulation.aspects.x.updateSettings({
								to: +e.target.value,
							});
						},
						attrs: {
							type: 'range',
							min: 0,
							max: demoWidth - ballDiameter,
							value: coords.end.x,
						},
					},
				],
			},
			{
				tag: 'hr',
			},
			{
				tag: 'label',
				text: 'From Y:',
				children: [
					{
						tag: 'input',
						onInput: (e) => {
							stimulation.aspects.y.updateSettings({
								from: +e.target.value,
							});
						},
						attrs: {
							type: 'range',
							min: 0,
							max: demoHeight - ballDiameter,
							value: coords.start.y,
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

export default buildDemoUI;
