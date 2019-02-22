import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
// import { TranslateService } from '@ngx-translate/core';
import { ElectronService } from 'ngx-electron';

import { AppConfig } from '../environments/environment';
import { WindowService } from './providers/window.service';
import { PlatformServiceProvider } from './providers/platform-service-provider';
import { SettingsDialogComponent } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private windowService: WindowService;

  constructor(
    public electronService: ElectronService,
    private platformServiceProvider: PlatformServiceProvider,
    private dialog: MatDialog,
    // private translate: TranslateService,
    ) {

    // translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectronApp) {
      console.log('Mode: Electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode: Web');
    }

    this.windowService = platformServiceProvider.getWindowService();
  }

  openSettingsDialog(): void {
    this.dialog.open(SettingsDialogComponent, {
      width: '500px',
      position: {
        top: '30px',
        right: '10px',
      }
    });
  }

  minimizeWindow() {
    this.windowService.minimizeWindow();
  }

  maximizeWindow() {
    this.windowService.maximizeWindow();
  }

  closeWindow() {
    this.windowService.closeWindow();
  }
}
