@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup script for Windows
@REM ----------------------------------------------------------------------------

@echo off
setlocal

set ERROR_CODE=0

@REM Set local scope for the variables
set MAVEN_PROJECTBASEDIR=%~dp0
cd /d "%MAVEN_PROJECTBASEDIR%"

@REM Maven Wrapper JAR download URL
set DOWNLOAD_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar

@REM maven-wrapper.jar location
set WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.jar
set WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@REM Check if wrapper JAR exists
if not exist "%WRAPPER_JAR%" (
    echo.
    echo ERROR: Maven wrapper JAR not found!
    echo.
    echo SOLUTION: Please install Maven manually or use the following command:
    echo.
    echo   1. Download Maven from: https://maven.apache.org/download.cgi
    echo   2. Extract it to C:\Program Files\Apache\Maven
    echo   3. Add to PATH: C:\Program Files\Apache\Maven\bin
    echo.
    echo OR run this command to install Maven wrapper:
    echo   mvn -N wrapper:wrapper
    echo.
    goto error
)

@REM Find Java
set JAVA_EXE=java.exe

@REM Try to find java in PATH first
where java >nul 2>nul
if %ERRORLEVEL% equ 0 goto execute

if defined JAVA_HOME goto findJavaFromJavaHome

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found
echo.
goto error

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
goto error

:execute
@REM Debug: print resolved variables and the composed java command to help diagnose quoting issues
echo.
echo [DEBUG] MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR%
echo [DEBUG] WRAPPER_JAR=%WRAPPER_JAR%
echo [DEBUG] WRAPPER_LAUNCHER=%WRAPPER_LAUNCHER%
echo [DEBUG] JAVA_EXE=%JAVA_EXE%

@REM Remove trailing backslash from MAVEN_PROJECTBASEDIR to avoid escaping the trailing quote
set "PROJECT_DIR=%MAVEN_PROJECTBASEDIR%"
if "%PROJECT_DIR:~-1%"=="\" set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"

set CMDLINE=%JAVA_EXE% -classpath "%WRAPPER_JAR%" -Dmaven.multiModuleProjectDirectory="%PROJECT_DIR%" %WRAPPER_LAUNCHER% %*
echo [DEBUG] CMDLINE=%CMDLINE%
echo %CMDLINE% > "%PROJECT_DIR%\wrapper-debug.log"
@REM Execute Maven using resolved JAVA_EXE and cleaned project dir
"%JAVA_EXE%" -classpath "%WRAPPER_JAR%" -Dmaven.multiModuleProjectDirectory="%PROJECT_DIR%" %WRAPPER_LAUNCHER% %*
if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
@REM End local scope
endlocal
exit /B %ERROR_CODE%
