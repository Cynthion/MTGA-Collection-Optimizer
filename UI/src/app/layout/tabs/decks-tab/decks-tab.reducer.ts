import { DecksTabState, initialDecksTabState } from './decks-tab.state';
import { DecksTabActions, DecksTabActionTypes } from './decks-tab.actions';

export function decksTabReducer(state: DecksTabState = initialDecksTabState, action: DecksTabActions): DecksTabState {
  switch (action.type) {
    case DecksTabActionTypes.SortDeckColumns: {
      return {
        ...state,
        sortDeckColumnOrder: action.sortDeckColumnOrder,
      };
    }

    case DecksTabActionTypes.FilterCollectionCards: {
      return {
        ...state,
        filterValue: action.filterValue,
      };
    }

    case DecksTabActionTypes.ClearFilter: {
      return {
        ...state,
        filterValue: '',
      };
    }

    default: {
      return state;
    }
  }
}
