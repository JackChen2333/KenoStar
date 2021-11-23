
"use strict";
var xqu = xqu || {};
xqu.pixi = {};


/*
|--------------------------------------------------------------------------
| Direcoter
|--------------------------------------------------------------------------
*/
xqu.pixi.director = {};
xqu.pixi.sceneList = [];
xqu.pixi.mainGame = null;

xqu.pixi.director._findMainGame = function()
{
	// xqu.pixi.mainGame = Stage.get

	var layers = Stage.children;
	xqu.log("layers = " + layers);
	var mainGameLayer = null;

	for(var i=0; i<layers.length; i++)
	{
		var layer = layers[i];
		if(layer.name)
		{
			if(layer.name == "MainGameLayer")
			{
				mainGameLayer = layer;
			}
		}
	}

	if(mainGameLayer)
	{
		xqu.pixi.mainGame = mainGameLayer.getChildAt(0);
	}	
};

xqu.pixi.director._isMainGameReady = function()
{
	if(!xqu.pixi.mainGame)
	{
		xqu.pixi.director._findMainGame();		
	}	

	return (xqu.pixi.mainGame != null);
};

xqu.pixi.director.runScene = function(pixiContainerInst)
{
	if(!xqu.pixi.director._isMainGameReady())
	{
		return;
	}

	
    xqu.pixi.mainGame.removeChildren();
    xqu.pixi.sceneList = [];

    xqu.pixi.sceneList.push(pixiContainerInst);
    xqu.pixi.mainGame.addChild(pixiContainerInst);
};

xqu.pixi.director.pushScene = function(pixiContainerInst)
{
	if(!xqu.pixi.director._isMainGameReady())
	{
		return;
	}
	
    xqu.pixi.sceneList.push(pixiContainerInst);
    xqu.pixi.mainGame.addChild(pixiContainerInst);
};




/*
|--------------------------------------------------------------------------
| Simple Button(Only supports 'Click' event)
|--------------------------------------------------------------------------
*/
xqu.pixi.SimpleButton = function(name, upTexture, downTexture, overTexture) {
    var o = {};

    o.EVENT_CLICK = "click";

    o._name = name;
    o.name = o._name;

    o._enabled = true;

    /**  Textures **/
    o._tUp = upTexture;
    o._tDown = downTexture;
    o._tOver = overTexture;

    /** Button State **/
    o._isDown = false;
    o._isOver = false;

    /** Button Sprite **/
    o._button = null;

    o._callbacks = {};

    o.setEnable = function(v)
    {
        o._button.interactive = v;
        o._button.buttonMode = v;
        o._enabled = v;
        if (v) {
            o._button.alpha = 1;
        } else {
            o._button.alpha = 0.5;
        }
    };

    o.getEnabled = function() {
        return o._enabled;
    }

    o.setVisible = function(v)
    {
        o._button.visible = v;
    };

    o.setAlpha = function(v)
    {
        o._button.alpha = v;
    };

    o.getTransform = function()
    {
        return o._button;
    };

    o.setPosition = function(x, y)
    {
        o._button.x = x;
        o._button.y = y;
    };

    o.setScale = function(x, y)
    {
        o._button.scale.x = x;
        o._button.scale.y = y;
    };

    o.getPosition = function()
    {
        return {x:o._button.x, y:o._button.y};
    };

    o.getSize = function()
    {
        return {x:o._button.width, y:o._button.height};
    };

    o._onButtonDown = function(e) {
        // console.log(o.getName() + " -> DOWN");
        o._isDown= true;
        o._button.texture = o._tDown;
        o._button.alpha = 1;
    };

    o._onButtonUp = function() {
        // console.log("UP");
        o._isdown = false;
        if (o._isOver) {
            o._button.texture = o._tOver;
        }
        else {
            o._button.texture = o._tUp;
        }
    };

    o._onButtonOver = function() {
        // xqu.log("OVER");
        o._isOver = true;
        if (o._isdown) {
            return;
        }
        o._button.texture = o._tOver;
    };

    o._onButtonOut = function() {
        // xqu.log("OUT");
        o._isOver = false;
        if (o._isdown) {
            return;
        }
        o._button.texture = o._tUp;
    };

    o._onButtonClick = function() {
        o._button.texture = o._tUp;

        if(o._callbacks[o.EVENT_CLICK] != null)
        {
            var callbackFunc = o._callbacks[o.EVENT_CLICK].func;
            var callbackObj = o._callbacks[o.EVENT_CLICK].scope;

            callbackFunc.call(callbackObj, {target:o});
        }

	    // if(xqu.sys.isMobile)
	    // {
		//     if(!xqu.audio.isMusicPlaying()) {
		// 	    xqu.audio.playMusic('Snd_Bg');
		//     }		    
	    // }
		
		xqu.sys.autoFullScreen();	    
    };

    o.addEventListener = function(type, callback)
    {
        o._callbacks[type] = callback;
    };

    (o.init = function() {
        // console.log("simple button initzed");
        o._button = new Sprite(o._tUp);

        o._button.anchor.set(0.5);
        o._button.interactive = true;
        o._button.buttonMode = true;

        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        // button events.

        o._button.on('pointerdown', o._onButtonDown.bind(o));
        o._button.on('pointerup', o._onButtonUp.bind(o));
        o._button.on('pointerupoutside', o._onButtonUp.bind(o));
        o._button.on('pointerover', o._onButtonOver.bind(o));
        o._button.on('pointerout', o._onButtonOut.bind(o));

        o._button.on('click', o._onButtonClick.bind(o));
        // For IOS
        o._button.on('tap', o._onButtonClick.bind(o));
    })();

    return o;
};


