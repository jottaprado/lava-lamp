const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  quit: () => ipcRenderer.send('quit'),
  toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  loadPrefs: () => ipcRenderer.invoke('load-prefs'),
  savePrefs: (prefs) => ipcRenderer.send('save-prefs', prefs),
  broadcastAction: (action) => ipcRenderer.send('broadcast-action', action),
  onActionBroadcasted: (callback) => { ipcRenderer.on('action-broadcasted', (_event, action) => callback(action)); }
});

