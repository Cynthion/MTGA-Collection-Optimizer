import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { first, map, merge } from 'rxjs/operators';

import { RootState } from './app.state';
import { AppInitializedAction, LoadAppDataAction, HandleApiErrorAction } from './app.actions';

@Injectable()
export class AppGuard implements CanActivate {

  constructor(private store: Store<RootState>, private actionsSubject: ActionsSubject) { }

  canActivate() {
    this.actionsSubject.next(new LoadAppDataAction());
    return handleInitializationAndApiError(this.actionsSubject, AppInitializedAction.TYPE);
  }
}

function handleInitializationAndApiError(actionsSubject: ActionsSubject, actionType: string) {
  return actionsSubject.pipe(
    first(a => a.type === actionType),
    map(() => true),
    merge(
      actionsSubject.pipe(
        first(a => a.type === HandleApiErrorAction.TYPE),
        map(() => false)
      )
    ));
}
