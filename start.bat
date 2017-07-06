@echo off
title Vokkit v0.0.1
:main
cls

echo.
echo 牟式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式
echo 弛
echo 弛    Vokkit v0.0.1
echo 弛
echo 弛
echo 弛   1. Start Server
echo 弛
echo 弛   2. Go to Github
echo 弛
echo 弛   3. Quit
echo 弛
echo 弛
echo 弛  Created by Scripter36(1350adwx)
echo 弛
echo 汎式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式

set /p a=Choose: 
if %a%==1 goto startServer
if %a%==2 goto github
if %a%==3 goto quit
cls
goto main

:startServer
cls
node index.js
cls
goto main

:github
cls
explorer https://github.com/Vokkit/Vokkit
goto main

:quit
cls
