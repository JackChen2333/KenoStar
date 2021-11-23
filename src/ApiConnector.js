
"use strict"

var ApiConnector = ApiConnector || {};

/***********************************************************************************/
// 								Initialization
/***********************************************************************************/

ApiConnector.isApiLoaded = function() {
    if (t1GMApi != 'undefined') {
        return true;
    } else {
        return false;
    }
}

/***********************************************************************************/
// 								Utils
/***********************************************************************************/

ApiConnector.enableApiConsoleLogger = function() {
    t1GMApi.enableT1GMApiConsoleLog();
}

ApiConnector.IsMobile = function() {
    return (t1GMApi.getGameOptions().channel == 'mobile') ? true : false;
}


/***********************************************************************************/
// 								Loading
/***********************************************************************************/
ApiConnector.LoadingStart = function() {
    t1GMApi.publishEvent(t1GMApi.publications.GAME_LOADING_START);
}

ApiConnector.LoadingUpdate = function(percentInteger) {
    t1GMApi.publishEvent(t1GMApi.publications.GAME_LOADING_UPDATING, percentInteger);
}

ApiConnector.LoadingFinished = function() {
    t1GMApi.publishEvent(t1GMApi.publications.GAME_LOADING_FINISHED);
}

/***********************************************************************************/
// 				        Index Page Elements
/***********************************************************************************/
ApiConnector.updateWindowName = function(n) {
    t1GMApi.updateWindowName(n);
}


/***********************************************************************************/
// 				        Status Bar Operation
/***********************************************************************************/

ApiConnector.UpdateBalance = function(v) {
    t1GMApi.updatePageBalance(v / 100);
}

ApiConnector.UpdateWager = function(v) {
    t1GMApi.updatePageCost(v / 100);
}

ApiConnector.UpdateWin = function(v) {
    t1GMApi.updatePageWin(v / 100);
}


/***********************************************************************************/
// 				        Overlay/Help Screen Operation
/***********************************************************************************/
ApiConnector.ShowHelpScreen = function() {
    t1GMApi.showHelpScreen();
}



/***********************************************************************************/
// 				                Game Play
/***********************************************************************************/
ApiConnector.OpenPlay = function(todo) {
    // TODO:
}

ApiConnector.PlaceBet = function(todo) {
    // TODO:
}

ApiConnector.GetBetResult = function(todo) {
    // TODO:
}

ApiConnector.SettlePlay = function(todo) {
    // TODO:
}

ApiConnector.ClosePlay = function(todo) {
    // TODO:
}

// Option
ApiConnector.SaveData = function(todo) {
    // TODO:
}















// ApiConnector.EVENTS = ApiConnector.EVENTS || {};
// ApiConnector.EVENTS.EVENT_GAME_SHOWING_FIRST_TIME = 'ApiConnector.Events.EVENT_GAME_SHOWING_FIRST_TIME';
// ApiConnector.EVENTS.EVENT_GAME_AUDIO_ENABLED = 'ApiConnector.EVENTS.EVENT_GAME_AUDIO_ENABLED';
// ApiConnector.EVENTS.EVENT_GAME_AUDIO_DISABLED = 'ApiConnector.EVENTS.EVENT_GAME_AUDIO_DISABLED';

// ApiConnector.Listeners = ApiConnector.Listeners || {};



