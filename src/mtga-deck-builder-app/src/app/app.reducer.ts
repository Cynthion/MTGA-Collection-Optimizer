import { AppState, initialAppState, RootState } from './app.state';
import { AppActions, AppActionTypes } from './app.actions';
import { ActionReducerMap } from '@ngrx/store';

export function appReducer(state = initialAppState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.Initialized:
      return state;
    case AppActionTypes.ApiError:
      return state;

    case AppActionTypes.LoadingIncrement: {
      const semaphore = state.loadingSemaphore + 1;
      console.log('incremented', semaphore);
      const newState = {
        ...state,
        loadingSemaphore: semaphore,
        isLoading: semaphore > 0,
      };
      console.log(newState);
      return newState;
    }
    
    case AppActionTypes.LoadingDecrement: {
      const semaphore = state.loadingSemaphore - 1;
      console.log('decremented', semaphore);
      const newState = {
        ...state,
        loadingSemaphore: semaphore,
        isLoading: semaphore > 0,
      };
      return newState;
    }

    default:
      return state;
  }
}

export const rootReducers: ActionReducerMap<RootState, any> = {
  app: appReducer,
};
