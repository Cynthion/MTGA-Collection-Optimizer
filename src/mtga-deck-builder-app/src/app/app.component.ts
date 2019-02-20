import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';

import { isElectron } from '../app/util/isElectron';
import { WindowRef } from 'src/app/windowRef';
import { SettingsDialogComponent } from './settings';

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
    // const remote = require('electron').remote;
    // const BrowserWindow = remote.BrowserWindow;
    // console.log(winRef && winRef.nativeWindow.process && winRef.nativeWindow.process.type);

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
    // BrowserWindow.close();
  }

  maximizeWindow() {
    // TODO implement
  }

  closeWindow() {
    // TODO implement
  }
}
