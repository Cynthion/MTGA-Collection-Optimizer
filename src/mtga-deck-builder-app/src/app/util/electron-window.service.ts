import { WindowService } from './platform-service-provider';

// this part requires browserify
// const remote = require('electron').remote;
// const BrowserWindow = remote.BrowserWindow;

// TODO don't work with typing, just call function. should work if it^s there

export class ElectronWindowService implements WindowService {
  minimizeWindow(): void {
    // BrowserWindow.minimizeWindow();
    console.log('Electron: Window minimized.');
  }
  maximizeWindow(): void {
    // BrowserWindow.maximizeWindow();
    console.log('Electron: Window maximized.');
  }
  closeWindow(): void {
    // BrowserWindow.closeWindow();
    console.log('Electron: Window closed.');
  }
}