import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';

import { WindowRef } from 'src/app/windowRef';
import { SettingsDialogComponent } from './settings';
import { PlatformServiceProvider, WindowService } from './util/platform-service-provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private windowService: WindowService;

  constructor(
    private platformServiceProvider: PlatformServiceProvider,
    private dialog: MatDialog,) {

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
