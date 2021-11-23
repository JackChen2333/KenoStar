@echo off



SET MAKE_FILE=makelist
set TmpJsFileName=tmp.js
set TargetJSFile=..\T1GMApi.js


echo ****************************   Cleaning Up Temp JS File :  (%TmpJsFileName%)
if exist %TmpJsFileName% call del /f %TmpJsFileName%

echo ****************************   Cleaning Up Target JS File :  (%TargetJSFile%)
if exist %TargetJSFile% call del /f %TargetJSFile%


echo ****************************   Building Temp JS File :  (%TmpJsFileName%)
for /f %%i in (%MAKE_FILE%) do type %%i >> %TmpJsFileName%



REM echo ****************************   Copying Tmp JS File(%TmpJsFileName%) to Target JS File(%TargetJSFile%)
call cp %TmpJsFileName% %TargetJSFile% -f >nul  
 

echo ****************************   Cleaning Up Temp JS File :  (%TmpJsFileName%)
if exist %TmpJsFileName% call del /f %TmpJsFileName%



REM PAUSE


@echo on


