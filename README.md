# Pearly 上線說明

## 這包裡有什麼

| 檔案 | 用途 |
|---|---|
| `index.html` | App 本體（正式版：一開始是空的，沒有範例資料，也沒有示範按鈕） |
| `manifest.webmanifest` | App 名稱、圖示、顏色設定，讓 iPhone 把它當成 App |
| `sw.js` | 離線快取，沒網路也能打開 |
| `icons/` | App 圖示（角色頭部特寫） |

資料只存在你的 iPhone 裡，不會上傳到任何地方。放到網路上的只有程式本身。

---

## 第一步：放上網路（二選一）

### 方法 A：交給小龍蝦（GitHub Pages，推薦）

如果你忘記有沒有 GitHub 帳號，先到 https://github.com/login 試著登入，或用 Email 找回密碼。沒有就到 https://github.com/signup 註冊一個（免費）。

把整個 `pearly` 資料夾放到電腦上（例如桌面），然後把下面這段整段複製給小龍蝦：

```
請幫我把一個網頁 App 發佈到 GitHub Pages。我的電腦是 Windows。
資料夾位置：<這裡換成 pearly 資料夾的完整路徑，例如 C:\Users\你的名字\Desktop\pearly>

步驟：
1. 檢查有沒有 git 和 GitHub CLI（gh）。沒有的話用 winget 安裝：
   winget install --id Git.Git -e
   winget install --id GitHub.cli -e
2. 執行 gh auth status 檢查有沒有登入。沒有的話執行 gh auth login，
   選 GitHub.com、HTTPS、用瀏覽器登入，登入的部分讓我自己按。
3. 在資料夾裡建立 git 專案並推上去：
   git init
   git add .
   git commit -m "Pearly 第一版"
   git branch -M main
   gh repo create pearly --public --source . --push
4. 開啟 GitHub Pages（從 main 分支的根目錄發佈）：
   gh api -X POST repos/{owner}/pearly/pages -f "source[branch]=main" -f "source[path]=/"
   （{owner} 換成我的 GitHub 帳號名稱，可以用 gh api user --jq .login 查）
5. 等 1～2 分鐘，用 gh api repos/{owner}/pearly/pages --jq .html_url 查網址，
   打開確認看得到 Pearly 首頁，然後把網址告訴我。

注意：只動這個資料夾和這個 GitHub 專案，不要改我電腦上其他東西。
```

完成後網址會長得像：`https://你的帳號.github.io/pearly/`

> 專案是公開的（免費帳號的 GitHub Pages 需要公開），別人看得到程式碼，但看不到你的記帳資料，資料只在你手機裡。

### 方法 B：不用指令（Netlify）

1. 到 https://app.netlify.com/drop ，先登入或註冊（沒登入的話網站一小時後會被刪掉）。
2. 把整個 `pearly` 資料夾拖進網頁中間的框。
3. 等它跑完，會給你一個網址，例如 `https://xxxx.netlify.app`。可以在 Site settings 改成好記的名字。

---

## 第二步：在 iPhone 上安裝

1. 用 **Safari**（不要用 Chrome 或 LINE 內建瀏覽器）打開上一步的網址。
2. 按下方的「分享」按鈕（方框加向上箭頭）。
3. 往下滑，按「加入主畫面」，名稱保持 Pearly，按「新增」。
4. 之後都從主畫面的 Pearly 圖示打開。

> 主畫面的 Pearly 和 Safari 裡的 Pearly **資料是分開的**。記帳請固定從主畫面圖示打開。

---

## 第三步：設定兩個捷徑

兩個捷徑做的事一樣：把付款資料變成文字，放進剪貼簿。你打開 Pearly 按「＋貼上」，就會進到確認畫面，選分類就存好了。
**不會存任何截圖到相簿。**

捷徑動作的名稱可能因 iOS 版本略有不同，找不到時用捷徑編輯畫面上方的搜尋框搜尋。

### 捷徑一：LINE Pay（輕點背面兩下）

打開「捷徑」App → 右上角「+」→ 名稱取「Pearly LINE Pay」，依序加入：

