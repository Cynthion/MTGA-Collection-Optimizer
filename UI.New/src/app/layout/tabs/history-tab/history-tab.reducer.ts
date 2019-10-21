import * as _ from 'lodash';

import { HistoryTabState, initialHistoryTabState, HistoryCardState, initialHistoryCardState } from './history-tab.state';
import { HistoryTabActions, HistoryTabActionTypes, HistoryCardActions, HistoryCardActionTypes, InitializeHistoryCardAction } from './history-tab.actions';
import { callNestedReducers, createArrayReducer } from '../../../util/ngrx';

export function historyCardReducer(state: HistoryCardState = initialHistoryCardState, action: HistoryCardActions): HistoryCardState {
  switch (action.type) {
    case HistoryCardActionTypes.Initialize: {
      return {
        ...state,
        ...action.dto,
        timeAgo: getTimeAgoPrint(action.dto.timeStamp, Date.now()),
      };
    }

    case HistoryCardActionTypes.UpdateTimeAgo: {
      return {
        ...state,
        timeAgo: getTimeAgoPrint(state.timeStamp, action.timeStamp),
      };
    }

    default: {
      return state;
    }
  }
}

export function historyTabReducer(state: HistoryTabState = initialHistoryTabState, action: HistoryTabActions): HistoryTabState {
  state = callNestedReducers(state, action, {
    historyCards: createArrayReducer(historyCardReducer),
  });

  switch (action.type) {
    case HistoryTabActionTypes.Initialize: {
      const badgeCount = state.badgeCount + action.dto.newBadgeCount;
      return {
        ...state,
        ...action.dto,
        historyCards: action.dto.historyCards.map((dto, idx) => historyCardReducer(state.historyCards[idx], new InitializeHistoryCardAction(dto))),
        badgeCount,
        isBadgeVisible: badgeCount > 0,
      };
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

    case HistoryTabActionTypes.ResetBadgeCount: {
      return {
        ...state,
        badgeCount: 0,
        isBadgeVisible: false,
      };
    }

    default: {
      return state;
    }
  }
}

function getTimeAgoPrint(oldDate: number, newDate: number): string {
  const diff = Math.abs(oldDate - newDate);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return `${seconds} ${seconds < 2 ? 'second' : 'seconds'} ago`;
  }
  if (minutes < 60) {
    return `${minutes} ${minutes < 2 ? 'minute' : 'minutes'} ago`;
  }
  if (hours < 60) {
    return `${hours} ${hours < 2 ? 'hour' : 'hours'} ago`;
  }
  return oldDate.toLocaleString();
}
