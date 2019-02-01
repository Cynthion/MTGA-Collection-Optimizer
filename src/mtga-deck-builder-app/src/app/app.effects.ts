import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { AppActionTypes } from './app.actions';

@Injectable()
export class AppEffects {

  @Effect()
  appInitialized$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppActionTypes.Initialized),

    );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}
}
