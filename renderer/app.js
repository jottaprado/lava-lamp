// Electron-specific enhancements for the Lava Lamp
let hideCursorTimeout;

function resetCursor() {
  document.body.style.cursor = 'default';
  clearTimeout(hideCursorTimeout);
  hideCursorTimeout = setTimeout(() => {
    document.body.style.cursor = 'none';
  }, 2000);
}

document.addEventListener('mousemove', resetCursor);
document.addEventListener('mousedown', resetCursor);
document.addEventListener('keydown', resetCursor);

// Initialize cursor hide
resetCursor();

// Desktop Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.electronAPI.quit();
  } else if (e.key.toLowerCase() === 'f') {
    window.electronAPI.toggleFullscreen();
  } else if (e.key.toLowerCase() === 'm') {
    window.electronAPI.switchMonitor();
  }
});

// Assuming the original script stores state in a global object or we can hook into it
// For this to work seamlessly, we will need to integrate this with the actual lava-lamp.html logic.
// We load prefs when the app starts:
window.electronAPI.loadPrefs().then(prefs => {
  if (prefs) {
    console.log('Loaded preferences:', prefs);
    // Apply preferences to the WebGL logic here...
    // e.g., applyPalette(prefs.palette), applyLayout(prefs.layout)
  }
});

// Function to call whenever the user changes a setting
// eslint-disable-next-line no-unused-vars
function saveCurrentPrefs(prefs) {
  window.electronAPI.savePrefs(prefs);
}

