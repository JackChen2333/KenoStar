"use strict";

// Do not change name of any Vars.

var baseFolder = "res/";
var audioType = 'mp3';
// var audioType = '{ogg, mp3}';
var audioFolder = "audio/";




// You can only add data for the "res" parameter in this file. Do not touch anything else before you ask your manager.
// "res" stores all the "link" of your artist assets and will do the loading work for you automatically.
var res = {
    // Splash Scene
    Splash_Scene_1 : baseFolder + 'splash_scene_1.json',
    SplashPage : baseFolder + 'SplashPage.json',

    // InGame Scene
    Ingame_Scene_1 : baseFolder + 'ingame_scene_1.json',
    Ingame_Scene_2 : baseFolder + 'ingamemain.json',
    Ingame_Scene_3 : baseFolder + 'ingamebtn.json',
    Ingame_Scene_AutoplayLayer : baseFolder + 'ingameautoplaylayer.json',

    // Btimap Font
    Ingame_UnselectFont : baseFolder + 'font/unselectPink.fnt',
    Ingame_payoutWhiteWinSlot : baseFolder + 'font/payoutWhiteWinSlot.fnt',
    Ingame_payoutWhiteWinPrice : baseFolder + 'font/payoutWhiteWinPrice.fnt',
    Ingame_payoutPurple : baseFolder + 'font/payoutPurple.fnt',
    Ingame_payoutWin : baseFolder + 'font/payoutWin.fnt',
    Ingame_Wager : baseFolder + 'font/setWagerFont.fnt',
    Ingame_msg : baseFolder + 'font/font_messageWindow.fnt',
    AutoPlayLayerDes : baseFolder + 'font/BMFont_JT_Auto_Play_Setting_description.fnt',
    AutoPlayLayerVal : baseFolder + 'font/BMFont_JT_Auto_Play_Setting_Value.fnt',


    // Audio
    Snd_Bg : baseFolder + audioFolder +  "bgMusicLoop" + "." + audioType,


    // Big Picture Scene
    Scene_Bg_1 : baseFolder + 'scene_bg_1.json'

};

var g_resources = {};
for (var key in res) {
    // xqu.log("key = " + key + ",        res = " + res[key]);
    g_resources[key.toString()] = res[key];
}
