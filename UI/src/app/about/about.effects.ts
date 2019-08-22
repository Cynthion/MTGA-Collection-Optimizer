import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, tap, debounceTime, filter } from 'rxjs/operators';

import { AboutActionTypes } from './about.actions';
import { AboutDialogComponent } from './about.dialog';

@Injectable()
export class AboutDialogEffects {
  private aboutDialogRef: MatDialogRef<AboutDialogComponent, any>;

  @Effect()
  openAboutDialog$: Observable<Action> = this.actions$
    .pipe(
      ofType(AboutActionTypes.Open),
      filter(_ => this.dialog.openDialogs.length === 0),
      flatMap(_ => {
        this.aboutDialogRef = this.dialog.open(AboutDialogComponent, {
          width: '800px',
          position: {
            top: '30px',
            right: '10px',
          },
          panelClass: ['about-dialog'],
        });
        return this.aboutDialogRef.afterClosed();
      }),
      flatMap(_ => []),
    );

  @Effect()
  closeAboutDialog$: Observable<Action> = this.actions$
    .pipe(
      ofType(AboutActionTypes.Close),
      flatMap(_ => {
        const obs = this.aboutDialogRef.beforeClose();
        this.aboutDialogRef.close();
        return obs;
      }),
      debounceTime(500),
      flatMap(_ => []),
    );

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
  ) { }
}
