import { Action } from '@ngrx/store';

export enum HistoryTabActionTypes {
  CalculateHistoryDeltas = '[History Tab] Calculate History Deltas',
}

export class CalculateHistoryDeltasAction implements Action {
  readonly type = HistoryTabActionTypes.CalculateHistoryDeltas;

  constructor(
    public playerCardIds: number[]
  ) { }
}

export type HistoryTabActions =
  | CalculateHistoryDeltasAction
  ;
