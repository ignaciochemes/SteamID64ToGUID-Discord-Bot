# SteamID64ToGUID-Discord-Bot
Dayz - Arma 3 Discord Bot Convert SteamID64 to Battleye GUID (MD5 hash)

## Readme
[Support Discord](https://discord.gg/M3FvUq8)

[Bot invitation link](https://discord.com/api/oauth2/authorize?client_id=706139732073250860&permissions=537394240&scope=bot)

### Features
- You can convert steamid64 to Guid very easily and quickly.
- It has a command that displays a complete list of all bot commands.

### Prerequisites
- Have Node.js installed
- It is necessary to have a MYSQL database. Xampp for example.

> **Note:** If **You Want** can join the support discord.

#### Satisfactory
![Image guid](https://i.imgur.com/Y92BDwk.png)

#### Catch Error
![Image guid2](https://i.imgur.com/53Pfkj3.png)


#### How to install:
#### First Install Node.js in your server and XAMPP
https://nodejs.org
https://www.apachefriends.org/es/index.html

### Xamp configuration
1- Open and run apache / mysql server
2- Create a new user account like this and save.
![Image crearcuenta](https://i.imgur.com/TxXbA1L.png)

3-Create a new database and a new table with two columns. (`servsize` and `usersize`).
![Image tabla](https://i.imgur.com/dNoLgL4.png)
![Image tabla2](https://i.imgur.com/ZK24U91.png)


.Then... Open two CMD or Power Shell windows. One of them in administrator (Desktop) mode and the last one open in this project.
-Administrator mode for install pm2 tool. (`npm install pm2 -g`)
-Project powershell windows for install Node packages. (`npm install`)

-`npm install` (In this project obviously)

-`npm install pm2 -g` (In Administration CMD or PowerShell Desktop)

![Image CMD](https://i.imgur.com/Io1ytIu.png)

#### How to Run:
-Open the project in cmd or powershell windows

-Execute: `pm2 start 64.js`

![Image PM2](https://i.imgur.com/zsATyCv.png)

![Image PM22](https://i.imgur.com/BBWe2Ty.png)
