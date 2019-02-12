import { Component } from '@angular/core';

import { WindowRef } from 'src/app/windowRef';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  minimizeWindow() {
    // BrowserWindow.close();
  }

  maximizeWindow() {

  }

  closeWindow() {

  }

  constructor(private winRef: WindowRef) {
    // const remote = require('electron').remote;
    // const BrowserWindow = remote.BrowserWindow;
    console.log(winRef && winRef.nativeWindow.process && winRef.nativeWindow.process.type);
  }
}
