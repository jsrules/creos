rem RUN AND DEL  <script> TAG ON before " let canvas = null;", MB FORMAT (alt-shift-F)
@echo off
set buildType=Standard build
echo Starting build: %buildType%

set datestr=%date:~10,4%-%date:~7,2%-%date:~4,2%
echo Current date: %datestr%

set "htmlFile=mybuild-%datestr%.html"



@REM MEKE SURE THAT THE FIRST ECHO HAS CORRCT NUMBER OF LINES .. SAME WITH MORE COMMAND IN THE END!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111111111111
@REM echo %datestr% >%htmlFile%


@REM MEKE SURE THAT THE FIRST OUTPUT TO THE FILE USES '>', NOT '>>'  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111111111111
@REM the line below is the easiest way to do linux-like 'head' command (type first N lines of a textfile)
@REM MEKE SURE THAT IT HAS CORRECT NUMBER OF LINES .. SAME WITH MORE COMMAND IN THE END!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111111111111
@REM OLDER VERSION WAS: type head.html >%htmlFile%
powershell -command "& {Get-Content index.html -TotalCount 32}" >%htmlFile%

@REM using caret sign ^ for lt and gt (for 'lesser' and 'greater' signs) :)
echo ^<script^> >>%htmlFile%

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

@REM the line below is the easiest way to do linux-like 'tail' command (type all last lines adter Nth line of a textfile)
@REM MEKE SURE THAT IT HAS CORRECT NUMBER OF LINES !!!!!!!!!!!!!!!!1111111111111111111111111111111111
more +41 index.html >>%htmlFile%


set /p buildType=Build '%buildType%' completed. Press Enter to exit. 
