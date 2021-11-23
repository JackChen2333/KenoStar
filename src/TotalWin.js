
"use strict";

function TotalWin() {
    this._container = new Sprite();
    this._container.anchor.set(0.5);

    this._bg = null;
    this._winText = null;
    this._emitter = null;

    this._currentTotalWinAmount = 0;
    this._targetTotalWinAmount = 0;

    this._ctor();
}


/***********************************************************************************/
// 						       Public Methods
/***********************************************************************************/
TotalWin.prototype.updateTotalWinAmount = function(amt, callback) {
    var callbackFunc = callback.func;
    var callbackObj = callback.scope;

    if (amt == 0) {
        callbackFunc.call(callbackObj, {});
        return;
    }

    var self = this;

    this._targetTotalWinAmount = amt / 100;


    var increaseAmt = this._targetTotalWinAmount - this._currentTotalWinAmount;

    var speed = 10;

    if (increaseAmt < 10) {
        speed = 10;
    } else if (increaseAmt < 100) {
        speed = 100;
    } else if (increaseAmt < 1000) {
        speed = 200;
    } else {
        speed = 500;
    }


    var duration = increaseAmt / speed;

    this._emitter.enable();

    xqu.audio.playEffect('Snd_Total_Win_Tick', true);

    TweenMax.to(self, duration, {
        _currentTotalWinAmount: self._targetTotalWinAmount,
        roundProps:"_currentTotalWinAmount",
        onUpdate:function(){
            // < 100000 font size = 26;
            // < 1000000 font size = 23;
            // < 10000000 font size = 18
            var fontSize = 26;
            if (self._currentTotalWinAmount < 100000) {
                fontSize = 26;
            } else if (self._currentTotalWinAmount < 1000000) {
                fontSize = 23;
            } else if (self._currentTotalWinAmount < 1000000) {
                fontSize = 18;
            }

            xqu.log(self._currentTotalWinAmount);
            var totalWinAmountStr = xqu.utils.sformatNumber(self._currentTotalWinAmount, 0, '.', ',');
            self._winText.fontSize = fontSize;
            self._winText.text = GameBank.GetCurrencyPrefixStr() + totalWinAmountStr;
        },
        onComplete:function(){
            self._emitter.disable();
            callbackFunc.call(callbackObj, {});
            xqu.audio.stopEffect('Snd_Total_Win_Tick');
            xqu.audio.playEffect('Snd_Total_Win_Finish');
        }
    });    
}


TotalWin.prototype.reset = function() {
    this._currentTotalWinAmount = 0;
    this._targetTotalWinAmount = 0;
    this._winText.text = '';
}





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

TotalWin.prototype.getTransform = function()
{
    return this._container;
};



/***********************************************************************************/
// 								Initilization
/***********************************************************************************/

TotalWin.prototype._ctor = function() {
    this._createBg();
    this._createEmitter();
    this._createWinText();
}


TotalWin.prototype._createBg = function() {

    var self = this;

	// Bg
    /** Get texture from texture cache **/
    this._bg = new Sprite(TextureCache['ingame_total_win_frame.png']);
    this._bg.anchor.set(0.5);

    this._container.addChild(self._bg);
}

TotalWin.prototype._createEmitter = function() {
    this._emitter = new TotalWinEmitter();

    this._emitter.getTransform().position.x = 80;
    this._emitter.getTransform().position.y = -8;

    this._emitter.disable();

    this._container.addChild(this._emitter.getTransform());
}

TotalWin.prototype._createWinText = function() {
    this._winText = new PIXI.BitmapText('', { fontName: "BMFont_Ingame_Total_Win", fontSize: 18, align: 'center' });
    this._container.addChild(this._winText);
    this._winText.anchor.set(0.5);
    this._winText.position.x = 85;
    this._winText.position.y = -8;

    // < 100000 font size = 26;
    // < 1000000 font size = 23;
    // < 10000000 font size = 18
}
