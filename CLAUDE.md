# Pearly 記帳 PWA

## 這個專案是什麼

一個給個人用的記帳 PWA，繁體中文介面，資料只存在使用者手機的 localStorage，不上傳任何地方。

- `index.html`：App 本體，約 177KB，**CSS / JS / 圖示全部內嵌在這一個檔案裡**
- `manifest.webmanifest`：PWA 設定（iPhone 加到主畫面用）
- `sw.js`：離線快取
- `icons/`：App 圖示
- `.nojekyll`：讓 GitHub Pages 不要跑 Jekyll

## 重要規則（改動前必看）

1. **刻意保持單檔**：不要引入框架、bundler、npm 套件、也不要拆成多個 JS/CSS 檔。作者要能直接打開 `index.html` 就編輯。
2. **改完 `index.html` 一定要把 `sw.js` 的 `const V = "pearly-vN"` 數字 +1**，否則手機上的 PWA 會繼續吃舊快取，會以為你沒改成功。
3. **只有合併進 `main` 才會更新網站**。網址：https://tiffant931001.github.io/pearly/ （GitHub Pages，main 分支根目錄）
4. **不要把範例資料、示範按鈕塞進正式版**：第一次打開必須是空的。
5. 不要上傳任何個資、API key、金鑰。
6. 改任何檔案前，先用一兩句話白話說明「要改哪裡、為什麼」，再動手。

## 使用者偏好

- 使用者是 Tiffany，非工程師，自稱「不會用」。
- 一律用**繁體中文（台灣用語）**回覆，白話、簡短。
- 一次只給一個動作，不要丟多步驟指令。
- 先講結論，再說做了什麼；不要長篇原理，除非她問。
- 她的插畫／角色是她自己畫的，不要自己生成角色圖去取代。

## 工作方式

- 這是小型單檔專案，先在 branch 上做，改完推 branch 讓她看 diff，不要直接推 `main`。
- 動資料結構（localStorage schema）時，要考慮舊資料的相容或遷移。
