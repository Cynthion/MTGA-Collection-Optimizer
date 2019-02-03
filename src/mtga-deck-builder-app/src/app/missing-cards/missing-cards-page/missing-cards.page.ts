import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { MissingCardsPageState, RootState, CardState, PlayerDeckState } from './missing-cards.state';

@Component({
  templateUrl: './missing-cards.page.html',
  styleUrls: ['./missing-cards.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissingCardsPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  state$: Observable<MissingCardsPageState>;

  stickyColum = 'name';
  flexColumns: string[] = ['setCode', 'quantity'];
  deckColumns: string[] = [];
  columnsToDisplay: string[];
  dataSource: MatTableDataSource<CardState>;
  playerDecks: PlayerDeckState[];

  constructor(
      private store: Store<RootState>,
      private actionsSubject: ActionsSubject,
    ) {
    this.state$ = store.select(s => s.missingCardsPage);

    this.state$.subscribe(s => {
      this.dataSource = new MatTableDataSource(s.allCards);
      this.playerDecks = s.playerDecks;

      this.deckColumns = s.playerDecks.map(d => d.name);
      this.columnsToDisplay = [this.stickyColum].concat(this.flexColumns).concat(this.deckColumns);
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getColumnName(columnName: string): string {
    switch (columnName) {
      case 'name': return 'Card Name (Owned & Missing)';
      case 'setCode': return 'Set';
      case 'quantity': return 'Quantity Owned';
    }
  }

  getRarityClass(columnName: string, card: CardState): string {
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

  getDeckCardCount(deck: PlayerDeckState, cardMultiverseId: number) {
    return _.includes(deck.cards.map(c => c.multiverseId), cardMultiverseId)
      ? deck.cards.filter(c => c.multiverseId === cardMultiverseId)[0].quantity
      : '';
  }
}
