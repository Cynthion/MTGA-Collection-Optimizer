// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
    // Create the browser window.
    // TODO upon production, copy all the window options from .dev
    mainWindow = new BrowserWindow({
      width: 1280, 
      height: 720,
        icon: './src/favicon.ico',
    })

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/index.html`),
          protocol: "file:", // TODO: this protocol maybe need another CSP strategy: https://electronjs.org/docs/tutorial/security#csp-meta-tag
          slashes: true
        })
    );

    // Open the DevTools.
    // mainWindow.webContents.openDevTools({ mode: 'bottom' });

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', startApi)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
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

    if (mainWindow == undefined) {
      // create window after successful backend spawn
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
