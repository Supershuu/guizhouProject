const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const Store = require("electron-store");

const store = new Store();
const fs = require("fs");
console.log(store);
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let arr = [
  {
    label: "开发者工具",
    submenu: [
      {
        label: "打开/关闭",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click: (item, focusedWindow) => {
          focusedWindow.toggleDevTools();
        },
      },
      {
        label: "刷新一下",
        role: "reload",
        accelerator: process.platform == "darwin" ? "Command+F5" : "Ctrl+F5",
      },
    ],
  },
];

let mainMenu = Menu.buildFromTemplate(arr); // 开发者模式

Menu.setApplicationMenu(mainMenu);
let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
    fullscreen: true,
    // simpleFullscreen: true,
  });

  // win.webContents.openDevTools();
  win.loadFile("index.html");
  win.webContents.on("did-finish-load", function () {
    // console.log("发送消息");

    fs.readFile(store.path, "utf-8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        const val = JSON.parse(data);
        // console.log(val);
        win.webContents.send("data", val);
      }
    });
  });
  // 点击主窗口的关闭按钮
  win.on("closed", () => {
    app.quit();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("opennew", (event, val) => {
  win.loadFile("video.html");
  store.set(val.username, val.password);
  win.webContents.on("did-finish-load", function () {
    // console.log("发送消息");
    win.webContents.send("data", val);
  });
});
ipcMain.on("openvideos", (event, val) => {
  let video = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
    fullscreen: true,
    alwaysOnTop: true,
    resizable: false,
    transparent: true,
  });
  video.loadFile("videos.html");
  video.webContents.on("did-finish-load", function () {
    video.webContents.send("value", val);
  });
});
ipcMain.on("openindex", () => {
  win.loadFile("video.html");
});
ipcMain.on("openhome", () => {
  win.loadFile("home.html");
});
ipcMain.on("openjournal", () => {
  win.loadFile("journal.html");
});
ipcMain.on("opentemperature", () => {
  win.loadFile("temperature.html");
});
ipcMain.on("opentower", () => {
  win.loadFile("tower.html");
});
ipcMain.on("openscrew", () => {
  win.loadFile("screw.html");
});
ipcMain.on("opendisplacement", () => {
  win.loadFile("displacement.html");
});
ipcMain.on("openbird", () => {
  win.loadFile("bird.html");
});
ipcMain.on("openai", () => {
  win.loadFile("ai.html");
});
ipcMain.on("opencontrol", () => {
  win.loadFile("control.html");
});
ipcMain.on("openuva", () => {
  win.loadFile("uva.html");
});
ipcMain.on("opensafe", () => {
  win.loadFile("safe.html");
});
ipcMain.on("openlocation", () => {
  win.loadFile("location.html");
});
ipcMain.on("destroy", () => {
  app.exit();
});
// 考试情况
ipcMain.on("openexam", () => {
  win.loadFile("exam.html");
});
// 统计分析
ipcMain.on("openstatistical", () => {
  win.loadFile("statistical.html");
});
// 工作计划分析
ipcMain.on("openWorkPlan", () => {
  win.loadFile("workPlan.html");
});
// 抢修任务分析
ipcMain.on("openMaintain", () => {
  win.loadFile("maintain.html");
});
