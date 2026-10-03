Futures of East Asia — Web Demo（Scenario 01、02、03）

開啟方式
1. 打開資料夾最外層的 index.html（使用 Chrome、Edge、Firefox 或 Safari）。
2. 請保留整個資料夾的結構，不要拆開 scenario-01/、scenario-02/ 和 scenario-03/。
不需要安裝套件、啟動伺服器或連接網絡。

資料夾結構
index.html        網頁入口：預設打開 Scenario 01，只負責顯示其中一個情境與切換分頁
scenario-tabs.js  分頁切換；網址加 #scenario-01、#scenario-02 或 #scenario-03 會直接開在該分頁
gate.js           密碼畫面（只存密碼的雜湊值，不存密碼本身）
set-version.py    發布前執行：替所有程式與樣式檔加上同一個版本號（?v=），避免瀏覽器快取混用新舊檔案
scenario-01/      Scenario 01：Silver City Compact
scenario-02/      Scenario 02：The Silicon Shield
scenario-03/      Scenario 03：Baeksang

密碼畫面
• 打開網站會先出現密碼畫面，輸入正確才會載入情境。同一個瀏覽器分頁解鎖一次後，重新整理不用再輸入；關掉分頁後要重新輸入。
• 直接打開任何一個 scenario-0X/index.html 也會先導回密碼畫面。
• 這只是擋一般訪客的簡單鎖：網站是公開的靜態檔案，懂技術的人仍可以從 GitHub 儲存庫看到所有內容。
• 要換密碼：告訴 Claude 新密碼，它會更新 gate.js 裡的雜湊值。

分頁
• 每個情境都是獨立的網頁，蓋滿整個視窗顯示；三個情境的頂端列和分頁相同，版面在任何視窗大小下都一致。
• 切換分頁不會重新載入，各情境停留的年份和畫面都會保留。
• 解鎖後也可以單獨打開 scenario-0X/index.html；點另一個分頁會回到最外層的 index.html。
• 每個情境資料夾裡的 s1-tabs.js／s2-tabs.js／s3-tabs.js 是同一份分頁程式，要改就三份一起改。


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


Scenario 03 — Baeksang（scenario-03/）
原始說明見 scenario-03/README.txt。放進 Web Demo 時依照 Scenario 01、02 調整：頂端分頁、標題列尺寸、拖時間軸只淡入淡出線條、不顯示 2070 才能進入的提示與載入文字、2070 點擊提示為橘色、Back 按鈕、地點卡片淡入淡出且不顯示提問區塊、看過的地點維持 + 號；另外拿掉了原本放大的時間軸文字、圖下說明和關係描述字級，尺寸與另外兩個情境相同。配色改成和 Scenario 01、02 相同（深青色、薄荷綠與橘色），關係圖背景和卡片也比照 Scenario 01 的城市角色圖。
進入城市時主體切割進場：assets/s3-city-contours.js 定義 8 個主體的輪廓（六個地點，加上左下市集攤位和中下軌道），各自從不同方向滑入，之後完整插圖淡入。

Scenario 01 — 2070 關係圖（scenario-01/s1-2070-network.js）
• 2070 的關係圖依照 East Asia.pdf（Scenario 1 - VCS in 2070）：14 個節點、22 條帶箭頭的關係線，城市聯盟的虛線圈住三個會員城市。2026、2050 仍是原本的六種城市角色。
• 節點類型（左側色條與右上圖例）：Public sector 粉、Industry 藍、Individual 綠。線的類型（底部篩選）：Economic 薄荷綠、Technology 藍、Governance 橘、Social 紫（PDF 目前沒有紫線，所以不顯示這個按鈕）。
• 在 2070 點 City in Country A 兩次進入照護大樓；從大樓的各樓層 Trace 會回到對應節點（對照表在檔案最後的 placeCountry）。
• 右側資訊欄的文字是依關係圖擬的草稿，直接改這個檔案即可。
• 2026 的關係圖依照 East Asia.pdf（Scenario 1 - VCS in 2026），格式與 2070 相同，資料在 scenario-01/s1-2026-network.js；9 個節點、19 條關係線（三國政府之間的 Visa 與 territorial disputes 外圈弧線、政府與城市的 Governance／Taxation、服務業者、城市之間的交流與資源競爭）。例子城市同 2070 用 Sendai、Wonju、Cebu。
• 2050 目前畫布顯示 Under development。
