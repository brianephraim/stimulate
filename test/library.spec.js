/* eslint max-len:0 */

import chai from 'chai';
import stimulate from '../src/index';
// import { raf, caf } from '../src/stimulate';
import { it, describe, before } from 'mocha';

chai.expect();

const expect = chai.expect;


const processingTimeBenchmarkStart = Date.now();
const processesDummy = [];
let c = 0;
while (c < 100000) {
	processesDummy.push({});
	c++;
}
const processingTimeBenchmarkEnd = Date.now();
const processingTimeBenchmark = processingTimeBenchmarkEnd - processingTimeBenchmarkStart;
describe('Given an instance returned by a call to my library', () => {
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
					}, 100);
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

	describe('When I need to increment over time', () => {
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
		it('its stop method calls the settings onStop,', () => {
			expect(r.stopped).to.be.equal(1);
		});
		it('its stop method does not call the settings onComplete,', () => {
			expect(r.completed).to.be.equal(0);
		});
		it('its progress object is the same identity in various places its exposed,', () => {
			expect(r.progressIsSameObject).to.be.equal(true);
		});
		it('its progress object is the same identity in various places its exposed,', () => {
			expect(r.progressIsSameObject).to.be.equal(true);
		});
	});

	describe('When I need to increment over a specified duration', () => {
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

	describe('When I need to control the initial frame behavior', () => {
		let s1;
		let s2;
		let valWhenTrue = null;
		let valWhenFalse = null;
		before((done) => {
			s1 = stimulate({
				skipZeroFrame: true,
				frame() {
					valWhenTrue = s1.progress.ratioCompleted;
					this.stop();
				},
			});
			s2 = stimulate({
				skipZeroFrame: false,
				duration: 1234,
				frame() {
					valWhenFalse = s2.progress.ratioCompleted;
					this.stop();
					setTimeout(() => {
						done();
					}, 100);
				},
			});
		});
		it('the first frame progress.ratioCompleted of a stimulation with a settings of skipZeroFrame:true is greater than 0 ', () => {
			expect(s1.progress.ratioCompleted).to.be.greaterThan(0);
			expect(valWhenTrue).to.be.greaterThan(0);
		});
		it('the first frame progress.ratioCompleted of a stimulation with a settings of skipZeroFrame:false is 0 ', () => {
			expect(s2.progress.ratioCompleted).to.be.equal(0);
			expect(valWhenFalse).to.be.equal(0);
		});
	});

	describe('When I need to delay the first frame', () => {
		const order = [];
		const stimulationTimestamps = [];
		let timestampDif = Infinity;
		let countA = 0;
		let countB = 0;
		before((done) => {
			stimulate({
				delay: 200,
				frame() {
					stimulationTimestamps.push(Date.now());
					order.push('stimulation1');
					this.stop();
				},
				aspects: {
					a: {
						chainedStop: false,
						frame() {
							countA++;
							stimulationTimestamps.push(Date.now());
							order.push('stimulation2');
							this.stop();
						},
					},
					b: {
						delay: 100,
						frame() {
							countB++;
						},
					},
				},
			});
			setTimeout(() => {
				order.push('timeout1');
			}, 100);
			setTimeout(() => {
				order.push('timeout2');
				timestampDif = Math.abs(stimulationTimestamps[0] - stimulationTimestamps[1]);
				done();
			}, 250);
		});

		it('the delay setting property works ', () => {
			expect(order[0]).to.be.equal('timeout1');
			expect(order[1]).to.contain('stimulation');
		});
		it('aspects inherit delay', () => {
			expect(order[0]).to.be.equal('timeout1');
			expect(order[1]).to.contain('stimulation');
			expect(order[2]).to.contain('stimulation');
			expect(order[3]).to.be.equal('timeout2');
			expect(timestampDif).to.be.lessThan(10);
		});
		it('aspects can have delays shorter than parents\'', () => {
			expect(countA).to.be.lessThan(countB);
		});

		it('progressAt');
		it('aspect frame can update progress argument and affect root frame progress');
		it('aspect frame can return new progress progress object that updates its this.progress');
		it('loop');
		it('delayLoop');
		it('resetAll');
		it('reverse');
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

	describe('When I need to delay the initial incrementation', () => {
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
				done();
			}, 220);
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

	describe('ends on appropriate ratio', () => {
		let stimulation;
		let stimulationReverse;
		before((done) => {
			stimulation = stimulate({
				duration: 200,
			});
			stimulationReverse = stimulate({
				reverse: true,
				duration: 210,
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
});
