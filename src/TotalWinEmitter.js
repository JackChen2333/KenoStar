
'use strict';


function TotalWinEmitter() {
    this._container = new PIXI.Container();
    this._emitter = null;
    this._ctor();
}


TotalWinEmitter.prototype._ctor = function()
{
    var self = this;

    this.createEmitter();

    PIXI.Ticker.shared.add( self._update, self );
};

TotalWinEmitter.prototype.createEmitter = function()
{
    var self = this;

    this._emitter = new PIXI.particles.Emitter(

        // The PIXI.Container to put the emitter in
        // if using blend modes, it's important to put this
        // on top of a bitmap, and not use the root stage Container
        self._container,

        // The collection of particle images to use
        [PIXI.Texture.from('ingame_total_win_emitter_1.png'),
        PIXI.Texture.from('ingame_total_win_emitter_2.png'),
        PIXI.Texture.from('ingame_total_win_emitter_3.png'),
        PIXI.Texture.from('ingame_total_win_emitter_4.png'),
        PIXI.Texture.from('ingame_total_win_emitter_5.png'),
        PIXI.Texture.from('ingame_total_win_emitter_6.png'),
    	PIXI.Texture.from('ingame_total_win_emitter_7.png'),
        PIXI.Texture.from('ingame_total_win_emitter_8.png')],

        // Emitter configuration, edit this to change the look
        // of the emitter
        TotalWinEmitter.emitterConfig
    );

    this._emitter.emit = true;

};

TotalWinEmitter.prototype.cleanUp= function() {
    this._emitter.emit = false;
    this._emitter.cleanup();
};

TotalWinEmitter.prototype.enable = function() {
	this._emitter.emit = true;
}

TotalWinEmitter.prototype.disable = function() {
	this._emitter.emit = false;
}

TotalWinEmitter.prototype.getTransform = function() {
    return this._container;
};

TotalWinEmitter.prototype._update = function(delta)
{
    this._updateEmitter(delta / 60 * 1000);
};

TotalWinEmitter.prototype._updateEmitter = function(dt)
{
    this._emitter.update(dt * 0.001);
};


TotalWinEmitter.emitterConfig = {
	"alpha": {
		"start": 1,
		"end": 0
	},
	"scale": {
		"start": 0.4,
		"end": 0.1,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#e4f9ff",
		"end": "#3fcbff"
	},
	"speed": {
		"start": 300,
		"end": 0,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 360
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.2,
		"max": 1.8
	},
	"blendMode": "normal",
	"frequency": 0.056,
	"emitterLifetime": -1,
	"maxParticles": 50,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "circle",
	"spawnCircle": {
		"x": 0,
		"y": 0,
		"r": 0
	}
};