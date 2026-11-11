# 17:00的後院 / Backyard at 5 PM

小朋友的網頁遊戲小站（中文／English 可切換）：
先寫功課（學習區，依年級、科目）＋ 卡通時間（創作區，Bobo、Yang）。

## 新增遊戲
1. 學習遊戲放 `games/learn/遊戲名稱/index.html`；創作遊戲放 `games/create/遊戲名稱/index.html`
2. 打開根目錄 `index.html`，在 `GAMES` 清單加一筆資料（title、desc 都寫 [中文, English]，ready 設為 true）

## 遊戲頁面的中英切換與回首頁按鈕
每個遊戲檔案結尾都有一段 `<script>`（含字典 `RAW`），負責「回後院」按鈕與中英切換；新增遊戲時可複製該段並替換字典。

## 今日進站時間
`assets/site.js` 會在首頁和每個遊戲頁顯示「今日累計時間」（頁面可見且 2 分鐘內有操作才計時，每天自動歸零，資料存在各自的瀏覽器）。

## 學習遊戲字庫
`games/learn/vocab/words.js` 是字庫（年級 → Part → [英文, 中文]），來源為南勢國小英語單字王 3～6 年級字表（各 Part 01～30，共 900 字）。遊戲會自動讀取，並自動產生每 5 個 Part 一組的「Review」與「全部單字大挑戰」。

## 目前收錄的遊戲
- 學習區：單字小勇士（3～6 年級英語單字王）、像素數學村 Pixel Math Village（1、3 年級數學）
- 創作區：今日海產（Bobo）、傘兵防禦（Yang）、整點打卡（Rrrr）
