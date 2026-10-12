# Download public CC0 HQ MP3 previews from the author's Freesound pages.
# Login-only WAV/FLAC originals are not downloaded.
$ErrorActionPreference = 'Stop'
$target = Join-Path $PSScriptRoot '../public/campus-explorer/assets/sounds/sources'
$sounds = @(
    @('rudmer-rocket','Rudmer_Rotteveel','336008'),
    @('kinoton-rocket','Kinoton','347163'),
    @('luka-launch','LukaCafuka','750685'),
    @('festival-crowd','kyles','629852'),
    @('outdoor-show-crowd','kyles','455659'),
    @('stadium-crowd','cognito%20perceptu','57587')
)
$records = [ordered]@{}
foreach ($sound in $sounds) {
    $key, $author, $soundId = $sound
    $page = "https://freesound.org/people/$author/sounds/$soundId/"
    $response = Invoke-WebRequest -Uri $page
    if ($response.Content -notmatch 'https?://creativecommons.org/publicdomain/zero/1.0/') { throw "CC0 license missing: $page" }
    $download = [regex]::Match($response.Content,'https://cdn\.freesound\.org/previews/[^"\s<>]+-hq\.mp3').Value
    if (!$download) { throw "Public HQ preview missing: $page" }
    $file = "$key-hq.mp3"
    Invoke-WebRequest -Uri $download -OutFile (Join-Path $target $file)
    $licenseFile = "$key-license-record.json"
    $evidence = [ordered]@{ source=$page; author=[Uri]::UnescapeDataString($author); licenseLabel='Creative Commons 0'; licenseURL='https://creativecommons.org/publicdomain/zero/1.0/'; verifiedDate=(Get-Date -Format 'yyyy-MM-dd') }
    [IO.File]::WriteAllText((Join-Path $target $licenseFile),($evidence | ConvertTo-Json),[Text.UTF8Encoding]::new($false))
    $records[$key] = [ordered]@{
        author = [Uri]::UnescapeDataString($author)
        license = 'CC0 1.0'
        licenseURL = 'https://creativecommons.org/publicdomain/zero/1.0/'
        page = $page
        downloadURL = $download
        original = $file
        quality = 'Official publicly accessible HQ MP3 preview; not original WAV/FLAC'
        verifiedDate = (Get-Date -Format 'yyyy-MM-dd')
        sha256 = (Get-FileHash -LiteralPath (Join-Path $target $file) -Algorithm SHA256).Hash.ToLowerInvariant()
        licenseRecord = $licenseFile
        licenseRecordSHA256 = (Get-FileHash -LiteralPath (Join-Path $target $licenseFile) -Algorithm SHA256).Hash.ToLowerInvariant()
    }
    Write-Output "$key downloaded"
}
[IO.File]::WriteAllText((Join-Path $target 'freesound-cc0-provenance.json'),($records | ConvertTo-Json -Depth 6),[Text.UTF8Encoding]::new($false))
