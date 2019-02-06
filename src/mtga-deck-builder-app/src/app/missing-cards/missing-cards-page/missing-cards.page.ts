import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { MissingCardsPageState, PlayerDeckState, MissingCardsFeatureState, CollectionCardState } from './missing-cards.state';

@Component({
  templateUrl: './missing-cards.page.html',
  styleUrls: ['./missing-cards.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissingCardsPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  state$: Observable<MissingCardsPageState>;

  stickyColum: keyof CollectionCardState = 'name';
  flexColumns: (keyof CollectionCardState)[] = ['setCode', 'ownedCount', 'missingCount'];
  deckColumns: string[] = [];
  columnsToDisplay: string[];

  dataSource: MatTableDataSource<CollectionCardState>;
  playerDecks: PlayerDeckState[];

  constructor(
      private store: Store<MissingCardsFeatureState>,
      private actionsSubject: ActionsSubject,
    ) {
    this.state$ = store.select(s => s.missingCardsPage);

    this.state$.subscribe(s => {
      this.dataSource = new MatTableDataSource(s.collectionCards);
      this.playerDecks = s.playerDecks;

      this.deckColumns = s.playerDecks.map(d => d.name);
      this.columnsToDisplay = [this.stickyColum.toString()].concat(this.flexColumns).concat(this.deckColumns);
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

  getRequiredCount(deck: PlayerDeckState, multiverseId: number) {
    return _.includes(deck.cards.map(c => c.multiverseId), multiverseId)
      ? deck.cards.find(c => c.multiverseId === multiverseId).requiredCount
      : '';
  }
}
