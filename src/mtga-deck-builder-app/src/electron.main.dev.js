// Modules to control application life and create native browser window
const { app, BrowserWindow, session } = require('electron')
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
  // set timeout to render the window not until the Angular 
  // compiler is ready to show the project
  setTimeout(() => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 1280, 
      height: 720,
      icon: './src/favicon.ico',
      webPreferences: {
        webSecurity: true,
        nodeIntegration: false,
        allowRunningInsecureContent: false,
        experimentalFeatures: false,
        contextIsolation: true,
        preload: './preload.js',
      }
    })

    // and load the index.html of the app.
    mainWindow.loadURL(
      url.format({
        pathname: 'localhost:4200',
        protocol: 'http:',
        slashes: true
      })
    );

    // Open the DevTools.
    mainWindow.webContents.openDevTools({ mode: 'bottom' });

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    });
  }, 10000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // Content Security Policy
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
        'Content-Security-Policy': ['default-src \'self\' https://localhost:5001 \'unsafe-inline\' \'unsafe-eval\' ws:']
      }
    })
  });

  // attack backend .exe
  startApi();
  // createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    console.log(`All app windows closed, thus quitting app.`);
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// .NET Core backend process
// https://nodejs.org/api/child_process.html
var backendProcess = null;

function startApi() {
  const childProcess = require('child_process').spawn;
  //  run server
  // TODO for production, take .exe from .NET project /dist folder
  // var backendExecutablePath = path.join(__dirname, '..\\..\\MtgaDeckBuilder.Api\\bin\\dist\\win\\MtgaDeckBuilder.Api.exe')
  var backendExecutablePath = path.join(__dirname, '..\\..\\MtgaDeckBuilder.Api\\bin\\Debug\\netcoreapp2.2\\win10-x64\\MtgaDeckBuilder.Api.exe')

  backendProcess = childProcess(backendExecutablePath)

  backendProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    // create window after successful backend spawn
    if (mainWindow === null) {
      createWindow();
    }
  });

  backendProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  
  backendProcess.on('close', (code) => {
    console.log(`API backend process exited with code ${code}.`);
    // if backend process closes, also close frontend (should not happen this way round)
    if (mainWindow !== null) {
      console.log(`Thus, also closing frontend window.`);
      mainWindow.close();
    }
  });
}
