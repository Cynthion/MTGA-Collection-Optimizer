import { initialApiErrorState, ApiErrorState } from './api-error.state';
import { ApiErrorActions, ApiErrorActionTypes } from './api-error.actions';

export function apiErrorReducer(state: ApiErrorState = initialApiErrorState, action: ApiErrorActions): ApiErrorState {
    switch (action.type) {
      case ApiErrorActionTypes.Open: {
        return {
          ...state,
          ...action.apiErrorState,
          isSnackbarOpen: true,
        };
      }

      case ApiErrorActionTypes.Close: {
        return {
          ...state,
          isSnackbarOpen: false,
        };
      }

      default: {
        return state;
      }
    }
}
