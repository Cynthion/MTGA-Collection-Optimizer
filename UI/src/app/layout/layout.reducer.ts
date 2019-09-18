import * as _ from 'lodash';

// import { DeckCardState } from '../domain.state';
// import { InitializePlayerCardsAction, InitializePlayerDeckAction } from '../domain.actions';
// import { playerCardsReducer, playerDeckReducer } from '../domain.reducers';

import { inventoryReducer, InitializeInventoryAction } from './inventory';
import { initialLayoutState, LayoutState, CollectionCardState } from './layout.state';
import { LayoutActions, LayoutActionTypes } from './layout.actions';
import { callNestedReducers } from '../util/ngrx';
import { DecksTabActionTypes, SortDeckColumnsAction } from './tabs/decks-tab/decks-tab.actions';
import { SortDeckColumnOrder } from './tabs/decks-tab/decks-tab.state';

export function layoutReducer(state: LayoutState = initialLayoutState, action: LayoutActions | SortDeckColumnsAction): LayoutState {
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

    case DecksTabActionTypes.SortDeckColumns: {
      const sortOrder = action.sortDeckColumnOrder;

      switch (sortOrder) {
        case SortDeckColumnOrder.Alphabetical: {
          return {
            ...state,
            decks: _.orderBy(state.decks, ['name'], ['asc']),
          };
        }
        case SortDeckColumnOrder.Completeness: {
          return {
            ...state,
            decks: _.orderBy(state.decks, ['completeness'], ['desc']),
          };
        }
        case SortDeckColumnOrder.Incompleteness: {
          return {
            ...state,
            decks: _.orderBy(state.decks, ['completeness'], ['asc']),
          };
        }
        default:
          return state;
      }
    }

    default: {
      return state;
    }
  }
}
