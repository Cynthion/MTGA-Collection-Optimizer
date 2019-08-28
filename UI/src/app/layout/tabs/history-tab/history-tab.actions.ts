import { Action } from '@ngrx/store';
import { CollectionCardState } from '../../layout.state';
import { PlayerDeckState } from '../../../domain.state';

export enum HistoryTabActionTypes {
  CalculateHistoryDeltas = '[History Tab] Calculate History Deltas',
  UpdateHistoryCards = '[History Tab] Update History Cards',
}

export class CalculateHistoryDeltasAction implements Action {
  readonly type = HistoryTabActionTypes.CalculateHistoryDeltas;

  constructor(
    public playerCardIds: number[]
  ) { }
}

export class UpdateHistoryCardsAction implements Action {
  readonly type = HistoryTabActionTypes.UpdateHistoryCards;

  constructor(
    public collectionCards: CollectionCardState[],
    public playerDecks: PlayerDeckState[],
  ) { }
}

export type HistoryTabActions =
  | CalculateHistoryDeltasAction
  | UpdateHistoryCardsAction
  ;
