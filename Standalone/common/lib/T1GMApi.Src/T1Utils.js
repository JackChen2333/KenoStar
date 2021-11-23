'use strict';


var T1Utils = {

	queryString 			: document.location.search || document.location.hash,
	logEnabled 				: false, // false
	debugConsoleLog 		: {
		name 				: 'T1 DebugConsoleLog',
		enabled 			: false,
		visible 			: false,
		logInternalMessages : true,
		logData 			: '',
		logDataDefault 		: '<span style="font-size: 1em;">T1 CONSOLE LOG</span></br>',
		divElement 			: '',
		divControls 		: {
			element 	: '',
			showButton 	: null,
			hideButton 	: null,
			clearButton : null
		}
	}

};

// Prevent clicks on objects
T1Utils.preventClickOnObject = function( objectName ){

	// Disable Click to the Gass
	var T1InfoObject = document.getElementById(objectName);
	var preventClick = function(e){ e.stopPropagation(); return false; };

	if (T1InfoObject){
		T1InfoObject.onclick = preventClick;
		T1InfoObject.onmousedown = preventClick;
		T1InfoObject.onmouseup = preventClick;
		T1InfoObject.ontouchstart = preventClick;
	}

};

// Send to Console
T1Utils.consoleLog = function(text){

	if (this.debugConsoleLog.enabled && this.debugConsoleLog.logInternalMessages){
		this.debugConsoleLog.logData += text + "<br>";
		this.printDebugConsoleLog();
	}else if (this.debugConsoleLog.enabled && !this.debugConsoleLog.logInternalMessages){
		return;
	}else if (T1Utils.logEnabled){
		console.log(text);
	}

};

T1Utils.enableConsoleLog = function() {
	this.logEnabled = true;
}

T1Utils.enableDebugConsoleLog = function(){
	var that = this;

	this.debugConsoleLog.enabled = true;

	if (!document || !document.body){
		setTimeout(function(){
			that.enableDebugConsoleLog();
		}, 500);

		return;
	}

	// Creates debugConsoleLog Element
	this.debugConsoleLog.divElement = document.createElement('div');
	this.debugConsoleLog.divElement.id = this.debugConsoleLog.name;
	this.debugConsoleLog.divElement.className = 'T1DebugConsoleLog';
	document.body.appendChild(this.debugConsoleLog.divElement);

	// Set Contents to Main Error Manager
	this.debugConsoleLog.logData = this.debugConsoleLog.logDataDefault;
	this.debugConsoleLog.logData += "T1GMApi ERROR DATA</br>";
	this.debugConsoleLog.divElement.innerHTML = this.debugConsoleLog.logData;

	// Prevents click on objects
	this.preventClickOnObject(this.debugConsoleLog.name);

	// Creates debugConsoleLog Element
	this.debugConsoleLog.divControls.element = document.createElement('div');
	this.debugConsoleLog.divControls.element.id = this.debugConsoleLog.name + 'Controls';
	this.debugConsoleLog.divControls.element.className = 'T1DebugConsoleLogControls';

	// Set the Controls for the Debug Console Log
	var logControls = '';
	logControls += '<div id="T1DebugConsoleLogControlsShow" class="T1DebugConsoleLogControlsShow" onclick="T1Utils.showDebugConsoleLog();" ontouchstart="T1Utils.showDebugConsoleLog();"><a href="javascript: T1Utils.showDebugConsoleLog();">SHOW CONSOLE</a></div>';
	logControls += '<div id="T1DebugConsoleLogControlsClear" class="T1DebugConsoleLogControlsClear" onclick="T1Utils.clearDebugConsoleLog();" ontouchstart="T1Utils.clearDebugConsoleLog();"><a href="javascript: T1Utils.clearDebugConsoleLog();">CLEAR</a></div>';
	logControls += '<div id="T1DebugConsoleLogControlsHide" class="T1DebugConsoleLogControlsHide" onclick="T1Utils.hideDebugConsoleLog();" ontouchstart="T1Utils.hideDebugConsoleLog();"><a href="javascript: T1Utils.hideDebugConsoleLog();">HIDE</a></div>';
	document.body.appendChild(this.debugConsoleLog.divControls.element);
	this.debugConsoleLog.divControls.element.innerHTML = logControls;

	// Save Controls
	this.debugConsoleLog.divControls.showButton = document.getElementById('T1DebugConsoleLogControlsShow');
	this.debugConsoleLog.divControls.hideButton = document.getElementById('T1DebugConsoleLogControlsHide');
	this.debugConsoleLog.divControls.clearButton = document.getElementById('T1DebugConsoleLogControlsClear');

	// Show Controls
	this.showDebugConsoleLogControls();

	// Catch console log data
	(function(){
	    var oldConsoleLog = console.log;
	    console.log = function (message){
	    	that.debugConsoleLog.logData += message + "<br>";
			that.printDebugConsoleLog();

	        oldConsoleLog.apply(console, arguments);
	    };
	})();

	// Catch errors
	window.onerror = function(message, url, lineNumber, columnNumber, errorObject){
		that.debugConsoleLog.logData += "====================== BEGIN JS ERROR ======================</br>";
		if (message){
			that.debugConsoleLog.logData += message + "</br>";
		}
		if (url){
			that.debugConsoleLog.logData += "IN " + url + "</br>";
		}
		if (lineNumber){
			that.debugConsoleLog.logData += "Line number: " + lineNumber + "</br>";
		}
		if (columnNumber){
			that.debugConsoleLog.logData += "Column number: " + columnNumber + "</br>";
		}
		if (errorObject && errorObject.stack){
			that.debugConsoleLog.logData += "Error Stack: " + T1Utils.escapeHtml(errorObject.stack) + "</br>";
		}
		that.debugConsoleLog.logData += "======================= END JS ERROR =======================</br>";

		that.printDebugConsoleLog();
		return false;
	};

	// Add scrolling events to Console
	this.debugConsoleLog.divElement.addEventListener("touchstart", function(event){
		scrollStartPos = this.scrollTop + event.touches[0].pageY;
		event.preventDefault();
	}, {passive: true});

	this.debugConsoleLog.divElement.addEventListener("touchmove", function(event) {
		this.scrollTop = scrollStartPos - event.touches[0].pageY;
		event.preventDefault();
	}, {passive: true});

};

