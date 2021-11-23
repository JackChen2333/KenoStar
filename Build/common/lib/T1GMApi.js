

'use strict';



var T1Config = T1Config || {};


T1Config.LoaderVersion = '0.1.0';'use strict';


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
/*******************************************************************************/
// TRGS Publication Subscription Service
/*******************************************************************************/

'use strict';

function T1PubSub() {
	this.events = {};
	this.id = 0;
};

// Subscribe an event to be called
T1PubSub.prototype.subscribe = function(event, fnSubscriptor) {

	if (!event){
		T1Utils.consoleLog("The event sent in T1GMApi.subscribeToEvent() method is NULL or UNDEFINED!");
		T1Utils.consoleLog(fnSubscriptor);
		return;
	} 

	if (!this.events[event]) {
		this.events[event] = [];
	}

	this.events[event].push({
		id : ++this.id,
		fn : fnSubscriptor
	});

	return this.id;
};

// Publish an event (so the method that has subscribed it gets the call)
T1PubSub.prototype.publish = function(eventName, data) {
	
	if (!eventName){
		T1Utils.consoleLog("The event sent in T1GMApi.publishEvent() method is NULL or UNDEFINED!");
		T1Utils.consoleLog(data);
		return;
	} 

	var eventData = {
		type : eventName
	};
	
	if (data !== undefined)
		eventData.data = data;

	if (this.events[eventName]) {
		for (var i = this.events[eventName].length - 1; i >= 0; i--) {
			this.events[eventName][i] && this.events[eventName][i].fn && this.events[eventName][i].fn(eventData);
		};

		if (this.events[eventName]) {
			return this.events[eventName].length;
		}
	}

	return false;
};

// Unsubscribe a previoulsy subscribed event to be called
T1PubSub.prototype.unsubscribe = function(id) {

	if (!id){
		T1Utils.consoleLog("The id sent in T1GMApi.unsubscribeFromEvent() method is NULL or UNDEFINED!");
		return;
	}

	var that = this,
		deleted = false;

	for (var i in this.events) {
		for (var j = 0; j < this.events[i].length && !deleted; j++){

			// Search event to delete
			if (this.events[i][j].id === id) {
				that.events[i].splice(j, 1);
				deleted = true;
			}

		}
	}

	return deleted;

};

'use strict';

var T1IndexPageMgr = function(t1GMApi) {
    this._t1GMApi = t1GMApi;
    // content Div
    // this._contentDiv = null;

    this._cssFileURL = './common/css/index.css';

    // Preloader
	this._loaderDiv = null;
    this._loadingBarDiv = null;

    // Messaging
	this._messagingDiv = null;

    // StatusBar
    this._statusBarBalance = null;
    this._statusBarCost = null;
    this._statusBarWin = null;
    
    // OverlayHolder
    this._overlayHolder = null;
    this._overlayBtnHome = null;
    this._overlayBtnSound = null;
    this._overlayBtnInfo = null;
    this._overlayBtnClose = null;
    this._overlayLoadedContent = null;

    // Full Screen Prompt
    this._fullScreenPrompt = null;

    // Roatation Screen Prompt
    this._rotateScreenPrompt = null;
}

T1IndexPageMgr.prototype.init = function() {
    var self = this;

    // self._initContentDiv();

    // self._initGameDiv();

    self._createIndexPageContentDivByTemplate();

    self._loadCssFile();

    self._initStatusBar();

    self._initLoader();

    self._initMessagingDiv();    

    self._initOverlayHolder();

    self._initScreenPrompt();
    
    self._initPublications();
}

// T1IndexPageMgr.prototype._initContentDiv = function() {
//     this._contentDiv = document.createElement('div');
//     // this._contentDiv.setAttribute('id', 'content');
//     this._contentDiv.id = 'content';
//     document.body.appendChild(this._contentDiv);
// }

// T1IndexPageMgr.prototype._initGameDiv = function() {
//     this._gameDiv = document.createElement('div');
//     this._gameDiv.id = 'game';
//     this._contentDiv.appendChild(this._gameDiv);
// }

