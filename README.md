# stimulate
javascript animation utility

[![Build Status](https://travis-ci.org/defualt/stimulate.svg?branch=master)](https://travis-ci.org/defualt/stimulate)

[![Coverage Status](https://coveralls.io/repos/github/defualt/stimulate/badge.svg?branch=master)](https://coveralls.io/github/defualt/stimulate?branch=master)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/defualt.svg)](https://saucelabs.com/u/defualt)

 
**[demo](https://defualt.github.io/stimulate)**

`npm install stimulate --save`


Then:

```
import stimulate from 'stimulate';
stimulate({from:10, to:20});
```

or: 

```
var stimulate = require('stimulate').stimulate;
stimulate({from:10, to:20});
```

or:

```
<script type="text/javascript" src="./dist/stimulate.min.js"></script>
<script>
    stimulate({from:10, to:20});
</script>
```


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
Stimulate increments over time for animations.  Use it in conjunction with any performant DOM manipulation system (vanilla javascript, jQuery, React, Angular).  

Animation is achieved by showing a rapid sucession of frames.  Stimulate's frame triggering is controlled through javascript: with window.requestAnimationFrame when it's available in the browser, and a recursive setTimeout method when it's not.  Stimulate offers performance optimizations, such as real-time accurate progress reporting regardless of browser-performance-affected framerate conistency, frame-call batching, and progress report syncing over simultaneous Stimulate instances, and initial frame customizability.  More depth on those later.

Stimulate does not use CSS3 transitions or @keyframes.  CSS3 methods have their place, but they shortcoming like browser rendering complications, awkward javascript API, limited easing capabilities, and inefficient DOM-sniffing progress lookup.  CSS3 animations have some advanatages, like easy assignability in css and better framerates in browsers lacking requestAnimationFrame.  

You might prefer javascript-frame-based animation over CSS3 methods when interactive performance is critical, like for swiping/throwing elements.  For simpler applications, like animating button hover/touch state, you might prefer CSS3 methods.  

Here are some basic examples of using Stimulate in various popular contexts.  These will animate an element from left to right a total of 95px over one second.


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

For the sake of simplicity, the remaining examples in the documentation will use jQuery.


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
        easing: function(ratioCompleted){
            // sine-out easing function
            return Math.sin(ratioCompleted * Math.PI/2)
        },
        frame: function(progress) {
            //affect the DOM
            $elFoo.css({
                transform: 'translate3d(' + progress.tweened + 'px 0 0)'
            });
        }
    }
);
```

This will increment $elFoo from 5 to 100 over 1 second (1000 milliseconds). One additional setting is included here, `easing`.  Stimulate does not come with an easing library baked in.  You must write your own or include functions from compatible libraries.  One such compatible library can be imported with `npm install eases --save`.  To see an example in this repo, go to `./src/demo/demo.js`.

When you call `stimulate(settings);`, requestAnimationFrame/setTimeout-fallback, will update a progress object and call the `frame` callback over and over.

Look at the `progress` argument in the `frame` callback setting...

### The progress object
`progress` is an object that is passed into the `frame` callback.  This is its structure:
```
{  
   "ratioCompleted":0.8089999999999999,
   "easedRatioCompleted":0.9553299583633394,
   "tweened":77.80999999999999,
   "easedTweened":90.97969625270055,
   "aspects":{  
      "someChild_Y":{  
         "ratioCompleted":0.8089999999999999,
         "easedRatioCompleted":0.9912251264838419,
         "tweened":307.41999999999996,
         "easedTweened":376.6655480638599,
         "aspects":{  
            "asdf":{  
               "ratioCompleted":0.7623452345,
               "easedRatioCompleted":0.7623452345,
               "tweened":0.7623452345,
               "easedTweened":0.7623452345,
               "aspects":{}
            }
         }
      }
   }
}
```
#### The properties in the progress object

##### progress.ratioCompleted
This is an incrementation from 0 to 1.  It ignores the `from`, `to`, and `easing` properties.  With a duration of 1000ms, exactly half way through the animation, `progress.ratioCompleted` will be 0.5.

##### progress.easedRatioCompleted
If an `easing` function setting was specified, `progress.easedRatioCompleted` is the product of applying `progress.ratioCompleted` value to that function.  If there is no easing setting, it's value is the same as `progress.ratioCompleted`.

##### progress.tweened
This is the value between the `settings.from` and `settings.to` according to this point in time relative to the duration, without easing.  So if `from: 10`, `to: 20` and `duration: 1000`, after 300 milliseconds, `progress.tweened` is 13.  After 500 milliseconds, it's 15.  It's a linear progression.  If no `from` setting is specified, this value is the same as `progress.ratioCompleted`.

##### progress.easedTweened
This is like `progress.tweened`, but instead of progressing linearly from `from` to `to`, it uses the `easing` setting to determine its position between `from` and `to`.  If no easing setting exists, its value matches `progress.tweened`.  This is the the most useful property in the `progress` object for typical animation applications.  This is how you get bouncy movements.

##### progress.aspects
Stimulate lets you nest instances in an `aspects` setting object (more on this later).  `progress.aspects` lets you access the progress of nested descendants.  In the example below, notice how the to level `frame` callback accesses the progress of `someChild_Y` in order to calculate the position for `$foo`.
```

var $foo = $('.foo'); // make sure you cache your selectors
stimulate({
    from:10,
    to:20,
    duration: 1000,
    easing: circOut,
    frame: function(progress){
        var x = progress.easedTweened;
        var y = progress.aspects.someChild_Y.easedTweened;
        };
        $foo.css({
            transform: 'translate3d(' + x + 'px ' + y + 'px 0)'
        });
    },
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
            },
            aspects: {
                asdf:{
                    delay: 13
                }
            }
        }
    },
    
});
```

#### Accessibility and persistence of the progress object
As we've seen, the progress object is accessible as an argument of the `frame` setting handler.  But it's accessible in other ways.  There are other callbacks for `onComplete` and `onStop`, all of which have `progress` as their first argument.

Progress is also a property on the object that calling `stimulate` returns.  `Stimulate()` returns an object -- an instance of the StimulateAspect class.  More on this later.  

Also, you should be aware that the `progress` object is never destroyed and recreated for updates.  The `progress` identity persists -- only its properties get updated.  To illustrate this, follow `truth` in the example below to see how various `progress` references match eachother:

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


### StimulationAspect instances
Calling `stimulate({/*settings*/})` creates an instance of a class called `StimulationAspect`, and returns it.  That returned object can be assigned to a variable and it has methods ready to be called and properties ready to be accessed.

See how this is used in the example below, where StimulationAspect is controlled by a button, that when clicked, stops the animation, reverses it, display the current ratioCompleted in an element, waits a half a second and resumes:

```
var myStimulation = stimulate({
    from: 5,
    to: 100,
    duration:1000,
    easing: spring,
    frame: function(){
        $foo.css('top',this.progress.easedTweened+'px')
    };
});
var reversed = false;
$button.on('click', function(){
    myStimulation.stop().updateSettings({
        reverse: !!reversed
    });;
    $meter.text(myStimulation.progress.ratioCompleted);
    setTimeout(function(){
        myStimulation.resume();
    }, 500)
});

