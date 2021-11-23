
@echo off


set ProjectName=Splash Scene
set AssetsFolder=../Assets_Raw/splash_scene/

set baseName=splash_scene
set baseFolder=../res/

set plistName=%baseFolder%%baseName%.json
set pngName=%baseFolder%%baseName%.png
set plistNameMultipack=%baseFolder%%baseName%_{n1}.json
set pngNameMultipack=%baseFolder%%baseName%_{n1}.png


echo.    
echo -------------------------------------------    
echo Project: %ProjectName%
echo -------------------------------------------   
echo.       

REM For multi-pack
call TexturePacker --multipack  --max-size 4096 --data %plistNameMultipack% --format pixijs --sheet %pngNameMultipack% %AssetsFolder%

REM For-Signle Pack
REM call TexturePacker --data %plistName% --format cocos2d-x --sheet %pngName% %AssetsFolder%

