@echo off

set SourceDir=..\Assets_Raw\font\
set TargetDir=..\res\font\

echo.    
echo -------------------------------------------    
echo From %SourceDir% to : %TargetDir%
echo -------------------------------------------   
echo.  


echo ****************************   Clean Up Target Dir :  %TargetDir%
if exist %TargetDir% rmdir %TargetDir% /s /q

call xcopy "%SourceDir%" "%TargetDir%" /i /s /y >nul

pause