import { initialSettingsDialogState, SettingsDialogState } from './settings.state';
import { SettingsActions, SettingsActionTypes } from './settings.actions';

export function settingsReducer(state = initialSettingsDialogState, action: SettingsActions): SettingsDialogState {
  switch (action.type) {
    case SettingsActionTypes.Initialized:
    case SettingsActionTypes.Apply: {
      return {
        ...state,
        ...action.state,
      };
    }

    default: {
      return state;
    }
  }
}