T1IndexPageMgr.prototype._initLoader = function () {
    var self = this;

    self._loaderDiv = document.getElementById("loader");
	self._loadingBarDiv = document.getElementById("loadingBarMeter");
    self._loaderVersion = document.getElementById("deploymentVersion");

    self._loaderVersion.innerHTML = T1Config.LoaderVersion;
   
	self._loaderDiv.style.display = 'none';
	self._loadingBarDiv.style.width = '0%';
}

T1IndexPageMgr.prototype._initMessagingDiv = function () {
    var self = this;

    self._messagingDiv = document.getElementById("messaging");
    self._messagingDiv.style.display = 'flex';

    document.getElementsByClassName('action')[0]
        .addEventListener('click', function (event) {
            self._t1GMApi.publishEvent(self._t1GMApi.publications.AUDIO_ENABLED);
            if (self._t1GMApi.getGameOptions().isLoaded) {
                self._t1GMApi.publishEvent(self._t1GMApi.publications.GAME_IS_READY_TO_PLAY);
            }
        });
    document.getElementsByClassName('action')[1]
        .addEventListener('click', function (event) {
            self._t1GMApi.publishEvent(self._t1GMApi.publications.AUDIO_DISABLED);
            if (self._t1GMApi.getGameOptions().isLoaded) {
                self._t1GMApi.publishEvent(self._t1GMApi.publications.GAME_IS_READY_TO_PLAY);
            }
        });
}

T1IndexPageMgr.prototype._createIndexPageContentDivByTemplate = function() {
    var content = this._readTextFile('./common/lib/index.content.div.template.html');
    // console.log(content);
    // console.log(T1IndexPageMgr.DivTemplate);
    document.write(T1IndexPageMgr.DivTemplate);
}

T1IndexPageMgr.prototype._loadCssFile = function() {
    var cssId = 'TCss';  // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId))
    {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = this._cssFileURL;
        link.media = 'all';
        head.appendChild(link);
    }
}

T1IndexPageMgr.prototype._initStatusBar = function(){
    var self = this;

    // this._statusBarHolder = document.createElement('div');
    // this._statusBarHolder.id = 'statusBarHolder';    
    // this._contentDiv.appendChild(this._statusBarHolder);

    // this._statusBar = document.createElement('div');
    // this._statusBar.id = 'statusBar';
    // this._statusBarHolder.appendChild(this._statusBar);

    // this._statusBarBalance = document.createElement('div');
    // this._statusBarBalance.id = 'statusBar-balance';
    // this._statusBarBalance.class = 'statusBarContainer';
    // this._statusBarHolder.appendChild(this._statusBarBalance);

    self._statusBarBalance = document.getElementById('statusBar-balance');
    self._statusBarCost = document.getElementById('statusBar-cost');
    self._statusBarWin = document.getElementById('statusBar-win');
}

T1IndexPageMgr.prototype._updatePageBalance = function(v) 
{
	var self = this;
    self._statusBarBalance.children[0].innerHTML = t1GMApi.getGameOptions().gameMode == 'FUN' ? 'DEMO BALANCE:':'BALANCE:';
    self._statusBarBalance.children[1].innerHTML = T1Utils.formatMoney(v);
}

T1IndexPageMgr.prototype._updatePageCost = function(v) 
{
	var self = this;
    self._statusBarCost.children[0].innerHTML = 'COST:';
    self._statusBarCost.children[1].innerHTML = T1Utils.formatMoney(v);
}

T1IndexPageMgr.prototype._updatePageWin = function(v) 
{
	var self = this;
    self._statusBarWin.children[0].innerHTML = 'WIN:';
    if (v <= 0) {
        self._statusBarWin.children[1].innerHTML = '';
    } else {
        self._statusBarWin.children[1].innerHTML = T1Utils.formatMoney(v);
    }
}

