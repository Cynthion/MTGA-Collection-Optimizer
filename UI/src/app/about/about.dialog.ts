import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '../app.state';
import { AboutState } from './about.state';
import { CloseAboutDialogAction } from './about.actions';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about.dialog.html',
  styleUrls: ['./about.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutDialogComponent {
  state$: Observable<AboutState>;

  constructor(
    private store: Store<RootState>,
    private actionsSubject: ActionsSubject) {

    this.state$ = this.store.select(s => s.app.about);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.actionsSubject.next(new CloseAboutDialogAction());
  }
}
