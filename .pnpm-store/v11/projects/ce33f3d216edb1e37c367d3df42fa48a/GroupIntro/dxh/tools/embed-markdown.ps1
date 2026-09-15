$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = [System.IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))
$indexPath = Join-Path $projectRoot "index.html"
$utf8 = [System.Text.UTF8Encoding]::new($false, $true)
$html = [System.IO.File]::ReadAllText($indexPath, $utf8)
$newline = if ($html.Contains("`r`n")) { "`r`n" } else { "`n" }
$startMarker = "    <!-- markdown-embed:start -->"
$endMarker = "    <!-- markdown-embed:end -->"

$startIndex = $html.IndexOf($startMarker, [System.StringComparison]::Ordinal)
$endIndex = $html.IndexOf($endMarker, [System.StringComparison]::Ordinal)
if ($startIndex -lt 0 -or $endIndex -lt 0 -or $endIndex -le $startIndex) {
  throw "Valid Markdown embed markers were not found in index.html."
}

$sourcePattern = 'data-markdown-source="([^"]+\.md)"'
$sourcePaths = [System.Collections.Generic.List[string]]::new()
$seenPaths = [System.Collections.Generic.HashSet[string]]::new(
  [System.StringComparer]::OrdinalIgnoreCase
)

foreach ($match in [System.Text.RegularExpressions.Regex]::Matches($html, $sourcePattern)) {
  $relativePath = $match.Groups[1].Value
  if ($seenPaths.Add($relativePath)) {
    $sourcePaths.Add($relativePath)
  }
}

if ($sourcePaths.Count -eq 0) {
  throw "No data-markdown-source references were found in index.html."
}

$projectPrefix = $projectRoot.TrimEnd(
  [System.IO.Path]::DirectorySeparatorChar,
  [System.IO.Path]::AltDirectorySeparatorChar
) + [System.IO.Path]::DirectorySeparatorChar
$embeddedBlocks = [System.Collections.Generic.List[string]]::new()

foreach ($relativePath in $sourcePaths) {
  $nativeRelativePath = $relativePath.Replace(
    [System.IO.Path]::AltDirectorySeparatorChar,
    [System.IO.Path]::DirectorySeparatorChar
  )
  $sourcePath = [System.IO.Path]::GetFullPath(
    [System.IO.Path]::Combine($projectRoot, $nativeRelativePath)
  )

  if (-not $sourcePath.StartsWith($projectPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Markdown path is outside the project directory: $relativePath"
  }
  if (-not [System.IO.File]::Exists($sourcePath)) {
    throw "Markdown file not found: $relativePath"
  }

  $markdown = [System.IO.File]::ReadAllText($sourcePath, $utf8)
  $encodedPath = [System.Net.WebUtility]::HtmlEncode($relativePath)
  $encodedMarkdown = [System.Net.WebUtility]::HtmlEncode($markdown)
  $embeddedBlocks.Add(
    "    <template data-embedded-markdown=`"$encodedPath`">$encodedMarkdown</template>"
  )
}

$markerEndIndex = $endIndex + $endMarker.Length
$prefix = $html.Substring(0, $startIndex) + $startMarker
$suffix = $html.Substring($markerEndIndex)
$generatedRegion = $newline + [System.String]::Join($newline, $embeddedBlocks) + $newline
$updatedHtml = $prefix + $generatedRegion + $endMarker + $suffix

[System.IO.File]::WriteAllText($indexPath, $updatedHtml, [System.Text.UTF8Encoding]::new($false))
Write-Host "Embedded $($sourcePaths.Count) Markdown files into index.html."
