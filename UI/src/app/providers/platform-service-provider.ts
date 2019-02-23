import { Injectable } from '@angular/core';

import { ElectronService } from './electron.service';
import { PreloadBridge } from './preload.bridge';
import { WindowService } from './window.service';
import { ElectronWindowService } from './electron-window.service';
import { BrowserWindowService } from './browser-window.service';

@Injectable()
export class PlatformServiceProvider {

  constructor(
    private preloadBridge: PreloadBridge,
    private electronService: ElectronService,
    ) { }

  getWindowService(): WindowService {
    if (this.electronService.isElectronApp) {
      return new ElectronWindowService(this.preloadBridge);
    } else {
      return new BrowserWindowService();
    }
  }
}
