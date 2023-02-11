@echo off
set buildType=Standard build
echo Starting build: %buildType%

set datestr=%date:~10,4%-%date:~7,2%-%date:~4,2%
echo Current date: %datestr%

set "htmlFile=mybuild-%datestr%.html"


@REM MEKE SUREC THAT THE FIRST ECHO USES '>', NOT '>>'  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111111111111
@REM echo %datestr% >%htmlFile%
type head.html >%htmlFile%
echo:>>%htmlFile%
echo:>>%htmlFile%
type commons.js >>%htmlFile%
echo:>>%htmlFile%
type output.js >>%htmlFile%
echo:>>%htmlFile%
type input.js >>%htmlFile%
echo:>>%htmlFile%
type 2d.js >>%htmlFile%
echo:>>%htmlFile%
type model.js >>%htmlFile%
echo:>>%htmlFile%
type view.js >>%htmlFile%
echo:>>%htmlFile%
type controller.js >>%htmlFile%
echo:>>%htmlFile%

type index.html >>%htmlFile%


set /p buildType=Build '%buildType%' completed. Press Enter to exit. 