T1IndexPageMgr.prototype._initPublications = function () {
	var self = this;

	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.GAME_LOADING_START, function() {
		// T1Utils.consoleLog('loading start');
		self._loadingStart()
	});

	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.GAME_LOADING_UPDATING, function(response) {
		self._loadingUpdate(response.data);
		// T1Utils.consoleLog('loading updating ' + response.data);
	});

	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.GAME_LOADING_FINISHED, function() {
		self._loadingFinished();
		// T1Utils.consoleLog('loading finished');
	});

 	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.AUDIO_ENABLED, function() {
		self._onPlayerMadeAudioDecisionAfterGameLoaded();
		// T1Utils.consoleLog('Audio Enabled after Game Loaded');
	});
    
	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.AUDIO_DISABLED, function() {
		self._onPlayerMadeAudioDecisionAfterGameLoaded();
		// T1Utils.consoleLog('Audio Disabled after game loaded');
	});    

	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.PAGE_UPDATE_BALANCE, function(r) {
		self._updatePageBalance(r.data);
		// T1Utils.consoleLog('Audio Disabled after game loaded');
	});    

    this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.PAGE_UPDATE_COST, function(r) {
		self._updatePageCost(r.data);
		// T1Utils.consoleLog('Audio Disabled after game loaded');
	});    

    this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.PAGE_UPDATE_WIN, function(r) {
		self._updatePageWin(r.data);
		// T1Utils.consoleLog('Audio Disabled after game loaded');
	});    

}

T1IndexPageMgr.prototype._loadingStart = function() {
    var self = this;
	self._loaderDiv.style.display = 'flex';
	self._loadingBarDiv.style.width = '0%';
}

T1IndexPageMgr.prototype._loadingUpdate = function(percentInt) {
    var self = this;
	self._loadingBarDiv.style.width = percentInt + '%';
}

T1IndexPageMgr.prototype._loadingFinished = function() {
    var self = this;
	//NOTE: If Player has not decided (Autio option), then the loading bar keep showing on the screen.
    if (self._messagingDiv.style.display == 'none') {
        self._loaderDiv.style.display = 'none';
    }
}

T1IndexPageMgr.prototype._onPlayerMadeAudioDecisionAfterGameLoaded = function() {
    var self = this;

    self._messagingDiv.style.display = 'none';

    if (t1GMApi.getGameOptions().isLoaded) {
        self._loaderDiv.style.display = 'none';
    }
   
}




/*
|--------------------------------------------------------------------------
| Overlay Holder
|--------------------------------------------------------------------------
*/

T1IndexPageMgr.prototype._initOverlayHolder = function(){
    var self = this;

    self._overlayHolder = document.getElementById('overlayHolder');

    self._overlayBtnHome = document.getElementById('overlay-home');
    self._overlayBtnSound = document.getElementById('overlay-sound');
    // self._overlayBtnInfo = document.getElementById('overlay-info');
    self._overlayBtnClose = document.getElementById('overlay-close');

    self._overlayLoadedContent = document.getElementById('loadedContent');
    self._loadHowToPlayContent();

    self._overlayBtnHome.addEventListener('click', function (event) {
        // TODO: Redirect to game lobby when we have server ready.
        location.href = "http://www.tournament1.com";
    });

    self._overlayBtnSound.addEventListener('click', function (event) {
        var audioStatus = self._t1GMApi.getGameOptions().audio;
        if (audioStatus == true) {
            // console.log('page manager : audio will be disabled, audioStatus = ' + audioStatus);
            self._t1GMApi.publishEvent(self._t1GMApi.publications.AUDIO_DISABLED);
            self._disableOverlayBtnSound();
        } else if (audioStatus == false) {
            // console.log('page manager audio will be enabled, audioStatus = ' + audioStatus);
            self._t1GMApi.publishEvent(self._t1GMApi.publications.AUDIO_ENABLED);
            self._enableOverlayBtnSound();
        }
    });


    self._overlayBtnClose.addEventListener('click', function (event) {
        self.hideOverlayHolder();
    });

}

