import { Action } from '@ngrx/store';

import { MissingCardsPageDto, SortDeckColumnOrder } from './missing-cards.state';

export enum MissingCardsActionTypes {
  Load = '[Missing Cards] Load',
  Initialized = '[Missing Cards] Initialized',
  LoadError = '[Missing Cards] Load Error',
  SortDeckColumns = '[Missing Cards] Sort Deck Columns',
}

export class LoadMissingCardsPageAction implements Action {
  readonly type = MissingCardsActionTypes.Load;
}

export class InitializedMissingCardsPageAction implements Action {
  readonly type = MissingCardsActionTypes.Initialized;

  constructor(
    public dto: MissingCardsPageDto,
  ) { }
}

export class LoadMissingCardsPageErrorAction implements Action {
  readonly type = MissingCardsActionTypes.LoadError;
}

export class SortDeckColumnsAction implements Action {
  readonly type = MissingCardsActionTypes.SortDeckColumns;

  constructor(
    public sortDeckColumnOrder: SortDeckColumnOrder,
  ) { }
}

export type MissingCardsActions =
  | LoadMissingCardsPageAction
  | InitializedMissingCardsPageAction
  | LoadMissingCardsPageErrorAction
  | SortDeckColumnsAction
  ;