T1Utils.printDebugConsoleLog = function(value){
	this.debugConsoleLog.divElement.innerHTML = this.debugConsoleLog.logData;
};

T1Utils.showDebugConsoleLog = function(){
	this.debugConsoleLog.visible = true;
	this.debugConsoleLog.divElement.style.display = 'block';

	this.debugConsoleLog.divControls.showButton.style.display = 'none';
	this.debugConsoleLog.divControls.clearButton.style.display = 'block';
	this.debugConsoleLog.divControls.hideButton.style.display = 'block';

};

T1Utils.hideDebugConsoleLog = function(){
	this.debugConsoleLog.visible = false;
	this.debugConsoleLog.divElement.style.display = 'none';

	this.debugConsoleLog.divControls.showButton.style.display = 'block';
	this.debugConsoleLog.divControls.clearButton.style.display = 'none';
	this.debugConsoleLog.divControls.hideButton.style.display = 'none';
};

T1Utils.showDebugConsoleLogControls = function(){
	this.debugConsoleLog.divControls.element.style.display = 'block';
	this.debugConsoleLog.divControls.showButton.style.display = 'block';
	this.debugConsoleLog.divControls.clearButton.style.display = 'none';
	this.debugConsoleLog.divControls.hideButton.style.display = 'none';
};

T1Utils.clearDebugConsoleLog = function(){
	this.debugConsoleLog.logData = this.debugConsoleLog.logDataDefault;
	this.debugConsoleLog.divElement.innerHTML = this.debugConsoleLog.logData;
};

// Trim strings
T1Utils.trim = function(text){
	for (i = 0; i < text.length; $i++){
		if (text.charAt(i) == " ")
			text = text.substring(i + 1, text.length);
		else
			break;
	}
	
	for (i = text.length - 1; i >= 0; i = text.length - 1){
		if (text.charAt(i) == " ")
			text = text.substring(0, i);
		else
			break;
	}
	return text;
};

