import * as _ from 'lodash';

import { HistoryTabState, initialHistoryTabState, HistoryCardState, CardRecord } from './history-tab.state';
import { HistoryTabActions, HistoryTabActionTypes } from './history-tab.actions';

export function historyTabReducer(state: HistoryTabState = initialHistoryTabState, action: HistoryTabActions): HistoryTabState {
  switch (action.type) {
    case HistoryTabActionTypes.CalculateHistoryDeltas: {
      let historyDeltas = [...state.historyDeltas];
      const existingCardRecords: CardRecord[] = action.newPlayerCards.map(pc => ({
        id: pc.mtgaId,
        count: pc.ownedCount,
      }));

      // don't add history deltas for initial load
      if (state.existingCardRecords.length !== 0) {
        const newCardRecords: CardRecord[] = action.newPlayerCards.map(pc => ({
          id: pc.mtgaId,
          count: pc.ownedCount,
        }));

        const deltaCardRecords: CardRecord[] = _.differenceWith(newCardRecords, state.existingCardRecords, _.isEqual);
        const timeStamp = new Date();

        for (const deltaRecord of deltaCardRecords) {
          historyDeltas.push({
            mtgaId: deltaRecord.id,
            timeStamp,
          });
        }
      }

      historyDeltas = _.orderBy(historyDeltas, ['timeStamp', 'name'], ['desc', 'asc']);

      return {
        ...state,
        existingCardRecords,
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
          timeStampPrettyPrint: '',
          requiringDeckNames,
        });
      }

      return {
        ...state,
        historyCards,
      };
    }

    case HistoryTabActionTypes.UpdateTimestampPrettyPrint: {
      const historyCards = [...state.historyCards];
      for (const historyCard of historyCards) {
        historyCard.timeStampPrettyPrint = getTimestampPrettyPrint(historyCard.timeStamp, action.date);
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

  function getTimestampPrettyPrint(oldDate: Date, newDate: Date): string {
    const diff = Math.abs(oldDate.getTime() - newDate.getTime());
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);

    if (seconds < 60) {
      return `${seconds} ${seconds < 2 ? 'second' : 'seconds'} ago`;
    }
    if (minutes < 60) {
      return `${minutes} ${minutes < 2 ? 'minute' : 'minutes'} ago`;
    }
    return oldDate.toLocaleString();
  }
}
