import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/app.state';
import { SettingsDialogState } from './settings.state';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings.dialog.html',
  styleUrls: ['./settings.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent {
  state$: Observable<SettingsDialogState>;
  
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
    this.dialogRef.close();
  }
}
