import chai from 'chai';
// import Library from '../dist/stimulate.min.js';
import stimulate from '../src/index';
import {raf,caf} from '../src/stimulate';;

chai.expect();

const expect = chai.expect;


var processingTimeBenchmarkStart = Date.now();
var processesDummy = [];
for (var i=0;i<100000;i++){
	processesDummy.push({});
}
var processingTimeBenchmarkEnd = Date.now();
var processingTimeBenchmark = processingTimeBenchmarkEnd - processingTimeBenchmarkStart;
describe('Given an instance returned by a call to my library', function() {



	var runScenario = function(done,extraSettings = {}){
		var output = {
	    	counter: 0,
	    	stimulation:null,
	    	counterAtTimeOfStop:null,
	    	stopped:0,
	    	completed:0,
	    	stimulationTestedDuration:null,
	    	progressIsSameObject: true,
	    	midProgressSnapshot: null,
	    	counterAtComplete:null
	    };
	    var o = output;
		var stimulationTestedStart = Date.now();
		var firstProgress = null;
		var settings = {
	        frame: function(progress) {
	            o.counter++;
	            if(o.counter === 3){
	            	o.midProgressSnapshot = JSON.parse(JSON.stringify(this.progress))
	            }
	            if (o.counter >= 10) {
	            	o.counterAtTimeOfStop = o.counter;
	                o.stimulation.stop();
	                var stimulationTestedEnd = Date.now();
	                o.stimulationTestedDuration = stimulationTestedEnd - stimulationTestedStart;
	            }
	            firstProgress = !!firstProgress ? firstProgress : progress;
	            o.progressIsSameObject = o.progressIsSameObject && this.progress === progress;
	            o.progressIsSameObject = o.progressIsSameObject && firstProgress === progress;
	        },
	        onStop: function(progress){
            	o.stopped++;
            	o.progressIsSameObject = o.progressIsSameObject && this.progress === progress;
            	o.progressIsSameObject = o.progressIsSameObject && firstProgress === progress;
            },
            onComplete: function(progress){
            	o.completed++;
            	o.progressIsSameObject = o.progressIsSameObject && this.progress === progress;
            	o.progressIsSameObject = o.progressIsSameObject && firstProgress === progress;
            	o.counterAtComplete = o.counter;
            	if(extraSettings.duration){
	            	setTimeout(function(){
	                	done();
	                },100);
	            }
            },
            ...extraSettings
	    };


        o.stimulation = stimulate(settings);
        if(!extraSettings.duration){
	        var externalStopper = stimulate({
	            frame: function() {
	                if(o.counter >= 10){
	                	this.stop();
	                	setTimeout(function(){
	                    	done();
	                    },100);
	                }
	            }
	        });
        }

        return output;
	};
		

    describe('When I need to increment over time', function() {
	    
	    var r;
	    before(function(done) {
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

    describe('When I need to increment over a specified duration', function() {
	    
	    var r;
	    var aspectFrameCalled = false;
	    var settings = {
    		duration:100,
    		from:100,
			to:200,
			easing:function(ratioCompleted){return Math.pow(ratioCompleted,3)},
			aspects:{
				x:{},
				y:{
					easing:function(ratioCompleted){return Math.pow(ratioCompleted,40)},
					frame:function(){
						aspectFrameCalled = true
					},
				},
				z:{
					from: 25,
					to: 35
				},
			},
    	};
	    before(function(done) {
	    	r = runScenario(done,settings);
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
        	var p = r.midProgressSnapshot.easedRatioCompleted;
        	expect(r.midProgressSnapshot.ratioCompleted).to.not.equal(r.midProgressSnapshot.easedRatioCompleted);
        });

        it('aspect frame callbacks work', () => {
        	expect(aspectFrameCalled).to.be.equal(true);
        });

        
    });

    describe('When I need to control the initial frame behavior', function() {
    	var s1,s2;
    	before(function(done) {
    		var initialTime = Date.now();
    		raf(function(){
    		raf(function(){
	    		s1 = stimulate({
	    			skipZeroFrame:true,
	    			frame:function(progress){
	    				this.stop();
	    			}
	    		});
	    		s2 = stimulate({
	    			skipZeroFrame:false,
	    			duration:1234,
	    			frame:function(progress){
	    				this.stop();
	    				setTimeout(function(){
		    				done();
	    				},100);
	    			}
	    		});
    		});
    		});
	    });
	    it('the first frame progress.ratioCompleted of a stimulation with a settings of skipZeroFrame:true is greater than 0 ', () => {
        	expect(s1.progress.ratioCompleted).to.be.greaterThan(0);
        });
        it('the first frame progress.ratioCompleted of a stimulation with a settings of skipZeroFrame:false is 0 ', () => {
        	expect(s2.progress.ratioCompleted).to.be.equal(0);
        });
    });

    describe('When I need to delay the first frame', function() {
    	var s1;
    	var order = [];
    	var stimulationTimestamps = [];
    	var timestampDif = Infinity;
    	var countA = 0;
    	var countB = 0;
    	before(function(done) {
    		s1 = stimulate({
    			delay:200,
    			frame:function(){
    				stimulationTimestamps.push(Date.now());
    				order.push('stimulation1');
    				this.stop();
    				
    			},
    			aspects:{
    				a:{
    					chainedStop:false,
    					frame:function(){
    						countA++;
    						stimulationTimestamps.push(Date.now());
    						order.push('stimulation2');
    						this.stop();
    					}
    				},
    				b:{
    					delay:100,
    					frame:function(){
    						countB++;
    					}
    				}
    			}
    		});
    		setTimeout(function(){
    			order.push('timeout1');
    		},100);
    		setTimeout(function(){
    			order.push('timeout2');
    			timestampDif = Math.abs(stimulationTimestamps[0] - stimulationTimestamps[1]);
    			done();
    		},250);
    	});

    	it('the delay setting property works ', () => {
        	expect(order[0]).to.be.equal('timeout1');
        	expect(order[1]).to.contain('stimulation');
        });
        it('aspects inherit delay', () => {
        	console.log(order)
        	expect(order[0]).to.be.equal('timeout1');
        	expect(order[1]).to.contain('stimulation');
        	expect(order[2]).to.contain('stimulation');
        	expect(order[3]).to.be.equal('timeout2');
        	expect(timestampDif).to.be.lessThan(10);
        });
        it('aspects can have delays shorter than parents\'',() => {
        	expect(countA).to.be.lessThan(countB);
        });

        it('chainedStop');
        it('delayAddsParentDelay');
        it('aspectAt');
        it('aspect frame can update progress argument and affect root frame progress');
        it('aspect frame can return new progress progress object that updates its this.progress');
    });

});
