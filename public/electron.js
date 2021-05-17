const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const { menu } = require("./electron/menu");
require("electron-debug")();

let mainWindow;

/** on windows, we will use custom menu bar */
const isWindows = process.platform === "win32";

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#ffffff",
    show: false,
    //frame:  isWindows? false: true,
    frame:  true,
    webPreferences: {
      /** this file will manage the bridge between our electron app and react */
      preload: `${path.join(__dirname, "./electron/react-electron-bridge.js")}`,
    },
  });

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.maximize();
    mainWindow.title = "Atup";
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  /** quit app when all windows are closed */
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  /** if app is active but no window is visible, create one */
  if (mainWindow === null) {
    createWindow();
  }
});

/** add event listener for ipcRenderer showMenu event */
ipcMain.on("show-custom-menu", (e, args) => {
  if (isWindows && mainWindow) {
    menu.popup({
      window: mainWindow,
      x: args.x,
      y: args.y,
    });
  }
});
