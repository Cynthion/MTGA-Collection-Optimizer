import { MissingCardsPageState, initialMissingCardsPageState, CardState, rarityDictionary, CardDto } from './missing-cards.state';
import { MissingCardsActions, MissingCardsActionTypes } from './missing-cards.actions';

import { allCards as mtgCardDb } from 'mtga';
import * as _ from 'lodash';

export function missingCardsPageReducer(state = initialMissingCardsPageState, action: MissingCardsActions): MissingCardsPageState {
  switch (action.type) {

    case MissingCardsActionTypes.Initialized: {
      let allCardsStates: CardState[] = [];

      const playerCardStates: CardState[] = action.dto.playerCards.map(enrichCardInfo);
      allCardsStates = allCardsStates.concat(playerCardStates);

      for (const playerDeck of action.dto.playerDecks) {
        const deckCardStates: CardState[] = playerDeck.cards.map(enrichCardInfo);
        allCardsStates = allCardsStates.concat(deckCardStates);
      }

      allCardsStates = _.uniqBy(allCardsStates, c => c.multiverseId);
      allCardsStates = _.orderBy(allCardsStates, ['rarity', 'name'], ['desc', 'asc']);

      const newState: MissingCardsPageState = {
        ...state,
        playerCards: playerCardStates,
        allCards: allCardsStates,
      };
      console.log(newState);
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
