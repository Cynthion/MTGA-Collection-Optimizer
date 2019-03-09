import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '../app.state';
import { PlatformServiceProvider } from '../providers/platform-service-provider';
import { StorageService } from '../providers/storage.service';
import { SettingsDialogState, SettingsStorageKey } from './settings.state';
import { ApplySettingsDialogAction, CloseSettingsDialogAction } from './settings.actions';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings.dialog.html',
  styleUrls: ['./settings.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent {
  outputLogPath: string;
  logPollInterval: number;

  constructor(
    private store: Store<RootState>,
    private actionsSubject: ActionsSubject,
    @Inject(MAT_DIALOG_DATA) public data: any) { // TODO use this via state

      this.store.select(s =>  {
        const settingsDialogState = s.app.settingsDialog;

        this.outputLogPath = settingsDialogState.outputLogPath;
        this.logPollInterval = settingsDialogState.logPollInterval;
      });

      // TODO load previous settings
      // TODO fix settings validation
  }

  closeDialog(): void {
    // if (!this.areSettingsValid()) {
    //   return;
    // }

    this.actionsSubject.next(new CloseSettingsDialogAction());
  }

  areSettingsValid(): boolean {
    return this.isOutputLogPathValid();
  }

  isOutputLogPathValid(): boolean {
    return !!this.outputLogPath;
  }
}