```

Notice that some methods like `stop` are chainable.  There will be more detail on various StimulationAspect methods later.

#### Nesting StimulationAspects
StimulationAspect instances can have StimulationAspect child instances.  In this example, this section will descript the relationship between parent and child aspects.

```
var myStimulation = stimulate({
    from: 5,
    to: 100,
    duration: 600,
    aspects: {
        someChild: {
            from: 43,
            to: 29,
            aspects: {
                someGrandChild:{
                    from: 3,
                    to: 99999
                }
            }
        },
        someOtherChild: {
            duration: 300,
            from: 12,
            to: 77
        }
    },
    frame: function(progress){
        console.log(progress.aspects.someChild.aspects.someGrandChild);
    }
});
```

##### the parent can access the `progress` objects of descendants
This can be done in several ways.

`var val = myStimulation.aspects.someChild.aspects.someGrandChild.progress`;

or

`var val = myStimulation.progress.aspects.someChild.aspects.someGrandChild.progress`;

or

`var val = myStimulation.progressAt('someChild.someGrandChild');`


##### the parent can access its StimulationAspect descendants
This can be done in a couple of ways.  

`var val = myStimulation.aspects.someChild.aspects.someGrandChild`

or 

`var val = mystimulation.aspectAt('someChild.someGrandChild');`


##### certain settings are inherited by the child
For a settings like this, if a child does not have it specified, it will assume the value of its parent.  Grandchildren will have this relationship with children, and so on.  So a parent's setting can potentially impact a great-great-grandchild's assumed setting.  Stimulate has a `.updateSettings()` method.  Calling this on a parent will update any children/grandchildren that are dependant on inheritence. Even if you update settings in the middle of an animation, the inheritance will take effect.

Here are the inheritable settings.
- duration -- *(default 1000)*
- skipZeroFrame -- *(default true)*
- delay -- *(default 0)*
- delayEveryLoop -- *(default false)*
- loop -- *(default false)*
- endless -- *(default false)*
- reverse -- *(default false)*
- usePersistedSettings -- *(default false)*

Stimulate has additional settings.  A comprehensive list of settings will be described later.

In the example above, `myStimulation.progress.ratioCompleted` and `myStimulation.aspects.someChild.progress.ratioCompleted` will reach their respective `to` values at the same time, but `myStimulation.aspects.someOtherChild.progress.ratioCompleted` will reach its `to` value 300 milliseconds before that.  So, `myStimulation.aspects.someChild` inherited `duration` setting from its parent `myStimulation`.



##### certain methods called on the parent get called on the child automatically

`myStimulation.stop()` will effectively call  `myStimulation.aspects.someChild.stop()`, which would call `myStimulation.aspects.someChild.aspects.someGrandChild.stop()`.

`resetAll()` has this behavior as well.

#### children can be spawned from parents
There are two ways to do this.  The first is nesting child aspect settings within the parent's setting of the original call. Like this:
```
stimulate({
    duration:100,
    aspects: {
        someChild: {
            duration: 200
        }
    }
});
```

The second way to spawn a child is by calling `.birthChild` on a StimulationAspect. Like this:

```
var myStimulation = stimulate({duration: 100});
var someChildOfMyStimulation = myStimulation.birthAspect('someChild',{duration:200}');
// myStimulation.aspects.someChild === someChildOfMyStimulation
```




















---



