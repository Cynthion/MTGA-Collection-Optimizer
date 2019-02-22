import { ElectronService } from 'ngx-electron';

import { WindowService } from './window.service';

export class ElectronWindowService implements WindowService {

  constructor(private electronService: ElectronService) { }

  minimizeWindow(): void {
    const browserWindow = this.electronService.remote.BrowserWindow;
    (browserWindow as any).minimize();
    console.log('Electron: Window minimized.');
  }
  maximizeWindow(): void {
    const browserWindow = this.electronService.remote.BrowserWindow;
    (browserWindow as any).maximize();
    console.log('Electron: Window maximized.');
  }
  closeWindow(): void {
    const browserWindow = this.electronService.remote.BrowserWindow;
    (browserWindow as any).close();
    console.log('Electron: Window closed.');
  }
}
