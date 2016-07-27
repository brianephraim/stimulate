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
            expect(r.stimulationTestedDuration).to.be.greaterThan(processingTimeBenchmark * 2);
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
        it('aspects inherit from, to from parent settings', () => {
        	var parentTweened = r.midProgressSnapshot.tweened;
        	var xTweened = r.midProgressSnapshot.aspects.x.tweened;
        	var yTweened = r.midProgressSnapshot.aspects.y.tweened;
        	// var zTweened = r.midProgressSnapshot.aspects.z.tweened;
        	expect(parentTweened).to.be.equal(xTweened).to.be.equal(yTweened);
        	// expect(r.midProgressSnapshot.aspects.x.tweened).to.be.greaterThan(settings.from);
        });
        it('easing eases', () => {
        	var p = r.midProgressSnapshot.easedRatioCompleted;
        	expect(r.midProgressSnapshot.ratioCompleted).to.not.equal(r.midProgressSnapshot.easedRatioCompleted);
        });
        it('aspects inherit easing from parent settings', () => {
        	var p = r.midProgressSnapshot.easedRatioCompleted;
        	var x = r.midProgressSnapshot.aspects.x.easedRatioCompleted;
        	var y = r.midProgressSnapshot.aspects.y.easedRatioCompleted;
        	var z = r.midProgressSnapshot.aspects.z.easedRatioCompleted;
        	expect(p).to.be.equal(x).to.be.equal(z).to.not.equal(y);
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

});
