import * as _ from 'lodash';

import { HistoryTabState, initialHistoryTabState, HistoryCardState, initialHistoryCardState } from './history-tab.state';
import { HistoryTabActions, HistoryTabActionTypes, HistoryCardActions, HistoryCardActionTypes, InitializeHistoryCardAction } from './history-tab.actions';

export function historyCardReducer(state: HistoryCardState = initialHistoryCardState, action: HistoryCardActions): HistoryCardState {
  switch (action.type) {
    case HistoryCardActionTypes.Initialize: {
      return {
        ...state,
        ...action.dto,
      };
    }

    default: {
      return state;
    }
  }
}

export function historyTabReducer(state: HistoryTabState = initialHistoryTabState, action: HistoryTabActions): HistoryTabState {
  switch (action.type) {
    case HistoryTabActionTypes.Initialize: {
      const newState = {
        ...state,
        ...action.dto,
        historyCards: action.dto.historyCards.map((dto, idx) => historyCardReducer(state.historyCards[idx], new InitializeHistoryCardAction(dto))),
      };

      console.log(newState);

      return newState;
    }

    case HistoryTabActionTypes.Filter: {
      return {
        ...state,
        filterValue: action.filterValue,
      };
    }

    case HistoryTabActionTypes.ClearFilter: {
      return {
        ...state,
        filterValue: '',
      };
    }

    default: {
      return state;
    }
  }

  // function getTimestampPrettyPrint(oldDate: Date, newDate: Date): string {
  //   const diff = Math.abs(oldDate.getTime() - newDate.getTime());
  //   const seconds = Math.floor(diff / 1000);
  //   const minutes = Math.floor(seconds / 60);

  //   if (seconds < 60) {
  //     return `${seconds} ${seconds < 2 ? 'second' : 'seconds'} ago`;
  //   }
  //   if (minutes < 60) {
  //     return `${minutes} ${minutes < 2 ? 'minute' : 'minutes'} ago`;
  //   }
  //   return oldDate.toLocaleString();
  // }
}
