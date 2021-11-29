// Please put a empty line here always.
"use strict";

function AutoPlayLayer() {
    this._container = new PIXI.Container();

    // This contains all settings elements
    this._panel = null;

    this._bg = null;

    this._playLeftBtn_Array = new Array();
    this._balanceLimitBtn_Array = new Array();
    this._winLimitBtn_Array = new Array();

    this._exitBtn = null;
    this._confirmBtn = null;

    this._playLeftAmt = -1;

    this._playLeftAmtIndicator = null;
    this._balanceLimitIndicator = null;
    this._winLimitIndicator = null;


    // Indicates amount of balance that before the auto-play starts
    this._initialBalance = -1;


    this._configData = {playLeft:-1, balanceLimit:-1, winLimit:-1};

    // Data Config
    this._Config_Play_Left = [5, 10, 25, 50];
    this._Config_Balance_Limit = [500, 1000, 2500, Number.MAX_SAFE_INTEGER]; // cents
    this._Config_Win_Limit = [500, 1000, 2500, Number.MAX_SAFE_INTEGER]; // cents

    // callback functions.
    this._cbStartPlay = null;
    this._cbFinishAllPlays = null;

    this._ctor();
}


/***********************************************************************************/
// 						       Public Methods
/***********************************************************************************/
AutoPlayLayer.prototype.addCallback_startPlay = function(fn, scope) {
    this._cbStartPlay = {};
    this._cbStartPlay.fn = fn;
    this._cbStartPlay.scope = scope;
}

AutoPlayLayer.prototype.addCallback_finishAllPlays = function(fn, scope) {
    this._cbFinishAllPlays = {};
    this._cbFinishAllPlays.fn = fn;
    this._cbFinishAllPlays.scope = scope;
}


// main-game will call this callback to tell AutoPlayLayer that the current play is finished.
AutoPlayLayer.prototype.finishPlay = function(balance, win) {


    // Check to see if need to start next play or not
    if ((balance - this._initialBalance) >= this._configData.balanceLimit) {
        this._cbFinishAllPlays.fn.call(this._cbFinishAllPlays.scope);
        return;
    }

    if (win >= this._configData.winLimit) {
        this._cbFinishAllPlays.fn.call(this._cbFinishAllPlays.scope);
        return;
    }
    
    if (this._playLeftAmt >= 1) {
        // Start Next Play
        this._callMainGameToPlayGame();
    } else {
        this._cbFinishAllPlays.fn.call(this._cbFinishAllPlays.scope);
    }
}


AutoPlayLayer.prototype.forceStop = function() {
    this._playLeftAmt = 0;
}

AutoPlayLayer.prototype.reset = function() {
    // Rest Config Data
    this._configData = {playLeft:-1, balanceLimit:-1, winLimit:-1};

    // Reset Play-Left buttons
    for (var i = 0; i < this._playLeftBtn_Array.length; i++) {
        var btn = this._playLeftBtn_Array[i];
        btn.setSelectState(false);
    }

    // Reset Balance-Limit buttons
    for (var i = 0; i < this._balanceLimitBtn_Array.length; i++) {
        var btn = this._balanceLimitBtn_Array[i];
        btn.setSelectState(false);
    }    
       
    // Reset Win-Limit buttons
    for (var i = 0; i < this._winLimitBtn_Array.length; i++) {
        var btn = this._winLimitBtn_Array[i];
        btn.setSelectState(false);
    }        
    
    // Reset Confirm Button
    this._confirmBtn.setEnable(false);

    this._playLeftAmtIndicator.text = '';
    this._balanceLimitIndicator.text = '';
    this._winLimitIndicator.text = '';
}




/***********************************************************************************/
// 						       Private Methods
/***********************************************************************************/
// If Confirm Button is ready, then this will be involked by clicking the confirm button
AutoPlayLayer.prototype._onClickConfirmButton = function() {
    xqu.audio.playEffect('Snd_Utility_Btn');
    this._confirmBtn.setEnable(false);

    this._playLeftAmt = this._configData.playLeft;

    this._callMainGameToPlayGame();

    this.hide();
}