T1Utils.escapeHtml = function(text){
	text = (text) ? text : "";
	text = text.replace(/&/g, "&amp;");
	text = text.replace(/</g, "&lt;");
	text = text.replace(/>/g, "&gt;");
	text = text.replace(/"/g, "&quot;");
	text = text.replace(/'/g, "&#039;");

	return text;
};

// Listen to a browser event (Cross-browser)
T1Utils.addEvent = function(object, eventName, functionToExecute) {

	if (object.addEventListener){
		object.addEventListener(eventName, functionToExecute, {passive: true});
	} else if (object.attachEvent){
		object["e" + eventName + functionToExecute] = functionToExecute;
		object[eventName + functionToExecute] = function(){
			object["e" + eventName + functionToExecute](window.event);
		}
		object.attachEvent("on" + eventName, object[eventName + functionToExecute]);
	} else {
		object["on" + eventName] = object["e" + eventName + functionToExecute];
	}

};

// Check if is mobile or not
T1Utils.getEnvironment = function(){
	var Environment = {

	    isAndroid: function() {
	        return navigator.userAgent.match(/Android/i);
	    },

	    isBlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },

	    isIOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },

	    isOpera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },

	    isWindowsPhone: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },

	    isTablet: function() {
	        return navigator.userAgent.match(/iPad/i);
	    }
	};

	return Environment;
};

T1Utils.isMobile = function(){
	var Environment = this.getEnvironment();
	return (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS() || Environment.isOpera() || Environment.isWindowsPhone());
};

T1Utils.isTablet = function(){
	var Environment = this.getEnvironment();
	return Environment.isTablet();
};

T1Utils.isAndroidInternetBrowser = function(){
	var nua = navigator.userAgent.toLowerCase();
	var isStockBrowser = ((nua.indexOf('mozilla/5.0') > -1 && nua.indexOf('android ') > -1 && nua.indexOf('applewebkit') > -1) && (!(nua.indexOf('chrome') > -1) || (nua.indexOf('samsungbrowser') > -1)));
	return isStockBrowser;
};

T1Utils.getAndroidVersion = function(){
	ua = navigator.userAgent.toLowerCase();
	var match = ua.match(/android\s([0-9\.]*)/);
	return match ? match[1] : false;
};

T1Utils.getIOSVersion = function(){
	ua = navigator.userAgent.toLowerCase();
	var match = ua.match(/OS\s([0-9\_]*)/i);
	return match ? match[1] : false;
};

// Get value from querystring param
T1Utils.getQueryParamValue = function(parameter){
	if (this.queryString){
		var queryVars;

		if (/\?/.test(this.queryString)){
			queryVars = this.queryString.split("?")[1];
		}

		if (parameter == null){
			return "";
		}

		var pairs = queryVars.split("&");
		for (var i = 0; i < pairs.length; i++){
			if (pairs[i].substring(0, pairs[i].indexOf("=")) == parameter){
				return pairs[i].substring((pairs[i].indexOf("=") + 1));
			}
		}
	}

	return "";
};

T1Utils.getDocumentDomain = function(unlimited, returnIP){
	// Check if location is not an IP
	var regExpIp = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/;
	var regExpPatern = new RegExp(regExpIp);
	var isLocalhostOrIP = regExpPatern.test(location.hostname) || location.hostname == 'localhost';

	// Set Document Domain
	if (!isLocalhostOrIP){
		if (!unlimited){
		    var subdomain = document.location.hostname.split('.');
		    var documentDomain = "";
		    if (subdomain.length > 2){
		        for (i = subdomain.length - 2; i < subdomain.length; i++){
		            documentDomain += ((documentDomain) ? "."  :"") + subdomain[i];
		        }
			}else{
				documentDomain = document.location.hostname;
			}
		}else{
			documentDomain = document.location.hostname;
		}
	}else{
		documentDomain = (returnIP) ? document.location.hostname : "";
	}

	return documentDomain;
};

T1Utils.getWindowOrigin = function(getCurrentValue){
	if (!getCurrentValue){
		// Check if origin is sent
		var windowOrigin = decodeURIComponent(this.getQueryParamValue('origin'));
		if (!windowOrigin){
			// Get Local Domain
			windowOrigin = location.protocol + "//" + location.hostname + ((location.port) ? ":" + location.port : "");
		}
	}else{
		// Get Local Domain
		windowOrigin = location.protocol + "//" + location.hostname + ((location.port) ? ":" + location.port : "");

	}

	return windowOrigin;
};

