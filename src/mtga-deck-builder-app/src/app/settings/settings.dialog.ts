import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SettingsDialogState, SettingsFeatureState } from './settings.state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.dialog.html',
  styleUrls: ['./settings.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent {
  state$: Observable<SettingsDialogState>;

  constructor(
      private store: Store<SettingsFeatureState>,
      private actionsSubject: ActionsSubject,
    ) {
    this.state$ = store.select(s =>  s.settingsDialog);
  }
}
