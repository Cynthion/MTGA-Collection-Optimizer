import { AppState, initialAppState, RootState } from './app.state';
import { AppActions, AppActionTypes } from './app.actions';
import { ActionReducerMap } from '@ngrx/store';

import { callNestedReducers } from './util/ngrx';
import { settingsReducer } from './settings';

export function appReducer(state = initialAppState, action: AppActions): AppState {

  state = callNestedReducers(state, action, {
    settings: settingsReducer
  });

  switch (action.type) {
    case AppActionTypes.Initialized:
      return state;

    case AppActionTypes.LoadingIncrement: {
      const semaphore = state.loadingSemaphore + 1;
      return {
        ...state,
        loadingSemaphore: semaphore,
        isLoading: semaphore > 0,
      };
    }

    case AppActionTypes.LoadingDecrement: {
      const semaphore = state.loadingSemaphore - 1;
      return {
        ...state,
        loadingSemaphore: semaphore,
        isLoading: semaphore > 0,
      };
    }

    default:
      return state;
  }
}

export const rootReducers: ActionReducerMap<RootState, any> = {
  app: appReducer,
};
