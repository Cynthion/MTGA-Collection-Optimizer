export const SettingsStorageKey = 'settings';

export interface SettingsDto {
  logPollInterval: number;
  outputLogPath: string;
  gameDataPath: string;
}

export interface SettingsState extends SettingsDto {
  isOpen: boolean;
}

export const initialSettingsState: SettingsState = {
  logPollInterval: 5,
  outputLogPath: '',
  gameDataPath: '',
  isOpen: false,
};
