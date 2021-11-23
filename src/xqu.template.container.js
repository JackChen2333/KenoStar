// Please put a empty line here always.
"use strict";

function Tmp() {
    this._container = new PIXI.Container();

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

Tmp.prototype._ctor = function() {
    this._createBg();
}


Tmp.prototype._createBg = function() {

    var self = this;

	// Bg
    /** Get texture from texture cache **/
    this._bg = new Sprite(TextureCache['picture.png']);
    this._bg.anchor.set(0.5);

    this._container.addChild(self._bg);
}
