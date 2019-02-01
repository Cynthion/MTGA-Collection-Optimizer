import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '../../app/app.state';

import { NavigateToAppAction } from './routing.actions';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class AppRoutingEffects {

  @Effect()
  navigateToApp$: Observable<Action> = this.actions$
    .pipe(
      ofType(NavigateToAppAction.TYPE),
      map(a => a as NavigateToAppAction),
      withLatestFrom(this.store.select(s => s.router)),
      map(([a, routerState]) =>
        createNavigateAction(createProposalRoute(routerState))
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
  ) { }
}

export function createNavigateAction(route: Route) {
  return new NavigateAction(route.pathParts, route.queryParams, {
    // we always replace the URL for navigations since we do not want
    // to create browser history entries in an app hosted in an iframe
    replaceUrl: true,
  });
}