// Call main-game-startPlay-func to start play game
AutoPlayLayer.prototype._callMainGameToPlayGame = function () {
    this._playLeftAmt--;
    this._cbStartPlay.fn.call(this._cbStartPlay.scope, this._playLeftAmt);
}




AutoPlayLayer.prototype._tryToEnableConfirmButton = function() {
    //xqu.log(this._configData);
    if (this._configData.playLeft == -1 || this._configData.balanceLimit == -1 || this._configData.winLimit == -1) {
        return;
    } else {
        // TODO: Enable Confirm Button
        this._confirmBtn.setEnable(true);
    }
}

/***********************************************************************************/
// 				        Private Event Listeners / Handlers
/***********************************************************************************/

AutoPlayLayer.prototype._selectPlayLeftBtn = function(value) {
    xqu.audio.playEffect('Snd_Utility_Btn');
    this._configData.playLeft = value;

    for (var i = 0; i < this._playLeftBtn_Array.length; i++) {
        var btn = this._playLeftBtn_Array[i];
        if (btn.getValue() != value) {
            btn.setSelectState(false);
        } else {
            this._playLeftAmtIndicator.text = btn.getText();
        }
    }

    this._tryToEnableConfirmButton();
}


AutoPlayLayer.prototype._selectBalanceLimitBtn = function(value) {
    xqu.audio.playEffect('Snd_Utility_Btn');
    this._configData.balanceLimit = value;

    for (var i = 0; i < this._balanceLimitBtn_Array.length; i++) {
        var btn = this._balanceLimitBtn_Array[i];
        if (btn.getValue() != value) {
            btn.setSelectState(false);
        }  else {
            this._balanceLimitIndicator.text = btn.getText();
        }
    }    
    
    this._tryToEnableConfirmButton();
}



AutoPlayLayer.prototype._selectWinLimitBtn = function(value) {
    xqu.audio.playEffect('Snd_Utility_Btn');
    this._configData.winLimit = value;
    
    for (var i = 0; i < this._winLimitBtn_Array.length; i++) {
        var btn = this._winLimitBtn_Array[i];
        if (btn.getValue() != value) {
            btn.setSelectState(false);
        }  else {
            this._winLimitIndicator.text = btn.getText();
        }
    }    
    
    this._tryToEnableConfirmButton();
}




/***********************************************************************************/
// 								Common APIs
/***********************************************************************************/

AutoPlayLayer.prototype.getTransform = function()
{
    return this._container;
};

// Not in use in this layer, use showWithBalance instead.
AutoPlayLayer.prototype.show = function()
{
    // this._container.visible = true;
    // this._tryToEnableConfirmButton();
    xqu.assert(false, "AutoPlayLayer.show is not in use anymore, please use showWithBalance(balance) instead");
};

AutoPlayLayer.prototype.showWithBalance = function(currentBalance)
{
    this._container.visible = true;
    this._initialBalance = currentBalance;
    this._tryToEnableConfirmButton();
};

AutoPlayLayer.prototype.hide = function()
{
    xqu.audio.playEffect('Snd_Utility_Btn');
    this._container.visible = false;
};




/***********************************************************************************/
// 								Initilization
/***********************************************************************************/

AutoPlayLayer.prototype._ctor = function() {
    this._createBg();

    this._createConfigButtons();

    this._createConfirmButton();

    this._createExitButton();

    this._createTextIndicators();

    this.hide();
}


