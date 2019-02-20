import { Injectable, Injector } from '@angular/core';
import { ElectronWindowService } from './electron-window.service';
import { BrowserWindowService } from './browser-window.service';

// make .js code available in .ts
declare function isElectron(): any;

export interface WindowService {
  minimizeWindow(): void,
  maximizeWindow(): void,
  closeWindow(): void,
}

@Injectable()
export class PlatformServiceProvider {

  getWindowService(): WindowService {
    if (isElectron()) {
      return new ElectronWindowService();
    } else {
      return new BrowserWindowService();
    }
  }  
}
