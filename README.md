# stimulate
javascript animation utility

`npm install stimulate`

`import stimulate from 'stimulate';`

## Overview
Stimulate helps you create animations with the following features:
- stopping
- resuming
- resetting
- looping
- delaying
- easing
- reporting progress
- handling onComplete callbacks
- achieving high frame rates
- integrating with various frameworks
- syncing and managing multiple instances
- reversing (even mid animation)
- changing speed (even mid animation)
- changing from and to (even mid animation)

## Basics
Stimulate lets you increment over time.  Use it with any DOM manipulation framework to create animations by updating the css for each frame.  Behind the scenes, framing is controlled via requestAnimationFrame when available in the browser, falling back to setTimeout when not available.  Stimulate has other performance optimizations, such as accurate progress reporting regardless of browser-performance-restricted framerate inconsistency, and frame-call batching over multiple Stimulate instances. More on these later.

Stimulate does not use CSS3 transitions or CSS3 animate.  CSS3 transitions/animate have their place, but they have certain deficiencies (slow element rendering, inefficient stopping, laggy initiation, limited easing capabilities, inefficient progress reporting, difficult onComplete callback handling).  CSS vs JS animation has been debated before.  Use the google to decide for yourself what's right for your project.

Here are some basic examples in vanilla js, jQuery, and React, each of which moves an element to the right 95px at a consistent rate.

### vanilla js
```
var elFoo = getElementById('foo');
stimulate({
	from: 5,
	to: 100,
    duration: 1000,
	frame: function(progress){
		elFoo.style.transform = 'translate3d(' + progress.tweened + 'px 0 0)';
	}
});
```

### jQuery
```
var $elFoo = $('#foo');
stimulate({
	from: 5,
	to: 100,
    duration: 1000,
	frame: function(progress){
		$elFoo.css({
		    transform: 'translate3d(' + progress.tweened + 'px 0 0)'
        });
	}
});
```

### React
```
var Component = React.createClass({
    getInitialState: function () {
        return {
            xPosition: 5
        };
    },
    componentDidMount: function() {
        stimulate({
        	from: 5,
        	to: 100,
            duration: 1000,
        	frame: function(progress){
        	    this.setState({
        	        xPosition: progress.tweened
        	   });
        	}
        });
    },
    render: function () {
        var style = {
            transform: 'translate3d(' + this.state.xPosition + 'px 0 0)'
        };
        return <div style={style}>Hello</div>;
    }
});
```


## In depth
In the examples above, see the basic structure of the stimulate call
```
//call to the library
stimulate(
	//settings
    {
    	from:5,
        to: 100,
        duration: 1000,
        easing: sineOut,
        frame: function(progress) {
        	//affect the DOM
            styleAnElement(someEl,progress.tweened);
        }
    }
);
```
This will increment from 5 to 100 over 1 second (1000 milliseconds).

Each frame (as controlled by requestAnimationFrame) will call the `frame` callback.

See in the `frame` callback setting, the `progress` argument...

### The progress object
`progress` is an object that is passed into the `frame` callback.  This is its structure:
```
{
	ratioCompleted :0.767,
    easedRatioCompleted: 0.9337679395350391,
	tweened: 74.03,
	easedTweened: 89.03911455815351,
	aspects:{}
}
```
#### The properties in the progress object

##### progress.ratioCompleted
This is an incrementation from 0 to 1.  It ignores the `from`, `to`, and `easing` properties.  With a duration of 1000ms, exactly half way through the animation, `progress.ratioCompleted` will be 0.5.

##### progress.easedRatioCompleted
If an `easing` function setting was specified, `progress.easedRatioCompleted` is the product of applying `progress.ratioCompleted` value to it.  If there is no easing setting, it's value is the same as `progress.ratioCompleted`.

##### progress.tweened
This is the value between the `settings.from` and `settings.to` according to this point in time relative to the duration, without easing.  So if `from: 10`, `to: 20` and `duration: 1000`, after 300 milliseconds, `progress.tweened` is 13.  After 500 milliseconds, it's 15.  It's a linear progression.

##### progress.easedTweened
This is like `progress.tweened`, but instead of progressing linearly from `from` to `to`, it uses the `easing` setting to determine its position.  If no easing setting exists, its value matches `progress.tweened`.  This is the the most useful property in the `progress` object for typical animation applications.  This is how you get bouncy movements.

##### progress.aspects
Stimulate lets you nest instances in an `aspects` setting object (more on this later).  `progress.aspects` lets you access the progress of nested descendants.  Here's an example:
```
stimulate({
	from:10,
    to:20,
    duration: 1000,
    easing: circOut,
    aspects: {
    	someChild_Y: {
        	from: -142,
            to: 345,
            duration: 642,
            easing: sineOut,
            frame: function(progress){
            	// This CB is here if you need it
                // but this instance's progress
                // is accessible in its parent progress.aspects
                // see below.
            }
        }
    },
    frame: function(progress){
    	translateXY(someEl,{
        	x: progress.easedTweened,
            y: progress.aspects.someChild_Y.easedTweened
        });
    }
});
```

#### Accessibility of the progress object
As we've seen, the progress object is accessible as an argument of the `frame` setting handler.  But it's accessible in other ways.  There are other callbacks for `onComplete` and `onStop`, all of which have `progress` as their first argument.

Progress is also a property on the object that calling `stimulate` returns.  That's right, stimulate returns an object -- an instance of the StimulateAspect class.  More on this later.  

Also, you should be aware that the `progress` object is never destroyed and recreated for updates.  The `progress` identity persists -- only its properties get updated.  So consider the following:

```
var truth = true;
var mainProgress;
var aspectProgress;
var myStimulation = stimulate({
	from: 5,
    to: 10,
    duration: 1000,
    aspects: {
    	foo:{
            from: 12,
            to: 423,
            duration:243,
        	frame: function(progress){
				truth = truth && progress === this.progress;
                aspectProgress = progress;
        	}
    	}
    },
    frame: function(progress){
    	truth = truth && progress === this.progress;
        truth = truth && myStimulation.progress === progress;
        truth = truth && progress.aspects.foo === aspectProgress;
        mainProgress = progress;
        
    }
});
setTimeout(function(){
	truth = truth && mainProgress === myStimulation.progress;
    console.log(truth === true); //true
},100);

```




























---



