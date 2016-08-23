/* eslint max-len:0 */
/* eslint camelcase:0 */

import chai from 'chai';
import stimulate from '../src/library/index';
// import { polyfill } from '../src/library/raf';
// import { raf, caf } from '../src/library/stimulate';
import { it, describe, before, beforeEach, afterEach } from 'mocha';
require('chromedriver');
import webdriver from 'selenium-webdriver';
import { argv } from 'yargs';

const withBrowser = argv.withBrowser;
const localToSauce = argv.localToSauce;


chai.expect();

const expect = chai.expect;


const processingTimeBenchmarkStart = Date.now();
const processesDummy = [];
let c = 0;
while (c < 1000) {
	processesDummy.push({});
	c++;
}
const processingTimeBenchmarkEnd = Date.now();
const processingTimeBenchmark = processingTimeBenchmarkEnd - processingTimeBenchmarkStart;
describe('Using this library... ', () => {
	beforeEach(function sauceOrNotSetup() {
		if (typeof process.env.SAUCE_USERNAME !== 'undefined') {
			this.timeout(10000);
			let settings;
			if (localToSauce) {
				settings = {
					name: 'localToSauce_stimulate',
					username: process.env.SAUCE_USERNAME,
					accessKey: process.env.SAUCE_ACCESS_KEY,
					browserName: 'chrome',
				};
			} else {
				settings = {
					'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
					build: process.env.TRAVIS_BUILD_NUMBER,
					username: process.env.SAUCE_USERNAME,
					accessKey: process.env.SAUCE_ACCESS_KEY,
					browserName: 'chrome',
				};
			}
			this.browser = new webdriver.Builder()
				.usingServer(`http://${process.env.SAUCE_USERNAME}:${process.env.SAUCE_ACCESS_KEY}@ondemand.saucelabs.com:80/wd/hub`)
				.withCapabilities(settings)
				.build();
			return this.browser.get('http://localhost:8000/page/index.html');
		} else if (withBrowser) {
			this.browser = new webdriver.Builder()
				.withCapabilities({
					browserName: 'chrome',
				}).build();
		}
		return true;
	});
	afterEach(function sauceOrNotBreakdown() {
		if (typeof process.env.SAUCE_USERNAME !== 'undefined' || withBrowser) {
			return this.browser.quit();
		}
		return true;
	});


	const runScenario = (done, extraSettings = {}) => {
		const output = {
			counter: 0,
			stimulation: null,
			counterAtTimeOfStop: null,
			stopped: 0,
			completed: 0,
			stimulationTestedDuration: null,
			progressIsSameObject: true,
			midProgressSnapshot: null,
			counterAtComplete: null,
		};
		const o = output;
		const stimulationTestedStart = Date.now();
		let firstProgress = null;
		const settings = {
			frame(progress) {
				o.counter++;
				if (o.counter === 3) {
					o.midProgressSnapshot = JSON.parse(JSON.stringify(this.progress));
				}
				if (o.counter >= 10) {
					o.counterAtTimeOfStop = o.counter;
					o.stimulation.stop();
					const stimulationTestedEnd = Date.now();
					o.stimulationTestedDuration = stimulationTestedEnd - stimulationTestedStart;
				}
				firstProgress = !!firstProgress ? firstProgress : progress;
				o.progressIsSameObject = o.progressIsSameObject && this.progress === progress;
				o.progressIsSameObject = o.progressIsSameObject && firstProgress === progress;
			},
			onStop(progress) {
				o.stopped++;
				o.progressIsSameObject = o.progressIsSameObject && this.progress === progress;
				o.progressIsSameObject = o.progressIsSameObject && firstProgress === progress;
			},
			onComplete(progress) {
				o.completed++;
				o.progressIsSameObject = o.progressIsSameObject && this.progress === progress;
				o.progressIsSameObject = o.progressIsSameObject && firstProgress === progress;
				o.counterAtComplete = o.counter;
				if (extraSettings.duration) {
					setTimeout(() => {
						done();
					}, 500);
				}
			},
			...extraSettings,
		};


		o.stimulation = stimulate(settings);
		if (!extraSettings.duration) {
			stimulate({
				frame() {
					if (o.counter >= 10) {
						this.stop();
						setTimeout(() => {
							done();
						}, 100);
					}
				},
			});
		}

		return output;
	};

	describe('Increment over time, so ', () => {
		let r;
		before((done) => {
			r = runScenario(done);
		});

		it('it has a method for specifying frame behavior,', () => {
			expect(r.counter).to.be.greaterThan(0);
		});

		it('its frame method takes time (significantly exceeds processing speed benchmarks)', () => {
			expect(r.stimulationTestedDuration).to.be.greaterThan(processingTimeBenchmark * 1.5);
		});
		it('its frame method calls repeatedly,', () => {
			expect(r.counter).to.be.greaterThan(2);
		});
		it('it has a stop method,', () => {
			expect(typeof r.stimulation.stop).to.be.equal('function');
		});
		it('its stop method ends incrementation,', () => {
			expect(r.counterAtTimeOfStop).to.be.equal(r.counter);
		});
		it('its stop method calls the settings onStop callback,', () => {
			expect(r.stopped).to.be.equal(1);
		});
		it('its stop method does not call the settings onComplete callback,', () => {
			expect(r.completed).to.be.equal(0);
		});
		it('its progress object is the same identity in various places its exposed,', () => {
			expect(r.progressIsSameObject).to.be.equal(true);
		});
		it('its progress object is the same identity in various places its exposed,', () => {
			expect(r.progressIsSameObject).to.be.equal(true);
		});
	});

	describe('Increment over a duration, so ', () => {
		let r;
		let aspectFrameCalled = false;
		const settings = {
			duration: 100,
			from: 100,
			to: 200,
			easing(ratioCompleted) { return Math.pow(ratioCompleted, 3); },
			aspects: {
				x: {},
				y: {
					easing(ratioCompleted) { return Math.pow(ratioCompleted, 40); },
					frame() {
						aspectFrameCalled = true;
					},
				},
				z: {
					from: 25,
					to: 35,
				},
			},
		};
		before((done) => {
			r = runScenario(done, settings);
		});
		it('achieving that duration prevents future frame calls,', () => {
			expect(r.counterAtComplete).to.be.equal(r.counter);
		});
		it('achieving that duration calls the settings onComplete,', () => {
			expect(r.completed).to.be.equal(1);
		});
		it('achieving that duration does not call the settings onStop,', () => {
			expect(r.stopped).to.be.equal(0);
		});
		it('progress.ratioCompleted is between 0 and 1 midway through the duration ,', () => {
			expect(r.midProgressSnapshot.ratioCompleted).to.be.greaterThan(0);
			expect(r.midProgressSnapshot.ratioCompleted).to.be.lessThan(1);
		});
		it('progress.tweened is between settings.from and settings.to midway through the duration ,', () => {
			expect(r.midProgressSnapshot.tweened).to.be.greaterThan(settings.from);
			expect(r.midProgressSnapshot.tweened).to.be.lessThan(settings.to);
		});
		it('easing eases', () => {
			expect(r.midProgressSnapshot.ratioCompleted).to.not.equal(r.midProgressSnapshot.easedRatioCompleted);
		});
		it('aspect frame callbacks work', () => {
			expect(aspectFrameCalled).to.be.equal(true);
		});
	});

	describe('Control the initial frame behavior, so ', () => {
		let skipsTrue;
		let skipsDefault;
		let skipsFalse;
		let skipsTrueReverse;
		let skipsFalseReverse;
		let valWhenDefault = null;
		let valWhenTrue = null;
		let valWhenTrueReverse = null;
		let valWhenFalseReverse = null;
		let valWhenFalse = null;
		before((done) => {
			skipsDefault = stimulate({
				duration: 500,
				frame() {
					valWhenDefault = skipsDefault.progress.ratioCompleted;
					this.stop();
				},
			});
			skipsTrue = stimulate({
				duration: 500,
				boomer:true,
				skipZeroFrame: true,
				frame() {
					valWhenTrue = skipsTrue.progress.ratioCompleted;
					this.stop();
				},
			});
			skipsTrueReverse = stimulate({
				skipZeroFrame: true,
				reverse: true,
				frame() {
					valWhenTrueReverse = skipsTrueReverse.progress.ratioCompleted;
					this.stop();
				},
			});

			skipsFalseReverse = stimulate({
				skipZeroFrame: false,
				reverse: true,
				frame() {
					valWhenFalseReverse = skipsFalseReverse.progress.ratioCompleted;
					this.stop();
				},
			});
			skipsFalse = stimulate({
				skipZeroFrame: false,
				aspects: {
					nested: {},
				},
				frame() {
					valWhenFalse = skipsFalse.progress.ratioCompleted;
					this.stop();
				},
			});
			setTimeout(() => {
				done();
			}, 600);
		});
		it('value cached in frame just before stop to match instance.progress value', () => {
			expect(skipsDefault.progress.ratioCompleted).to.be.equal(valWhenDefault);
			expect(skipsTrue.progress.ratioCompleted).to.be.equal(valWhenTrue);
			expect(skipsTrueReverse.progress.ratioCompleted).to.be.equal(valWhenTrueReverse);
			expect(skipsFalse.progress.ratioCompleted).to.be.equal(valWhenFalse);
			expect(skipsFalseReverse.progress.ratioCompleted).to.be.equal(valWhenFalseReverse);
		});
		it('the first frame progress.ratioCompleted of a stimulation with a settings of skipZeroFrame:true is greater than 0 and less than 1 and less than .5', () => {
			expect(skipsTrue.progress.ratioCompleted).to.be.greaterThan(0);
			expect(skipsTrue.progress.ratioCompleted).to.be.lessThan(1);
			// expect(skipsTrue.progress.ratioCompleted).to.be.lessThan(0.5);
		});
		it('the first frame progress.ratioCompleted of a stimulation with a settings of skipZeroFrame:false is 0 ', () => {
			expect(skipsFalse.progress.ratioCompleted).to.be.equal(0);
		});
		it('the first frame progress.ratioCompleted of a stimulation with a settings of skipZeroFrame:true and reverse:true is less than 1 and greater than 0 and greater than .5 ', () => {
			expect(skipsTrueReverse.progress.ratioCompleted).to.be.greaterThan(0);
			// expect(skipsTrueReverse.progress.ratioCompleted).to.be.greaterThan(0.5);
			expect(skipsTrueReverse.progress.ratioCompleted).to.be.lessThan(1);
		});
		it('the first frame progress.ratioCompleted of a stimulation with a settings of skipZeroFrame:false and reverse:true is 1', () => {
			expect(skipsFalseReverse.progress.ratioCompleted).to.be.equal(1);
		});
		it('skipZeroFrame: true is the default', () => {
			expect(valWhenDefault).to.be.equal(valWhenTrue);
		});
		it('aspects inherit skipZeroFrame setting from parent', () => {
			expect(skipsFalse.progress.ratioCompleted).to.be.equal(skipsFalse.aspects.nested.progress.ratioCompleted);
		});
	});

	describe('Adjacent and nested stimulate calls are in sync, so ', () => {
		let skips1;
		let skips2;
		let noSkips1;
		let noSkips2;
		let skipsInitialSynced = null;
		let skipsLaterSynced = null;
		let noSkipsInitialSynced = null;
		let noSkipsLaterSynced = null;
		before((done) => {
			skips1 = stimulate({
				skipZeroFrame: true,
				duration: 200,
				frame() {
				},
				aspects: {
					nested: {
						skipZeroFrame: true,
					},
				},
			});
			skips2 = stimulate({
				skipZeroFrame: true,
				duration: 200,
				frame() {
					if (skipsInitialSynced === null) {
						skipsInitialSynced = skips1.progress.ratioCompleted === skips2.progress.ratioCompleted;
						skipsInitialSynced = skipsInitialSynced && (skips2.progress.ratioCompleted === skips1.aspects.nested.progress.ratioCompleted);
					}
					if (skips2.progress.ratioCompleted > 0.5 && skipsLaterSynced === null) {
						skipsLaterSynced = skips1.progress.ratioCompleted === skips2.progress.ratioCompleted;
						skipsLaterSynced = skipsLaterSynced && (skips2.progress.ratioCompleted === skips1.aspects.nested.progress.ratioCompleted);
					}
				},
			});
			noSkips1 = stimulate({
				skipZeroFrame: false,
				duration: 200,
				frame() {
					// console.log('f');
				},
				aspects: {
					nested: {
						skipZeroFrame: false,
					},
				},
			});
			noSkips2 = stimulate({
				skipZeroFrame: false,
				duration: 200,
				frame() {
					// console.log('f');
					if (noSkipsInitialSynced === null) {
						noSkipsInitialSynced = noSkips1.progress.ratioCompleted === noSkips2.progress.ratioCompleted;
						noSkipsInitialSynced = noSkipsInitialSynced && (noSkips2.progress.ratioCompleted === noSkips1.aspects.nested.progress.ratioCompleted);
					}
					if (noSkips2.progress.ratioCompleted > 0.5 && noSkipsLaterSynced === null) {
						noSkipsLaterSynced = noSkips1.progress.ratioCompleted === noSkips2.progress.ratioCompleted;
						noSkipsLaterSynced = noSkipsLaterSynced && (noSkips2.progress.ratioCompleted === noSkips1.aspects.nested.progress.ratioCompleted);
					}
				},
				// onComplete() {
				// 	done();
				// },
			});
			setTimeout(() => {
			// 	console.log("noSkips2",noSkips2);
				done();
			}, 250);
		});
		it('when skipping zero frame, initial frames are in sync ', () => {
			expect(skipsInitialSynced).to.be.equal(true);
		});
		it('when skipping zero frame, later frames are in sync ', () => {
			expect(skipsLaterSynced).to.be.equal(true);
		});
		it('when not skipping zero frame, initial frames are in sync ', () => {
			expect(noSkipsInitialSynced).to.be.equal(true);
		});
		it('when not skipping zero frame, later frames are in sync ', () => {
			expect(noSkipsLaterSynced).to.be.equal(true);
		});
	});

	describe('When I need to stop incrementing', () => {
		const counter = {
			progress: 0,
			atTimeOfStop: 100,
			shortlyAfterStop: 200,
		};
		const counters = {
			root: { ...counter },
			aspects: {
				default: { ...counter },
				chained: { ...counter },
				unchained: { ...counter },
			},
		};

		before((done) => {
			const stimulation = stimulate({
				aspects: {
					default: {
						frame() {
							counters.aspects.default.progress++;
						},
					},
					chained: {
						chainedStop: true,
						frame() {
							counters.aspects.chained.progress++;
						},
					},
					unchained: {
						chainedStop: false,
						frame() {
							counters.aspects.unchained.progress++;
						},
					},
				},
				frame() {
					counters.root.progress++;
				},
			});
			setTimeout(() => {
				stimulation.stop();
				counters.root.atTimeOfStop = counters.root.progress;
				counters.aspects.default.atTimeOfStop = counters.aspects.default.progress;
				counters.aspects.chained.atTimeOfStop = counters.aspects.chained.progress;
				counters.aspects.unchained.atTimeOfStop = counters.aspects.unchained.progress;
				setTimeout(() => {
					counters.root.shortlyAfterStop = counters.root.progress;
					counters.aspects.default.shortlyAfterStop = counters.aspects.default.progress;
					counters.aspects.chained.shortlyAfterStop = counters.aspects.chained.progress;
					counters.aspects.unchained.shortlyAfterStop = counters.aspects.unchained.progress;
					stimulation.aspects.unchained.stop();
					done();
				}, 50);
			}, 50);
		});
		it('calling its `stop` method stops it', () => {
			expect(counters.root.atTimeOfStop).to.be.equal(counters.root.shortlyAfterStop);
		});
		it('calling its `stop` method also stops aspects with `chainedStop:true` setting or with `chainedStop` unspecified/default', () => {
			expect(counters.root.atTimeOfStop).to.be.equal(counters.root.shortlyAfterStop);
			expect(counters.aspects.chained.atTimeOfStop).to.be.equal(counters.aspects.chained.shortlyAfterStop);
			expect(counters.aspects.default.atTimeOfStop).to.be.equal(counters.aspects.default.shortlyAfterStop);
		});
		it('calling its `stop` method doesn\'t stop aspects with `chainedStop:false` setting', () => {
			expect(counters.root.atTimeOfStop).to.be.equal(counters.root.shortlyAfterStop);
			expect(counters.aspects.unchained.atTimeOfStop).to.be.lessThan(counters.aspects.unchained.shortlyAfterStop);
		});
	});

	describe('Delay the initial incrementation, so ', () => {
		const counter = {
			progress: 0,
			betweenStartAndRootDelay: 100,
			shortlyAfterRootDelay: 9999,
		};
		const counters = {
			root: { ...counter },
			aspects: {
				inheritsDelayAndAdds: { ...counter },
				inheritsDelay: { ...counter },
				defaultAddFalse: { ...counter },
				adds: { ...counter },
				doesNotAdd: { ...counter },
				subtracts: { ...counter },
			},
		};
		before((done) => {
			stimulate({
				delay: 150,
				duration: 200,
				aspects: {
					inheritsDelay: {
						frame() {
							counters.aspects.inheritsDelay.progress++;
						},
					},
					defaultAddFalse: {
						delay: 50,
						frame() {
							counters.aspects.defaultAddFalse.progress++;
						},
					},
					adds: {
						delayAddsParentDelay: true,
						delay: 50,
						frame() {
							counters.aspects.adds.progress++;
						},

					},
					inheritsDelayAndAdds: {
						delayAddsParentDelay: true,
						frame() {
							counters.aspects.inheritsDelayAndAdds.progress++;
						},
					},

					subtracts: {
						delayAddsParentDelay: true,
						delay: -50,
						frame() {
							counters.aspects.subtracts.progress++;
						},

					},
					doesNotAdd: {
						delayAddsParentDelay: false,
						delay: 50,
						frame() {
							counters.aspects.doesNotAdd.progress++;
						},
					},
				},
				frame() {
					counters.root.progress++;
				},
			});
			setTimeout(() => {
				counters.root.betweenStartAndRootDelay = counters.root.progress;
				Object.keys(counters.aspects).forEach((aspectName) => {
					counters.aspects[aspectName].betweenStartAndRootDelay = counters.aspects[aspectName].progress;
				});
			}, 100);
			setTimeout(() => {
				counters.root.shortlyAfterRootDelay = counters.root.progress;
				Object.keys(counters.aspects).forEach((aspectName) => {
					counters.aspects[aspectName].shortlyAfterRootDelay = counters.aspects[aspectName].progress;
				});
			}, 220);
			setTimeout(() => {
				done();
			}, 600);
		});
		it('it uses a delay setting', () => {
			expect(counters.root.betweenStartAndRootDelay).to.be.equal(0);
			expect(counters.root.shortlyAfterRootDelay).to.be.greaterThan(0);
		});
		it('its aspects without `delay` settings inherits from its parent', () => {
			expect(counters.aspects.inheritsDelay.betweenStartAndRootDelay).to.be.equal(counters.root.betweenStartAndRootDelay);
			expect(counters.aspects.inheritsDelay.shortlyAfterRootDelay).to.be.equal(counters.root.shortlyAfterRootDelay);
		});
		it('its aspects with `delay` setting can start before its parent delay. Also, `delayAddsParentDelay:false` is a default setting.', () => {
			expect(counters.aspects.defaultAddFalse.betweenStartAndRootDelay).to.be.greaterThan(counters.root.betweenStartAndRootDelay);
			expect(counters.aspects.doesNotAdd.betweenStartAndRootDelay).to.be.equal(counters.aspects.defaultAddFalse.betweenStartAndRootDelay);
		});
		it('its aspects with `delay:number` and `delayAddsParentDelay:true` settings will start later than the parent', () => {
			expect(counters.root.shortlyAfterRootDelay).to.be.greaterThan(counters.aspects.adds.shortlyAfterRootDelay);
		});
		it('when an aspect inherits `delay` setting, and it has `delayAddsParentDelay:true`, it adds the inherited delay (essentially doubling it)', () => {
			expect(counters.root.shortlyAfterRootDelay).to.be.greaterThan(counters.aspects.inheritsDelayAndAdds.shortlyAfterRootDelay);
		});
		it('its aspects with `delay:negative number` and `delayAddsParentDelay:true` settings will start earlier than the parent', () => {
			expect(counters.root.shortlyAfterRootDelay).to.be.lessThan(counters.aspects.subtracts.shortlyAfterRootDelay);
		});
	});

	describe('ensure aspects progresses are in sync', () => {
		let stimulation;
		const sequence = [];
		before((done) => {
			stimulation = stimulate({
				duration: 200,
				aspects: {
					a: {
						aspects: {
							b: {
								frame() {
									sequence.push(1);
								},
							},
						},
						frame() {
							sequence.push(2);
						},
					},
				},
				frame() {
					sequence.push(3);
					if (this.progress.ratioCompleted > 0.5) {
						this.stop();
						done();
					}
				},
			});
		});
		it('root and child aspects with inherited duration settings have synced ratioCompleted', () => {
			expect(stimulation.progress.ratioCompleted).to.be.equal(stimulation.aspects.a.progress.ratioCompleted);
		});
		it('children aspect frames are called before parents', () => {
			expect(sequence[sequence.length - 1]).to.be.equal(3);
			expect(sequence[sequence.length - 2]).to.be.equal(2);
			expect(sequence[sequence.length - 3]).to.be.equal(1);
		});
	});

	describe('Ends on appropriate ratio, even when reversed, so', () => {
		let stimulation;
		let stimulationReverse;
		let firstFrame = null;
		let firstFrameReversed = null;
		let lastFrameRepeated = null;
		let lastFrameReversedRepeated = null;

		before((done) => {
			stimulation = stimulate({
				frame() {
					// if
				},
				duration: 200,
			});
			stimulationReverse = stimulate({
				reverse: true,
				duration: 210,
				// frame() {
				// },
				onComplete() {
					done();
				},
			});
		});
		it('non-reverse ends on one', () => {
			expect(stimulation.progress.ratioCompleted).to.be.equal(1);
		});
		it('reverse ends on zero', () => {
			expect(stimulationReverse.progress.ratioCompleted).to.be.equal(0);
		});
	});

	describe('progressAt is a shortcut for nested aspect progress, so ', () => {
		let stimulation;
		before((done) => {
			stimulation = stimulate({
				duration: 200,
				aspects: {
					a: {
						aspects: {
							b: {},
						},
					},
				},
				frame() {
					if (this.progress.ratioCompleted > 0.2) {
						this.stop();
						done();
					}
				},
			});
		});

		it('progressAt will return the progress object if it does not end with a property key', () => {
			expect(typeof stimulation.progressAt('a.b')).to.be.equal('object');
			expect(typeof stimulation.progressAt('a.b').easedTweened).to.be.equal('number');
		});
		it('progressAt returns the aspectTree\'s to level progress if no path is specified', () => {
			expect(stimulation.aspectTree.progress).to.be.equal(stimulation.progressAt(''));
		});
		it('progressAt throws an error if the path is not valid/available', () => {
			expect((() => {
				stimulation.progressAt('a.b.t.s.x');
			})).to.throw('Error: You specified an invalid aspect path for .progressAt().');
		});
	});

	describe('loop it, so ', () => {
		let loop2Count = 0;
		let loopHasDelayCount = 0;
		before((done) => {
			let hold = false;
			stimulate({
				skipZeroFrame: false,
				duration: 400,
				loop: 2,
				aspects: {
					a: {
						aspects: {
							b: {},
						},
					},
				},
				frame() {
					if (!hold && this.progress.ratioCompleted < .5) {
						hold = true;
						loop2Count++;
					}
					if (this.progress.ratioCompleted > .5) {
						hold = false;
					}
				},
			});

			const loopHasDelay = stimulate({
				skipZeroFrame: false,
				delayEveryLoop: true,
				delay: 10,
				duration: 300,
				loop: true,
				usePersistedSettings: true,
				aspects: {
					a: {
						aspects: {
							b: {},
						},
					},
				},
				frame() {
					// console.log('DDDD',this.progress.ratioCompleted);
					if (this.progress.ratioCompleted === 0) {
						loopHasDelayCount++;
					}
				},
			});

			setTimeout(() => {
				loopHasDelay.stop();
				done();
			}, 1000);
		});

		it('loop:2 loops twice', () => {
			expect(loop2Count).to.be.equal(2);
		});

		// it('delay affects first loop', () => {
		// 	expect(loopHasDelayCount).to.be.equal(2);
		// });

		// it('delay affects all loops with delayEveryLoop:true setting', () => {
		// 	expect(loopHasDelayCount).to.be.equal(2);
		// });
	});
	it('aspect frame can update progress argument and affect root frame progress');
	it('aspect frame can return new progress progress object that updates its this.progress');
	it('loop');
	it('delayEveryLoop');
	it('resetAll');
	it('reverse');

	describe.skip('More test for zero frame behavior with delay, reverse, loop', () => {
		let callCount = 0;
		class Test {
			constructor(settings, itDescription) {
				this.frameCount = 0;
				this.zeroCount = 0;
				this.oneCount = 0;
				this.s = {
					duration: 321,
					...settings,
				};
				this.s.itDescription = itDescription;
				this.s.frame = (progress) => {
					if (!progress.progressRecord) {
						progress.progressRecord = [];
					}
					progress.progressRecord.push(progress.ratioCompleted);
					if (this.s.frameExtra) {
						this.s.frameExtra(progress, itDescription);
					}
					this.frameCount++;
					if (progress.ratioCompleted === 0) {
						this.zeroCount++;
					}
					if (progress.ratioCompleted === 1) {
						if (itDescription === '_skipZeroFrame:true_delay:217_loop:2_delayEveryLoop:true') {
							console.log('++++++++++');
						}
						this.oneCount++;
					}
				};
				
				setTimeout(() => {
					this.stimulation = this.stimulate();
				},callCount * 15);
				callCount++;
			}
			stimulate() {
				return stimulate(this.s);
			}
		}
		let last = 0;
		let additional = 0;
		const delayAmt = 117;
		const possibilities = [
			{
				skipZeroFrame: true,
				expectZeroCount: 0,
				expectOneCount: 1,
			},
			{
				skipZeroFrame: true,
				expectZeroCount: 0,
				expectOneCount: 1,
				loop: 2,
			},
			{
				skipZeroFrame: true,
				expectZeroCount: 0,
				expectOneCount: 1,
				delay: delayAmt,
			},
			{
				skipZeroFrame: true,
				delay: delayAmt,
				loop: 2,
				expectZeroCount: 0,
				expectOneCount: 1,
			},
			{
				skipZeroFrame: true,
				delay: delayAmt,
				loop: 2,
				delayEveryLoop: true,
				expectZeroCount: 1,
				expectOneCount: 2,
				test: true,
				frameExtra(progress, itDescription) {
					if (itDescription === '_skipZeroFrame:true_delay:217_loop:2_delayEveryLoop:true') {
						if (progress.ratioCompleted < last) {
							additional = 1;
						}
						const diff = (progress.ratioCompleted + additional) - last;
						last = progress.ratioCompleted + additional;
						// console.log('++', diff, last, progress.ratioCompleted, itDescription);
						console.log(progress.ratioCompleted);
					}
				},
			},
			{
				skipZeroFrame: false,
				expectZeroCount: 1,
				expectOneCount: 1,
			},
			{
				skipZeroFrame: false,
				loop: 2,
				expectZeroCount: 1,
				expectOneCount: 1,
			},
			{
				skipZeroFrame: false,
				delay: delayAmt,
				expectZeroCount: 1,
				expectOneCount: 1,
			},
			{
				skipZeroFrame: false,
				delay: delayAmt,
				loop: 2,
				expectZeroCount: 1,
				expectOneCount: 1,
			},
			{
				skipZeroFrame: false,
				delay: delayAmt,
				loop: 2,
				delayEveryLoop: true,
				expectZeroCount: 2,
				expectOneCount: 2,
				// repeatTest: 20,
			},
		];


		/*

				frameExtra(progress, itDescription) {
					if (itDescription === '_skipZeroFrame:false_delay:117_loop:2_delayEveryLoop:true_reverse:true') {
						if (progress.ratioCompleted < last) {
							additional = 1;
						}
						const diff = (progress.ratioCompleted + additional) - last;
						last = progress.ratioCompleted + additional;
						// console.log('++', diff, last, progress.ratioCompleted, itDescription);
						// console.log(progress.ratioCompleted);
					}
				},
		*/
		const allTests = [];
		possibilities.forEach((possibility) => {
			if (possibility.repeatTest) {
				for(var i=0; i<possibility.repeatTest; i++){
					possibilities.push({
						...possibility,
						expectZeroCount: possibility.expectOneCount,
						expectOneCount: possibility.expectZeroCount,
					});
					possibilities.push({
						...possibility,
						reverse: true,
						expectZeroCount: possibility.expectOneCount,
						expectOneCount: possibility.expectZeroCount,
					});
				}
			} else {
				const x = ({
					...possibility,
					reverse: true,
					expectZeroCount: possibility.expectOneCount,
					expectOneCount: possibility.expectZeroCount,
				});
				possibilities.push(x);
			}
		});


		possibilities.forEach((possibility) => {
			let itDescription = '';
			Object.keys(possibility).forEach((key) => {
				if (key.indexOf('expect') === -1 && key !== 'frameExtra' && key !== 'test') {
					itDescription = `${itDescription}_${key}:${possibility[key]}`;
				}
			});
			allTests.push({
				itDescription,
				callTest: () => {
					return new Test(possibility, itDescription);
				},
				expectOneCount: possibility.expectOneCount,
				expectZeroCount: possibility.expectZeroCount,
			});
		});
		before((done) => {

			allTests.forEach((test) => {
				const t = test;
				// setTimeout(function(){
					t.itTest = test.callTest();
					// console.log(t.itTest)
				// },Math.floor(Math.random() * 60) + 30);
			});

			setTimeout(() => {
				console.log('DONE')
				done();
				last = 0;
				additional = 0;
			}, 1900);
		});
		allTests.forEach((test) => {
			it(test.itDescription, () => {
				// expect(test.itTest.zeroCount).to.be.equal(test.expectZeroCount);
				// console.log(test.itDescription,test.itTest.oneCount,test.expectOneCount);
				
				// console.log(test)
				// if (test.progressRecord) {
				// 	console.log(test.progressRecord);
				// }
				if (test.itTest.oneCount !== test.expectOneCount) {
				// if (test.itDescription === '_skipZeroFrame:false_delay:117_loop:2_delayEveryLoop:true_repeatTest:20_reverse:true') {
					console.log('$$$$$$$$');
					if (test.itTest.oneCount !== test.expectOneCount) {
						console.log('!!!!!!!!!');
					}
					console.log(test.itDescription);
					console.log('f',test.itTest.stimulation.progress.progressRecord);

				}
				expect(test.itTest.oneCount).to.be.equal(test.expectOneCount);
			});
		});
	});


	describe('resuming', () => {
		let stopVal = 999;
		let stopProgress = {};
		let resumeVal = -9999;
		let resumeProgress = {};
		let a;
		before((done) => {
			a = stimulate({
				duration: 200,
				onComplete() {
					done();
				},
			});

			setTimeout(() => {
				a.stop();
				stopProgress = a.progress;
				stopVal = a.progress.ratioCompleted;
				a.resume();
				resumeProgress = a.progress;
				resumeVal = a.progress.ratioCompleted;
			}, 100);
		});
		it('when resuming a stumulation, the progress object persists', () => {
			expect(stopProgress).to.be.equal(resumeProgress);
		});
		it('when resuming immedate progress values match the value when stopped', () => {
			expect(stopVal).to.be.equal(resumeVal);
		});
		it('after resuming, progress values increase', () => {
			expect(stopVal).to.be.lessThan(a.progress.ratioCompleted);
		});
	});

	describe('resetting', () => {
		let a;
		let valBeforeReset;
		let valAfterReset;
		let progressBeforeReset = {};
		let valBeforeResetAspect;
		let valAfterResetAspect;
		let progressBeforeResetAspect = {};
		before((done) => {
			a = stimulate({
				duration: 200,
				aspects: {
					b: {
						duration: 210,
					},
				},
				onComplete() {
					done();
				},
			});
			setTimeout(() => {
				progressBeforeReset = a.progress;
				valBeforeReset = a.progress.ratioCompleted;
				progressBeforeResetAspect = a.progress.aspects.b;
				valBeforeResetAspect = a.progress.aspects.b.ratioCompleted;
				a.resetAll();
				valAfterReset = a.progress.ratioCompleted;
				valAfterResetAspect = a.progress.aspects.b.ratioCompleted;
			}, 100);
		});
		it('after resetting, progress goes back to zero', () => {
			expect(valBeforeReset).to.be.greaterThan(0);
			expect(valAfterReset).to.be.equal(0);
		});

		it('after resetting, progress goes back to zero for aspects', () => {
			expect(valBeforeResetAspect).to.be.greaterThan(0);
			expect(valAfterResetAspect).to.be.equal(0);
		});

		it('after resetting, the progress object still persist', () => {
			expect(progressBeforeReset).to.be.equal(a.progress);
		});

		it('after resetting, the progress object still persist', () => {
			expect(progressBeforeResetAspect).to.be.equal(a.progress.aspects.b);
		});
	});

	describe('updating setting', () => {
		let unpersisted;
		let valBeforeUpdateUnpersisted;
		let valAfterStopUnpersisted;
		let persisted;
		const originalDuration = 200;
		before((done) => {
			unpersisted = stimulate({
				duration: originalDuration,
			});
			persisted = stimulate({
				usePersistedSettings: true,
				duration: originalDuration,
			});
			setTimeout(() => {
				valBeforeUpdateUnpersisted = unpersisted.progress.ratioCompleted;
				unpersisted.updateSettings({
					duration: 10000,
				});
				persisted.updateSettings({
					duration: 10000,
				});
				setTimeout(() => {
					unpersisted.stop();
					persisted.stop();
					valAfterStopUnpersisted = unpersisted.progress.ratioCompleted;
					unpersisted.resetAll();
					persisted.resetAll();
					unpersisted.stop();
					persisted.stop();
					done();
				}, 50);
			}, 50);
		});
		it('updateSetting affects future progress values', () => {
			expect(valBeforeUpdateUnpersisted).to.be.greaterThan(valAfterStopUnpersisted);
		});
		it('updateSetting value persists if usePersistedSettings:true after reset', () => {
			expect(unpersisted.settings.duration).to.be.equal(originalDuration);
			expect(persisted.settings.duration).to.be.not.equal(originalDuration);
		});
	});

	describe('aspectAt method', () => {
		let a;
		before((done) => {
			a = stimulate({
				duration: 100,
				aspects: {
					b: {
						from: 10,
						to: 99,
						aspects: {
							c: {
								from: 5,
								to: 54,
							},
						},
					},
				},
			});
			// console.log('sss',a.aspectAt('b.R'))
			setTimeout(() => {
				done();
			}, 200);
		});
		it('aspectAt is a shortcut to traversing the stimulation object with dot syntax', () => {
			expect(a.aspectAt('b.c')).to.be.equal(a.aspects.b.aspects.c);
		});
		it('aspectAt throws an error if the path is not valid/available', () => {
			expect((() => {
				a.aspectAt('b.R.x');
			})).to.throw('Error: You specified an invalid aspect path for .aspectAt().');
		});
	});

	describe('reversing', () => {
		let a;
		let valBeforeRev;
		let valAfterRev;
		before((done) => {
			a = stimulate({
				duration: 500,
				onComplete() {
					done();
				},
			});
			setTimeout(() => {
				valBeforeRev = a.progress.ratioCompleted;
				a.updateSettings({
					reverse: true,
				});
				setTimeout(() => {
					valAfterRev = a.progress.ratioCompleted;
				}, 100);
			}, 300);
		});
		it('value after reversing midway have decreased', () => {
			expect(valAfterRev).to.be.lessThan(valBeforeRev);
		});
		it('completed value after reversing midway is 0', () => {
			expect(a.progress.ratioCompleted).to.be.equal(0);
		});
	});

	describe('birthAspect', () => {
		let a;
		let b;
		let x;
		let xInitial;
		before((done) => {
			a = stimulate({
				aspects: {
					x: {},
				},
			});
			xInitial = a.aspects.x;
			x = a.birthAspect('x', {
				duration: 10,
			});
			b = a.birthAspect('b', {
				duration: 10,
			});
			a.stop();
			done();
		});

		it('stimulation aspects can birth other aspects, that are nested in that parent\'s `aspects` object', () => {
			expect(!!a.aspects.b).to.be.equal(true);
			expect(a.aspects.b).to.be.equal(b);
		});
		it('birthing an aspect with the same name as an existing aspect replaces', () => {
			expect(xInitial).to.be.not.equal(x);
		});
	});

	describe('easing', () => {
		let a;
		before((done) => {
			a = stimulate({
				from: 100,
				to: 200,
				loop: 2,
				easing(ratioCompleted) {
					return 1 - ratioCompleted;
				},
				duration: 100,
				frame() {
					if (this.currentLoopCount > 1 && this.progress.ratioCompleted > 0.5) {
						this.stop();
						done();
					}
				},
			});
		});
		it('easing accepts a function that affects progress.easedTweened', () => {
			expect(a.progress.tweened).to.be.not.equal(a.progress.easedTweened);
		});
		it('easing accepts a function that affects progress.easedRatioCompleted', () => {
			expect(a.progress.ratioCompleted).to.be.not.equal(a.progress.easedRatioCompleted);
		});
	});


	describe('reversing with loops', () => {
		let once = false;
		let last = null;
		let crossedZeroToOneCount = 0;
		before((done) => {
			stimulate({
				loop: 3,
				duration: 300,
				frame() {
					if (last !== null && this.settings.reverse && last < this.progress.ratioCompleted) {
						crossedZeroToOneCount++;
					}

					if (this.currentLoopCount === 3 && this.progress.ratioCompleted > 0.5 && !once) {
						this.updateSettings({
							reverse: true,
						});
						once = true;
					}

					last = this.progress.ratioCompleted;
				},
				onComplete() {
					done();
				},
			});
		});
		it('reversing mid loop traverses backwards even through all the lapsed loops', () => {
			expect(crossedZeroToOneCount).to.be.equal(2);
		});
	});
});
