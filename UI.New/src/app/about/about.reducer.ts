import { initialAboutState, AboutState } from './about.state';
import { AboutActions, AboutActionTypes } from './about.actions';

export function aboutReducer(
  state: AboutState = initialAboutState,
  action: AboutActions): AboutState {
  switch (action.type) {
    case AboutActionTypes.Open: {
      return {
        ...state,
        isOpen: true,
      };
    }

    case AboutActionTypes.Close: {
      return {
        ...state,
        isOpen: false,
      };
    }

    default: {
      return state;
    }
  }
}
