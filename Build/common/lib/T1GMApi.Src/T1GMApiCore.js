
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

