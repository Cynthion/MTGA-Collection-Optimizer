import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '../app.state';
import { SettingsDialogState } from './settings.state';

// const storage = require('../../storage');
const outputLogPathStorageKey = 'outputLogPath';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings.dialog.html',
  styleUrls: ['./settings.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent {
  state$: Observable<SettingsDialogState>;

  outputLogPath: string;

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    private store: Store<RootState>,
    private actionsSubject: ActionsSubject,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.state$ = store.select(s =>  {
        return s.app.settingsDialog;
      });
  }

  closeDialog(): void {
    // TODO check whether run in Electron
    // TODO write settings to storage
    // storage.set(outputLogPathStorageKey, this.outputLogPath);

    // TODO provide settings to backend
    console.log('Configured path:', this.outputLogPath);
    this.dialogRef.close();
  }
}
