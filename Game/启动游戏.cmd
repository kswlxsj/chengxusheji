@echo off
setlocal
set "TRAIN_GAME_LAUNCHER=%~f0"
chcp 65001 >nul
where powershell.exe >nul 2>nul
if errorlevel 1 (
  echo [错误] 找不到 Windows PowerShell，无法启动游戏。
  echo 请确认正在使用 Windows 10 或 Windows 11，然后联系游戏提供者。
  pause
  exit /b 1
)

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "$p=$env:TRAIN_GAME_LAUNCHER;$c=[IO.File]::ReadAllText($p);$m='#__POWERSHELL_PAYLOAD__#';$i=$c.LastIndexOf($m);if($i -lt 0){throw 'Launcher payload is missing.'};Invoke-Expression $c.Substring($i+$m.Length)"
set "TRAIN_GAME_EXIT_CODE=%errorlevel%"
if not "%TRAIN_GAME_EXIT_CODE%"=="0" (
  echo.
  echo [错误] 游戏启动失败。请保留此窗口中的提示并联系游戏提供者。
  pause
)
exit /b %TRAIN_GAME_EXIT_CODE%

#__POWERSHELL_PAYLOAD__#
$ErrorActionPreference = "Stop"
$root = [IO.Path]::GetFullPath((Split-Path -Parent $env:TRAIN_GAME_LAUNCHER))
$indexFile = Join-Path $root "index.html"
if (-not (Test-Path -LiteralPath $indexFile -PathType Leaf)) {
  throw "启动器旁边缺少 index.html。请恢复完整的 Game 文件夹后重试。"
}

$hashAlgorithm = [Security.Cryptography.SHA256]::Create()
try {
  $rootBytes = [Text.Encoding]::UTF8.GetBytes($root.ToLowerInvariant())
  $rootHash = ([BitConverter]::ToString($hashAlgorithm.ComputeHash($rootBytes))).Replace("-", "")
} finally {
  $hashAlgorithm.Dispose()
}
$healthToken = "train-game-launcher/$rootHash"
$firstPort = 32145
$lastPort = 32154
$listener = $null
$port = $null

function Open-GameBrowser([string]$address) {
  Write-Host "游戏地址：$address" -ForegroundColor Cyan
  if ($env:TRAIN_GAME_NO_BROWSER -eq "1") { return }
  try {
    Start-Process $address
  } catch {
    Write-Warning "无法自动打开默认浏览器，请复制上面的游戏地址到浏览器。"
  }
}

function Test-OwnedServer([int]$candidatePort) {
  $request = $null
  $response = $null
  try {
    $request = [Net.HttpWebRequest]::Create("http://127.0.0.1:$candidatePort/__train_game_launcher__")
    $request.Timeout = 500
    $request.ReadWriteTimeout = 500
    $request.Proxy = $null
    $response = $request.GetResponse()
    $reader = New-Object IO.StreamReader($response.GetResponseStream(), [Text.Encoding]::UTF8)
    try { return $reader.ReadToEnd() -eq $healthToken } finally { $reader.Dispose() }
  } catch {
    return $false
  } finally {
    if ($response) { $response.Dispose() }
  }
}

foreach ($candidatePort in $firstPort..$lastPort) {
  $candidate = New-Object Net.Sockets.TcpListener([Net.IPAddress]::Loopback, $candidatePort)
  try {
    $candidate.Start()
    $listener = $candidate
    $port = $candidatePort
    break
  } catch [Net.Sockets.SocketException] {
    $candidate.Stop()
    if (Test-OwnedServer $candidatePort) {
      Write-Host "检测到游戏已经在运行，将打开现有窗口。" -ForegroundColor Green
      Open-GameBrowser "http://127.0.0.1:$candidatePort/"
      exit 0
    }
  }
}

if (-not $listener) {
  throw "端口 $firstPort 至 $lastPort 均被占用。请关闭不再使用的本地服务器后重试。"
}

