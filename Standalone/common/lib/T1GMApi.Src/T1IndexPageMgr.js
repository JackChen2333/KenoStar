
'use strict';

var T1IndexPageMgr = function(t1GMApi) {
    this._t1GMApi = t1GMApi;
    // content Div
    // this._contentDiv = null;

    this._cssFileURL = './common/css/index.css';

    // Preloader
	this._loaderDiv = null;
    this._loadingBarDiv = null;

    // Messaging
	this._messagingDiv = null;

    // StatusBar
    this._statusBarBalance = null;
    this._statusBarCost = null;
    this._statusBarWin = null;
    
    // OverlayHolder
    this._overlayHolder = null;
    this._overlayBtnHome = null;
    this._overlayBtnSound = null;
    this._overlayBtnInfo = null;
    this._overlayBtnClose = null;
    this._overlayLoadedContent = null;

    // Full Screen Prompt
    this._fullScreenPrompt = null;

    // Roatation Screen Prompt
    this._rotateScreenPrompt = null;
}

T1IndexPageMgr.prototype.init = function() {
    var self = this;

    // self._initContentDiv();

    // self._initGameDiv();

    self._createIndexPageContentDivByTemplate();

    self._loadCssFile();

    self._initStatusBar();

    self._initLoader();

    self._initMessagingDiv();    

    self._initOverlayHolder();

    self._initScreenPrompt();
    
    self._initPublications();
}

// T1IndexPageMgr.prototype._initContentDiv = function() {
//     this._contentDiv = document.createElement('div');
//     // this._contentDiv.setAttribute('id', 'content');
//     this._contentDiv.id = 'content';
//     document.body.appendChild(this._contentDiv);
// }

// T1IndexPageMgr.prototype._initGameDiv = function() {
//     this._gameDiv = document.createElement('div');
//     this._gameDiv.id = 'game';
//     this._contentDiv.appendChild(this._gameDiv);
// }

T1IndexPageMgr.prototype._initLoader = function () {
    var self = this;

    self._loaderDiv = document.getElementById("loader");
	self._loadingBarDiv = document.getElementById("loadingBarMeter");
    self._loaderVersion = document.getElementById("deploymentVersion");

    self._loaderVersion.innerHTML = T1Config.LoaderVersion;
   
	self._loaderDiv.style.display = 'none';
	self._loadingBarDiv.style.width = '0%';
}

T1IndexPageMgr.prototype._initMessagingDiv = function () {
    var self = this;

    self._messagingDiv = document.getElementById("messaging");
    self._messagingDiv.style.display = 'flex';

    document.getElementsByClassName('action')[0]
        .addEventListener('click', function (event) {
            self._t1GMApi.publishEvent(self._t1GMApi.publications.AUDIO_ENABLED);
            if (self._t1GMApi.getGameOptions().isLoaded) {
                self._t1GMApi.publishEvent(self._t1GMApi.publications.GAME_IS_READY_TO_PLAY);
            }
        });
    document.getElementsByClassName('action')[1]
        .addEventListener('click', function (event) {
            self._t1GMApi.publishEvent(self._t1GMApi.publications.AUDIO_DISABLED);
            if (self._t1GMApi.getGameOptions().isLoaded) {
                self._t1GMApi.publishEvent(self._t1GMApi.publications.GAME_IS_READY_TO_PLAY);
            }
        });
}

T1IndexPageMgr.prototype._createIndexPageContentDivByTemplate = function() {
    var content = this._readTextFile('./common/lib/index.content.div.template.html');
    // console.log(content);
    // console.log(T1IndexPageMgr.DivTemplate);
    document.write(T1IndexPageMgr.DivTemplate);
}

T1IndexPageMgr.prototype._loadCssFile = function() {
    var cssId = 'TCss';  // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId))
    {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = this._cssFileURL;
        link.media = 'all';
        head.appendChild(link);
    }
}

T1IndexPageMgr.prototype._initStatusBar = function(){
    var self = this;

    // this._statusBarHolder = document.createElement('div');
    // this._statusBarHolder.id = 'statusBarHolder';    
    // this._contentDiv.appendChild(this._statusBarHolder);

    // this._statusBar = document.createElement('div');
    // this._statusBar.id = 'statusBar';
    // this._statusBarHolder.appendChild(this._statusBar);

    // this._statusBarBalance = document.createElement('div');
    // this._statusBarBalance.id = 'statusBar-balance';
    // this._statusBarBalance.class = 'statusBarContainer';
    // this._statusBarHolder.appendChild(this._statusBarBalance);

    self._statusBarBalance = document.getElementById('statusBar-balance');
    self._statusBarCost = document.getElementById('statusBar-cost');
    self._statusBarWin = document.getElementById('statusBar-win');
}

