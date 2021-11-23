var xqu = xqu || {};

// ------------------
// NOTE : xqu Loader
// ------------------

xqu.Loader = function()
{
    this._container = new PIXI.Container();

    this._loadText = null;
	this._logo = null;

	this._callbacks = {};
	
    this.ctor();
}

xqu.Loader.EVENT_PROGRESS = 'xqu.Loader.EVENT_PROGRESS';
xqu.Loader.EVENT_ERROR = 'xqu.Loader.EVENT_ERROR';
xqu.Loader.EVENT_FINISHED = 'xqu.Loader.EVENT_FINISHED';

xqu.Loader.prototype.ctor = function()
{
    var self = this;

	ApiConnector.LoadingStart();
};

xqu.Loader.prototype.getTransform = function()
{
    return this._container;
};

xqu.Loader.prototype.addEventListener = function(type, callback)
{
	this._callbacks[type] = callback;
};

xqu.Loader.prototype.preload = function(res)
{
	var self = this;
	
	for(var key in res) {
		Loader.add(key, res[key]);
		// xqu.log("load -> key : " + ", res = " + res[key]);
	}

	Loader.onProgress.add(self._onLoadProgress.bind(self));
	Loader.onError.add(self._onLoadError.bind(self))
	Loader.load(self._onLoadFinished.bind(self));	
};

xqu.Loader.prototype._onLoadProgress = function(loader, resource)
{
	var self = this;
	var name = resource.name;
	var url = resource.url;
	var progress = loader.progress;
	var progressInt = (Math.ceil(loader.progress) >= 100) ? 100 : (Math.ceil(loader.progress));

	var progressStr = progressInt + "%";

	xqu.log("loading -> " + "progress(" + progressInt + ", name(" + name + "), url(" + url + ")");
	xqu.log("Loading " + progressStr);

	// this._loadText.text = progressStr;

	ApiConnector.LoadingUpdate(progressInt);
};

xqu.Loader.prototype._onLoadError = function(err, loader, resource)
{
	xqu.log("Loading Error ==> " + err);
	xqu.log(err);
};

xqu.Loader.prototype._onLoadFinished = function(r, e)
{
	var self = this;

	// this._container.removeChild(this._logo);
	// this._container.removeChild(this._loadText);

	var callback = this._callbacks[xqu.Loader.EVENT_FINISHED];

	if(callback != null)
	{
		var callbackFunc = callback.func;
		var callbackObj = callback.scope;

		callbackFunc.call(callbackObj, {target:self});
	}	

	// NOTE: Auido cannot be automatically played on Mobile Devices
	if(!xqu.sys.isMobile)
	{
		// xqu.audio.playMusic('Snd_Bg', true);
	}

	ApiConnector.LoadingFinished();
};
