import { AppState, initialAppState } from './app.state';
import { AppActions, AppActionTypes } from './app.actions';

export function appReducer(state = initialAppState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.Initialized:
      return state;

    default:
      return state;
  }
}