AutoPlayLayer.prototype._createBg = function() {
    var self = this;

    var heightExtra = 200;
    var widthExtra = 1000;
	// Bg
    /** Get texture from texture cache **/
    this._graph = new PIXI.Graphics();
    this._graph.beginFill(0x000000);
    this._graph.drawRect(-(widthExtra / 2),
                        -(heightExtra / 2), 
                        xqu.config.GAME_DESIGN_SIZE_WIDTH + widthExtra, 
                        xqu.config.GAME_DESIGN_SIZE_HEIGHT + heightExtra);
    this._graph.alpha = 0.7;
    this._graph.pivot.x = 0.5;
    this._graph.pivot.y = 0.5;
    this._container.addChild(this._graph);

    this._graph.interactive = true;

    this._panel = new Sprite();
    this._panel.anchor.set(0.5);
    this._panel.x = xqu.config.SCREEN_CENTER_X;
    this._panel.y = xqu.config.SCREEN_CENTER_Y;
    this._container.addChild(this._panel);

    this._bg = new Sprite(TextureCache['autoplay_bg.png']);
    this._bg.anchor.set(0.5);
    this._panel.addChild(this._bg);

    this._bgTopBar = new Sprite(TextureCache['autoplay_bg_top_bar.png']);
    this._bgTopBar.anchor.set(0.5);
    this._bgTopBar.x = this._bg.x;
    this._bgTopBar.y = this._bg.y - this._bg.height / 2;
    this._panel.addChild(this._bgTopBar);


    this._bgTitle = new Sprite(TextureCache['autoplay_title.png']);
    this._bgTitle.anchor.set(0.5);
    this._bgTitle.x = this._bgTopBar.x;
    this._bgTitle.y = this._bgTopBar.y;
    this._panel.addChild(this._bgTitle);


    this._playLeftTitle = new PIXI.BitmapText('', { fontName: "BMFont_JT_Auto_Play_Setting_description", fontSize: 32, align: 'center' });
    this._playLeftTitle.text = 'Number of plays:';
    this._playLeftTitle.x = this._bg.x - this._bg.width / 2;
    this._playLeftTitle.y = this._bg.y - this._bg.height / 2 + 50;
    this._panel.addChild(this._playLeftTitle);   


    this._balanceLimitTitle = new PIXI.BitmapText('', { fontName: "BMFont_JT_Auto_Play_Setting_description", fontSize: 32, align: 'center' });
    this._balanceLimitTitle.text = 'Stop when cash decreased by:';
    this._balanceLimitTitle.x = this._bg.x - this._bg.width / 2;
    this._balanceLimitTitle.y = this._bg.y - 130;
    this._balanceLimitTitle.maxWidth = 285;
    this._panel.addChild(this._balanceLimitTitle);    

    this._winLimitTitle = new PIXI.BitmapText('', { fontName: "BMFont_JT_Auto_Play_Setting_description", fontSize: 32, align: 'center' });
    this._winLimitTitle.text = 'Stop when single win more than:';
    this._winLimitTitle.x = this._bg.x - this._bg.width / 2;
    this._winLimitTitle.y = this._bg.y + this._bg.height / 2 - 275;
    this._winLimitTitle.maxWidth = 285;
    this._panel.addChild(this._winLimitTitle);    
}



