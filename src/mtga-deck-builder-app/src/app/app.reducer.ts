import { AppState, initialAppState, RootState } from './app.state';
import { AppActions, AppActionTypes } from './app.actions';
import { ActionReducerMap } from '@ngrx/store';

export function appReducer(state = initialAppState, action: AppActions): AppState {
  console.log('App reducer');
  switch (action.type) {
    case AppActionTypes.Initialized:
      return state;
    case AppActionTypes.ApiError:
      return state;

    case AppActionTypes.LoadingIncrement: {
      return {
        ...state,
        loadingSemaphore: state.loadingSemaphore++,
        isLoading: state.loadingSemaphore > 0,
      };
    }

    case AppActionTypes.LoadingDecrement: {
      return {
        ...state,
        loadingSemaphore: state.loadingSemaphore--,
        isLoading: state.loadingSemaphore > 0,
      };
    }

    default:
      return state;
  }
}

export const rootReducers: ActionReducerMap<RootState, any> = {
  app: appReducer,
};
