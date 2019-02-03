import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MissingCardsPageState, RootState, CardState } from './missing-cards.state';

@Component({
  templateUrl: './missing-cards.page.html',
  styleUrls: ['./missing-cards.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissingCardsPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  state$: Observable<MissingCardsPageState>;

  stickyColumns: string[] = ['name'];
  flexColumns: string[] = ['setCode', 'quantity'];
  deckColums: string[] = ['Aristocrates'];
  columnsToDisplay: string[] = this.stickyColumns.concat(this.flexColumns);
  dataSource: MatTableDataSource<CardState>;

  constructor(
      private store: Store<RootState>,
      private actionsSubject: ActionsSubject,
    ) {
    this.state$ = store.select(s => s.missingCardsPage);

    this.state$.subscribe(s => this.dataSource = new MatTableDataSource(s.playerCards));
    // this.state$.subscribe(s => this.stickyColumns)
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
      case 'name': return 'Card Name';
      case 'setCode': return 'Set';
      case 'quantity': return 'Quantity';
    }
  }

  getRarityClass(columnName: string, card: CardState): string {
    if (columnName === 'name') {
      switch (card.rarity) {
        case 3: return 'mythic';
        case 2: return 'rare';
        case 1: return 'uncommon';
        case 0: return 'common';
      }
    }
  }
}
