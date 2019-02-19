import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SettingsDialogState, SettingsFeatureState } from './settings.state';
import { MatDialog } from '@angular/material';
import { SettingsDialogComponent } from './settings.dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  state$: Observable<SettingsDialogState>;

  constructor(
      public dialog: MatDialog,
      private store: Store<SettingsFeatureState>,
      private actionsSubject: ActionsSubject,
    ) {
    this.state$ = store.select(s =>  s.settingsDialog);
  }

  openSettingsDialog(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '250px',
      data: {name: 'Chris', animal: 'Ape'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
