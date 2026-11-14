$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $projectRoot

$port = 4174
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCommand) {
  Write-Host "Node.js 22.13 or newer is required. Install Node.js, then run start.bat again."
  exit 1
}

$dataDir = Join-Path $projectRoot "data"
New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
function Test-LocalServicePort {
  $client = New-Object System.Net.Sockets.TcpClient
  try {
    $connection = $client.ConnectAsync("127.0.0.1", $port)
    return $connection.Wait(500) -and $client.Connected
  } catch {
    return $false
  } finally {
    $client.Dispose()
  }
}

$serverProcess = $null
if (-not (Test-LocalServicePort)) {
  $env:PORT = [string]$port
  $serverProcess = Start-Process -FilePath $nodeCommand.Source -ArgumentList "server.cjs" -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $dataDir "server.log") -RedirectStandardError (Join-Path $dataDir "server-error.log")
}

$ready = $false
for ($attempt = 0; $attempt -lt 40; $attempt++) {
  if (Test-LocalServicePort) {
    $ready = $true
    break
  }
  if ($serverProcess -and $serverProcess.HasExited) { break }
  Start-Sleep -Milliseconds 250
}

if (-not $ready) {
  Write-Host "Terra could not start on port $port. Check data/server-error.log for details."
  exit 1
}

Write-Host "Terra Property Manager is running at http://127.0.0.1:$port"
Write-Host "Open that address in your browser and enter your name to reopen your saved workspace."
