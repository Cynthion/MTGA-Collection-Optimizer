import { MissingCardsPageState, initialMissingCardsPageState, CardState } from './missing-cards.state';
import { MissingCardsActions, MissingCardsActionTypes } from './missing-cards.actions';

const { mtgCardDb } = require('mtga');

export function missingCardsPageReducer(state = initialMissingCardsPageState, action: MissingCardsActions): MissingCardsPageState {
  switch (action.type) {

    case MissingCardsActionTypes.Initialized: {
      const cardStates: CardState[] = action.dto.playerCards.map(c => {
        const mtgCard = mtgCardDb.findCard(c.multiverseId);
        return ({
          multiverseId: c.multiverseId,
          quantity: c.quantity,
          name: mtgCard.get('prettyName'),
          rarity: mtgCard.get('rarity'),
          setCode: mtgCard.get('set'),
        });
      });

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
