import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';

import { TabsState, State } from './tabs.state';
import { Observable } from 'rxjs';
import { ResetBadgeCountAction } from './history-tab/history-tab.actions';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  state$: Observable<TabsState>;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
  ) {
    this.state$ = this.store.pipe(select(s => s.layout.tabs));
  }

  navigateToHistoryTab(): void {
    this.actionsSubject.next(new ResetBadgeCountAction());
  }
}
