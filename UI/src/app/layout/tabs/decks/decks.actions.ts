import { Action } from '@ngrx/store';

import { DecksDto, SortDeckColumnOrder } from './decks.state';

export enum DecksActionTypes {
  Initialized = '[Decks] Initialized',
  SortDeckColumns = '[Decks] Sort Deck Columns',
}

export class InitializedDecksAction implements Action {
  readonly type = DecksActionTypes.Initialized;

  constructor(
    public dto: DecksDto,
  ) { }
}

export class SortDeckColumnsAction implements Action {
  readonly type = DecksActionTypes.SortDeckColumns;

  constructor(
    public sortDeckColumnOrder: SortDeckColumnOrder,
  ) { }
}

export type DecksActions =
  | InitializedDecksAction
  | SortDeckColumnsAction
  ;
