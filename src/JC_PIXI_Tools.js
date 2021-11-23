/* ---------- PIXI tools  ---------------
 *  import pixi.js first
 *
 *  1 - button event for mobile and computer
 *  2 - PIXI Spine  
 *    1 -  start spine animation  
 *    2 -  stop spine animation  
 *    3 -  change action  
 *    4 -  set position  
 *    5 -  set scale  
 *    6 -  set visible  
 *    7 -  set alpha  
 *    8 -  get spine obj  
 *    9 -  PRIVATE : get str what u input for your file
 *
 */

function JC_PIXI_Tools(){
  // simplify PIXI init
  this.TC=PIXI.utils.TextureCache;
  this.Sprite=PIXI.Sprite;

  //1 -  button event for mobile and computer  
  //---- including "mousedown, mouseup, mouseout, click"
  this.Btn=function(btn,act,fn){
    if(act=="mousedown"){
      btn.mousedown=btn.touchstart=fn;
    }else if(act=="mouseup"){
      btn.mouseup=btn.touchend=fn;
    }else if(act=="mouseout"){
      btn.mouseout=btn.touchendoutside=fn;
    }else if(act=="click"){
      btn.click=btn.tap=fn;
    }
  }
  //--- for finger and mouse end ---

  //2 -  PIXI Spine 
  //---- simplify pixi spine
  this.JC_PIXI_SPINE=function(res,str){
    this.obj= new PIXI.spine.Spine(getRes(res,str).spineData);
    this.obj.skeleton.setToSetupPose();
    this.obj.autoUpdate = false;

    //1 -  start spine animation  
    this.start=function(actName,loop){
      this.obj.autoUpdate=true;
      this.useAct(0,actName,loop);
    }

    this.update=function(bool){
      this.obj.autoUpdate=bool;
    }

    //2 -  stop spine animation  
    // this means this.update(false);
    this.stop=function(){
      this.obj.autoUpdate=false;
    }

    //3 -  change action  
    this.useAct=function(zero,actName,loop){
      this.obj.state.setAnimation (zero, actName, loop);
    }

    //4 -  set position  
    this.setPosition=function(x,y){
      this.obj.position.set(x,y);
    }

    //5 -  set scale  
    this.setScale=function(x,y){
      this.obj.scale.set(x, y);
    }

    //6 -  set visible  
    // if u show an action first, then invisible it, then use another action, 
    // **** then show it, use setAlpha. Or there will be some strange error
    this.setVisible=function(bool){
      if(bool) this.obj.visible=true;
      else this.obj.visible=false;
    }

    //7 -  set alpha  
    this.setAlpha=function(x){
      this.obj.alpha=x;
    }

    //8 -  get spine obj  
    this.getObj=function(){
      return this.obj;
    }

    //9 - get str what u imput for your file, PRIVATE
    function getRes(res,str){
      for(var i in res){
        if(i==str){
          return res[str];
        }
      }
    }

  }
  //--- PIXI Spine end ---

}