AutoPlayLayer.prototype._createConfigButtons = function() {
    var self = this;

    // *******************************
    // Create Number of Plays Button
    // *******************************
    var startX = this._playLeftTitle.x + 350;
    var startY = this._playLeftTitle.y + 25;
    var gapX = 10;
    var btnWidth = 0;

    for (var i = 0; i < this._Config_Play_Left.length; i++) {
        var playTimes = this._Config_Play_Left[i];
        var btn = new AutoPlayConfigButton('play_' + playTimes, 'autoplay_config_small_btn_up.png', 'autoplay_config_small_btn_down.png', this._Config_Play_Left[i], playTimes);
        btnWidth = btn.getWidth();
        btn.setPosition(startX + (btnWidth + gapX) * i, startY);
        btn.addClickListener(self._selectPlayLeftBtn, self);
        this._panel.addChild(btn.getTransform());
        this._playLeftBtn_Array.push(btn);
    }


    // *******************************
    // Create Cash Stop Button
    // *******************************
    startY = this._balanceLimitTitle.y + 45;
    for (var i = 0; i < this._Config_Balance_Limit.length; i++) {
        var moneyInCents = this._Config_Balance_Limit[i];
        var moneyInDollar = moneyInCents / 100;
        var btn = null;
        if (moneyInCents < Number.MAX_SAFE_INTEGER) {
            btn = new AutoPlayConfigButton('money_' + moneyInDollar, 'autoplay_config_small_btn_up.png', 'autoplay_config_small_btn_down.png', '$' + moneyInDollar, moneyInCents);
        } else {
            btn = new AutoPlayConfigButton('money_no_limit', 'autoplay_config_large_btn_up.png', 'autoplay_config_large_btn_down.png', 'NO LIMIT', moneyInCents);
        }
        btn.setPosition(startX + (btnWidth + gapX) * i, startY);
        btn.addClickListener(self._selectBalanceLimitBtn, self);
        this._panel.addChild(btn.getTransform());
        this._balanceLimitBtn_Array.push(btn);
    }    
    

    // *******************************
    // Create Single Win Button
    // *******************************
    startY = this._winLimitTitle.y + 45;
    for (var i = 0; i < this._Config_Win_Limit.length; i++) {
        var moneyInCents = this._Config_Win_Limit[i];
        var moneyInDollar = moneyInCents / 100;
        var btn = null;
        if (moneyInCents < Number.MAX_SAFE_INTEGER) {
            btn = new AutoPlayConfigButton('win_' + moneyInDollar, 'autoplay_config_small_btn_up.png', 'autoplay_config_small_btn_down.png', '$' +moneyInDollar, moneyInCents);
        } else {
            btn = new AutoPlayConfigButton('win_no_limit', 'autoplay_config_large_btn_up.png', 'autoplay_config_large_btn_down.png', 'NO LIMIT', moneyInCents);
        }
        btn.setPosition(startX + (btnWidth + gapX) * i, startY);
        btn.addClickListener(self._selectWinLimitBtn, self);
        this._panel.addChild(btn.getTransform());
        this._winLimitBtn_Array.push(btn);
    }        
}


AutoPlayLayer.prototype._createExitButton = function() {
    var self = this;

    this._exitBtn = new xqu.pixi.SimpleButton("exit_button",
        TextureCache['autoplay_x_btn.png'],
        TextureCache['autoplay_x_btn.png'],
        TextureCache['autoplay_x_btn.png']);
    this._exitBtn.setPosition(this._bg.x - this._bg.width / 2 + 40, this._bg.y - this._bg.height / 2);
    this._panel.addChild(this._exitBtn.getTransform());
    this._exitBtn.addEventListener('click', new xqu.Callback(self.hide, self));
}

AutoPlayLayer.prototype._createTextIndicators = function() {
    // Play Left Indicator
    this._playLeftAmtIndicator = new PIXI.BitmapText('', { fontName: "BMFont_JT_Auto_Play_Setting_Value", fontSize: 32, align: 'center' });
    this._playLeftAmtIndicator.text = '';
    this._playLeftAmtIndicator.anchor.set(0.5);
    this._playLeftAmtIndicator.x =  this._playLeftTitle.x + 120;
    this._playLeftAmtIndicator.y =  this._playLeftTitle.y + 100;    
    this._panel.addChild(this._playLeftAmtIndicator);

    // Balance Limit Indicator
    this._balanceLimitIndicator = new PIXI.BitmapText('', { fontName: "BMFont_JT_Auto_Play_Setting_Value", fontSize: 32, align: 'center' });
    this._balanceLimitIndicator.text = '';
    this._balanceLimitIndicator.anchor.set(0.5);
    this._balanceLimitIndicator.x =  this._playLeftAmtIndicator.x;
    this._balanceLimitIndicator.y =  this._playLeftAmtIndicator.y + 160;   
    this._panel.addChild(this._balanceLimitIndicator);

    // Win Limit Indicator
    this._winLimitIndicator = new PIXI.BitmapText('', { fontName: "BMFont_JT_Auto_Play_Setting_Value", fontSize: 32, align: 'center' });
    this._winLimitIndicator.text = '';
    this._winLimitIndicator.anchor.set(0.5);
    this._winLimitIndicator.x =  this._playLeftAmtIndicator.x;
    this._winLimitIndicator.y =  this._balanceLimitIndicator.y + 160;    
    this._panel.addChild(this._winLimitIndicator);
}


