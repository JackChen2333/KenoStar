// Please put a empty line here always.
"use strict";

function NumberBoardNumber(numberBoard, number) {
    this._container = new PIXI.Container();

    this._board = numberBoard;

    this._number = number;

    this._bg = null;

    this._ctor();

    xqu.log("Board Number(%i) is created", this._number);
}

// Number States
NumberBoardNumber.SELECTED                  = 'NumberBoardNumber.SELECTED';
NumberBoardNumber.UN_SELECT                 = 'NumberBoardNumber.UN_SELECT';

NumberBoardNumber.MATCHED                   = 'NumberBoardNumber.MATCHED';
NumberBoardNumber.UN_MATCH                  = 'NumberBoardNumber.UN_MATCH';

NumberBoardNumber.MATCHED_WITH_STAR         = 'NumberBoardNumber.MATCHED_WITH_STAR';
NumberBoardNumber.UN_MATCH_WITH_STAR        = 'NumberBoardNumber.UN_MATCH_WITH_STAR';




/***********************************************************************************/
// 						       Public Methods
/***********************************************************************************/
NumberBoardNumber.prototype.getNumber = function()
{
    return this._number;
};





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

NumberBoardNumber.prototype.getTransform = function()
{
    return this._container;
};

NumberBoardNumber.prototype.show = function()
{
    this._container.visible = true;
};

NumberBoardNumber.prototype.hide = function()
{
    this._container.visible = false;
};



/***********************************************************************************/
// 								Initilization
/***********************************************************************************/

NumberBoardNumber.prototype._ctor = function() {
    this._createBg();
}


NumberBoardNumber.prototype._createBg = function() {
    this._bg = new Sprite(TextureCache['num_bg_purple.png']);
    this._bg.anchor.set(0.5);
    // this._bg.scale.set(2);

    this._container.addChild(this._bg);
}
