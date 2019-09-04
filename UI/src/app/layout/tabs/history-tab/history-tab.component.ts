import { ChangeDetectionStrategy, Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, Subscription, merge, interval } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

import { Rarity } from '../../../domain.state';
import { getRarityClass, getOwnedOfRequired } from '../../../domain.utils';

import { HistoryTabState, State, HistoryCardState, DeckRequirement } from './history-tab.state';
import { UpdateHistoryCardsAction, UpdateTimestampPrettyPrintAction } from './history-tab.actions';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTabComponent implements OnDestroy {
  state$: Observable<HistoryTabState>;

  displayedColumns: string[] = ['name', 'setCode', 'ownedCount', 'missingCount', 'requiringDeckNames', 'timeStamp'];
  dataSource: HistoryCardState[] = [];

  timeSubscription: Subscription;
  soundEffect: any;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.state$ = this.store.select(s => s.historyTab);

    this.soundEffect = new Audio();
    this.soundEffect.src = 'assets/sound/newCard.mp3';
    this.soundEffect.load();

    // TODO define better workflow for all of this --> make state updates straigt forward
    this.store.select(s => s.historyTab.historyCards)
      .subscribe(historyCards => {
        this.dataSource = historyCards;
        this.actionsSubject.next(new UpdateTimestampPrettyPrintAction(new Date()));
        this.changeDetector.markForCheck();
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
        this.actionsSubject.next(new UpdateTimestampPrettyPrintAction(new Date()));
        this.changeDetector.markForCheck();
        this.soundEffect.play();
      });

    this.timeSubscription = interval(10000).subscribe(val => {
      this.actionsSubject.next(new UpdateTimestampPrettyPrintAction(new Date()));
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

  getRarityColorClass(rarity: Rarity): string {
    return getRarityClass(rarity);
  }

  getOwnedOfRequired(deckRequirement: DeckRequirement): string {
    return getOwnedOfRequired(deckRequirement.ownedCount, deckRequirement.requiredCount);
  }

  trackTableItem(index: number, item: HistoryCardState) {
    return !!item ? item.mtgaId + item.timeStamp.toString() : 0;
  }
}
