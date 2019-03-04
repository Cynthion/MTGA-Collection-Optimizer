import { Action } from '@ngrx/store';

import { SettingsDialogState } from './settings.state';

export enum SettingsActionTypes {
  Load = '[Settings] Load',
  Apply = '[Settings] Apply',
}

export class LoadSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Load;
}

export class ApplySettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Apply;

  constructor(
    public state: SettingsDialogState,
  ) { }
}

export type SettingsActions =
  | LoadSettingsDialogAction
  | ApplySettingsDialogAction
  ;
