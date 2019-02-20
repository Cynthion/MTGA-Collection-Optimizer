import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';

import { WindowRef } from 'src/app/windowRef';
import { SettingsDialogComponent } from './settings';

declare function isElectron(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private injector: Injector,
    private dialog: MatDialog,
    private winRef: WindowRef) {

    console.log('isElectron', isElectron())
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
    // TODO implement
  }

  maximizeWindow() {
    // TODO implement
  }

  closeWindow() {
    // TODO implement
  }
}
