import { Action } from '@ngrx/store';

export enum HistoryTabActionTypes {
  UpdateTimestampPrettyPrint = '[History Tab] Update Timestamp Pretty Print',
}

export class UpdateTimestampPrettyPrintAction implements Action {
  readonly type = HistoryTabActionTypes.UpdateTimestampPrettyPrint;

  constructor(
    public date: Date,
  ) { }
}

export type HistoryTabActions =
  | UpdateTimestampPrettyPrintAction
  ;
