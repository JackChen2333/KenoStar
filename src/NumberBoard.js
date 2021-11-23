// Please put a empty line here always.
"use strict";

function NumberBoard(inGame) {
    this._container = new PIXI.Container();

    this._ingame = inGame;

    this._ROW = 8;
    this._COL = 10;

    this._nums = new Array();

    this._ctor();
}


/***********************************************************************************/
// 						       Public Methods
/***********************************************************************************/
NumberBoard.prototype.getWidth = function() {

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

NumberBoard.prototype.getTransform = function()
{
    return this._container;
};

NumberBoard.prototype.show = function()
{
    this._container.visible = true;
};

NumberBoard.prototype.hide = function()
{
    this._container.visible = false;
};



/***********************************************************************************/
// 								Initilization
/***********************************************************************************/

NumberBoard.prototype._ctor = function() {
    this._createNums();
}


NumberBoard.prototype._createNums = function() {
    var offsetX = 0;
    var offsetY = 0.
    var numWidth = 81;
    var startX = numWidth / 2;
    var startY = numWidth / 2;

    for (var row = 0; row < this._ROW; row++) {
        for (var col = 0; col < this._COL; col++) {
            var nbn = new NumberBoardNumber(this, row * this._COL + col + 1);
            nbn.getTransform().x = startX + col * (numWidth + offsetX);
            nbn.getTransform().y = startY + row * (numWidth + offsetY);
            this._nums.push(nbn);
            this._container.addChild(nbn.getTransform());
            xqu.log("Number(%i) is created at Position(%s, %s)", nbn.getNumber(), nbn.getTransform().x, nbn.getTransform().y);
        }
    }
    
}





