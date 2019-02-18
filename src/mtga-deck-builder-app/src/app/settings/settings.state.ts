import { RootState } from 'src/app/app.state';

export const SETTINGS_FEATURE_NAME: keyof SettingsFeatureState = 'settingsDialog';

export interface SettingsFeatureState extends RootState {
  settingsDialog: SettingsDialogState;
}

export interface SettingsDialogDto {
  outputLogPath: string;
}

export interface SettingsDialogState extends SettingsDialogDto {

}

export const initialSettingsDialogState: SettingsDialogState = {
  outputLogPath: '',
};
