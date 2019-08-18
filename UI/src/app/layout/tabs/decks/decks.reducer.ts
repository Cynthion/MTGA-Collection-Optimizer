import { playerDeckReducer, playerCardsReducer } from '../../../domain.reducers';
import { InitializePlayerDeckAction, InitializePlayerCardsAction } from '../../../domain.actions';

import { initialDecksState, DecksState } from './decks.state';
import { DecksActions, DecksActionTypes } from './decks.actions';

export function decksReducer(state: DecksState = initialDecksState, action: DecksActions): DecksState {
  switch (action.type) {
    case DecksActionTypes.Initialized: {
      return {
        ...state,
        ...action.dto,
        playerCards: action.dto.playerCards.map((dto, idx) => playerCardsReducer(state.playerCards[idx], new InitializePlayerCardsAction(dto))),
        playerDecks: action.dto.playerDecks.map((dto, idx) => playerDeckReducer(state.playerDecks[idx], new InitializePlayerDeckAction(dto))),
      };
    }

    // TODO add action to calc collectionCards property

    case DecksActionTypes.SortDeckColumns: {
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
