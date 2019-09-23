import { Action } from '@ngrx/store';

export enum HistoryTabActionTypes {
  FilterValueChanged = '[History Tab] Filter Value Changed',
  Filter = '[History Tab] Filter',
  ClearFilter = '[History Tab] Clear Filter',
}

export class FilterValueChangedAction implements Action {
  readonly type = HistoryTabActionTypes.FilterValueChanged;

  constructor(
    public filterValue: string,
  ) { }
}

export class FilterAction implements Action {
  readonly type = HistoryTabActionTypes.Filter;

  constructor(
    public filterValue: string,
  ) { }
}

export class ClearFilterAction implements Action {
  readonly type = HistoryTabActionTypes.ClearFilter;
}

export type HistoryTabActions =
  | FilterValueChangedAction
  | FilterAction
  | ClearFilterAction
  ;
