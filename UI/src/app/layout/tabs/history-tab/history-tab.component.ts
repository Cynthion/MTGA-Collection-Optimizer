import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, merge } from 'rxjs';
import { withLatestFrom, subscribeOn } from 'rxjs/operators';
import * as _ from 'lodash';

import { HistoryTabState, State } from './history-tab.state';
import { UpdateHistoryCardsAction } from './history-tab.actions';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTabComponent {
  state$: Observable<HistoryTabState>;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
  ) {
    this.state$ = this.store.select(s => s.historyTab);

    const historyRelevantDataChanged$ = merge(
      this.store.select(s => s.layout.collectionCards.length),
      this.store.select(s => s.layout.playerDecks.length),
    );

    historyRelevantDataChanged$
      .pipe(
        withLatestFrom(this.store.select(s => s.layout)),
      )
    .subscribe(([, layout]) => {
      this.actionsSubject.next(new UpdateHistoryCardsAction(layout.collectionCards, layout.playerDecks));
    });
  }
}
