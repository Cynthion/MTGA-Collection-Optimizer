import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

import { RouterStateProperties, SerializedRouterStateSnapshot } from './router.state';

export class NavigateAction implements Action {
  static readonly TYPE = 'platform/router/NAVIGATE';
  readonly type = NavigateAction.TYPE;

  constructor(
    public path: any[],
    public queryParams?: { [key: string]: any },
    public extras?: NavigationExtras,
  ) { }
}

export class MergeQueryParamsAction implements Action {
  static readonly TYPE = 'platform/router/MERGE_QUERY_PARAMS';
  readonly type = MergeQueryParamsAction.TYPE;

  constructor(
    public queryParams: { [key: string]: any },
    // TODO: achieve this with a dedicated action?
    public usePendingNavigation = false,
  ) { }
}

export class RoutesRecognizedAction implements Action {
  static readonly TYPE = 'platform/router/ROUTES_RECOGNIZED';
  readonly type = RoutesRecognizedAction.TYPE;

  constructor(
    public navigationId: number,
  ) { }
}

export class NavigationStartedAction implements Action {
  static readonly TYPE = 'platform/router/NAVIGATION_STARTED';
  readonly type = NavigationStartedAction.TYPE;

  constructor(
    public serializedRouterStateSnapshot: SerializedRouterStateSnapshot,
  ) { }
}

export class NavigationEndedAction implements Action {
  static readonly TYPE = 'platform/router/NAVIGATION_ENDED';
  readonly type = NavigationEndedAction.TYPE;

  constructor(
    public navigationId: number,
    public state: RouterStateProperties,
  ) { }
}

export class NavigationCanceledAction implements Action {
  static readonly TYPE = 'platform/router/NAVIGATION_CANCELED';
  readonly type = NavigationCanceledAction.TYPE;

  constructor(
    public navigationId: number,
    public reason: string,
  ) { }
}

export class NavigationFailedAction implements Action {
  static readonly TYPE = 'platform/router/NAVIGATION_FAILED';
  readonly type = NavigationFailedAction.TYPE;

  constructor(
    public navigationId: number,
    public error: string,
  ) { }
}

export type RouterActions =
  | NavigateAction
  | MergeQueryParamsAction
  | RoutesRecognizedAction
  | NavigationStartedAction
  | NavigationEndedAction
  | NavigationCanceledAction
  | NavigationFailedAction
  ;
