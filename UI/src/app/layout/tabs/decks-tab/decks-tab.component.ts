import { ChangeDetectionStrategy, Component, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatButtonToggleChange } from '@angular/material';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';
import { isNumber } from 'util';
import * as _ from 'lodash';

import { Rarity } from '../../../domain.state';
import { getRarityClass } from '../../../domain.utils';
import { percentageToHsl } from '../../../util/colors';
import { CollectionCardState, PlayerDeckState } from '../../layout.state';

import { DecksTabState, State, SortDeckColumnOrder } from './decks-tab.state';
import { SortDeckColumnsAction, FilterCollectionCardsAction, ClearFilterAction } from './decks-tab.actions';

@Component({
  selector: 'app-decks-tab',
  templateUrl: './decks-tab.component.html',
  styleUrls: ['./decks-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecksTabComponent implements OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  state$: Observable<DecksTabState>;

  stickyColumn = 'name';
  stickyColumnSubHeader = 'sticky-subheader';
  flexColumns: string[] = ['set', 'ownedCount', 'missingCount'];
  flexColumnsSubHeaders = ['flex-subheader', 'flex-subheader', 'flex-subheader'];
  deckColumns: string[] = [];
  deckColumnsSubHeaders: string[] = [];

  displayedColumns: string[];
  displayedColumnsSubHeaders: string[];

  filterValue: string;

  dataSource$: Observable<MatTableDataSource<CollectionCardState>>;
  decks$: Observable<PlayerDeckState[]>;

  sortColumnSubscription: Subscription;
  filterSubscription: Subscription;
  dataSourceSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
  ) {
    this.state$ = this.store.pipe(select(s => s.decksTab));

    this.sortColumnSubscription = this.store.pipe(
      select(s => s.layout.decks),
    ).subscribe(decks => {
      console.log('new columns');
      this.deckColumns = decks.map(d => d.name);
      this.deckColumnsSubHeaders = decks.map(d => `${d.name}-subheader`);

      this.displayedColumns = [this.stickyColumn.toString()].concat(this.flexColumns).concat(this.deckColumns);
      this.displayedColumnsSubHeaders = [this.stickyColumnSubHeader.toString()].concat(this.flexColumnsSubHeaders).concat(this.deckColumnsSubHeaders);
    });

    this.dataSource$ = this.store.pipe(
      select(s => s.layout.collectionCards),
      map(ccs => {
        const dataSource = new MatTableDataSource(ccs);
        dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
          const value: any = data[sortHeaderId];

          // // if sortHeaderId is not a data property, then its a deck name
          // if (value === undefined) {
          //   const deckToBeSorted = this.playerDecks.find(d => d.name === sortHeaderId);
          //   // only sort if deckToBeSorted still exists (might be deleted)
          //   if (deckToBeSorted !== undefined) {
          //     const deckCardIds = deckToBeSorted.cards.map(c => c.mtgaId);
          //     const card: CollectionCardState = data as CollectionCardState;
          //     value = _.includes(deckCardIds, card.mtgaId)
          //       ? card.data.rarity
          //       : Rarity.Unknown;
          //   }
          // }

          return isNumber(value) ? Number(value) : value;
        };

        dataSource.paginator = this.paginator;
        dataSource.sort = this.sort;

        return dataSource;
      }),
    );

    this.filterSubscription = this.store.pipe(
      select(s => s.decksTab.filterValue),
      withLatestFrom(this.dataSource$),
    ).subscribe(([f, d]) => {
      console.log('filtering:', f);
      d.filter = f;
      this.filterValue = f;

      if (d.paginator !== undefined) {
        d.paginator.firstPage();
      }
    });

    this.decks$ = this.store.pipe(select(s => s.layout.decks));
  }

  ngOnDestroy() {
    this.sortColumnSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.dataSourceSubscription.unsubscribe();
  }

  applyFilter(filterValue: string): void {
    if (!!filterValue) {
      this.actionsSubject.next(new FilterCollectionCardsAction(filterValue.trim().toLowerCase()));
    } else {
      this.clearFilter();
    }
  }

  clearFilter(): void {
    this.actionsSubject.next(new ClearFilterAction());
  }

  onColumnSortValueChange(change: MatButtonToggleChange): void {
    const newValue = change.value;

    if (newValue === 'Alphabetical') {
      this.actionsSubject.next(new SortDeckColumnsAction(SortDeckColumnOrder.Alphabetical));
    } else if (newValue === 'Completeness') {
      this.actionsSubject.next(new SortDeckColumnsAction(SortDeckColumnOrder.Completeness));
    } else if (newValue === 'Incompleteness') {
      this.actionsSubject.next(new SortDeckColumnsAction(SortDeckColumnOrder.Incompleteness));
    }
  }

  getColumnName(columnName: string): string {
    switch (columnName) {
      case 'name': return 'Card Name';
      case 'set': return 'Set';
      case 'ownedCount': return 'Owned';
      case 'missingCount': return 'Missing';
    }
    return 'n/a';
  }

  getDeckSubheaderName(playerDeck: PlayerDeckState): string {
    return `${playerDeck.name}-subheader`;
  }

  getRarityColorClass(rarity: Rarity): string {
    return getRarityClass(rarity);
  }

  // getOwnedOfRequired(collectionCard: CollectionCardState, playerDeck: PlayerDeckState): string {
  //   if (!_.includes(playerDeck.cards.map(c => c.mtgaId), collectionCard.mtgaId)) {
  //     return '';
  //   }

  //   const deckCard = playerDeck.cards.find(c => c.mtgaId === collectionCard.mtgaId);

  //   return getOwnedOfRequired(collectionCard.ownedCount, deckCard.requiredCount);
  // }

  getProgressColor(deck: PlayerDeckState): string {
    const redHue = 0;
    const greenHue = 120;

    const hsl = percentageToHsl(deck.completeness, redHue, greenHue, 100, 50);

    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  }

  trackDeck(index: number, item: PlayerDeckState) {
    return item.id;
  }
}