T1IndexPageMgr.prototype.showOverlayHolder = function(){
    this._overlayHolder.className = "active";

    if (this._t1GMApi.getGameOptions().audio == true) {
        this._enableOverlayBtnSound();
    } else {
        this._disableOverlayBtnSound();
    }

}

T1IndexPageMgr.prototype.hideOverlayHolder = function(){
    this._overlayHolder.className = "inactive";
}

T1IndexPageMgr.prototype._enableOverlayBtnSound = function(){
    var self = this;
    self._overlayBtnSound.className = "button active";
}

T1IndexPageMgr.prototype._disableOverlayBtnSound = function(){
    var self = this;
    self._overlayBtnSound.className = "button inactive";
}

T1IndexPageMgr.prototype._loadHowToPlayContent = function() {
    // TODO: We current use local text files to show the 'how to play' help page,
    //       We do need to get the text content from the serer in the future.

    var infoContent = this._readTextFile('./res/help.txt');
    this._overlayLoadedContent.innerHTML = infoContent;
}


T1IndexPageMgr.prototype._readTextFile = function(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                // alert(allText);
            }
        }
    }
   
    rawFile.send(null);

    return rawFile.responseText;
}



/*
|--------------------------------------------------------------------------
| Full Screen Prompt Holder and Roatation Screen Prompt
|--------------------------------------------------------------------------
*/
T1IndexPageMgr.prototype._initScreenPrompt = function() {
    var self = this;

    this._fullScreenPrompt = document.getElementById('fullscreenPrompt');
    this._rotateScreenPrompt = document.getElementById('rotatePrompt');

    // this._showRotateScreenPrompt();

    var isMobile = (self._t1GMApi.getGameOptions().channel == 'mobile') ? true : false;
    // var isMobile = false;

    if (isMobile) {
        // this._showFullScreenPrompt();
        // this._hideRotateScreenPrompt();
        this._setupListenerForMobile();
        this._fullScreenPrompt.addEventListener('click', function (event) {
            // TODO:
        });
    } else {
        this._hideFullScreenPrompt();
    }
}


T1IndexPageMgr.prototype._setupListenerForMobile = function() {
    var self = this;

    var body = document.body;
    // self._fullScreenPrompt.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
    body.style.height = '110vh';

    // var body = document.body;
    // body.style.height = 1000 + 'px';

    var touchStartY = 0;
    var touchCurrY = 0;
    var touchEndY = 0;

    this._fullScreenPrompt.ontouchstart = function(e) {
        console.log('touch start');
        touchStartY = e.touches[0].clientY;
    }

    this._fullScreenPrompt.ontouchmove = function(e) {
        console.log('touch moving');
        // var x = e.touches[0].clientX;
        touchCurrY = e.touches[0].clientY;
        body.style.position = 'absolute';
        var top = (touchStartY - touchEndY);
        body.style.top = top + 'px';
        window.scrollTo(0,top);
        // console.log('x,y(%i, %i), top(%i), offsetHeight(%i))', x, y,_fullScreenPrompt.style.top, _fullScreenPrompt.offsetHeight);
    }

    this._fullScreenPrompt.ontouchend = function(e) {
        console.log('touch end');
    }

    setInterval(function(){
        // console.log('aaaaaaaaa');
        // var check = ((self._fullScreenPrompt.height == window.innerHeight));
        var innerHeight = window.innerHeight;
        var innerWidth = window.innerWidth;
        var outterHeight = window.screen.height;
        var outterWidth = window.screen.width;
        // var outterHeight = 829;
        // console.log('innerHeight(%i), outterHeight(%i), outterWidth(%i)', innerHeight, outterHeight, outterWidth);

        if (innerHeight > innerWidth) { // Portrait
            self._hideRotateScreenPrompt();
            // NOTE: For iphone 11
            var check = (innerHeight >= (outterHeight - (outterHeight * 0.1) - 30));
            // alert(innerHeight + ', ' + outterHeight);
            if (check) {
                // self._fullScreenPrompt.className = 'hide';
                // _fullScreenPrompt.className = '';
                self._hideFullScreenPrompt();
            } else {
                // self._fullScreenPrompt.className = '';
                self._showFullScreenPrompt();
                // alert(innerHeight + ', ' + outterHeight);
                // _fullScreenPrompt.className = 'hide';
            }
        } else { // Landscape
            self._showRotateScreenPrompt();
            self._hideFullScreenPrompt();
        }



    },10);
}

