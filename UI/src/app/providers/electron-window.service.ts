import { WindowService } from './window.service';
import { PreloadBridge } from './preload.bridge';

export class ElectronWindowService implements WindowService {

  constructor(private preloadBridge: PreloadBridge) { }

  minimizeWindow(): void {
    this.preloadBridge.minimizeWindow();
    console.log('Electron: Window minimized.');
  }
  maximizeWindow(): void {
    this.preloadBridge.maximizeWindow();
    console.log('Electron: Window maximized.');
  }
  closeWindow(): void {
    this.preloadBridge.closeWindow();
    console.log('Electron: Window closed.');
  }
}
