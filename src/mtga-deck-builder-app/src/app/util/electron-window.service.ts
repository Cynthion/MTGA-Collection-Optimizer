import { WindowService } from './platform-service-provider';
import { ElectronService } from 'ngx-electron';

export class ElectronWindowService implements WindowService {

  constructor(private electronService: ElectronService) { 
  }

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