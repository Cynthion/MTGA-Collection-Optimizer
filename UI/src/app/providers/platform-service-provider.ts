import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { WindowService } from './window.service';
import { ElectronWindowService } from './electron-window.service';
import { BrowserWindowService } from './browser-window.service';

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
