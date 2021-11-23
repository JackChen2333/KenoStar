
"use strict";
var xqu = xqu || {};

// ------------------
// NOTE : Util
// ------------------
xqu.utils = {};
xqu.utils.getDecimalDigits = function(num)
{
	var decimalDigit = 0;    
	var numStr = num.toString();
	var pointIndex = numStr.indexOf(".");
	if( pointIndex != -1)
	{
		decimalDigit = numStr.length - pointIndex - 1;
	}
	return decimalDigit;
};

xqu.utils.getDifference = function(num1, num2)
{
	var result = 0;
	if(num1 >= num2)
	{
		result = num1 - num2;
	}
	else
	{
		result = num2 - num1;
	}

	return result;
};

xqu.utils.RandomNum = function(min, max)
{
	var decimalDigit_1 = xqu.utils.getDecimalDigits(min);
	var decimalDigit_2 = xqu.utils.getDecimalDigits(min);
	var decimalDigit = (decimalDigit_1 > decimalDigit_2) ? decimalDigit_1 : decimalDigit_2;

	//cc.log("decimalDigit = " + decimalDigit);

	var adjuster = 1;

	for(var i=0;
	    i<decimalDigit;
	    i++)
	{
		adjuster = adjuster * 10;
	}
	
	var minNew = min * adjuster;
	var maxNew = max * adjuster;
	
	return Math.floor(Math.random()*(maxNew-minNew+1)+minNew) / adjuster;
};

xqu.utils.calDiff = function(num1, num2)
{
	var diff = 0;
	if(num1 >= num2)
	{
		diff = num1 - num2;
	}
	else
	{
		diff = num2 - num1;
	}
	return diff;
};

xqu.utils.Distance = function(p1X, p1Y, p2X, p2Y)
{
	var xDist = p2X - p1X;
	var yDist = p2Y - p1Y;
	var dist = Math.sqrt( (xDist * xDist) + (yDist*yDist) );

	return dist;
};

xqu.utils.getDegree = function(centerX, centerY, startX, startY, endX, endY)
{
	var a = xqu.utils.Distance(startX, startY, endX, endY);
	var b = xqu.utils.Distance(centerX, centerY, endX, endY);
	var c = xqu.utils.Distance(centerX, centerY, startX, startY);
	
	var cosAngle = ((b*b) + (c*c) - (a*a)) / (2 * b * c);

	var radians = Math.acos(cosAngle);

	var degree = radians * (180/Math.PI);

	return degree;
};

xqu.utils.shuffleArray = function(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

xqu.utils.getType = function(o)
{
	var _t;
	return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();    
};

xqu.utils.cloneArray = function(destination,source)
{
	for(var p in source)
	{
		if(xqu.utils.getType(source[p])=="array"||xqu.utils.getType(source[p])=="object")
		{
			destination[p]=xqu.utils.getType(source[p])=="array"?[]:{};
			arguments.callee(destination[p],source[p]);

		}
		else
		{
			destination[p]=source[p];
		}
	}
};

// Number Foramtter
// v: number, c: decimalPlace, d:decimalSeparator, t:groupSeparator
xqu.utils.sformatNumber = function(v, c, d, t) {

	var c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = v < 0 ? "-" : "", 
	    i = parseInt(v = Math.abs(+v || 0).toFixed(c)) + "", 
	    j = (j = i.length) > 3 ? j % 3 : 0;

	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(v - i).toFixed(c).slice(2) : "");
};

// var test = xqu.utils.sformatNumber(1.25, 2, '.', ','); 
// console.log(test); // output: 100,000


xqu.utils.lerp = function(start, stop, amt) {
	return (start * (1 - amt)) + (stop * amt);
}

// ********************************* Logger ******************************************* //
// xqu.log = console.log;

xqu.log = Function.prototype.bind.call(console.log, console);
xqu.warn = Function.prototype.bind.call(console.warn, console);
xqu.fatal = Function.prototype.bind.call(console.error, console);
// xqu.debug = Function.prototype.bind.call(console.debug, console);

// IMPORTANT: When in IE, if your product has console.log enabled,
// then IE will give you some wried troubles for running your loading, etc..
// So you better disable all console.log when you ship your code.
if(!xqu.config.DEBUG_MODE)
{
    xqu.log = xqu.warn = xqu.fatal = function(msg) {
        return;
    };
}

xqu.assert = function(condition, message) {
    if (!xqu.config.DEBUG_MODE) {
        return;
    }

    if (!condition) {
        message = message || "Assertion failed";
        // NOTE: Some of Browser might not support Error Object
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
};