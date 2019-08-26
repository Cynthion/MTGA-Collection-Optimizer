import { HistoryTabState, initialHistoryTabState } from './history-tab.state';
import { HistoryTabActions, HistoryTabActionTypes } from './history-tab.actions';

export function historyTabReducer(state: HistoryTabState = initialHistoryTabState, action: HistoryTabActions): HistoryTabState {
  switch (action.type) {
    case HistoryTabActionTypes.NewCardAdded: {
      return state;
    }

    default: {
      return state;
    }
  }
}
