import { Action } from '@ngrx/store';

import { SortDeckColumnOrder } from './decks-tab.state';

export enum DecksTabActionTypes {
  SortDeckColumns = '[Decks Tab] Sort Deck Columns',
}

export class SortDeckColumnsAction implements Action {
  readonly type = DecksTabActionTypes.SortDeckColumns;

  constructor(
    public sortDeckColumnOrder: SortDeckColumnOrder,
  ) { }
}

export type DecksTabActions =
  | SortDeckColumnsAction
  ;
