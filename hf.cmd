@echo off
rem Run HyperFrames with the studio's own ffmpeg (no system-wide install needed).
rem Usage, from inside a video folder:  ..\hf render   /   ..\hf check   /   ..\hf snapshot --at 1,3,5
set "STUDIO=%~dp0"
set "HYPERFRAMES_FFMPEG_PATH=%STUDIO%tools\ffmpeg\bin\ffmpeg.exe"
set "HYPERFRAMES_FFPROBE_PATH=%STUDIO%tools\ffmpeg\bin\ffprobe.exe"
set "HYPERFRAMES_WHISPER_PATH=%STUDIO%tools\whisper\Release\whisper-cli.exe"
set "PATH=%STUDIO%tools\ffmpeg\bin;%PATH%"
call "%STUDIO%node_modules\.bin\hyperframes.cmd" %*
