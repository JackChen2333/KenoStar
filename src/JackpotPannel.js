// Please put a empty line here always.
"use strict";

function JackpotPannel(inGame) {
    this._container = new PIXI.Container();

    this._ingame = inGame;

    this._bg = null;
    this._title = null;

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










/***********************************************************************************/
// 								Common APIs
/***********************************************************************************/

JackpotPannel.prototype.getTransform = function()
{
    return this._container;
};

JackpotPannel.prototype.show = function()
{
    this._container.visible = true;
};

JackpotPannel.prototype.hide = function()
{
    this._container.visible = false;
};



/***********************************************************************************/
// 								Initilization
/***********************************************************************************/

JackpotPannel.prototype._ctor = function() {
    this._createBg();
    this._createTitle();
}


JackpotPannel.prototype._createBg = function() {
	// Bg
    /** Get texture from texture cache **/
    this._bg = new Sprite(TextureCache['pannel_bg.png']);

    if (xqu.config.IsMobile()) {
        // TODO:
    }

    this._container.addChild(this._bg);
}

JackpotPannel.prototype._createTitle = function() {
    this._title = new Sprite(TextureCache['jackpot_title.png']);

    this._title.x = (this._bg.width - this._title.width) / 2;

    if (xqu.config.IsMobile()) {
        // TODO:
    }    

    this._container.addChild(this._title);
}
