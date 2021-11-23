// Please put a empty line here always.
"use strict";

function MultiStarPannel(inGame) {
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

MultiStarPannel.prototype.getTransform = function()
{
    return this._container;
};

MultiStarPannel.prototype.show = function()
{
    this._container.visible = true;
};

MultiStarPannel.prototype.hide = function()
{
    this._container.visible = false;
};



/***********************************************************************************/
// 								Initilization
/***********************************************************************************/

MultiStarPannel.prototype._ctor = function() {
    this._createBg();
}


MultiStarPannel.prototype._createBg = function() {

    var self = this;

	// Bg
    /** Get texture from texture cache **/
    this._bg = new Sprite(TextureCache['picture.png']);
    this._bg.anchor.set(0.5);

    this._container.addChild(self._bg);
}
