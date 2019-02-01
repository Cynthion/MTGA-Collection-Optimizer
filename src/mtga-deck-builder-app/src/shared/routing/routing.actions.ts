import { Action } from '@ngrx/store';

export class NavigateToAppAction implements Action {
  static readonly TYPE = 'app/routing/NAVIGATE_TO_APP';
  readonly type = NavigateToAppAction.TYPE;
}

export type AppRoutingActions =
  | NavigateToAppAction
  ;
