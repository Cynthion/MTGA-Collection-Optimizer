import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '../app.state';
import { SettingsState, SettingsDto } from './settings.state';
import { CloseSettingsDialogAction, StoreSettingsAction } from './settings.actions';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings.dialog.html',
  styleUrls: ['./settings.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent {
  state$: Observable<SettingsState>;
  outputLogPath: string;
  logPollInterval: number;

  constructor(
    private store: Store<RootState>,
    private actionsSubject: ActionsSubject,
    @Inject(MAT_DIALOG_DATA) public data: any) { // TODO use this via state

      this.state$ = this.store.select(s => s.app.settings);

      this.state$.subscribe(s => {
        this.outputLogPath = s.outputLogPath;
        this.logPollInterval = s.logPollInterval;
      });
    }

  closeDialog(): void {
      // TODO fix settings validation
    // if (!this.areSettingsValid()) {
    //   return;
    // }

    const settingsDto: SettingsDto = {
      outputLogPath: this.outputLogPath,
      logPollInterval: this.logPollInterval,
    };

    this.actionsSubject.next(new CloseSettingsDialogAction());
    this.actionsSubject.next(new StoreSettingsAction(settingsDto));
  }
}
