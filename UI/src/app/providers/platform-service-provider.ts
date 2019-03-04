import { Injectable } from '@angular/core';

import { ElectronService } from './electron.service';
import { PreloadBridge } from './preload.bridge';
import { WindowService } from './window.service';
import { ElectronWindowService } from './electron-window.service';
import { BrowserWindowService } from './browser-window.service';
import { StorageService } from './storage.service';
import { ElectronStorageService } from './electron-storage.service';
import { BrowserStorageService } from './browser-storage.service';

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

  getStorageService(): StorageService {
    if (this.electronService.isElectronApp) {
      return new ElectronStorageService(this.preloadBridge);
    } else {
      return new BrowserStorageService();
    }
  }
}
