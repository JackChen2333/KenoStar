@echo off

echo -------
echo -------

set SearchFileTypes=*.js
REM use comma-delimited ";" seprate each DIR
REM For example , set SearchDirs="src;res"
set SearchDirs="src"
REM use SPACE-delimited ";" seprate each STRING
REM For example , set SearchStrings="TODO function"
set SearchStrings="TODO"

echo TODOS FOUND:
findstr /s /n /i /l /d:%SearchDirs% %SearchStrings% %SearchFileTypes%
echo -------
echo -------
