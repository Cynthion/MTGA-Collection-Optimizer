/* Compliance with security recommendations means that the rendered process can 
not have any direct access to node.js modules, such as require definitions. 
Instead, the preload parameter in webPreferences points to a script that will 
be loaded before the rendered process, giving the rendered process API-like 
access to specific functions exposed by the preload script through the window 
object. It is important to note that the preload script can only require a very 
small number of mostly Electron-related node.js modules.

The rendered process can only call those functions exposed by the preload script,
and they in turn perform the specific node.js module functionality, or in certain
cases, these may be delegated back to the main process.

In the event that someone would gain unauthorized access to the renderer process, 
they would not be able to directly run node.js commands - only those functions 
that were exposed in the preload script. */
const remote = require('electron').remote;

const storage = require('./storage');

init();

function init() {
  // Expose a bridging API by setting a global variable on `window`.
  // We'll add methods to it here first, and when the remote web app loads,
  // it'll add some additional methods as well.

  // !CAREFUL! Don't expose any functionality or APIs that could compromise the user's computer. 
  // (e.g., don't directly expose core Electron (even IPC) or Node.js modules.
  window.MtgaCollectionOptimizerBridge = {
    isWindowMaximized: isWindowMaximized,
    minimizeWindow: minimizeWindow,
    maximizeWindow: maximizeWindow,
    restoreWindow: restoreWindow,
    closeWindow: closeWindow,
    storeSetting: storeSetting,
    loadSetting: loadSetting,
  };
}

// exposed functions

function isWindowMaximized() {
  var win = remote.getCurrentWindow();
  return win.isMaximized();
}

function minimizeWindow() {
  var win = remote.getCurrentWindow();
  win.minimize();
}

function maximizeWindow() {
  var win = remote.getCurrentWindow();
  win.maximize();
}

function restoreWindow() {
  var win = remote.getCurrentWindow();
  win.restore();
}

function closeWindow() {
  var win = remote.getCurrentWindow();
  win.close();
}

function storeSetting(key, data) {
  // TODO use AppData path
  const path = "C:\\Users\\chlu\\AppData\\Roaming\\mtga-collection-optimizer\\MTGA Collection Optimizer Storage.json";
  storage.set(path, key, data);
}

function loadSetting(key) {
  const path = "C:\\Users\\chlu\\AppData\\Roaming\\mtga-collection-optimizer\\MTGA Collection Optimizer Storage.json";
  return storage.get(path, key);
}
