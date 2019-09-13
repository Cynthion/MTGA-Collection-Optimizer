import { ChangeDetectionStrategy, Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Observable, Subscription, merge, interval } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

import { Rarity } from '../../../domain.state';
import { getRarityClass } from '../../../domain.utils';

import { HistoryTabState, State, HistoryCardState, DeckRequirement } from './history-tab.state';
import { UpdateTimestampPrettyPrintAction } from './history-tab.actions';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTabComponent implements OnDestroy {
  state$: Observable<HistoryTabState>;

  displayedColumns: string[] = ['name', 'setCode', 'ownedCount', 'missingCount', 'requiringDeckNames', 'timeStamp'];
  dataSource$: Observable<HistoryCardState[]>;

  timeSubscription: Subscription;
  historyChangedSubscription: Subscription;
  soundEffect: any;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.state$ = this.store.pipe(select(s => s.historyTab));
    this.dataSource$ = this.store.pipe(select(s => s.historyTab.historyCards));

    // TODO make side effect
    // this.soundEffect = new Audio();
    // this.soundEffect.src = 'assets/sound/newCard.mp3';
    // this.soundEffect.load();
    // this.soundEffect.play();

    const historyRelevantDataChanged$ = merge(
      this.store.select(s => s.layout.collectionCardsOwnedCountTotal),
      this.store.select(s => s.layout.collectionCardsRequiredCountTotal),
    );

    this.historyChangedSubscription = historyRelevantDataChanged$
      .pipe(
        withLatestFrom(this.store.select(s => s.layout)),
      )
      .subscribe(([, layout]) => {
        // this.actionsSubject.next(new UpdateHistoryCardsAction(layout.collectionCards, layout.playerDecks));
        this.actionsSubject.next(new UpdateTimestampPrettyPrintAction(new Date()));
        this.changeDetector.markForCheck();
      });

    this.timeSubscription = interval(10000).subscribe(val => {
      this.actionsSubject.next(new UpdateTimestampPrettyPrintAction(new Date()));
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.historyChangedSubscription.unsubscribe();
    this.timeSubscription.unsubscribe();
  }

  getRarityColorClass(rarity: Rarity): string {
    return getRarityClass(rarity);
  }

  // getOwnedOfRequired(deckRequirement: DeckRequirement): string {
  //   return getOwnedOfRequired(deckRequirement.ownedCount, deckRequirement.requiredCount);
  // }

  trackTableItem(index: number, item: HistoryCardState) {
    return !!item ? item.mtgaId + item.timeStamp.toString() : 0;
  }
}
