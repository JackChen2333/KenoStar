"use strict";

var xqu = xqu || {};

// ------------------
// NOTE : xqu Audio
// ------------------
xqu.audio = xqu.audio || {};
xqu.audio.mute = true;
xqu.audio.ins = {};
xqu.audio._isMusicPlaying = false;

// ainGame.prototype._initPublications = function(){
// 	var self = this;


// }

xqu.audio.findSnd = function(name) {
	return PIXI.sound.find(name);
};

xqu.audio.turnOnSound  = function()
{
    xqu.log("turn on sound");
	PIXI.sound.unmuteAll();
	xqu.audio.mute = false;	
};

xqu.audio.turnOffSound  = function()
{
    xqu.log("turn off sound");
	PIXI.sound.muteAll();
	xqu.audio.mute = true;	
};

xqu.audio.playEffect = function(name, loop)
{
    if(xqu.audio.mute)
    {
        return;
    }

	if(!loop) {
		loop = false;
	}
	
	if(PIXI.sound.exists(name)) {
		var ins = xqu.audio.findSnd(name);
		ins.play();
		ins.loop = loop;
	} else {
		xqu.log(false, "xqu.audio.playEffect: Cannot find audio name : " + name);
	}	
};

xqu.audio.stopEffect = function(name)
{
    if(xqu.audio.mute)
    {
        return;
    }
	
	if(PIXI.sound.exists(name)) {
		var ins = xqu.audio.findSnd(name);
		ins.stop();
	} else {
		xqu.log(false, "xqu.audio.stopEffect: Cannot find audio name : " + name);
	}	
};

xqu.audio.playMusic = function(name, loop)
{
    if(xqu.audio.mute)
    {
        return;
    }

	if(xqu.audio._isMusicPlaying) {
		return;
	}

	if(!loop) {
		loop = true;
	}

    // cc.audioEngine.playMusic(name, loop);
    // PIXI.sound.play(name);
    // var v = PIXI.sound.find(name);

    if(PIXI.sound.exists(name)) {
        var ins = PIXI.sound.find(name);
        ins.play();
	    ins.loop = loop;
	    xqu.audio._isMusicPlaying = true;	    
    } else {
        xqu.log(false, "xqu.audio.playMusic: Cannot find audio name : " + name);
    }
};

xqu.audio.isMusicPlaying = function()
{
    // return cc.audioEngine.isMusicPlaying();
	return xqu.audio._isMusicPlaying;
};


xqu.audio.pauseAll = function()
{
	PIXI.sound.pauseAll();	
};

xqu.audio.resumeAll = function()
{
	PIXI.sound.resumeAll();
};


xqu.audio.onWindowFocus = function()
{
	xqu.audio.resumeAll();	
};

xqu.audio.onWindowBlur = function()
{
	xqu.audio.pauseAll();
};


xqu.listener.addEventListener(xqu.listener.EVENT_WINDOW_ON_FOCUS,
                              new xqu.Callback(xqu.audio.onWindowFocus, xqu.audio));

xqu.listener.addEventListener(xqu.listener.EVENT_WINDOW_ON_BLUR,
                              new xqu.Callback(xqu.audio.onWindowBlur, xqu.audio));




xqu.log('xqu.audio is loaded');