
"use strict";

/** Global Alias **/
var Application = PIXI.Application;
var Loader = PIXI.Loader.shared;
var Resources = PIXI.LoaderResources;
var TextureCache = PIXI.utils.TextureCache;
var AnimatedSprite = PIXI.AnimatedSprite;
var Sprite = PIXI.Sprite;
var AnimatedSprite = PIXI.AnimatedSprite;
var BitmapText = PIXI.BitmapText;
var Rectangle = PIXI.Rectangle;
var Point = PIXI.Point;

var App;
var Stage;
var Renderer;

/** Decide current render mode **/
// var RENDER_BG_COLOR = '0xFF0000'; // 0x061639
var RENDER_TYPE_WEBGL = "WebGL";
var RENDER_TYPE_CANVAS = "canvas";
var renderType = RENDER_TYPE_WEBGL;
if (!PIXI.utils.isWebGLSupported()) {
    renderType = RENDER_TYPE_CANVAS;
}

if (xqu.config.DEBUG_MODE) {
    PIXI.utils.sayHello(renderType);
} else {
    PIXI.utils.skipHello();
}

var T1Game = function() {
    var o = {};

    o._loaderLayer = null;
    o._mainGameLayer = null;

    o._loader = null;
    o._mainGame = null;

    o._gameDiv = null;
    o._gameCanvas = null;

    o._preWindowSizeW = 0;
    o._preWindowSizeH = 0;

    // NOTE: After T1GMApi is fully loaded and initialized, then start the game.
    o.start = function() {
        var self = this;

        if ((xqu.config.GAME_MODE == xqu.config._GAME_MODE_SERVER_MODE) || (xqu.config.GAME_MODE == xqu.config._GAME_MODE_SERVER_SIMULATOR_MODE)) {
            if (ApiConnector.isApiLoaded()) {
                if (xqu.config.DEBUG_MODE) {
                    ApiConnector.enableApiConsoleLogger();
                }
                o._prepareGameConfigWithServer();
                o._init();
                o._loadAssets();
            } else {
                setTimeout(function(){ self.start() }, 2000);
            }
        } else if (xqu.config.GAME_MODE == xqu.config._GAME_MODE_SERVER_MODE ) {
            o._prepareGameConfig();
            o._init();
            o._loadAssets(); 
        }
    };


    o._init = function() {
        // Ref : http://pixijs.download/release/docs/PIXI.Application.html
        App = new Application({
            width: xqu.config.GAME_DESIGN_SIZE_WIDTH, 
            height: xqu.config.GAME_DESIGN_SIZE_HEIGHT,
            // antialias: true, // default: false
            // transparent: false, // default: false
            backgroundColor:0x000000,
            autoDensity:true,
            // roundPixels:true,
            autoResize: true,
            // view.style.transform:scale3d(1,1,1),
            // resolution: o._resulution // default: 1 //window.devicePixelRatio,
            resolution: window.devicePixelRatio // default: 1 //window.devicePixelRatio,
        });

        // Get canvas 
        Renderer = App.renderer; 
        // Get root container of all the display object in the Renderer.
        Stage = App.stage;
        Stage.pivot.set(xqu.config.GAME_DESIGN_SIZE_WIDTH / 2, xqu.config.GAME_DESIGN_SIZE_HEIGHT / 2);


        // Use the native window resolution as the default resolution
        // will support high-density displays when rendering
        // PIXI.settings.RESOLUTION = window.devicePixelRatio;

        // Disable interpolation when scaling, will make texture be pixelated
        // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        // All elements
        o._gameDiv = document.getElementById("game");
        o._gameDiv.appendChild(App.view);
        o._gameCanvas = o._gameDiv.childNodes[0];

        // Create Layers
        o._loaderLayer = new PIXI.Container();
        o._mainGameLayer = new PIXI.Container();
        o._mainGameLayer.name = "MainGameLayer";
        o._mainGameLayer.visible = false;
        Stage.addChild(o._mainGameLayer);
        Stage.addChild(o._loaderLayer);

        // Create Loader
        o._loader = new xqu.Loader();
        o._loader.addEventListener(xqu.Loader.EVENT_FINISHED,
            new xqu.Callback(o._onLoadFinished, o));
        o._loaderLayer.addChild(o._loader.getTransform());

        // Create Main Game Instance
        o._mainGame = new MainGame();
        o._mainGameLayer.addChild(o._mainGame.getTransform());

        o._setupRenderer();
        // o._setupResizeWithGameDiv();     
    };


    o._setupRenderer = function() {
        // Renderer.view.style.transform = "scale3d(1,1,1)";

        o._resizeRendererAndStage();
        xqu.listener.addEventListener(xqu.listener.EVENT_WINDOW_RESIZE,
            new xqu.Callback(o._resizeRendererAndStage, o));
    };


    o._resizeRendererAndStage = function() {
        // ************ Resize Renderer(Which is canvas) ***************** //
        var statusBarHeight = document.getElementById("statusBarHolder").clientHeight;
        // NOTE: W and H are the width and height of the renderer(which will be the size of canvas)
        // NOTE: Using clientWidth and clientHeight here because there is a outter game div outsite, we adjust the size based on that.
        var W = o._gameDiv.clientWidth;
        var H = o._gameDiv.clientHeight - statusBarHeight;        

        if ((W == o._preWindowSizeW) && (H == o._preWindowSizeH)) {
            return;
        } else {
            o._preWindowSizeW = W;
            o._preWindowSizeH = H;
        }

        Renderer.resize(W, H);

        // ************ Resize Stage(Which is the game body) ***************** //
        var scaleToFitX, scaleToFitY, optimalRatio, gameWidthOpt, gameHeightOpt, rendererW, rendererH;
        var optimalRatioAdjuster = 1;

        var rendererW = W;
        var rendererH = H;

        scaleToFitX = (rendererW / xqu.config.GAME_DESIGN_SIZE_WIDTH);
        scaleToFitY = (rendererH / xqu.config.GAME_DESIGN_SIZE_HEIGHT);
        optimalRatio = Math.min(scaleToFitX, scaleToFitY) * optimalRatioAdjuster;
        Stage.scale.set(optimalRatio);
        Stage.position.set(rendererW / 2, rendererH / 2);
    };


    // o._rotateStage = function(deg) {
    //     Stage.rotation = deg * Math.PI / 180;
    // };

    // o._rotateGameDiv = function(deg) {
    //     o._gameDiv.style.webkitTransform = 'rotate(' + deg + 'deg)';
    //     o._gameDiv.style.mozTransform = 'rotate(' + deg + 'deg)';
    //     o._gameDiv.style.msTransform = 'rotate(' + deg + 'deg)';
    //     o._gameDiv.style.oTransform = 'rotate(' + deg + 'deg)';
    //     o._gameDiv.style.transform = 'rotate(' + deg + 'deg)';
    // };

    // o._rotateGameCanvas = function(deg) {
    //     o._gameCanvas.style.webkitTransform = 'rotate(' + deg + 'deg)';
    //     o._gameCanvas.style.mozTransform = 'rotate(' + deg + 'deg)';
    //     o._gameCanvas.style.msTransform = 'rotate(' + deg + 'deg)';
    //     o._gameCanvas.style.oTransform = 'rotate(' + deg + 'deg)';
    //     o._gameCanvas.style.transform = 'rotate(' + deg + 'deg)';
    // };

    o._loadAssets = function() {
        o._loader.preload(g_resources);
    };

    o._onLoadFinished = function() {
        Stage.removeChild(o._loaderLayer);
        o._mainGame.init(); 
        o._mainGameLayer.visible = true;
    };

    o._prepareGameConfigWithServer = function() {
        if (ApiConnector.IsMobile()) {
            xqu.config.RUNNING_DEVICE = xqu.config._DEVICE_MOIBLE;
            
        } else {
            xqu.config.RUNNING_DEVICE = xqu.config._DEVICE_DESKTOP;
        }

        xqu.config.InitializeGameConfig();
    }

    o._prepareGameConfig = function() {
        xqu.config.InitializeGameConfig();
    }

    return o;
};

