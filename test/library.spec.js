import chai from 'chai';
// import Library from '../dist/stimulate.min.js';
import stimulate from '../src/index';

chai.expect();

const expect = chai.expect;

var counter = 0;
var stimulation;

describe('Given an instance returned by a call to my library', function() {

	var processingTimeBenchmarkStart = Date.now();
	var processesDummy = [];
	for (var i=0;i<100000;i++){
		processesDummy.push({});
	}
	var processingTimeBenchmarkEnd = Date.now();
	var processingTimeBenchmark = processingTimeBenchmarkEnd - processingTimeBenchmarkStart;
	var stimulationTestedStart = Date.now();
	var stimulationTestedDuration = null;
	var counterAtTimeOfStop = null;
    before(function(done) {
        stimulation = stimulate({
            frame: function() {
                counter++;
                if (counter >= 10) {
                	counterAtTimeOfStop = counter;
                    stimulation.stop();
                    var stimulationTestedEnd = Date.now();
                    stimulationTestedDuration = stimulationTestedEnd - stimulationTestedStart;
                }
            }
        });

        var s2 = stimulate({
            frame: function() {
                if(counter >= 10){
                	this.stop();
                	setTimeout(function(){
                    	done();
                    },100);
                }
            }
        });
    });

    describe('When I need to increment over time', function() {
        it('it has a method for specifying frame behavior,', () => {
            expect(counter).to.be.greaterThan(0);
        });

        it('its frame method takes time (significantly exceeds processing speed benchmarks)', () => {
            expect(stimulationTestedDuration).to.be.greaterThan(processingTimeBenchmark * 2);
        });
        it('its frame method calls repeatedly', () => {
            expect(counter).to.be.greaterThan(2);
        });
    });

    describe('When I need to stop incrementing', function() {
        it('it has a stop method,', () => {
            expect(typeof stimulation.stop).to.be.equal('function');
        });
        it('its stop method ends incrementation,', () => {
            expect(counterAtTimeOfStop).to.be.equal(counter);
        });
    });

 //    describe("a test", function(){
	//   var foo = false;

	//   beforeEach(function(done){

	//     setTimeout(function(){
	//       foo = true;

	//       // complete the async beforeEach
	//       done();

	//     }, 50);

	//   });

	//   it("should pass", function(){
	//     expect(foo).equals(true);
	//   });

	// });


});