T1IndexPageMgr.prototype._updatePageBalance = function(v) 
{
	var self = this;
    self._statusBarBalance.children[0].innerHTML = t1GMApi.getGameOptions().gameMode == 'FUN' ? 'DEMO BALANCE:':'BALANCE:';
    self._statusBarBalance.children[1].innerHTML = T1Utils.formatMoney(v);
}

T1IndexPageMgr.prototype._updatePageCost = function(v) 
{
	var self = this;
    self._statusBarCost.children[0].innerHTML = 'COST:';
    self._statusBarCost.children[1].innerHTML = T1Utils.formatMoney(v);
}

T1IndexPageMgr.prototype._updatePageWin = function(v) 
{
	var self = this;
    self._statusBarWin.children[0].innerHTML = 'WIN:';
    if (v <= 0) {
        self._statusBarWin.children[1].innerHTML = '';
    } else {
        self._statusBarWin.children[1].innerHTML = T1Utils.formatMoney(v);
    }
}

T1IndexPageMgr.prototype._initPublications = function () {
	var self = this;

	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.GAME_LOADING_START, function() {
		// T1Utils.consoleLog('loading start');
		self._loadingStart()
	});

	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.GAME_LOADING_UPDATING, function(response) {
		self._loadingUpdate(response.data);
		// T1Utils.consoleLog('loading updating ' + response.data);
	});

	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.GAME_LOADING_FINISHED, function() {
		self._loadingFinished();
		// T1Utils.consoleLog('loading finished');
	});

 	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.AUDIO_ENABLED, function() {
		self._onPlayerMadeAudioDecisionAfterGameLoaded();
		// T1Utils.consoleLog('Audio Enabled after Game Loaded');
	});
    
	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.AUDIO_DISABLED, function() {
		self._onPlayerMadeAudioDecisionAfterGameLoaded();
		// T1Utils.consoleLog('Audio Disabled after game loaded');
	});    

	this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.PAGE_UPDATE_BALANCE, function(r) {
		self._updatePageBalance(r.data);
		// T1Utils.consoleLog('Audio Disabled after game loaded');
	});    

    this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.PAGE_UPDATE_COST, function(r) {
		self._updatePageCost(r.data);
		// T1Utils.consoleLog('Audio Disabled after game loaded');
	});    

    this._t1GMApi.subscribeToEvent(self._t1GMApi.publications.PAGE_UPDATE_WIN, function(r) {
		self._updatePageWin(r.data);
		// T1Utils.consoleLog('Audio Disabled after game loaded');
	});    

}

T1IndexPageMgr.prototype._loadingStart = function() {
    var self = this;
	self._loaderDiv.style.display = 'flex';
	self._loadingBarDiv.style.width = '0%';
}

T1IndexPageMgr.prototype._loadingUpdate = function(percentInt) {
    var self = this;
	self._loadingBarDiv.style.width = percentInt + '%';
}

T1IndexPageMgr.prototype._loadingFinished = function() {
    var self = this;
	//NOTE: If Player has not decided (Autio option), then the loading bar keep showing on the screen.
    if (self._messagingDiv.style.display == 'none') {
        self._loaderDiv.style.display = 'none';
    }
}

T1IndexPageMgr.prototype._onPlayerMadeAudioDecisionAfterGameLoaded = function() {
    var self = this;

    self._messagingDiv.style.display = 'none';

    if (t1GMApi.getGameOptions().isLoaded) {
        self._loaderDiv.style.display = 'none';
    }
   
}




/*
|--------------------------------------------------------------------------
| Overlay Holder
|--------------------------------------------------------------------------
*/

