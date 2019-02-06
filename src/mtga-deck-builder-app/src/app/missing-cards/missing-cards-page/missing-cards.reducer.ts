import { allCards as mtgCardDb } from 'mtga';
import * as _ from 'lodash';

import {
  MissingCardsPageState,
  initialMissingCardsPageState,
  CardDto,
  CardState,
  PlayerDeckState,
  rarityDictionary,
  PlayerCardState,
  PlayerCardDto,
  DeckCardDto,
  DeckCardState,
  CollectionCardState,
} from './missing-cards.state';
import { MissingCardsActions, MissingCardsActionTypes } from './missing-cards.actions';

export function missingCardsPageReducer(state = initialMissingCardsPageState, action: MissingCardsActions): MissingCardsPageState {
  switch (action.type) {

    case MissingCardsActionTypes.Initialized: {
      let collectionCardStates: CollectionCardState[] = [];

      // enrich player cards, then convert to collection cards
      const playerCardStates: PlayerCardState[] = action.dto.playerCards.map(enrichToCollectionCardState);
      const collectionPlayerCardStates: CollectionCardState[] = playerCardStates.map(playerCardState => {
        return {
          ...playerCardState,
          missingCount: 0,
        } as CollectionCardState;
      });
      collectionCardStates.push(...collectionPlayerCardStates);

      // enrich deck cards, then convert to collection cards
      const playerDecksState: PlayerDeckState[] = [];
      const allDeckCardStates: DeckCardState[] = [];
      for (const playerDeckDto of action.dto.playerDecks) {
        const deckCardStates: DeckCardState[] = playerDeckDto.cards.map(enrichToDeckCardState);
        playerDecksState.push({
          ...playerDeckDto,
          cards: deckCardStates,
        });
        allDeckCardStates.push(...deckCardStates);
      }
      // TODO maybe already filter for duplicates in deck cards here
      const collectionDeckCardState: CollectionCardState[] = allDeckCardStates.map(deckCardState => {
        // if player has card, then take its owned count
        const playerCard = playerCardStates.find(c => c.multiverseId === deckCardState.multiverseId);
        const ownedCount = playerCard && playerCard.ownedCount || 0;

        // find max required count in all decks
        const maxRequiredCount = _.max(allDeckCardStates
          .filter(c => c.multiverseId === deckCardState.multiverseId).map(c => c.requiredCount));
        const missingCount = maxRequiredCount - ownedCount;

        return {
          ...deckCardState,
          ownedCount,
          missingCount,
        } as CollectionCardState;
      });
      collectionCardStates.push(...collectionDeckCardState);

      // TODO ensure correct duplicate is filtered
      // check Connive // Concoct, Blood Crypt, Camaraderie
      // filter duplicates, take the card with bigger missing count since player cards are initialized to 0
      // collectionCardStates = _.orderBy(collectionCardStates, ['multiverseId', 'missingCount'], ['asc', 'desc']);
      // collectionCardStates = _.uniqBy(collectionCardStates, c => c.multiverseId);

      collectionCardStates = _.orderBy(collectionCardStates, ['rarity', 'name'], ['desc', 'asc']);

      const newState: MissingCardsPageState = {
        ...action.dto,
        ...state,
        playerDecks: playerDecksState,
        playerCards: playerCardStates,
        collectionCards: collectionCardStates,
      };

      return newState;
    }

    default: {
      return state;
    }
  }
}

function enrichToCollectionCardState(playerCardDto: PlayerCardDto): PlayerCardState {
  const mtgCard = mtgCardDb.findCard(playerCardDto.multiverseId);
  return ({
    ...playerCardDto,
    name: mtgCard.get('prettyName'),
    rarity: rarityDictionary[mtgCard.get('rarity')],
    setCode: mtgCard.get('set'),
  });
}

function enrichToDeckCardState(deckCardDto: DeckCardDto): DeckCardState {
  const mtgCard = mtgCardDb.findCard(deckCardDto.multiverseId);
  return ({
    ...deckCardDto,
    name: mtgCard.get('prettyName'),
    rarity: rarityDictionary[mtgCard.get('rarity')],
    setCode: mtgCard.get('set'),
  });
}
