export const SettingsStorageKey = 'settings';

export interface SettingsDto {
  outputLogPath: string;
  gameDataPath: string;
  logPollInterval: number;
}

export interface SettingsState extends SettingsDto {
  isOpen: boolean;
}

export const initialSettingsState: SettingsState = {
  outputLogPath: '',
  gameDataPath: '',
  logPollInterval: 5,
  isOpen: false,
};
