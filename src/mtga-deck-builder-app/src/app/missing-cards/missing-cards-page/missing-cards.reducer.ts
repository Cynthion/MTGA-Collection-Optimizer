import { MissingCardsPageState, initialMissingCardsPageState } from './missing-cards.state';
import { MissingCardsActions, MissingCardsActionTypes } from './missing-cards.actions';

export function missingCardsPageReducer(state = initialMissingCardsPageState, action: MissingCardsActions): MissingCardsPageState {
  switch (action.type) {
    case MissingCardsActionTypes.Initialized:
      return state;

    default:
      return state;
  }
}
