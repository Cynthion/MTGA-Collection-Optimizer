import { allCards as mtgCardDb } from 'mtga';
import * as _ from 'lodash';

import {
  MissingCardsPageState,
  initialMissingCardsPageState,
  CardDto,
  CardState,
  PlayerDeckState,
  rarityDictionary,
  CollectionCardState,
  CollectionCardDto,
  DeckCardDto,
  DeckCardState,
} from './missing-cards.state';
import { MissingCardsActions, MissingCardsActionTypes } from './missing-cards.actions';

export function missingCardsPageReducer(state = initialMissingCardsPageState, action: MissingCardsActions): MissingCardsPageState {
  switch (action.type) {

    case MissingCardsActionTypes.Initialized: {
      let allCardsStates: CardState[] = [];

      const collectionCardStates: CollectionCardState[] = action.dto.playerCards.map(enrichToCollectionCardState);

      allCardsStates.push(...collectionCardStates);

      const playerDecksState: PlayerDeckState[] = [];
      for (const playerDeckDto of action.dto.playerDecks) {
        const deckCardStates: DeckCardState[] = playerDeckDto.cards.map(enrichToDeckCardState);
        playerDecksState.push({
          ...playerDeckDto,
          cards: deckCardStates,
        });
        allCardsStates.push(...deckCardStates);
      }

      allCardsStates = _.uniqBy(allCardsStates, c => c.multiverseId);
      allCardsStates = _.orderBy(allCardsStates, ['rarity', 'name'], ['desc', 'asc']);

      const newState: MissingCardsPageState = {
        ...action.dto,
        ...state,
        playerDecks: playerDecksState,
        playerCards: collectionCardStates,
        allCards: allCardsStates,
      };

      return newState;
    }

    default: {
      return state;
    }
  }
}

function enrichToCollectionCardState(cardDto: CollectionCardDto): CollectionCardState {
  const mtgCard = mtgCardDb.findCard(cardDto.multiverseId);
  return ({
    ...cardDto,
    name: mtgCard.get('prettyName'),
    rarity: rarityDictionary[mtgCard.get('rarity')],
    setCode: mtgCard.get('set'),
  });
}

function enrichToDeckCardState(cardDto: DeckCardDto): DeckCardState {
  const mtgCard = mtgCardDb.findCard(cardDto.multiverseId);
  return ({
    ...cardDto,
    name: mtgCard.get('prettyName'),
    rarity: rarityDictionary[mtgCard.get('rarity')],
    setCode: mtgCard.get('set'),
  });
}
