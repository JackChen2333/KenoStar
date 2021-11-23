
'use strict';


function AgainButtonEmitter() {
    this._container = new Sprite();
    //this._container = new PIXI.Container();

    this._emitter = null;
    this._ctor();
}


AgainButtonEmitter.prototype._ctor = function()
{
    var self = this;

    this.createEmitter();

    PIXI.Ticker.shared.add( self._update, self );
};

AgainButtonEmitter.prototype.createEmitter = function()
{
    var self = this;

    this._emitter = new PIXI.particles.Emitter(

        // The PIXI.Container to put the emitter in
        // if using blend modes, it's important to put this
        // on top of a bitmap, and not use the root stage Container
        self._container,

        // The collection of particle images to use
        [PIXI.Texture.from('ingame_play_button_emitter.png')],

        // Emitter configuration, edit this to change the look
        // of the emitter
        AgainButtonEmitter.emitterConfig
    );

    this._emitter.emit = true;

};

AgainButtonEmitter.prototype.cleanUp= function() {
    this._emitter.emit = false;
    this._emitter.cleanup();
};

AgainButtonEmitter.prototype.enable = function() {
	this._emitter.emit = true;
}

AgainButtonEmitter.prototype.disable = function() {
	this._emitter.emit = false;
}

AgainButtonEmitter.prototype.getTransform = function() {
    return this._container;
};

AgainButtonEmitter.prototype.updatePos = function(x, y) {
    this._emitter.updateSpawnPos(x, y);
    //this._emitter.updateOwnerPos(x, y);
}

AgainButtonEmitter.prototype._update = function(delta)
{
    this._updateEmitter(delta / 60 * 1000);
};

AgainButtonEmitter.prototype._updateEmitter = function(dt)
{
    this._emitter.update(dt * 0.001);
};


AgainButtonEmitter.emitterConfig = {
	"alpha": {
		"start": 1,
		"end": 0
	},
	"scale": {
		"start": 5,
		"end": 5,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#f8e3ff",
		"end": "#ff8b3d"
	},
	"speed": {
		"start": 200,
		"end": 50,
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
		"max": 0.8
	},
	"blendMode": "normal",
	"frequency": 0.001,
	"emitterLifetime": -1,
	"maxParticles": 100,
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
}
