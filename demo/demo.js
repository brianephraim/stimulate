
import './stylesheet.css';
import './file.scss';
import { easings } from '../src/index';
import { setupEl, setupDemo, demoCoords, ready } from './util';

const coords = demoCoords;
const spring = easings.spring();


ready(() => {
	setupDemo({
		appendTo: document.body,
		onStart: (container, ball, stimulation) => {
			setupEl({
				el: ball,
				xy: coords.start,
			});

			setupEl({
				tag: 'button',
				text: 'Stop',
				appendTo: container,
				onClick: () => {
					stimulation.stop();
				},
			});

			setupEl({
				tag: 'button',
				text: 'Stop21',
				appendTo: container,
				onClick: () => {
					stimulation.aspects.x.stop();
				},
			});
		},
		prepareStimulationSettings: (container, ball) => {
			return {
				duration: 1000,
				delay: 500,
				loop: 2,
				delayLoop: true,
				aspects: {
					x: {
						delayLoop: true,
						from: coords.start.x,
						to: coords.end.x,
						loop: 2,
						aspects: {
							deepY: {
								loop: 2,
								easing: spring,
								delayLoop: true,
								from: coords.start.y,
								to: coords.end.y,
							},
						},
					},
					y: {
						delayLoop: true,
						from: coords.start.y,
						to: coords.end.y,
					},
				},
				frame() {
					setupEl({
						el: ball,
						xy: {
							x: this.aspectAt('x'),
							y: this.aspectAt('x.deepY'),
						},
					});

					setupEl({
						className: 'ball ball--ghost',
						tag: 'div',
						xy: {
							x: this.aspectAt('x'),
							y: this.aspectAt('x.deepY'),
						},
						appendTo: container,
					});
				},
			};
		},
	});
});

export default null;
