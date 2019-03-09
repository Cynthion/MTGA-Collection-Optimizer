import { initialSettingsState, SettingsState } from './settings.state';
import { SettingsActions, SettingsActionTypes } from './settings.actions';

export function settingsReducer(
  state: SettingsState = initialSettingsState,
  action: SettingsActions): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.Open: {
      return {
        ...state,
        isOpen: true,
      };
    }

    case SettingsActionTypes.Close: {
      return {
        ...state,
        isOpen: false,
      };
    }

    case SettingsActionTypes.Initialized:
    case SettingsActionTypes.Apply: {
      return {
        ...state,
        ...action.dto,
      };
    }

    default: {
      return state;
    }
  }
}
