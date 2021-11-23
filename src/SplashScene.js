
"use strict";

function SplashScene(mainGame)
{
	this._mainGame = mainGame;
	
    this._container = null;

    this._bg = null;
    
    if (xqu.config.IsMobile()) {
      this._baseX=1080/2;
      this._baseY=200;
    }else{
      this._baseX=2048/2;
      this._baseY=150;
    }
	
	ApiConnector.updateWindowName("Keno Stars");
	ApiConnector.UpdateBalance(100000);
	ApiConnector.UpdateWager(25);

    this._ctor();
}

// NOTE: Positioning purpose.
SplashScene.prototype._MakeAnEmptyTexture = function()
{
    var emptyRect = new PIXI.Sprite(PIXI.Texture.EMPTY);
	emptyRect.width = xqu.config.GAME_DESIGN_SIZE_WIDTH;
	emptyRect.height = xqu.config.GAME_DESIGN_SIZE_HEIGHT;
	emptyRect.position.x = emptyRect.position.y = 0;
    emptyRect.alpha = 0.001;
    this._container.addChild(emptyRect);
}

SplashScene.prototype._ctor = function()
{
    var self = this;

    this._container = new PIXI.Container();

    this._MakeAnEmptyTexture()

    this._createBg();

    ApiConnector.UpdateBalance(GameBank.GetBalance());
};

SplashScene.prototype._createBg = function()
{
    var self = this;
    var logoStar;
    var text10;
    var selectNum;
    var textRS;
    var revealS;
    var textJP;
    var constellation;

	// Bg
    /** Get texture from texture cache **/
    if(xqu.config.IsMobile()){
      this._bg = new Sprite(TextureCache['starField.png']);
    }else{
      this._bg = new Sprite(TextureCache['night_sky.png']);
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

    logoStar = new Sprite(TextureCache['logo_kenoStars.png']);
    logoStar.anchor.set(0.5);
    logoStar.position.x = this._baseX;
    if(xqu.config.IsMobile()){
      logoStar.position.y = this._baseY+50;
    }else{
      logoStar.position.y = this._baseY;
    }
    this._container.addChild(logoStar);

    text10 = new Sprite(TextureCache['splashText_Reveal.png']);
    text10.anchor.set(0.5);
    text10.position.x = this._baseX;
    if(xqu.config.IsMobile()){
      text10.position.y = this._baseY+280;
    }else{
      text10.position.y = this._baseY+150;
    }
    this._container.addChild(text10);


    selectNum = new Sprite(TextureCache['selectNumbers.png']);
    selectNum.anchor.set(0.5);
    selectNum.position.x = this._baseX+40;
    if(xqu.config.IsMobile()){
      selectNum.position.y = this._baseY+450;
    }else{
      selectNum.position.y = this._baseY+270;
    }
    this._container.addChild(selectNum);

    textRS = new Sprite(TextureCache['splashText_Stars.png']);
    textRS.anchor.set(0.5);
    textRS.position.x = this._baseX;
    if(xqu.config.IsMobile()){
      textRS.position.y = this._baseY+670;
    }else{
      textRS.position.y = this._baseY+420;
    }
    this._container.addChild(textRS);

    revealS = new Sprite(TextureCache['revealStars.png']);
    revealS.anchor.set(0.5);
    revealS.position.x = this._baseX+50;
    if(xqu.config.IsMobile()){
      revealS.position.y = this._baseY+900;
    }else{
      revealS.position.y = this._baseY+570;
    }
    this._container.addChild(revealS);

    textJP = new Sprite(TextureCache['splashText_Jackpot.png']);
    textJP.anchor.set(0.5);
    textJP.position.x = this._baseX+0;
    if(xqu.config.IsMobile()){
      textJP.position.y = this._baseY+1170;
    }else{
      textJP.position.y = this._baseY+770;
    }
    this._container.addChild(revealS);
    this._container.addChild(textJP);

    constellation = new Sprite(TextureCache['constellation.png']);
    constellation.anchor.set(0.5);
    constellation.position.x = this._baseX+0;
    if(xqu.config.IsMobile()){
      constellation.position.y = this._baseY+1450;
    }else{
      constellation.position.y = this._baseY+1020;
    }
    this._container.addChild(constellation);

    if (xqu.config.IsMobile()) {
    } else {
        this._bg.scale.x = this._bg.scale.y = 1.5;
    }




}



SplashScene.prototype.getTransform = function()
{
    return this._container;
};

SplashScene.prototype._onClick = function(e)
{
    var self = this;
    // xqu.log("click bg on Splash Screen");
    xqu.audio.playEffect('Snd_Play_Button');
    self._mainGame.callbackGoToInGameScene();
};



SplashScene.prototype.show = function()
{
    this._container.visible = true;
};

SplashScene.prototype.hide = function()
{
    this._container.visible = false;
};
