import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { concatMap, flatMap, map, tap } from 'rxjs/operators';

import { AppActionTypes, ApiErrorAction } from './app.actions';
import { ApiErrorComponent } from './api-error';
import { SettingsDialogComponent } from './settings';

@Injectable()
export class AppEffects {

  @Effect()
  apiError$: Observable<Action> = this.actions$
  .pipe(
    ofType(AppActionTypes.ApiError),
    map(a => (a as ApiErrorAction)),
    tap(a => console.log(a)),
    concatMap(a => this.snackBar.openFromComponent(ApiErrorComponent, {
      data: a.apiErrorDetails,
      panelClass: ['api-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    }).afterDismissed()),
    flatMap(_ => [])
  );

  @Effect()
  openSettings$: Observable<Action> = this.actions$
  .pipe(
    ofType(AppActionTypes.Settings),
    tap(a => console.log(a)),
    flatMap(_ => this.dialog.open(SettingsDialogComponent, {
      width: '500px',
      position: {
        top: '30px',
        right: '10px',
      }
    }).afterClosed()),
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }
}
