import { Action } from '@ngrx/store';

import { DecksTabDto, SortDeckColumnOrder } from './decks-tab.state';

export enum DecksTabActionTypes {
  Initialize = '[Decks Tab] Initialize',
  SortDeckColumns = '[Decks Tab] Sort Deck Columns',
}

export class InitializeDecksTabAction implements Action {
  readonly type = DecksTabActionTypes.Initialize;

  constructor(
    public dto: DecksTabDto,
  ) { }
}

export class SortDeckColumnsAction implements Action {
  readonly type = DecksTabActionTypes.SortDeckColumns;

  constructor(
    public sortDeckColumnOrder: SortDeckColumnOrder,
  ) { }
}

export type DecksTabActions =
  | InitializeDecksTabAction
  | SortDeckColumnsAction
  ;
