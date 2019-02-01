import { Action } from '@ngrx/store';

export class AppLoadedAction implements Action {
  static readonly TYPE = 'app/APP_LOADED';
  readonly type = AppLoadedAction.TYPE;

  constructor(
    public appName: string,
  ) { }
}

export class AppInitializedAction implements Action {
  static readonly TYPE = 'app/APP_INITIALIZED';
  readonly type = AppInitializedAction.TYPE;
}

export class LoadAppDataAction implements Action {
  static readonly TYPE = 'app/LOAD_APP_DATA';
  readonly type = LoadAppDataAction.TYPE;
}

export class HandleApiErrorAction implements Action {
  static readonly TYPE = 'app/HANDLE_API_ERROR';
  readonly type = HandleApiErrorAction.TYPE;
}

export type AppActions =
  | AppLoadedAction
  | AppInitializedAction
  | LoadAppDataAction
  | HandleApiErrorAction
  ;
