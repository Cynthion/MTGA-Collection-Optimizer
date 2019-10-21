import { AppState, initialAppState, RootState } from './app.state';
import { AppActions, AppActionTypes } from './app.actions';
import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';

import { callNestedReducers } from './util/ngrx';
import { settingsReducer } from './settings';
import { apiErrorReducer } from './api-error';
import { aboutReducer } from './about';

export function appReducer(state = initialAppState, action: AppActions): AppState {

  state = callNestedReducers(state, action, {
    about: aboutReducer,
    apiError: apiErrorReducer,
    settings: settingsReducer,
  });

  switch (action.type) {
    case AppActionTypes.Initialized:
      return {
        ...state,
      };

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

export function debugMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log(action);

    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<RootState, any> = {
  app: appReducer,
};

export const metaReducers: MetaReducer<any>[] = [debugMetaReducer];
