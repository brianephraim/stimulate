
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
			console.log(stimulation)
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
						from: coords.start.x,
						to: coords.end.x,
					},
					y: {
						easing: spring,
						from: coords.start.y,
						to: coords.end.y,
						// delayAddsParentDelay: true,
						// delay: 10,
						aspects: {
							asdf: {
								delayAddsParentDelay: true,
								delay: 10,
								frame() {
									console.log(this.getCumulativeDelay());
								},
							},
						}
					},
				},
				frame() {
					const freshCoords = {
						x: this.aspectAt('x'),
						y: this.aspectAt('y'),
					};
					setupEl({
						el: ball,
						xy: freshCoords,
					});

					setupEl({
						className: 'ball ball--ghost',
						tag: 'div',
						xy: freshCoords,
						appendTo: container,
					});
				},
			};
		},
	});
});

export default null;
