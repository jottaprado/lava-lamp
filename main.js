const { app, BrowserWindow, ipcMain, screen, powerSaveBlocker } = require('electron');
const path = require('path');
const fs = require('fs');

const appId = 'com.jottaprado.lava.v2';
app.setAppUserModelId(appId);

// Single Instance Lock
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  return;
}

// Prefs handling
// Save in the app's installation directory if possible, or fallback to appData if not writable.
// Since NSIS installs per-user, it should be writable.
// But when running in dev mode, we might want to save it in the project root.
const installDir = path.dirname(app.getPath('exe'));
const isDev = !app.isPackaged;
const prefsPath = isDev 
  ? path.join(__dirname, 'preferences.json') 
  : path.join(installDir, 'preferences.json');

function loadPrefs() {
  try {
    if (fs.existsSync(prefsPath)) {
      const data = fs.readFileSync(prefsPath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading prefs', err);
  }
  return null; // Let renderer use defaults
}

function savePrefs(prefs) {
  try {
    fs.writeFileSync(prefsPath, JSON.stringify(prefs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving prefs', err);
  }
}

let windows = [];
let preventSleepId;

function createWindow() {
  const displays = screen.getAllDisplays();
  
  displays.forEach(display => {
    const { x, y, width, height } = display.bounds;

    let win = new BrowserWindow({
      x, y, width, height,
      frame: false,
      fullscreen: true,
      autoHideMenuBar: true,
      icon: path.join(__dirname, 'assets', 'icon.ico'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false
      }
    });

    win.loadFile(path.join(__dirname, 'renderer', 'index.html'));

    win.on('closed', () => {
      windows = windows.filter(w => w !== win);
    });

    windows.push(win);
  });
}

app.on('second-instance', () => {
  windows.forEach(win => {
    if (win.isMinimized()) win.restore();
    win.focus();
  });
});

app.whenReady().then(() => {
  // Prevent display from sleeping
  preventSleepId = powerSaveBlocker.start('prevent-display-sleep');
  
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (preventSleepId !== undefined) {
    powerSaveBlocker.stop(preventSleepId);
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
ipcMain.on('quit', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.close(); // Fecha apenas a janela que enviou o comando
  }
});

ipcMain.on('toggle-fullscreen', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.setFullScreen(!win.isFullScreen());
  }
});

ipcMain.on('broadcast-action', (event, action) => {
  const senderWin = BrowserWindow.fromWebContents(event.sender);
  windows.forEach(w => {
    if (!w.isDestroyed() && w !== senderWin) {
      w.webContents.send('action-broadcasted', action);
    }
  });
});

ipcMain.on('minimize-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.minimize();
  }
});

ipcMain.handle('load-prefs', () => {
  return loadPrefs();
});

ipcMain.on('save-prefs', (event, prefs) => {
  savePrefs(prefs);
});

