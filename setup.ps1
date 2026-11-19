# One-step setup for the Devlok Toons studio on a new Windows computer.
# Installs HyperFrames, the Python voice tools and ffmpeg, and downloads the background music.
# Safe to run again: it skips anything already there.
# Run from the studio folder:  powershell -ExecutionPolicy Bypass -File setup.ps1
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"
Set-Location $PSScriptRoot

function Step($t) { Write-Host "`n== $t" -ForegroundColor Cyan }
function Need($cmd, $url) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    Write-Host "Missing: $cmd. Install it from $url, open a new PowerShell window, and run setup.ps1 again." -ForegroundColor Red
    exit 1
  }
}

Step "Checking Node.js, Python and curl"
Need node "https://nodejs.org"
Need npm "https://nodejs.org"
Need curl.exe "Windows 10 or newer"
Need tar.exe "Windows 10 or newer"
$py = $null
if (Get-Command py -ErrorAction SilentlyContinue) { $py = @("py", "-3") }
elseif (Get-Command python -ErrorAction SilentlyContinue) { $py = @("python") }
else { Need python "https://www.python.org/downloads/ (tick 'Add python.exe to PATH')" }
Write-Host ("node " + (node -v))

Step "HyperFrames (npm install)"
if (Test-Path node_modules\.bin\hyperframes.cmd) { Write-Host "already installed" }
else { npm install --no-audit --no-fund; if ($LASTEXITCODE) { throw "npm install failed" } }

Step "Python voice tools (.venv)"
if (-not (Test-Path .venv\Scripts\python.exe)) {
  if ($py.Count -gt 1) { & $py[0] $py[1] -m venv .venv } else { & $py[0] -m venv .venv }
  if ($LASTEXITCODE) { throw "could not create .venv" }
}
.venv\Scripts\python -m pip install --quiet --disable-pip-version-check edge-tts soundfile numpy
if ($LASTEXITCODE) { throw "pip install failed" }
Write-Host "edge-tts, soundfile, numpy ready"

Step "ffmpeg (tools\ffmpeg\bin)"
if (Test-Path tools\ffmpeg\bin\ffmpeg.exe) { Write-Host "already installed" }
else {
  $zip = Join-Path $env:TEMP "devlok-ffmpeg.zip"
  $tmp = Join-Path $env:TEMP "devlok-ffmpeg"
  Write-Host "downloading (about 200 MB)..."
  curl.exe -sSL --fail -o $zip "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip"
  if ($LASTEXITCODE) { throw "ffmpeg download failed" }
  if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
  New-Item -ItemType Directory -Force $tmp, tools\ffmpeg\bin | Out-Null
  tar.exe -xf $zip -C $tmp
  Get-ChildItem $tmp -Recurse -Filter *.exe | Where-Object { $_.Directory.Name -eq "bin" } | Move-Item -Destination tools\ffmpeg\bin -Force
  Remove-Item -Recurse -Force $tmp, $zip
  if (-not (Test-Path tools\ffmpeg\bin\ffmpeg.exe)) { throw "ffmpeg.exe not found after unzip" }
  Write-Host "installed"
}

Step "Background music (music\, from Pixabay)"
New-Item -ItemType Directory -Force music, output\with-music, output\covers | Out-Null
$music = [ordered]@{
  "calm-vrindavan-prayer.mp3"       = "https://cdn.pixabay.com/download/audio/2026/07/09/audio_83ae21befc.mp3?filename=lunarboommusic-vrindavan-prayer-564673.mp3"
  "action-tabla-raga-pulse.mp3"     = "https://cdn.pixabay.com/download/audio/2026/08/01/audio_3d4d61382c.mp3?filename=alex-morgan-tabla-rhythmic-raga-pulse-578507.mp3"
  "sad-classical-instrumental.mp3"  = "https://cdn.pixabay.com/download/audio/2025/02/13/audio_aff74088a5.mp3?filename=fictionvfxstudio-classical-instrumental-sad-music-300916.mp3"
}
$musicOk = $true
foreach ($name in $music.Keys) {
  $out = Join-Path "music" $name
  if ((Test-Path $out) -and (Get-Item $out).Length -gt 1MB) { Write-Host "$name already there"; continue }
  curl.exe -sSL --fail -A "Mozilla/5.0" -o $out $music[$name]
  if ($LASTEXITCODE -or -not (Test-Path $out) -or (Get-Item $out).Length -lt 1MB) {
    if (Test-Path $out) { Remove-Item $out }
    Write-Host "$name could not be downloaded. Get it by hand from the Pixabay page listed in SETUP.md." -ForegroundColor Yellow
    $musicOk = $false
  } else { Write-Host "$name downloaded" }
}

Step "ElevenLabs voice key"
if (Test-Path .elevenlabs-key) {
  .venv\Scripts\python scripts\eleven.py usage
} else {
  Write-Host "No .elevenlabs-key file yet. Create your key at https://elevenlabs.io, then run:" -ForegroundColor Yellow
  Write-Host '  Set-Content .elevenlabs-key "PASTE_YOUR_KEY_HERE"'
  Write-Host "Without a key, use the free Microsoft voice (see SETUP.md, step 6)."
}

Step "Done"
if ($musicOk) { Write-Host "Studio is ready. Test it with Episode 16 (SETUP.md, step 8)." -ForegroundColor Green }
else { Write-Host "Studio is ready except some music files (see above)." -ForegroundColor Yellow }
