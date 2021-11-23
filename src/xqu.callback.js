"use strict";

var xqu = xqu || {};

xqu.Callback = function(callbackFunc, scope, data)
{
	this.scope = scope;
	this.func = callbackFunc;
	this.data = data;
};
