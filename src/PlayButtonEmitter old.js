
'use strict';


function PlayButtonEmitter(testcon) {
    this._container = testcon;
    //this._container = new PIXI.Container();
    this._emitter = null;
    this._ctor();
}


PlayButtonEmitter.prototype._ctor = function()
{
    var self = this;

    this.createEmitter();

    PIXI.Ticker.shared.add( self._update, self );
};

PlayButtonEmitter.prototype.createEmitter = function()
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
        PlayButtonEmitter.emitterConfig
    );

    this._emitter.emit = true;

};

PlayButtonEmitter.prototype.cleanUp= function() {
    this._emitter.emit = false;
    this._emitter.cleanup();
};

PlayButtonEmitter.prototype.enable = function() {
	this._emitter.emit = true;
}

PlayButtonEmitter.prototype.disable = function() {
	this._emitter.emit = false;
}

PlayButtonEmitter.prototype.getTransform = function() {
    return this._container;
};

PlayButtonEmitter.prototype.updatePos = function(x, y) {
    this._emitter.updateSpawnPos(x, y);
    //this._emitter.updateOwnerPos(x, y);
}

PlayButtonEmitter.prototype._update = function(delta)
{
    this._updateEmitter(delta / 60 * 1000);
};

PlayButtonEmitter.prototype._updateEmitter = function(dt)
{
    this._emitter.update(dt * 0.001);
};


PlayButtonEmitter.emitterConfig = {
  autoUpdate: true,
  alpha: {
    start: 0.8,
    end: 0.15
  },
  scale: {
    start: 1,
    end: 0.2,
    minimumScaleMultiplier: 1
  },
  color: {
    start: "#f5ff3d",
    end: "#f5ff3d"
  },
  speed: {
    start: 0,
    end: 0,
    minimumSpeedMultiplier: 1
  },
  acceleration: {
    x: 0,
    y: 0
  },
  maxSpeed: 0,
  startRotation: {
    min: 0,
    max: 0
  },
  noRotation: true,
  rotationSpeed: {
    min: 0,
    max: 0
  },
  lifetime: {
    min: 0.6,
    max: 0.6
  },
  blendMode: "normal",
  frequency: 0.0008,
  emitterLifetime: -1,
  maxParticles: 5000,
  pos: {
    x: 0,
    y: 0
  },
  addAtBack: false,
  spawnType: "point"
}
