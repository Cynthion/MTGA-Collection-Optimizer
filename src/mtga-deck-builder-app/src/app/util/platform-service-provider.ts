import { Injectable, Injector } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { ElectronWindowService } from './electron-window.service';
import { BrowserWindowService } from './browser-window.service';

export interface WindowService {
  minimizeWindow(): void,
  maximizeWindow(): void,
  closeWindow(): void,
}

@Injectable()
export class PlatformServiceProvider {

  constructor(private electronService: ElectronService) { }

  getWindowService(): WindowService {
    if (this.electronService.isElectronApp) {
      return new ElectronWindowService(this.electronService);
    } else {
      return new BrowserWindowService();
    }
  }  
}
