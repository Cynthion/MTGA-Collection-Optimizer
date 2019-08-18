import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatButtonToggleChange } from '@angular/material';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { percentageToHsl } from '../../../util/colors';


import { isNumber } from 'util';

@Component({
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecksTabComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  featureState$: Observable<MissingCardsFeatureState>;
  pageState$: Observable<MissingCardsPageState>;

  stickyColumn: keyof CollectionCardState = 'name';
  stickyColumnSubHeader = 'sticky-subheader';
  flexColumns: (keyof CollectionCardState)[] = ['setCode', 'ownedCount', 'missingCount'];
  flexColumnsSubHeaders = ['flex-subheader', 'flex-subheader', 'flex-subheader'];
  deckColumns: string[] = [];
  deckColumnsSubHeaders: string[] = [];

  displayedColumns: string[];
  displayedColumnsSubHeaders: string[];

  dataSource: MatTableDataSource<CollectionCardState>;
  playerDecks: PlayerDeckState[];
  filterValue: string;

  constructor(
    private store: Store<MissingCardsFeatureState>,
    private actionsSubject: ActionsSubject,
    protected _httpClient: HttpClient,
  ) {
    this.featureState$ = store.select(s => s);
    this.pageState$ = store.select(s => s.missingCardsPage);

    this.pageState$.subscribe(s => {
      this.dataSource = new MatTableDataSource(s.collectionCards);
      this.playerDecks = s.playerDecks;

      if (s.sortDeckColumnOrder === SortDeckColumnOrder.Alphabetical) {
        this.playerDecks = _.orderBy(this.playerDecks, ['name'], ['asc']);
      }
      if (s.sortDeckColumnOrder === SortDeckColumnOrder.Completeness) {
        this.playerDecks = _.orderBy(this.playerDecks, ['completeness'], ['desc']);
      }

      this.deckColumns = this.playerDecks.map(d => d.name);
      this.deckColumnsSubHeaders = this.playerDecks.map(d => `${d.name}-subheader`);

      this.displayedColumns = [this.stickyColumn.toString()].concat(this.flexColumns).concat(this.deckColumns);
      this.displayedColumnsSubHeaders = [this.stickyColumnSubHeader.toString()].concat(this.flexColumnsSubHeaders).concat(this.deckColumnsSubHeaders);

      this.initializePage();
    });

    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
      let value: any = data[sortHeaderId];

      // handle ownedCount specially (only available on PlayerCardState)
      if (!value && sortHeaderId === 'ownedCount') {
        value = 0;
      }

      // handle requiredCount specially (only available on DeckCardState)
      if (!value && sortHeaderId !== 'ownedCount' && data['requiredCount']) {
        // only sort within the sorted deck, not over all decks
        const sortedPlayerDeckCardIds = this.playerDecks
          .find(d => d.name === sortHeaderId).cards
          .map(c => c.mtgaId);
        const sortedCardId = data['mtgaId'];
        value = _.includes(sortedPlayerDeckCardIds, sortedCardId)
          ? data['requiredCount'] || 0
          : 0;
      }

      return isNumber(value) ? Number(value) : value;
    };
  }

  ngOnInit() {
    this.initializePage();
  }

  initializePage() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applyFilter();
  }

  applyFilter(): void {
    if (!!this.filterValue) {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  clearFilter(): void {
    this.filterValue = '';
    this.dataSource.filter = '';
  }

  onColumnSortValueChange(change: MatButtonToggleChange): void {
    const newValue = change.value;

    if (newValue === 'Alphabetical') {
      this.actionsSubject.next(new SortDeckColumnsAction(SortDeckColumnOrder.Alphabetical));
    } else if (newValue === 'Completeness') {
      this.actionsSubject.next(new SortDeckColumnsAction(SortDeckColumnOrder.Completeness));
    }
  }

  getColumnName(columnName: keyof CollectionCardState): string {
    switch (columnName) {
      case 'name': return 'Card Name (Owned & Missing)';
      case 'setCode': return 'Set';
      case 'ownedCount': return 'Owned';
      case 'missingCount': return 'Missing';
    }
    return 'n/a';
  }

  getDeckSubheaderName(playerDeck: PlayerDeckState): string {
    return `${playerDeck.name}-subheader`;
  }

  getRarityClass(columnName: keyof CollectionCardState, card: CollectionCardState): string {
    if (columnName === 'name') {
      switch (card.rarity) {
        case Rarity['Mythic Rare']: return 'mythic';
        case Rarity.Rare: return 'rare';
        case Rarity.Uncommon: return 'uncommon';
        case Rarity.Common: return 'common';
        case Rarity.Basic: return 'basic';
      }
    }
    return 'unknown';
  }

  getRequiredCount(collectionCard: CollectionCardState, playerDeck: PlayerDeckState): string {
    if (!_.includes(playerDeck.cards.map(c => c.mtgaId), collectionCard.mtgaId)) {
      return '';
    }
    const deckCard = playerDeck.cards.find(c => c.mtgaId === collectionCard.mtgaId);
    const ownedCount = collectionCard.ownedCount > deckCard.requiredCount
      ? deckCard.requiredCount
      : collectionCard.ownedCount;
    return `${ownedCount} / ${deckCard.requiredCount}`;
  }

  getProgressColor(deck: PlayerDeckState): string {
    const redHue = 0;
    const greenHue = 120;

    const hsl = percentageToHsl(deck.completeness, redHue, greenHue, 100, 50);

    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  }

  trackPlayerDeck(index: number, item: PlayerDeckState) {
    return item.id;
  }
}
