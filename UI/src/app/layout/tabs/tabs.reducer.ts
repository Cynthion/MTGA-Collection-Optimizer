import { initialTabsState, TabsState } from './tabs.state';
import { TabsActionTypes, TabsActions } from './tabs.actions';

export function tabsReducer(state = initialTabsState, action: TabsActions): TabsState {
  switch (action.type) {

    case TabsActionTypes.Initialize: {
      return {
        ...state,
        decksTab
      };

    }

    default: {
      return state;
    }
  }
}

function sum(accumulator: number, summand: number): number {
  return accumulator + summand;
}
