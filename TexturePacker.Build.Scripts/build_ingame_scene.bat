
@echo off


set ProjectName=InGame Scene
set AssetsFolder=../Assets_Raw/ingame_scene/

set baseName=ingame_scene
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
call TexturePacker --multipack  --max-size 2048 --data %plistNameMultipack% --format pixijs --sheet %pngNameMultipack% %AssetsFolder%

REM For-Signle Pack
REM call TexturePacker --data %plistName% --format cocos2d-x --sheet %pngName% %AssetsFolder%

