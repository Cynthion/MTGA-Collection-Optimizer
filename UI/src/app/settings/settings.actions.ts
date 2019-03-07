import { Action } from '@ngrx/store';

import { SettingsDialogState } from './settings.state';

export enum SettingsActionTypes {
  Load = '[Settings] Load',
  Initialized = '[Settings] Initialized',
  Apply = '[Settings] Apply',
}

export class LoadSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Load;
}

export class InitializedSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Initialized;

  constructor(
    public state: SettingsDialogState,
  ) { }
}

export class ApplySettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Apply;

  constructor(
    public state: SettingsDialogState,
  ) { }
}

export type SettingsActions =
  | LoadSettingsDialogAction
  | InitializedSettingsDialogAction
  | ApplySettingsDialogAction
  ;