/*
|--------------------------------------------------------------------------
| Audio Button
|--------------------------------------------------------------------------
*/
xqu.pixi.SoundButton = function(name, upTextureOn, downTextureOn, overTextureOn,
                                 upTextureOff, downTextureOff, overTextureOff) {
    var o = {};

    o.EVENT_CLICK = "click";

    o._name = name;
    o.name = o._name;

    /**  Textures **/
    o._tUpOn = upTextureOn;
    o._tDownOn = downTextureOn;
    o._tOverOn = overTextureOn;
    o._tUpOff = upTextureOff;
    o._tDownOff = downTextureOff;
    o._tOverOff = overTextureOff;

    /** Button State **/
    o._soundOn = !xqu.audio.mute;
    o._isDown = false;
    o._isOver = false;

    /** Button Sprite **/
    o._button = null;

    o._callbacks = {};

    o.setEnable = function(v)
    {
        o._button.interactive = v;
        o._button.buttonMode = v;
    };

    o.setVisible = function(v)
    {
        o._button.visible = v;
    };

    o.setAlpha = function(v)
    {
        o._button.alpha = v;
    };

    o.getTransform = function()
    {
        return o._button;
    };

    o.setPosition = function(x, y)
    {
        o._button.x = x;
        o._button.y = y;
    };

    o.getPosition = function()
    {
        return {x:o._button.x, y:o._button.y};
    };

    o.getSize = function()
    {
        return {x:o._button.width, y:o._button.height};
    };

    o._onButtonDown = function(e) {
        // console.log(o.getName() + " -> DOWN");
        o._isDown= true;
        if(o._soundOn) {
            o._button.texture = o._tDownOn;
        } else {
            o._button.texture = o._tDownOff;
        }

        o._button.alpha = 1;
    };

    o._onButtonUp = function() {
        // console.log("UP");
        o._isdown = false;
        if (o._isOver) {
            if(o._soundOn) {
                o._button.texture = o._tOverOn;
            } else {
                o._button.texture = o._tOverOff;
            }
        }
        else {
            if(o._soundOn) {
                o._button.texture = o._tUpOn;
            } else {
                o._button.texture = o._tUpOff;
            }
        }
    };

    o._onButtonOver = function() {
        // console.log("OVER");
        o._isOver = true;
        if (o._isdown) {
            return;
        }
        if(o._soundOn) {
            o._button.texture = o._tOverOn;
        } else {
            o._button.texture = o._tOverOff;
        }

    };

    o._onButtonOut = function() {
        // console.log("OUT");
        o._isOver = false;
        if (o._isdown) {
            return;
        }
        if(o._soundOn) {
            o._button.texture = o._tUpOn;
        } else {
            o._button.texture = o._tUpOff;
        }
    };

	o._onButtonClick = function() {
		xqu.log("xqu.audio.mute = " + xqu.audio.mute);
	    if(xqu.audio.mute) {
		    o._soundOn = true;
		    xqu.audio.turnOnSound();
            o._button.texture = o._tUpOn;
	    } else {
		    o._soundOn = false;
		    xqu.audio.turnOffSound();		    
            o._button.texture = o._tUpOff;
        }

        // if(o._callbacks[o.EVENT_CLICK] != null)
        // {
        //     var callbackFunc = o._callbacks[o.EVENT_CLICK].func;
        //     var callbackObj = o._callbacks[o.EVENT_CLICK].scope;

        //     callbackFunc.call(callbackObj, {target:o});
        // }
		
		xqu.sys.autoFullScreen();
    };

    o.addEventListener = function(type, callback)
    {
        o._callbacks[type] = callback;
    };

    (o.init = function() {
        // console.log("simple button initzed");
        o._button = new Sprite(o._tUpOn);

        o._button.anchor.set(0.5);
        o._button.interactive = true;
        o._button.buttonMode = true;

        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        // button events.

        o._button.on('pointerdown', o._onButtonDown.bind(o));
        o._button.on('pointerup', o._onButtonUp.bind(o));
        o._button.on('pointerupoutside', o._onButtonUp.bind(o));
        o._button.on('pointerover', o._onButtonOver.bind(o));
        o._button.on('pointerout', o._onButtonOut.bind(o));

        o._button.on('click', o._onButtonClick.bind(o));
        // For IOS
        o._button.on('tap', o._onButtonClick.bind(o));
    })();

    return o;
};
