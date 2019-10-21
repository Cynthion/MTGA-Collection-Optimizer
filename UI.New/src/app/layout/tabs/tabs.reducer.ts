import { TabsState, initialTabsState } from './tabs.state';
import { callNestedReducers } from '../../util/ngrx';
import { historyTabReducer } from './history-tab/history-tab.reducer';
import { TabsActions, TabsActionTypes } from './tabs.actions';
import { InitializeHistoryTabAction } from './history-tab/history-tab.actions';

export function tabsReducer(state: TabsState = initialTabsState, action: TabsActions): TabsState {
  state = callNestedReducers(state, action, {
    historyTab: historyTabReducer,
  });

  switch (action.type) {
    case TabsActionTypes.Initialize: {
      return {
        ...state,
        ...action.dto,
        historyTab: historyTabReducer(state.historyTab, new InitializeHistoryTabAction(action.dto.historyTab)),
      };
    }

    default: {
      return state;
    }
  }
}
