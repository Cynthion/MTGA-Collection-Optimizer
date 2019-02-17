import { ChangeDetectionStrategy, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import * as _ from 'lodash';

import { MissingCardsPageState, PlayerDeckState, MissingCardsFeatureState, CollectionCardState, PlayerCardDto } from './missing-cards.state';
import { LoadMissingCardsPageAction } from './missing-cards.actions';
import { delay, repeat, mergeMap, tap } from 'rxjs/operators';
import { makeInternalApiUrl } from 'src/app/util/http';

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

  dataSource: MatTableDataSource<CollectionCardState>;
  playerDecks: PlayerDeckState[];

  pollSubscription: Subscription;
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
    // this.startPollInterval();

    this.onSubscribe()

    // this._httpClient
    //   .get<PlayerCardDto>(makeInternalApiUrl('sse')) // get data
    //   .subscribe(res => this.__onDataLoaded(res));
  }
  
  public onSubscribe(): void
  {
    // handle clicking the subscribe to updates button
    if (!this._subscribed)
    {
      this._eventSource           = new EventSource(makeInternalApiUrl('sse-heartbeat')); // subscribe
      this._eventSource.onopen    = (evt) => this.__onOpen(evt);
      this._eventSource.onmessage = (data) => this.__onMessage(data);
      this._eventSource.onerror   = (evt) => this.__onSseError(evt);

      this._subscribed = true;
    }
  }

  ngOnDestroy() {
    // this.pollSubscription.unsubscribe();
  }

  initializePage() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applyFilter();
  }
  
  applyFilter() {
    if (!!this.filterValue) {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  startPollInterval() {
    // TODO make interval configurable
    const delayInMs = 20000;
    const apiCall = () => of({}).pipe(
      tap(_ => this.actionsSubject.next(new LoadMissingCardsPageAction()))
    );

    const poll = of({}).pipe(
      mergeMap(_ => apiCall()),
      delay(delayInMs),
      repeat(),
    );

    this.pollSubscription = poll.subscribe();
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

  protected __onOpen(evt: MessageEvent) {
    console.log('on open, CONNECTION ESTABLISHED!');
  }

  protected __onDataLoaded(data: any): void
  {
    // initial data has been loaded; copy to the current price list collection
    console.log('on data loaded, ', data);
  }

  protected __onMessage(message: Object): void
  {
    console.log('on message, ', message);
    
    // // process SSE messages
    // const stock: IStockData = <IStockData> JSON.parse( message['data'] );

    // // find the index corresponding to the stock that was updated
    // const index: number = Utils.findStockIndex(stock, this.priceData);

    // if (index != -1)
    // {
    //   // mutate the price data; note that EventSource does not work through XHR, so there is nothing to triggers a
    //   // CD cycle in Angular upon processing the message
    //   let newData: Array<IStockData> = this.priceData.slice();

    //   newData[index] = stock;

    //   // the reference has to change to fire the display component's onChanges handler; the array copy is acceptable
    //   // since a list of observed stock prices is almost always very small.  There is another way to handle this which
    //   // will be illustrated in a future demo.
    //   this.priceData = newData;

    //   this._chgDetectorRef.detectChanges();
    // }
    // else
    // {
    //   // enhance error-handling as you see fit
    //   console.log('Update provided for non-existing stock: ', stock );
    // }
  }
  
  protected __onSseError(e: any): void
  {
    // modify event handling as you see fit
    console.log( "SSE Event failure: ", e );
  }
}
