@echo off

set SharedFolderRoot=D:\NetDriveWork\TournamentOne Corp Dropbox\TRGS_H5_Games\
set SourceDir=%SharedFolderRoot%KenoStars_TRGS_Demo_Raw.Assets.from.Artist\Engineer.Only\

set TargetDir=.\


set ToDeleteDir=.\audio
if exist %ToDeleteDir% rmdir %ToDeleteDir% /s /q
set ToDeleteDir=.\font
if exist %ToDeleteDir% rmdir %ToDeleteDir% /s /q
set ToDeleteDir=.\splash_scene
if exist %ToDeleteDir% rmdir %ToDeleteDir% /s /q
set ToDeleteDir=.\ingame_scene
if exist %ToDeleteDir% rmdir %ToDeleteDir% /s /q



echo ****************************   Copying Asset Files to Local folder (%SourceDir%)
call xcopy "%SourceDir%" "%TargetDir%" /i /s /y 



echo ****************************   Finished Copying

PAUSE

@echo on


