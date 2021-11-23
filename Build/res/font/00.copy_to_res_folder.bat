@echo off

set TargetDir=..\..\res\font\

echo.    
echo -------------------------------------------    
echo Output : %TargetDir%
echo -------------------------------------------   
echo.  

call xcopy "*.xml" "%TargetDir%"  /y
call xcopy "*.fnt" "%TargetDir%"  /y
call xcopy "*.png" "%TargetDir%"  /y