import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { WindowRef } from 'src/app/windowRef';
import { SettingsDialogComponent } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public dialog: MatDialog,
    private winRef: WindowRef) {
    // const remote = require('electron').remote;
    // const BrowserWindow = remote.BrowserWindow;
    // console.log(winRef && winRef.nativeWindow.process && winRef.nativeWindow.process.type);
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
    // BrowserWindow.close();
  }

  maximizeWindow() {
    // TODO implement
  }

  closeWindow() {
    // TODO implement
  }
}
