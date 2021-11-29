@echo off

REM Build the standalone version in Standalone folder for GitAction to publish it to the test website
call build.base.bat

@echo off

set SourceDir=.\Build\

set TargetDir=.\Standalone\

echo *************Standalone***************   Start Making Standalone version of "%GameName%"
	
REM Remove Target Dir
echo *************Standalone***************   Clean Up Target Dir :  %TargetDir%
if exist %TargetDir% rmdir %TargetDir% /s /q

echo *************Standalone***************   Copying Build Files to Standalone folder
call xcopy "%SourceDir%" "%TargetDir%" /i /s /y >nul
    
echo *************Standalone***************   Finished making Standalone version of "%GameName%"

REM PAUSE

@echo on
