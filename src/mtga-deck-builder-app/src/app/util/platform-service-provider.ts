import { Injectable, Injector } from '@angular/core';

// make .js code available in .ts
declare function isElectron(): any;

export interface WindowService {
  minimizeWindow(): void,
  maximizeWindow(): void,
  closeWindow(): void,
}

class BrowserWindowService implements WindowService {
  minimizeWindow(): void {
    console.log('Browser: Window minimized.')
  }  
  maximizeWindow(): void {
    console.log('Browser: Window maximized.')
  }
  closeWindow(): void {
    console.log('Browser: Window closed.')
  }
}

class ElectronWindowService implements WindowService {
  minimizeWindow(): void {
    console.log('Electron: Window minimized.')
  }  
  maximizeWindow(): void {
    console.log('Electron: Window maximized.')
  }
  closeWindow(): void {
    console.log('Electron: Window closed.')
  }
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
