import { ChangeDetectionStrategy, Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { RootState } from '../app.state';
import { SettingsState, SettingsDto } from './settings.state';
import { CloseSettingsAction } from './settings.actions';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings.dialog.html',
  styleUrls: ['./settings.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent implements OnDestroy {
  state$: Observable<SettingsState>;

  settings: SettingsDto;
  settingsSubscription: Subscription;

  constructor(
    private store: Store<RootState>,
    private actionsSubject: ActionsSubject,
    private changeDetector: ChangeDetectorRef) {

    this.state$ = this.store.pipe(select(s => s.app.settings));

    this.settingsSubscription = this.state$.subscribe(s => {
      this.settings = s;
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.closeDialog();
    }
  }

  closeDialog(): void {
    console.log(this.settings);
    this.actionsSubject.next(new CloseSettingsAction());
    // this.actionsSubject.next(new StoreSettingsAction(this.settings));
  }
}
