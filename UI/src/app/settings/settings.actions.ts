import { Action } from '@ngrx/store';

import { SettingsDialogDto } from './settings.state';

export enum SettingsActionTypes {
  Load = '[Settings] Load',
  Initialized = '[Settings] Initialized',
  LoadError = '[Settings] Load Error',
}

export class LoadSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Load;
}

export class InitializedSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Initialized;

  constructor(
    public dto: SettingsDialogDto,
  ) { }
}

export class LoadSettingsDialogErrorAction implements Action {
  readonly type = SettingsActionTypes.LoadError;
}

export type SettingsActions =
  | LoadSettingsDialogAction
  | InitializedSettingsDialogAction
  | LoadSettingsDialogErrorAction
  ;
