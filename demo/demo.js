import './stylesheet.css';
import './file.scss';
import stimulate, { easings } from '../src/index';
import { setupEl, demoCoords, ready, buildDemo, demoDuration } from './util';

const spring = easings.spring();

ready(() => {
	const ball = setupEl(
		{
			tag: 'div',
			className: 'ball',
			xy: demoCoords.start,
		}
	);

	const stimulation = stimulate({
		duration: demoDuration,
		// delay: 500,
		// loop: true,
		delayLoop: true,
		skipZeroFrame: false,
		usePersistedSettings: true,
		aspects: {
			x: {
				from: demoCoords.start.x,
				to: demoCoords.end.x,
			},
			y: {
				// easing: spring,
				from: demoCoords.start.y,
				to: demoCoords.end.y,
				// delayAddsParentDelay: true,
				// delay: 10,
				aspects: {
					asdf: {
						delayAddsParentDelay: true,
						delay: 10,
						frame() {
							// console.log(this.getCumulativeDelay());
						},
					},
				},
			},
		},
		frame() {
			console.log(this.progress.ratioCompleted);
			const freshCoords = {
				x: this.aspectAt('x'),
				y: this.aspectAt('y'),
			};
			ball.update({
				xy: freshCoords,
			});
			// setupEl({
			// 	el: ball.el,
			// 	xy: freshCoords,
			// });

			// setupEl({
			// 	className: 'ball ball--ghost',
			// 	tag: 'div',
			// 	xy: freshCoords,
			// 	appendTo: container,
			// });
		},
	});

	buildDemo(ball, stimulation);
});

export default null;
