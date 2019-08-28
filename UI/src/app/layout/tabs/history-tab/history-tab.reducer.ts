import * as _ from 'lodash';

import { HistoryTabState, initialHistoryTabState, HistoryCardState, CardRecord } from './history-tab.state';
import { HistoryTabActions, HistoryTabActionTypes } from './history-tab.actions';

export function historyTabReducer(state: HistoryTabState = initialHistoryTabState, action: HistoryTabActions): HistoryTabState {
  switch (action.type) {
    case HistoryTabActionTypes.CalculateHistoryDeltas: {
      const historyDeltas = [...state.historyDeltas];
      const existingCardRecords: CardRecord[] = action.playerCards.map(pc => ({
        id: pc.mtgaId,
        count: pc.ownedCount,
      }));

      // don't add history deltas for initial load
      if (state.existingCardRecords.length !== 0) {
        const newCardRecords: CardRecord[] = action.playerCards.map(pc => ({
          id: pc.mtgaId,
          count: pc.ownedCount,
        }));

        const deltaCardRecords: CardRecord[] = _.differenceWith(newCardRecords, state.existingCardRecords, _.isEqual);

        for (const deltaRecord of deltaCardRecords) {
          historyDeltas.push({
            mtgaId: deltaRecord.id,
            timeStamp: 'now',
          });
        }
      }

      return {
        ...state,
        existingCardRecords,
        historyDeltas: historyDeltas,
      };
    }

    case HistoryTabActionTypes.UpdateHistoryCards: {
      // TODO remove after UI mock is not needed anymore
      // const historyCards: HistoryCardState[] = [];
      const historyCards = state.historyCards;

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
