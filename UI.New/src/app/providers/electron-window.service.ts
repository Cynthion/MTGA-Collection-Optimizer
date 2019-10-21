import { WindowService } from './window.service';
import { PreloadBridge } from './preload.bridge';

export class ElectronWindowService implements WindowService {

  constructor(private preloadBridge: PreloadBridge) { }

  isWindowMaximized(): boolean {
    return this.preloadBridge.isWindowMaximized();
  }

  minimizeWindow(): void {
    this.preloadBridge.minimizeWindow();
    console.log('Electron: Window minimized.');
  }

  maximizeWindow(): void {
    this.preloadBridge.maximizeWindow();
    console.log('Electron: Window maximized.');
  }

  restoreWindow(): void {
    this.preloadBridge.restoreWindow();
    console.log('Electron: Window restored.');
  }

  closeWindow(): void {
    this.preloadBridge.closeWindow();
    console.log('Electron: Window closed.');
  }
}
