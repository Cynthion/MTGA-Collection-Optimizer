import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { percentageToHsl } from '../../util/colors';
import { makeInternalApiUrl } from '../../util/http';
import { LoadMissingCardsPageAction } from './missing-cards.actions';
import { MissingCardsPageState, PlayerDeckState, MissingCardsFeatureState, CollectionCardState } from './missing-cards.state';
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

  filterValue: string;
  stickyColum: keyof CollectionCardState = 'name';
  flexColumns: (keyof CollectionCardState)[] = ['setCode', 'ownedCount', 'missingCount'];
  deckColumns: string[] = [];
  columnsToDisplay: string[];
  subHeadersToDisplay: string[];

  dataSource: MatTableDataSource<CollectionCardState>;
  playerDecks: PlayerDeckState[];

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
      this.columnsToDisplay = [this.stickyColum.toString()].concat(this.flexColumns).concat(this.deckColumns);
      this.subHeadersToDisplay = []; // TODO initialize

      this.initializePage();
    });

    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
      let value: any = data[sortHeaderId];

      // handle deck columns specially
      if (!value) {
        value = data['requiredCount'] || 0;
      }

      const result = isNumber(value) ? Number(value) : value;
      // console.log(sortHeaderId, data);
      // console.log(value, isNumber(value), result);
      return result;
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

  getColumnName(columnName: keyof CollectionCardState): string {
    switch (columnName) {
      case 'name': return 'Card Name (Owned & Missing)';
      case 'setCode': return 'Set';
      case 'ownedCount': return 'Owned';
      case 'missingCount': return 'Missing';
    }
    return 'n/a';
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

  getRequiredCount(deck: PlayerDeckState, mtgaId: number): number {
    return _.includes(deck.cards.map(c => c.mtgaId), mtgaId)
      ? deck.cards.find(c => c!.mtgaId === mtgaId).requiredCount
      : 0;
  }

  getProgressColor(deck: PlayerDeckState): string {
    const progressPercentage = deck.totalOwnedCards / deck.totalDeckCards;
    const redHue = 0;
    const greenHue = 120;

    const hsl = percentageToHsl(progressPercentage, redHue, greenHue, 100, 40);

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
