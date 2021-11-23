// Please put a empty line here always.
"use strict";

function PayoutPannel(inGame) {
    this._container = new PIXI.Container();

    this._ingame = inGame;

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










/***********************************************************************************/
// 								Common APIs
/***********************************************************************************/

PayoutPannel.prototype.getTransform = function()
{
    return this._container;
};

PayoutPannel.prototype.show = function()
{
    this._container.visible = true;
};

PayoutPannel.prototype.hide = function()
{
    this._container.visible = false;
};



/***********************************************************************************/
// 								Initilization
/***********************************************************************************/

PayoutPannel.prototype._ctor = function() {
    this._createBg();
    this._createTitle();
};


PayoutPannel.prototype._createBg = function() {
    this._bg = new Sprite(TextureCache['pannel_bg.png']);

    this._container.addChild(this._bg);
};

PayoutPannel.prototype._createTitle = function() {
	// Bg
    /** Get texture from texture cache **/
    this._title = new Sprite(TextureCache['payout_title.png']);

    this._title.x = (this._bg.width - this._title.width) / 2;

    this._container.addChild(this._title);
}
