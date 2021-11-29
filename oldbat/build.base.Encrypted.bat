@echo off

set SourceDir=.\Build\
set SourceFile=game.min.js

set TmpEncryptFile=game.min.obfuscate.js


    

REM You need to install javascript-obfuscator
REM https://www.npmjs.com/package/javascript-obfuscator
REM ********* Do not forget the -g otherwise you will have trouble ************
REM npm install  javascript-obfuscator --save -g 
echo *******ENCRYPT*******   Start obfuscating "%SourceDir%%SourceFile%"

pushd %SourceDir%

echo *******ENCRYPT*******   Creating obfuscated file "%SourceDir%%TmpEncryptFile%"
call javascript-obfuscator %SourceFile% --output %TmpEncryptFile% --compact true --self-defending true


echo *******ENCRYPT*******   Deleting the orginal file "%SourceDir%%SourceFile%"
if exist %SourceFile% call del %SourceFile%


echo *******ENCRYPT*******   Moving the Obfuscated file "%SourceDir%%TmpEncryptFile%" to  "%SourceDir%%SourceFile%"
call ren %TmpEncryptFile% %SourceFile% 


echo *******ENCRYPT*******   Finished obfuscating "%SourceFile%"


popd

REM PAUSE

@echo on