T1IndexPageMgr.prototype._initOverlayHolder = function(){
    var self = this;

    self._overlayHolder = document.getElementById('overlayHolder');

    self._overlayBtnHome = document.getElementById('overlay-home');
    self._overlayBtnSound = document.getElementById('overlay-sound');
    // self._overlayBtnInfo = document.getElementById('overlay-info');
    self._overlayBtnClose = document.getElementById('overlay-close');

    self._overlayLoadedContent = document.getElementById('loadedContent');
    self._loadHowToPlayContent();

    self._overlayBtnHome.addEventListener('click', function (event) {
        // TODO: Redirect to game lobby when we have server ready.
        location.href = "http://www.tournament1.com";
    });

    self._overlayBtnSound.addEventListener('click', function (event) {
        var audioStatus = self._t1GMApi.getGameOptions().audio;
        if (audioStatus == true) {
            // console.log('page manager : audio will be disabled, audioStatus = ' + audioStatus);
            self._t1GMApi.publishEvent(self._t1GMApi.publications.AUDIO_DISABLED);
            self._disableOverlayBtnSound();
        } else if (audioStatus == false) {
            // console.log('page manager audio will be enabled, audioStatus = ' + audioStatus);
            self._t1GMApi.publishEvent(self._t1GMApi.publications.AUDIO_ENABLED);
            self._enableOverlayBtnSound();
        }
    });


    self._overlayBtnClose.addEventListener('click', function (event) {
        self.hideOverlayHolder();
    });

}

T1IndexPageMgr.prototype.showOverlayHolder = function(){
    this._overlayHolder.className = "active";

    if (this._t1GMApi.getGameOptions().audio == true) {
        this._enableOverlayBtnSound();
    } else {
        this._disableOverlayBtnSound();
    }

}

T1IndexPageMgr.prototype.hideOverlayHolder = function(){
    this._overlayHolder.className = "inactive";
}

T1IndexPageMgr.prototype._enableOverlayBtnSound = function(){
    var self = this;
    self._overlayBtnSound.className = "button active";
}

T1IndexPageMgr.prototype._disableOverlayBtnSound = function(){
    var self = this;
    self._overlayBtnSound.className = "button inactive";
}

T1IndexPageMgr.prototype._loadHowToPlayContent = function() {
    // TODO: We current use local text files to show the 'how to play' help page,
    //       We do need to get the text content from the serer in the future.

    var infoContent = this._readTextFile('./res/help.txt');
    this._overlayLoadedContent.innerHTML = infoContent;
}


T1IndexPageMgr.prototype._readTextFile = function(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                // alert(allText);
            }
        }
    }
   
    rawFile.send(null);

    return rawFile.responseText;
}



/*
|--------------------------------------------------------------------------
| Full Screen Prompt Holder and Roatation Screen Prompt
|--------------------------------------------------------------------------
*/
T1IndexPageMgr.prototype._initScreenPrompt = function() {
    var self = this;

    this._fullScreenPrompt = document.getElementById('fullscreenPrompt');
    this._rotateScreenPrompt = document.getElementById('rotatePrompt');

    // this._showRotateScreenPrompt();

    var isMobile = (self._t1GMApi.getGameOptions().channel == 'mobile') ? true : false;
    // var isMobile = false;

    if (isMobile) {
        // this._showFullScreenPrompt();
        // this._hideRotateScreenPrompt();
        this._setupListenerForMobile();
        this._fullScreenPrompt.addEventListener('click', function (event) {
            // TODO:
        });
    } else {
        this._hideFullScreenPrompt();
    }
}


T1IndexPageMgr.prototype._setupListenerForMobile = function() {
    var self = this;

    var body = document.body;
    // self._fullScreenPrompt.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
    body.style.height = '110vh';

    // var body = document.body;
    // body.style.height = 1000 + 'px';

    var touchStartY = 0;
    var touchCurrY = 0;
    var touchEndY = 0;

    this._fullScreenPrompt.ontouchstart = function(e) {
        console.log('touch start');
        touchStartY = e.touches[0].clientY;
    }

    this._fullScreenPrompt.ontouchmove = function(e) {
        console.log('touch moving');
        // var x = e.touches[0].clientX;
        touchCurrY = e.touches[0].clientY;
        body.style.position = 'absolute';
        var top = (touchStartY - touchEndY);
        body.style.top = top + 'px';
        window.scrollTo(0,top);
        // console.log('x,y(%i, %i), top(%i), offsetHeight(%i))', x, y,_fullScreenPrompt.style.top, _fullScreenPrompt.offsetHeight);
    }

    this._fullScreenPrompt.ontouchend = function(e) {
        console.log('touch end');
    }

    setInterval(function(){
        // console.log('aaaaaaaaa');
        // var check = ((self._fullScreenPrompt.height == window.innerHeight));
        var innerHeight = window.innerHeight;
        var innerWidth = window.innerWidth;
        var outterHeight = window.screen.height;
        var outterWidth = window.screen.width;
        // var outterHeight = 829;
        // console.log('innerHeight(%i), outterHeight(%i), outterWidth(%i)', innerHeight, outterHeight, outterWidth);

        if (innerHeight > innerWidth) { // Portrait
            self._hideRotateScreenPrompt();
            // NOTE: For iphone 11
            var check = (innerHeight >= (outterHeight - (outterHeight * 0.1) - 30));
            // alert(innerHeight + ', ' + outterHeight);
            if (check) {
                // self._fullScreenPrompt.className = 'hide';
                // _fullScreenPrompt.className = '';
                self._hideFullScreenPrompt();
            } else {
                // self._fullScreenPrompt.className = '';
                self._showFullScreenPrompt();
                // alert(innerHeight + ', ' + outterHeight);
                // _fullScreenPrompt.className = 'hide';
            }
        } else { // Landscape
            self._showRotateScreenPrompt();
            self._hideFullScreenPrompt();
        }



    },10);
}

