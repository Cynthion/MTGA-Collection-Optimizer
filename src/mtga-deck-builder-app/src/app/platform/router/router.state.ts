import { Params } from '@angular/router';

export type NavigationResultKind =
  | 'SUCCEEDED'
  | 'CANCELED'
  | 'FAILED'
  ;

export interface RouterStateProperties {
  url: string;
  path: string;
  params: Params;
  queryParams: Params;
}

// tslint:disable-next-line:no-empty-interface
export interface SerializedRouterStateSnapshot extends RouterStateProperties { }

export interface Navigation extends RouterStateProperties {
  navigationId: number;
}

export interface NavigationResult extends Navigation {
  result: NavigationResultKind;
}

export interface RouterState extends Navigation {
  navigationIsRunning: boolean;
  pendingNavigationId: number | undefined;
  pendingNavigation: Navigation | undefined;
  history: Navigation[];
  navigationResults: NavigationResult[];
}

export const INITIAL_ROUTER_STATE: RouterState = {
  navigationId: 0,
  navigationIsRunning: false,
  pendingNavigationId: undefined,
  pendingNavigation: undefined,
  history: [],
  navigationResults: [],
  url: '/',
  path: '/',
  params: {},
  queryParams: {},
};
