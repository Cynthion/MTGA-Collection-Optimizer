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
    private electronService: ElectronService,
    private preloadBridge: PreloadBridge,
    private browserStorageService: BrowserStorageService,
    ) { }

  getWindowService(): WindowService {
    if (this.electronService.isElectron) {
      return new ElectronWindowService(this.preloadBridge);
    } else {
      return new BrowserWindowService();
    }
  }

  getStorageService(): StorageService {
    if (this.electronService.isElectron) {
      return new ElectronStorageService(this.preloadBridge);
    } else {
      return this.browserStorageService;
    }
  }
}
