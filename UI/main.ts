import { app, BrowserWindow, screen, session } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { start } from 'repl';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    frame: false,
    icon: './favicon.ico',
    webPreferences: {
      nodeIntegration: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
      contextIsolation: true,
    }
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Open the DevTools.
  win.webContents.openDevTools({ mode: 'bottom' });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    // Add Content Security Policy (CSP) headers
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
          'Content-Security-Policy': ['default-src \'self\' https://localhost:5001 \'unsafe-inline\' \'unsafe-eval\' ws:']
        }
      });
    });

    // Start backend with API.
    startApi();

    // createWindow();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

// .NET Core backend process
// TODO for production, take .exe from .NET project /dist folder
const backendExecutablePath = path.join(__dirname, '..\\MtgaDeckBuilder.Api\\bin\\Debug\\netcoreapp2.2\\win10-x64\\MtgaDeckBuilder.Api.exe');
let backendProcess = null;

function startApi() {
  const childProcess = require('child_process').spawn;

  backendProcess = childProcess(backendExecutablePath);

  // create window after successful backend spawn
  backendProcess.stdout.on('data', (data: any) => {
    console.log(`stdout: ${data}`);

    if (win === undefined) {
      createWindow();
    }
  });

  backendProcess.stderr.on('data', (data: any) => {
    console.log(`stderr: ${data}`);
  });

  // if backend process closes, also close frontend (should not happen this way round)
  backendProcess.on('close', (code: any) => {
    console.log(`API backend process exited with code ${code}.`);
    if (win !== null) {
      console.log(`Thus, also closing frontend window.`);
      win.close();
    }
  });
}
