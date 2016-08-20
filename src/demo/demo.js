import './stylesheet.css';
import './file.scss';
import LIBRARYNAME from '../library/index';
import buildDemoUI from './buildDemoUI';
import { setupEl, demoCoords, ready } from './util';
import easings from './easings';
import eases from 'eases';

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
	let last = null;
	let crossedZeroToOneCount = 0;
	const stimulation = LIBRARYNAME({
		reverse: true,
		duration: 1000,
		// delay: 1000,
		loop: 3,
		// delayEveryLoop: true,
		// skipZeroFrame: false,
		usePersistedSettings: true,
		from: 5,
		to: 95,
		easing: eases.sineOut,
		aspects: {
			x: {
				easing: eases.sineOut,
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
						// delayAddsParentDelay: true,
						// delay: 10,
						frame() {
							// console.log(this.getCumulativeDelay());
						},
					},
				},
			},
		},
		frame() {
			if (last !== null && this.settings.reverse && last < this.progress.ratioCompleted) {
				crossedZeroToOneCount++;
				console.log('d');
			}
			if (this.currentLoopCount === 3 && this.progress.ratioCompleted > 0.5 && !once) {
				this.updateSettings({
					reverse: true,
				});
				once = true;
			}
			last = this.progress.ratioCompleted;


			console.log(this.currentLoopCount);
			const freshCoords = {
				x: this.progressAt('x').easedTweened,
				y: this.progressAt('y').easedTweened,
			};
			ball.update({
				xy: freshCoords,
			});

			console.log(JSON.stringify(this.progress));

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
