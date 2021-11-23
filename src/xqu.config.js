"use strict";

var xqu = xqu || {};
xqu.config = {};

xqu.config._DEVICE_DESKTOP = 'device_desktop';
xqu.config._DEVICE_MOIBLE = 'device_moible';
xqu.config._RESOLUTION_POLICY_LANDSCAPE = 'landscape';
xqu.config._RESOLUTION_POLICY_PORTAIT = 'portait';
xqu.config._GAME_MODE_STANDALONE = "game_mode_standalone";
xqu.config._GAME_MODE_SERVER_MODE = "game_mode_server";
xqu.config._GAME_MODE_SERVER_SIMULATOR_MODE = "game_mode_server_simulator";
xqu.config._GAME_DESIGN_SIZE_DESKTOP = {x:2048, y:1365};
xqu.config._GAME_DESIGN_SIZE_MOBILE =  {x:1080, y:1920};

xqu.config.GAME_DESIGN_SIZE_WIDTH = 0; // 2048
xqu.config.GAME_DESIGN_SIZE_HEIGHT = 0; // 1280

xqu.config.SCREEN_CENTER_X = 0;
xqu.config.SCREEN_CENTER_Y = 0;

xqu.config.DEBUG_MODE = false;
xqu.config.DEBUG_MODE = true; // Comment this when shipping

// xqu.config.GAME_MODE = xqu.config._GAME_MODE_STANDALONE;
// xqu.config.GAME_MODE = xqu.config._GAME_MODE_SERVER_MODE;
xqu.config.GAME_MODE = xqu.config._GAME_MODE_SERVER_SIMULATOR_MODE;




// NOTE: Below config will be updated if game is running on Server/ServerSim mode.
xqu.config.RUNNING_DEVICE = xqu.config._DEVICE_DESKTOP; // default
// xqu.config.RUNNING_DEVICE = xqu.config._DEVICE_MOIBLE;


xqu.config.InitializeGameConfig = function() {
    if (xqu.config.RUNNING_DEVICE == xqu.config._DEVICE_DESKTOP) {
        xqu.config.RESOLUTION_POLICY = xqu.config._RESOLUTION_POLICY_LANDSCAPE;
        xqu.config.GAME_DESIGN_SIZE_WIDTH = xqu.config._GAME_DESIGN_SIZE_DESKTOP.x;
        xqu.config.GAME_DESIGN_SIZE_HEIGHT = xqu.config._GAME_DESIGN_SIZE_DESKTOP.y;
    } else {
        xqu.config.RESOLUTION_POLICY = xqu.config._RESOLUTION_POLICY_PORTAIT;
        xqu.config.GAME_DESIGN_SIZE_WIDTH = xqu.config._GAME_DESIGN_SIZE_MOBILE.x;
        xqu.config.GAME_DESIGN_SIZE_HEIGHT = xqu.config._GAME_DESIGN_SIZE_MOBILE.y;
    }
    xqu.config.SCREEN_CENTER_X = xqu.config.GAME_DESIGN_SIZE_WIDTH / 2;
    xqu.config.SCREEN_CENTER_Y = xqu.config.GAME_DESIGN_SIZE_HEIGHT / 2;
}

xqu.config.IsMobile = function() {
    if ((xqu.config.GAME_MODE == xqu.config._GAME_MODE_SERVER_MODE) || (xqu.config.GAME_MODE == xqu.config._GAME_MODE_SERVER_SIMULATOR_MODE)) {
        return ApiConnector.IsMobile();
    } else {
        return (xqu.config.RUNNING_DEVICE == xqu.config._DEVICE_MOIBLE);
    }
}




