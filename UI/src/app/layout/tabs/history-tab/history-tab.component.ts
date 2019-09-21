import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Observable, merge } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

import { Rarity } from '../../../domain.state';
import { getRarityClass } from '../../../domain.utils';

import { HistoryTabState, State, HistoryCardState } from './history-tab.state';
import { UpdateTimestampPrettyPrintAction } from './history-tab.actions';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTabComponent {
  state$: Observable<HistoryTabState>;

  displayedColumns: string[] = ['name', 'setCode', 'ownedCount', 'missingCount', 'requiringDeckNames', 'timeStamp'];
  dataSource$: Observable<HistoryCardState[]>;

  soundEffect: any;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
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

  }

  getRarityColorClass(rarity: Rarity): string {
    return getRarityClass(rarity);
  }
}
