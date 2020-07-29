const { app, BrowserWindow, screen } = require("electron");
const url = require("url");
const path = require("path");
const { electron } = require("process");

let mainWindow;
let optWindow;

function createWindow() {
  let screens = screen.getAllDisplays();
  // const { mainWidth, mainHeight } = screens[0].workAreaSize;
  const { mainWidth, mainHeight } = screen.getPrimaryDisplay().workAreaSize;
  const { optWidth, optHeight } = screens[1].workAreaSize;
  mainWindow = new BrowserWindow({
    // width: mainWidth,
    mainWidth,
    // height: mainHeight,
    mainHeight,
    webPreferences: {
      nodeIntegration: true,
    },
    // show: false,
    // maximize: true,
  });
  optWindow = new BrowserWindow({
    width: optWidth,
    height: optHeight,
    webPreferences: {
      nodeIntegration: true,
    },
    // show: false,
    // maximize: true,
  });
  // mainWindow.maximize();
  // optWindow.maximize();
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
