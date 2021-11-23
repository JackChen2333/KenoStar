@echo off

REM Build the standalone version in Standalone(with Encrypted version) folder for GitAction to publish it to the test website
call build.Standalone.bat


echo *************GIT**************   Start Git Process

call git add -A

call git commit -m "misc: make a testing version for artist to view"

call git push origin main

echo *************GIT**************   Finish Git Process

PAUSE

@echo on