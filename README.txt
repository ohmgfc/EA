East Asia Futures — Web Demo（Scenario 01 + Scenario 02）

開啟方式
1. 打開資料夾最外層的 index.html（使用 Chrome、Edge、Firefox 或 Safari）。
2. 請保留整個資料夾的結構，不要拆開 scenario-01/ 和 scenario-02/。
不需要安裝套件、啟動伺服器或連接網絡。

資料夾結構
index.html        網頁入口：預設打開 Scenario 01，只負責顯示其中一個情境與切換分頁
scenario-tabs.js  分頁切換；網址加 #scenario-01 或 #scenario-02 會直接開在該分頁
gate.js           密碼畫面（只存密碼的雜湊值，不存密碼本身）
scenario-01/      Scenario 01：Silver City Compact
scenario-02/      Scenario 02：The Silicon Shield

密碼畫面
• 打開網站會先出現密碼畫面，輸入正確才會載入兩個情境。同一個瀏覽器分頁解鎖一次後，重新整理不用再輸入；關掉分頁後要重新輸入。
• 直接打開 scenario-01/index.html 或 scenario-02/index.html 也會先導回密碼畫面。
• 這只是擋一般訪客的簡單鎖：網站是公開的靜態檔案，懂技術的人仍可以從 GitHub 儲存庫看到所有內容。
• 要換密碼：告訴 Claude 新密碼，它會更新 gate.js 裡的雜湊值。

分頁
• 每個情境都是獨立的網頁，蓋滿整個視窗顯示；兩邊的頂端列和分頁相同，版面在任何視窗大小下都一致。
• 切換分頁不會重新載入，兩邊停留的年份和畫面都會保留。
• 也可以單獨打開 scenario-01/index.html 或 scenario-02/index.html；點另一個分頁會回到最外層的 index.html。
• 每個情境資料夾裡的 s1-tabs.js／s2-tabs.js 是同一份分頁程式。


Scenario 02 — The Silicon Shield（scenario-02/）

操作方式
• 拖拉時間軸，在 2026、2050、2070 之間切換；放開後停靠到最近的年份。
• 換年份時只有關係線條淡出、淡入，地圖和國家名稱不動。
• 點擊國家查看資訊；只有 2070 的 South Korea 可以進入 Within the Shield。
• 在 2070 第一次點擊 South Korea 顯示國家資訊，第二次點擊進入城市。
• 選取城市中的六個地點探索生活情境；按 Back 返回地圖。
• 時間軸支援鍵盤方向鍵、Home 和 End。

檔案內容
index.html        網頁
zoom.css          樣式
zoom.js           地圖、拖拉、轉場與城市互動
zoom-data.js      2070 國家及城市內容
zoom-timeline.js  年份情境資料
s2-tabs.js        頂端分頁
assets/           地圖資料、建築及物件輪廓遮罩、城市圖片

All images, styles and scripts are included locally. No installation or server is required.
Links in “About this scenario” lead to external references and need an internet connection.

The scenario is an exploration, not a forecast. Within the Shield and the future organisations
are fictional. Artwork is AI-generated. This is not a Samsung publication.
Geographic data: Natural Earth (public domain).

本版本以工廠、實驗室、列車、車站、診所、街屋、遮陽棚和配送機器人的主體輪廓分層進場，背景提前淡入，與主體進場稍微重疊。
assets/city-contours.js 定義 11 個主體的 SVG 遮罩與進場方向。
11 個主體同時進場：0.36 秒後開始，持續 0.85 秒。原始城市插圖保持不變。
背景淡入：0.9 秒後開始，0.32 秒完成。


Scenario 01 — Silver City Compact（scenario-01/）
說明見 scenario-01/README.txt。
