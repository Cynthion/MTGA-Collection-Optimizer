import { Action } from '@ngrx/store';

import { PlayerDeckState, PlayerCardDto } from '../../../domain.state';
import { CollectionCardState } from '../../layout.state';

export enum HistoryTabActionTypes {
  CalculateHistoryDeltas = '[History Tab] Calculate History Deltas',
  UpdateHistoryCards = '[History Tab] Update History Cards',
}

export class CalculateHistoryDeltasAction implements Action {
  readonly type = HistoryTabActionTypes.CalculateHistoryDeltas;

  constructor(
    public playerCards: PlayerCardDto[]
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
