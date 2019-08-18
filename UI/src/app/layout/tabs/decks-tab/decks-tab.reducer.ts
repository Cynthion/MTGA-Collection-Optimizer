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

    default: {
      return state;
    }
  }
}
