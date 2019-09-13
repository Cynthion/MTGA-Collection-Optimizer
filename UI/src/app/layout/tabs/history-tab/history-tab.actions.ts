import { Action } from '@ngrx/store';

// import { PlayerDeckState, PlayerCardDto } from '../../../domain.state';
import { CollectionCardState } from '../../layout.state';

export enum HistoryTabActionTypes {
  CalculateHistoryDeltas = '[History Tab] Calculate History Deltas',
  UpdateHistoryCards = '[History Tab] Update History Cards',
  UpdateTimestampPrettyPrint = '[History Tab] Update Timestamp Pretty Print',
}

// export class CalculateHistoryDeltasAction implements Action {
//   readonly type = HistoryTabActionTypes.CalculateHistoryDeltas;

//   constructor(
//     public newPlayerCards: PlayerCardDto[]
//   ) { }
// }

// export class UpdateHistoryCardsAction implements Action {
//   readonly type = HistoryTabActionTypes.UpdateHistoryCards;

//   constructor(
//     public collectionCards: CollectionCardState[],
//     public playerDecks: PlayerDeckState[],
//   ) { }
// }

export class UpdateTimestampPrettyPrintAction implements Action {
  readonly type = HistoryTabActionTypes.UpdateTimestampPrettyPrint;

  constructor(
    public date: Date,
  ) { }
}

export type HistoryTabActions =
  // | CalculateHistoryDeltasAction
  // | UpdateHistoryCardsAction
  | UpdateTimestampPrettyPrintAction
  ;
