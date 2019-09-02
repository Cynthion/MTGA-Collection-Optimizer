import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, Subscription, merge, interval } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

import { Rarity } from '../../../domain.state';
import { getRarityClass } from '../../../domain.utils';

import { HistoryTabState, State, HistoryCardState } from './history-tab.state';
import { UpdateHistoryCardsAction, UpdateTimestampPrettyPrintAction } from './history-tab.actions';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTabComponent implements OnInit, OnDestroy {
  state$: Observable<HistoryTabState>;

  displayedColumns: string[] = ['name', 'setCode', 'requiringDeckNames', 'timeStamp'];
  dataSource: MatTableDataSource<HistoryCardState>;

  timeSubscription: Subscription;
  soundEffect: any;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.state$ = this.store.select(s => s.historyTab);

    this.store.select(s => s.historyTab.historyCards)
      .subscribe(historyCards => {
        this.dataSource = new MatTableDataSource(historyCards);
      });

    const historyRelevantDataChanged$ = merge(
      this.store.select(s => s.layout.collectionCardsOwnedCountTotal),
      this.store.select(s => s.layout.collectionCardsRequiredCountTotal),
    );

    historyRelevantDataChanged$
      .pipe(
        withLatestFrom(this.store.select(s => s.layout)),
      )
      .subscribe(([, layout]) => {
        this.actionsSubject.next(new UpdateHistoryCardsAction(layout.collectionCards, layout.playerDecks));
        this.changeDetector.markForCheck();
    });

    this.timeSubscription = interval(15000).subscribe(val => {
      this.actionsSubject.next(new UpdateTimestampPrettyPrintAction(new Date()));
      this.changeDetector.markForCheck();
      // this.soundEffect.play();
    });
  }

  ngOnInit(): void {

    this.soundEffect = new Audio();
    this.soundEffect.src = 'assets/sound/newCard.mp3';
    this.soundEffect.load();
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

  getRarityColorClass(rarity: Rarity): string {
    return getRarityClass(rarity);
  }
}