1. **截取螢幕畫面**（Take Screenshot）——截圖只留在捷徑裡，不會存進相簿
2. **從影像中擷取文字**（Extract Text from Image）
3. **文字**：第一行打 `#Pearly`，按 Enter 換行，第二行放入變數「擷取的文字」
4. **拷貝到剪貼板**（拷貝上一步的「文字」）
5. **顯示通知**：內容打「已讀取 LINE Pay，打開 Pearly 按＋貼上」

設定觸發：設定 → 輔助使用 → 觸控 → 背面輕點 → 點兩下 → 選「Pearly LINE Pay」。

**用法**：LINE Pay 停在「付款完成」畫面時，輕點手機背面兩下。

### 捷徑二：Apple Pay（付款後自動執行）

打開「捷徑」App → 下方「自動化」→「+」新增自動化 → 選「**交易**」（Transaction，錢包付款）→ 勾選你的卡片 → 選「**立即執行**」→ 下一步 → 新增空白自動化，依序加入：

1. **格式化日期**：日期選「目前日期」，日期格式選「自訂」，輸入 `yyyy.MM.dd HH:mm`
2. **文字**：照下面輸入，`[ ]` 的地方插入變數（點一下鍵盤上方的變數列選）：
   ```
   #Pearly
   Apple Pay
   NT$ [金額]
   商店名稱
   [商家]
   [格式化的日期]
   ```
   「金額」「商家」是這個自動化的「捷徑輸入」裡的欄位。
3. **拷貝到剪貼板**
4. **顯示通知**：「Apple Pay 已記下，打開 Pearly 按＋貼上」

**用法**：用 Apple Pay 付款，付完它會自己執行，什麼都不用按。

> 交易自動化需要 iOS 17 以上。有些卡片或店家傳給 iPhone 的「商家」名稱可能是英文或代號，進到確認畫面時可以按「編輯」改。

### 每次記帳

1. 付款（LINE Pay 付完點背面兩下；Apple Pay 付完不用做事）。
2. 打開主畫面的 Pearly。
3. 按待確認旁邊的「＋貼上」，iPhone 問要不要允許貼上時按「允許貼上」。
4. 選分類，完成。

如果按「＋貼上」沒反應，會跳出一個輸入框，長按框框選「貼上」再按「加入」。

**注意**：剪貼簿一次只放得下一筆。連續付了兩筆才去貼，只會進來最後那一筆。習慣上付完就打開 Pearly 貼上；或用下面的「累積」做法。

同一筆重複貼上，App 會認得，不會重複記帳。讀不到金額的會放到待確認的「需要你決定」，標成「原文」。

### 進階：讓剪貼簿累積多筆

在兩個捷徑的「拷貝到剪貼板」**前面**加入：

1. **取得剪貼板**
2. **如果**：「剪貼板」**包含** `#Pearly`
   - 加入 **文字**：`[剪貼板]`、換行、`===`、換行、`[文字]`（`[文字]` 是前面組好的那段）
3. **否則**
   - 加入 **文字**：`[文字]`
4. **結束如果**

然後讓「拷貝到剪貼板」拷貝「如果的結果」。這樣付了好幾筆再一次貼上，全部都會進來，App 也會自動略過剪貼簿裡跟 Pearly 無關的文字。

## 之後更新版本

1. 用新的 `index.html` 取代舊的。
2. 打開 `sw.js`，把第一行附近的 `pearly-v1` 改成 `pearly-v2`（每次加 1）。
3. 推上去（GitHub：請小龍蝦 `git add . && git commit -m "更新" && git push`；Netlify：重新拖一次資料夾）。
4. iPhone 上把 Pearly 完全關掉再打開，必要時開兩次，就會換成新版。

資料不會因為更新而消失。

## 備份

設定 → 「下載備份檔」，會存成一個 `.json` 檔（可以存到「檔案」App 或 iCloud Drive）。
換手機或資料不見時，用「從備份檔還原」選那個檔案就回來了。建議每個月備份一次。

## 目前的限制

- LINE Pay 的判讀是依照付款完成畫面常見的格式寫的（找 `NT$` 金額、「商店名稱」下一行、`2026.10.18 18:45` 這種日期），**還沒用你真的截圖測過**。如果讀錯，把捷徑擷取出來的文字貼給 Claude，就能調整。
- 字型從 Google Fonts 載入，第一次打開需要網路，之後會快取。
- 沒有雲端同步，資料只在這支 iPhone。
