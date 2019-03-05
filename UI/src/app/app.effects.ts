import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { AppActionTypes, ApiErrorAction } from './app.actions';

@Injectable()
export class AppEffects {

  @Effect()
  apiError$: Observable<Action> = this.actions$
  .pipe(
      ofType(AppActionTypes.ApiError),
      tap(a => console.log(a)),
      // tap(a => console.log((a as ApiErrorAction).apiErrorDetails.statusCode),
      // tap(a => console.log((a as ApiErrorAction).apiErrorDetails.message),
      flatMap(_ => [])
    );

  constructor(
    private actions$: Actions,
  ) { }
}
