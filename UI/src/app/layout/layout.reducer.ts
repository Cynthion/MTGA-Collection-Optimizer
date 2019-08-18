import * as _ from 'lodash';

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

      // create CollectionCards from PlayerCards
      const playerCardCcs: CollectionCardState[] = state.playerCards.map(pc => {
        return {
          ...pc,
          requiredCount: 0, // from DeckCard
          missingCount: 0, // from CollectionCard
          wildcardWorthinessFactor: 0, // from CollectionCard
        };
      });

      // create DeckCards from DeckCards
      const deckCards: DeckCardState[] = state.playerDecks.reduce((dc, pd) => [...dc, ...pd.cards], []);
      const deckCardCcs: CollectionCardState[] = deckCards.map(dc => {
        return {
          ...dc,
          ownedCount: 0, // from PlayerCard
          missingCount: 0, // from CollectionCard
          wildcardWorthinessFactor: 0, // from CollectionCard
        };
      });

      // consolidate: starting with PlayerCards, merge DeckCards
      collectionCards.push(...playerCardCcs);

      for (const deckCardCc of deckCardCcs) {
        // if player has card, take ownedCount
        const existingPlayerCard = playerCardCcs.find(pc => pc.mtgaId === deckCardCc.mtgaId);
        const ownedCount = existingPlayerCard !== undefined
          ? existingPlayerCard.ownedCount
          : 0;
        const missingCount = deckCardCc.requiredCount - ownedCount;

        // if collection has card, take max missingCount
        const existingCollectionCard = collectionCards.find(cc => cc.mtgaId === deckCardCc.mtgaId);
        

      }

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
