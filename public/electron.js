"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 배포 환경에서 빌드된 HTML 파일을 가져오기 위해 아래 두 모듈을 사용합니다.
var path = require("path");
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var mainWindow;
// const { ipcMain } = require("electron");
var Store = require("electron-store");
var store = new Store();
store.set("isFirstRun", true);
console.log(store.get("isFirstRun"));
electron_1.ipcMain.on("nowStore", function (event) {
    var result = store.get("isFirstRun");
    console.log("현재 store 확인 요청", result);
    event.reply("NOWSTORE_RESULT", { result: result });
});
electron_1.ipcMain.on("changeStore", function (event, value) {
    store.set("isFirstRun", value);
    console.log("main store 변경 응답", store.get("isFirstRun"));
});
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
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
    // production에서는 패키지 내부 리소스에 접근.
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드.
    mainWindow.loadURL(isDev
        ? "http://127.0.0.1:3000"
        : "file://".concat(path.join(__dirname, "../build/index.html")));
    // if (isDev) {
    //   mainWindow.webContents.openDevTools({ mode: "detach" });
    // }
    mainWindow.setResizable(true);
    // Emitted when the window is closed.
    mainWindow.on("closed", function () { return (mainWindow = undefined); });
    mainWindow.focus();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
