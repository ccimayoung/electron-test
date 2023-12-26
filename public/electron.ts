// 배포 환경에서 빌드된 HTML 파일을 가져오기 위해 아래 두 모듈을 사용합니다.
import * as path from "path";
import * as url from "url";
import { app, BrowserWindow, ipcMain } from "electron";
import * as isDev from "electron-is-dev";

let mainWindow: BrowserWindow;
// const { ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();

store.set("isFirstRun", true);
console.log(store.get("isFirstRun"));

ipcMain.on("nowStore", (event) => {
  const result = store.get("isFirstRun");
  console.log("현재 store 확인 요청", result);
  event.reply("NOWSTORE_RESULT", { result });
});

ipcMain.on("changeStore", (event, value) => {
  store.set("isFirstRun", value);
  console.log("main store 변경 응답", store.get("isFirstRun"));
});

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    center: true,
    kiosk: !isDev,
    resizable: true,
    fullscreen: false,
    fullscreenable: true,
    webPreferences: {
      // node환경처럼 사용하기
      nodeIntegration: true,
      contextIsolation: false,
      // enableRemoteModule: true,
      // 개발자도구
      devTools: isDev,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://127.0.0.1:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.setResizable(true);

  // Emitted when the window is closed.
  mainWindow.on("closed", () => (mainWindow = undefined!));
  mainWindow.focus();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