T1IndexPageMgr.prototype._showFullScreenPrompt = function() {
    this._fullScreenPrompt.className = '';
    // this._fullScreenPrompt.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
}

T1IndexPageMgr.prototype._hideFullScreenPrompt = function() {
    this._fullScreenPrompt.className = 'hide';
}

T1IndexPageMgr.prototype._showRotateScreenPrompt = function() {
    this._rotateScreenPrompt.className = '';
    // this._fullScreenPrompt.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
}

T1IndexPageMgr.prototype._hideRotateScreenPrompt = function() {
    this._rotateScreenPrompt.className = 'hide';
}



T1IndexPageMgr.prototype.updateWindowName = function(n) {
    document.title = n;
}


T1IndexPageMgr.prototype._toggleFullScreen = function() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

T1IndexPageMgr.DivTemplate = '<div id="content"> \
    <div id="game"></div> \
\
    <div id="statusBarHolder"> \
        <div id="statusBar"> \
            <div id="statusBar-balance" class="statusBarContainer"> \
                <span class="statusBar-title">DEMO BALANCE:</span> \
                <span class="statusBar-value">$1,000</span> \
            </div><div id="statusBar-cost" class="statusBarContainer"> \
                <span class="statusBar-title">COST:</span> \
                <span class="statusBar-value">$1</span> \
            </div><div id="statusBar-win" class="statusBarContainer"> \
                <span class="statusBar-title">WIN:</span> \
                <span class="statusBar-value"></span> \
            </div> \
        </div> \
    </div> \
\
    <div id="loader" style="display: none;"> \
        <div id="deploymentVersion"><span></span></div> \
        <div id="loader-header" class="show"></div> \
        <div id="logo"> \
            <img id="logoImg" src="./common/img/logo.png"> \
        </div> \
        <div id="loadingBarHolder"> \
            <div class="meter"> \
                <span id="loadingBarMeter" style="width: 0%;"></span> \
            </div> \
        </div> \
        <div id="disclaimer"> \
            <img id="disclaimerImg" src="./common/img/legal.png"> \
        </div> \
    </div> \
\
    <div id="rotatePrompt" class="hide"> \
        <img src="./common/img/rotatePortrait.gif"> \
    </div> \
\
    <div id="fullscreenPrompt" class="hide"> \
        <img src="./common/img/tap.gif"> \
    </div> \
\
    <div id="messaging" class="show" style="display: none;">  \
        <div id="messageBox">  \
            <div id="messageDetails"> \
                <div id="messageHeader">Sounds</div> \
                <div id="messageDescription">Do you want to enable sounds?</div> \
            </div> \
            <div id="messageActions"> \
                <a class="action" data-action="acceptSounds">YES</a> \
                <a class="action" data-action="declineSounds">NO</a></div> \
            <div id="errorCode"></div> \
        </div> \
    </div> \
\
    <div id="overlayHolder" class="inactive"> \
        <div id="infoOverlay" class=""> \
            <div id="overlaySpacer"></div> \
            <div id="overlayControls"> \
                <div id="overlayControlsWrapper" class="controlsWrapper"> \
                    <div id="overlay-home" class="button inactive"></div> \
                    <div id="overlay-sound" class="button inactive"></div> \
                    <!-- <div id="overlay-info" class="button inactive"></div> --> \
                    <div id="overlay-close" class="button inactive"></div> \
                </div> \
            </div> \
            <div id="overlayContent" class="scrollable"> \
                <div id="loadedContent"> \
                \
                </div> \
            </div> \
            <div id="overlayFooter"></div> \
        </div> \
    </div>  \
</div> \
 \
<button title="HOOK DIV" style="width: 1px; height: 1px; position: absolute; top: -1000px; left: -1000px; z-index: 2; background-color: rgb(255, 0, 0);"></button>';
'use strict';

