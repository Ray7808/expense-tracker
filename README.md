# 老爸的私房錢

此專案主要透過 mongoDB 與 Express 建立用戶資料，並透過 bcrypt 加密及雜湊提高密碼安全性，且使用 passport 套件新增本地輸入。

## 產品功能

- 透過模板引擎(handlebars)顯示用戶及花費等資訊
- 參考 RESTful 設計，利用 method-override 建立 GET,POST,PUT,DELETE 使路由帶有語義
- 透過 connect-flash，當註冊時未輸入正確內容或登出時，顯示對應訊息
- 利用 passport 新增本地及 facebook 登入
- 使用 bcrypt 加鹽及雜湊增加密碼安全性

## 專案畫面

![image](https://github.com/Ray7808/expense-tracker/blob/main/img/login.png)

![image](https://github.com/Ray7808/expense-tracker/blob/main/img/index.png)

![image](https://github.com/Ray7808/expense-tracker/blob/main/img/edit.png)

![image](https://github.com/Ray7808/expense-tracker/blob/main/img/category.png)

## 安裝流程

1. git clone 下載檔案

    ```
    git clone https://github.com/Ray7808/expense-tracker.git
    ```

2. 安裝相關套件

    ```
    npm install
    ```

3. 新增種子資料

    ```
    npm run seed
    ```

4. 執行程式
    ```
    npm run start
    ```
