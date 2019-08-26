import { Action } from '@ngrx/store';

export enum HistoryTabActionTypes {
  NewCardAdded = '[History Tab] New Card Added',
}

export class NewCardAddedAction implements Action {
  readonly type = HistoryTabActionTypes.NewCardAdded;
}

export type HistoryTabActions =
  | NewCardAddedAction
  ;
