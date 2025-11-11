@echo off
REM Simple Maven Runner for Windows
REM This script will download and run Maven without system installation

setlocal

set MAVEN_VERSION=3.9.5
set MAVEN_HOME=%USERPROFILE%\.maven\apache-maven-%MAVEN_VERSION%
set MAVEN_BIN=%MAVEN_HOME%\bin\mvn.cmd

REM Check if Maven is already downloaded
if exist "%MAVEN_BIN%" (
    echo Maven found at %MAVEN_HOME%
    goto run
)

echo Maven not found. Downloading Maven %MAVEN_VERSION%...
echo This will only happen once.
echo.

REM Create directory
if not exist "%USERPROFILE%\.maven" mkdir "%USERPROFILE%\.maven"

REM Download Maven
set MAVEN_ZIP=%USERPROFILE%\.maven\apache-maven-%MAVEN_VERSION%-bin.zip
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://archive.apache.org/dist/maven/maven-3/%MAVEN_VERSION%/binaries/apache-maven-%MAVEN_VERSION%-bin.zip' -OutFile '%MAVEN_ZIP%'}"

if %ERRORLEVEL% neq 0 (
    echo Failed to download Maven
    exit /b 1
)

echo Extracting Maven...
powershell -Command "& {Expand-Archive -Path '%MAVEN_ZIP%' -DestinationPath '%USERPROFILE%\.maven' -Force}"

if %ERRORLEVEL% neq 0 (
    echo Failed to extract Maven
    exit /b 1
)

del "%MAVEN_ZIP%"

echo Maven installation complete!
echo.

:run
REM Run Maven with all arguments
"%MAVEN_BIN%" %*

endlocal
