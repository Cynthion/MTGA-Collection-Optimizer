import * as _ from 'lodash';

import { DeckCardState } from '../domain.state';
import { InitializePlayerCardsAction, InitializePlayerDeckAction } from '../domain.actions';
import { playerCardsReducer, playerDeckReducer } from '../domain.reducers';
import { calcWildcardWorthinessFactor } from '../util/calculations';

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
        playerCards: action.dto.playerCards.map((dto, idx) => playerCardsReducer(state.playerCards[idx], new InitializePlayerCardsAction(dto))),
        playerDecks: action.dto.playerDecks.map((dto, idx) => playerDeckReducer(state.playerDecks[idx], new InitializePlayerDeckAction(dto))),
      };
    }

    case LayoutActionTypes.CalculateCollectionCards: {
      let collectionCards: CollectionCardState[] = [];

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
        const missingCountForDeck = _.max([deckCardCc.requiredCount - ownedCount, 0]);

        // if collection has card, take max missingCount
        const existingCollectionCard = collectionCards.find(cc => cc.mtgaId === deckCardCc.mtgaId);

        const missingCount = existingCollectionCard !== undefined
          ? _.max([existingCollectionCard.missingCount, missingCountForDeck])
          : missingCountForDeck;

        // add/update card
        if (existingCollectionCard === undefined) {
          deckCardCc.missingCount = missingCount;
          collectionCards.push(deckCardCc);
        } else {
          existingCollectionCard.missingCount = missingCount;
        }
      }

      // calculate wildcardWorthinessFactor
      collectionCards.forEach(cc => {
        cc.wildcardWorthinessFactor = calcWildcardWorthinessFactor(cc, state.playerDecks);
      });

      // sort
      collectionCards = _.orderBy(collectionCards, ['rarity', 'name'], ['desc', 'asc']);

      return {
        ...state,
        collectionCards,
      };
    }

    case LayoutActionTypes.CalculateDeckCompleteness: {
      const playerDecks = {
        ...state.playerDecks,
      };

      for (const playerDeck of playerDecks) {
        // take collectionCards.ownedCards if not bigger than requiredCount
        let totalOwnedDeckCards = 0;
        for (const deckCard of playerDeck.cards) {
          const collectionCard = state.collectionCards.find(cc => cc.mtgaId === deckCard.mtgaId);
          const deckCardOwnedCount = collectionCard.ownedCount > deckCard.requiredCount
            ? deckCard.requiredCount
            : collectionCard.ownedCount;
          totalOwnedDeckCards += deckCardOwnedCount;
        }

        playerDeck.totalDeckCards = playerDeck.cards.map(dc => dc.requiredCount).reduce((a, b) => a + b);
        playerDeck.totalOwnedDeckCards = totalOwnedDeckCards;
        playerDeck.completeness = playerDeck.totalOwnedDeckCards / playerDeck.totalDeckCards;
      }

      return {
        ...state,
        playerDecks,
      };
    }

    default: {
      return state;
    }
  }
}
