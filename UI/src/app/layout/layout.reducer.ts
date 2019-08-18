import { playerCardsReducer, playerDeckReducer } from '../domain.reducers';
import { InitializePlayerCardsAction, InitializePlayerDeckAction } from '../domain.actions';

import { initialLayoutState, LayoutState, CollectionCardState } from './layout.state';
import { LayoutActions, LayoutActionTypes } from './layout.actions';
import { PlayerCardState, DeckCardState } from '../domain.state';

export function layoutReducer(state: LayoutState = initialLayoutState, action: LayoutActions): LayoutState {
  // TODO add callNestedReducer for tree, on all levels (so that all action can flow through the tree)

  switch (action.type) {
    case LayoutActionTypes.Initialize: {
      return {
        ...state,
        ...action.dto,
        playerCards: action.dto.playerCards.map((dto, idx) => playerCardsReducer(state.playerCards[idx], new InitializePlayerCardsAction(dto))),
        playerDecks: action.dto.playerDecks.map((dto, idx) => playerDeckReducer(state.playerDecks[idx], new InitializePlayerDeckAction(dto))),
        // TODO add loading of InventoryDto to single backend call
        // inventory: inventoryReducer(state.inventory, new InitializedInventoryAction(action.dto.))
        // TODO what about tabs?
      };
    }

    case LayoutActionTypes.CalculateCollectionCards: {
      const collectionCards: CollectionCardState[] = [];

      // add PlayerCards to CollectionCards
      const playerCardCcs: CollectionCardState[] = state.playerCards.map(pc => {
        return {
          ...pc,
          requiredCount: 0, // from DeckCard
          missingCount: 0, // from CollectionCard
          wildcardWorthinessFactor: 0, // from CollectionCard
        };
      });

      collectionCards.push(...playerCardCcs);

      // add DeckCards to CollectionCards
      const deckCards: DeckCardState[] = state.playerDecks.reduce((dc, pd) => [...dc, ...pd.cards], []);
      const deckCardCcs: CollectionCardState[] = deckCards.map(dc => {
        return {
          ...dc,
          ownedCount: 0, // from PlayerCard
          missingCount: 0, // from CollectionCard
          wildcardWorthinessFactor: 0, // from CollectionCard
        };
      });

      collectionCards.push(...deckCardCcs);

      return {
        ...state,
        collectionCards,
      };
    }

    default: {
      return state;
    }
  }
}
