import { initialApiErrorState, ApiErrorState } from './api-error.state';
import { ApiErrorActions, ApiErrorActionTypes } from './api-error.actions';

export function apiErrorReducer(
  state: ApiErrorState = initialApiErrorState,
  action: ApiErrorActions): ApiErrorState {
    switch (action.type) {
      case ApiErrorActionTypes.Show: {
        return state;
      }

      default: {
        return state;
      }
    }
}
