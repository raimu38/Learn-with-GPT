import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
}

app.on("ready", createWindow);

ipcMain.on("start-timer", (_, seconds: number) => {
  let remaining = seconds;
  const interval = setInterval(() => {
    remaining--;
    mainWindow?.webContents.send("tick", remaining);
    if (remaining <= 0) clearInterval(interval);
  }, 1000);
});