T1IndexPageMgr.prototype._showFullScreenPrompt = function() {
    this._fullScreenPrompt.className = '';
    // this._fullScreenPrompt.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
}

T1IndexPageMgr.prototype._hideFullScreenPrompt = function() {
    this._fullScreenPrompt.className = 'hide';
}

T1IndexPageMgr.prototype._showRotateScreenPrompt = function() {
    this._rotateScreenPrompt.className = '';
    // this._fullScreenPrompt.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
}

T1IndexPageMgr.prototype._hideRotateScreenPrompt = function() {
    this._rotateScreenPrompt.className = 'hide';
}



T1IndexPageMgr.prototype.updateWindowName = function(n) {
    document.title = n;
}


T1IndexPageMgr.prototype._toggleFullScreen = function() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

T1IndexPageMgr.DivTemplate = '<div id="content"> \
    <div id="game"></div> \
\
    <div id="statusBarHolder"> \
        <div id="statusBar"> \
            <div id="statusBar-balance" class="statusBarContainer"> \
                <span class="statusBar-title">DEMO BALANCE:</span> \
                <span class="statusBar-value">$1,000</span> \
            </div><div id="statusBar-cost" class="statusBarContainer"> \
                <span class="statusBar-title">COST:</span> \
                <span class="statusBar-value">$1</span> \
            </div><div id="statusBar-win" class="statusBarContainer"> \
                <span class="statusBar-title">WIN:</span> \
                <span class="statusBar-value"></span> \
            </div> \
        </div> \
    </div> \
\
    <div id="loader" style="display: none;"> \
        <div id="deploymentVersion"><span></span></div> \
        <div id="loader-header" class="show"></div> \
        <div id="logo"> \
            <img id="logoImg" src="./common/img/logo.png"> \
        </div> \
        <div id="loadingBarHolder"> \
            <div class="meter"> \
                <span id="loadingBarMeter" style="width: 0%;"></span> \
            </div> \
        </div> \
        <div id="disclaimer"> \
            <img id="disclaimerImg" src="./common/img/legal.png"> \
        </div> \
    </div> \
\
    <div id="rotatePrompt" class="hide"> \
        <img src="./common/img/rotatePortrait.gif"> \
    </div> \
\
    <div id="fullscreenPrompt" class="hide"> \
        <img src="./common/img/tap.gif"> \
    </div> \
\
    <div id="messaging" class="show" style="display: none;">  \
        <div id="messageBox">  \
            <div id="messageDetails"> \
                <div id="messageHeader">Sounds</div> \
                <div id="messageDescription">Do you want to enable sounds?</div> \
            </div> \
            <div id="messageActions"> \
                <a class="action" data-action="acceptSounds">YES</a> \
                <a class="action" data-action="declineSounds">NO</a></div> \
            <div id="errorCode"></div> \
        </div> \
    </div> \
\
    <div id="overlayHolder" class="inactive"> \
        <div id="infoOverlay" class=""> \
            <div id="overlaySpacer"></div> \
            <div id="overlayControls"> \
                <div id="overlayControlsWrapper" class="controlsWrapper"> \
                    <div id="overlay-home" class="button inactive"></div> \
                    <div id="overlay-sound" class="button inactive"></div> \
                    <!-- <div id="overlay-info" class="button inactive"></div> --> \
                    <div id="overlay-close" class="button inactive"></div> \
                </div> \
            </div> \
            <div id="overlayContent" class="scrollable"> \
                <div id="loadedContent"> \
                \
                </div> \
            </div> \
            <div id="overlayFooter"></div> \
        </div> \
    </div>  \
</div> \
 \
<button title="HOOK DIV" style="width: 1px; height: 1px; position: absolute; top: -1000px; left: -1000px; z-index: 2; background-color: rgb(255, 0, 0);"></button>';