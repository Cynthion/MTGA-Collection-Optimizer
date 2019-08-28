import * as _ from 'lodash';

import { HistoryTabState, initialHistoryTabState, HistoryCardState } from './history-tab.state';
import { HistoryTabActions, HistoryTabActionTypes } from './history-tab.actions';

export function historyTabReducer(state: HistoryTabState = initialHistoryTabState, action: HistoryTabActions): HistoryTabState {
  switch (action.type) {
    case HistoryTabActionTypes.CalculateHistoryDeltas: {
      const existingPlayerCardIds = action.playerCardIds;
      const historyDeltas = [...state.historyDeltas];

      // don't add history deltas for initial load
      if (state.existingPlayerCardIds.length !== 0) {
        const newPlayerCardIds = action.playerCardIds;
        const deltaPlayerCardIds = _.difference(newPlayerCardIds, state.existingPlayerCardIds);

        for (const deltaPlayerCardId of deltaPlayerCardIds) {

          historyDeltas.push({
            mtgaId: deltaPlayerCardId,
            timeStamp: 'now',
          });
        }
      }

      return {
        ...state,
        existingPlayerCardIds,
        historyDeltas: historyDeltas,
      };
    }

    case HistoryTabActionTypes.UpdateHistoryCards: {
      const historyCards: HistoryCardState[] = [];

      for (const historyDelta of state.historyDeltas) {
        const collectionCard = action.collectionCards.find(cc => cc.mtgaId === historyDelta.mtgaId);

        const requiringDeckNames = action.playerDecks.filter(pd => _.includes(pd.cards.map(c => c.mtgaId), historyDelta.mtgaId)).map(pd => pd.name);

        historyCards.push({
          ...collectionCard,
          timeStamp: historyDelta.timeStamp,
          requiringDeckNames,
        });
      }

      return {
        ...state,
        historyCards,
      };
    }

    default: {
      return state;
    }
  }
}
