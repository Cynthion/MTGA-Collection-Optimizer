import { initialSettingsDialogState, SettingsDialogState } from './settings.state';
import { SettingsActions, SettingsActionTypes } from './settings.actions';

export function settingsReducer(
  state: SettingsDialogState = initialSettingsDialogState,
  action: SettingsActions): SettingsDialogState {
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
        ...action.settingsDialogState,
      };
    }

    default: {
      return state;
    }
  }
}
