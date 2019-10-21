import * as _ from 'lodash';

import { inventoryReducer, InitializeInventoryAction } from './inventory';
import { tabsReducer } from './tabs/tabs.reducer';
import { initialLayoutState, LayoutState, } from './layout.state';
import { LayoutActions, LayoutActionTypes } from './layout.actions';
import { callNestedReducers } from '../util/ngrx';
import { InitializeTabsAction } from './tabs/tabs.actions';

export function layoutReducer(state: LayoutState = initialLayoutState, action: LayoutActions): LayoutState {
  state = callNestedReducers(state, action, {
    inventory: inventoryReducer,
    tabs: tabsReducer,
  });

  switch (action.type) {
    case LayoutActionTypes.Initialize: {
      return {
        ...state,
        ...action.dto,
        inventory: inventoryReducer(state.inventory, new InitializeInventoryAction(action.dto.inventory)),
        tabs: tabsReducer(state.tabs, new InitializeTabsAction(action.dto.tabs)),
      };
    }

    default: {
      return state;
    }
  }
}
