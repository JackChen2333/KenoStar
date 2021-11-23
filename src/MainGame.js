
"use strict";

function MainGame()
{
    this._container = new PIXI.Container();

    this._splashScene = null;
	this._inGameScene = null;

	ApiConnector.updateWindowName('Your Game Name');
	
    this._ctor();
}


MainGame.prototype._createTestSpot = function() {
	if (!xqu.config.DEBUG_MODE) return;

	// TODO: Remove the testSpot when shipping
	var testSpotTopLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
	testSpotTopLeft.width = 20;
	testSpotTopLeft.height = 20;
	this._container.addChild(testSpotTopLeft);

	var testSpotTopRight = new PIXI.Sprite(PIXI.Texture.WHITE);
	testSpotTopRight.width = 20;
	testSpotTopRight.height = 20;
	testSpotTopRight.position.x = xqu.config.GAME_DESIGN_SIZE_WIDTH - testSpotTopRight.width;
	this._container.addChild(testSpotTopRight);

	var testSpotBottomLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
	testSpotBottomLeft.width = 20;
	testSpotBottomLeft.height = 20;
	testSpotBottomLeft.position.y = xqu.config.GAME_DESIGN_SIZE_HEIGHT - testSpotBottomLeft.height;
	this._container.addChild(testSpotBottomLeft);	

	var testSpotBottomRight = new PIXI.Sprite(PIXI.Texture.WHITE);
	testSpotBottomRight.width = 20;
	testSpotBottomRight.height = 20;
	testSpotBottomRight.position.x = xqu.config.GAME_DESIGN_SIZE_WIDTH - testSpotTopRight.width;
	testSpotBottomRight.position.y = xqu.config.GAME_DESIGN_SIZE_HEIGHT - testSpotTopRight.height;
	this._container.addChild(testSpotBottomRight);	
}


MainGame.prototype.name = "MainGame";


MainGame.prototype._ctor = function()
{
    var self = this;
};


MainGame.prototype.init = function()
{
	var self = this;

	xqu.sys.setAutoFullScreen(true);
	this._setupCustmizations();

	this._splashScene = new SplashScene(this);
	this._container.addChild(this._splashScene.getTransform());
	this._splashScene.show();

	this._inGameScene = new InGameScene(this);
	this._container.addChild(this._inGameScene.getTransform());
	this._inGameScene.hide();

	this._createTestSpot();

	// xqu.log('MainGame: Start Playing Music');
	// xqu.audio.playMusic('Snd_Bg');
};


MainGame.prototype.getTransform = function()
{
    return this._container;
};


MainGame.prototype.callbackGoToInGameScene = function() {
	this._splashScene.hide();	
	this._inGameScene.show();
};


MainGame.prototype.requestPlayGame = function()
{

};


MainGame.prototype.requestFinishGame = function()
{

};


MainGame.prototype.prepareNewGame = function()
{

};


MainGame.prototype.updateBankStandalone = function(winAmount, wagerAmount)
{

};







// NOTE: Pur your own codes here.
MainGame.prototype._setupCustmizations = function() {
    this._setupPublicationsForT1GMApi();
};


MainGame.prototype._setupPublicationsForT1GMApi = function() {
	//NOTE: This is where/when the player see the game content first time.
	t1GMApi.subscribeToEvent(t1GMApi.publications.GAME_IS_READY_TO_PLAY, function() {
		xqu.audio.mute = !t1GMApi.getGameOptions()['audio'];
		if (!xqu.audio.mute) {
			xqu.audio.playMusic('Snd_Bg');
			xqu.log('xqu.audio: play bg music');
		}
	});


	t1GMApi.subscribeToEvent(t1GMApi.publications.AUDIO_ENABLED, function() {
		xqu.audio.mute = false;
		xqu.audio.turnOnSound();
		xqu.audio.playMusic('Snd_Bg');
	});


	t1GMApi.subscribeToEvent(t1GMApi.publications.AUDIO_DISABLED, function() {
		xqu.audio.mute = true;
		xqu.audio.turnOffSound();
	});
};