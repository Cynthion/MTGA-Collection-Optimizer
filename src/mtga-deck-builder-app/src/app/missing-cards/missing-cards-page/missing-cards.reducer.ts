import { MissingCardsPageState, initialMissingCardsPageState, CardState, rarityDictionary } from './missing-cards.state';
import { MissingCardsActions, MissingCardsActionTypes } from './missing-cards.actions';

import { allCards as mtgCardDb } from 'mtga';
import * as _ from 'lodash';

export function missingCardsPageReducer(state = initialMissingCardsPageState, action: MissingCardsActions): MissingCardsPageState {
  switch (action.type) {

    case MissingCardsActionTypes.Initialized: {

      let cardStates: CardState[] = action.dto.playerCards.map(c => {
        const mtgCard = mtgCardDb.findCard(c.multiverseId);
        return ({
          multiverseId: c.multiverseId,
          quantity: c.quantity,
          name: mtgCard.get('prettyName'),
          rarity: rarityDictionary[mtgCard.get('rarity')],
          setCode: mtgCard.get('set'),
        });
      });

      cardStates = _.orderBy(cardStates, ['rarity', 'name'], ['desc', 'asc']);

      return {
        ...state,
        playerCards: cardStates,
      };
    }

    default: {
      return state;
    }
  }
}
