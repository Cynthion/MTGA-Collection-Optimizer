import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import * as _ from 'lodash';

import { MissingCardsPageState, PlayerDeckState, MissingCardsFeatureState, CollectionCardState } from './missing-cards.state';
import { makeInternalApiUrl } from 'src/app/util/http';

@Component({
  templateUrl: './missing-cards.page.html',
  styleUrls: ['./missing-cards.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissingCardsPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  featureState$: Observable<MissingCardsFeatureState>;
  pageState$: Observable<MissingCardsPageState>;

  filterValue: string;
  stickyColum: keyof CollectionCardState = 'name';
  flexColumns: (keyof CollectionCardState)[] = ['setCode', 'ownedCount', 'missingCount'];
  deckColumns: string[] = [];
  columnsToDisplay: string[];

  dataSource: MatTableDataSource<CollectionCardState>;
  playerDecks: PlayerDeckState[];

  protected _eventSource: EventSource;
  protected _subscribed: boolean = false;

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

      this.initializePage();
    });
  }

  ngOnInit() {
    this.initializePage();
    this.subscribeToServerSentEvents();
  }
  
  initializePage() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applyFilter();
  }
  
  public subscribeToServerSentEvents(): void
  {
    if (!this._subscribed)
    {
      this._eventSource = new EventSource(makeInternalApiUrl('sse-heartbeat')); // subscribe
      this._eventSource.onopen = (evt) => this.onEventSourceOpen(evt);
      this._eventSource.onmessage = (data) => this.onEventSourceMessage(data);
      this._eventSource.onerror = (evt) => this.onEventSourceError(evt);

      this._subscribed = true;
    }
  }

  applyFilter() {
    if (!!this.filterValue) {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  clearFilter() {
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
  }

  getRequiredCount(deck: PlayerDeckState, mtgaId: number) {
    return _.includes(deck.cards.map(c => c.mtgaId), mtgaId)
      ? deck.cards.find(c => c.mtgaId === mtgaId).requiredCount
      : '';
  }

  protected onEventSourceOpen(message: MessageEvent) {
    console.log('CONNECTION ESTABLISHED!');
  }

  protected onEventSourceMessage(message: MessageEvent): void
  {
    console.log('on message, ', message);
  }
  
  protected onEventSourceError(message: MessageEvent): void
  {
    console.log( "SSE Event failure: ", message);
    if (event.eventPhase == this._eventSource.CLOSED) {
      this._eventSource.close();
      console.log( "CONNECTION CLOSED!");
    }
  }
}
