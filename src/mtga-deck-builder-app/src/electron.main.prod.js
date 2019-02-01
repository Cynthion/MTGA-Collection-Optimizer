// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        icon: './src/favicon.ico',
    })

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/index.html`),
          protocol: "file:",
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

function startApi() {
  var proc = require('child_process').spawn;
  //  run server
  var apipath = path.join(__dirname, 'MtgaDeckBuilder.Api.exe') // must be copied manually from .NET bin folder
//   if (os.platform() === 'darwin') {
//     apipath = path.join(__dirname, '..//api//bin//dist//osx//Api')
//   }
  apiProcess = proc(apipath)

  apiProcess.stdout.on('data', (data) => {
    writeLog(`stdout: ${data}`);
    if (mainWindow == null) {
      createWindow();
    }
  });
}

//Kill process when electron exits
process.on('exit', function () {
  writeLog('exit');
  apiProcess.kill();
});

function writeLog(msg){
  console.log(msg);
}