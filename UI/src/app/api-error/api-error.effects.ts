import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { concatMap, flatMap, map, tap } from 'rxjs/operators';

import { ShowApiErrorAction, ApiErrorActionTypes } from './api-error.actions';
import { ApiErrorComponent } from './api-error.component';

@Injectable()
export class ApiErrorEffects {

  @Effect()
  showApiError$: Observable<Action> = this.actions$
  .pipe(
    ofType(ApiErrorActionTypes.Show),
    map(a => a as ShowApiErrorAction),
    concatMap(a => this.snackBar.openFromComponent(ApiErrorComponent, {
      data: a.apiErrorState,
      panelClass: ['api-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    }).afterDismissed()),
    flatMap(_ => []),
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) { }
}
