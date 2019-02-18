import { initialSettingsDialogState, SettingsDialogState } from './settings.state';
import { SettingsActions, SettingsActionTypes } from './settings.actions';

export function inventoryReducer(state = initialSettingsDialogState, action: SettingsActions): SettingsDialogState {
  switch (action.type) {

    case SettingsActionTypes.Initialized: {
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
