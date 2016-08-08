import './stylesheet.css';
import './file.scss';
import stimulate, { easings } from '../src/index';
import buildDemoUI from './buildDemoUI';
import { setupEl, demoCoords, ready } from './util';
import { demoDuration  } from './cssJsSharedConstants.json';

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
		delay: 1000,
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

			// if (this.progress.ratioCompleted > 0.5 && !this.settings.reverse) {
			// 	this.updateSettings({
			// 		delay: 1500,
			// 	});
			// }

			// if (this.progress.ratioCompleted > 0.6 && !this.settings.reverse) {
			// 	this.updateSettings({
			// 		reverse: true,
			// 	});
			// }

			// if (this.progress.ratioCompleted < 0.5 && this.settings.reverse) {
			// 	this.updateSettings({
			// 		delay: 1200,
			// 	});
			// }

			// if (this.progress.ratioCompleted < 0.4 && this.settings.reverse) {
			// 	this.updateSettings({
			// 		reverse: false,
			// 	});
			// }

			// if (this.progress.ratioCompleted < 0.3 && this.settings.reverse) {
			// 	this.updateSettings({
			// 		reverse: false,
			// 	});
			// }

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
			// if (!once) {
			// 	this.updateSettings({
			// 		reverse: true,
			// 	});
			// 	this.resetAll();
			// }
			// once = true;
		},
	});

	buildDemoUI(ball, stimulation);
});

export default null;