$mimeTypes = @{
  ".css" = "text/css; charset=utf-8"
  ".gif" = "image/gif"
  ".html" = "text/html; charset=utf-8"
  ".ico" = "image/x-icon"
  ".jpeg" = "image/jpeg"
  ".jpg" = "image/jpeg"
  ".js" = "text/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".mp3" = "audio/mpeg"
  ".mp4" = "video/mp4"
  ".ogg" = "audio/ogg"
  ".png" = "image/png"
  ".svg" = "image/svg+xml"
  ".wav" = "audio/wav"
  ".webm" = "video/webm"
  ".webp" = "image/webp"
  ".woff" = "font/woff"
  ".woff2" = "font/woff2"
}

function Write-Headers($stream, [int]$statusCode, [string]$statusText, [string]$contentType, [long]$contentLength, [hashtable]$extraHeaders) {
  $lines = New-Object Collections.Generic.List[string]
  $lines.Add("HTTP/1.1 $statusCode $statusText")
  $lines.Add("Content-Type: $contentType")
  $lines.Add("Content-Length: $contentLength")
  $lines.Add("Connection: close")
  $lines.Add("X-Content-Type-Options: nosniff")
  foreach ($name in $extraHeaders.Keys) { $lines.Add("${name}: $($extraHeaders[$name])") }
  $headerBytes = [Text.Encoding]::ASCII.GetBytes(($lines -join "`r`n") + "`r`n`r`n")
  $stream.Write($headerBytes, 0, $headerBytes.Length)
}

function Write-TextResponse($stream, [int]$statusCode, [string]$statusText, [string]$message, [bool]$headOnly) {
  $body = [Text.Encoding]::UTF8.GetBytes($message)
  Write-Headers $stream $statusCode $statusText "text/plain; charset=utf-8" $body.Length @{}
  if (-not $headOnly) { $stream.Write($body, 0, $body.Length) }
}

