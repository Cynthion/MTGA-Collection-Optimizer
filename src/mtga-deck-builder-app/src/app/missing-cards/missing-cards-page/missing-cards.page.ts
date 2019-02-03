import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MissingCardsPageState, RootState, CardDto, CardState } from './missing-cards.state';

const CARD_DATA: CardState[] = [
  {rarity: 1, name: 'Card 1', multiverseId: 1, setCode: 'GRN', quantity: 1},
  {rarity: 1, name: 'Card 2', multiverseId: 2, setCode: 'DOR', quantity: 2},
  {rarity: 2, name: 'Card 3', multiverseId: 3, setCode: 'M19', quantity: 3},
  {rarity: 3, name: 'Card 4', multiverseId: 4, setCode: 'RNA', quantity: 4},
  {rarity: 0, name: 'Card 5', multiverseId: 5, setCode: 'GRN', quantity: 1},

];

@Component({
  templateUrl: './missing-cards.page.html',
  styleUrls: ['./missing-cards.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissingCardsPageComponent {
  state$: Observable<MissingCardsPageState>;

  // deckColums: string[] = ['Aristocrates'];
  stickyColumns: string[] = ['name'];
  flexColumns: string[] = ['rarity', 'setCode', 'quantity'];
  columnsToDisplay: string[] = this.stickyColumns.slice().concat(this.flexColumns.slice());
  dataSource: MatTableDataSource<CardState>;

  constructor(
      private store: Store<RootState>,
      private actionsSubject: ActionsSubject,
    ) {
    this.state$ = store.select(s => s.missingCardsPage);

    this.state$.subscribe(s => this.dataSource = new MatTableDataSource(s.playerCards));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