// Set the document domain to the first level of the actual domain, only if is not used an IP or localhost
T1Utils.setDocumentDomain = function(){
	// Check if location is not an IP
	var regExpIp = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/;
	var regExpPatern = new RegExp(regExpIp);
	var isLocalhostOrIP = regExpPatern.test(location.hostname) || location.hostname == 'localhost';

	// Set Document Domain
	if (!isLocalhostOrIP){
	    var subdomain = location.hostname.split('.');
	    var documentDomain = "";
	    if (subdomain.length > 2){
	        for (i = subdomain.length - 2; i < subdomain.length; i++){
	            documentDomain += ((documentDomain) ? "."  :"") + subdomain[i];
	        }
	    }else{
	        documentDomain = location.hostname;
	    }
	    document.domain = documentDomain;
	}
};

// Check if a string is a valid JSON and parse it
T1Utils.parseJSON = function(string){
	var parsedJSON = '';

	if (!string)
		return false;

	try{
		parsedJSON = JSON.parse(string);
		return parsedJSON;
	}catch(e){
		return false;
	}

};

// Check if a string is a valid JSON and parse it
T1Utils.parseToHTML = function(text){

	if (!text)
		return "";

	text = text.replace(/\n/gi, "<br/>");
	return text;

};




T1Utils.getEasingFunction = function(easing){

	if (!easing){
		return false;
	}

	// Functiones para animaciones
	var easingFunctions = {
		// no easing, no acceleration
		linear: function (t) { return t },
		// accelerating from zero velocity
		easeInQuad: function (t) { return t*t },
		// decelerating to zero velocity
		easeOutQuad: function (t) { return t*(2-t) },
		// acceleration until halfway, then deceleration
		easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
		// accelerating from zero velocity 
		easeInCubic: function (t) { return t*t*t },
		// decelerating to zero velocity 
		easeOutCubic: function (t) { return (--t)*t*t+1 },
		// acceleration until halfway, then deceleration 
		easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
		// accelerating from zero velocity 
		easeInQuart: function (t) { return t*t*t*t },
		// decelerating to zero velocity 
		easeOutQuart: function (t) { return 1-(--t)*t*t*t },
		// acceleration until halfway, then deceleration
		easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
		// accelerating from zero velocity
		easeInQuint: function (t) { return t*t*t*t*t },
		// decelerating to zero velocity
		easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
		// acceleration until halfway, then deceleration 
		easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
	}

	return easingFunctions[easing];
};

T1Utils.getTime = function(){
	return (window.performance && window.performance.now && window.performance.now()) || Date.now();
}






T1Utils.formatMoney = function(num, currencyFormat){
	
	var configData = (currencyFormat) ? currencyFormat : t1GMApi.getGameCurrencyData();

	var prefix            = configData.prefix || "",
		prefixSeparator   = configData.prefixSeparator || "",
		suffix            = configData.suffix || "",
		suffixSeparator   = configData.suffixSeparator || "",
		decimalPlace     = configData.decimalPlace,
		decimalSeparator  = configData.decimalSeparator || ",",
		groupingSeparator = configData.groupingSeparator || ".",
		amount             = num || "000";

	amount = T1Utils.formatNumber(amount, decimalPlace, decimalSeparator, groupingSeparator);

	return String(prefix + prefixSeparator + amount + suffixSeparator + suffix);
};


// Number Foramtter
// v: number, c: decimalPlace, d:decimalSeparator, t:groupSeparator
T1Utils.formatNumber = function(v, c, d, t) {

	var c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = v < 0 ? "-" : "", 
	    i = parseInt(v = Math.abs(+v || 0).toFixed(c)) + "", 
	    j = (j = i.length) > 3 ? j % 3 : 0;

	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(v - i).toFixed(c).slice(2) : "");
};


// Check debug Mode to enable it
var T1DebugConsoleLogStatus = decodeURIComponent(T1Utils.getQueryParamValue("debugMode"));
if (T1DebugConsoleLogStatus == "1"){
	// Enable Debug Console
	T1Utils.enableDebugConsoleLog();
}
