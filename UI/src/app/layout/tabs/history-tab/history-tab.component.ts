import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, merge } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

import { HistoryTabState, State, HistoryCardState } from './history-tab.state';
import { UpdateHistoryCardsAction } from './history-tab.actions';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTabComponent implements OnInit {
  state$: Observable<HistoryTabState>;

  displayedColumns: string[] = ['name', 'timeStamp'];
  dataSource: MatTableDataSource<HistoryCardState>;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
  ) {
    this.state$ = this.store.select(s => s.historyTab);

    this.store.select(s => s.historyTab.historyCards)
      .subscribe(historyCards => this.dataSource = new MatTableDataSource(historyCards));

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

  // TODO remove after UI mock is not needed anymore
  ngOnInit(): void {
    this.actionsSubject.next(new UpdateHistoryCardsAction([], []));
  }
}
