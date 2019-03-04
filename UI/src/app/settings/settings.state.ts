export const SettingsStorageKey = 'settings';

export interface SettingsDialogDto {
  outputLogPath: string;
  logPollInterval: number;
}

export interface SettingsDialogState extends SettingsDialogDto {

}

export const initialSettingsDialogState: SettingsDialogState = {
  outputLogPath: '',
  logPollInterval: 5,
};
