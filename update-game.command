#!/bin/bash
# 兔兔魔法世界 一鍵更新（Mac）：雙擊執行
cd "$(dirname "$0")" || exit 1
echo "1/4 同步 GitHub 上的變更..."; git pull
ZIP=$(ls -t ~/Downloads/*兔兔魔法世界*.zip 2>/dev/null | head -1)
if [ -z "$ZIP" ]; then echo "在「下載」資料夾找不到兔兔魔法世界的壓縮檔"; read -p "按 Enter 結束"; exit 1; fi
echo "2/4 解開 $ZIP ..."; TMP=$(mktemp -d); unzip -q -o "$ZIP" -d "$TMP"
echo "3/4 覆蓋檔案..."; cp -R "$TMP/bunny-world/." .
echo "4/4 推送到 GitHub..."; git add . && git commit -m "更新遊戲 $(date '+%Y-%m-%d %H:%M')"; git push
echo "完成！約 1～2 分鐘後 Cloudflare 會自動部署。"; read -p "按 Enter 結束"
