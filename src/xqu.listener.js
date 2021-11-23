
"use strict";

var xqu = xqu || {};

xqu.listener = {};

xqu.listener.EVENT_WINDOW_ON_FOCUS = "xqu.listener.EVENT_WINDOW_ON_FOCUS";
xqu.listener.EVENT_WINDOW_ON_BLUR = "xqu.listener.EVENT_WINDOW_ON_BLUR";
xqu.listener.EVENT_WINDOW_RESIZE = "xqu.listener.EVENT_WINDOW_RESIZE";

xqu.listener.callbacks = {};

xqu.listener.addEventListener = function(type, callback)
{
    if(!xqu.listener.callbacks[type]) {
        xqu.listener.callbacks[type] = [];
    }

    if(xqu.listener.callbacks[type].indexOf(callback) == -1)
    {
        xqu.listener.callbacks[type].push(callback);
    }
};

xqu.listener.window_onfocus = function()
{
    var eventType = xqu.listener.EVENT_WINDOW_ON_FOCUS;
    if(xqu.listener.callbacks[eventType])
    {
        for(var i = 0; i < xqu.listener.callbacks[eventType].length; i++) {
            var callback = xqu.listener.callbacks[eventType][i];
            var callbackFunc = callback.func;
            var callbackObj = callback.scope;

            callbackFunc.call(callbackObj, {});
        }
    }
};

xqu.listener.window_onblur = function()
{
    var eventType = xqu.listener.EVENT_WINDOW_ON_BLUR;
    if(xqu.listener.callbacks[eventType])
    {
        for(var i = 0; i < xqu.listener.callbacks[eventType].length; i++) {
            var callback = xqu.listener.callbacks[eventType][i];
            var callbackFunc = callback.func;
            var callbackObj = callback.scope;

            callbackFunc.call(callbackObj, {});
        }
    }
};

xqu.listener.window_onResize = function()
{
	var eventType = xqu.listener.EVENT_WINDOW_RESIZE;
    if(xqu.listener.callbacks[eventType])
    {
        for(var i = 0; i < xqu.listener.callbacks[eventType].length; i++) {
            var callback = xqu.listener.callbacks[eventType][i];
            var callbackFunc = callback.func;
            var callbackObj = callback.scope;

            callbackFunc.call(callbackObj, {});
        }
    }
};


// window.onfocus = function() {
//  xqu.listener.window_onfocus();
// };

// window.onblur = function() {
//  xqu.listener.window_onblur();
// };

/*************** Window ReSize*******************/
window.addEventListener("resize", function(){
	xqu.listener.window_onResize();	
});



/*************** on/out focus (Start)*******************/
// main visibility API function
// use visibility API to check if current tab is active or not
var vis = (function(){
    var stateKey,
        eventKey,
        keys = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    };
})();

// check if current tab is active or not
vis(function(){

    if(vis()){

        // tween resume() code goes here
        xqu.listener.window_onfocus();

        setTimeout(function(){
            // xqu.log("tab is visible - has focus");
        },300);

    } else {

        // tween pause() code goes here
	    xqu.listener.window_onblur();
        // xqu.log("tab is invisible - has blur");
    }
});

// check if browser window has focus
var notIE = (document.documentMode === undefined),
    isChromium = window.chrome;

if (notIE && !isChromium) {

    // checks for Firefox and other  NON IE Chrome versions
    $(window).on("focusin", function () {

        // tween resume() code goes here
        xqu.listener.window_onfocus();

        setTimeout(function(){
            // xqu.log("focus");
        },300);

    }).on("focusout", function () {

        // tween pause() code goes here
        // xqu.listener.window_onblur();

        // xqu.log("blur");

    });

} else {

    // checks for IE and Chromium versions
    if (window.addEventListener) {

        // bind focus event
        window.addEventListener("focus", function (event) {

            // tween resume() code goes here
            xqu.listener.window_onfocus();

            setTimeout(function(){
                 // xqu.log("focus");
            },300);

        }, false);

        // bind blur event
        window.addEventListener("blur", function (event) {

            // tween pause() code goes here
            // xqu.listener.window_onblur();
             // xqu.log("blur");
        }, false);

    } else {

        // bind focus event
        window.attachEvent("focus", function (event) {

            // tween resume() code goes here
            xqu.listener.window_onfocus();

            setTimeout(function(){
                 // xqu.log("focus");
            },300);
        });

        // bind focus event
        window.attachEvent("blur", function (event) {

            // tween pause() code goes here
            // xqu.listener.window_onblur();
            // xqu.log("blur");
        });
    }
}

/*************** on/out focus (End)*******************/
