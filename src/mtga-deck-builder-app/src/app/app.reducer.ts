import { AppState, initialAppState } from './app.state';
import { AppActions, AppActionTypes, IncrementAppLoadingSemaphoreAction } from './app.actions';

export function appReducer(state = initialAppState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.Initialized:
      return state;
    case AppActionTypes.ApiError:
      return state;

    case AppActionTypes.LoadingIncrement: {
      return {
        ...state,
        loadingSemaphore: state.loadingSemaphore++,
      };
    }

    case AppActionTypes.LoadingDecrement: {
      return {
        ...state,
        loadingSemaphore: state.loadingSemaphore--,
      };
    }

    default:
      return state;
  }
}
