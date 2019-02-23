const { remote } = require('electron');

init();

function init() {
  // Expose a bridging API to by setting an global on `window`.
  // We'll add methods to it here first, and when the remote web app loads,
  // it'll add some additional methods as well.

  // !CAREFUL! Don't expose any functionality or APIs that could compromise the user's computer. 
  // (e.g., don't directly expose core Electron (even IPC) or Node.js modules.
  window.MtgaCollectionOptimizerBridge = {
    minimizeWindow: minimizeWindow,
    maximizeWindow: maximizeWindow,
    closeWindow: closeWindow,
  };
}

function minimizeWindow() {
  var win = remote.getCurrentWindow();
  win.minimize();
}

function maximizeWindow() {
  var win = remote.getCurrentWindow();
  win.maximize();
}

function closeWindow() {
  var win = remote.getCurrentWindow();
  win.close();
}
