
"use strict";

function InGameScene(mainGame)
{
    this.JCTool=new JC_PIXI_Tools();
    
    this.JCJTool=new JC_JavaScript_Tools();

	this._mainGame = mainGame;
	
    this._container = null;

    this._numberBoard = null;

    this._jackpotPannel = null;

    this._payoutPannel = null;
    
    this._autoPlayLayer=null;

    this._ifOverRed=false;
    this._ifOverWhite=false;


    this._unselectBGtest=null;
    this._unselectBG=[];
    if(xqu.config.IsMobile()){
      this._unselectBGX=655-580;
      this._unselectBGY=275;
    }else{
      this._unselectBGX=655;
      this._unselectBGY=275;
    }
    this._selectBG=[];
    this._unselectBall=[];
    this._selectBall=[];
    this._fireBall=[];
    this._fireBallX=this._unselectBGX+50;
    this._fireBallY=this._unselectBGY-47;
    this._fireBallDis=900;
    this._fireBallTween=[];
    this._starOverBall=[];
    this._starOverBallPos=[];
    this._startest;
    this._staremitter;

    this._helpBtn = null;

    this._xmX=175;
    this._xmXM=50;
    this._xmbaixing = [];
    this._xmduobeilvWin=[];
    
    this._selectCount=0;
    //button
    this._wagerIncBtn=null;

    this._wagerDecBtn=null;

    this._clearAll=null;
    this._autoPick=null;
    this._playBtn = null;
    this._playBtnEmitter = [];
    this._againBtnEmitter=null;
    this._playBtnEnabled = true;
    this._autoPlayBtn=null;
    this._ifAutoPlay=false;
    this._revealBtn=null;
    //this._revealTween=null;
    this._playAgainBtn=null;
    this._firstRun=0;

    this._playAgainBtn = null;
    this._playAgainBtnEnabled = true;

    this._playButtonGroup = new Array();

    //zuobox
    this._zuobox=[];
    //youbox
    this._youbox=[];

    //res
    this._winPriceTier=[];
    this._totalWin=0;
    this._ifJack=false;
    this._jackpotListOri=[];
    this._jackpotList=[];
    this._jackpotReset=-1;
    this._totalWinText=null;
    this._curWager=0.25;
    this._curBalance=1000;
    this._resList=[];
    this._selectNum=[];
    this._selectNumTrigger=false;
    this._showNumTime=[];

    //font
    this._wagerxs=[];
    this._unselectFont=[];
    this._selectFont=[];
    this._jackpotWinSlot=[];
    this._jackpotWinPrice=[];
    this._jackpotWinNum=[];
    this._payoutInit=[];
    this._payoutWin=[];
    this._payoutWinPrice=[];



    for(var i=0;i<6;i++){
      this._payoutWin[i]=new Array();
      this._payoutWinPrice[i]=new Array();
    }
    this._payoutWhiteWinSlot=[];
    this._msg=[];
    this._msgX=1020;
    if(xqu.config.IsMobile()){
      this._msgX=1020-600;
    }
    this._chooseTween=null;
    this._playTween=null;
    

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


InGameScene.prototype._onClick = function(e)
{
    var self = this;
    // xqu.log("click bg on Splash Screen");
    //xqu.audio.playEffect('Snd_Play_Button');
    self._mainGame.callbackGoToInGameScene();
};





/***********************************************************************************/
// 								Common APIs
/***********************************************************************************/

InGameScene.prototype.getTransform = function()
{
    return this._container;
};

InGameScene.prototype.show = function()
{
    this._container.visible = true;
};

InGameScene.prototype.hide = function()
{
    this._container.visible = false;
};




/***********************************************************************************/
// 								Initilization
/***********************************************************************************/


// NOTE: Positioning purpose.
InGameScene.prototype._MakeAnEmptyTexture = function()
{
    var emptyRect = new PIXI.Sprite(PIXI.Texture.EMPTY);
	emptyRect.width = xqu.config.GAME_DESIGN_SIZE_WIDTH;
	emptyRect.height = xqu.config.GAME_DESIGN_SIZE_HEIGHT;
	emptyRect.position.x = emptyRect.position.y = 0;
    emptyRect.alpha = 0.001;
    this._container.addChild(emptyRect);
}

InGameScene.prototype._ctor = function()
{
    var self = this;

    this._container = new PIXI.Container();

    this._MakeAnEmptyTexture()

    this._createBg();

    this._createLogo();
    
    //this._createNumberBoard();
    this._createMainBoard();

    this._createJackpotPannel();

    this._createPayoutPannel();

    this._createOperatePannel();

    this._createButtonGroup();

    this._createFontPannel();


    this._createAutoPlayLayer();
    //this._test();

    ApiConnector.UpdateBalance(GameBank.GetBalance());
};

InGameScene.prototype._createBg = function()
{
    var self = this;

    this._bg = null;

	// Bg
    /** Get texture from texture cache **/
    if (xqu.config.IsMobile()) {
        this._bg = new Sprite(TextureCache['starField.png']);
    } else {
        this._bg = new Sprite(TextureCache['night_sky.png']);
        this._bg.scale.x = this._bg.scale.y = 1.5;
    }

    this._bg.anchor.set(0.5);
    this._bg.position.x = xqu.config.SCREEN_CENTER_X;
    this._bg.position.y = xqu.config.SCREEN_CENTER_Y;

    this._container.addChild(this._bg);
};

InGameScene.prototype._createLogo = function() {
    this._logo = null;

    var scale = 1;

    if (xqu.config.IsMobile()) {
        this._logo = new Sprite(TextureCache['logo.png']);
        this._logo.anchor.set(0.5, 0);
        this._logo.x = xqu.config.SCREEN_CENTER_X-350;
        this._logo.y = 10;
        this._logo.scale.set(scale);

    } else {
        this._logo = new Sprite(TextureCache['logo.png']);
        this._logo.anchor.set(0.5, 0);
        this._logo.x = xqu.config.SCREEN_CENTER_X;
        this._logo.y = 30;
        this._logo.scale.set(scale);
    }

    this._container.addChild(this._logo);
};


InGameScene.prototype._createMainBoard = function() {
  /*for(var i=0;i<80;i++){
      this._unselectBG[i] = new xqu.pixi.SimpleButton("num_button",
        TextureCache['num_bg_purple.png'],
        TextureCache['num_bg_purple.png'],
        TextureCache['num_bg_purple.png']);
      this._unselectBG[i].setPosition(655+(i%10)*81, 275+Math.floor(i/10)*81);
      //this._unselectBG[i].setVisible(true);
      this._container.addChild(this._unselectBG[i].getTransform());
      this._unselectBG[i].addEventListener('click', new xqu.Callback(self._onClickNumBtn, self));


      [>this._unselectBG[i]=new this.JCTool.Sprite(this.JCTool.TC["num_bg_purple.png"]);
      this._unselectBG[i].anchor.set(0.5);
      this._unselectBG[i].interactive=true;
      this._unselectBG[i].buttonMode=true;
      this._unselectBG[i].visible=true;
      this._unselectBG[i].index=i;
      this._unselectBG[i].x=655+(i%10)*81;
      this._unselectBG[i].y=275+Math.floor(i/10)*81;
      this.JCTool.Btn(this._unselectBG[i],"click",this._onClickNumBtn);
      this._container.addChild(this._unselectBG[i]);<]

      this._selectBG[i]=new this.JCTool.Sprite(this.JCTool.TC["num_bg_red.png"]);
      this._selectBG[i].anchor.set(0.5);
      this._selectBG[i].interactive=true;
      this._selectBG[i].buttonMode=true;
      this._selectBG[i].visible=false;
      this._selectBG[i].x=655+(i%10)*81;
      this._selectBG[i].y=275+Math.floor(i/10)*81;
      this._container.addChild(this._selectBG[i]);
  }*/


}

InGameScene.prototype._createOperatePannel = function() {
    for(var i=0;i<28;i++){
      this._winPriceTier[i]=new Array();
    }
    this._winPriceTier[0]=[5,0,1];
    this._winPriceTier[1]=[0,0,2];
    this._winPriceTier[2]=[6,0,2];
    this._winPriceTier[3]=[5,2,3];
    this._winPriceTier[4]=[7,0,4];
    this._winPriceTier[5]=[5,4,5];
    this._winPriceTier[6]=[0,2,6];
    this._winPriceTier[7]=[6,2,6];
    this._winPriceTier[8]=[0,3,8];
    this._winPriceTier[9]=[6,3,8];
    this._winPriceTier[10]=[7,1,8];
    this._winPriceTier[11]=[8,0,10];
    this._winPriceTier[12]=[7,2,12];
    this._winPriceTier[13]=[7,3,16];
    this._winPriceTier[14]=[7,4,20];
    this._winPriceTier[15]=[8,1,20];
    this._winPriceTier[16]=[8,2,30];
    this._winPriceTier[17]=[9,0,40];
    this._winPriceTier[18]=[8,3,40];
    this._winPriceTier[19]=[10,0,80];
    this._winPriceTier[20]=[9,2,120];
    this._winPriceTier[21]=[9,3,160];
    this._winPriceTier[22]=[10,1,160];
    this._winPriceTier[23]=[9,4,200];
    this._winPriceTier[24]=[10,2,240];
    this._winPriceTier[25]=[10,3,320];
    this._winPriceTier[26]=[10,4,400];
    this._winPriceTier[27]=[10,5,1000];

    this._jackpotListOri=[125,250,500,900,1500,2200];
    this._jackpotList=[125,250,500,900,1500,2200];

    for(var i=0;i<20;i++){
      this._resList[i]=new Array();
      this._fireBallTween[i]=null;
    }

    for(var i=0;i<5;i++){
      this._starOverBallPos[i]=new Array();
    }

    if(xqu.config.IsMobile()){
      this._starOverBallPos[0][0]=620;
      this._starOverBallPos[0][1]=78;

      this._starOverBallPos[1][0]=750;
      this._starOverBallPos[1][1]=177;

      this._starOverBallPos[2][0]=850;
      this._starOverBallPos[2][1]=110;

      this._starOverBallPos[3][0]=945;
      this._starOverBallPos[3][1]=170;

      this._starOverBallPos[4][0]=1030;
      this._starOverBallPos[4][1]=74;

    }else{
      this._starOverBallPos[0][0]=590-this._xmX;
      this._starOverBallPos[0][1]=1100;

      this._starOverBallPos[1][0]=730-this._xmX;
      this._starOverBallPos[1][1]=1200;

      this._starOverBallPos[2][0]=830-this._xmX;
      this._starOverBallPos[2][1]=1130;

      this._starOverBallPos[3][0]=930-this._xmX;
      this._starOverBallPos[3][1]=1200;

      this._starOverBallPos[4][0]=1020-this._xmX;
      this._starOverBallPos[4][1]=1090;
    }






    var fiveStars = new Sprite(TextureCache['constellation.png']);

    var msgBox = new Sprite(TextureCache['window_messagenew.png']);

    var wagerText = new Sprite(TextureCache['title_setWager.png']);

    var totalWinText = new Sprite(TextureCache['title_totalWon.png']);

    var setWagerBox = new Sprite(TextureCache['window_setWager.png']);

    var totalWinBox = new Sprite(TextureCache['window_setWager.png']);
    
    for(var i=0;i<5;i++){
      this._xmbaixing[i]= new Sprite(TextureCache['star_constellation_selected_small.png']);
      this._xmbaixing[i].anchor.set(0.5);
      this._xmbaixing[i].visible=false;
    }
    this._xmbaixing[0].rotation=35;
    if(xqu.config.IsMobile()){
      this._xmbaixing[0].x=610;
      this._xmbaixing[0].y=85;
    }else{
      this._xmbaixing[0].x=590-this._xmX;
      this._xmbaixing[0].y=1120;
    }

    this._xmbaixing[1].rotation=-5;
    if(xqu.config.IsMobile()){
      this._xmbaixing[1].x=757;
      this._xmbaixing[1].y=177;
    }else{
      this._xmbaixing[1].x=736-this._xmX;
      this._xmbaixing[1].y=1211;
    }

    this._xmbaixing[2].rotation=100;
    this._xmbaixing[2].scale.set(0.9);
    if(xqu.config.IsMobile()){
      this._xmbaixing[2].x=848;
      this._xmbaixing[2].y=100;
    }else{
      this._xmbaixing[2].x=825-this._xmX;
      this._xmbaixing[2].y=1130;
    }

    this._xmbaixing[3].rotation=-10;
    this._xmbaixing[3].scale.set(0.9);
    if(xqu.config.IsMobile()){
      this._xmbaixing[3].x=953;
      this._xmbaixing[3].y=184;
    }else{
      this._xmbaixing[3].x=934-this._xmX;
      this._xmbaixing[3].y=1220;
    }

    this._xmbaixing[4].rotation=35;
    this._xmbaixing[4].scale.set(1.05);
    if(xqu.config.IsMobile()){
      this._xmbaixing[4].x=1028;
      this._xmbaixing[4].y=78;
    }else{
      this._xmbaixing[4].x=1008-this._xmX;
      this._xmbaixing[4].y=1110;
    }

    for(var i=0;i<5;i++){
      //this._xmbaixing[i].visible=true;
      var ranTimer=Math.floor(Math.random()*300)+200;
      //console.log("ranTimer "+ranTimer);
      if(i==0){
        this._starRunning(this._xmbaixing[i],1,i*ranTimer);
      }else if(i==1){
        this._starRunning(this._xmbaixing[i],1,(i+0.5)*ranTimer);
      }else if(i==2 || i==3){
        this._starRunning(this._xmbaixing[i],0.9,i*ranTimer);
      }else{
        this._starRunning(this._xmbaixing[i],1.05,i*ranTimer);
      }
    }
    //this._xmbaixing[4].scale.set(2);
    //TweenMax.to(this._xmbaixing[4], 1.5,{scaleX:5,scaleY:5, repeat:-1, yoyo:true});


    var xmduobeilv=[];
    xmduobeilv[0] = new Sprite(TextureCache['text_numStars_green_2x.png']);
    xmduobeilv[1] = new Sprite(TextureCache['text_numStars_green_3x.png']);
    xmduobeilv[2] = new Sprite(TextureCache['text_numStars_green_4x.png']);
    xmduobeilv[3] = new Sprite(TextureCache['text_numStars_green_5x.png']);
    xmduobeilv[4] = new Sprite(TextureCache['text_numStars_green_jackpot.png']);

    this._xmduobeilvWin[0] = new Sprite(TextureCache['text_numStars_white _2x.png']);
    this._xmduobeilvWin[1] = new Sprite(TextureCache['text_numStars_white _3x.png']);
    this._xmduobeilvWin[2] = new Sprite(TextureCache['text_numStars_white _4x.png']);
    this._xmduobeilvWin[3] = new Sprite(TextureCache['text_numStars_white _5x.png']);
    this._xmduobeilvWin[4] = new Sprite(TextureCache['text_numStars_white_jackpot.png']);

    var playBtnStar = new Sprite(TextureCache['btn_play_star_small.png']);

    //this._playBtn = new Sprite(TextureCache['btn_play_unroll.png']);

    if (xqu.config.IsMobile()) {
        fiveStars.x = 570;
        fiveStars.y = 15;
        var beilvx=0;
        var beilvy=1035;

        xmduobeilv[0].x=630+20-beilvx;
        xmduobeilv[0].y=1100-beilvy;
        xmduobeilv[1].x=757+20-beilvx;
        xmduobeilv[1].y=1218-beilvy;
        xmduobeilv[2].x=855+20-beilvx;
        xmduobeilv[2].y=1117-beilvy;
        xmduobeilv[3].x=955+20-beilvx;
        xmduobeilv[3].y=1217-beilvy;
        xmduobeilv[4].x=930+20-beilvx-120;
        xmduobeilv[4].y=1015-beilvy+40;
        for(var i=0;i<5;i++){
          this._container.addChild(xmduobeilv[i]);
        }
        
        this._xmduobeilvWin[0].x=630+20-beilvx;
        this._xmduobeilvWin[0].y=1100-beilvy;
        this._xmduobeilvWin[1].x=757+20-beilvx;
        this._xmduobeilvWin[1].y=1218-beilvy;
        this._xmduobeilvWin[2].x=855+20-beilvx;
        this._xmduobeilvWin[2].y=1117-beilvy;
        this._xmduobeilvWin[3].x=955+20-beilvx;
        this._xmduobeilvWin[3].y=1217-beilvy;
        this._xmduobeilvWin[4].x=930+20-beilvx-120;
        this._xmduobeilvWin[4].y=1015-beilvy+40;

        msgBox.anchor.set(0.5);
        /*msgBox.scale.x=3.2;
        msgBox.scale.y=0.9;*/
        msgBox.x = 420;
        msgBox.y = 1120;

        /*var thing=new PIXI.Graphics();
        this._container.addChild(thing);
        thing.beginFill(0xFF700B);
        thing.drawRect(631,900,779,300);
        thing.endFill();
        msgBox.mask=thing;*/
    
        var mobileX=410;
        var mobileY=170;

        wagerText.x = 1200-mobileX;
        wagerText.y = 1015+mobileY;

        setWagerBox.x = 1130-mobileX;
        setWagerBox.y = 1060+mobileY;

        totalWinText.x = 1150-mobileX;
        totalWinText.y = 1150+mobileY;

        totalWinBox.x = 1130-mobileX;
        totalWinBox.y = 1190+mobileY;


        playBtnStar.x = 710+this._xmXM;
        playBtnStar.y = 1510;



    } else {
        fiveStars.x = 550-this._xmX;
        fiveStars.y = 1050;

        xmduobeilv[0].x=630-this._xmX;
        xmduobeilv[0].y=1100;
        xmduobeilv[1].x=757-this._xmX;
        xmduobeilv[1].y=1218;
        xmduobeilv[2].x=855-this._xmX;
        xmduobeilv[2].y=1117;
        xmduobeilv[3].x=955-this._xmX;
        xmduobeilv[3].y=1217;
        xmduobeilv[4].x=930-this._xmX;
        xmduobeilv[4].y=1015;
        for(var i=0;i<5;i++){
          this._container.addChild(xmduobeilv[i]);
        }

        this._xmduobeilvWin[0].x=630-this._xmX;
        this._xmduobeilvWin[0].y=1100;
        this._xmduobeilvWin[1].x=757-this._xmX;
        this._xmduobeilvWin[1].y=1218;
        this._xmduobeilvWin[2].x=855-this._xmX;
        this._xmduobeilvWin[2].y=1117;
        this._xmduobeilvWin[3].x=955-this._xmX;
        this._xmduobeilvWin[3].y=1217;
        this._xmduobeilvWin[4].x=930-this._xmX;
        this._xmduobeilvWin[4].y=1015;

        msgBox.anchor.set(0.5);
        /*msgBox.scale.x=3.2;
        msgBox.scale.y=0.9;*/
        msgBox.x = 1020;
        msgBox.y = 950;
        /*msgBox.x = 420;
        msgBox.y = 1120;*/

        /*var thing=new PIXI.Graphics();
        this._container.addChild(thing);
        thing.beginFill(0xFF700B);
        thing.drawRect(631,900,779,300);
        thing.endFill();
        msgBox.mask=thing;*/
    

        wagerText.x = 1200-this._xmX;
        wagerText.y = 1015;

        setWagerBox.x = 1130-this._xmX;
        setWagerBox.y = 1060;

        totalWinText.x = 1150-this._xmX;
        totalWinText.y = 1150;

        totalWinBox.x = 1130-this._xmX;
        totalWinBox.y = 1190;


        playBtnStar.x = 1420;
        playBtnStar.y = 960;

    }

    for(var i=0;i<6;i++){
      this._zuobox[i] = new Sprite(TextureCache['payout_hilite.png']);
      this._zuobox[i].anchor.set(0.5);
      //this._zuobox[i].alpha=0.5;
      this._zuobox[i].visible=false;
      if(xqu.config.IsMobile()){
        this._zuobox[i].x=497;
      }else{
        this._zuobox[i].x=490;
      }
    }
    if(xqu.config.IsMobile()){
      var zuoboxY=985;
      this._zuobox[0].y=683+zuoboxY;
      this._zuobox[1].y=683-this._zuobox[0].getBounds().height+8+zuoboxY;
      this._zuobox[2].y=683-2*this._zuobox[0].getBounds().height+14+zuoboxY;
      this._zuobox[3].y=683-3*this._zuobox[0].getBounds().height+20+zuoboxY;
      this._zuobox[4].y=683-4*this._zuobox[0].getBounds().height+26+zuoboxY;
      this._zuobox[5].y=683-5*this._zuobox[0].getBounds().height+32+zuoboxY;
    }else{
      this._zuobox[0].y=683;
      this._zuobox[1].y=683-this._zuobox[0].getBounds().height+8;
      this._zuobox[2].y=683-2*this._zuobox[0].getBounds().height+14;
      this._zuobox[3].y=683-3*this._zuobox[0].getBounds().height+20;
      this._zuobox[4].y=683-4*this._zuobox[0].getBounds().height+26;
      this._zuobox[5].y=683-5*this._zuobox[0].getBounds().height+32;
    }
    
    for(var i=0;i<7;i++){
      this._youbox[i] = new Sprite(TextureCache['payout_hilite.png']);
      this._youbox[i].anchor.set(0.5);
      //this._youbox[i].alpha=0.5;
      this._youbox[i].visible=false;
      if(xqu.config.IsMobile()){
        this._youbox[i].x=167;
      }else{
        this._youbox[i].x=1550;
      }
    }
    if(xqu.config.IsMobile()){
      var youboxY=985;
      this._youbox[0].y=690-4+youboxY;
      this._youbox[1].y=690-this._youbox[0].getBounds().height+15+youboxY;
      this._youbox[2].y=690-2*this._youbox[0].getBounds().height+32+youboxY;
      this._youbox[3].y=690-3*this._youbox[0].getBounds().height+48+youboxY;
      this._youbox[4].y=690-4*this._youbox[0].getBounds().height+62+youboxY;
      this._youbox[5].y=690-5*this._youbox[0].getBounds().height+80+youboxY;
      this._youbox[6].y=690-6*this._youbox[0].getBounds().height+100+youboxY;
    }else{
      this._youbox[0].y=690-4;
      this._youbox[1].y=690-this._youbox[0].getBounds().height+15;
      this._youbox[2].y=690-2*this._youbox[0].getBounds().height+32;
      this._youbox[3].y=690-3*this._youbox[0].getBounds().height+48;
      this._youbox[4].y=690-4*this._youbox[0].getBounds().height+62;
      this._youbox[5].y=690-5*this._youbox[0].getBounds().height+80;
      this._youbox[6].y=690-6*this._youbox[0].getBounds().height+100;
    }

    this._container.addChild(fiveStars);

    this._container.addChild(msgBox);
    this._container.addChild(wagerText);
    this._container.addChild(totalWinText);
    this._container.addChild(setWagerBox);
    this._container.addChild(totalWinBox);
    this._container.addChild(playBtnStar);
};

InGameScene.prototype._createButtonGroup = function() {
    var self = this;

    var buttonPositionX = 0;
    var buttonPositionY = 0;

    if (xqu.config.IsMobile()) {
      buttonPositionX = 870;
      buttonPositionY = 1700;
    }else{
      buttonPositionX = 1570;
      buttonPositionY = 1150;
    }

    for(var i=0;i<80;i++){
      this._unselectBG[i] = new xqu.pixi.SimpleButton("num_button",
        TextureCache['num_bg_purple.png'],
        TextureCache['num_bg_purple.png'],
        TextureCache['num_bg_purple.png']);
      if(xqu.config.IsMobile()){
        this._unselectBG[i].setPosition(this._unselectBGX+(i%10)*105, this._unselectBGY+Math.floor(i/10)*105);
      }else{
        this._unselectBG[i].setPosition(this._unselectBGX+(i%10)*81, this._unselectBGY+Math.floor(i/10)*81);
      }
      this._unselectBG[i].index=i;
      this._unselectBG[i].getTransform();
      if(xqu.config.IsMobile()){
        this._unselectBG[i].setScale(1.3,1.3);
      }else{
      }
      //this._unselectBG[i].setVisible(false);
      this._container.addChild(this._unselectBG[i].getTransform());
      this._unselectBG[i].addEventListener('click', new xqu.Callback(self._onClickNumBtn, self));
    }

    for(var i=0;i<80;i++){
      this._selectBG[i] = new xqu.pixi.SimpleButton("num_button",
        TextureCache['num_bg_red.png'],
        TextureCache['num_bg_red.png'],
        TextureCache['num_bg_red.png']);
      if(xqu.config.IsMobile()){
        this._selectBG[i].setPosition(this._unselectBGX+(i%10)*105, this._unselectBGY+Math.floor(i/10)*105);
      }else{
        this._selectBG[i].setPosition(this._unselectBGX+(i%10)*81, this._unselectBGY+Math.floor(i/10)*81);
      }
      this._selectBG[i].index=i;
      this._selectBG[i].getTransform();
      if(xqu.config.IsMobile()){
        this._selectBG[i].setScale(1.3,1.3);
      }else{
      }
      this._selectBG[i].setVisible(false);
      this._container.addChild(this._selectBG[i].getTransform());
      this._selectBG[i].addEventListener('click', new xqu.Callback(self._onClickNumDownBtn, self));
    }

    for(var i=0;i<80;i++){
      this._unselectBall[i] = new Sprite(TextureCache['ball_purple.png']);
      this._unselectBall[i].anchor.set(0.5);
      if(xqu.config.IsMobile()){
        this._unselectBall[i].scale.x=1.3;
        this._unselectBall[i].scale.y=1.3;
        this._unselectBall[i].x=this._unselectBGX+3.5+(i%10)*105;
        this._unselectBall[i].y=this._unselectBGY+6+Math.floor(i/10)*105;
      }else{
        this._unselectBall[i].x=this._unselectBGX+3.5+(i%10)*81;
        this._unselectBall[i].y=this._unselectBGY+6+Math.floor(i/10)*81;
      }
      this._unselectBall[i].visible=false;
      this._container.addChild(this._unselectBall[i]);
    }
      
    for(var i=0;i<80;i++){
      this._selectBall[i] = new Sprite(TextureCache['newBalls_green.png']);
      this._selectBall[i].anchor.set(0.5);
      if(xqu.config.IsMobile()){
        this._selectBall[i].scale.x=1.3;
        this._selectBall[i].scale.y=1.3;
        this._selectBall[i].x=this._unselectBGX+3.5+(i%10)*105;
        this._selectBall[i].y=this._unselectBGY+6+Math.floor(i/10)*105;
      }else{
        this._selectBall[i].x=this._unselectBGX+3.5+(i%10)*81;
        this._selectBall[i].y=this._unselectBGY+6+Math.floor(i/10)*81;
      }
      this._selectBall[i].visible=false;
      this._container.addChild(this._selectBall[i]);
    }


    for(var i=0;i<5;i++){
      this._starOverBall[i] = new Sprite(TextureCache['star_forSlot.png']);
      this._starOverBall[i].anchor.set(0.5);
      this._starOverBall[i].scale.set(0.1);
      this._starOverBall[i].visible=false;
      this._starOverBall[i].x=-100;
      this._starOverBall[i].y=-100;
      /*this._starOverBall[i].x=this._unselectBGX+25;
      this._starOverBall[i].y=this._unselectBGY-25;*/

      // Play Btn Emitter
    }

    /*this._unselectBGtest = new xqu.pixi.SimpleButton("num_button",
      TextureCache['num_bg_purple.png'],
      TextureCache['num_bg_purple.png'],
      TextureCache['num_bg_purple.png']);
    this._unselectBGtest.setPosition(655, 275);
    this._container.addChild(this._unselectBGtest.getTransform());
    this._unselectBGtest.addEventListener('click', new xqu.Callback(self._onClickNumBtn, self));*/

    //wager btn up
    this._wagerIncBtn = new xqu.pixi.SimpleButton("wagerInc_button",
        TextureCache['btn_wagerUp.png'],
        TextureCache['btn_wagerUp.png'],
        TextureCache['btn_wagerUp.png']);
    //this._wagerIncBtn.anchor.set(0.5);
    if(xqu.config.IsMobile()){
      this._wagerIncBtn.setPosition(995, 1270);
    }else{
      this._wagerIncBtn.setPosition(1405-this._xmX, 1095);
    }
    this._container.addChild(this._wagerIncBtn.getTransform());
    this._wagerIncBtn.addEventListener('click', new xqu.Callback(self._onClickWagerIncBtn, self));
    
    //wager btn down
    this._wagerDecBtn = new xqu.pixi.SimpleButton("wagerDec_button",
        TextureCache['btn_wagerDown.png'],
        TextureCache['btn_wagerDown.png'],
        TextureCache['btn_wagerDown.png']);
    this._wagerDecBtn.setScale(2,2);
    if(xqu.config.IsMobile()){
      this._wagerDecBtn.setPosition(725, 1270);
    }else{
      this._wagerDecBtn.setPosition(1145-this._xmX, 1095);
    }
    this._container.addChild(this._wagerDecBtn.getTransform());
    this._wagerDecBtn.addEventListener('click', new xqu.Callback(self._onClickWagerDecBtn, self));
    this._wagerDecBtn.setEnable(false);

    //clear all
    this._clearAll = new xqu.pixi.SimpleButton("clearall_button",
        TextureCache['clearAll_unroll.png'],
        TextureCache['clearAll_press.png'],
        TextureCache['clearAll_roll.png']);
    this._clearAll.setPosition(buttonPositionX, buttonPositionY-200);
    this._clearAll.setEnable(false);
    this._container.addChild(this._clearAll.getTransform());
    this._clearAll.addEventListener('click', new xqu.Callback(self._onClickclearAllBtn, self));
    
    //autopick
    this._autoPick = new xqu.pixi.SimpleButton("autopick_button",
        TextureCache['autoPick_unroll.png'],
        TextureCache['autoPick_press.png'],
        TextureCache['autoPick_Roll.png']);
    if(xqu.config.IsMobile()){
      this._autoPick.setPosition(buttonPositionX+this._xmXM, buttonPositionY);
    }else{
      this._autoPick.setPosition(buttonPositionX, buttonPositionY);
    }
    this._container.addChild(this._autoPick.getTransform());
    this._autoPick.addEventListener('click', new xqu.Callback(self._onClickautoPickBtn, self));

    // Play Btn
    this._playBtn = new xqu.pixi.SimpleButton("play_button",
        TextureCache['btn_play_unroll.png'],
        TextureCache['btn_play_press.png'],
        TextureCache['btn_play_roll.png']);
    if(xqu.config.IsMobile()){
      this._playBtn.setPosition(buttonPositionX+this._xmXM, buttonPositionY);
    }else{
      this._playBtn.setPosition(buttonPositionX, buttonPositionY);
    }
    this._playBtn.setVisible(false);
    this._container.addChild(this._playBtn.getTransform());
    this._playBtn.addEventListener('click', new xqu.Callback(self._onClickPlayBtn, self));


    this._autoPlayBtn = new xqu.pixi.SimpleButton("autoPlay_button",
        TextureCache['btn_autoPlay_unroll.png'],
        TextureCache['btn_autoplay_press.png'],
        TextureCache['btn_autoPlay_roll.png']);
    if(xqu.config.IsMobile()){
      this._autoPlayBtn.setPosition(buttonPositionX-215+this._xmXM, buttonPositionY);
    }else{
      this._autoPlayBtn.setPosition(buttonPositionX-215, buttonPositionY);
    }
    this._autoPlayBtn.setVisible(true);
    this._autoPlayBtn.setEnable(false);
    this._container.addChild(this._autoPlayBtn.getTransform());
    this._autoPlayBtn.addEventListener('click', new xqu.Callback(self._onClickAutoPlayBtn, self));



    this._againBtnEmitter = new AgainButtonEmitter();
    this._container.addChildAt(self._againBtnEmitter.getTransform(), this._container.getChildIndex(self._playBtn.getTransform()));
    if(xqu.config.IsMobile()){
      this._againBtnEmitter.getTransform().position.x = buttonPositionX+10+this._xmXM;
    }else{
      this._againBtnEmitter.getTransform().position.x = buttonPositionX+10;
    }
    this._againBtnEmitter.getTransform().position.y = buttonPositionY;
    this._againBtnEmitter.disable();

    //help Btn
    this._helpBtn = new xqu.pixi.SimpleButton("help_button",
        TextureCache['btn_info_unroll.png'],
        TextureCache['btn_info_unroll.png'],
        TextureCache['btn_info_unroll.png']);
    if(xqu.config.IsMobile()){
      this._helpBtn.setPosition(955, 1123);
    }else{
      this._helpBtn.setPosition(400, 950);
    }
    this._helpBtn.addEventListener('click', new xqu.Callback(self._onClickHelpBtn, self));
    this._container.addChild(this._helpBtn.getTransform());


    // reveal Btn
    this._revealBtn = new xqu.pixi.SimpleButton("reveal_button",
        TextureCache['revealAll.png'],
        TextureCache['revealAllPress.png'],
        TextureCache['revealAllRoll.png']);
    if(xqu.config.IsMobile()){
      this._revealBtn.setPosition(buttonPositionX+this._xmXM, buttonPositionY);
    }else{
      this._revealBtn.setPosition(buttonPositionX, buttonPositionY);
    }
    this._revealBtn.setVisible(false);
    this._container.addChild(this._revealBtn.getTransform());
    this._revealBtn.addEventListener('click', new xqu.Callback(self._onClickRevealBtn, self));

    // Play again Btn
    this._playAgainBtn = new xqu.pixi.SimpleButton("playagain_button",
        TextureCache['btn_playAgain_unroll.png'],
        TextureCache['btn_playAgain_press.png'],
        TextureCache['btn_playAgain_roll.png']);
    if(xqu.config.IsMobile()){
      this._playAgainBtn.setPosition(buttonPositionX+this._xmXM, buttonPositionY);
    }else{
      this._playAgainBtn.setPosition(buttonPositionX, buttonPositionY);
    }
    this._playAgainBtn.setVisible(false);
    this._container.addChild(this._playAgainBtn.getTransform());
    this._playAgainBtn.addEventListener('click', new xqu.Callback(self._onClickplayAgainBtn, self));


    

  
    /*this._staremitter = new PlayButtonEmitter();
    this._container.addChild(this._staremitter.getTransform());
    this._staremitter.enable();*/
    



    //this._playButtonGroup.push(this._playBtn);
    //this._playButtonGroup.push(this._turboBtn);
    //this._playButtonGroup.push(this._playAgainBtn);
}


/*InGameScene.prototype._kaishiClick = function(e) {
    var self = this;
    // xqu.log("click play btn  on ingame Screen");
    //xqu.audio.playEffect('Snd_Play_Button');
    this._playBtn
}*/

InGameScene.prototype._createNumberBoard = function() {
    this._numberBoard = new NumberBoard(this);

    this._numberBoard.getTransform().x = xqu.config.SCREEN_CENTER_X - this._numberBoard.getTransform().width / 2;
    this._numberBoard.getTransform().y = this._logo.height+30;

    this._container.addChild(this._numberBoard.getTransform());
    
    //this._numberBoard._bg.visible=false;
};


InGameScene.prototype._createJackpotPannel = function() {
    this._jackpotPannel = new JackpotPannel(this);
    this._container.addChild(this._jackpotPannel.getTransform());

    if(xqu.config.IsMobile()){
      this._jackpotPannel.getTransform().x = 370;
      this._jackpotPannel.getTransform().y = this._logo.height+1000;
    }else{
      this._jackpotPannel.getTransform().x = 380 - 20;
      this._jackpotPannel.getTransform().y = this._logo.height+30;
    }
};

InGameScene.prototype._createPayoutPannel = function() {
    this._payoutPannel = new PayoutPannel(this);
    this._container.addChild(this._payoutPannel.getTransform());

    if(xqu.config.IsMobile()){
      this._payoutPannel.getTransform().x = 40;
      this._payoutPannel.getTransform().y = this._logo.height+1000;
    }else{
      this._payoutPannel.getTransform().x = 1405 + 20;
      this._payoutPannel.getTransform().y = this._logo.height+30;
    }
};

InGameScene.prototype._createFontPannel = function() {
    var self=this;

    for(var i=0;i<80;i++){
      this._unselectFont[i] = new PIXI.BitmapText(''+(i+1).toString(), { fontName: "unselectPink", fontSize: 33, align: 'center' });
      this._unselectFont[i].anchor.set(0.5);
      var qidianx=653;
      var qidiany=255;
      if(xqu.config.IsMobile()){
        qidianx=72;
        qidiany=252;
        this._unselectFont[i].scale.x=1.3;
        this._unselectFont[i].scale.y=1.3;
        this._unselectFont[i].x=qidianx+(i%10)*105;
        this._unselectFont[i].y=qidiany+Math.floor(i/10)*105;
      }else{
        this._unselectFont[i].x=qidianx+(i%10)*81;
        this._unselectFont[i].y=qidiany+Math.floor(i/10)*81;
      }
      this._container.addChild(this._unselectFont[i]);

      qidianx=653;
      qidiany=255;
      this._selectFont[i] = new PIXI.BitmapText(''+(i+1).toString(), { fontName: "payoutWhiteWinSlot", fontSize: 33, align: 'center' });
      this._selectFont[i].anchor.set(0.5);
      if(xqu.config.IsMobile()){
        qidianx=72;
        qidiany=252;
        this._selectFont[i].scale.x=1.3;
        this._selectFont[i].scale.y=1.3;
        this._selectFont[i].x=qidianx+(i%10)*105;
        this._selectFont[i].y=qidiany+Math.floor(i/10)*105+10;
        this._selectFont[i].visible=false;
      }else{
        this._selectFont[i].x=qidianx+(i%10)*81;
        this._selectFont[i].y=qidiany+Math.floor(i/10)*81+10;
        this._selectFont[i].visible=false;
      }
      this._container.addChild(this._selectFont[i]);
    }

    for(var i=0;i<80;i++){
      this._fireBall[i] = new Sprite(TextureCache['ball_falling.png']);
      this._fireBall[i].anchor.set(0.5);
      this._fireBall[i].x=this._fireBallX+(i%10)*81+this._fireBallDis;
      this._fireBall[i].y=this._fireBallY+Math.floor(i/10)*81-this._fireBallDis;
      this._fireBall[i].visible=false;
      this._container.addChild(this._fireBall[i]);
    }




    var jackpotNum=[];
    var jackpotSize=23;
    var jackpotwinSize=23;
    
    jackpotNum[0] = new PIXI.BitmapText('$0.25', { fontName: "payoutPurple", fontSize: jackpotSize, align: 'center' });
    jackpotNum[1] = new PIXI.BitmapText('$0.50', { fontName: "payoutPurple", fontSize: jackpotSize, align: 'center' });
    /*jackpotNum[2] = new PIXI.BitmapText('$1.00', { fontName: "payoutPurple", fontSize: jackpotSize, align: 'center' });
    jackpotNum[3] = new PIXI.BitmapText('$2.00', { fontName: "payoutPurple", fontSize: jackpotSize, align: 'center' });
    jackpotNum[4] = new PIXI.BitmapText('$3.00', { fontName: "payoutPurple", fontSize: jackpotSize, align: 'center' });
    jackpotNum[5] = new PIXI.BitmapText('$5.00', { fontName: "payoutPurple", fontSize: jackpotSize, align: 'center' });*/
    jackpotNum[2] = new PIXI.BitmapText('$1', { fontName: "payoutPurple", fontSize: jackpotSize, align: 'center' });
    jackpotNum[3] = new PIXI.BitmapText('$2', { fontName: "payoutPurple", fontSize: jackpotSize, align: 'center' });
    jackpotNum[4] = new PIXI.BitmapText('$3', { fontName: "payoutPurple", fontSize: jackpotSize, align: 'center' });
    jackpotNum[5] = new PIXI.BitmapText('$5', { fontName: "payoutPurple", fontSize: jackpotSize, align: 'center' });
    for(var i=0;i<6;i++){
      jackpotNum[i].anchor.set(0);
      if(xqu.config.IsMobile()){
        jackpotNum[i].x=390;
        jackpotNum[i].y=648-i*65+985;
      }else{
        jackpotNum[i].x=375;
        jackpotNum[i].y=648-i*65;
      }
      this._container.addChild(jackpotNum[i]);
    }




    this._jackpotWinNum=[]
    this._jackpotWinNum[0] = new PIXI.BitmapText('$125.00', { fontName: "payoutWin", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinNum[1] = new PIXI.BitmapText('$250.00', { fontName: "payoutWin", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinNum[2] = new PIXI.BitmapText('$500.00', { fontName: "payoutWin", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinNum[3] = new PIXI.BitmapText('$900.00', { fontName: "payoutWin", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinNum[4] = new PIXI.BitmapText('$1,500.00', { fontName: "payoutWin", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinNum[5] = new PIXI.BitmapText('$2,200.00', { fontName: "payoutWin", fontSize: jackpotwinSize, align: 'center' });
    /*this._jackpotWinNum[2] = new PIXI.BitmapText('$500', { fontName: "payoutWin", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinNum[3] = new PIXI.BitmapText('$900', { fontName: "payoutWin", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinNum[4] = new PIXI.BitmapText('$1,500', { fontName: "payoutWin", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinNum[5] = new PIXI.BitmapText('$2,200', { fontName: "payoutWin", fontSize: jackpotwinSize, align: 'center' });*/
    for(var i=0;i<6;i++){
      this._jackpotWinNum[i].anchor.set(1);
      if(xqu.config.IsMobile()){
        this._jackpotWinNum[i].x=617;
        this._jackpotWinNum[i].y=693-i*65+985;
      }else{
        this._jackpotWinNum[i].x=602;
        this._jackpotWinNum[i].y=693-i*65;
      }
      this._container.addChild(this._jackpotWinNum[i]);
    }

    var payoutNum=[];
    payoutNum[0] = new PIXI.BitmapText('0', { fontName: "payoutPurple", fontSize: 30, align: 'center' });
    payoutNum[1] = new PIXI.BitmapText('5', { fontName: "payoutPurple", fontSize: 30, align: 'center' });
    payoutNum[2] = new PIXI.BitmapText('6', { fontName: "payoutPurple", fontSize: 30, align: 'center' });
    payoutNum[3] = new PIXI.BitmapText('7', { fontName: "payoutPurple", fontSize: 30, align: 'center' });
    payoutNum[4] = new PIXI.BitmapText('8', { fontName: "payoutPurple", fontSize: 30, align: 'center' });
    payoutNum[5] = new PIXI.BitmapText('9', { fontName: "payoutPurple", fontSize: 30, align: 'center' });
    payoutNum[6] = new PIXI.BitmapText('10', { fontName: "payoutPurple", fontSize: 30, align: 'center' });
    for(var i=0;i<7;i++){
      payoutNum[i].anchor.set(0);
      if(xqu.config.IsMobile()){
        payoutNum[i].x=70;
        payoutNum[i].y=1630-i*55;
      }else{
        payoutNum[i].x=1485-32;
        payoutNum[i].y=645-i*55;
      }
      this._container.addChild(payoutNum[i]);
    }
    
    for(var i=0;i<7;i++){
      this._payoutInit[i] = new PIXI.BitmapText('$0.00', { fontName: "payoutWin", fontSize: 30, align: 'center' });
      this._payoutInit[i].anchor.set(1);
      if(xqu.config.IsMobile()){
        this._payoutInit[i].x=273;
        this._payoutInit[i].y=1685-i*55;
      }else{
        this._payoutInit[i].x=1650;
        this._payoutInit[i].y=702-i*55;
      }
      this._payoutInit[i].visible=false;
      this._container.addChild(this._payoutInit[i]);
    }

    var qianmiandaxiao=27;
    this._payoutWin[0][0] = new PIXI.BitmapText('$0.5', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[0][1] = new PIXI.BitmapText('$0.25', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[0][2] = new PIXI.BitmapText('$0.50', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[0][3] = new PIXI.BitmapText('$1.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[0][4] = new PIXI.BitmapText('$2.50', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[0][5] = new PIXI.BitmapText('$10.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[0][6] = new PIXI.BitmapText('$20.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });

    this._payoutWin[1][0] = new PIXI.BitmapText('$1.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[1][1] = new PIXI.BitmapText('$0.50', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[1][2] = new PIXI.BitmapText('$1.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[1][3] = new PIXI.BitmapText('$2.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[1][4] = new PIXI.BitmapText('$5.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[1][5] = new PIXI.BitmapText('$20.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[1][6] = new PIXI.BitmapText('$40.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });

    this._payoutWin[2][0] = new PIXI.BitmapText('$2.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[2][1] = new PIXI.BitmapText('$1.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[2][2] = new PIXI.BitmapText('$2.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[2][3] = new PIXI.BitmapText('$4.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[2][4] = new PIXI.BitmapText('$10.50', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[2][5] = new PIXI.BitmapText('$40.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });
    this._payoutWin[2][6] = new PIXI.BitmapText('$80.00', { fontName: "payoutWin", fontSize: qianmiandaxiao, align: 'center' });

    var sanweidaxiao=27;
    this._payoutWin[3][0] = new PIXI.BitmapText('$4.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[3][1] = new PIXI.BitmapText('$2.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[3][2] = new PIXI.BitmapText('$4.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[3][3] = new PIXI.BitmapText('$8.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[3][4] = new PIXI.BitmapText('$20.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[3][5] = new PIXI.BitmapText('$80.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[3][6] = new PIXI.BitmapText('$160.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });

    this._payoutWin[4][0] = new PIXI.BitmapText('$6.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[4][1] = new PIXI.BitmapText('$3.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[4][2] = new PIXI.BitmapText('$6.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[4][3] = new PIXI.BitmapText('$12.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[4][4] = new PIXI.BitmapText('$30.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[4][5] = new PIXI.BitmapText('$120.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[4][6] = new PIXI.BitmapText('$240.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });

    this._payoutWin[5][0] = new PIXI.BitmapText('$10.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[5][1] = new PIXI.BitmapText('$5.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[5][2] = new PIXI.BitmapText('$10.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[5][3] = new PIXI.BitmapText('$20.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[5][4] = new PIXI.BitmapText('$50.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[5][5] = new PIXI.BitmapText('$200.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWin[5][6] = new PIXI.BitmapText('$400.00', { fontName: "payoutWin", fontSize: sanweidaxiao, align: 'center' });

    for(var i=0;i<6;i++){
      for(var j=0;j<7;j++){
        this._payoutWin[i][j].anchor.set(1);
        if(xqu.config.IsMobile()){
          this._payoutWin[i][j].x=273;
          this._payoutWin[i][j].y=1685-j*55;
        }else{
          this._payoutWin[i][j].x=1650;
          this._payoutWin[i][j].y=700-j*55;
        }
        if(i>0){
          this._payoutWin[i][j].visible=false;
        }
        this._container.addChild(this._payoutWin[i][j]);
      }
    }

    for(var i=0;i<6;i++){
      this._container.addChild(this._zuobox[i]);
    }
    for(var i=0;i<7;i++){
      this._container.addChild(this._youbox[i]);
    }

    this._jackpotWinSlot=[];
    this._jackpotWinSlot[0] = new PIXI.BitmapText('$0.25', { fontName: "payoutWhiteWinPrice", fontSize: jackpotSize, align: 'center' });
    this._jackpotWinSlot[1] = new PIXI.BitmapText('$0.50', { fontName: "payoutWhiteWinPrice", fontSize: jackpotSize, align: 'center' });
    /*this._jackpotWinSlot[2] = new PIXI.BitmapText('$1.00', { fontName: "payoutWhiteWinPrice", fontSize: jackpotSize, align: 'center' });
    this._jackpotWinSlot[3] = new PIXI.BitmapText('$2.00', { fontName: "payoutWhiteWinPrice", fontSize: jackpotSize, align: 'center' });
    this._jackpotWinSlot[4] = new PIXI.BitmapText('$3.00', { fontName: "payoutWhiteWinPrice", fontSize: jackpotSize, align: 'center' });
    this._jackpotWinSlot[5] = new PIXI.BitmapText('$5.00', { fontName: "payoutWhiteWinPrice", fontSize: jackpotSize, align: 'center' });*/
    this._jackpotWinSlot[2] = new PIXI.BitmapText('$1', { fontName: "payoutWhiteWinPrice", fontSize: jackpotSize, align: 'center' });
    this._jackpotWinSlot[3] = new PIXI.BitmapText('$2', { fontName: "payoutWhiteWinPrice", fontSize: jackpotSize, align: 'center' });
    this._jackpotWinSlot[4] = new PIXI.BitmapText('$3', { fontName: "payoutWhiteWinPrice", fontSize: jackpotSize, align: 'center' });
    this._jackpotWinSlot[5] = new PIXI.BitmapText('$5', { fontName: "payoutWhiteWinPrice", fontSize: jackpotSize, align: 'center' });
    for(var i=0;i<6;i++){
      this._jackpotWinSlot[i].anchor.set(0);
      if(xqu.config.IsMobile()){
        this._jackpotWinSlot[i].x=385;
        this._jackpotWinSlot[i].y=652-i*65+985;
      }else{
        this._jackpotWinSlot[i].x=370;
        this._jackpotWinSlot[i].y=652-i*65;
      }
      this._jackpotWinSlot[i].visible=false;
      this._container.addChild(this._jackpotWinSlot[i]);
    }

    this._jackpotWinPrice=[];
    this._jackpotWinPrice[0] = new PIXI.BitmapText('$125.00', { fontName: "payoutWhiteWinPrice", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinPrice[1] = new PIXI.BitmapText('$250.00', { fontName: "payoutWhiteWinPrice", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinPrice[2] = new PIXI.BitmapText('$500.00', { fontName: "payoutWhiteWinPrice", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinPrice[3] = new PIXI.BitmapText('$900.00', { fontName: "payoutWhiteWinPrice", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinPrice[4] = new PIXI.BitmapText('$1,500.00', { fontName: "payoutWhiteWinPrice", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinPrice[5] = new PIXI.BitmapText('$2,200.00', { fontName: "payoutWhiteWinPrice", fontSize: jackpotwinSize, align: 'center' });
    /*this._jackpotWinPrice[2] = new PIXI.BitmapText('$500', { fontName: "payoutWhiteWinPrice", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinPrice[3] = new PIXI.BitmapText('$900', { fontName: "payoutWhiteWinPrice", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinPrice[4] = new PIXI.BitmapText('$1,500', { fontName: "payoutWhiteWinPrice", fontSize: jackpotwinSize, align: 'center' });
    this._jackpotWinPrice[5] = new PIXI.BitmapText('$2,200', { fontName: "payoutWhiteWinPrice", fontSize: jackpotwinSize, align: 'center' });*/
    for(var i=0;i<6;i++){
      this._jackpotWinPrice[i].anchor.set(1);
      if(xqu.config.IsMobile()){
        this._jackpotWinPrice[i].x=615;
        this._jackpotWinPrice[i].y=696-i*65+985;
      }else{
        this._jackpotWinPrice[i].x=599;
        this._jackpotWinPrice[i].y=696-i*65;
      }
      this._jackpotWinPrice[i].visible=false;
      this._container.addChild(this._jackpotWinPrice[i]);
    }


    this._payoutWhiteWinSlot[0] = new PIXI.BitmapText('0', { fontName: "payoutWhiteWinSlot", fontSize: 30, align: 'center' });
    this._payoutWhiteWinSlot[1] = new PIXI.BitmapText('5', { fontName: "payoutWhiteWinSlot", fontSize: 30, align: 'center' });
    this._payoutWhiteWinSlot[2] = new PIXI.BitmapText('6', { fontName: "payoutWhiteWinSlot", fontSize: 30, align: 'center' });
    this._payoutWhiteWinSlot[3] = new PIXI.BitmapText('7', { fontName: "payoutWhiteWinSlot", fontSize: 30, align: 'center' });
    this._payoutWhiteWinSlot[4] = new PIXI.BitmapText('8', { fontName: "payoutWhiteWinSlot", fontSize: 30, align: 'center' });
    this._payoutWhiteWinSlot[5] = new PIXI.BitmapText('9', { fontName: "payoutWhiteWinSlot", fontSize: 30, align: 'center' });
    this._payoutWhiteWinSlot[6] = new PIXI.BitmapText('10', { fontName: "payoutWhiteWinSlot", fontSize: 30, align: 'center' });
    for(var i=0;i<7;i++){
      this._payoutWhiteWinSlot[i].anchor.set(0);
      if(xqu.config.IsMobile()){
        this._payoutWhiteWinSlot[i].x=71-7;
        this._payoutWhiteWinSlot[i].y=1635-i*55;
      }else{
        this._payoutWhiteWinSlot[i].x=1486-32;
        this._payoutWhiteWinSlot[i].y=650-i*55;
      }
      this._payoutWhiteWinSlot[i].visible=false;
      this._container.addChild(this._payoutWhiteWinSlot[i]);
    }

    this._payoutWinPrice[0][0] = new PIXI.BitmapText('$0.5', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[0][1] = new PIXI.BitmapText('$0.25', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[0][2] = new PIXI.BitmapText('$0.50', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[0][3] = new PIXI.BitmapText('$1.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[0][4] = new PIXI.BitmapText('$2.50', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[0][5] = new PIXI.BitmapText('$10.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[0][6] = new PIXI.BitmapText('$20.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });

    this._payoutWinPrice[1][0] = new PIXI.BitmapText('$1.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[1][1] = new PIXI.BitmapText('$0.50', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[1][2] = new PIXI.BitmapText('$1.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[1][3] = new PIXI.BitmapText('$2.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[1][4] = new PIXI.BitmapText('$5.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[1][5] = new PIXI.BitmapText('$20.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[1][6] = new PIXI.BitmapText('$40.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });

    this._payoutWinPrice[2][0] = new PIXI.BitmapText('$2.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[2][1] = new PIXI.BitmapText('$1.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[2][2] = new PIXI.BitmapText('$2.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[2][3] = new PIXI.BitmapText('$4.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[2][4] = new PIXI.BitmapText('$10.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[2][5] = new PIXI.BitmapText('$40.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[2][6] = new PIXI.BitmapText('$80.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });

    this._payoutWinPrice[3][0] = new PIXI.BitmapText('$4.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[3][1] = new PIXI.BitmapText('$2.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[3][2] = new PIXI.BitmapText('$4.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[3][3] = new PIXI.BitmapText('$8.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[3][4] = new PIXI.BitmapText('$20.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[3][5] = new PIXI.BitmapText('$80.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[3][6] = new PIXI.BitmapText('$160.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });

    this._payoutWinPrice[4][0] = new PIXI.BitmapText('$6.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[4][1] = new PIXI.BitmapText('$3.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[4][2] = new PIXI.BitmapText('$6.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[4][3] = new PIXI.BitmapText('$12.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[4][4] = new PIXI.BitmapText('$30.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[4][5] = new PIXI.BitmapText('$120.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[4][6] = new PIXI.BitmapText('$240.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });

    this._payoutWinPrice[5][0] = new PIXI.BitmapText('$10.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[5][1] = new PIXI.BitmapText('$5.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[5][2] = new PIXI.BitmapText('$10.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[5][3] = new PIXI.BitmapText('$20.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[5][4] = new PIXI.BitmapText('$50.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[5][5] = new PIXI.BitmapText('$200.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });
    this._payoutWinPrice[5][6] = new PIXI.BitmapText('$400.00', { fontName: "payoutWhiteWinPrice", fontSize: sanweidaxiao, align: 'center' });

    for(var i=0;i<6;i++){
      for(var j=0;j<7;j++){
        this._payoutWinPrice[i][j].anchor.set(1);
        if(xqu.config.IsMobile()){
          this._payoutWinPrice[i][j].x=273;
          this._payoutWinPrice[i][j].y=1689-j*55;
        }else{
          this._payoutWinPrice[i][j].x=1648;
          this._payoutWinPrice[i][j].y=702-j*55;
        }
        this._payoutWinPrice[i][j].visible=false;
        this._container.addChild(this._payoutWinPrice[i][j]);
      }
    }

    var wagerSize=27;
    this._wagerxs[0] = new PIXI.BitmapText('$0.25', { fontName: "setWagerFont", fontSize: wagerSize, align: 'center' });
    this._wagerxs[1] = new PIXI.BitmapText('$0.50', { fontName: "setWagerFont", fontSize: wagerSize, align: 'center' });
    this._wagerxs[2] = new PIXI.BitmapText('$1.00', { fontName: "setWagerFont", fontSize: wagerSize, align: 'center' });
    this._wagerxs[3] = new PIXI.BitmapText('$2.00', { fontName: "setWagerFont", fontSize: wagerSize, align: 'center' });
    this._wagerxs[4] = new PIXI.BitmapText('$3.00', { fontName: "setWagerFont", fontSize: wagerSize, align: 'center' });
    this._wagerxs[5] = new PIXI.BitmapText('$5.00', { fontName: "setWagerFont", fontSize: wagerSize, align: 'center' });
    for(var i=0;i<6;i++){
      this._wagerxs[i].anchor.set(0.5);
        if(xqu.config.IsMobile()){
          this._wagerxs[i].x=860;
          this._wagerxs[i].y=1270;
        }else{
          this._wagerxs[i].x=1274-this._xmX;
          this._wagerxs[i].y=1098;
        }
      if(i>0){
        this._wagerxs[i].visible=false;
      }
      this._container.addChild(this._wagerxs[i]);
    }

    var totalwintextsize=27;
    this._totalWinText = new PIXI.BitmapText('', { fontName: "setWagerFont", fontSize: totalwintextsize, align: 'center' });
    this._totalWinText.anchor.set(0.5);
    if(xqu.config.IsMobile()){
      this._totalWinText.x=860;
      this._totalWinText.y=1400;
    }else{
      this._totalWinText.x=1274-this._xmX;
      this._totalWinText.y=1230;
    }
    this._container.addChild(this._totalWinText);
    // < 10,00(999)  27
    // < 100,000(999,999) 22

    for(var i=0;i<5;i++){
      this._container.addChild(this._xmbaixing[i]);
      this._xmduobeilvWin[i].visible=false;
      this._container.addChild(this._xmduobeilvWin[i]);
    }

    var msgSize=80;
    var msgY=892;
    if(xqu.config.IsMobile()){
      msgY=892+170;
    }else{
    }
    this._msg[0] = new PIXI.BitmapText('Choose 10 Numbers', { fontName: "font_messageWindow", fontSize: msgSize, align: 'center' });
    this._msg[0].anchor.set(0.5);
    this._msg[0].x=this._msgX;
    this._msg[0].y=msgY;
    this._msg[0].visible=true;

    this._msg[1] = new PIXI.BitmapText('Tap PLAY to Start', { fontName: "font_messageWindow", fontSize: msgSize, align: 'center' });
    this._msg[1].anchor.set(0.5);
    this._msg[1].x=this._msgX-700;
    this._msg[1].y=msgY;
    this._msg[1].visible=true;

    this._msg[2] = new PIXI.BitmapText('Good Luck', { fontName: "font_messageWindow", fontSize: msgSize, align: 'center' });
    this._msg[2].anchor.set(0.5);
    this._msg[2].x=this._msgX-700;
    this._msg[2].y=msgY;
    this._msg[2].visible=true;

    this._msg[3] = new PIXI.BitmapText('You Win!', { fontName: "font_messageWindow", fontSize: msgSize, align: 'center' });
    this._msg[3].anchor.set(0.5);
    this._msg[3].x=this._msgX-700;
    this._msg[3].y=msgY;
    this._msg[3].visible=true;

    this._msg[4] = new PIXI.BitmapText('Try Again', { fontName: "font_messageWindow", fontSize: msgSize, align: 'center' });
    this._msg[4].anchor.set(0.5);
    this._msg[4].x=this._msgX-700;
    this._msg[4].y=msgY;
    this._msg[4].visible=true;

    var thing=new PIXI.Graphics();
    this._container.addChild(thing);
    thing.beginFill(0xFF700B);
    if(xqu.config.IsMobile()){
      thing.drawRect(40,1070,775,470);
    }else{
      thing.drawRect(631,900,779,300);
    }
    thing.endFill();
    this._msg[0].mask=thing;
    this._msg[1].mask=thing;
    this._msg[2].mask=thing;
    this._msg[3].mask=thing;
    this._msg[4].mask=thing;
    this._container.addChild(this._msg[0]);
    this._container.addChild(this._msg[1]);
    this._container.addChild(this._msg[2]);
    this._container.addChild(this._msg[3]);
    this._container.addChild(this._msg[4]);

    for(var i=0;i<5;i++){
      this._container.addChild(this._starOverBall[i]);
      this._playBtnEmitter[i] = new PlayButtonEmitter();
      this._container.addChild(this._playBtnEmitter[i].getTransform());
      this._playBtnEmitter[i].visible=false;
    }

}

InGameScene.prototype._onClickNumBtn = function(e) {
  //xqu.audio.playEffect('Snd_Play_Button');
  xqu.log("InGameScene: number button clicked");
  xqu.log("InGameScene: select count =  "+this._selectCount);
  this._clearAll.setEnable(true);

  if(this._selectCount<10){
    this._selectCount++;
    for(var i=0;i<80;i++){
      if(e.target.index==i){
        e.target.setVisible(false);
        e.target.setEnable(false);
        console.log("i ="+i);
        this._unselectFont[i].visible=false;
        this._selectBG[i].setEnable(true);
        this._selectBG[i].setVisible(true);
        this._selectFont[i].visible=true;
      }
    }
  }

  if(this._selectCount==10){
    this._autoPlayBtn.setEnable(true);
    this._autoPick.setVisible(false);
    this._autoPick.setEnable(false);

    if(this._firstRun>0){
      this._playAgainBtn.setVisible(true);
      this._playAgainBtn.setEnable(true);
      this._againBtnEmitter.enable();
      if(xqu.config.IsMobile()){
        this._againBtnEmitter.getTransform().position.y = 1700;
      }else{
        this._againBtnEmitter.getTransform().position.y = 1150;
      }
    }else{
      this._playBtn.setVisible(true);
      this._playBtn.setEnable(true);
      this._againBtnEmitter.enable();
      if(xqu.config.IsMobile()){
        this._againBtnEmitter.getTransform().position.y = 1700;
      }else{
        this._againBtnEmitter.getTransform().position.y = 1150;
      }
    }

    if(!this._ifOverRed){
      if(this._selectCount==10){
        if(this._playTween!=null) this._playTween.kill();
        if(this._msg[1].x==this._msgX){

        }else{
          this._msg[1].x=this._msgX+700;
          this._chooseTween=TweenLite.to(this._msg[0],0.3,{x:this._msgX-700});
          this._playTween=TweenLite.to(this._msg[1],0.3,{x:this._msgX})
        }
      }
      this._ifOverRed=true;
      this._ifOverWhite=false;
    }
  }else{
    this._msg[0].text="Choose "+(10-this._selectCount).toString()+" Numbers";
  }

  for(var i=2;i<this._msg.length;i++){
    TweenLite.to(this._msg[i],0.3,{x:this._msgX-700})
  }

  this._selectNum=[];
  var tindex=0;
  for(var i=0;i<this._selectFont.length;i++){
    if(this._selectFont[i].visible==true){
      this._selectNum[tindex++]=i;
    }
  }

  console.log(this._selectNum);

}

InGameScene.prototype._onClickNumDownBtn = function(e) {
    //xqu.audio.playEffect('Snd_Play_Button');
    xqu.log("InGameScene: number down button clicked");
    this._autoPlayBtn.setEnable(false);
    this._autoPick.setVisible(true);
    this._autoPick.setEnable(true);
    this._playBtn.setVisible(false);
    this._playBtn.setEnable(false);
    this._playAgainBtn.setVisible(false);
    this._playAgainBtn.setEnable(false);
    this._againBtnEmitter.getTransform().position.y=-700;
    this._againBtnEmitter.disable();

    if(!this._ifOverWhite){
      if(this._chooseTween!=null) this._chooseTween.kill();
      this._msg[0].x=this._msgX+700;
      this._playTween=TweenLite.to(this._msg[1],0.3,{x:this._msgX-700});
      this._chooseTween=TweenLite.to(this._msg[0],0.3,{x:this._msgX});
      for(var i=2;i<this._msg.length;i++){
        if(this._msg[i].x>=this._msgX){
          this._msg[i].x=this._msgX;
          TweenLite.to(this._msg[i],0.2,{x:this._msgX-700});
        }
      }
      this._ifOverRed=false;
      this._ifOverWhite=true;
    }
    
    /*if(this._selectCount==10){
      if(this._chooseTween!=null) this._chooseTween.kill();
      if(this._playTween!=null) this._playTween.kill();
      //this._msg[0].x=this._msgX;
      this._msg[0].x=this._msgX+700;
      TweenLite.to(this._msg[0],0.2,{x:this._msgX});
      for(var i=1;i<this._msg.length;i++){
        if(this._msg[i].x>=this._msgX){
          this._msg[i].x=this._msgX;
          TweenLite.to(this._msg[i],0.2,{x:this._msgX-700});
        }
      }
    }*/

    if(this._selectCount>0){
      this._selectCount--;
      for(var i=0;i<80;i++){
        if(e.target.index==i){
          e.target.setVisible(false);
          e.target.setEnable(false);
          console.log("i ="+i);
          this._selectFont[i].visible=false;
          this._unselectBG[i].setVisible(true);
          this._unselectBG[i].setEnable(true);
          this._unselectFont[i].visible=true;
        }
      }
      if(this._selectCount==0){
        this._clearAll.setEnable(false);
      }
    }

    this._msg[0].text="Choose "+(10-this._selectCount).toString()+" Numbers";

  this._selectNum=[];
  var tindex=0;
  for(var i=0;i<this._selectFont.length;i++){
    if(this._selectFont[i].visible==true){
      this._selectNum[tindex++]=i;
    }
  }
  console.log(this._selectNum);
    
};

InGameScene.prototype._onClickWagerIncBtn = function(e) {
    //xqu.audio.playEffect('Snd_Play_Button');
    //xqu.log("InGameScene: wager inc button clicked");
    
    this._wagerUpdate("up");
};

InGameScene.prototype._onClickWagerDecBtn = function(e) {
    //xqu.audio.playEffect('Snd_Play_Button');

    //xqu.log("InGameScene: wager decrease button clicked");

    this._wagerUpdate("down");
};

InGameScene.prototype._wagerUpdate = function(e) {
  if(this._firstRun>0){
    if(this._selectNumTrigger){
      for(var i=0;i<80;i++){
        this._unselectBG[i].setEnable(true);
        this._unselectBG[i].setVisible(true);
        this._unselectFont[i].visible=true;
        this._selectBG[i].setEnable(true);
        this._selectBG[i].setVisible(false);
        this._selectFont[i].visible=false;
        this._unselectBall[i].visible=false;
        this._selectBall[i].visible=false;
      }

      console.log("trigger "+this._selectNumTrigger);
      console.log("selectNum "+this._selectNum);
      for(var i=0;i<this._selectNum.length;i++){
        this._unselectBG[this._selectNum[i]].setVisible(false);
        this._unselectFont[this._selectNum[i]].visible=false;
        this._selectBG[this._selectNum[i]].setVisible(true);
        this._selectFont[this._selectNum[i]].visible=true;
      }

      //this._selectNum=[];
      this._selectNumTrigger=false;
      console.log("trigger "+this._selectNumTrigger);
    }

    this._selectNum=[];
    var tindex=0;
    for(var i=0;i<this._selectFont.length;i++){
      if(this._selectFont[i].visible==true){
        this._selectNum[tindex++]=i;
      }
    }
    //console.log("select num after 1"+this._selectNum);

  }



  for(var i=0;i<this._jackpotWinSlot.length;i++){
    this._jackpotWinSlot[i].visible=false;
    this._jackpotWinPrice[i].visible=false;
    this._zuobox[i].visible=false;
  }

  if(this._jackpotReset>-1){
      this._jackpotWinNum[this._jackpotReset].text=this._sanweiUpdate(this._jackpotListOri[this._jackpotReset]);
      this._jackpotWinPrice[this._jackpotReset].text=this._sanweiUpdate(this._jackpotListOri[this._jackpotReset]);
      this._jackpotList[this._jackpotReset]=this._jackpotListOri[this._jackpotReset];
  }
  this._jackpotReset=-1;


  for(var i=0;i<this._xmbaixing.length;i++){
    this._xmbaixing[i].visible=false;
    this._xmduobeilvWin[i].visible=false;
    /*this._playBtnEmitter[i].getTransform().position.x=-500;
    this._playBtnEmitter[i].getTransform().position.y=-500;*/
    //this._playBtnEmitter[i].enable();
  }

  if(e=='up'){
    //xqu.log("InGameScene: wager increase");
    for(var i=0;i<this._youbox.length;i++){
      this._youbox[i].visible=false;
      this._payoutWhiteWinSlot[i].visible=false;
    }

    this._wagerDecBtn.setEnable(true);
    for(var i=0;i<6;i++){
      for(var j=0;j<this._payoutWinPrice[i].length;j++){
        this._payoutWinPrice[i][j].visible=false;
      }

      if(this._wagerxs[i].visible==true && i!=5){
        this._wagerxs[i].visible=false;
        this._wagerxs[i+1].visible=true;
        if((i+1) ==5){
          this._wagerIncBtn.setEnable(false);
        }
        break;
      }
    }
  }else if(e=='down'){
    //xqu.log("InGameScene: wager decrease");

    this._wagerIncBtn.setEnable(true);
    for(var i=0;i<6;i++){
      if(this._wagerxs[i].visible==true && i!=0){
        this._wagerxs[i].visible=false;
        this._wagerxs[i-1].visible=true;
        if((i-1) ==0){
          this._wagerDecBtn.setEnable(false);
        }
        break;
      }
    }
  }

  for (var i=0;i<6;i++){
    if(this._wagerxs[i].visible==true){
      for(var j=0;j<6;j++){
        for(var k=0;k<7;k++){
          this._payoutWin[j][k].visible=false;
        }
      }
      for(var j=0;j<7;j++){
        this._payoutWin[i][j].visible=true;
      }
    }
  }

  for(var i=0;i<6;i++){
    if(this._wagerxs[i].visible==true){
      if(i==0){
        ApiConnector.UpdateWager(25);
        this._curWager=0.25;
      }else if(i==1){
        ApiConnector.UpdateWager(50);
        this._curWager=0.50;
      }else if(i==2){
        ApiConnector.UpdateWager(100);
        this._curWager=1;
      }else if(i==3){
        ApiConnector.UpdateWager(200);
        this._curWager=2;
      }else if(i==4){
        ApiConnector.UpdateWager(300);
        this._curWager=3;
      }else if(i==5){
        ApiConnector.UpdateWager(500);
        this._curWager=5;
      }
    }
  }

  xqu.log("InGameScene: wager text update");


}

InGameScene.prototype._onClickclearAllBtn = function(e) {
    //xqu.audio.playEffect('Snd_Play_Button');
    xqu.log("InGameScene: clear all  button clicked");

    if(this._jackpotReset>-1){
      this._jackpotWinNum[this._jackpotReset].text=this._sanweiUpdate(this._jackpotListOri[this._jackpotReset]);
      this._jackpotWinPrice[this._jackpotReset].text=this._sanweiUpdate(this._jackpotListOri[this._jackpotReset]);
      this._jackpotList[this._jackpotReset]=this._jackpotListOri[this._jackpotReset];
    }
    this._autoPlayBtn.setEnable(false);
    this._jackpotReset=-1;
    this._ifJack=false;
    this._totalWin=0;
    this._totalWinText.text='';
    this._selectNum=[];
    this._selectCount=0;
    this._autoPick.setEnable(true);
    this._autoPick.setVisible(true);
    this._playBtn.setEnable(false);
    this._playBtn.setVisible(false);
    this._clearAll.setEnable(false);
    this._againBtnEmitter.disable();
    this._againBtnEmitter.getTransform().position.y=-700;
    this._ifOverRed=false;
    this._ifOverWhite=false;

    for(var i=0;i<this._jackpotWinSlot.length;i++){
      this._jackpotWinSlot[i].visible=false;
      this._jackpotWinPrice[i].visible=false;
      this._zuobox[i].visible=false;
    }

    for(var i=0;i<80;i++){
      this._unselectBG[i].setEnable(true);
      this._unselectBG[i].setVisible(true);
      this._unselectFont[i].visible=true;
      this._selectBG[i].setEnable(false);
      this._selectBG[i].setVisible(false);
      this._selectFont[i].visible=false;
      this._unselectBall[i].visible=false;
      this._selectBall[i].visible=false;
    }

    this._msg[0].text="Choose 10 numbers";
    if(this._msg[1].x==this._msgX){
      this._msg[0].x=this._msgX+700;
      TweenLite.to(this._msg[0],0.3,{x:this._msgX});
      this._msg[1].x=this._msgX;
      TweenLite.to(this._msg[1],0.3,{x:this._msgX-700});
    }

    if(this._msg[3].x>=this._msgX){
      this._msg[0].x=this._msgX+700;
      TweenLite.to(this._msg[0],0.3,{x:this._msgX});
      TweenLite.to(this._msg[3],0.3,{x:this._msgX-700});
    }

    if(this._msg[4].x>=this._msgX){
      this._msg[0].x=this._msgX+700;
      TweenLite.to(this._msg[0],0.3,{x:this._msgX});
      TweenLite.to(this._msg[4],0.3,{x:this._msgX-700});
    }

    if(this._chooseTween!=null && this._msg[0].x!=this._msgX){
      this._chooseTween=null;
      xqu.log('im here');
      this._msg[0].x=this._msgX+700;
      TweenLite.to(this._msg[0],0.3,{x:this._msgX});
      this._msg[1].x=this._msgX;
      TweenLite.to(this._msg[1],0.3,{x:this._msgX-700});
    }


  if(this._firstRun>0){
    this._firstRun=0;
    this._resList=null;
    this._resList=[];
    for(var i=0;i<20;i++){
      this._resList[i]=new Array();
    }
    for(var i=0;i<this._xmbaixing.length;i++){
      this._xmbaixing[i].visible=false;
      this._xmduobeilvWin[i].visible=false;
      this._starOverBall[i].scale.set(0.1);
      /*this._playBtnEmitter[i].getTransform().position.x=-500;
      this._playBtnEmitter[i].getTransform().position.y=-500;*/
      //this._playBtnEmitter[i].disable();
    }
    for(var i=0;i<this._payoutWhiteWinSlot.length;i++){
      this._payoutWhiteWinSlot[i].visible=false;
      this._youbox[i].visible=false;
    }
    for(var i=0;i<this._payoutWinPrice.length;i++){
      for(var j=0;j<this._payoutWinPrice[i].length;j++){
        this._payoutWinPrice[i][j].visible=false;
      }
    }
    for(var i=0;i<80;i++){
      this._fireBall[i].anchor.set(0.5);
      this._fireBall[i].x=this._fireBallX+(i%10)*81+this._fireBallDis;
      this._fireBall[i].y=this._fireBallY+Math.floor(i/10)*81-this._fireBallDis;
      this._fireBall[i].visible=false;
    }
    this._playAgainBtn.setEnable(false);
    this._playAgainBtn.setVisible(false);
    this._autoPick.setEnable(true);
    this._autoPick.setVisible(true);

  }
};

InGameScene.prototype._onClickautoPickBtn = function(e) {
    var self=this;

    //this._staremitter.anim(1000,1000,200,500,1);


    //xqu.audio.playEffect('Snd_Play_Button');
    xqu.log("InGameScene: auto pick button clicked");
    this._autoPlayBtn.setEnable(true);
    this._againBtnEmitter.enable();
    if(xqu.config.IsMobile()){
      this._againBtnEmitter.getTransform().position.y = 1700;
    }else{
      this._againBtnEmitter.getTransform().position.y = 1150;
    }
    this._autoPick.setVisible(false);
    this._autoPick.setEnable(false);
    this._playBtn.setVisible(true);
    this._playBtn.setEnable(true);
    this._clearAll.setEnable(true);
    this._ifOverRed=false;
    this._ifOverWhite=false;
    
    var index=0;
    var selectLeft=10-this._selectCount;
    var tempA=[];
    for(var i=0;i<80;i++){
      if(this._unselectFont[i].visible==true){
        tempA[index++]=i;
      }
    }
    //xqu.log("tempA "+tempA);
    var res = [];
    for(var i = 0; i < selectLeft; ++i) {
        var random = Math.floor(Math.random() * tempA.length);
        res.push(tempA[random]);
        tempA.splice(random,1);
    }
    //xqu.log("res "+res);
    for(var i=0;i<res.length;i++){
      this._unselectBG[res[i]].setVisible(false);
      this._unselectBG[res[i]].setEnable(false);
      this._unselectFont[res[i]].visible=false;
      this._selectBG[res[i]].setVisible(true);
      this._selectBG[res[i]].setEnable(true);
      this._selectFont[res[i]].visible=true;
    }
    this._selectCount=10;

    this._msg[0].x=this._msgX;
    TweenLite.to(this._msg[0],0.3,{x:this._msgX-700});
    this._msg[1].x=this._msgX+700,
    TweenLite.to(this._msg[1],0.3,{x:this._msgX});
};

InGameScene.prototype._onClickRevealBtn = function(e) {
    //xqu.audio.playEffect('Snd_Play_Button');
    xqu.log("InGameScene: reveal btn clicked");
    //clearTimeout(this._revealTween);
    for(var i=0;i<this._playBtnEmitter.length;i++){
      this._playBtnEmitter[i]._setPos(5000,5000);
      this._playBtnEmitter[i].disable();
      this._playBtnEmitter[i].cleanUp();
    }
    for(var i=0;i<this._showNumTime.length;i++){
      clearTimeout(this._showNumTime[i]);
      xqu.log("InGameScene: reveal clear success");
    }
    this._revealBtn.setEnable(false);

    this._showResAfterClearTimeout(this._selectBall,this._unselectBall,this._fireBall,this._starOverBall,this._resList,this._unselectBG,this._selectBG,this._youbox,this._payoutWhiteWinSlot,this._payoutWinPrice,this._wagerxs,this._xmbaixing,this._xmduobeilvWin,this._wagerIncBtn,this._wagerDecBtn,this._playAgainBtn,this._clearAll,this._revealBtn,this._curBalance,this._totalWin,this._totalWinText,this._msg,this._msgX,this._jackpotList,this._jackpotListOri,this._ifJack,this._jackpotListUpdate,this._jackpotWinNum,this._jackpotWinPrice,this._jackpotPriceShow,this._sanweiUpdate,this._zuobox,this._jackpotWinSlot,this._againBtnEmitter,this._playBtnEmitter,this._jackpotReset);
    
    /*for(var i=0;i<this._fireBall.length;i++){
      this._fireBall[i].visible=false;
    }

    for(var i=0;i<this._starOverBall.length;i++){
      this._starOverBall[i].visible=false;
    }

    for(var i=0;i<this._resList.length;i++){
      if(this._resList[i][1]==0 || this._resList[i][1]==1){
        this._unselectBG[this._resList[i][0]].setVisible(false);
        this._unselectBall[this._resList[i][0]].visible=true;
      }else if(this._resList[i][1]==2 || this._resList[i][1]==3){
        this._selectBG[this._resList[i][0]].setVisible(false);
        this._selectBall[this._resList[i][0]].visible=true;
      }
    }
    
    var tmc=-1;
    for(var i=0;i<this._resList.length;i++){
      if(this._resList[i][2]>-1 && this._resList[i][2]>tmc){
        tmc=this._resList[i][2];
      }
    }
    console.log("tmc "+tmc);

    for(var i=0;i<this._youbox.length;i++){
      this._youbox[i].visible=false;
    }
    for(var i=0;i<this._payoutWhiteWinSlot.length;i++){
      this._payoutWhiteWinSlot[i].visible=false;
    }
    for(var i=0;i<this._payoutWinPrice.length;i++){
      this._payoutWinPrice[i].visible=false;
    }

    if(tmc==0){
      this._youbox[0].visible=true;
      this._payoutWhiteWinSlot[0].visible=true;
      for(var a=0;a<this._wagerxs.length;a++){
        if(this._wagerxs[a].visible==true){
          this._payoutWinPrice[a][0].visible=true;
        }
      }
    }else if(tmc>4){
      console.log("tmc > 4  "+tmc);
      this._youbox[tmc-4].visible=true;
      this._payoutWhiteWinSlot[tmc-4].visible=true;
      for(var a=0;a<this._wagerxs.length;a++){
        if(this._wagerxs[a].visible==true){
          this._payoutWinPrice[a][tmc-4].visible=true;
        }
      }
      console.log("tmc > 4  "+"finish");
    }

    var starC=0;
    for(var i=0;i<this._resList.length;i++){
      if(this._resList[i][1]==1 || this._resList[i][1]==3){
        starC++;
      }
    }

    for(var i=0;i<starC;i++){
      this._xmbaixing[i].visible=true;
      this._xmduobeilvWin[i].visible=true;
    }


    
    [>this._revealBtn.setEnable(false);
    this._revealBtn.setVisible(false);<]
    this._playAgainBtn.setEnable(true);
    this._playAgainBtn.setVisible(true);

    this._clearAll.setEnable(true);
    if(this._wagerxs[0].visible!=true){
      this._wagerDecBtn.setEnable(true);
    }
    if(this._wagerxs[5].visible!=true){
      this._wagerIncBtn.setEnable(true);
    }*/

}


InGameScene.prototype._showResAfterClearTimeout = function(selectBall,unselectBall,fireBall,starOverBall,resList,unselectBG,selectBG,youbox,payoutWhiteWinSlot,payoutWinPrice,wagerxs,xmbaixing,xmduobeilvWin,wagerIncBtn,wagerDecBtn,playAgainBtn,clearAll,revealBtn,curBalance,totalWin,totalWinText,msg,msgX,jackpotlist,jackpotlistori,ifjackpot,jackpotlistupdate,jackpotwinnum,jackpotwinprice,jackpotpriceshow,sanweiupdate,zuobox,jackpotwinslot,againbuttonemitter,playbtnemitter,jackpotreset){
  setTimeout(function(){
    ApiConnector.UpdateBalance(curBalance*100);
    jackpotlistupdate(jackpotlistori,jackpotlist,ifjackpot,wagerxs,sanweiupdate,jackpotwinnum,jackpotwinprice,jackpotpriceshow,zuobox,jackpotwinslot,jackpotreset);
    TweenLite.to(msg[2],0.3,{x:msgX-700});
    if(totalWin>0){
      msg[3].x=msgX+700;
      TweenLite.to(msg[3],0.3,{x:msgX});
    }else{
      msg[4].x=msgX+700;
      TweenLite.to(msg[4],0.3,{x:msgX});
    }

    if(totalWin>0){
      var totalMultiWager=0;
      for(var i=0;i<6;i++){
        if(wagerxs[i].visible==true){
          if(i==0){
            totalMultiWager=totalWin/4;
          }else if(i==1){
            totalMultiWager=totalWin/2;
          }else if(i==2){
            totalMultiWager=totalWin;
          }else if(i==3){
            totalMultiWager=totalWin*2;
          }else if(i==4){
            totalMultiWager=totalWin*3;
          }else if(i==5){
            totalMultiWager=totalWin*5;
          }
        }
      }
      if(totalMultiWager<1000){
        totalWinText.fontsize=27;
      }else{
        totalWinText.fontsize=22;
      }

      totalMultiWager*=100;
      //console.log("total win "+totalMultiWager);
      var right=totalMultiWager % 100;
      var _balanceL=Math.floor(totalMultiWager/100);
      //console.log("right  "+right);
      //console.log("left  "+_balanceL);

      if(_balanceL>999){
        var l=Math.floor(_balanceL/1000);
        var r=_balanceL%1000;
        if(r<100 && r>=10){
          if(right==0){
            totalWinText.text="$"+l.toString()+",0"+r.toString()+".00";
          }else if(right>0 && right<9){
            totalWinText.text="$"+l.toString()+",0"+r.toString()+".0"+right.toString();
          }else{
            totalWinText.text="$"+l.toString()+",0"+r.toString()+"."+right.toString();
          }
        }else if(r<10 && r>0){
          if(right==0){
            totalWinText.text="$"+l.toString()+",00"+r.toString()+".00";
          }else if(right>0 && right<9){
            totalWinText.text="$"+l.toString()+",00"+r.toString()+".0"+right.toString();
          }else{
            totalWinText.text="$"+l.toString()+",00"+r.toString()+"."+right.toString();
          }
        }else if(r<1000 && r>=100){
          if(right==0){
            totalWinText.text="$"+l.toString()+","+r.toString()+".00";
          }else if(right>0 && right<9){
            totalWinText.text="$"+l.toString()+","+r.toString()+".0"+right.toString();
          }else{
            totalWinText.text="$"+l.toString()+","+r.toString()+"."+right.toString();
          }
        }else{
          if(right==0){
            totalWinText.text="$"+l.toString()+",000"+".00";
          }else if(right>0 && right<9){
            totalWinText.text="$"+l.toString()+",000"+".0"+right.toString();
          }else{
            totalWinText.text="$"+l.toString()+",000"+"."+right.toString();
          }
        }
      }else{
        if(right==0){
          totalWinText.text="$"+_balanceL.toString()+".00";
        }else if(right>0 && right<9){
          totalWinText.text="$"+_balanceL.toString()+".0"+right.toString();
        }else{
          totalWinText.text="$"+_balanceL.toString()+"."+right.toString();
        }
      }


    }
    for(var i=0;i<fireBall.length;i++){
      fireBall[i].visible=false;
    }

    for(var i=0;i<starOverBall.length;i++){
      starOverBall[i].visible=false;
    }

    for(var i=0;i<playbtnemitter.length;i++){
      playbtnemitter[i].disable();
      /*playbtnemitter[i].getTransform().position.x = -50000;
      playbtnemitter[i].getTransform().position.y = -50000;*/
    }


    for(var i=0;i<resList.length;i++){
      if(resList[i][1]==0 || resList[i][1]==1){
        unselectBG[resList[i][0]].setVisible(false);
        unselectBall[resList[i][0]].visible=true;
      }else if(resList[i][1]==2 || resList[i][1]==3){
        selectBG[resList[i][0]].setVisible(false);
        selectBall[resList[i][0]].visible=true;
      }
    }
    
    var tmc=-1;
    for(var i=0;i<resList.length;i++){
      if(resList[i][2]>-1 && resList[i][2]>tmc){
        tmc=resList[i][2];
      }
    }
    //console.log("tmc "+tmc);

    for(var i=0;i<youbox.length;i++){
      youbox[i].visible=false;
    }
    for(var i=0;i<payoutWhiteWinSlot.length;i++){
      payoutWhiteWinSlot[i].visible=false;
    }
    for(var i=0;i<payoutWinPrice.length;i++){
      for(var j=0;j<payoutWinPrice[i].length;j++){
        payoutWinPrice[i][j].visible=false;
      }
    }

    if(tmc==0){
      youbox[0].visible=true;
      payoutWhiteWinSlot[0].visible=true;
      for(var a=0;a<wagerxs.length;a++){
        if(wagerxs[a].visible==true){
          payoutWinPrice[a][0].visible=true;
        }
      }
    }else if(tmc>4){
      //console.log("tmc > 4  "+tmc);
      youbox[tmc-4].visible=true;
      payoutWhiteWinSlot[tmc-4].visible=true;
      for(var a=0;a<wagerxs.length;a++){
        if(wagerxs[a].visible==true){
          payoutWinPrice[a][tmc-4].visible=true;
        }
      }
      //console.log("tmc > 4  "+"finish");
    }

    var starC=0;
    for(var i=0;i<resList.length;i++){
      if(resList[i][1]==1 || resList[i][1]==3){
        starC++;
      }
    }

    for(var i=0;i<starC;i++){
      xmbaixing[i].visible=true;
      xmduobeilvWin[i].visible=true;
    }


    
    revealBtn.setEnable(false);
    revealBtn.setVisible(false);
    playAgainBtn.setEnable(true);
    playAgainBtn.setVisible(true);
    againbuttonemitter.enable();
    if(xqu.config.IsMobile()){
      againbuttonemitter.getTransform().position.y = 1700;
    }else{
      againbuttonemitter.getTransform().position.y = 1150;
    }

    clearAll.setEnable(true);
    if(wagerxs[0].visible!=true){
      wagerDecBtn.setEnable(true);
    }
    if(wagerxs[5].visible!=true){
      wagerIncBtn.setEnable(true);
    }
  },500);

}

InGameScene.prototype._onClickplayAgainBtn = function(e) {
    //xqu.audio.playEffect('Snd_Play_Button');
  if(this._jackpotReset>-1){
      this._jackpotWinNum[this._jackpotReset].text=this._sanweiUpdate(this._jackpotListOri[this._jackpotReset]);
      this._jackpotWinPrice[this._jackpotReset].text=this._sanweiUpdate(this._jackpotListOri[this._jackpotReset]);
      this._jackpotList[this._jackpotReset]=this._jackpotListOri[this._jackpotReset];
  }
  this._autoPlayBtn.setEnable(false);
  this._jackpotReset=-1;
  this._ifJack=false;
  this._msg[0].text='Choose 10 Numbers';
  this._againBtnEmitter.disable();
  this._againBtnEmitter.getTransform().position.y = -700;
  this._firstRun++;

  for(var i=0;i<this._jackpotWinSlot.length;i++){
    this._jackpotWinSlot[i].visible=false;
    this._jackpotWinPrice[i].visible=false;
    this._zuobox[i].visible=false;
  }

  if(this._msg[0].x>=this._msgX){
    TweenLite.to(this._msg[0],0.3,{x:this._msgX-700});
  }

  if(this._msg[1].x>=this._msgX){
    TweenLite.to(this._msg[1],0.3,{x:this._msgX-700});
  }


  if(this._msg[3].x>=this._msgX){
    TweenLite.to(this._msg[3],0.3,{x:this._msgX-700});
  }

  if(this._msg[4].x>=this._msgX){
    TweenLite.to(this._msg[4],0.3,{x:this._msgX-700});
  }

  this._msg[2].x=this._msgX+700;
  console.log("im 2 ")
  TweenLite.to(this._msg[2],0.3,{x:this._msgX});

  if(this._firstRun>0){
    this._totalWin=0;
    this._totalWinText.text='';
    for(var i=0;i<6;i++){
      if(this._wagerxs[i].visible==true){
        if(i==0){
          this._curWager=0.25;
        }else if(i==1){
          this._curWager=0.50;
        }else if(i==2){
          this._curWager=1;
        }else if(i==3){
          this._curWager=2;
        }else if(i==4){
          this._curWager=3;
        }else if(i==5){
          this._curWager=5;
        }
      }
    }
    this._curBalance-=this._curWager;
    ApiConnector.UpdateBalance(this._curBalance*100);
    xqu.log("InGameScene: Play again clicked");


    for(var i=0;i<80;i++){
      this._unselectBG[i].setEnable(true);
      this._unselectBG[i].setVisible(true);
      this._unselectFont[i].visible=true;
      this._selectBG[i].setEnable(false);
      this._selectBG[i].setVisible(false);
      this._selectFont[i].visible=false;
      this._unselectBall[i].visible=false;
      this._selectBall[i].visible=false;
    }

    for(var i=0;i<this._selectNum.length;i++){
      this._unselectBG[this._selectNum[i]].setVisible(false);
      this._unselectFont[this._selectNum[i]].visible=false;
      this._selectBG[this._selectNum[i]].setVisible(true);
      this._selectFont[this._selectNum[i]].visible=true;
    }


    this._resList=null;
    this._resList=[];
    for(var i=0;i<20;i++){
      this._resList[i]=new Array();
    }

    for(var i=0;i<this._xmbaixing.length;i++){
      this._xmbaixing[i].visible=false;
      this._xmduobeilvWin[i].visible=false;
      this._starOverBall[i].scale.set(0.1);
      /*this._playBtnEmitter[i].getTransform().position.x=-500;
      this._playBtnEmitter[i].getTransform().position.y=-500;*/
      //this._playBtnEmitter[i].enable();
    }
    for(var i=0;i<this._payoutWhiteWinSlot.length;i++){
      this._payoutWhiteWinSlot[i].visible=false;
      this._youbox[i].visible=false;
    }
    for(var i=0;i<this._payoutWinPrice.length;i++){
      for(var j=0;j<this._payoutWinPrice[i].length;j++){
        this._payoutWinPrice[i][j].visible=false;
      }
    }
    for(var i=0;i<80;i++){
      this._fireBall[i].anchor.set(0.5);
      this._fireBall[i].x=this._fireBallX+(i%10)*81+this._fireBallDis;
      this._fireBall[i].y=this._fireBallY+Math.floor(i/10)*81-this._fireBallDis;
      this._fireBall[i].visible=false;
      //this._fireBall[i].visible=true;
    }
    this._playAgainBtn.setEnable(false);
    this._playAgainBtn.setVisible(false);
    this._revealBtn.setEnable(true);
    this._revealBtn.setVisible(true);
    /*this._autoPick.setEnable(true);
    this._autoPick.setVisible(true);*/
  }

  //this._generateRes();
  this._startMainGame();
  this._wagerIncBtn.setEnable(false);
  this._wagerDecBtn.setEnable(false);
  this._clearAll.setEnable(false);
  this._playBtn.setEnable(false);
  this._playBtn.setVisible(false);
  this._revealBtn.setEnable(true);
  this._revealBtn.setVisible(true);

}

InGameScene.prototype._onClickHelpBtn = function(e) {
    xqu.audio.playEffect('Snd_Play_Button');
    ApiConnector.ShowHelpScreen();
}

InGameScene.prototype._createAutoPlayLayer = function () {
    var self = this;
    this._autoPlayLayer = new AutoPlayLayer();
    this._container.addChild(this._autoPlayLayer.getTransform());

    this._autoPlayLayer.addCallback_startPlay(self._autoPlay_cb_startMainGame, self);
    this._autoPlayLayer.addCallback_finishAllPlays(self._autoPlay_cb_finishAllPlays, self);
}

InGameScene.prototype._autoPlay_cb_startMainGame = function(playLeftAmount) {
  // Show how many play amount left, if you need to current round number, you need to plus 1 on it.
  xqu.log('_autoPlay_cb_startMainGame, play left is ' + playLeftAmount);
  this._ifAutoPlay = true;
  this._autoPlayBtn.setEnable(false);
  //this._autoPlayBtn.setType('stop');
  //this._autoPlayBtn.updateStopAmount(playLeftAmount + 1);


  if(this._firstRun>0){
    if(this._jackpotReset>-1){
      this._jackpotWinNum[this._jackpotReset].text=this._sanweiUpdate(this._jackpotListOri[this._jackpotReset]);
      this._jackpotWinPrice[this._jackpotReset].text=this._sanweiUpdate(this._jackpotListOri[this._jackpotReset]);
      this._jackpotList[this._jackpotReset]=this._jackpotListOri[this._jackpotReset];
    }
    this._jackpotReset=-1;
    this._ifJack=false;
    this._msg[0].text='Choose 10 Numbers';
    this._againBtnEmitter.disable();
    this._againBtnEmitter.getTransform().position.y = -700;

    for(var i=0;i<this._jackpotWinSlot.length;i++){
      this._jackpotWinSlot[i].visible=false;
      this._jackpotWinPrice[i].visible=false;
      this._zuobox[i].visible=false;
    }

    if(this._msg[0].x>=this._msgX){
      TweenLite.to(this._msg[0],0.3,{x:this._msgX-700});
    }

    if(this._msg[1].x>=this._msgX){
      TweenLite.to(this._msg[1],0.3,{x:this._msgX-700});
    }


    if(this._msg[3].x>=this._msgX){
      TweenLite.to(this._msg[3],0.3,{x:this._msgX-700});
    }

    if(this._msg[4].x>=this._msgX){
      TweenLite.to(this._msg[4],0.3,{x:this._msgX-700});
    }

    this._msg[2].x=this._msgX+700;
    console.log("im 2 ")
    TweenLite.to(this._msg[2],0.3,{x:this._msgX});

    if(this._firstRun>0){
      this._totalWin=0;
      this._totalWinText.text='';
      for(var i=0;i<6;i++){
        if(this._wagerxs[i].visible==true){
          if(i==0){
            this._curWager=0.25;
          }else if(i==1){
            this._curWager=0.50;
          }else if(i==2){
            this._curWager=1;
          }else if(i==3){
            this._curWager=2;
          }else if(i==4){
            this._curWager=3;
          }else if(i==5){
            this._curWager=5;
          }
        }
      }
      this._curBalance-=this._curWager;
      ApiConnector.UpdateBalance(this._curBalance*100);
      xqu.log("InGameScene: Play again clicked");


      for(var i=0;i<80;i++){
        this._unselectBG[i].setEnable(true);
        this._unselectBG[i].setVisible(true);
        this._unselectFont[i].visible=true;
        this._selectBG[i].setEnable(false);
        this._selectBG[i].setVisible(false);
        this._selectFont[i].visible=false;
        this._unselectBall[i].visible=false;
        this._selectBall[i].visible=false;
      }

      for(var i=0;i<this._selectNum.length;i++){
        this._unselectBG[this._selectNum[i]].setVisible(false);
        this._unselectFont[this._selectNum[i]].visible=false;
        this._selectBG[this._selectNum[i]].setVisible(true);
        this._selectFont[this._selectNum[i]].visible=true;
      }


      this._resList=null;
      this._resList=[];
      for(var i=0;i<20;i++){
        this._resList[i]=new Array();
      }

      for(var i=0;i<this._xmbaixing.length;i++){
        this._xmbaixing[i].visible=false;
        this._xmduobeilvWin[i].visible=false;
        this._starOverBall[i].scale.set(0.1);
        /*this._playBtnEmitter[i].getTransform().position.x=-500;
      this._playBtnEmitter[i].getTransform().position.y=-500;*/
        //this._playBtnEmitter[i].enable();
      }
      for(var i=0;i<this._payoutWhiteWinSlot.length;i++){
        this._payoutWhiteWinSlot[i].visible=false;
        this._youbox[i].visible=false;
      }
      for(var i=0;i<this._payoutWinPrice.length;i++){
        for(var j=0;j<this._payoutWinPrice[i].length;j++){
          this._payoutWinPrice[i][j].visible=false;
        }
      }
      for(var i=0;i<80;i++){
        this._fireBall[i].anchor.set(0.5);
        this._fireBall[i].x=this._fireBallX+(i%10)*81+this._fireBallDis;
        this._fireBall[i].y=this._fireBallY+Math.floor(i/10)*81-this._fireBallDis;
        this._fireBall[i].visible=false;
        //this._fireBall[i].visible=true;
      }
      this._playAgainBtn.setEnable(false);
      this._playAgainBtn.setVisible(false);
      this._revealBtn.setEnable(true);
      this._revealBtn.setVisible(true);
      /*this._autoPick.setEnable(true);
    this._autoPick.setVisible(true);*/
    }



    this._startMainGame();

    this._wagerIncBtn.setEnable(false);
    this._wagerDecBtn.setEnable(false);
    this._clearAll.setEnable(false);
    this._playBtn.setEnable(false);
    this._playBtn.setVisible(false);
    this._revealBtn.setEnable(false);
    this._revealBtn.setVisible(true);

  }else{
    this._againBtnEmitter.disable();
    this._againBtnEmitter.getTransform().position.y = -700;

    this._msg[0].text='Choose 10 Numbers';

    this._ifJack=false;
    TweenLite.to(this._msg[1],0.3,{x:this._msgX-700});
    this._msg[2].x=this._msgX+700;
    TweenLite.to(this._msg[2],0.3,{x:this._msgX});

    for(var i=0;i<6;i++){
      if(this._wagerxs[i].visible==true){
        if(i==0){
          this._curWager=0.25;
        }else if(i==1){
          this._curWager=0.50;
        }else if(i==2){
          this._curWager=1;
        }else if(i==3){
          this._curWager=2;
        }else if(i==4){
          this._curWager=3;
        }else if(i==5){
          this._curWager=5;
        }
      }
    }

    this._curBalance-=this._curWager;
    ApiConnector.UpdateBalance(this._curBalance*100);

    var indexT=0;
    for(var i=0;i<80;i++){
      if(this._selectFont[i].visible==true){
        this._selectNum[indexT++]=i;
      }
    }
    console.log("select number is "+this._selectNum);

    //xqu.audio.playEffect('Snd_Play_Button');
    xqu.log("InGameScene: Play button clicked");
    this._firstRun++;

    this._startMainGame();
    this._wagerIncBtn.setEnable(false);
    this._wagerDecBtn.setEnable(false);
    this._clearAll.setEnable(false);
    this._playBtn.setEnable(false);
    this._playBtn.setVisible(false);
    this._revealBtn.setEnable(false);
    this._revealBtn.setVisible(true);

  }

}

// AutoPlayLayer will call this function to let the game know all AutoPlay plays are finished.
InGameScene.prototype._autoPlay_cb_finishAllPlays = function() {
  this._ifAutoPlay = true;
  this._autoPlayBtn.setEnable(true);
  this._autoPlayLayer._confirmBtn.setEnable(true);
  this._playAgainBtn.setEnable(true);
  this._clearAll.setEnable(true);
  if(this._wagerxs[0].visible!=true){
    this._wagerDecBtn.setEnable(true);
  }
  if(this._wagerxs[5].visible!=true){
    this._wagerIncBtn.setEnable(true);
  }
  /*this._isAutoPlay = false;

    this._autoPlayBtn.setType('play');
    this._autoPlayBtn.setEnable(true);

    this._prepareNewGame();*/
}

InGameScene.prototype._onClickAutoPlayBtn = function(e) {
  this._autoPlayLayer.getTransform().visible=true;
}

InGameScene.prototype._onClickPlayBtn = function(e) {
  var self = this;
  if (!this._playBtnEnabled) {
    return;
  }

  this._againBtnEmitter.disable();
  this._againBtnEmitter.getTransform().position.y = -700;

  this._msg[0].text='Choose 10 Numbers';

  this._ifJack=false;
  TweenLite.to(this._msg[1],0.3,{x:this._msgX-700});
  this._msg[2].x=this._msgX+700;
  TweenLite.to(this._msg[2],0.3,{x:this._msgX});

  for(var i=0;i<6;i++){
    if(this._wagerxs[i].visible==true){
      if(i==0){
        this._curWager=0.25;
      }else if(i==1){
        this._curWager=0.50;
      }else if(i==2){
        this._curWager=1;
      }else if(i==3){
        this._curWager=2;
      }else if(i==4){
        this._curWager=3;
      }else if(i==5){
        this._curWager=5;
      }
    }
  }

  this._curBalance-=this._curWager;
  ApiConnector.UpdateBalance(this._curBalance*100);
    
  var indexT=0;
  for(var i=0;i<80;i++){
    if(this._selectFont[i].visible==true){
      this._selectNum[indexT++]=i;
    }
  }
  console.log("select number is "+this._selectNum);

  //xqu.audio.playEffect('Snd_Play_Button');
  xqu.log("InGameScene: Play button clicked");
  this._firstRun++;

  this._startMainGame();
  this._wagerIncBtn.setEnable(false);
  this._wagerDecBtn.setEnable(false);
  this._clearAll.setEnable(false);
  this._playBtn.setEnable(false);
  this._playBtn.setVisible(false);
  this._revealBtn.setEnable(true);
  this._revealBtn.setVisible(true);
};

InGameScene.prototype._firestartmove = function(startest,staremitter) {
  setTimeout(function(){
    staremitter.enable();
  },100);
}



InGameScene.prototype._startMainGame = function(e) {
  xqu.log("InGameScene: game start");
  this._selectNumTrigger=true;
  for(var i=0;i<this._wagerxs.length;i++){
    if(this._wagerxs[i].visible==true){
      this._payoutWinPrice[i][0].visible=true;
      this._payoutWhiteWinSlot[0].visible=true;
      this._youbox[0].visible=true;
    }
  }
  for(var i=0;i<this._unselectFont.length;i++){
    this._unselectBG[i].setEnable(false);
    this._unselectBG[i].setAlpha(1);
    this._selectBG[i].setEnable(false);
    this._selectBG[i].setAlpha(1);
  }

  this._generateRes();
  this._startTimer(this._revealBtn,this._playAgainBtn,this._clearAll,this._wagerxs,this._wagerIncBtn,this._wagerDecBtn,this._jackpotListUpdate,this._jackpotListOri,this._jackpotList,this._ifJack,this._sanweiUpdate,this._jackpotWinNum,this._jackpotWinPrice,this._jackpotPriceShow,this._zuobox,this._jackpotWinSlot,this._playBtnEmitter,this._firestartmove,this._staremitter,this._againBtnEmitter,this._jackpotReset);
}

InGameScene.prototype._generateRes = function() {
  var ran=Math.floor(Math.random()*10);
  var matchCount;
  var matchStar;
  if(ran<5){
    ran=Math.floor(Math.random()*28);
    //test
    //ran=27;
    //test
    matchCount=this._winPriceTier[ran][0];
    matchStar=this._winPriceTier[ran][1];
    this._totalWin=this._winPriceTier[ran][2];
  }else{
    matchCount=Math.floor(Math.random()*4)+1;
    matchStar=Math.floor(Math.random()*5);
    this._totalWin=0;
  }

  /*test
  var testjack=Math.floor(Math.random()*10);
  if(testjack<7){
  }else{
    this._totalWin=1000;
  }*/

  if(this._totalWin==1000) {
    this._ifJack=true;
    for(var i=0;i<this._wagerxs.length;i++){
      if(this._wagerxs[i].visible==true){
        this._totalWin=this._jackpotList[i];
        this._jackpotReset=i;
        break;
      }
    }
  }

  for(var i=0;i<6;i++){
    if(this._wagerxs[i].visible==true){
      if(i==0){
        this._curBalance+=this._totalWin/4;
      }else if(i==1){
        this._curBalance+=this._totalWin/2;
      }else if(i==2){
        this._curBalance+=this._totalWin;
      }else if(i==3){
        this._curBalance+=this._totalWin*2;
      }else if(i==4){
        this._curBalance+=this._totalWin*3;
      }else if(i==5){
        this._curBalance+=this._totalWin*5;
      }
    }
  }

  console.log("match count is "+matchCount);
  console.log("match star is "+matchStar);
  console.log("total win is "+this._totalWin);

  var selectNum=[];
  for(var i=0;i<10;i++){
    selectNum[i]=this._selectNum[i];
  }

  var tempList=[];
  for(var i=0;i<selectNum.length;i++){
    tempList[i]=selectNum[i];
  }

  selectNum.sort(()=> Math.random() - 0.5);
  console.log("select number after shuffle is "+selectNum);

  var input=0;
  var exsit=false;
  while(input<10){
    var ranNum=Math.floor(Math.random()*80);
    for(var i=0;i<selectNum.length;i++){
      if(ranNum==selectNum[i]){
        exsit=true;
      }
    }
    if(!exsit){
      selectNum.push(ranNum);
      input++;
    }
    exsit=false;
  }
  //console.log("select 20 number is "+selectNum);

  input=matchCount;
  var waitList=[];
  while(input<10){
    var ranNum=Math.floor(Math.random()*80);
    for(var i=0;i<selectNum.length;i++){
      if(ranNum==selectNum[i]){
        exsit=true;
        break;
      }
    }
    if(!exsit){
      for(var j=0;j<waitList.length;j++){
        if(ranNum==waitList[j]){
          exsit=true;
          break;
        }
      }
      if(!exsit){
        waitList.push(ranNum);
        input++;
      }
    }
    exsit=false;
  }
  //console.log("waitlist is "+waitList);

  selectNum.splice(0,10-matchCount);
  //console.log("selectNum after remove the first is "+ selectNum);

  for(var i=0;i<waitList.length;i++){
    selectNum.push(waitList[i]);
  }
  selectNum.sort(()=> Math.random() - 0.5);
  //console.log("final selectNum is "+ selectNum);

  var starPos=[];
  var starCount=0;
  var starex=false;
  while(starCount<matchStar){
    var starRan=Math.floor(Math.random()*20);
    for(var j=0;j<starPos.length;j++){
      if(starPos[j]==starRan){
        starex=true;
        break;
      }
    }
    if(!starex){
      starPos.push(starRan);
      starCount++;
    }
    starex=false;
  }
  //console.log("star pos is "+starPos)

  //0 unmatch, 1 unmatch with star, 2 match, 3 match with star
  var ifex=false;
  var ifstar=false;
  for(var i=0;i<selectNum.length;i++){
    for(var j=0;j<tempList.length;j++){
      if(selectNum[i]==tempList[j]){
        ifex=true;
        break;
      }
    }

    this._resList[i][0]=selectNum[i];
    if(ifex){
      for(var k=0;k<starPos.length;k++){
        if(i==starPos[k]){
          ifstar=true;
          break;
        }
      }
      // dd
      if(!ifstar){
        this._resList[i][1]=2;
      }else{
        this._resList[i][1]=3;
      }
    }else{
      for(var k=0;k<starPos.length;k++){
        if(i==starPos[k]){
          ifstar=true;
          break;
        }
      }
      // dd
      if(!ifstar){
        this._resList[i][1]=0;
      }else{
        this._resList[i][1]=1;
      }
    }
    ifstar=false;
    ifex=false;
  }

  for(var i=0;i<this._resList.length;i++){
    this._resList[i][2]=-1;
  }
  var tempMatch=0;
  this._resList[0][2]=tempMatch;
  for(var i=0;i<this._resList.length;i++){
    for(var j=0;j<tempList.length;j++){
      if(this._resList[i][0]==tempList[j]){
        tempMatch++;
        this._resList[i][2]=tempMatch;
      }
    }
  }

  var starIndex=0;
  for(var i=0;i<20;i++){
    if(this._resList[i][1]==1 || this._resList[i][1]==3){
      this._starOverBall[starIndex].x=this._unselectFont[this._resList[i][0]].x+25;
      this._starOverBall[starIndex].y=this._unselectFont[this._resList[i][0]].y-10;
      starIndex++;
    }
  }

  console.log("final res list "+this._resList);
}

InGameScene.prototype._startTimer = function(reveal,playagain,clearall,wagerxs,wagerIncBtn,wagerDecBtn,jackpotlistupdate,jackpotlistori,jackpotlist,ifjackpot,sanweiupdate,jackpotwinnum,jackpotwinprice,jackpotpriceshow,zuobox,jackpotwinslot,playbtnemitter,firestartmove,staremitter,againbuttonemitter,jackpotreset) {
  var timer=300;
  for(var i=0;i<20;i++){
    this._startAnim(i,timer,this._resList,this._fireBall,this._showNumTime,this._fireBallTween,this._unselectFont,this._unselectBG,this._selectBG,this._unselectBall,this._selectBall,this._starOverBall,this._starOverBallPos,this._xmbaixing,this._xmduobeilvWin,this._youbox,this._payoutWhiteWinSlot,this._payoutWinPrice,this._wagerxs,this._revealBtn,this._playAgainBtn,this._clearAll,this._wagerIncBtn,this._wagerDecBtn,this._curBalance,this._totalWin,this._totalWinText,this._msg,this._msgX,jackpotlistupdate,jackpotlistori,jackpotlist,ifjackpot,sanweiupdate,jackpotwinnum,jackpotwinprice,jackpotpriceshow,zuobox,jackpotwinslot,playbtnemitter,firestartmove,staremitter,againbuttonemitter,jackpotreset,this._ifAutoPlay,this._autoPlayLayer);
  }
  /*revealtween=setTimeout(function(){
    reveal.setEnable(false);
    reveal.setVisible(false);
    playagain.setEnable(true);
    playagain.setVisible(true);
    clearall.setEnable(true);

    if(wagerxs[0].visible!=true){
      wagerDecBtn.setEnable(true);
    }
    if(wagerxs[5].visible!=true){
      wagerIncBtn.setEnable(true);
    }
  },20*timer)*/

}


InGameScene.prototype._startAnim = function(index,timer,resList,fireBall,showNumTime,fireBallTween,unselectFont,unselectBG,selectBG,unselectBall,selectBall,starOverBall,starOverBallPos,xmbaixing,xmduobeilvWin,youbox,payoutWhiteWinSlot,payoutWinPrice,wagerxs,reveal,playagain,clearall,wagerIncBtn,wagerDecBtn,curBalance,totalWin,totalWinText,msg,msgX,jackpotlistupdate,jackpotlistori,jackpotlist,ifjackpot,sanweiupdate,jackpotwinnum,jackpotwinprice,jackpotpriceshow,zuobox,jackpotwinslot,playbtnemitter,firestartmove,staremitter,againbuttonemitter,jackpotreset,ifautoplay,autoplaylayer) {
  var autoTimer=1000;
  showNumTime[index]=setTimeout(function(){
    fireBall[resList[index][0]].visible=true;
    //fireBallTween[index]=TweenLite.to(fireBall[resList[index][0]],0.3,{x:unselectFont[resList[index][0]].x+48,y:unselectFont[resList[index][0]].y-28});
    fireBallTween[index]=TweenLite.to(fireBall[resList[index][0]],0.5,{x:unselectFont[resList[index][0]].x+48,y:unselectFont[resList[index][0]].y-28});
    setTimeout(function(){
      fireBall[resList[index][0]].visible=false;
      if(resList[index][1]==0 || resList[index][1]==1){
        unselectBG[resList[index][0]].setVisible(false);
        unselectBall[resList[index][0]].visible=true;
      }else if(resList[index][1]==2 || resList[index][1]==3){
        selectBG[resList[index][0]].setVisible(false);
        selectBall[resList[index][0]].visible=true;
      }

      if(resList[index][2]>-1){
        for(var m=0;m<youbox.length;m++){
          youbox[m].visible=false;
          payoutWhiteWinSlot[m].visible=false;
          for(var n=0;n<6;n++){
            payoutWinPrice[n][m].visible=false;
          }
        }

        if(resList[index][2]==0){
          youbox[0].visible=true;
          payoutWhiteWinSlot[0].visible=true;
          for(var a=0;a<wagerxs.length;a++){
            if(wagerxs[a].visible==true){
              payoutWinPrice[a][0].visible=true;
            }
          }

        }else if(resList[index][2]>4){
          youbox[resList[index][2]-4].visible=true;
          payoutWhiteWinSlot[resList[index][2]-4].visible=true;
          for(var a=0;a<wagerxs.length;a++){
            if(wagerxs[a].visible==true){
              payoutWinPrice[a][resList[index][2]-4].visible=true;
            }
          }
        }
      }

      var startX=0;
      var startY=0;
      if(resList[index][1]==1 || resList[index][1]==3){
        var curStarIndex=-1;
        for(var j=0;j<5;j++){
          if(starOverBall[j].x==unselectFont[resList[index][0]].x+25 && starOverBall[j].y==unselectFont[resList[index][0]].y-10){
            starOverBall[j].visible=true;
            playbtnemitter[j]._setPos(starOverBall[j].x,starOverBall[j].y);

            curStarIndex=j;
            TweenLite.to(starOverBall[j].scale,0.5,{x:1.1,y:1.1});
            //TweenLite.to(starOverBall[j].scale,0.5,{x:0.9,y:0.9});
            break;
          }
        }
      }

      if(curStarIndex>-1){
        var starMoveTimer=0.5;
        playbtnemitter[curStarIndex].animHide(0,0,playbtnemitter[curStarIndex]._pivotX,playbtnemitter[curStarIndex]._pivotY,0.1);
        setTimeout(function(){
          TweenLite.to(starOverBall[curStarIndex],starMoveTimer,{x:starOverBallPos[curStarIndex][0],y:starOverBallPos[curStarIndex][1]});
          playbtnemitter[curStarIndex].anim(playbtnemitter[curStarIndex]._pivotX,playbtnemitter[curStarIndex]._pivotY,starOverBallPos[curStarIndex][0],starOverBallPos[curStarIndex][1],starMoveTimer);

          setTimeout(function(){
            starOverBall[curStarIndex].visible=false;
            playbtnemitter[curStarIndex].disable();
            /*playbtnemitter[curStarIndex].getTransform().position.x = -500;
            playbtnemitter[curStarIndex].getTransform().position.y = -500;*/
            xmbaixing[curStarIndex].visible=true;
            xmduobeilvWin[curStarIndex].visible=true;
            if(index==19){
              TweenLite.to(msg[2],0.3,{x:msgX-700});
              if(totalWin>0){
                msg[3].x=msgX+700;
                TweenLite.to(msg[3],0.3,{x:msgX});
              }else{
                msg[4].x=msgX+700;
                TweenLite.to(msg[4],0.3,{x:msgX});
              }


              console.log("curbalance "+curBalance);
              ApiConnector.UpdateBalance(curBalance*100);
              jackpotlistupdate(jackpotlistori,jackpotlist,ifjackpot,wagerxs,sanweiupdate,jackpotwinnum,jackpotwinprice,jackpotpriceshow,zuobox,jackpotwinslot,jackpotreset);
              //if(ifjackpot) jackpotlistupdate(jackpotlistori,jackpotlist,ifjackpot,wagerxs,sanweiupdate,jackpotwinnum,jackpotwinprice,jackpotpriceshow,zuobox,jackpotwinslot);
              againbuttonemitter.enable();
              if(xqu.config.IsMobile()){
                againbuttonemitter.getTransform().position.y = 1700;
              }else{
                againbuttonemitter.getTransform().position.y = 1150;
              }

              if(ifautoplay){
                playagain.setEnable(false);
                playagain.setVisible(true);
                clearall.setEnable(false);
                wagerDecBtn.setEnable(false);
                wagerIncBtn.setEnable(false);
              }else{
                playagain.setEnable(true);
                playagain.setVisible(true);
                clearall.setEnable(true);
                if(wagerxs[0].visible!=true){
                  wagerDecBtn.setEnable(true);
                }
                if(wagerxs[5].visible!=true){
                  wagerIncBtn.setEnable(true);
                }
              }
              reveal.setEnable(false);
              reveal.setVisible(false);

              if(totalWin>0){
                var totalMultiWager=0;
                for(var i=0;i<6;i++){
                  if(wagerxs[i].visible==true){
                    if(i==0){
                      totalMultiWager=totalWin/4;
                    }else if(i==1){
                      totalMultiWager=totalWin/2;
                    }else if(i==2){
                      totalMultiWager=totalWin;
                    }else if(i==3){
                      totalMultiWager=totalWin*2;
                    }else if(i==4){
                      totalMultiWager=totalWin*3;
                    }else if(i==5){
                      totalMultiWager=totalWin*5;
                    }
                  }
                }

                if(ifautoplay){
                  setTimeout(function(){
                    autoplaylayer.finishPlay(curBalance,totalMultiWager);
                  },autoTimer)
                }


                if(totalMultiWager<1000){
                  totalWinText.fontsize=27;
                }else{
                  totalWinText.fontsize=22;
                }

                totalMultiWager*=100;
                console.log("total win "+totalMultiWager);
                var right=totalMultiWager % 100;
                var _balanceL=Math.floor(totalMultiWager/100);
                console.log("right  "+right);
                console.log("left  "+_balanceL);

                if(_balanceL>999){
                  var l=Math.floor(_balanceL/1000);
                  var r=_balanceL%1000;
                  if(r<100 && r>=10){
                    if(right==0){
                      totalWinText.text="$"+l.toString()+",0"+r.toString()+".00";
                    }else if(right>0 && right<9){
                      totalWinText.text="$"+l.toString()+",0"+r.toString()+".0"+right.toString();
                    }else{
                      totalWinText.text="$"+l.toString()+",0"+r.toString()+"."+right.toString();
                    }
                  }else if(r<10 && r>0){
                    if(right==0){
                      totalWinText.text="$"+l.toString()+",00"+r.toString()+".00";
                    }else if(right>0 && right<9){
                      totalWinText.text="$"+l.toString()+",00"+r.toString()+".0"+right.toString();
                    }else{
                      totalWinText.text="$"+l.toString()+",00"+r.toString()+"."+right.toString();
                    }
                  }else if(r<1000 && r>=100){
                    if(right==0){
                      totalWinText.text="$"+l.toString()+","+r.toString()+".00";
                    }else if(right>0 && right<9){
                      totalWinText.text="$"+l.toString()+","+r.toString()+".0"+right.toString();
                    }else{
                      totalWinText.text="$"+l.toString()+","+r.toString()+"."+right.toString();
                    }
                  }else{
                    if(right==0){
                      totalWinText.text="$"+l.toString()+",000"+".00";
                    }else if(right>0 && right<9){
                      totalWinText.text="$"+l.toString()+",000"+".0"+right.toString();
                    }else{
                      totalWinText.text="$"+l.toString()+",000"+"."+right.toString();
                    }
                  }
                }else{
                  if(right==0){
                    totalWinText.text="$"+_balanceL.toString()+".00";
                  }else if(right>0 && right<9){
                    totalWinText.text="$"+_balanceL.toString()+".0"+right.toString();
                  }else{
                    totalWinText.text="$"+_balanceL.toString()+"."+right.toString();
                  }
                }


              }else{
                if(ifautoplay){
                  setTimeout(function(){
                    autoplaylayer.finishPlay(curBalance,0);
                  },autoTimer)
                }

              }



            }

          },1000*starMoveTimer);
        },500);
      }else{
        if(index==19){
          TweenLite.to(msg[2],0.3,{x:msgX-700});
          if(totalWin>0){
            msg[3].x=msgX+700;
            TweenLite.to(msg[3],0.3,{x:msgX});
          }else{
            msg[4].x=msgX+700;
            TweenLite.to(msg[4],0.3,{x:msgX});
          }

          console.log("curbalance "+curBalance);
          ApiConnector.UpdateBalance(curBalance*100);
          jackpotlistupdate(jackpotlistori,jackpotlist,ifjackpot,wagerxs,sanweiupdate,jackpotwinnum,jackpotwinprice,jackpotpriceshow,zuobox,jackpotwinslot,jackpotreset);
          //if(ifjackpot) jackpotlistupdate(jackpotlistori,jackpotlist,ifjackpot,wagerxs,sanweiupdate,jackpotwinnum,jackpotwinprice,jackpotpriceshow,zuobox,jackpotwinslot);
          reveal.setEnable(false);
          reveal.setVisible(false);
          if(ifautoplay){
            playagain.setEnable(false);
            playagain.setVisible(true);

            clearall.setEnable(false);
            wagerDecBtn.setEnable(false);
            wagerIncBtn.setEnable(false);


          }else{
            playagain.setEnable(true);
            playagain.setVisible(true);

            clearall.setEnable(true);
            if(wagerxs[0].visible!=true){
              wagerDecBtn.setEnable(true);
            }
            if(wagerxs[5].visible!=true){
              wagerIncBtn.setEnable(true);
            }



          }
          againbuttonemitter.enable();
          if(xqu.config.IsMobile()){
            againbuttonemitter.getTransform().position.y = 1700;
          }else{
            againbuttonemitter.getTransform().position.y = 1150;
          }




          if(totalWin>0){
            var totalMultiWager=0;
            for(var i=0;i<6;i++){
              if(wagerxs[i].visible==true){
                if(i==0){
                  totalMultiWager=totalWin/4;
                }else if(i==1){
                  totalMultiWager=totalWin/2;
                }else if(i==2){
                  totalMultiWager=totalWin;
                }else if(i==3){
                  totalMultiWager=totalWin*2;
                }else if(i==4){
                  totalMultiWager=totalWin*3;
                }else if(i==5){
                  totalMultiWager=totalWin*5;
                }
              }
            }
            setTimeout(function(){
              autoplaylayer.finishPlay(curBalance,totalMultiWager);
            },autoTimer)

            if(totalMultiWager<1000){
              totalWinText.fontsize=27;
            }else{
              totalWinText.fontsize=22;
            }

            totalMultiWager*=100;
            //console.log("total win "+totalMultiWager);
            var right=totalMultiWager % 100;
            var _balanceL=Math.floor(totalMultiWager/100);
            /*console.log("right  "+right);
            console.log("left  "+_balanceL);*/

            if(_balanceL>999){
              var l=Math.floor(_balanceL/1000);
              var r=_balanceL%1000;
              if(r<100 && r>=10){
                if(right==0){
                  totalWinText.text="$"+l.toString()+",0"+r.toString()+".00";
                }else if(right>0 && right<9){
                  totalWinText.text="$"+l.toString()+",0"+r.toString()+".0"+right.toString();
                }else{
                  totalWinText.text="$"+l.toString()+",0"+r.toString()+"."+right.toString();
                }
              }else if(r<10 && r>0){
                if(right==0){
                  totalWinText.text="$"+l.toString()+",00"+r.toString()+".00";
                }else if(right>0 && right<9){
                  totalWinText.text="$"+l.toString()+",00"+r.toString()+".0"+right.toString();
                }else{
                  totalWinText.text="$"+l.toString()+",00"+r.toString()+"."+right.toString();
                }
              }else if(r<1000 && r>=100){
                if(right==0){
                  totalWinText.text="$"+l.toString()+","+r.toString()+".00";
                }else if(right>0 && right<9){
                  totalWinText.text="$"+l.toString()+","+r.toString()+".0"+right.toString();
                }else{
                  totalWinText.text="$"+l.toString()+","+r.toString()+"."+right.toString();
                }
              }else{
                if(right==0){
                  totalWinText.text="$"+l.toString()+",000"+".00";
                }else if(right>0 && right<9){
                  totalWinText.text="$"+l.toString()+",000"+".0"+right.toString();
                }else{
                  totalWinText.text="$"+l.toString()+",000"+"."+right.toString();
                }
              }
            }else{
              if(right==0){
                totalWinText.text="$"+_balanceL.toString()+".00";
              }else if(right>0 && right<9){
                totalWinText.text="$"+_balanceL.toString()+".0"+right.toString();
              }else{
                totalWinText.text="$"+_balanceL.toString()+"."+right.toString();
              }
            }


          }else{
            if(ifautoplay){
              setTimeout(function(){
                autoplaylayer.finishPlay(curBalance,0);
              },autoTimer)
            }

          }


        }
      }


    },500);
  },index*timer);

}


InGameScene.prototype._jackpotListUpdate = function(jackpotlistori,jackpotlist,ifjackpot,wagerxs,sanweiupdate,jackpotwinnum,jackpotwinprice,jackpotpriceshow,zuobox,jackpotwinslot,jackpotreset) {
  if(ifjackpot){
    var jackpotMatch=-1;
    for(var i=0;i<wagerxs.length;i++){
      if(wagerxs[i].visible==true){
        jackpotMatch=i;
        break;
      }
    }
    console.log("jackpot match "+jackpotMatch);
    for(var i=0;i<jackpotlist.length;i++){
      if(i==0 && i!=jackpotMatch){
        var ranran=Math.floor(Math.random()*10);
        if(ranran<5){
          jackpotlist[0]+=Math.floor(Math.random()*10)+10.25;
        }else{
          jackpotlist[0]+=Math.floor(Math.random()*10)+10.5;
        }
      }else if(i==1 && i!=jackpotMatch){
        var ranran=Math.floor(Math.random()*10);
        if(ranran<5){
          jackpotlist[1]+=Math.floor(Math.random()*20)+20.5;
        }else{
          jackpotlist[1]+=Math.floor(Math.random()*20)+20;
        }
      }else if(i==2 && i!=jackpotMatch){
        jackpotlist[2]+=Math.floor(Math.random()*50)+50;
      }else if(i==3 && i!=jackpotMatch){
        jackpotlist[3]+=Math.floor(Math.random()*100)+100;
      }else if(i==4 && i!=jackpotMatch){
        jackpotlist[4]+=Math.floor(Math.random()*100)+200;
      }else if(i==5 && i!=jackpotMatch){
        jackpotlist[5]+=Math.floor(Math.random()*200)+300;
      }else if(i==jackpotMatch){
        //jackpotlist[i]=jackpotlistori[i];
      }
    }
    console.log(jackpotlist);
  }else{
    var ranran=Math.floor(Math.random()*10);
    if(ranran<5){
      jackpotlist[0]+=Math.floor(Math.random()*10)+10.25;
    }else{
      jackpotlist[0]+=Math.floor(Math.random()*10)+10.5;
    }
    ranran=Math.floor(Math.random()*10);
    if(ranran<5){
      jackpotlist[1]+=Math.floor(Math.random()*20)+20.5;
    }else{
      jackpotlist[1]+=Math.floor(Math.random()*20)+20;
    }
    jackpotlist[2]+=Math.floor(Math.random()*50)+50;
    jackpotlist[3]+=Math.floor(Math.random()*100)+100;
    jackpotlist[4]+=Math.floor(Math.random()*100)+200;
    jackpotlist[5]+=Math.floor(Math.random()*200)+300;
  }
  console.log("jackpotlist is "+jackpotlist);
  jackpotpriceshow(jackpotlist,jackpotwinnum,jackpotwinprice,sanweiupdate,ifjackpot,wagerxs,zuobox,jackpotwinslot);
}

InGameScene.prototype._jackpotPriceShow = function(jackpotlist,jackpotwinnum,jackpotwinprice,sanweiupdate,ifjackpot,wagerxs,zuobox,jackpotwinslot){
  for(var i=0;i<jackpotwinnum.length;i++){
    jackpotwinnum[i].text=sanweiupdate(jackpotlist[i]);
    jackpotwinprice[i].text=sanweiupdate(jackpotlist[i]);

    /*var str=jackpotwinnum[0].text;
    str=str.substring(0,str.length-3);
    console.log("str " +str);*/

    /*if(i!=0 && i!=1){
      var str=jackpotwinnum[i].text;
      str=str.substring(0,str.length-3);
      jackpotwinnum[i].text=str;
      str=jackpotwinprice[i].text;
      str=str.substring(0,str.length-3);
      jackpotwinprice[i].text=str;
    }*/
    /*console.log("jackpot win num font name " +jackpotwinnum[i].text);
    console.log("jackpot win price font name " +jackpotwinprice[i].text);*/

  }
  if(ifjackpot){
    for(var i=0;i<wagerxs.length;i++){
      if(wagerxs[i].visible==true){
        jackpotwinprice[i].visible=true;
        zuobox[i].visible=true;
        jackpotwinslot[i].visible=true;
      }
    }
  }
}


InGameScene.prototype._sanweiUpdate = function(num){
  var totalMultiWager=num;
  totalMultiWager*=100;
  var resString;
  //console.log("total win "+totalMultiWager);
  var right=totalMultiWager % 100;
  var _balanceL=Math.floor(totalMultiWager/100);
  /*console.log("right  "+right);
            console.log("left  "+_balanceL);*/

  if(_balanceL>999){
    var l=Math.floor(_balanceL/1000);
    var r=_balanceL%1000;
    if(r<100 && r>=10){
      if(right==0){
        resString="$"+l.toString()+",0"+r.toString()+".00";
      }else if(right>0 && right<9){
        resString="$"+l.toString()+",0"+r.toString()+".0"+right.toString();
      }else{
        resString="$"+l.toString()+",0"+r.toString()+"."+right.toString();
      }
    }else if(r<10 && r>0){
      if(right==0){
        resString="$"+l.toString()+",00"+r.toString()+".00";
      }else if(right>0 && right<9){
        resString="$"+l.toString()+",00"+r.toString()+".0"+right.toString();
      }else{
        resString="$"+l.toString()+",00"+r.toString()+"."+right.toString();
      }
    }else if(r<1000 && r>=100){
      if(right==0){
        resString="$"+l.toString()+","+r.toString()+".00";
      }else if(right>0 && right<9){
        resString="$"+l.toString()+","+r.toString()+".0"+right.toString();
      }else{
        resString="$"+l.toString()+","+r.toString()+"."+right.toString();
      }
    }else{
      if(right==0){
        resString="$"+l.toString()+",000"+".00";
      }else if(right>0 && right<9){
        resString="$"+l.toString()+",000"+".0"+right.toString();
      }else{
        resString="$"+l.toString()+",000"+"."+right.toString();
      }
    }
  }else{
    if(right==0){
      resString="$"+_balanceL.toString()+".00";
    }else if(right>0 && right<9){
      resString="$"+_balanceL.toString()+".0"+right.toString();
    }else{
      resString="$"+_balanceL.toString()+"."+right.toString();
    }
  }

  return resString;
}


InGameScene.prototype._starRunning = function(a,size,timer){
  var max=size+0.2;
  var min=size;
  setTimeout(function(){
  setInterval(function hello() {
      TweenLite.to(a.scale, 0.5, {x:max,y:max,onComplete(){
        TweenLite.to(a.scale,0.5,{x:min,y:min});
      }});
    return hello;}(), 1010);
  },timer);



/*
  setInterval(function(){
    TweenMax.to(a, 0.2, {onComplete(){
      if(up){
        ac+=0.05;
        //console.log("up "+up);
        if(ac>=max){
          up=false;
        }
      }else{
        ac-=0.05;
        //console.log("up "+up);
        if(ac<=min){
          up=true;
        }
      }
      a.scale.set(ac);
    }});
  },200);

*/
}

