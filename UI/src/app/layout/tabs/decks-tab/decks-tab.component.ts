import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatButtonToggleChange } from '@angular/material';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { isNumber } from 'util';
import * as _ from 'lodash';

import { Rarity } from '../../../domain.state';
import { getRarityClass, getOwnedOfRequired } from '../../../domain.utils';
import { percentageToHsl } from '../../../util/colors';
import { CollectionCardState, PlayerDeckState, CollectionCardDto } from '../../layout.state';

import { DecksTabState, State, SortDeckColumnOrder } from './decks-tab.state';
import { SortDeckColumnsAction, ClearFilterAction, FilterValueChangedAction } from './decks-tab.actions';

@Component({
  selector: 'app-decks-tab',
  templateUrl: './decks-tab.component.html',
  styleUrls: ['./decks-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecksTabComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  state$: Observable<DecksTabState>;
  dataSource$: Observable<MatTableDataSource<CollectionCardState>>;
  decks$: Observable<PlayerDeckState[]>;
  columns$: Observable<{[key: string]: string[]}>;

  filterValue: string;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
  ) {
    this.state$ = this.store.pipe(select(s => s.decksTab));
    this.decks$ = this.store.pipe(select(s => s.layout.decks));

    const columnsChanged$ = combineLatest(
      this.store.select(s => s.layout.decks),
      this.store.select(s => s.decksTab.sortDeckColumnOrder),
    );

    this.columns$ = columnsChanged$.pipe(
      map(([decks, sortOrder]) => {
        const stickyColumns = ['name'];
        const stickyColumnsSubheaders = stickyColumns.map(sc => 'sticky-subheader');

        const flexColumns = ['set', 'ownedCount', 'missingCount'];
        const flexColumnsSubheaders = flexColumns.map(fc => 'flex-subheader');

        switch (sortOrder) {
          case SortDeckColumnOrder.Alphabetical: {
            decks = _.orderBy(decks, ['name'], ['asc']);
            break;
          }
          case SortDeckColumnOrder.Completeness: {
            decks = _.orderBy(decks, ['completeness'], ['desc']);
            break;
          }
          case SortDeckColumnOrder.Incompleteness: {
            decks = _.orderBy(decks, ['completeness'], ['asc']);
          }
        }

        const deckColumns = decks.map(d => d.name);
        const deckColumnsSubheaders = decks.map(d => this.getDeckSubheaderName(d));

        const displayedColumns = stickyColumns.concat(flexColumns).concat(deckColumns);
        const displayedColumnsSubheaders = stickyColumnsSubheaders.concat(flexColumnsSubheaders).concat(deckColumnsSubheaders);

        const columns: {[key: string]: string[]} = {
          stickyColumns,
          flexColumns,
          displayedColumns,
          displayedColumnsSubheaders,
        };

        return columns;
      }),
    );

    const dataSourceChanged$ = combineLatest(
      this.store.select(s => s.layout.collectionCards),
      this.store.select(s => s.decksTab.filterValue)
    );

    this.dataSource$ = dataSourceChanged$.pipe(
      withLatestFrom(this.decks$),
      map(([[collectionCards, filterValue], decks]) => {
        const dataSource = new MatTableDataSource(collectionCards);
        dataSource.paginator = this.paginator;
        dataSource.sort = this.sort;

        dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
          let value: any = data[sortHeaderId];
          console.log(data);
          console.log(sortHeaderId);

          // if sortHeaderId is not a data property, then its a deck name
          if (value === undefined) {
            const deckToBeSorted = decks.find(d => d.name === sortHeaderId);
            // only sort if deckToBeSorted still exists (might be deleted)
            if (deckToBeSorted !== undefined) {
              const deckCardIds = deckToBeSorted.cards.map(c => c.mtgaId);
              const card: CollectionCardState = data as CollectionCardState;
              value = _.includes(deckCardIds, card.mtgaId)
                ? card.data.rarity
                : Rarity.Unknown;
            }
          }

          return isNumber(value) ? Number(value) : value;
        };

        dataSource.filterPredicate = (data: CollectionCardDto, filter: string): boolean => {
          return data.data.name.trim().toLowerCase().includes(filter);
        };
        dataSource.filter = filterValue;
        this.filterValue = filterValue;

        return dataSource;
      }),
    );
  }

  applyFilter(filterValue: string): void {
    if (!!filterValue) {
      this.actionsSubject.next(new FilterValueChangedAction(filterValue.trim().toLowerCase()));
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

  getColumnData(columnName: string, collectionCard: CollectionCardState): string | number {
    switch (columnName) {
      case 'name': return collectionCard.data.name;
      case 'set': return collectionCard.data.set;
      case 'ownedCount': return collectionCard.ownedCount;
      case 'missingCount': return collectionCard.missingCount;
    }
    return 'n/a';
  }

  getDeckSubheaderName(deck: PlayerDeckState): string {
    return `${deck.name}-subheader`;
  }

  getRarityColorClass(rarity: Rarity): string {
    return getRarityClass(rarity);
  }

  getOwnedOfRequired(collectionCard: CollectionCardState, deck: PlayerDeckState): string {
    const deckCard = deck.cards.find(c => c.mtgaId === collectionCard.mtgaId);

    if (deckCard !== undefined) {
      return getOwnedOfRequired(collectionCard.ownedCount, deckCard.requiredCount);
    }

    return '';
  }

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
