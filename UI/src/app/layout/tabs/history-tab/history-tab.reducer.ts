import * as _ from 'lodash';

import { HistoryTabState, initialHistoryTabState } from './history-tab.state';
import { HistoryTabActions, HistoryTabActionTypes } from './history-tab.actions';

export function historyTabReducer(state: HistoryTabState = initialHistoryTabState, action: HistoryTabActions): HistoryTabState {
  switch (action.type) {
    case HistoryTabActionTypes.CalculateHistoryDeltas: {
      const existingPlayerCardIds = action.playerCardIds;
      const historyDeltas = [...state.historyDeltas];

      debugger;
      if (state.existingPlayerCardIds.length !== 0) {
        const newPlayerCardIds = action.playerCardIds;
        const deltaPlayerCardIds = _.without(newPlayerCardIds, state.existingPlayerCardIds);

        for (const deltaPlayerCardId of deltaPlayerCardIds) {

          historyDeltas.push({
            cardId: deltaPlayerCardId,
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

    default: {
      return state;
    }
  }
}
