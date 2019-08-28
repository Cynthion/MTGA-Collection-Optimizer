import { Action } from '@ngrx/store';
import { LayoutDto } from './layout.state';

export enum LayoutActionTypes {
  LoadData = '[Layout] Load Data',
  Initialize = '[Layout] Initialize',
  CalculateCollectionCards = '[Layout] Calculate Collection Cards',
  CalculateDeckCompleteness = '[Layout] Calculate Deck Completeness',
}

export class LoadDataAction implements Action {
  readonly type = LayoutActionTypes.LoadData;
}

export class InitializeLayoutAction implements Action {
  readonly type = LayoutActionTypes.Initialize;

  constructor (
    public dto: LayoutDto
  ) { }
}

export class CalculateCollectionCardsAction implements Action {
  readonly type = LayoutActionTypes.CalculateCollectionCards;
}

export class CalculateDeckCompletenessAction implements Action {
  readonly type = LayoutActionTypes.CalculateDeckCompleteness;
}

export type LayoutActions =
  | LoadDataAction
  | InitializeLayoutAction
  | CalculateCollectionCardsAction
  | CalculateDeckCompletenessAction
  ;
