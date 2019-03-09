export const SettingsStorageKey = 'settings';

export interface SettingsDto {
  outputLogPath: string;
  logPollInterval: number;
}

export interface SettingsState extends SettingsDto {
  isOpen: boolean;
}

export const initialSettingsState: SettingsState = {
  outputLogPath: 'C:\\Users\\{user name}\\AppData\\LocalLow\\Wizards Of The Coast\\MTGA\\output_log.txt',
  logPollInterval: 5,
  isOpen: false,
};