AutoPlayLayer.prototype._createConfirmButton = function() {

    var self = this;

    this._confirmBtn = new xqu.pixi.SimpleButton("confirm_button",
        TextureCache['autoplay_confirm_btn.png'],
        TextureCache['autoplay_confirm_btn.png'],
        TextureCache['autoplay_confirm_btn.png']);
    this._confirmBtn.setPosition(this._bg.x + this._bg.width / 2 - this._confirmBtn.getTransform().width / 2 - 40, this._bg.y + this._bg.height / 2 - 60);
    this._panel.addChild(this._confirmBtn.getTransform());
    this._confirmBtn.addEventListener('click', new xqu.Callback(self._onClickConfirmButton, self));  
    this._confirmBtn.setEnable(false) ;
}













/***********************************************************************************/
//
//
// 								AutoPlay Simple Button Class
//
//
/***********************************************************************************/


var AutoPlayConfigButton = function(buttonName, bgNormalName, bgSelectedName, txt, value) {
    var self = this;

    this._name = buttonName;
    this._textureUp = TextureCache[bgNormalName];
    this._textureDown = TextureCache[bgSelectedName];
    this._txt = txt;
    this._value = value;

    this._clickFunc = null;

    this._btn = new Sprite(this._textureUp);
    this._btn.buttonMode = true;
    this._btn.interactive = true;

    this._title = new PIXI.BitmapText('', { fontName: "BMFont_JT_Auto_Play_Setting_Value", fontSize: 32, align: 'center' });
    this._title.text = txt;
    this._title.x = this._btn.width / 2;
    this._title.y = this._btn.height / 2 - 15;
    this._title.anchor.set(0.5);    
    this._btn.addChild(this._title);

    this._btn.on('click', self._onClickButton.bind(self));
    this._btn.on('tap', self._onClickButton.bind(self));
}

AutoPlayConfigButton.prototype.reset = function() {
    this._btn.texture = this._textureUp;
}


AutoPlayConfigButton.prototype.getName = function() {
    return this._name;
}

AutoPlayConfigButton.prototype.getValue = function() {
    return this._value;
}

AutoPlayConfigButton.prototype.getText = function() {
    return this._txt;
}

AutoPlayConfigButton.prototype.getTransform = function() {
    return this._btn;
}

AutoPlayConfigButton.prototype.setPosition = function(x, y) {
    this._btn.x = x;
    this._btn.y = y;
}

AutoPlayConfigButton.prototype.getWidth = function(x, y) {
    return this._btn.width;
}

AutoPlayConfigButton.prototype.setSelectState = function(isSelected) {
    if (isSelected) {
        this._btn.texture = this._textureDown;
    } else {
        this._btn.texture = this._textureUp;
    }
}

AutoPlayConfigButton.prototype.addClickListener = function(fn, scope) {
    this._clickFunc = {};
    this._clickFunc.fn = fn;
    this._clickFunc.scope = scope;
}

AutoPlayConfigButton.prototype._onClickButton = function() {
    //xqu.log(this._btn);
    var self = this;

    this._btn.texture = this._textureDown;

    if (this._clickFunc) {
        this._clickFunc.fn.call(this._clickFunc.scope, self._value);
    }
}

