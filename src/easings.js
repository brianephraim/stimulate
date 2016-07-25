// adapted from https://raw.github.com/michaelvillar/dynamics.js/master/src/dynamics.coffee
var applyDefaults = function(options, defaults) {
    var k, results, v;
    results = [];
    for (k in defaults) {
        v = defaults[k];
        results.push(options[k] != null ? options[k] : options[k] = v);
    }
    return results;
};
var defaults = {
    spring: {
        frequency: 300,
        friction: 200,
        anticipationSize: 0,
        anticipationStrength: 0
    }
};
var dynamics = {};
dynamics.spring = function(options) {
    var A1, A2, decal, frequency, friction, s;
    if (options == null) {
        options = {};
    }
    applyDefaults(options, defaults.spring);
    frequency = Math.max(1, options.frequency / 20);
    friction = Math.pow(20, options.friction / 100);
    s = options.anticipationSize / 1000;
    decal = Math.max(0, s);
    A1 = function(t) {
        var M, a, b, x0, x1;
        M = 0.8;
        x0 = s / (1 - s);
        x1 = 0;
        b = (x0 - (M * x1)) / (x0 - x1);
        a = (M - b) / x0;
        return (a * t * options.anticipationStrength / 100) + b;
    };
    A2 = function(t) {
        return Math.pow(friction / 10, -t) * (1 - t);
    };
    return function(t) {
        var A, At, a, angle, b, frictionT, y0, yS;
        frictionT = (t / (1 - s)) - (s / (1 - s));
        if (t < s) {
            yS = (s / (1 - s)) - (s / (1 - s));
            y0 = (0 / (1 - s)) - (s / (1 - s));
            b = Math.acos(1 / A1(yS));
            a = (Math.acos(1 / A1(y0)) - b) / (frequency * (-s));
            A = A1;
        } else {
            A = A2;
            b = 0;
            a = 1;
        }
        At = A(frictionT);
        angle = frequency * (t - s) * a + b;
        return 1 - (At * Math.cos(angle));
    };
};

const easings = dynamics;
export {easings};
export default easings;