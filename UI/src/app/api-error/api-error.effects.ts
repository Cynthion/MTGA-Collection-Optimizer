import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { concatMap, flatMap, map, tap, filter } from 'rxjs/operators';

import { OpenApiErrorSnackbarAction, ApiErrorActionTypes, CloseApiErrorSnackbarAction } from './api-error.actions';
import { ApiErrorComponent } from './api-error.component';
import { OpenSettingsAction } from '../settings/settings.actions';
import { LoadDataAction } from '../layout/layout.actions';

@Injectable()
export class ApiErrorEffects {

  @Effect()
  openApiErrorSnackbar$: Observable<Action> = this.actions$
  .pipe(
    ofType(ApiErrorActionTypes.Open),
    map(a => a as OpenApiErrorSnackbarAction),
    filter(a => !a.apiErrorState.isSnackbarOpen),
    concatMap(_ => this.snackBar.openFromComponent(ApiErrorComponent, {
      panelClass: ['api-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    }).afterDismissed()),
    flatMap(_ => []),
  );

  @Effect()
  closeApiErrorSnackbar$: Observable<Action> = this.actions$
  .pipe(
    ofType(ApiErrorActionTypes.Close),
    map(a => a as CloseApiErrorSnackbarAction),
    tap(_ => this.snackBar.dismiss()),
    map(a => {
      if (a.apiErrorCode === 0 || a.apiErrorCode === 1 || a.apiErrorCode === 2) {
        return new OpenSettingsAction();
      }
    }),
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) { }
}
