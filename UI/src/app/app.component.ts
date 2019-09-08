import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppConfig } from '../environments/environment';
import { WindowService } from './providers/window.service';
import { ElectronService } from './providers/electron.service';
import { PlatformServiceProvider } from './providers/platform-service-provider';
import { makeInternalApiUrl } from './util/http';
import { OpenAboutDialogAction } from './about';
import { OpenSettingsAction } from './settings';
import { AppState, RootState } from './app.state';
import { LoadDataAction } from './layout/layout.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  state$: Observable<AppState>;

  protected eventSource: EventSource;
  protected isSseSubscribed: boolean;

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

  ngOnInit() {
    this.subscribeToServerSentEvents();
  }

  ngOnDestroy() {
    this.unsubscribeFromServerSentEvents();
  }

  openSettings(): void {
    this.actionsSubject.next(new OpenSettingsAction());
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

  subscribeToServerSentEvents() {
    if (!this.isSseSubscribed) {
      this.eventSource = new EventSource(makeInternalApiUrl('sse-layout-data'));
      this.eventSource.onopen = (evt) => this.onEventSourceOpen(evt);
      this.eventSource.onmessage = (data) => this.onEventSourceMessage(data);
      this.eventSource.onerror = (evt) => this.onEventSourceError(evt);

      this.isSseSubscribed = true;
    }
  }

  unsubscribeFromServerSentEvents(): void {
    if (this.isSseSubscribed) {
      this.eventSource.close();
      this.isSseSubscribed = false;
    }
  }

  protected onEventSourceOpen(event: Event) {
    console.log('SSE connection established');
  }

  protected onEventSourceMessage(messageEvent: MessageEvent): void {
    console.log('SSE connection message:', messageEvent.data);

    this.actionsSubject.next(new LoadDataAction());
  }

  protected onEventSourceError(event: Event): void {
    console.log('SSE connection error:', event);
    if (event.eventPhase === this.eventSource.CLOSED) {
      this.eventSource.close();
      console.log('SSE connection closed.');
    }
  }
}
