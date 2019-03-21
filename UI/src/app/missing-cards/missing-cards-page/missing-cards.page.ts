import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatButtonToggleChange } from '@angular/material';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { percentageToHsl } from '../../util/colors';
import { makeInternalApiUrl } from '../../util/http';
import { LoadMissingCardsPageAction, SortDeckColumnsAction } from './missing-cards.actions';
import { MissingCardsPageState, PlayerDeckState, MissingCardsFeatureState, CollectionCardState, DeckCardState, SortDeckColumnOrder } from './missing-cards.state';
import { isNumber } from 'util';

@Component({
  templateUrl: './missing-cards.page.html',
  styleUrls: ['./missing-cards.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissingCardsPageComponent implements OnInit, OnDestroy {
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

  protected eventSource: EventSource;
  protected isSseSubscribed: boolean;

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

      this.deckColumns = s.playerDecks.map(d => d.name);
      this.deckColumnsSubHeaders = s.playerDecks.map(d => `${d.name}-subheader`);

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
    this.subscribeToServerSentEvents();
  }

  ngOnDestroy() {
    this.unsubscribeFromServerSentEvents();
  }

  initializePage() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applyFilter();
  }

  subscribeToServerSentEvents() {
    if (!this.isSseSubscribed) {
      this.eventSource = new EventSource(makeInternalApiUrl('sse-missingcards'));
      this.eventSource.onopen = (evt) => this.onEventSourceOpen(evt);
      this.eventSource.onmessage = (data) => this.onEventSourceMessage(data);
      this.eventSource.onerror = (evt) => this.onEventSourceError(evt);

      this.isSseSubscribed = true;
    }
  }

  unsubscribeFromServerSentEvents(): void {
    if (this.isSseSubscribed) {
      this.eventSource.close();
      this.isSseSubscribed = false;
    }
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
        case 4: return 'mythic';
        case 3: return 'rare';
        case 2: return 'uncommon';
        case 1: return 'common';
        case 0: return 'basic';
      }
    }
    return 'n/a';
  }

  getRequiredCount(collectionCard: CollectionCardState, playerDeck: PlayerDeckState): string {
    if (!_.includes(playerDeck.cards.map(c => c.mtgaId), collectionCard.mtgaId)) {
      return '';
    }
    const deckCard = playerDeck.cards.find(c => c.mtgaId === collectionCard.mtgaId);
    const ownedCount = collectionCard.ownedCount > deckCard.requiredCount ? deckCard.requiredCount : collectionCard.ownedCount;
    return `${ownedCount} / ${deckCard.requiredCount}`;
  }

  getProgressColor(deck: PlayerDeckState): string {
    const progressPercentage = deck.totalOwnedCards / deck.totalDeckCards;
    const redHue = 0;
    const greenHue = 120;

    const hsl = percentageToHsl(progressPercentage, redHue, greenHue, 100, 50);

    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  }

  protected onEventSourceOpen(message: MessageEvent) {
    console.log('SSE connection established');
  }

  protected onEventSourceMessage(message: MessageEvent): void {
    console.log('SSE connection message:', message.data);

    this.actionsSubject.next(new LoadMissingCardsPageAction());
  }

  protected onEventSourceError(message: MessageEvent): void {
    console.log('SSE connection error:', message);
    if (message.eventPhase === this.eventSource.CLOSED) {
      this.eventSource.close();
      console.log('SSE connection closed.');
    }
  }
}
