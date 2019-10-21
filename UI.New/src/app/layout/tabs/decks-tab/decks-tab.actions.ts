import { Action } from '@ngrx/store';

import { SortDeckColumnOrder } from './decks-tab.state';

export enum DecksTabActionTypes {
  SortDeckColumns = '[Decks Tab] Sort Deck Columns',
  FilterValueChanged = '[Decks Tab] Filter Value Changed',
  Filter = '[Decks Tab] Filter',
  ClearFilter = '[Decks Tab] Clear Filter',
}

export class SortDeckColumnsAction implements Action {
  readonly type = DecksTabActionTypes.SortDeckColumns;

  constructor(
    public sortDeckColumnOrder: SortDeckColumnOrder,
  ) { }
}

export class FilterValueChangedAction implements Action {
  readonly type = DecksTabActionTypes.FilterValueChanged;

  constructor(
    public filterValue: string,
  ) { }
}

export class FilterAction implements Action {
  readonly type = DecksTabActionTypes.Filter;

  constructor(
    public filterValue: string,
  ) { }
}

export class ClearFilterAction implements Action {
  readonly type = DecksTabActionTypes.ClearFilter;
}

export type DecksTabActions =
  | SortDeckColumnsAction
  | FilterValueChangedAction
  | FilterAction
  | ClearFilterAction
  ;