function Handle-Client([Net.Sockets.TcpClient]$client) {
  $client.NoDelay = $true
  $client.ReceiveTimeout = 10000
  $client.SendTimeout = 30000
  $stream = $client.GetStream()
  $reader = New-Object IO.StreamReader($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
  try {
    $requestLine = $reader.ReadLine()
    if ([string]::IsNullOrWhiteSpace($requestLine)) { return }
    $parts = $requestLine -split " "
    if ($parts.Length -ne 3) {
      Write-TextResponse $stream 400 "Bad Request" "请求格式无效。" $false
      return
    }
    $method = $parts[0].ToUpperInvariant()
    $headOnly = $method -eq "HEAD"
    if ($method -ne "GET" -and -not $headOnly) {
      Write-TextResponse $stream 405 "Method Not Allowed" "只支持 GET 和 HEAD 请求。" $false
      return
    }

    $headers = @{}
    while ($true) {
      $line = $reader.ReadLine()
      if ([string]::IsNullOrEmpty($line)) { break }
      $separator = $line.IndexOf(":")
      if ($separator -gt 0) {
        $headers[$line.Substring(0, $separator).Trim()] = $line.Substring($separator + 1).Trim()
      }
    }

    try {
      $rawPath = $parts[1]
      $queryIndex = $rawPath.IndexOf("?")
      if ($queryIndex -ge 0) { $rawPath = $rawPath.Substring(0, $queryIndex) }
      if (-not $rawPath.StartsWith("/")) { throw "Only origin-form request targets are accepted." }
      $urlPath = [Uri]::UnescapeDataString($rawPath)
    } catch {
      Write-TextResponse $stream 400 "Bad Request" "请求地址无效。" $headOnly
      return
    }

    if ($urlPath -eq "/__train_game_launcher__") {
      Write-TextResponse $stream 200 "OK" $healthToken $headOnly
      return
    }

    $relativePath = $urlPath.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)
    if ([string]::IsNullOrEmpty($relativePath)) { $relativePath = "index.html" }
    if ($relativePath.Contains(":")) {
      Write-TextResponse $stream 403 "Forbidden" "禁止访问该路径。" $headOnly
      return
    }

    try { $filePath = [IO.Path]::GetFullPath((Join-Path $root $relativePath)) } catch {
      Write-TextResponse $stream 400 "Bad Request" "请求路径无效。" $headOnly
      return
    }
    $rootPrefix = $root.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
    if (-not $filePath.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
      Write-TextResponse $stream 403 "Forbidden" "禁止访问游戏目录之外的文件。" $headOnly
      return
    }
    if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
      Write-TextResponse $stream 404 "Not Found" "找不到请求的游戏资源。" $headOnly
      return
    }

    $file = Get-Item -LiteralPath $filePath
    $start = [long]0
    $end = [long]$file.Length - 1
    $statusCode = 200
    $statusText = "OK"
    $responseHeaders = @{
      "Accept-Ranges" = "bytes"
      "Cache-Control" = "no-cache"
      "Last-Modified" = $file.LastWriteTimeUtc.ToString("R", [Globalization.CultureInfo]::InvariantCulture)
    }

    if ($headers.ContainsKey("Range")) {
      $rangeMatch = [regex]::Match($headers["Range"], "^bytes=(\d*)-(\d*)$")
      if (-not $rangeMatch.Success -or $file.Length -eq 0) {
        Write-Headers $stream 416 "Range Not Satisfiable" "text/plain; charset=utf-8" 0 @{ "Content-Range" = "bytes */$($file.Length)" }
        return
      }
      $startText = $rangeMatch.Groups[1].Value
      $endText = $rangeMatch.Groups[2].Value
      if ($startText) {
        $start = [long]$startText
        if ($endText) { $end = [long]$endText }
      } elseif ($endText) {
        $suffixLength = [long]$endText
        $start = [Math]::Max(0, $file.Length - $suffixLength)
      } else {
        Write-Headers $stream 416 "Range Not Satisfiable" "text/plain; charset=utf-8" 0 @{ "Content-Range" = "bytes */$($file.Length)" }
        return
      }
      if ($start -ge $file.Length -or $start -lt 0 -or $end -lt $start) {
        Write-Headers $stream 416 "Range Not Satisfiable" "text/plain; charset=utf-8" 0 @{ "Content-Range" = "bytes */$($file.Length)" }
        return
      }
      $end = [Math]::Min($end, $file.Length - 1)
      $statusCode = 206
      $statusText = "Partial Content"
      $responseHeaders["Content-Range"] = "bytes $start-$end/$($file.Length)"
    }

    $extension = [IO.Path]::GetExtension($filePath).ToLowerInvariant()
    $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { "application/octet-stream" }
    $contentLength = $end - $start + 1
    Write-Headers $stream $statusCode $statusText $contentType $contentLength $responseHeaders
    if ($headOnly -or $contentLength -le 0) { return }

    $fileStream = New-Object IO.FileStream($filePath, [IO.FileMode]::Open, [IO.FileAccess]::Read, [IO.FileShare]::ReadWrite)
    try {
      [void]$fileStream.Seek($start, [IO.SeekOrigin]::Begin)
      $buffer = New-Object byte[] 65536
      $remaining = $contentLength
      while ($remaining -gt 0) {
        $read = $fileStream.Read($buffer, 0, [int][Math]::Min($buffer.Length, $remaining))
        if ($read -le 0) { break }
        $stream.Write($buffer, 0, $read)
        $remaining -= $read
      }
    } finally {
      $fileStream.Dispose()
    }
  } finally {
    $reader.Dispose()
  }
}

$address = "http://127.0.0.1:$port/"
Write-Host ""
Write-Host "《常暗之厢》已启动" -ForegroundColor Green
Write-Host "服务范围仅限本机，不会开放到局域网或互联网。"
Open-GameBrowser $address
Write-Host "请保持此窗口开启；结束游戏后可直接关闭窗口，或按 Ctrl+C 停止。"
Write-Host ""

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try { Handle-Client $client } catch { Write-Warning "请求处理失败：$($_.Exception.Message)" } finally { $client.Dispose() }
  }
} finally {
  $listener.Stop()
}
