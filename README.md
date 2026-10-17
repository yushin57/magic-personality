# 識人魔法心理測驗

5 組直覺式選擇（8選4 → 4選2 → 2選1），計算出使用者在「果斷/掌控/分析/事務/創意/感覺/理想/人際」八維特質上的分數，歸納成理智/開創/組織/情感四種原型中的主型+副型，並附上外向內向、理性感性、行動思考三組對比數據。

純靜態網站，無後端、無資料庫，部署在 GitHub Pages：https://yushin57.github.io/magic-personality/

## 檔案結構

- `index.html` — 頁面結構、meta tags（含社群分享用的 Open Graph 標籤）
- `style.css` — 樣式（神秘命理風：深紫＋金色調）
- `quiz-data.js` — 題目內容與四種原型的命名/描述/關鍵字（純資料，改文案不用動邏輯）
- `script.js` — 渲染、計分、結果判定、分享/重測功能
- `og-image.png` — 社群分享預覽圖（1200×630）

## 本機預覽

```bash
python3 -m http.server 8000
# 開瀏覽器 http://localhost:8000
```

## 修改題目或原型文案

只需要編輯 `quiz-data.js`：
- `sets`：5 組題目，每組 8 個選項，每個選項對應一個 `trait`（必須是這 8 個之一：果斷/掌控/分析/事務/創意/感覺/理想/人際）
- `archetypes`：4 種原型（`logic`/`pioneer`/`organizer`/`emotion`）的命名、副標、icon、關鍵字、描述文字
