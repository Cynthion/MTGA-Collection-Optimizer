import { Action } from '@ngrx/store';

import { SettingsDialogState } from './settings.state';

export enum SettingsActionTypes {
  Open = '[Settings] Open',
  Load = '[Settings] Load',
  Initialized = '[Settings] Initialized',
  Apply = '[Settings] Apply',
}

export class OpenSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Open;
}

export class LoadSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Load;
}

export class InitializedSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Initialized;

  constructor(
    public settingsDialogState: SettingsDialogState,
  ) { }
}

export class ApplySettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Apply;

  constructor(
    public settingsDialogState: SettingsDialogState,
  ) { }
}

export type SettingsActions =
  | OpenSettingsDialogAction
  | LoadSettingsDialogAction
  | InitializedSettingsDialogAction
  | ApplySettingsDialogAction
  ;
