import { Action } from '@ngrx/store';
import { HistoryTabDto, HistoryCardDto } from './history-tab.state';

export enum HistoryTabActionTypes {
  Initialize = '[History Tab] Initialize',
  FilterValueChanged = '[History Tab] Filter Value Changed',
  Filter = '[History Tab] Filter',
  ClearFilter = '[History Tab] Clear Filter',
  ResetBadgeCount = '[History Tab] Reset Badge Count',
}

export class InitializeHistoryTabAction implements Action {
  readonly type = HistoryTabActionTypes.Initialize;

  constructor(
    public dto: HistoryTabDto,
  ) { }
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

export class ResetBadgeCountAction implements Action {
  readonly type = HistoryTabActionTypes.ResetBadgeCount;
}

export type HistoryTabActions =
  | InitializeHistoryTabAction
  | FilterValueChangedAction
  | FilterAction
  | ClearFilterAction
  | ResetBadgeCountAction
  ;

export enum HistoryCardActionTypes {
  Initialize = '[History Card] Initialize',
  UpdateTimeAgo = '[History Card] Update Time Ago',
}

export class InitializeHistoryCardAction implements Action {
  readonly type = HistoryCardActionTypes.Initialize;

  constructor(
    public dto: HistoryCardDto,
  ) { }
}

export class UpdateTimeAgoAction implements Action {
  readonly type = HistoryCardActionTypes.UpdateTimeAgo;

  constructor(
    public timeStamp: number,
  ) { }
}

export type HistoryCardActions =
  | InitializeHistoryCardAction
  | UpdateTimeAgoAction
  ;