var T1GMApi = function() {
	var self = this;

	this._pageMgr = new T1IndexPageMgr(self);

	this._pubSub = new T1PubSub();

	this.publications = {
		PAGE_UPDATE_BALANCE							:"pageUpdateBalance",
		PAGE_UPDATE_COST							:"pageUpdateCost",
		PAGE_UPDATE_WIN								:"pageUpdateWin",

		GAME_LOADING_START							: "gameLoadingStart",
		GAME_LOADING_UPDATING						: "gameLoadingUpdating",
		GAME_LOADING_FINISHED						: "gameLoadingFinished",

		GAME_IS_READY_TO_PLAY						: "gameIsReadyToPlay", // When game main content is available to the player at the first time.(after loading and select audio option on page)

		AUDIO_ENABLED								: "audioEnabledAfterGameLoaded",
		AUDIO_DISABLED								: "audioDisabledAfterGameLoaded",

		WINDOW_SET_TITLE 							: "windowSetTitle"
	}; // End of publications

	this._initPublications();

	// Define game options
	this._gameOptions = {
		isLoaded				: false,
		initialized 			: false,
		siteId					: "",
		serverAddress			: "",
		apiAddress				: "",
		casinoKey 				: "",
		gameId 					: "",
		gameMode 				: "FUN", // FUN or REAL
		gameURL		 			: "",
		channel 				: "",// Desktop or Mobile
		currency 				: "",
		language 				: "",
		locale 					: "",
		userLocale 				: "",
		userId 					: "",
		lobbyURL 				: "",
		lobbyTarget 			: "",
		lobbyActive 			: false,
		token 					: "",
		groupingSeparator 		: "",
		decimalSeparator 		: "",
		audio 					: null, // current system needs player to decide enable audio or not before see the game content.
		music 					: true, 
		sfx 					: true,
		optionsPanelStatus 		: false,
		aboutGameStatus 		: false,
		payTableStatus 			: false,
		preloadProgress 		: 0,
		preloadUpdatedTime 		: 0,
		windowName 				: "",
		luid 					: "",
		gameVersion 			: "",
		isRGS 					: false,
		customPreloader 		: false,
		gameRulesURL 			: "",
		historyURL 				: "",
		emulatorMode			: false
	};


	// Define Game States
	this._gameStates = {
		INITIALIZE 							: "gameStatesInitialize",
		IDLE 								: "gameStatesIdle",
		OPEN_PLAY 							: "gameStatesOpenPlay",
		SETTLE_PLAY							: "gameStatesSettlePlay",
		CLOSE_PLAY 							: "gameStatesClosePlay"
	};

	// Define Currency Data
	this._gameCurrencyData = {
		prefix 			: "$",
		prefixSeparator : "",
		suffixSeparator : "",
		suffix 			: "",
		groupingSeparator 		: ",",
		decimalSeparator 		: ".",
		decimalPlace 			: "2",
		currencyId  			: ""
	};

	this.currency

} // End of T1GMApi


T1GMApi.prototype._initPublications = function(){
	var self = this;

	this.subscribeToEvent(self.publications.GAME_LOADING_FINISHED, function() {
		self.setGameOptions('isLoaded', true);
		if(self.getGameOptions()['audio'] != null) { // After Player selected the Audio option
			self.publishEvent(self.publications.GAME_IS_READY_TO_PLAY);
		}
	});

	this.subscribeToEvent(self.publications.AUDIO_ENABLED, function() {
		self.setGameOptions('audio', true);
		// T1Utils.consoleLog('t1GMApi: set game audio : ' + self.getGameOptions().audio);
        // self.publishEvent(self.publications.AUDIO_ENABLED);
	});

	this.subscribeToEvent(self.publications.AUDIO_DISABLED, function() {
		self.setGameOptions('audio', false);
		// T1Utils.consoleLog('t1GMApi: set game audio : ' + self.getGameOptions().audio);
        // self.publishEvent(self.publications.AUDIO_DISABLED);
	});
}

