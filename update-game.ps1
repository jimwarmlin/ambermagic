# 兔兔魔法世界 一鍵更新（Windows）
# 自動找「下載」資料夾裡最新的兔兔魔法世界壓縮檔，覆蓋到專案資料夾，再推送到 GitHub
$ErrorActionPreference = 'Continue'
$Project = 'C:\Users\jimwa\Downloads\Ambermagic\Ambermagic_game\bunny-world'
$Downloads = Join-Path $env:USERPROFILE 'Downloads'

if (-not (Test-Path (Join-Path $Project 'index.html'))) {
  Write-Host "找不到專案資料夾：$Project" -ForegroundColor Red
  Write-Host '請確認路徑正確，或用記事本打開 update-game.ps1，修改第 5 行的路徑。'
  Read-Host '按 Enter 結束'; exit 1
}
Set-Location $Project
$repo = (git rev-parse --show-toplevel 2>$null)
if (-not $repo) { Write-Host '這個資料夾不是 Git 專案，請確認路徑。' -ForegroundColor Red; Read-Host '按 Enter 結束'; exit 1 }

Write-Host '1/4 同步 GitHub 上的變更...' -ForegroundColor Cyan
git pull

$zip = Get-ChildItem $Downloads -Filter '*.zip' -Recurse -Depth 3 -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like '*兔兔魔法世界*' } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $zip) { Write-Host '在「下載」資料夾找不到兔兔魔法世界的壓縮檔，請先下載。' -ForegroundColor Red; Read-Host '按 Enter 結束'; exit 1 }

Write-Host ('2/4 解開 ' + $zip.FullName) -ForegroundColor Cyan
$tmp = Join-Path $env:TEMP 'bunny-update'
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
Expand-Archive -Path $zip.FullName -DestinationPath $tmp -Force
$src = Join-Path $tmp 'bunny-world'
if (-not (Test-Path (Join-Path $src 'index.html'))) { Write-Host '壓縮檔內容不正確。' -ForegroundColor Red; Read-Host '按 Enter 結束'; exit 1 }

Write-Host "3/4 覆蓋檔案到 $Project ..." -ForegroundColor Cyan
Copy-Item -Path (Join-Path $src '*') -Destination $Project -Recurse -Force

Write-Host '4/4 推送到 GitHub...' -ForegroundColor Cyan
git add -A
git commit -m ('更新遊戲 ' + (Get-Date -Format 'yyyy-MM-dd HH:mm'))
git push
if ($LASTEXITCODE -eq 0) { Write-Host '完成！約 1～2 分鐘後 Cloudflare 會自動部署。' -ForegroundColor Green }
else { Write-Host '推送失敗，請把上面的訊息截圖給 Claude。' -ForegroundColor Red }
Read-Host '按 Enter 結束'
