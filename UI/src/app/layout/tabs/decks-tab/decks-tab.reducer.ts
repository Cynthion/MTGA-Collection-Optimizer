import { playerDeckReducer, playerCardsReducer } from '../../../domain.reducers';
import { InitializePlayerDeckAction, InitializePlayerCardsAction } from '../../../domain.actions';

import { DecksTabState, initialDecksTabState } from './decks-tab.state';
import { DecksTabActions, DecksTabActionTypes } from './decks-tab.actions';

export function decksTabReducer(state: DecksTabState = initialDecksTabState, action: DecksTabActions): DecksTabState {
  switch (action.type) {
    case DecksTabActionTypes.Initialize: {
      return {
        ...state,
        ...action.dto,
        playerCards: action.dto.playerCards.map((dto, idx) => playerCardsReducer(state.playerCards[idx], new InitializePlayerCardsAction(dto))),
        playerDecks: action.dto.playerDecks.map((dto, idx) => playerDeckReducer(state.playerDecks[idx], new InitializePlayerDeckAction(dto))),
      };
    }

    // TODO add action to calc collectionCards property

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