T1GMApi.prototype.init = function(){
	var self = this;

	self.getGameOptionsFromQS();

	self._pageMgr.init();
}


// Setter
T1GMApi.prototype.getGameOptions = function () 
{
	var self = this;
	return self._gameOptions;
}
// Getter
T1GMApi.prototype.setGameOptions = function (k, v) 
{
	var self = this;
	self._gameOptions[k] = v;
}
// Getter
T1GMApi.prototype.getGameStates = function () 
{
	var self = this;
	return self._gameStates;
}
// setter
T1GMApi.prototype.setGameStates = function (k, v) 
{
	var self = this;
	self._gameStates[k] = v;
}
// Getter
T1GMApi.prototype.getGameCurrencyData = function () 
{
	var self = this;
	return self._gameCurrencyData;
}
// Setter
T1GMApi.prototype.setGameCurrencyData = function (k, v) 
{
	var self = this;
	self._gameCurrencyData[k] = v;
}


T1GMApi.prototype.showHelpScreen = function () 
{
	var self = this;
	self._pageMgr.showOverlayHolder();
}


/********************************************************************************
 * 							Index Page Elements Control
 ********************************************************************************/
// Update page balance/cost/win
T1GMApi.prototype.updatePageBalance = function(v) {
	var self = this;
	self.publishEvent(self.publications.PAGE_UPDATE_BALANCE, v);
}

T1GMApi.prototype.updatePageCost = function(v) {
	var self = this;
	self.publishEvent(self.publications.PAGE_UPDATE_COST, v);
}

T1GMApi.prototype.updatePageWin = function(v) {
	var self = this;
	self.publishEvent(self.publications.PAGE_UPDATE_WIN, v);
}

T1GMApi.prototype.updateWindowName = function(n) {
	this.setGameOptions('windowName', n);
	this._pageMgr.updateWindowName(n);
}



/********************************************************************************
 * 							Tools
 ********************************************************************************/
T1GMApi.prototype.enableT1GMApiConsoleLog = function() {
	T1Utils.enableConsoleLog();
}


// Get all game options from Querystring(Get Data)
T1GMApi.prototype.getGameOptionsFromQS = function(){
	var self = this;
	self.queryString = document.location.search || document.location.hash;
	self.setGameOptions('serverAddress', decodeURIComponent(T1Utils.getQueryParamValue("serverAddress")));
	self.setGameOptions('channel', decodeURIComponent(T1Utils.getQueryParamValue("channel")));
	if (self._gameOptions.channel == "") {
		self._gameOptions.channel = T1Utils.isMobile() ? 'mobile' : 'desktop';
	}

	// T1Utils.consoleLog('serverAddress is ' + self.getGameOptions().serverAddress);
	// T1Utils.consoleLog('channel is ' + self.getGameOptions().channel);
}












































/***********************************************************************************/
// 								Pub Event Service
/***********************************************************************************/

// Publishes an event (uses the pubSub class)
T1GMApi.prototype.publishEvent = function(eventName, data){
	if (data != undefined){
		return this._pubSub.publish(eventName, data);
	}else{
		return this._pubSub.publish(eventName);
	}
};

// Subscribe to an event (uses the pubSub class)
T1GMApi.prototype.subscribeToEvent = function(eventName, callback){
	return this._pubSub.subscribe(eventName, callback);
};

// Unsubscribe to an event (uses the pubSub class)
T1GMApi.prototype.unsubscribeFromEvent = function(eventId){
	return this._pubSub.unsubscribe(eventId);
};




/***********************************************************************************/
// 								Everything Starts Here
/***********************************************************************************/

var t1GMApi = new T1GMApi();
T1Utils.enableConsoleLog();
// T1Utils.consoleLog('T1GMApi is loaded.');
t1GMApi.init();

