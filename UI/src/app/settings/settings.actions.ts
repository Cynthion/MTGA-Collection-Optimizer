import { Action } from '@ngrx/store';

import { SettingsDto } from './settings.state';

export enum SettingsActionTypes {
  Open = '[Settings] Open',
  Close = '[Settings] Close',
  OpenDialog = '[Settings] Open Dialog',
  CloseDialog = '[Settings] Close Dialog',
  // Load = '[Settings] Load',
  // Store = '[Settings] Store',
  LoadBackendSettings = '[Settings] Load Backend Settings',
  Initialize = '[Settings] Initialize',
  // Apply = '[Settings] Apply',
}

export class OpenSettingsAction implements Action {
  readonly type = SettingsActionTypes.Open;
}

export class CloseSettingsAction implements Action {
  readonly type = SettingsActionTypes.Close;
}

export class OpenSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.OpenDialog;
}

export class CloseSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.CloseDialog;
}

// TODO rename to LoadUserSettingsAction or similar
// export class LoadSettingsAction implements Action {
//   readonly type = SettingsActionTypes.Load;
// }

// export class StoreSettingsAction implements Action {
//   readonly type = SettingsActionTypes.Store;

//   constructor(
//     public dto: SettingsDto,
//   ) { }
// }

export class LoadBackendSettingsAction implements Action {
  readonly type = SettingsActionTypes.LoadBackendSettings;
}

export class InitializeSettingsAction implements Action {
  readonly type = SettingsActionTypes.Initialize;

  constructor(
    public dto: SettingsDto,
  ) { }
}

// export class ApplySettingsAction implements Action {
//   readonly type = SettingsActionTypes.Apply;

//   constructor(
//     public dto: SettingsDto,
//   ) { }
// }

export type SettingsActions =
  | OpenSettingsAction
  | CloseSettingsAction
  | OpenSettingsDialogAction
  | CloseSettingsDialogAction
  // | LoadSettingsAction
  // | StoreSettingsAction
  | LoadBackendSettingsAction
  | InitializeSettingsAction
  // | ApplySettingsAction
  ;
