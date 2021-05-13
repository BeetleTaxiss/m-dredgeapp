const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
  });
  // const startURL = isDev
  //   ? "http://localhost:3000"
  //   : `file://${path.join(__dirname, "../build/index.html")}`;

    const startURL = isDev
    ? "http://localhost:3000"
    //: `file://${path.join(__dirname, "./../build/index.html")}`;
    : `file://${path.join(__dirname, "index.html")}`;


 // const startURL = `file://${path.join(__dirname, "./../build/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.maximize();
    //mainWindow.title="Atop"
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", ()=>{
  /** quit app when all windows are closed */
  if(process.platform!=="darwin") {
    app.quit();
  }
});

app.on("activate", ()=>{
  /** if app is active but no window is visible, create one */
  if(mainWindow===null) {
    createWindow();
  }
});
