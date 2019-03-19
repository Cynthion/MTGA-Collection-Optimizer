import { Component } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppConfig } from '../environments/environment';
import { WindowService } from './providers/window.service';
import { ElectronService } from './providers/electron.service';
import { PlatformServiceProvider } from './providers/platform-service-provider';
import { OpenAboutDialogAction } from './about';
import { OpenSettingsDialogAction } from './settings';
import { AppState, RootState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  state$: Observable<AppState>;

  private windowService: WindowService;
  private isWindowMaximized: boolean;

  constructor(
    private store: Store<RootState>,
    public electronService: ElectronService,
    private platformServiceProvider: PlatformServiceProvider,
    private actionsSubject: ActionsSubject,
  ) {
    this.state$ = this.store.select(s => s.app);

    console.log('AppConfig', AppConfig);

    if (electronService.isElectronApp) {
      console.log('Mode: Electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode: Web');
    }

    this.windowService = this.platformServiceProvider.getWindowService();
    this.isWindowMaximized = this.windowService.isWindowMaximized();
  }

  openSettingsDialog(): void {
    this.actionsSubject.next(new OpenSettingsDialogAction());
  }

  openAboutDialog(): void {
    this.actionsSubject.next(new OpenAboutDialogAction());
  }

  minimizeWindow() {
    this.windowService.minimizeWindow();
  }

  maximizeWindow() {
    if (this.isWindowMaximized) {
      this.windowService.restoreWindow();
      this.isWindowMaximized = false;
    } else {
      this.windowService.maximizeWindow();
      this.isWindowMaximized = true;
    }
  }

  closeWindow() {
    this.windowService.closeWindow();
  }

  get isMaximized(): boolean {
    return this.isWindowMaximized;
  }
}
