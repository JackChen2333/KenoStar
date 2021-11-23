
'use strict';


function PlayButtonEmitter() {
    // this._container = new PIXI.Sprite();
    // this._container = new PIXI.Container();
    this._spriteContainer = new PIXI.Container();
    this._emitterContainer = new PIXI.ParticleContainer();
    this._container = new PIXI.Container();

    this._container.addChild(this._spriteContainer);
    //this._container.addChild(this._emitterContainer);
    this._spriteContainer.addChild(this._emitterContainer);

    this._pivot=null;
    this._emitter = null;

    this._setX=null;
    this._setY=null;

    this._ctor();

}



PlayButtonEmitter.prototype._ctor = function()
{
    var self = this;

    this._pivot = new Sprite(TextureCache['star_forSlot.png']);
  
    this._pivot.anchor.set(0.5);
    this._pivot.scale.set(2);
    this._pivot.visible=false;
    this._spriteContainer.addChild(this._pivot);

    this.createEmitter();

    PIXI.Ticker.shared.add( self._update, self );
};

PlayButtonEmitter.prototype._setPos = function(x,y){
  var self=this;

  this._pivotX=x;
  this._pivotY=y;
}

PlayButtonEmitter.prototype._getPos = function(x,y){

}

PlayButtonEmitter.prototype._showStar = function () {
  var self=this;
  this._pivot.visible=true;
}

PlayButtonEmitter.prototype._hideStar = function () {
  var self=this;
  this._pivot.visible=false;
}

PlayButtonEmitter.prototype.animHide = function (sx,sy,ex,ey,timer) {
  var self = this;
  this._pivot.x = sx;
  this._pivot.y = sy;
  this._pivot.visible = false;

  TweenMax.to(this._pivot, timer,{
    x:ex,y:ey,
    onUpdate:function(){
      //xqu.log("start test position  " + self._pivot.position.x + ", y = " + self._pivot.position.y);
      self.updatePos(self._pivot.position.x , self._pivot.position.y);
    },
    onComplete:function(){
      self._emitter.emit=false;
    }
  });
}


PlayButtonEmitter.prototype.anim = function (sx,sy,ex,ey,timer) {
  var self = this;
  this._pivot.x = sx;
  this._pivot.y = sy;
  this.cleanUp();
  this._emitter.emit=true;

  TweenMax.to(this._pivot, timer,{
    x:ex,y:ey,
    onUpdate:function(){
      //xqu.log("start test position  " + self._pivot.position.x + ", y = " + self._pivot.position.y);
      self.updatePos(self._pivot.position.x , self._pivot.position.y);
    },
    onComplete:function(){
      self._emitter.emit=false;
    }
  });
}



PlayButtonEmitter.prototype.createEmitter = function()
{
    var self = this;

    this._emitter = new PIXI.particles.Emitter(

        // The PIXI.Container to put the emitter in
        // if using blend modes, it's important to put this
        // on top of a bitmap, and not use the root stage Container
        self._emitterContainer,

        // The collection of particle images to use
        [PIXI.Texture.from('ingame_play_button_emitter.png')],

        // Emitter configuration, edit this to change the look
        // of the emitter
        PlayButtonEmitter.emitterConfig
    );

    this._emitter.emit = false;

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
    //xqu.log(x + ", " + y);
    this._emitter.updateSpawnPos(x, y);
    // this._emitter.updateOwnerPos(x, y);
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
    min: 0.1,
    max: 0.2
  },
  blendMode: "normal",
  frequency: 0.0008,
  emitterLifetime: -1,
  maxParticles: 500,
  pos: {
    x: 0,
    y: 0
  },
  addAtBack: false,
  spawnType: "point"
}
