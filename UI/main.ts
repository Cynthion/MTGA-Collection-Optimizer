import { app, BrowserWindow, session } from 'electron';
import { ChildProcess, SpawnOptions } from 'child_process';
import * as path from 'path';
import * as url from 'url';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

const storage = require('./dist/storage');
const { spawn } = require('child_process');

const urlUserInterface = 'http://localhost:4200';
const urlBackend = 'https://localhost:5001';

function createWindow() {
  // Load window settings.
  const windowStateStorageKey = 'windowState';
  const settingsPath = path.join(app.getPath('userData'), 'MTGA Collection Optimizer Storage.json');
  let lastWindowState = storage.get(settingsPath, windowStateStorageKey);

  if (lastWindowState === null) {
    lastWindowState = {
      width: 1280,
      height: 720,
      maximized: false,
    };
  }

  // Create the browser window.
  win = new BrowserWindow({
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    frame: false,
    icon: 'src/favicon.ico',
    webPreferences: {
      /* Node integration must be enabled in order for the app to get access
      to native functionality. If set to false, the ElectronService will not
      detect the app to run in 'Electron' mode and will assume 'Web'. */
      nodeIntegration: true,
      contextIsolation: false,
      /* Script that will be loaded before other scripts run in the page.
      This script will always have access to node APIs no matter whether
      node integration is turned on or off. The value should be the absolute
      file path to the script. When node integration is turned off, the preload
      script can reintroduce Node global symbols back to the global scope. */
      preload: path.join(__dirname, 'dist/preload.js'),
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
    }
  });

  if (lastWindowState.maximized) {
    win.maximize();
  }

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL(urlUserInterface);
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Open the DevTools.
  // TODO only show dev tools if serve
  win.webContents.openDevTools({ mode: 'bottom' });

  // Store window settings.
  win.on('close', function () {
    const bounds = win.getBounds();

    storage.set(settingsPath, windowStateStorageKey, {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
      maximized: win.isMaximized(),
    });
  });

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
          'Content-Security-Policy': [`'default-src \'self\' ${ urlBackend } \'unsafe-inline\' \'unsafe-eval\' ws:`]
        }
      });
    });

    // Start the .NET Core backend
    startBackend();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }

    // Close the .NET Core backend
    closeBackend();
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
let backendProcess: ChildProcess = null;

function startBackend() {
  // TODO configure backend to run on specified ports
  const spawnCommand = path.join(__dirname, 'netcore-backend/MtgaDeckBuilder.Api.exe');
  const spawnArgs = ['-environment', 'dev'];
  const spawnOptions: SpawnOptions = {
    cwd: undefined, // inherit current working directory
    detached: false, // child process cannot run independently of parent
  };

  backendProcess = spawn(spawnCommand, spawnArgs, spawnOptions);

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
    console.log(`The backend process exited with code ${code}.`);
  });

  backendProcess.on('error', (err: any) => {
    console.error('Failed to start the backend process.');
  });
}

function closeBackend() {
  if (backendProcess !== null) {
    backendProcess.kill('SIGINT');
  }
}
