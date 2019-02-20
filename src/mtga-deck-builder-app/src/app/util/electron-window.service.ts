import { WindowService } from './platform-service-provider';

import { remote } from 'electron';
// const {BrowserWindow} = require('electron').remote;

// TODO don't work with typing, just call function. should work if it^s there

export class ElectronWindowService implements WindowService {
  minimizeWindow(): void {
    console.log(remote);
    console.log('Electron: Window minimized.');
  }
  maximizeWindow(): void {
    console.log('Electron: Window maximized.');
  }
  closeWindow(): void {
    console.log('Electron: Window closed.');
  }
}