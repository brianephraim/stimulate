import './stylesheet.css';
import './file.scss';
import stimulate, { easings } from '../src/index';
import buildDemoUI from './buildDemoUI';
import { setupEl, demoCoords, ready, demoDuration } from './util';

const spring = easings.spring();

ready(() => {
	const ball = setupEl(
		{
			tag: 'div',
			className: 'ball',
			xy: demoCoords.start,
		}
	);
	let once = false;
	const stimulation = stimulate({
		duration: demoDuration,
		// delay: 0,
		// loop: true,
		delayLoop: true,
		// skipZeroFrame: false,
		usePersistedSettings: true,
		aspects: {
			x: {
				from: demoCoords.start.x,
				to: demoCoords.end.x,
			},
			y: {
				easing: spring,
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
			const freshCoords = {
				x: this.progressAt('x'),
				y: this.progressAt('y'),
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
		onComplete() {
			if (!once) {
				this.updateSettings({
					reverse: true,
				});
				this.resetAll();
			}
			once = true;
		},
	});

	buildDemoUI(ball, stimulation);
});

export default null;
