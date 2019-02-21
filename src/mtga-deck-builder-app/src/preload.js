// When disabling Node.js integration, you can still expose APIs to your website that do 
// consume Node.js modules or features. Preload scripts continue to have access to require 
// and other Node.js features, allowing developers to expose a custom API to remotely loaded content.

const { ipcRenderer } = require('electron');
function init() {
  // add global variables to your web page
  window.isElectron = true;
  window.ipcRenderer = ipcRenderer;
}

init();