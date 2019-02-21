export interface SettingsDialogDto {
  outputLogPath: string;
}

export interface SettingsDialogState extends SettingsDialogDto {

}

export const initialSettingsDialogState: SettingsDialogState = {
  outputLogPath: '',
};
