@echo off

set GameName=FiestaBingo

REM set TargetDir=D:\Development\wamp\www\%GameName%\

REM if %computerName%==DESKTOPOO7 set TargetDir=C:\wamp64\www\%GameName%\

set TargetDir=.\Build\


REM Don't Modify Anything Below *************************
SET MAKE_FILE=makelist
set TmpJsFileName=game.min.tmp.js
set TargetJsFileName=game.min.js
    

echo *******BASE*******   Start Base Building "%GameName%"
echo *******BASE*******   Clean Up
if exist %TmpJsFileName% call del %TmpJsFileName%
if exist %TargetJsFileName% call del %TargetJsFileName%    
	
REM Remove Target Dir
echo *******BASE*******   Clean Up Target Dir :  %TargetDir%
if exist %TargetDir% rmdir %TargetDir% /s /q

echo *******BASE*******   Copying Template Index File
call xcopy "Template" "%TargetDir%" /i /s /y >nul
    
echo *******BASE*******   Copying Res Files
call xcopy "res" "%TargetDir%res\" /i /s /y >nul

echo *******BASE*******   Copying common Files
call xcopy "common" "%TargetDir%common\" /i /s /y >nul   

REM You need to install Python 3.X
echo *******BASE*******   Building Temp JS File :  (%TmpJsFileName%)
call python build_makelist.py
for /f %%i in (%MAKE_FILE%) do (type %%i >> %TmpJsFileName% 
echo. >> %TmpJsFileName% 
echo. >> %TmpJsFileName%)
call del "%MAKE_FILE%" /F /Q


REM You need to install nodeJs and uglifyjs on Widnows
REM https://nodejs.org/en/download/
REM Use uglifyjs and node to compress js file       
REM https://www.npmjs.com/package/uglify-js     
echo *******BASE*******   Compressing (%TmpJsFileName%) to (%TargetJsFileName%)
call uglifyjs %TmpJsFileName% --compress --mangle --output %TargetJsFileName%

rem call xcopy %TmpJsFileName% %TargetJsFileName% /i /y 
    
	
echo *******BASE*******   Copying (%TargetJsFileName%) to (%TargetDir%)
call xcopy %TargetJsFileName% "%TargetDir%" /i /y  >nul


echo *******BASE*******   Clean Up
if exist %TmpJsFileName% call del %TmpJsFileName%
if exist %TargetJsFileName% call del %TargetJsFileName%    

echo *******BASE*******   Finished Base Building "%GameName%"

REM PAUSE

@echo on


