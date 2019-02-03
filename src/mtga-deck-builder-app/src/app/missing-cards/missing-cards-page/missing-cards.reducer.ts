import { allCards as mtgCardDb } from 'mtga';
import * as _ from 'lodash';

import {
  MissingCardsPageState,
  initialMissingCardsPageState,
  CardDto,
  CardState,
  PlayerDeckState,
  rarityDictionary,
} from './missing-cards.state';
import { MissingCardsActions, MissingCardsActionTypes } from './missing-cards.actions';

export function missingCardsPageReducer(state = initialMissingCardsPageState, action: MissingCardsActions): MissingCardsPageState {
  switch (action.type) {

    case MissingCardsActionTypes.Initialized: {
      let allCardsStates: CardState[] = [];

      const playerCardStates: CardState[] = action.dto.playerCards.map(enrichCardInfo);
      allCardsStates.push(...playerCardStates);

      const playerDecksState: PlayerDeckState[] = [];
      for (const playerDeckDto of action.dto.playerDecks) {
        const deckCardStates: CardState[] = playerDeckDto.cards.map(enrichCardInfo);
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
        playerDecks: playerDecksState,
        playerCards: playerCardStates,
        allCards: allCardsStates,
      };

      return newState;
    }

    default: {
      return state;
    }
  }
}

// TODO do this via a nested reducer
function enrichCardInfo(cardDto: CardDto): CardState {
  const mtgCard = mtgCardDb.findCard(cardDto.multiverseId);
  return ({
    multiverseId: cardDto.multiverseId,
    quantity: cardDto.quantity,
    name: mtgCard.get('prettyName'),
    rarity: rarityDictionary[mtgCard.get('rarity')],
    setCode: mtgCard.get('set'),
  });
}
