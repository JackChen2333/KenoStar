
"use strict";

function Tmp(mainGame)
{
	this._mainGame = mainGame;
	
    this._container = null;

    this._bg = null;

    this._ctor();
}


/***********************************************************************************/
// 						       Public Methods
/***********************************************************************************/






/***********************************************************************************/
// 								Public Callbacks
/***********************************************************************************/








/***********************************************************************************/
// 						       Private Methods
/***********************************************************************************/





/***********************************************************************************/
// 				        Private Event Listeners / Handlers
/***********************************************************************************/


Tmp.prototype._onClick = function(e)
{
    var self = this;
    // xqu.log("click bg on Splash Screen");
    xqu.audio.playEffect('Snd_Play_Button');
    self._mainGame.callbackGoToInGameScene();
};





/***********************************************************************************/
// 								Common APIs
/***********************************************************************************/


Tmp.prototype.getTransform = function()
{
    return this._container;
};



Tmp.prototype.show = function()
{
    this._container.visible = true;
};

Tmp.prototype.hide = function()
{
    this._container.visible = false;
};




/***********************************************************************************/
// 								Initilization
/***********************************************************************************/


// NOTE: Positioning purpose.
Tmp.prototype._MakeAnEmptyTexture = function()
{
    var emptyRect = new PIXI.Sprite(PIXI.Texture.EMPTY);
	emptyRect.width = xqu.config.GAME_DESIGN_SIZE_WIDTH;
	emptyRect.height = xqu.config.GAME_DESIGN_SIZE_HEIGHT;
	emptyRect.position.x = emptyRect.position.y = 0;
    emptyRect.alpha = 0.001;
    this._container.addChild(emptyRect);
}

Tmp.prototype._ctor = function()
{
    var self = this;

    this._container = new PIXI.Container();

    this._MakeAnEmptyTexture()

    this._createBg();

    ApiConnector.UpdateBalance(GameBank.GetBalance());
};

Tmp.prototype._createBg = function()
{
    var self = this;

	// Bg
    /** Get texture from texture cache **/
    if (xqu.config.IsMobile()) {
        this._bg = new Sprite(TextureCache['bg_test.png']);
        // this._bg.scale.x = this._bg.scale.y = 2;
    } else {
        this._bg = new Sprite(TextureCache['bg_test.png']);
        this._bg.scale.x = this._bg.scale.y = 1.5;
    }

    this._bg.anchor.set(0.5);
    this._bg.position.x = xqu.config.SCREEN_CENTER_X;
    this._bg.position.y = xqu.config.SCREEN_CENTER_Y;

    this._bg.interactive = true;
    this._bg.buttonMode = true;

    
    this._bg.on('click', self._onClick.bind(self));
    this._bg.on('tap', self._onClick.bind(self));
    this._bg.on('pointerdown', self._onClick.bind(self));

    this._container.addChild(this._bg);
}
