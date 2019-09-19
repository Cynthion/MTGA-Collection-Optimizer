import * as _ from 'lodash';

import { inventoryReducer, InitializeInventoryAction } from './inventory';
import { initialLayoutState, LayoutState, CollectionCardState } from './layout.state';
import { LayoutActions, LayoutActionTypes } from './layout.actions';
import { callNestedReducers } from '../util/ngrx';

export function layoutReducer(state: LayoutState = initialLayoutState, action: LayoutActions): LayoutState {
  state = callNestedReducers(state, action, {
    inventory: inventoryReducer,
  });

  switch (action.type) {
    case LayoutActionTypes.Initialize: {
      return {
        ...state,
        ...action.dto,
        inventory: inventoryReducer(state.inventory, new InitializeInventoryAction(action.dto.inventory)),
      };
    }

    default: {
      return state;
    }
  }
}
